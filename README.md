# danielolliver.com

Daniel Olliver's personal site: hand-written static HTML and CSS in `public/`, served by Firebase Hosting. There's no build step.

## Structure
- `public/index.html`: the homepage (what I do, selected work, research, experience, CV, contact).
- `public/dev/`, `public/ai/`, `public/law/`, `public/essay/`: sub-pages, each self-contained.
- `public/anyons/`: the Quantum Playground; `public/anyons/decoder/` is the error-hunting game.
- `public/research/`: one page per research result.
- `public/assets/img/`: resized photos and figures (made by `scripts/make-images.py`).
- `public/static/fonts/v<version>/`: self-hosted Newsreader and Instrument Sans (copied by `npm run fonts`).
- `public/static/media/font.e7663f1a.ttf`: Work Sans, still loaded by the research pages and `/law`. Keep it.
- `public/ga.js`: the GA4 loader, included on every page.

## Working on it
```
npm install
npm start            # serves public/ on http://localhost:5000
npm run check        # every old URL loads, every page loads /ga.js, no broken internal links
```
To preview on Firebase: `firebase hosting:channel:deploy redesign-<date> --expires 7d`.
