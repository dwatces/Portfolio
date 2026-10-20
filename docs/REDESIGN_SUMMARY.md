# Redesign summary: danielolliver.com

Branch: `claude/quirky-hopper-q4pgym`. Nothing has been deployed.

## What changed and why

**The homepage now leads with the web work.** Most visitors arrive from an email about their website, but the old homepage said "Daniel Olliver builds AI systems that hold up to evidence" and barely mentioned websites. On a phone, the first screen now shows:
- his name, Auckland and the photo
- one plain line: "I build and fix websites for New Zealand small businesses, and research machine learning for quantum computing."
- two buttons: **See Olliver Web** and **Contact me**
- the mobile number and email as visible links
- for employers, a one-tap "Hiring a developer? Experience and CV (PDF)" line

Sections, in order:
1. What I do
2. Selected work: Back to Nature Tours, Award Engravers, and the UK healthcare platform (provider unnamed)
3. Research, on a dark band of its own: three headline facts, cards for the demo, the game and the essay, plus one card per `/research/*` page with its figure
4. Experience and education
5. CV
6. Contact

**The build is replaced with static HTML and CSS.** The CRA app (React 17, MUI, react-scripts 4 needing `--openssl-legacy-provider`) is gone. `public/index.html` is one hand-written page with inline CSS and about 20 lines of JS for the mobile menu. Firebase now serves `public/` directly (`firebase.json`: `"public": "public"`; headers and ignore rules unchanged). There's no build step, so nothing goes stale.

**Look:**
- Warm paper (`#f5f2ec`), slate ink (`#1b2630`) and one clay accent (`#a3412a`), with a night band for research.
- Type is Newsreader (headings) with Instrument Sans (text), self-hosted from `@fontsource`.
- Olliver Web uses Fraunces with Work Sans on a cool near-white, so this site feels like the same person without copying it.
- No gradients and no hero animation.

**Sub-pages:**
- `/dev`, `/ai`, `/law` and `/essay` get the new type and palette through a style layer added after their own CSS. Their wording is unchanged.
- `/dev` was rebuilt from the live copy (see below). Its education lines now read "BSc in Computer Science" and "Postgraduate Certificate in AI", as the brief requires.
- `/404.html` is restyled with the same wording.
- `/anyons/**` and `/research/**` are untouched.

**SEO:**
- New titles and descriptions on the homepage.
- Person JSON-LD with the three `sameAs` links: olliverweb.co.nz, github.com/dwatces and linkedin.com/in/danielolliver.
- Canonicals on `/`, `/dev/` and `/essay/` (`/ai/` and `/law/` already had them).
- Sitemap dates updated. The manifest's colours and `start_url` were updated too.

**Kept:**
- `/ga.js` on every page
- all Olliver Web cross-links
- `/resume.pdf` and `/dev/resume.pdf`
- favicons and manifest
- `/static/media/font.e7663f1a.ttf`

That font file was a CRA build output, but the research pages and `/law` load it directly, so it's now committed at the same path (byte-identical to the old one).

**Facts:** only the brief's list and the live pages were used. A few lines I first drafted were removed because they went beyond that: a photo caption naming Wellington, "prices", and "I answer my own phone". Figure alt text on the homepage is empty because each figure sits next to a heading that names it. I didn't want to invent chart descriptions.

## Live site compared with the repo (checked 20 Oct 2026)
- **Homepage:** the strings in the live JS bundle match `src/`; the only differences were escaping.
- **`/dev`:** the live page differs. It has a mobile `<details>` menu with its CSS and close-on-click script, and slightly different header CSS. Live wording is otherwise identical. Cloudflare's email-obfuscation rewrites on live are a CDN side effect and were not copied.
- **`/ai`, `/law`, `/essay`, `/anyons/`, `/research/`, `/research/hexlife/`, `/research/braiding/`, `/404.html`, `/sitemap.xml`, `/robots.txt`:** identical to the repo.

## URL check
`npm start`, then `npm run check` (or `node scripts/check-site.js <url>` against the preview channel). All of these return 200:

`/`, `/dev`, `/dev/`, `/ai`, `/ai/`, `/law`, `/law/`, `/essay`, `/essay/`, `/anyons`, `/anyons/`, `/anyons/app.js`, `/anyons/engine.js`, `/anyons/decoder/`, `/anyons/phase2/`, `/research/` and all seven `/research/*/`, `/resume.pdf`, `/dev/resume.pdf`, `/dev/profile.jpg`, `/404.html`, `/sitemap.xml`, `/robots.txt`, `/favicon.ico`, `/favicon.png`, `/favicon-96.png`, `/apple-touch-icon.png`, `/manifest.json`, `/ga.js`, `/static/media/font.e7663f1a.ttf`.

The script also confirms every HTML page loads `/ga.js`, and every same-site `href`/`src`/`srcset` in every HTML file points at a file that exists. There were no horizontal scrollbars at 320, 390, 768, 1024 or 1440 px.

## Lighthouse 13.5, mobile emulation (default throttling)
"Before" is the live site, run on 20 Oct 2026. "After" is this branch served locally with `serve`, which compresses like Firebase but isn't the CDN, so treat the timings as indicative. GA requests were blocked in both runs so the tests added no hits to Analytics.

| Page | Before: perf / a11y / SEO | After: perf / a11y / SEO | Weight before → after |
|---|---|---|---|
| `/` | 93 / 96 / 100 (LCP 3.1 s) | **100 / 100 / 100** (LCP 1.8 s, CLS 0) | 859 → 117 KiB |
| `/dev/` | 100 / 95 / 100 | **100 / 100 / 100** | 279 → 125 KiB |
| `/ai/` | 87 / 100 / 100 (CLS 0.27) | **100 / 100 / 100** (CLS 0) | 158 → 102 KiB |
| `/law/` | 100 / 100 / 100 | 100 / 100 / 100 | 158 → 102 KiB |
| `/essay/` | 100 / 89 / 100 | 99 / 97 / 100 | 22 → 161 KiB (web fonts) |
| `/research/braiding/` | 97 / 88 / 100 | 96 / 88 / 100 (unchanged page) | 235 → 275 KiB* |

Best practices was 100 everywhere, before and after. Remaining issues that I left alone:
- `/research/*`: no `<main>` landmark, links only distinguished by colour, CLS 0.11. Fixing them would mean editing pages the brief says to leave as they are.
- `/law`: one button label doesn't match its accessible name, a wording change.
- `/essay`: no `<main>`.

\* The research page markup is byte-identical. The difference is local-versus-CDN serving of its PNG.

## Screenshots (`docs/screens/`)
Each of these has a `-before` and an `-after` version:
- `home-390-top` and `home-390-full`
- `home-1440-top` and `home-1440-full`
- `research-braiding-390-top` and `-full`
- `dev-390-top` and `-full`
- `dev-1440-top`

"Before" is the live site. Research pages are unchanged, so their before and after match.

## Couldn't verify
- Firebase-specific behaviour (redirecting `/dev` to `/dev/`, headers) was checked with `serve`, not the Firebase emulator. Re-run `npm run check <preview-url>` on the preview channel.
- `resume.pdf` still says "BSc Computer Science" and "Postgraduate Certificate in Artificial Intelligence". I can't edit the PDF, so it needs a new export if the exact wording matters there.
- That olliverweb.co.nz's Google review link still resolves (the homepage links to olliverweb.co.nz, not to the review).
- The photo is still the night shot. To swap in a daylight one, replace `public/dev/profile.jpg`, adjust `PORTRAIT_BOX` in `scripts/make-images.py`, and run `python3 scripts/make-images.py`.
- Real-device testing (iOS Safari, Android Chrome). Everything was checked in headless Chromium only.

## Preview it
Locally:
```
npm install
npm start            # http://localhost:5000
npm run check        # in a second terminal
```
Firebase preview channel for Daniel (not run):
```
firebase hosting:channel:deploy redesign-2026-10-20 --expires 7d
```
