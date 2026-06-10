/* HEX PLAYGROUND ENGINE — real stabilizer mechanics, no animation fakery.
 * 2026-06-10. Three parts:
 *   Tableau  — Aaronson–Gottesman CHP stabilizer simulator (H, S, CX, CZ, X/Y/Z,
 *              measurement, exact Pauli-string expectation values).
 *   ToricCode — d-torus surface code: ground-state prep, anyon creation/dragging,
 *               star/plaquette syndromes, logical operators. Ports the physics of
 *               scripts/toric_braiding.py (the 3-quantum-computer braiding result).
 *   MBQCHex  — 6-qubit statevector sim of the hexagon-cluster MBQC magic injection
 *              (ports scripts/ibm_mbqc_hex.py, hardware job d8kdvb832u0s73f8l200).
 * Works in browser (window.*) and node (module.exports) for physics tests.
 */
"use strict";

/* ---------------------------------------------------------------- Tableau */
class Tableau {
  constructor(n) {
    this.n = n;
    const rows = 2 * n + 1; // last row = scratch
    this.x = Array.from({ length: rows }, () => new Uint8Array(n));
    this.z = Array.from({ length: rows }, () => new Uint8Array(n));
    this.r = new Uint8Array(rows);
    for (let i = 0; i < n; i++) {
      this.x[i][i] = 1;        // destabilizers X_i
      this.z[n + i][i] = 1;    // stabilizers   Z_i  (state |0...0>)
    }
  }
  h(q) {
    for (let i = 0; i < 2 * this.n; i++) {
      this.r[i] ^= this.x[i][q] & this.z[i][q];
      const t = this.x[i][q]; this.x[i][q] = this.z[i][q]; this.z[i][q] = t;
    }
  }
  s(q) {
    for (let i = 0; i < 2 * this.n; i++) {
      this.r[i] ^= this.x[i][q] & this.z[i][q];
      this.z[i][q] ^= this.x[i][q];
    }
  }
  cx(c, t) {
    for (let i = 0; i < 2 * this.n; i++) {
      this.r[i] ^= this.x[i][c] & this.z[i][t] & (this.x[i][t] ^ this.z[i][c] ^ 1);
      this.x[i][t] ^= this.x[i][c];
      this.z[i][c] ^= this.z[i][t];
    }
  }
  cz(c, t) { this.h(t); this.cx(c, t); this.h(t); }
  px(q) { for (let i = 0; i < 2 * this.n; i++) this.r[i] ^= this.z[i][q]; }
  pz(q) { for (let i = 0; i < 2 * this.n; i++) this.r[i] ^= this.x[i][q]; }
  py(q) { for (let i = 0; i < 2 * this.n; i++) this.r[i] ^= this.x[i][q] ^ this.z[i][q]; }
  static g(x1, z1, x2, z2) { // CHP phase function
    if (!x1 && !z1) return 0;
    if (x1 && z1) return z2 - x2;
    if (x1 && !z1) return z2 * (2 * x2 - 1);
    return x2 * (1 - 2 * z2);
  }
  rowsum(h, i) {
    let ph = 2 * this.r[h] + 2 * this.r[i];
    for (let j = 0; j < this.n; j++)
      ph += Tableau.g(this.x[i][j], this.z[i][j], this.x[h][j], this.z[h][j]);
    ph = ((ph % 4) + 4) % 4;
    this.r[h] = ph / 2; // always 0 or 2 for valid rows
    for (let j = 0; j < this.n; j++) {
      this.x[h][j] ^= this.x[i][j];
      this.z[h][j] ^= this.z[i][j];
    }
  }
  measure(q, forced) { // forced: undefined=random, else 0/1 for random case
    const n = this.n;
    let p = -1;
    for (let i = n; i < 2 * n; i++) if (this.x[i][q]) { p = i; break; }
    if (p >= 0) { // random outcome
      for (let i = 0; i < 2 * n; i++)
        if (i !== p && this.x[i][q]) this.rowsum(i, p);
      this.x[p - n].set(this.x[p]); this.z[p - n].set(this.z[p]);
      this.r[p - n] = this.r[p];
      this.x[p].fill(0); this.z[p].fill(0);
      this.z[p][q] = 1;
      const out = forced === undefined ? (Math.random() < 0.5 ? 0 : 1) : forced;
      this.r[p] = out;
      return { outcome: out, random: true };
    }
    // deterministic
    const s = 2 * n;
    this.x[s].fill(0); this.z[s].fill(0); this.r[s] = 0;
    for (let i = 0; i < n; i++) if (this.x[i][q]) this.rowsum(s, i + n);
    return { outcome: this.r[s], random: false };
  }
  /* Exact <P> for an X/Z-only Pauli string (no Y support needed here).
     Returns +1, -1 or 0. xs, zs = Uint8Array masks. */
  expectation(xs, zs) {
    const n = this.n;
    for (let j = 0; j < n; j++) if (xs[j] && zs[j]) throw new Error("no Y support");
    for (let i = n; i < 2 * n; i++) { // commutation with each stabilizer
      let sp = 0;
      for (let j = 0; j < n; j++) sp ^= (this.x[i][j] & zs[j]) ^ (this.z[i][j] & xs[j]);
      if (sp) return 0;
    }
    // P = ± product of stabilizers whose DESTABILIZER anticommutes with P
    const s = 2 * n;
    this.x[s].fill(0); this.z[s].fill(0); this.r[s] = 0;
    for (let i = 0; i < n; i++) {
      let sp = 0;
      for (let j = 0; j < n; j++) sp ^= (this.x[i][j] & zs[j]) ^ (this.z[i][j] & xs[j]);
      if (sp) this.rowsum(s, i + n);
    }
    for (let j = 0; j < n; j++)
      if (this.x[s][j] !== xs[j] || this.z[s][j] !== zs[j])
        throw new Error("expectation reduction failed");
    return this.r[s] ? -1 : 1;
  }
}

/* ---------------------------------------------------------------- ToricCode */
class ToricCode {
  /* L x L torus, qubits on edges: n = 2 L^2.
     edge(d,x,y): d=0 horizontal edge from vertex (x,y) to (x+1,y),
                  d=1 vertical   edge from vertex (x,y) to (x,y+1).
     Star A(x,y)      = X on h(x,y), h(x-1,y), v(x,y), v(x,y-1)   [e anyons live here]
     Plaquette B(x,y) = Z on h(x,y), h(x,y+1), v(x,y), v(x+1,y)   [m anyons live here]
     Logical Z1 = Z on row of h-edges {h(x,y0)}; X1 = X on column {h(x0,y)}. */
  constructor(L) {
    this.L = L;
    this.n = 2 * L * L;
    this.reset();
  }
  q(d, x, y) {
    const L = this.L;
    return d * L * L + (((x % L) + L) % L) * L + (((y % L) + L) % L);
  }
  starQs(x, y) { return [this.q(0, x, y), this.q(0, x - 1, y), this.q(1, x, y), this.q(1, x, y - 1)]; }
  plaqQs(x, y) { return [this.q(0, x, y), this.q(0, x, y + 1), this.q(1, x, y), this.q(1, x + 1, y)]; }
  reset() {
    const L = this.L;
    this.t = new Tableau(this.n);
    // |0..0> already satisfies all plaquettes (Z) and logical Z's.
    // Measure all stars; correct -1 outcomes by pairing them with Z-strings.
    const bad = [];
    for (let x = 0; x < L; x++)
      for (let y = 0; y < L; y++) {
        const m = this.measureStar(x, y);
        if (m === -1) bad.push([x, y]);
      }
    for (let i = 0; i + 1 < bad.length; i += 2)
      this.zString(bad[i], bad[i + 1]);
    // sanity: all stars and plaquettes now +1 (parity of -1 stars is always even)
    for (let x = 0; x < L; x++)
      for (let y = 0; y < L; y++) {
        if (this.star(x, y) !== 1 || this.plaq(x, y) !== 1)
          throw new Error("ground-state prep failed");
      }
  }
  measureStar(x, y) {
    // measure A(x,y) via expectation if determinate else project:
    const e = this.star(x, y);
    if (e !== 0) return e;
    // project by measuring the X-type operator: do it via an ancilla-free trick:
    // rotate the 4 edges with H, measure ZZZZ ... simplest: use tableau measure of
    // a product is nontrivial; instead measure each... NOT equivalent. Use ancilla.
    return this.measureXString(this.starQs(x, y));
  }
  measureXString(qs) {
    // Project onto eigenspace of X⊗..⊗X via CHP: conjugate so the operator becomes
    // a single Z: pick pivot qs[0]; CX(pivot -> others) maps X_p X_o -> X_p;
    // wait: CX(c,t): X_c -> X_c X_t. So CX(p, o) for all others maps X_p -> X on all.
    // Inverse-conjugate, measure X_p via H+measure, redo.
    const p = qs[0];
    for (let i = 1; i < qs.length; i++) this.t.cx(p, qs[i]);
    this.t.h(p);
    const m = this.t.measure(p);
    this.t.h(p);
    for (let i = 1; i < qs.length; i++) this.t.cx(p, qs[i]);
    return m.outcome === 0 ? 1 : -1;
  }
  zString(a, b) { // Z chain on h/v edges along a lattice path vertex a -> vertex b
    let [x, y] = a;
    const [bx, by] = b;
    while (x !== bx) { const step = ((bx - x) % this.L + this.L) % this.L <= this.L / 2 ? 1 : -1; this.t.pz(this.q(0, step === 1 ? x : x - 1, y)); x = (x + step + this.L) % this.L; }
    while (y !== by) { const step = ((by - y) % this.L + this.L) % this.L <= this.L / 2 ? 1 : -1; this.t.pz(this.q(1, x, step === 1 ? y : y - 1)); y = (y + step + this.L) % this.L; }
  }
  star(x, y) {
    const xs = new Uint8Array(this.n), zs = new Uint8Array(this.n);
    for (const q of this.starQs(x, y)) xs[q] = 1;
    return this.t.expectation(xs, zs);
  }
  plaq(x, y) {
    const xs = new Uint8Array(this.n), zs = new Uint8Array(this.n);
    for (const q of this.plaqQs(x, y)) zs[q] = 1;
    return this.t.expectation(xs, zs);
  }
  logicalZ(which) { // which=0: row y0=0 of h-edges; which=1: column-cycle of v-edges
    const xs = new Uint8Array(this.n), zs = new Uint8Array(this.n);
    for (let i = 0; i < this.L; i++)
      zs[which === 0 ? this.q(0, i, 0) : this.q(1, 0, i)] = 1;
    return this.t.expectation(xs, zs);
  }
  logicalX(which) { // conjugate partners: X on column of h-edges / row of v-edges
    const xs = new Uint8Array(this.n), zs = new Uint8Array(this.n);
    for (let i = 0; i < this.L; i++)
      xs[which === 0 ? this.q(0, 0, i) : this.q(1, i, 0)] = 1;
    return this.t.expectation(xs, zs);
  }
  /* m-anyon move: applying X on the edge SHARED by adjacent plaquettes (x,y)->(x',y').
     Plaquettes adjacency: B(x,y) and B(x,y+1) share h(x,y+1); B(x,y) and B(x+1,y)
     share v(x+1,y). */
  sharedEdgeM(a, b) {
    const L = this.L;
    const dx = (((b[0] - a[0]) % L) + L) % L, dy = (((b[1] - a[1]) % L) + L) % L;
    if (dx === 0 && dy === 1) return this.q(0, a[0], a[1] + 1);
    if (dx === 0 && dy === L - 1) return this.q(0, a[0], a[1]);
    if (dx === 1 && dy === 0) return this.q(1, a[0] + 1, a[1]);
    if (dx === L - 1 && dy === 0) return this.q(1, a[0], a[1]);
    return null;
  }
  moveM(a, b) { const e = this.sharedEdgeM(a, b); if (e === null) throw new Error("not adjacent"); this.t.px(e); return e; }
  /* e-anyon move on vertices: Z on shared edge. A(x,y)-A(x+1,y) share h(x,y);
     A(x,y)-A(x,y+1) share v(x,y). */
  sharedEdgeE(a, b) {
    const L = this.L;
    const dx = (((b[0] - a[0]) % L) + L) % L, dy = (((b[1] - a[1]) % L) + L) % L;
    if (dx === 1 && dy === 0) return this.q(0, a[0], a[1]);
    if (dx === L - 1 && dy === 0) return this.q(0, b[0], b[1]);
    if (dx === 0 && dy === 1) return this.q(1, a[0], a[1]);
    if (dx === 0 && dy === L - 1) return this.q(1, b[0], b[1]);
    return null;
  }
  moveE(a, b) { const e = this.sharedEdgeE(a, b); if (e === null) throw new Error("not adjacent"); this.t.pz(e); return e; }
  syndromes() {
    const m = [], e = [];
    for (let x = 0; x < this.L; x++)
      for (let y = 0; y < this.L; y++) {
        if (this.plaq(x, y) === -1) m.push([x, y]);
        if (this.star(x, y) === -1) e.push([x, y]);
      }
    return { m, e };
  }
}

/* ---------------------------------------------------------------- MBQCHex */
class MBQCHex {
  /* 6-qubit hexagon-path cluster; q0 measured at angle theta (the PROGRAM),
     q1..q4 at X; output q5. Pauli-frame corrections discovered per-branch exactly
     as in scripts/ibm_mbqc_hex.py. All complex math explicit. */
  constructor() { this.N = 6; this.D = 64; }
  run(theta) {
    const D = this.D, N = this.N;
    let re = new Float64Array(D), im = new Float64Array(D);
    re[0] = 1;
    const H = (k) => {
      const s = 1 / Math.sqrt(2), bit = 1 << k;
      const re2 = new Float64Array(D), im2 = new Float64Array(D);
      // new[i] = (psi[i with bit=0] + sign * psi[i with bit=1]) / sqrt2
      for (let i = 0; i < D; i++) {
        const lo = i & ~bit, hi = i | bit, sgn = (i & bit) ? -1 : 1;
        re2[i] = s * (re[lo] + sgn * re[hi]);
        im2[i] = s * (im[lo] + sgn * im[hi]);
      }
      re = re2; im = im2;
    };
    const CZ = (a, b) => {
      const ba = 1 << a, bb = 1 << b;
      for (let i = 0; i < D; i++)
        if ((i & ba) && (i & bb)) { re[i] = -re[i]; im[i] = -im[i]; }
    };
    const RZ = (k, th) => {
      const bit = 1 << k, c = Math.cos(th / 2), s = Math.sin(th / 2);
      for (let i = 0; i < D; i++) {
        const sg = (i & bit) ? 1 : -1; // e^{-i th/2} on |0>, e^{+i th/2} on |1>
        const cr = c, ci = sg * s;
        const nr = re[i] * cr - im[i] * ci, ni = re[i] * ci + im[i] * cr;
        re[i] = nr; im[i] = ni;
      }
    };
    for (let k = 0; k < N; k++) H(k);
    for (let k = 0; k < N - 1; k++) CZ(k, k + 1);
    RZ(0, -theta); H(0);
    for (let k = 1; k < N - 1; k++) H(k);
    // branch states of q5 for each outcome s of q0..q4
    const branches = [];
    for (let s = 0; s < 32; s++) {
      const a = [0, 0, 0, 0]; // re0, im0, re1, im1 of q5
      for (let b5 = 0; b5 < 2; b5++) {
        const idx = s | (b5 << 5);
        a[2 * b5] = re[idx]; a[2 * b5 + 1] = im[idx];
      }
      const norm = Math.hypot(a[0], a[1], a[2], a[3]);
      branches.push({ p: norm * norm, v: norm > 1e-9 ? a.map((u) => u / norm) : null });
    }
    // Pauli frame: map each branch to branch 0 (fidelity-1 single-qubit Pauli)
    const paulis = {
      I: (v) => v.slice(),
      X: (v) => [v[2], v[3], v[0], v[1]],
      Y: (v) => [v[3], -v[2], -v[1], v[0]], // Y|0>=i|1>, Y|1>=-i|0>
      Z: (v) => [v[0], v[1], -v[2], -v[3]],
    };
    const fid = (a, b) => {
      const rr = a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
      const ii = a[0] * b[1] - a[1] * b[0] + a[2] * b[3] - a[3] * b[2];
      return rr * rr + ii * ii;
    };
    const ref = branches[0].v;
    const frame = {};
    for (let s = 0; s < 32; s++) {
      if (!branches[s].v) { frame[s] = null; continue; }
      frame[s] = null;
      for (const name of Object.keys(paulis))
        if (fid(paulis[name](branches[s].v), ref) > 1 - 1e-9) { frame[s] = name; break; }
      if (!frame[s]) throw new Error("no Pauli frame for branch " + s);
    }
    // corrected output = ref; Bloch vector + magic witness
    const v = ref;
    const X = 2 * (v[0] * v[2] + v[1] * v[3]);
    const Y = 2 * (v[0] * v[3] - v[1] * v[2]);
    const Z = v[0] * v[0] + v[1] * v[1] - (v[2] * v[2] + v[3] * v[3]);
    const magic = -Math.log2((1 + X ** 4 + Y ** 4 + Z ** 4) / 2);
    return { bloch: [X, Y, Z], magic, frame, branches };
  }
}

const HEX_ENGINE = { Tableau, ToricCode, MBQCHex };
if (typeof module !== "undefined") module.exports = HEX_ENGINE;
if (typeof window !== "undefined") window.HEX_ENGINE = HEX_ENGINE;
