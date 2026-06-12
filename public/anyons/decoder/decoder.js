/* Decoder playground engine — runs the trained honeycomb decoders client-side.
 *
 * The model files in data/ hold the float16 weights of networks trained by
 * scripts/decoder_playground_export.py (protocol of the published sweep) plus
 * the exact group structure (detector permutations, GF(2) label twists, class
 * maps) solved from the circuit's detector error model. forward() reproduces
 * the PyTorch twisted average f(x)[c] = mean_g mlp(x_g)[A_g c ^ X_g.x_g];
 * test_decoder.js gates it against logits dumped from the python model. */
"use strict";

function b64ToBytes(b64) {
  if (typeof atob !== "undefined") {
    const s = atob(b64);
    const u = new Uint8Array(s.length);
    for (let i = 0; i < s.length; i++) u[i] = s.charCodeAt(i);
    return u;
  }
  return new Uint8Array(Buffer.from(b64, "base64"));
}

function f16bits(h) {
  const s = (h & 0x8000) ? -1 : 1, e = (h & 0x7c00) >> 10, f = h & 0x03ff;
  if (e === 0) return s * Math.pow(2, -14) * (f / 1024);
  if (e === 0x1f) return f ? NaN : s * Infinity;
  return s * Math.pow(2, e - 15) * (1 + f / 1024);
}

function f16ToF32(u8) {
  const u16 = new Uint16Array(u8.buffer, u8.byteOffset, u8.byteLength >> 1);
  const out = new Float32Array(u16.length);
  for (let i = 0; i < u16.length; i++) out[i] = f16bits(u16[i]);
  return out;
}

class DecoderModel {
  constructor(raw) {
    this.h = raw.h; this.nd = raw.nd; this.nG = raw.nG;
    this.w1 = f16ToF32(b64ToBytes(raw.w1));   // (h, nd) row-major
    this.b1 = f16ToF32(b64ToBytes(raw.b1));
    this.w2 = f16ToF32(b64ToBytes(raw.w2));   // (h, h)
    this.b2 = f16ToF32(b64ToBytes(raw.b2));
    this.w3 = f16ToF32(b64ToBytes(raw.w3));   // (4, h)
    this.b3 = f16ToF32(b64ToBytes(raw.b3));
    const ipb = b64ToBytes(raw.IP);
    this.IP = new Uint16Array(ipb.buffer, ipb.byteOffset, ipb.byteLength >> 1);
    this.X = b64ToBytes(raw.X);               // (nG, 2, nd) 0/1 bytes
    this.CM = raw.CM;                          // (nG, 4) ints
    this.accTest = raw.acc_test;
    this.accStream = raw.acc_stream;
    this.nTrain = raw.n_train;
    this._xg = new Float32Array(this.nd);
    this._h1 = new Float32Array(this.h);
    this._h2 = new Float32Array(this.h);
  }

  _mlp(x) {
    const { h, nd, w1, b1, w2, b2, w3, b3, _h1, _h2 } = this;
    for (let o = 0; o < h; o++) {
      let a = b1[o];
      const off = o * nd;
      for (let j = 0; j < nd; j++) a += w1[off + j] * x[j];
      _h1[o] = a > 0 ? a : 0;
    }
    for (let o = 0; o < h; o++) {
      let a = b2[o];
      const off = o * h;
      for (let j = 0; j < h; j++) a += w2[off + j] * _h1[j];
      _h2[o] = a > 0 ? a : 0;
    }
    const out = new Float32Array(4);
    for (let o = 0; o < 4; o++) {
      let a = b3[o];
      const off = o * h;
      for (let j = 0; j < h; j++) a += w3[off + j] * _h2[j];
      out[o] = a;
    }
    return out;
  }

  forward(x) {  // x: 0/1 array of length nd -> Float32Array(4) logits
    const { nd, nG, IP, X, CM, _xg } = this;
    const out = new Float32Array(4);
    for (let g = 0; g < nG; g++) {
      const ipo = g * nd, xo = g * 2 * nd;
      let b0 = 0, b1 = 0;
      for (let j = 0; j < nd; j++) {
        const v = x[IP[ipo + j]];
        _xg[j] = v;
        if (v) { b0 ^= X[xo + j]; b1 ^= X[xo + nd + j]; }
      }
      const logit = this._mlp(_xg);
      const bidx = b0 | (b1 << 1), cm = CM[g];
      for (let c = 0; c < 4; c++) out[c] += logit[cm[c] ^ bidx];
    }
    for (let c = 0; c < 4; c++) out[c] /= nG;
    return out;
  }

  predict(x) {
    const l = this.forward(x);
    let best = 0;
    for (let c = 1; c < 4; c++) if (l[c] > l[best]) best = c;
    return best;
  }
}

class ShotStream {
  constructor(meta) {
    this.nd = meta.nd;
    this.n = meta.truth.length;
    this.stride = meta.stream_stride;
    this.bytes = b64ToBytes(meta.stream_b64);
    this.truth = meta.truth;
    this.mwpm = meta.mwpm_pred;
    this._x = new Uint8Array(this.nd);
  }

  shot(i) {  // shared scratch — copy if you keep it
    const off = i * this.stride, x = this._x;
    for (let d = 0; d < this.nd; d++) {
      x[d] = (this.bytes[off + (d >> 3)] >> (7 - (d & 7))) & 1;
    }
    return x;
  }
}

const DECODER_ENGINE = { DecoderModel, ShotStream, b64ToBytes, f16ToF32 };
if (typeof module !== "undefined") module.exports = DECODER_ENGINE;
if (typeof window !== "undefined") window.DECODER_ENGINE = DECODER_ENGINE;
