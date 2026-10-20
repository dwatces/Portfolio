# danielolliver.com

Source of [danielolliver.com](https://danielolliver.com/), Daniel Olliver's personal site: AI and machine-learning research on the homepage, two in-browser quantum demos, and a software development portfolio at [/dev](https://danielolliver.com/dev/).

The site is plain static HTML, CSS and JavaScript in `public/`. There is no build step: Firebase Hosting serves `public/` as it is (`firebase.json`, `"public": "public"`).

## Pages

| Path | What it is | Source |
| --- | --- | --- |
| `/` | AI research homepage: two preprints on Zenodo, seven research notes, the essay and the demos | `public/index.html` |
| `/research/` | Index of the seven research notes | `public/research/index.html` |
| `/research/<note>/` | One page per note: `braiding`, `nonabelian`, `decoder`, `qrc`, `chern`, `coldstart`, `hexlife` | `public/research/*/` |
| `/essay/` | "I spent six years believing hexagons were the key to AI. Then I tested it." | `public/essay/index.html` |
| `/anyons/` | Hex: braid anyons on a toric-code board and turn a measurement-angle dial on a six-qubit hexagon cluster state | `public/anyons/` |
| `/anyons/decoder/` | The Error-Hunting Game: trained quantum error-correction decoders running in the browser | `public/anyons/decoder/` |
| `/dev/` | Software development portfolio, with the CV at `/dev/resume.pdf` | `public/dev/` |

The two preprints linked from the homepage:

- Olliver, D. (2026). *Circuit-level equivariance is code-dependent: obstruction in the surface code, exactness in the honeycomb Floquet code, and consequences for neural decoders* [Preprint]. Zenodo. https://doi.org/10.5281/zenodo.20715320
- Olliver, D. (2026). *The lattice's teeth: primitive reciprocal axes govern which Fourier components neural cellular automata can grow* [Preprint]. Zenodo. https://doi.org/10.5281/zenodo.21614035

The code behind the first preprint is in [equivariant-quantum-ml](https://github.com/dwatces/equivariant-quantum-ml), and its symmetry solver is published on PyPI as [demsym](https://pypi.org/project/demsym/).

## The two demos

**Hex (`/anyons/`)** runs a stabilizer simulation written in JavaScript (`engine.js`), with no server:

- `Tableau`: an Aaronson-Gottesman (CHP) stabilizer simulator with exact Pauli expectation values.
- `ToricCode`: ground-state preparation, anyon creation and dragging, syndromes and logical operators on a torus.
- `MBQCHex`: a six-qubit statevector simulation of the hexagon cluster-state magic injection.

When a visitor completes a loop, the "queue this braid" button opens a prefilled GitHub issue on equivariant-quantum-ml with the braid spec.

**The Error-Hunting Game (`/anyons/decoder/`)** loads float16 weights of trained honeycomb Floquet code decoders from `data/` and runs the forward pass in `decoder.js`. Visitors guess errors themselves, watch the network decode a stream of 2,000 shots beside precomputed minimum-weight matching answers, compare a symmetry-tied network with a plain one of the same size, and drag a slider across networks trained on 250 to 64,000 examples.

## Run it locally

The pages use root-relative paths (`/ga.js`, `/static/media/...`), so serve `public/` as the web root rather than opening the files directly:

```bash
python3 -m http.server 8000 --bind 127.0.0.1 --directory public
```

Then open http://127.0.0.1:8000/. Any static file server pointed at `public/` works the same way.

## Tests

Both demos have plain Node test scripts with no dependencies:

```bash
node public/anyons/test_engine.js           # stabilizer engine against the validated Python results
node public/anyons/decoder/test_decoder.js  # JS forward pass against the PyTorch logits, and stream accuracy against data/meta.js
```

## Project structure

```
public/              the site, served as is
  index.html         AI research homepage
  research/          research index and the seven notes
  essay/             the essay
  anyons/            Hex demo (engine.js, app.js, test_engine.js)
  anyons/decoder/    Error-Hunting Game (decoder.js, app.js, data/, test_decoder.js)
  dev/               developer portfolio, CV and its assets
  static/media/      self-hosted fonts
  ga.js              Google Analytics 4 loader, included on every page
firebase.json        Hosting config: serves public/ and sets cache headers
src/, package.json   the earlier Create React App homepage (started in 2021), kept in the repo but no longer deployed
docs/                briefs, summaries and reference screenshots from the 2026 redesigns; docs/tools/shoot.mjs is a Playwright screenshot script
```

`npm start` and `npm run build` belong to the old React app in `src/`. The static site does not need `npm install`.

## Author

Built by Daniel Olliver. More of my work: [danielolliver.com/dev](https://danielolliver.com/dev/).
