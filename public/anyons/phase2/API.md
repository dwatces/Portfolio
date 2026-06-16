# Phase 2 API contract — "run YOUR braid on real hardware"

*Prepared 2026-06-10. The physics worker is DONE and tested
(`scripts/playground_phase2_worker.py`); this documents the thin web glue, which
depends on the hosting choice (decide at deploy time — both options below are $0).*

## Flow

1. Site (`/anyons/` Phase-2 button): POST the braid
   `{"L": 4, "moves": [[x,y], ...]}` → gets `{runId, topology, status:"queued"}`.
   The serverless endpoint ONLY validates + enqueues — it never holds the IBM token.
2. Worker (Daniel's box, or any machine with `.venv-gpu` + IBM creds) polls the queue,
   runs `playground_phase2_worker.py --spec ... --live`, posts the result back.
3. Site polls `GET /api/braid/{runId}` → renders the hardware ⟨Z̄⟩ + job id.

## Guards (already implemented in the worker)

- Budget floor: refuse below 30 s remaining on the rolling window.
- Daily cap: 3 hardware runs/day (`~/.playground_quota.json`).
- Sim gate: `ibm_toric_braiding.simulate()` must pass before every submission.
- Topology mapping (honest, shown to the visitor): the visitor's L=4 braid is
  verified BY CLASS on the validated 8-qubit code — contractible → `control`
  (logical must hold), non-contractible → `braid` (logical must flip). The class IS
  the physics; the distance is reduced for the free tier.

## Hosting options (pick one at deploy)

- **Cloudflare Worker + KV** (recommended): `POST /api/braid` writes KV, worker polls
  via the CF API. Free tier ample.
- **Firebase** (matches current hosting): a callable function + Firestore queue —
  but functions need the Blaze plan card-on-file; KV/CF avoids that.
- **v0 zero-backend** (ship-day option): the button opens a mailto/GitHub-issue
  template with the braid JSON — Daniel runs the worker manually, posts the result to
  a public results page. Ugly, honest, zero infrastructure, works the day the site
  ships.

## Until budget rolls over (~June 30)

Keep the button in "waitlist" mode: collect braids (v0 path), run them when the
~419 s frees. First public hardware-verified visitor braid = launch-day content.
