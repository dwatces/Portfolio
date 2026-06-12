/* Gate tests for the decoder playground — run with node. The page ships only
 * if the JS forward pass reproduces the python model (gate_vectors.json) and
 * the on-stream accuracies match the measured numbers in meta.js. */
"use strict";
const fs = require("fs");
const path = require("path");

global.window = {};
const { DecoderModel, ShotStream } = require("./decoder.js");
for (const f of fs.readdirSync(path.join(__dirname, "data"))) {
  if (f.endsWith(".js")) {
    (0, eval)(fs.readFileSync(path.join(__dirname, "data", f), "utf8"));
  }
}
const META = window.DECODER_META;
const RAW = window.DECODER_MODELS;
const GATE = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data", "gate_vectors.json"), "utf8"));

let pass = 0, fail = 0;
function ok(cond, msg) {
  if (cond) { pass++; console.log("  ok:", msg); }
  else { fail++; console.log("  FAIL:", msg); }
}

console.log("gate 1: JS forward vs python logits (f16 weights, 5 shots/arm)");
for (const [arm, logits] of Object.entries(GATE.logits)) {
  const m = new DecoderModel(RAW[arm]);
  let worst = 0;
  for (let i = 0; i < GATE.inputs.length; i++) {
    const out = m.forward(GATE.inputs[i]);
    for (let c = 0; c < 4; c++) {
      worst = Math.max(worst, Math.abs(out[c] - logits[i][c]));
    }
  }
  ok(worst < 2e-3, `${arm}: max |logit diff| = ${worst.toExponential(2)}`);
}

console.log("gate 2: stream accuracy matches the measured export numbers");
const stream = new ShotStream(META);
for (const [arm, raw] of Object.entries(RAW)) {
  const m = new DecoderModel(raw);
  let hits = 0;
  for (let i = 0; i < stream.n; i++) {
    if (m.predict(stream.shot(i)) === META.truth[i]) hits++;
  }
  const acc = hits / stream.n;
  ok(Math.abs(acc - META.arms[arm].acc_f16_stream) <= 0.0015,
     `${arm}: JS stream acc ${acc.toFixed(4)} vs python ` +
     `${META.arms[arm].acc_f16_stream.toFixed(4)}`);
}

console.log("gate 3: stream bookkeeping");
let mh = 0, jh = 0;
const maj = META.majority_class;
for (let i = 0; i < stream.n; i++) {
  if (META.mwpm_pred[i] === META.truth[i]) mh++;
  if (maj === META.truth[i]) jh++;
}
ok(Math.abs(mh / stream.n - META.mwpm_stream) < 1e-9,
   `MWPM stream acc ${(mh / stream.n).toFixed(4)} matches meta`);
console.log(`  (majority class on stream: ${(jh / stream.n).toFixed(4)})`);
ok(META.layout.length === META.nd, "layout covers every detector");
ok(stream.n === 2000 && META.nd === 360, "stream 2000 x 360");

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
