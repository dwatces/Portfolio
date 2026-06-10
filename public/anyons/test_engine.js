/* Physics tests for the playground engine — run with node. The engine ships only
 * if these match the validated Python results (toric_braiding.py, ibm_mbqc_hex.py). */
"use strict";
const { Tableau, ToricCode, MBQCHex } = require("./engine.js");

let pass = 0, fail = 0;
function ok(cond, msg) {
  if (cond) { pass++; console.log("  ok:", msg); }
  else { fail++; console.log("  FAIL:", msg); }
}
function approx(a, b, tol = 1e-6) { return Math.abs(a - b) < tol; }

console.log("== Tableau: Bell pair ==");
{
  let corr = true, sawBoth = { 0: false, 1: false };
  for (let trial = 0; trial < 50; trial++) {
    const t = new Tableau(2);
    t.h(0); t.cx(0, 1);
    const xs = new Uint8Array(2), zs = new Uint8Array(2);
    zs[0] = zs[1] = 1;
    if (t.expectation(xs, zs) !== 1) corr = false; // <Z0Z1>=+1
    const xs2 = new Uint8Array(2); xs2[0] = xs2[1] = 1;
    if (t.expectation(xs2, new Uint8Array(2)) !== 1) corr = false; // <X0X1>=+1
    const zs1 = new Uint8Array(2); zs1[0] = 1;
    if (t.expectation(new Uint8Array(2), zs1) !== 0) corr = false; // <Z0>=0
    const m0 = t.measure(0);
    const m1 = t.measure(1);
    if (!m0.random || m1.random || m0.outcome !== m1.outcome) corr = false;
    sawBoth[m0.outcome] = true;
  }
  ok(corr, "Bell correlations exact (ZZ=+1, XX=+1, Z0=0, measurements correlated)");
  ok(sawBoth[0] && sawBoth[1], "measurement outcomes genuinely random");
}

console.log("== ToricCode L=4: ground state, loops, logical flip ==");
{
  const c = new ToricCode(4);
  ok(c.logicalZ(0) === 1 && c.logicalZ(1) === 1, "ground state: <Z1>=<Z2>=+1");
  ok(c.logicalX(0) === 0, "<X1>=0 in a Z eigenstate");
  const s0 = c.syndromes();
  ok(s0.m.length === 0 && s0.e.length === 0, "vacuum: no anyons");

  // contractible m-loop around one star: drag m around a 2x2 plaquette square
  const loop = [[1, 1], [1, 2], [2, 2], [2, 1], [1, 1]];
  for (let i = 0; i + 1 < loop.length; i++) c.moveM(loop[i], loop[i + 1]);
  const s1 = c.syndromes();
  ok(s1.m.length === 0 && c.logicalZ(0) === 1 && c.logicalZ(1) === 1,
     "contractible loop: vacuum restored, logicals UNCHANGED (the control)");

  // non-contractible loop: drag m once around the torus (y direction at x=0)
  for (let y = 0; y < 4; y++) c.moveM([0, y], [0, (y + 1) % 4]);
  const s2 = c.syndromes();
  ok(s2.m.length === 0, "torus loop: anyons re-annihilated");
  ok(c.logicalZ(0) === -1, "TORUS LOOP FLIPS THE LOGICAL: <Z1> +1 -> -1 (the braid)");
  ok(c.logicalZ(1) === 1, "<Z2> untouched");

  // e anyons: pair + separation shows on stars; rejoin restores
  c.moveE([1, 1], [2, 1]);
  ok(c.syndromes().e.length === 2, "e-pair created on stars");
  c.moveE([1, 1], [2, 1]);
  ok(c.syndromes().e.length === 0, "e-pair annihilated");
}

console.log("== MBQC hexagon: programs match hardware-validated targets ==");
{
  const m = new MBQCHex();
  const r0 = m.run(0);
  ok(approx(r0.bloch[0], 0, 1e-9) && approx(r0.bloch[1], 0, 1e-9) &&
     approx(r0.bloch[2], 1, 1e-9), "theta=0 -> |0> (Clifford program), r=(0,0,1)");
  ok(approx(r0.magic, 0, 1e-9), "theta=0 magic = 0");
  const r1 = m.run(Math.PI / 4);
  ok(approx(Math.abs(r1.bloch[1]), Math.SQRT1_2, 1e-9) &&
     approx(r1.bloch[2], Math.SQRT1_2, 1e-9) && approx(r1.bloch[0], 0, 1e-9),
     "theta=pi/4 -> T-state axis r=(0, ±0.7071, 0.7071) [hw overlap was 0.999]");
  ok(approx(r1.magic, Math.log2(4 / 3), 1e-9),
     "theta=pi/4 magic = log2(4/3) = 0.4150 [hw measured 0.4150]");
  let frames = 0;
  for (let s = 0; s < 32; s++) if (r1.frame[s]) frames++;
  ok(frames === 32, "all 32 Pauli-frame branches found (deterministic after correction)");
  // continuous dial sanity: magic monotone 0 -> pi/4
  let mono = true, prev = -1;
  for (let k = 0; k <= 8; k++) {
    const mg = m.run((Math.PI / 4) * (k / 8)).magic;
    if (mg < prev - 1e-12) mono = false;
    prev = mg;
  }
  ok(mono, "magic dial monotone from 0 to 0.415 across the sweep");
}

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
