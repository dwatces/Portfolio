# Brief: make the danielolliver.com homepage about AI only

Rebuild **only the homepage** (`/`) of danielolliver.com so it is clearly and only about Daniel Olliver's AI and machine-learning work. His software and web development portfolio stays at `/dev`, which is being redesigned separately. Don't change `/dev`. **Do not deploy.** Work on a new branch, open a pull request, and Daniel previews it himself.

## Commit identity (required)
Before your first commit, run:
```
git config user.name "Daniel Olliver"
git config user.email "74215535+dwatces@users.noreply.github.com"
```
Don't add `Co-Authored-By` trailers or "Generated with" lines to commits or the pull request.

## What the homepage should say
The visitor is a technical reader, researcher, recruiter or AI-curious client. In 10 seconds they should see that Daniel does careful, evidence-first machine learning: geometric and equivariant ML, quantum computing experiments on real hardware, and AI prototypes, with results they can check and things they can play with.

**Facts you may use** (only these, plus what is already on the current homepage components in `src/components/`, the research pages in `public/research/*`, `public/essay`, `public/anyons`, and `public/resume.pdf`):
- Daniel Olliver, Auckland, New Zealand.
- **Postgraduate Certificate in AI (University of Auckland)** and **BSc in Computer Science (AUT)**; graduate teaching assistant at UoA, 2024. Use exactly this wording.
- Independent research in geometric machine learning and quantum computing, 2025-2026: about 30 controlled experiments under one rule (no result recorded before its run completes).
- Anyon braiding reproduced on three IBM quantum processors (ibm_marrakesh, ibm_kingston, ibm_fez) with error bars. Symmetry-tied neural decoders for quantum error correction. The equivariance results (city-data forecasting, the quantum reservoir readout, topological materials). The lattice ("hexlife") study. Take numbers and wording from the research pages themselves; don't invent or round differently.
- The interactive demo `/anyons` ("Hex: play with real quantum matter"), the game `/anyons/decoder` ("The Error-Hunting Game", a neural network he trained), and the essay `/essay` ("I spent six years believing hexagons were the key to AI. Then I tested it.").
- AI prototypes, such as document-aware retrieval (RAG). Describe these as **prototypes**, never as production systems or products in client use.
- Full-stack skills, in one line at most (React, Node, TypeScript, Python, PyTorch, Qiskit), as support for the AI work, not the headline.

**Never:**
- claim production AI systems, AI products in client use, or "put into production". The current homepage overclaims here, so fix it.
- pitch to law or accounting firms. The `/ai` and `/law` pages have been removed; don't link to them or recreate them.
- promote website services on the homepage. Those belong to `/dev` and olliverweb.co.nz. A small "Software development portfolio" link to `/dev` in the header or footer is fine. Olliver Web may appear only as a footer link, if at all.
- add clients, numbers, awards or employers not listed above.

## Structure (suggested)
1. **Hero:** name, a one-line statement about evidence-first ML and quantum computing, and two actions: Explore the research, and Play the Hex demo. Keep the existing `/dev` link for software work.
2. **Research highlights:** cards for each `/research/*` page with its own figure (already in `public/research/`) and one result line taken from that page.
3. **Play and read:** `/anyons`, `/anyons/decoder` and `/essay`.
4. **AI prototypes:** short and honest.
5. **About and education:** PGCert AI, BSc CS, teaching assistant.
6. **Contact:** email `daniel@danielolliver.com`, plus GitHub (github.com/dwatces), LinkedIn (linkedin.com/in/danielolliver) and the CV (`/resume.pdf`).

## Design and build
- Distinctive and calm, a research-lab feel without clichés: no purple gradients, no "AI brain" imagery and no stock photos. Typography should carry it. The research figures are the imagery.
- It must look clearly better than the current homepage, and at least as considered as the research pages.
- You may keep the CRA app or replace the homepage with static HTML and CSS. If you go static:
  - set `firebase.json` `"public"` correctly
  - keep every existing URL working: `/dev/`, `/essay/`, `/anyons/` (and its files), `/anyons/decoder/`, `/research/` and all seven pages, `/resume.pdf`, `/dev/resume.pdf`, `/404.html`, `/sitemap.xml`, `/robots.txt`, favicons and manifest
  - keep `/static/media/font.e7663f1a.ttf` at that exact path, because the research pages load it
  - keep `/ga.js` on every page
- Fast on a phone, WCAG AA, visible focus, `prefers-reduced-motion`, no horizontal scroll at 320 px.
- SEO:
  - title and description about AI and ML research
  - Person JSON-LD (jobTitle about ML/AI research; sameAs github.com/dwatces and linkedin.com/in/danielolliver)
  - canonical https://danielolliver.com/
  - update `sitemap.xml` (no `/ai/` or `/law/`)

## Deliverables
- The new homepage on a branch, plus a pull request (no deploy).
- `docs/AI_HOMEPAGE_SUMMARY.md`: what changed, every factual claim with its source file, the URL check (every old URL still loads), phone Lighthouse before and after, and screenshots of the homepage at 390 and 1440 before and after in `docs/screens/`.
- The exact preview command for Daniel (don't run it): `firebase hosting:channel:deploy ai-home-<date> --expires 7d`.
