# AI homepage: summary

Branch work for danielolliver.com `/`. Nothing has been deployed. To preview it (Daniel runs this, not a session):

```
npx firebase-tools@15.34.0 hosting:channel:deploy ai-home-20261020 --expires 7d --project portfolio-6f211
```

## What changed

- `public/index.html` is now a static, self-contained page about AI and machine-learning research only (inline CSS, one tiny script that preloads lazy figures when the browser is idle and is skipped on Save-Data). It replaces the old Create React App template.
- `firebase.json`: `"hosting"."public"` changed from `"build"` to `"public"`. The ignore list and headers are unchanged. `src/` is left in place but is no longer deployed.
- `public/sitemap.xml`: homepage `lastmod` set to 2026-10-20. Every other URL kept (they all still exist). There is no `/ai/` or `/law/` in it.
- Not touched: `public/dev/**`, `public/static/media/font.e7663f1a.ttf`, `src/`, `/resume.pdf` (kept so the URL works, not linked from the homepage).
- Screenshots: `docs/ai-homepage/screens/final-390-c*.jpg` and `final-1440-c*.jpg`.

Why: Daniel asked for the main page to "focus purely on AI and nothing about web dev work whilst linking research papers", with the papers linked as on LinkedIn. The old page pitched an "AI engineer" with production claims and web work, so all of that is gone. The only trace of dev work is the footer link "Software development portfolio" to `/dev/`.

## Page structure

1. Header: name plus Papers, Notes, Play, About, Contact. Below 540px the name in the header is hidden (the H1 directly below carries it) so the nav stays on one row at 320 and 390.
2. Hero: kicker "AI research · machine learning · quantum computing · Auckland, NZ", H1 name, one serif line, the rule line, a tally (2 preprints, 7 research notes, 3 IBM quantum processors, each with a sub-line), "Read the papers" and "Play the Hex demo", and Fig. 1, the braiding panel of the hardware figure.
3. Papers: a numbered reference list [1] and [2]. Each has meta, title, a summary taken from the abstract, a dark DOI button ("DOI 10.5281/… | Read the preprint"; the DOI string stays visible at every width), secondary links in one underlined style and a Cite disclosure. Then "More on LinkedIn: another research post".
4. Research notes: two full notebook entries (Note 01 braiding, with Fig. 2 showing the flux and anyon panels; Note 02 decoders, with Fig. 3), then a grid of compact figure cards for Notes 03 to 07 and a link to `/research/`.
5. Play and read: Hex, the Error-Hunting Game, the essay.
6. About: research summary, the one-rule pull quote, the self-caught incident, the null result, then education and teaching.
7. Contact: the serif email (inside `<!--email_off-->`), then ruled rows for GitHub, LinkedIn and both DOIs.
8. Footer: © 2026 line and the `/dev/` link.

Page height: 7,047px at 1440, 7,108px at 1920, 8,783px at 768, 11,108px at 390 and 11,941px at 320. Prototype B was 9.1k at 1440 and 12.7k at 390.

## Where each part came from

- **Prototype B (winner):** the overall design (paper and band palette, serif headings, mono data, vermilion figure numbers), the hero with Fig. 1, the reference-list papers with [n] and the mono data line, the boxed Result on notebook entries, the Fig. 2 crop, Play-card copy including "The classical matching algorithm still wins, and the game says so.", and the About null-result paragraph.
- **Prototype A:** the dark DOI button, the Cite disclosure, the compact figure-card grid for the less central notes, tally sub-lines, contact ruled rows with handles, the © footer line, and the wording "Separate note…" (A's "Related research note" link, reworded).
- **Prototype C:** cropping wide figures to a single panel on phones with a caption saying so, the decoder evidence line about the plain twin, the self-caught incident for About, and the idle-time lazy-image warm-up.

## Judge items and what was done

### Truth judge: must-fix
| Item | Status |
|---|---|
| Paper 2's link to `/research/hexlife/` must not imply the note is the paper's evidence | Applied: relabelled "Separate note: Lenia-class patterns on square and hex lattices". |
| Hero "Every number here…" overclaims | Applied: now "Every result on this page comes from a completed, logged run, and the negative results stay in." |
| Paper 2 summary limited to the abstract; no 44%, 12/12 or "hexagonal advantage" as a result; "normalisation artefact" unquoted | Applied. The summary says an apparent advantage was a normalisation artefact, documented and retracted, and that the second result was tested out of sample under pre-registration. |
| Decoder baseline 0.9943 vs 0.9948, sourced to `/research/decoder/` | Applied (see the facts table). The `/anyons/` figure 0.9944 is not used anywhere. |
| Exact braiding numbers in the caption and alt text | Applied: +0.845 ± 0.030, −0.843 ± 0.035, +0.845 control, with no rounding. |
| DOI string visible at 320 | Applied. Below 480px the button stacks the DOI over "Read the preprint"; nothing is hidden. |
| Explicit twitter:title, description and image | Applied (plus twitter:image:alt). No email in the JSON-LD. |
| Summary must source GTX 1070, cloud GPUs, three IBM computers, free tier, "more than two dozen", and the TA role | Applied (facts table). The "free tier" phrase is not used on the page. |

### Truth judge: grafts
| Graft | Status |
|---|---|
| B hero Fig. 1 | Kept, as a real `<img>` crop. |
| B paper 1 data line | Kept. |
| B Error-Hunting sentence | Kept. |
| B About null paragraph | Kept, slightly shortened. |
| C one-rule incident | Applied in About. |

### Truth problems (checked that the final page has none of them)
| Problem | Status |
|---|---|
| A/B "Related research note" to hexlife | Fixed (relabelled, see above). |
| A/B "Every number here…" | Fixed. |
| B Note 07 tag "paper [2]" and "Paper [2] DOI" | Removed. The tag is now "Pattern formation · Lenia-class". |
| B "Seven short write-ups from 2025–2026 … Matched parameters and controls throughout" | Replaced with "Seven short write-ups, each with its figure and the result it supports." |
| C "None of it is new physics" applied to everything | Not present. "Not new physics" appears only in Note 01's hardware result, as on `/research/braiding/`. |
| C extends the 116-check audit to paper 2 | Not present. The 116-check audit is listed only under paper 1. |
| C rounded alt text | Not present. |
| C "310 trainings" chip | Not present. |
| C invented struck-through claim | Not present. |
| C "Two results are now preprints" | Not present. |
| C email in the JSON-LD | Not present. |

### Design judge: must-fix
| Item | Status |
|---|---|
| Cut length: full entries only for braiding and decoders, the rest as a compact grid; ≤~9,000 at 390 and ≤~7,000 at 1440 | Applied structurally. 1440 is 7,047 (met). 390 is 11,108: below B's 12.7k but **not** at 9k (see doubts). |
| Cap figure spreads (no figure over ~440px tall or ~900px wide at 1440/1920) | Applied. Figures sit in the content column (~816px wide at 1440). Fig. 2 is ~330px tall and Fig. 3 is in a side layout ~410px wide. At 1920 the full-width note cards are ~915px wide and under 360px tall. |
| DOI as the visually primary action, label kept at 390; one consistent secondary link style | Applied. `pip install demsym` now uses the same underlined sans as the other links. |
| Phones: Fig. 3 (non-Abelian) and Fig. 8 (hexlife) as single cropped panels with a crop note | Applied. Below 600px they show panel (a) and the left panel, captioned "full figure in the note". Fig. 2 also shows one panel on phones, with a note. |
| Nav one row at 320 and 390 | Applied (header name hidden below 540px; five links spread across the row, each at least 44px). |
| Unify type scale | Applied: one body size (1rem) for all running text, 0.88rem captions, 0.8rem mono data, 0.75rem labels. Paper and entry titles are the largest serif after the H1 and section H2s. |
| Real `<img>` crops for Fig. 1 and 2 | Applied: wrapper with aspect-ratio and overflow hidden, plus `<img>` with width/height, alt and decoding=async. |
| prefers-reduced-motion and focus-visible | Applied. Smooth scrolling only under no-preference, a reduced-motion block, and a global focus ring that covers DOI buttons, Cite summaries and card links. |
| Even vertical rhythm, one section padding token | Applied: `--sec` (52/72/80px). |
| Contact as labelled ruled rows | Applied. |

### Design judge: grafts
| Graft | Status |
|---|---|
| A DOI button | Applied. |
| A Cite | Applied. |
| A compact grid | Applied (Notes 03–07). |
| A contact | Applied. |
| C phone crops | Applied. |
| C essay pull quote ("I falsified the thing I most wanted…") | **Not applied.** It would add length, the essay card already states the finding, and About already carries a serif pull quote. |

### Visitor judge: must-fix
| Item | Status |
|---|---|
| Cut length (keep 01–03 full) | Applied using the design judge's split: braiding and decoders full, so the non-Abelian note became a card. 1440: 7,047 (target 6–7k, met). 390: 11,108 (target under 10k, not met). |
| Fig. 2 not full-width | Applied (content column, two panels, capped height). |
| Consistent section grid | Applied. Every section after the hero uses the sticky 220px label column at ≥1000px, with the same padding. |
| DOI primary | Applied. |
| Remove "paper [2]" from Note 07 | Applied. Note 02 keeps "related: paper [1]", because `/research/decoder/` itself covers the honeycomb Floquet code, demsym and the plain twin that never learns (the paper's subject). It links to the paper's entry, `#paper-1`. |
| "AI" in the first line | Applied (kicker and dek). |
| Cite and tally sub-lines | Applied. |
| Contact handles, no inline styles, email_off, no JSON-LD email | Applied. |
| Remove doubled labels | Applied. Sections now have just an H2 and a one-line description. |
| Wide figures at 390 | Applied through single-panel crops. Each compact card is one link to its note, where the full figure is. |
| © 2026 footer, only `/dev/`, no `/resume.pdf`, `/ai/` or `/law/` | Applied and checked by grep. |
| Re-shoot and check | Done at 320, 390, 768, 1440 and 1920: no horizontal overflow, 0 tap targets under 44px, no console errors, no failed requests, all images have alt text, and the font loaded. Headings: H1, then H2 per section, then H3 per item. |

### Visitor judge: grafts
| Graft | Status |
|---|---|
| A compact grid | Applied. |
| A DOI | Applied. |
| A Cite | Applied. |
| A tally sub-lines | Applied. |
| A contact | Applied (label stacks over value below 480px). |
| C decoder evidence line | Applied: "On the honeycomb Floquet code, the identical plain twin never learns the task the symmetry-aware one solves." |
| C lazy warm-up | Applied. |

## Every factual claim and its source

| Claim on the page | Source |
|---|---|
| Daniel Olliver, Auckland, New Zealand | Brief, "Other facts" |
| Evidence-first AI research; symmetry-using neural networks; quantum experiments on real IBM hardware with controls and error bars | Brief ("The visitor and the job"); `/research/` index line |
| Every result comes from a completed, logged run; negatives stay in | `/research/*` footer line ("Every number above is from a completed, logged run … negatives included"); essay |
| 2 preprints | Brief (two papers) |
| 7 research notes | `public/research/` (seven subpages) |
| 3 IBM quantum processors: ibm_marrakesh, ibm_kingston, ibm_fez | `/research/braiding/`; brief |
| Fig. 1: ⟨Z̄⟩ +0.845 ± 0.030 → −0.843 ± 0.035, control +0.845, three devices | `/research/braiding/`; essay; `/anyons/` table; figure `kitaev_topological_order.png` |
| Paper 1 title, date 16 June 2026, DOI, code, demsym, LinkedIn post | Brief |
| Paper 1 summary (twisted equivariance depends on the code; obstructed for surface code; exact for the honeycomb Floquet code; C3 mixes the logical qubits; unlearnable → learned) | Paper 1 abstract quoted in the brief |
| 999 spacetime maps · 1,728 schedules · ≥256× sample-efficiency separation · 116-check audit | Paper 1 abstract |
| "Play against the trained net" | LinkedIn post wording quoted in the brief |
| Paper 2 title, date 27 July 2026, DOI | Brief |
| Paper 2 summary (NCA trained on square grids by default; lattice as an experimental variable; apparent hex advantage a normalisation artefact in cross-lattice comparisons, documented and retracted; second result tested out of sample under pre-registration) | Paper 2 abstract opening quoted in the brief. No outcome is claimed. |
| Second LinkedIn post (not described) | Brief, item 3 |
| Note 01: measured on superconducting hardware with a matched-depth control beside every claim | `/research/braiding/` |
| Fluxes conserved (+0.64), control destroyed them (+0.12); anyon −0.905 ± 0.010, neighbour +0.924 ± 0.015 | Essay, "Verdict four"; `/anyons/` table (anyon numbers) |
| "Not new physics: measured by one person, on three independent machines" | `/research/braiding/` |
| Fig. 2 caption (flux conserved by Kitaev, broken by field; local op flips one plaquette, neighbour untouched) | Panel titles in `kitaev_topological_order.png` |
| Note 02: decoder reads error alarms and names the fault; scarce labelled data; inductive bias over raw scale | `/research/decoder/` |
| Identical parameter count, wins at every training size, ~4× more sample-efficient, 0.9943 vs 0.9948 | `/research/decoder/` |
| Honeycomb Floquet code: identical plain twin never learns the task the symmetry-aware one solves | `/research/decoder/` |
| Fig. 3: surface code d=3, identical 21,377 parameters, 5 seeds, 200k test shots | Title of `equiv_decoder.png` |
| Note 03: Ivanov-pattern match 0.975; disjoint exchanges commute to 0.005 | `/research/nonabelian/` |
| Note 04: exact C3 commutation, [P,H] error = 0, large sample-efficiency gains when data is scarce | `/research/qrc/` |
| Note 05: matched C3 prior wins at every scarce size; C6 broken by the sublattice mass term underperforms everywhere | `/research/chern/` |
| Note 06: hex-equivariant beats directional in 10 of 10 city-seasons; gain largest where history is thinnest | `/research/coldstart/` |
| Note 07: Lenia-class; at normal scales patterns don't care about the lattice; below ~3 lattice constants the substrate owns them; 11,946 patterns; replicated on independent hardware | `/research/hexlife/` |
| Hex: braid anyons on a torus, logical qubit flips without being touched; headline interactions verified on real IBM processors | `/anyons/` |
| Error-Hunting Game: 63,000-parameter neural decoder running live; the matching algorithm still wins | `/anyons/decoder/` ("Honesty first: the net does not beat the gold standard here") |
| Essay title and finding (hex wiring doesn't help; symmetry tying helps only with scarce data and real symmetry) | `/essay/`; brief |
| Independent research 2025–2026 in geometric ML and quantum computing | Brief |
| More than two dozen controlled experiments; GTX 1070; free cloud GPUs; three of IBM's quantum computers | `/essay/` intro paragraph |
| "No result gets written down before its run completes." | `/essay/`, "The rule" |
| Self-caught incident; "conviction will fabricate evidence if you let it" | `/essay/`, "The rule" |
| Hex wiring hypothesis came back cleanly false; symmetry helps when exactly present and data is scarce; topology shows up on real quantum hardware | `/essay/` "Verdict one" and "Verdict two"; `/anyons/` ("The gifts that survived are symmetry … and topology") |
| Postgraduate Certificate in AI (University of Auckland); BSc in Computer Science (AUT) | The brief (exact wording) |
| Graduate teaching assistant, University of Auckland, 2024 | Brief |
| Email, GitHub, LinkedIn | the brief |
| JSON-LD: Person (jobTitle about AI/ML research, alumniOf AUT and University of Auckland, sameAs GitHub and LinkedIn, no email) and two ScholarlyArticles (name, datePublished, author, identifier = DOI URL) | Brief, SEO section |

## URL check

`public/` was copied to `work/home/urlcheck`, its `ga.js` emptied, and the copy served on `http://127.0.0.1:6421`. Every URL returned 200:

| URL | Status |
|---|---|
| / | 200 |
| /dev/ | 200 |
| /dev/resume.pdf | 200 |
| /essay/ | 200 |
| /anyons/ | 200 |
| /anyons/decoder/ | 200 |
| /research/ | 200 |
| /research/braiding/ | 200 |
| /research/chern/ | 200 |
| /research/coldstart/ | 200 |
| /research/decoder/ | 200 |
| /research/hexlife/ | 200 |
| /research/nonabelian/ | 200 |
| /research/qrc/ | 200 |
| /resume.pdf | 200 |
| /404.html | 200 |
| /sitemap.xml | 200 |
| /robots.txt | 200 |
| /favicon.ico | 200 |
| /favicon.png | 200 |
| /favicon-96.png | 200 |
| /apple-touch-icon.png | 200 |
| /manifest.json | 200 |
| /static/media/font.e7663f1a.ttf | 200 |
| /ga.js | 200 |
| /research/*.png (all seven figures used on the page) | 200 |

## Remaining doubts

- **Phone length.** At 390 the page is 11,108px. That is below prototype B's 12.7k, but above the design judge's ~9k and the visitor judge's 10k. The rest is real content (two papers, two notebook entries, five figure cards, three Play cards, About). Cutting more would mean dropping figures or copy on phones; Daniel may want to decide which.
- **Note 02 "related: paper [1]".** It is kept because `/research/decoder/` covers the honeycomb Floquet result, demsym and the plain twin that never learns, all from paper 1's abstract. But the note's headline numbers are surface-code results. Daniel can confirm the link.
- **Paper 2 and `/research/hexlife/`.** These share a title phrase but cover different systems (NCA vs Lenia-class). The link is labelled "Separate note" so it doesn't imply the note is the paper. Daniel may prefer to drop it.
- **Header on phones.** Below 540px the header shows only the five section links. The name is the H1 immediately below. If Daniel wants the name in the header on phones, the nav would need to wrap or lose an item.
- **Paper 2 abstract.** zenodo.org was not fetched, so the summary stays within the quoted opening of the abstract and does not state the outcome of the pre-registered test.
- The Fig. 1 and Fig. 2 crops use fixed pixel offsets for `kitaev_topological_order.png` (2100×644). If that PNG is ever regenerated at another size, the crops need updating.
