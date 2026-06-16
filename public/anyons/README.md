---
title: Honeycomb Decoder Playground
emoji: "⚛️"
colorFrom: indigo
colorTo: purple
sdk: static
pinned: false
license: mit
---

# Honeycomb Floquet code — topological order & an equivariant-decoder learnability switch

An interactive, fully client-side playground (no backend, no tracking, nothing to install).
Two parts:

1. **Topological order on the Kitaev honeycomb** — conserved plaquette fluxes, the
   non-Abelian phase, and how that structure shows up in error correction.
2. **Equivariant neural decoder** — trained honeycomb-Floquet decoders run *live in your
   browser* (float16 weights exported from PyTorch). Watch the sample-efficiency "switch":
   a 9-element twisted-equivariant tying beats a plain network of ~22× the size, because the
   circuit-level detector error model carries an exact p3 space-group symmetry.

The symmetry solver behind this is open source: **`pip install demsym`**
(https://pypi.org/project/demsym/). Method + full results: preprint in preparation.

Code & logs: https://github.com/dwatces · Author: Daniel Olliver.
