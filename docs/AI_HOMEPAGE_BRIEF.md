# Brief: make the danielolliver.com homepage about AI only

Read `CLAUDE.md` first: commit identity, the never list, and which files you own.

## What Daniel asked for (verbatim, 20 Oct 2026)
- "the ./dev should focus on dev work, the main danielolliver.com should focus on AI work"
- "if we want to use claude github to fix the main page danielolliver.com to focus ONLY on AI that would be good"
- "also on danielolliver.com link the research papers on linkedin"
- "danielolliver.com (main page) needs to focus purely on AI and nothing about web dev work whilst linking research papers"
- "don't make it live"
- "make sure claude doesn't show as a contributor at all"

So: rebuild **only the homepage** (`/`) so it is clearly and only about Daniel Olliver's AI and machine-learning research, with his research papers linked. His web and software development work lives at `/dev`, which another session is redesigning; don't change anything under `public/dev/`. **Do not deploy.** Work on a new branch, open a pull request, and Daniel previews it himself.

## The visitor and the job
The visitor is a researcher, a technical reader, a recruiter for ML roles or someone curious about the work. In 10 seconds they should see that Daniel does careful, evidence-first machine learning: geometric and equivariant ML and quantum computing experiments on real hardware, with **papers they can read**, results they can check and demos they can play.

## Research papers: the centre of the page
Each paper gets a proper card: title, date, "Preprint · Zenodo", a one or two sentence summary taken from the abstract below (don't invent or strengthen anything), and links. The DOI is the main link. "Discussed on LinkedIn" is a secondary link where a post exists.

1. **Circuit-level equivariance is code-dependent: obstruction in the surface code, exactness in the honeycomb Floquet code, and consequences for neural decoders.** Daniel Olliver, preprint, 16 June 2026.
   - DOI: https://doi.org/10.5281/zenodo.20715320
   - Code: https://github.com/dwatces/equivariant-quantum-ml. Solver package: https://pypi.org/project/demsym/ (`pip install demsym`)
   - LinkedIn post: https://www.linkedin.com/feed/update/urn:li:activity:7472739252942901248/
   - Abstract (source of facts): "Whether exact (twisted) equivariance survives at circuit level is a property of the code: obstructed for surface-code extraction circuits (999 spacetime maps, 1,728 schedules, with a mirror-axis impossibility lemma), exact for the honeycomb Floquet code, whose C3 rotation mixes the logical qubits (GL(2,F2)). The exactly-tied decoder flips the honeycomb task from unlearnable to learned (≥256× sample-efficiency separation; noise-rate sweep included). Solver released as the demsym package (pip install demsym); every number traces to a logged run via a 116-check audit."
   - The LinkedIn post adds: "Play against the trained net in your browser" (the game at `/anyons/decoder/`).
2. **The lattice's teeth: primitive reciprocal axes govern which Fourier components neural cellular automata can grow.** Daniel Olliver, preprint, 27 July 2026.
   - DOI: https://doi.org/10.5281/zenodo.21614035
   - Abstract (opening, source of facts): "Neural cellular automata (NCA) are trained on square grids by default. This preprint treats the lattice as an experimental variable and reports two results, together with the outcome of a pre-registered out-of-sample test of the second one. 1. A normalization artifact in cross-lattice comparisons, documented and retracted. … In a 310-training study this produced a 44% 'advantage' of hexagonal over square substrates that reproduced in 12/12 restarts and survived an operator-conditioning control, while … every wave training on every lattice had in fact converged to the predict-the-mean solution or stopped short of it."
   - Careful: this paper leads with a **retracted** artifact. Never present the 44% as a result. The honest summary is that the lattice is treated as an experimental variable, an apparent hexagon advantage was traced to a normalization artifact and retracted, and the second result was tested out of sample under pre-registration. If you can't reach zenodo.org to read the rest of the abstract, keep the summary to what is quoted here.
3. A second LinkedIn research post exists: https://www.linkedin.com/feed/update/urn:li:activity:7470646053034455040/. Link it only from a "More on LinkedIn" line; don't describe it.

Also add a short "Papers" line in the hero or the header (for example "2 preprints · 7 research notes · 3 IBM quantum processors"), but only with counts you can verify from this brief and `public/research/`.

## Other facts you may use
Use only these, plus what is on the research pages (`public/research/*`), `public/essay` and `public/anyons`:
- Daniel Olliver, Auckland, New Zealand.
- **Postgraduate Certificate in AI (University of Auckland)** and **BSc in Computer Science (AUT)**; graduate teaching assistant at UoA in 2024. Use exactly this wording.
- Independent research in geometric machine learning and quantum computing, 2025-2026: more than two dozen controlled experiments under one rule, that no result is written down before its run completes (the essay's wording).
- Anyon braiding reproduced on three IBM quantum processors (ibm_marrakesh, ibm_kingston, ibm_fez) with error bars. Symmetry-tied neural decoders for quantum error correction. The equivariance results (city-data cold-start forecasting, the quantum reservoir readout, topological materials). The lattice ("hexlife") study. Take numbers and wording from the research pages themselves; don't invent or round differently.
- The essay's honest finding: hexagonal wiring does **not** help a network learn; 6-fold symmetry tying helps only when data is scarce and the symmetry is really there. Don't contradict it anywhere.
- The interactive demo `/anyons/` ("Hex: play with real quantum matter"), the game `/anyons/decoder/` ("The Error-Hunting Game", a neural network he trained), and the essay `/essay/` ("I spent six years believing hexagons were the key to AI. Then I tested it.").
- AI prototypes, such as document-aware retrieval (RAG). Describe them as **prototypes**, never as production systems or products in client use. Keep this short, or leave it out if it weakens the research focus.
- Research tools, only where the research pages show them: Python, PyTorch, Qiskit.

## Nothing about web development
- No web-dev services, no client websites, no full-stack skills list, no React/Node, no Olliver Web, no "hire me to build your site".
- The only trace of the dev work allowed is **one small footer link**: "Software development portfolio" to `/dev/`. Nothing in the header or hero.
- Don't link `/resume.pdf` from the homepage. That CV is a full-stack developer CV, so it doesn't belong on an AI-only page. Keep the file so the URL still works. Contact is email, LinkedIn, GitHub and the papers.
- Never claim production AI systems, AI products in client use, or "put into production". The current homepage overclaims, so remove all of that.
- No law or accounting pitch, and no link to `/ai/` or `/law/`.

## Structure (suggested; the workflow's prototypes may try others)
1. **Hero:** name, one line about evidence-first ML and quantum computing, and two actions: "Read the papers" and "Play the Hex demo".
2. **Papers:** the two preprint cards (see above).
3. **Research notes:** a card for each `/research/*` page, with its own figure (already in `public/research/`) and one result line taken from that page.
4. **Play and read:** `/anyons/`, `/anyons/decoder/` and `/essay/`.
5. **About and education:** PGCert AI, BSc CS, teaching assistant, the one rule.
6. **Contact:** daniel@danielolliver.com (wrapped in email_off), GitHub, LinkedIn, Zenodo DOIs. Then the footer with the small `/dev/` link.

## Design and build
- Distinctive and calm, a research-lab feel without clichés: no purple gradients, no "AI brain" imagery and no stock photos. Typography should carry it, and the research figures are the imagery.
- It must look clearly better than the current homepage (`docs/ai-homepage/ref/current-shots/`) and at least as considered as the research pages (`research-*.jpg` in the same folder).
- **Build it as a static page:** write `public/index.html` as plain HTML and CSS (inline, self-contained, plus a tiny script only if needed), set `firebase.json` `"public": "public"`, and leave `src/` in place but unused. That way the deploy is the `public/` folder, with no build step. Then:
  - keep every existing URL working: `/dev/`, `/essay/`, `/anyons/` (and its files), `/anyons/decoder/`, `/research/` and all seven pages, `/resume.pdf`, `/dev/resume.pdf`, `/404.html`, `/sitemap.xml`, `/robots.txt`, favicons and `manifest.json`
  - `/static/media/font.e7663f1a.ttf` is already committed in `public/static/media/`; keep it
  - keep `/ga.js` on the page
- Fast on a phone, WCAG AA, visible focus, `prefers-reduced-motion`, no horizontal scroll at 320 px.
- SEO:
  - title and description about AI and ML research
  - Person JSON-LD (jobTitle about ML and AI research; alumniOf AUT and the University of Auckland; sameAs github.com/dwatces and linkedin.com/in/danielolliver)
  - ScholarlyArticle JSON-LD for each paper (name, datePublished, author, identifier = the DOI URL)
  - canonical https://danielolliver.com/
  - update `public/sitemap.xml` (no `/ai/` or `/law/`)

## How to run it
- If the **Workflow** tool is available, run it with `scriptPath: "docs/ai-homepage/workflow.js"` (no args). It builds three competing prototypes, has three judges score them, and then a finisher writes the winner into `public/index.html`.
- If the Workflow tool isn't available, do the same stages yourself, in order: three prototypes in `work/home/protos/{A,B,C}/site`, three judging passes (truth, design, visitor), then finish. Use subagents for these if you have them.
- Screenshot tool: `cd docs/tools && npm install && npx playwright install chromium` (if Chromium won't launch, run `npx playwright install --with-deps chromium`). Then run `node docs/tools/shoot.mjs <url> <outDir> 390,768,1440,1920 <prefix>` from the repo root. Read the chunk images it writes: measuring a page is not the same as looking at it.

## Deliverables
- The new homepage on your branch, plus a pull request (no deploy). The PR body must not contain any Claude attribution.
- `docs/AI_HOMEPAGE_SUMMARY.md`, covering:
  - what changed
  - every factual claim with its source (file path, or the abstract above)
  - the URL check: every old URL still loads from a local server of `public/`
  - screenshots of the new homepage at 390 and 1440 in `docs/ai-homepage/screens/` (JPEG)
- The exact preview command for Daniel, which you don't run: `npx firebase-tools@15.34.0 hosting:channel:deploy ai-home-<yyyymmdd> --expires 7d --project portfolio-6f211`.
