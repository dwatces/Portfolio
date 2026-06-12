/* Decoder playground UI. All accuracies shown are computed here, in the page,
 * by running the shipped nets on the shipped shot stream (see test_decoder.js
 * for the node gates proving the JS forward == the trained python model). */
"use strict";
(function () {
  const META = window.DECODER_META;
  const ENGINE = window.DECODER_ENGINE;
  const RAW = window.DECODER_MODELS;
  const stream = new ENGINE.ShotStream(META);
  const models = {};
  function model(name) {
    if (!models[name]) models[name] = new ENGINE.DecoderModel(RAW[name]);
    return models[name];
  }
  const hero = () => model("p3_9_64k");

  // ---------- honeycomb board ----------
  const cv = document.getElementById("board");
  const ctx = cv.getContext("2d");
  const L = META.L, SQ3 = Math.sqrt(3);
  const HEX = 25;
  const centers = {};
  let minx = 1e9, maxx = -1e9, miny = 1e9, maxy = -1e9;
  for (let i = 0; i < L; i++) {
    for (let j = 0; j < L; j++) {
      const x = SQ3 * HEX * (i + j / 2), y = 1.5 * HEX * j;
      centers[i + "," + j] = [x, y];
      minx = Math.min(minx, x); maxx = Math.max(maxx, x);
      miny = Math.min(miny, y); maxy = Math.max(maxy, y);
    }
  }
  const offx = (cv.width - (maxx - minx)) / 2 - minx;
  const offy = (cv.height - (maxy - miny)) / 2 - miny;
  const faceDets = {};   // "i,j" -> [detector ids]
  META.layout.forEach((fij, d) => {
    if (fij[0] < 0) return;
    const k = fij[0] + "," + fij[1];
    (faceDets[k] = faceDets[k] || []).push(d);
  });
  const IDLE = ["#141a26", "#10161f", "#171c28"]; // subtle 3-colouring

  function hexPath(x, y, r) {
    ctx.beginPath();
    for (let k = 0; k < 6; k++) {
      const a = Math.PI / 180 * (60 * k + 30);
      const px = x + r * Math.cos(a), py = y + r * Math.sin(a);
      if (k === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.closePath();
  }

  function drawShot(x, pulse) {
    ctx.clearRect(0, 0, cv.width, cv.height);
    for (let i = 0; i < L; i++) {
      for (let j = 0; j < L; j++) {
        const key = i + "," + j;
        const [cx0, cy0] = centers[key];
        const cx = cx0 + offx, cy = cy0 + offy;
        let hits = 0;
        for (const d of (faceDets[key] || [])) if (x[d]) hits++;
        hexPath(cx, cy, HEX - 1.5);
        ctx.fillStyle = IDLE[((i - j) % 3 + 3) % 3];
        ctx.fill();
        if (hits > 0) {
          const a = Math.min(0.18 + hits * 0.16, 0.95) *
            (pulse === undefined ? 1 : 0.75 + 0.25 * Math.sin(pulse / 140 + i + j));
          hexPath(cx, cy, HEX - 1.5);
          ctx.fillStyle = `rgba(255,140,66,${a})`;
          ctx.fill();
          ctx.strokeStyle = `rgba(255,209,102,${Math.min(a + 0.15, 1)})`;
          ctx.lineWidth = 1.4;
          hexPath(cx, cy, HEX - 1.5);
          ctx.stroke();
        } else {
          ctx.strokeStyle = "#1e2533";
          ctx.lineWidth = 1;
          hexPath(cx, cy, HEX - 1.5);
          ctx.stroke();
        }
      }
    }
  }

  // ---------- shared helpers ----------
  let playing = false;  // race state; the game pauses it (declared early)
  const $ = (id) => document.getElementById(id);
  const pct = (h, n) => n ? (100 * h / n).toFixed(1) + "%" : "—";
  function chunkedRun(net, i0, n, onTick, onDone) {
    let i = i0, hits = 0;
    (function step() {
      const stop = Math.min(i + 25, i0 + n);
      for (; i < stop; i++) {
        if (net.predict(stream.shot(i)) === META.truth[i]) hits++;
      }
      onTick(hits, i - i0);
      if (i < i0 + n) setTimeout(step, 0);
      else if (onDone) onDone(hits, n);
    })();
  }

  // numbers in the copy/table are the export-time measurements in META;
  // the live runs recompute their own right next to them
  const A = META.arms;
  const f = (v) => (100 * v).toFixed(1) + "%";

  // ---------- round 1: the game ----------
  let seed = 987654321;
  const rnd = () => (seed = (1103515245 * seed + 12345) % 2147483648) / 2147483648;
  const NAMES = ["both made it through", "A took a hit", "B took a hit",
                 "both took a hit"];
  let cur = -1, youH = 0, aiH = 0, rounds = 0, raf = null, autoNext = null;
  const gameButtons = () =>
    document.querySelectorAll("#game .answers button, #tellMe");
  function newRound() {
    if (playing) { playing = false; $("playBtn").textContent = "▶ Play"; }
    clearTimeout(autoNext);
    cur = Math.floor(rnd() * stream.n);
    const x = stream.shot(cur).slice();
    cancelAnimationFrame(raf);
    (function loop(t) {
      drawShot(x, t);
      raf = requestAnimationFrame(loop);
    })(0);
    $("verdict").textContent = "Got a hunch?";
    gameButtons().forEach((b) => {
      b.disabled = false;
      b.classList.remove("right", "wrong", "picked");
    });
  }
  function reveal(guess) {
    if (cur < 0) return;
    const truth = META.truth[cur];
    const ai = hero().predict(stream.shot(cur));
    const hunch = guess >= 0;
    if (hunch) {
      rounds++;
      if (guess === truth) youH++;
      if (ai === truth) aiH++;
      $("scoreYou").textContent = `${youH}/${rounds}`;
      $("scoreAI").textContent = `${aiH}/${rounds}`;
    }
    gameButtons().forEach((bb) => {
      bb.disabled = true;
      const c = +bb.dataset.c;
      if (c === truth) bb.classList.add("right");
      else if (hunch && c === guess) bb.classList.add("wrong");
    });
    const aiBit = ` The net read the same sparks and said “${NAMES[ai]}” — ` +
      `<b class="${ai === truth ? "good" : "bad"}">` +
      `${ai === truth ? "spot on" : "it missed this one"}</b>.`;
    let line;
    if (!hunch) line = `It was: <b class="good">${NAMES[truth]}</b>.` + aiBit;
    else if (guess === truth) {
      line = `🎯 It was “<b class="good">${NAMES[truth]}</b>” — ` +
        `you beat the ~28% odds!` + aiBit;
    } else {
      line = `It was “<b class="good">${NAMES[truth]}</b>”. No shame — ` +
        `this pattern really is invisible by eye.` + aiBit;
    }
    $("verdict").innerHTML = line;
    autoNext = setTimeout(() => { if (!playing) newRound(); }, 3500);
  }
  gameButtons().forEach((b) => {
    b.addEventListener("click", () => reveal(+b.dataset.c));
  });
  $("nextRound").addEventListener("click", newRound);
  newRound();

  // ---------- round 2: the race ----------
  let rIdx = 0, rAI = 0, rMW = 0, rRG = 0, acc = 0, last = 0;
  function raceTick(t) {
    if (!playing) return;
    if (!last) last = t;
    acc += (t - last) * (+$("speed").value) / 1000;
    last = t;
    let drawn = null;
    while (acc >= 1 && rIdx < stream.n) {
      acc -= 1;
      const x = stream.shot(rIdx);
      if (hero().predict(x) === META.truth[rIdx]) rAI++;
      if (META.mwpm_pred[rIdx] === META.truth[rIdx]) rMW++;
      if (Math.floor(rnd() * 4) === META.truth[rIdx]) rRG++;
      drawn = x.slice();
      rIdx++;
    }
    if (drawn) drawShot(drawn);
    $("shotCount").textContent = `shot ${rIdx} / ${stream.n}`;
    $("aiPct").textContent = pct(rAI, rIdx);
    $("mwpmPct").textContent = pct(rMW, rIdx);
    $("rngPct").textContent = pct(rRG, rIdx);
    $("aiFill").style.width = rIdx ? (100 * rAI / rIdx) + "%" : "0%";
    $("mwpmFill").style.width = rIdx ? (100 * rMW / rIdx) + "%" : "0%";
    $("rngFill").style.width = rIdx ? (100 * rRG / rIdx) + "%" : "0%";
    if (rIdx >= stream.n) { playing = false; $("playBtn").textContent = "↻ Again"; rIdx = 0; rAI = rMW = rRG = 0; return; }
    requestAnimationFrame(raceTick);
  }
  $("playBtn").addEventListener("click", () => {
    playing = !playing;
    $("playBtn").textContent = playing ? "❚❚ Pause" : "▶ Play";
    if (playing) { cancelAnimationFrame(raf); last = 0; requestAnimationFrame(raceTick); }
  });

  // ---------- round 3: the twins ----------
  $("runSwitch").addEventListener("click", () => {
    $("runSwitch").disabled = true;
    let done = 0;
    const fin = () => { if (++done === 2) $("runSwitch").disabled = false; };
    chunkedRun(model("plain_64k"), 0, 300,
      (h, n) => { $("plainBig").textContent = pct(h, n); }, fin);
    chunkedRun(model("p3_9_64k"), 0, 300,
      (h, n) => { $("symBig").textContent = pct(h, n); }, fin);
  });

  // ---------- round 4: the data ladder ----------
  const LADDER = [["p3_9_250", "250"], ["p3_9_1k", "1,000"], ["p3_9_4k", "4,000"],
                  ["p3_9_16k", "16,000"], ["p3_9_64k", "64,000"]];
  let ladderRun = 0;
  function ensureLoaded(arm, cb) {
    if (RAW[arm]) return cb();
    $("ladderPct").textContent = "loading…";
    const s = document.createElement("script");
    s.src = `data/model_${arm}.js`;
    s.onload = cb;
    document.body.appendChild(s);
  }
  function runLadder() {
    const [arm, label] = LADDER[+$("ladderSlider").value];
    $("ladderval").textContent = label;
    $("ladderLab").textContent = `net trained on ${label} examples`;
    const my = ++ladderRun;
    ensureLoaded(arm, () => {
      if (my !== ladderRun) return;
      chunkedRun(model(arm), 300, 300, (h, n) => {
        if (my !== ladderRun) return;
        $("ladderPct").textContent = pct(h, n) +
          `  (full test: ${f(A[arm].acc_f16_test)})`;
        $("ladderFill").style.width = (100 * h / Math.max(n, 1)) + "%";
      });
    });
  }
  $("ladderSlider").addEventListener("input", runLadder);
  runLadder();
})();
