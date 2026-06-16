/* Hex playground UI — drives engine.js. Every interaction calls the real physics. */
"use strict";
(() => {
  const { ToricCode, MBQCHex } = window.HEX_ENGINE;

  /* ================================ BRAID BOARD ================================ */
  const L = 4, CELL = 110, PAD = 20;
  const cv = document.getElementById("board");
  const ctx = cv.getContext("2d");
  cv.width = cv.height = 2 * PAD + L * CELL;
  let code = new ToricCode(L);
  let mover = null;          // [x,y] plaquette of the draggable anyon (UI hint only)
  let trail = [];            // crossed-edge segments for the worldline
  let moves = [];            // plaquette path (for the phase-2 hardware request)
  let dragging = false;

  const lz0el = document.getElementById("lz0");
  const lz1el = document.getElementById("lz1");
  const nanyel = document.getElementById("nany");

  function plaqCenter(x, y) { return [PAD + (x + 0.5) * CELL, PAD + (y + 0.5) * CELL]; }
  function vertexPt(x, y) { return [PAD + x * CELL, PAD + y * CELL]; }

  function setMeter(el, v) {
    el.textContent = v > 0 ? "+1" : v < 0 ? "−1" : "0";
    el.className = "val " + (v > 0 ? "plus" : v < 0 ? "minus" : "zero");
  }

  function render() {
    ctx.clearRect(0, 0, cv.width, cv.height);
    // lattice edges
    ctx.strokeStyle = "#222b3d"; ctx.lineWidth = 1;
    for (let i = 0; i <= L; i++) {
      ctx.beginPath(); ctx.moveTo(PAD, PAD + i * CELL); ctx.lineTo(PAD + L * CELL, PAD + i * CELL); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(PAD + i * CELL, PAD); ctx.lineTo(PAD + i * CELL, PAD + L * CELL); ctx.stroke();
    }
    // logical Z1 readout string: Z on row {h(x,0)} -> the y=0 horizontal gridline
    ctx.strokeStyle = "#3a4d2f"; ctx.setLineDash([6, 6]); ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(PAD, PAD); ctx.lineTo(PAD + L * CELL, PAD); ctx.stroke();
    ctx.setLineDash([]);
    // worldline trail
    ctx.strokeStyle = "rgba(255,140,66,.35)"; ctx.lineWidth = 4; ctx.lineCap = "round";
    for (const [a, b] of trail) {
      ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
    }
    // syndromes (the truth comes from the physics, not UI state)
    const syn = code.syndromes();
    for (const [x, y] of syn.m) {
      const [cx0, cy0] = plaqCenter(x, y);
      const isMover = mover && x === mover[0] && y === mover[1];
      ctx.beginPath(); ctx.arc(cx0, cy0, isMover ? 16 : 12, 0, 7);
      ctx.fillStyle = isMover ? "#ffb066" : "#ff8c42";
      ctx.shadowColor = "#ff8c42"; ctx.shadowBlur = 18;
      ctx.fill(); ctx.shadowBlur = 0;
    }
    for (const [x, y] of syn.e) {
      const [vx, vy] = vertexPt(x, y);
      ctx.beginPath(); ctx.arc(vx, vy, 8, 0, 7);
      ctx.fillStyle = "#4cc9f0"; ctx.shadowColor = "#4cc9f0"; ctx.shadowBlur = 14;
      ctx.fill(); ctx.shadowBlur = 0;
    }
    // meters
    setMeter(lz0el, code.logicalZ(0));
    setMeter(lz1el, code.logicalZ(1));
    nanyel.textContent = String(syn.m.length + syn.e.length);
    nanyel.className = "val " + (syn.m.length + syn.e.length ? "" : "zero");
    updateHwButton(syn);
  }

  /* ---- phase 2 (waitlist mode): classify the braid, file it as a public request */
  function classify(mv) {
    if (mv.length < 3) return null;
    let wx = 0, wy = 0;
    for (let i = 0; i + 1 < mv.length; i++) {
      const dx = (((mv[i + 1][0] - mv[i][0]) % L) + L) % L;
      const dy = (((mv[i + 1][1] - mv[i][1]) % L) + L) % L;
      wx += dx === 1 ? 1 : dx === L - 1 ? -1 : 0;
      wy += dy === 1 ? 1 : dy === L - 1 ? -1 : 0;
    }
    const closed = mv[0][0] === mv[mv.length - 1][0] && mv[0][1] === mv[mv.length - 1][1];
    if (!closed) return null;
    const WX = wx / L, WY = wy / L;
    return (WX === 0 && WY === 0)
      ? { cls: "contractible", mode: "control", w: [0, 0] }
      : { cls: "non-contractible", mode: "braid", w: [WX, WY] };
  }
  const hwbtn = document.getElementById("hwrun");
  const hwpanel = document.getElementById("hwpanel");
  const hwstatus = document.getElementById("hwstatus");
  function updateHwButton(syn) {
    const vac = syn.m.length + syn.e.length === 0;
    const topo = classify(moves);
    const ready = vac && topo !== null;
    hwbtn.disabled = !ready;
    hwpanel.classList.toggle("ready", ready);
    hwstatus.textContent = ready
      ? (topo.cls === "non-contractible"
          ? `loop complete — non-contractible (winding ${topo.w.join(",")}): a true braid`
          : "loop complete — contractible: the control experiment")
      : "complete a loop to enable";
  }
  hwbtn.addEventListener("click", () => {
    const topo = classify(moves);
    if (!topo) return;
    const spec = JSON.stringify({ L, moves });
    const title = encodeURIComponent(
      `[braid request] ${topo.cls} loop, winding ${topo.w.join(",")}`);
    const body = encodeURIComponent(
      "Auto-generated from the playground at danielolliver.com/anyons\n\n" +
      "Topology class: " + topo.cls + " (hardware mode: " + topo.mode + ")\n" +
      "Braid spec:\n```json\n" + spec + "\n```\n" +
      "This will run on a real IBM quantum processor when the monthly free-tier " +
      "budget allows (validated pipeline, sim-gated, budget-guarded). The measured " +
      "logical value and job ID will be posted here.");
    window.open(
      `https://github.com/dwatces/equivariant-quantum-ml/issues/new?title=${title}&body=${body}`,
      "_blank");
  });

  function plaqAt(px, py) {
    const x = Math.floor((px - PAD) / CELL), y = Math.floor((py - PAD) / CELL);
    if (x < 0 || y < 0 || x >= L || y >= L) return null;
    return [x, y];
  }
  function pos(ev) {
    const r = cv.getBoundingClientRect();
    return [(ev.clientX - r.left) * (cv.width / r.width),
            (ev.clientY - r.top) * (cv.height / r.height)];
  }
  function isAdjacent(a, b) { return code.sharedEdgeM(a, b) !== null; }

  cv.addEventListener("pointerdown", (ev) => {
    const [px, py] = pos(ev);
    const p = plaqAt(px, py);
    if (!p) return;
    const syn = code.syndromes();
    const onAnyon = syn.m.find(([x, y]) => x === p[0] && y === p[1]);
    if (onAnyon) {
      mover = p; dragging = true;
      // grabbing anything but the tracked mover breaks path continuity ->
      // board still works, but the hardware request is disabled for this braid
      if (!(moves.length && moves[moves.length - 1][0] === p[0] &&
            moves[moves.length - 1][1] === p[1])) moves = [];
    }
    else if (syn.m.length === 0) {
      // tear a pair out of the vacuum: p and its +x neighbour
      const p2 = [(p[0] + 1) % L, p[1]];
      code.moveM(p, p2);
      mover = p2; dragging = true;
      trail = [[plaqCenter(p[0], p[1]), plaqCenter(p2[0], p2[1])]];
      moves = [p.slice(), p2.slice()];
    }
    cv.setPointerCapture(ev.pointerId);
    render();
  });
  cv.addEventListener("pointermove", (ev) => {
    if (!dragging || !mover) return;
    const [px, py] = pos(ev);
    const t = plaqAt(px, py);
    if (!t || (t[0] === mover[0] && t[1] === mover[1])) return;
    if (!isAdjacent(mover, t)) return;       // one tile at a time (incl. torus wrap)
    code.moveM(mover, t);                     // REAL physics: X on the shared edge
    trail.push([plaqCenter(mover[0], mover[1]), plaqCenter(t[0], t[1])]);
    moves.push(t.slice());
    mover = t;
    render();
  });
  const stopDrag = () => { dragging = false; render(); };
  cv.addEventListener("pointerup", stopDrag);
  cv.addEventListener("pointercancel", stopDrag);
  document.getElementById("reset").addEventListener("click", () => {
    code = new ToricCode(L); mover = null; trail = []; moves = []; render();
  });

  /* ================================ MAGIC DIAL ================================ */
  const mb = new MBQCHex();
  const bl = document.getElementById("bloch");
  const bctx = bl.getContext("2d");
  const dial = document.getElementById("dial");
  const dialval = document.getElementById("dialval");
  const magicEl = document.getElementById("magic");
  const branchout = document.getElementById("branchout");
  let lastRun = mb.run(0);

  function renderBloch(r) {
    const W = bl.width, c = W / 2, R = W / 2 - 18;
    bctx.clearRect(0, 0, W, W);
    bctx.strokeStyle = "#222b3d"; bctx.lineWidth = 1.5;
    bctx.beginPath(); bctx.arc(c, c, R, 0, 7); bctx.stroke();
    bctx.fillStyle = "#8a93a6"; bctx.font = "11px ui-monospace,monospace";
    bctx.fillText("+Z", c - 8, c - R + 14); bctx.fillText("+Y", c + R - 24, c + 4);
    // vector lives in the Y-Z plane (X stays 0 along the dial)
    const vx = c + r.bloch[1] * R, vy = c - r.bloch[2] * R;
    bctx.strokeStyle = "#ffd166"; bctx.lineWidth = 3; bctx.lineCap = "round";
    bctx.beginPath(); bctx.moveTo(c, c); bctx.lineTo(vx, vy); bctx.stroke();
    bctx.beginPath(); bctx.arc(vx, vy, 5, 0, 7); bctx.fillStyle = "#ffd166"; bctx.fill();
  }
  function updateDial() {
    const th = (Math.PI / 4) * (dial.value / 100);
    lastRun = mb.run(th);
    dialval.textContent = `θ = ${th.toFixed(3)} rad  (${(th / Math.PI * 180).toFixed(1)}°)`;
    magicEl.textContent = lastRun.magic.toFixed(4);
    magicEl.className = "val " + (lastRun.magic > 0.02 ? "plus" : "zero");
    renderBloch(lastRun);
    branchout.textContent = "";
  }
  dial.addEventListener("input", updateDial);

  let isDraggingBloch = false;
  bl.style.cursor = "pointer";
  bl.style.touchAction = "none";
  bl.addEventListener("pointerdown", (ev) => {
    isDraggingBloch = true;
    bl.setPointerCapture(ev.pointerId);
    updateFromBloch(ev);
  });
  bl.addEventListener("pointermove", (ev) => {
    if (isDraggingBloch) updateFromBloch(ev);
  });
  const stopBlochDrag = () => { isDraggingBloch = false; };
  bl.addEventListener("pointerup", stopBlochDrag);
  bl.addEventListener("pointercancel", stopBlochDrag);

  function updateFromBloch(ev) {
    const r = bl.getBoundingClientRect();
    const px = (ev.clientX - r.left) * (bl.width / r.width) - bl.width / 2;
    const py = (ev.clientY - r.top) * (bl.height / r.height) - bl.height / 2;
    let th = Math.atan2(px, -py);
    if (th < 0) th = 0;
    let val = (th / (Math.PI / 4)) * 100;
    dial.value = Math.max(0, Math.min(100, val));
    updateDial();
  }

  document.getElementById("roll").addEventListener("click", () => {
    // sample a branch by its Born probability; show outcome + Pauli-frame fix
    const u = Math.random();
    let acc = 0, s = 0;
    for (s = 0; s < 32; s++) { acc += lastRun.branches[s].p; if (u < acc) break; }
    if (s >= 32) s = 31;
    const bits = s.toString(2).padStart(5, "0").split("").reverse().join("");
    branchout.innerHTML =
      `dice said <span class="mono">${bits}</span> (one of 32 random outcomes) → ` +
      `apply Pauli <b>${lastRun.frame[s]}</b> → <b>same programmed state, every time</b>. ` +
      `That correction trick is how measurement-based quantum computers work.`;
  });

  render();
  updateDial();
})();
