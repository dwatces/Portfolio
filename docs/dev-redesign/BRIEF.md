# Brief: redesign danielolliver.com/dev to mirror the new olliverweb.co.nz

Read `CLAUDE.md` first: commit identity, the never list, and which files you own (you own `public/dev/**` and `docs/dev-redesign/**` only).

## What Daniel asked for (verbatim, 20 Oct 2026)
- "a lot of work has been done on olliverweb.co.nz + a lot of the links lead to https://danielolliver.com/dev/ + make https://danielolliver.com/dev/ look far better in line to the new polished olliver web site"
- "the ./dev should focus on dev work, the main danielolliver.com should focus on AI work"
- "so /dev should look much better - mirror the recent changes in olliverweb.co.nz"
- "the CV on danielolliver/dev should be from downloads". Done: `public/dev/resume.pdf` is that CV. Link it; don't replace or edit it.
- "don't make it live"
- "make sure claude doesn't show as a contributor at all"

So: rebuild **one page**, `public/dev/index.html`, as Daniel Olliver's **development portfolio**, in the same design language as the current olliverweb.co.nz (the release that went live on 20 Oct 2026). It covers dev work only: no AI-research section and no research results. The homepage is becoming the AI page; one small link to it is the only AI mention (see FACTS.md). **Do not deploy.**

## Who lands on /dev and what they need
1. **Olliver Web prospects** (small-business owners) clicking "my development portfolio" or "danielolliver.com/dev" on olliverweb.co.nz (home footer, /about, /small-business-websites, /online-stores, /web-application-development). They must feel they're still in the same world (same type, colour, rhythm and voice), see real proof that Daniel builds production software, and find a clear way back to Olliver Web or to contact him.
2. **Hiring managers and contract clients** arriving from his CV, LinkedIn or job applications. In 30 seconds they need: who he is, what stack, what he has shipped, where he has worked, his education, the CV PDF, and how to reach him.

The page stays **Daniel Olliver's development portfolio** on his own domain. It is not an Olliver Web page: no "Olliver Web" brand in the header and no Olliver Web prices. "In line with" means the same design language (type, palette, spacing, components and voice), plus clear cross-links to Olliver Web.

## Daniel's taste
- He rejected an earlier olliverweb.co.nz round as "not compelling; not eloquent at all", with "weird spacing thats random". He wants it to feel crafted and intentional, with an even spacing rhythm.
- He approved plain first-person lines with a point of view ("The person who picks up the phone builds your website."; "Olliver Web is just me."; "No big reveal at the end."), short sentences, real proof up front (the Back to Nature card and the Google review) and confident restraint.
- He checks every claim. A false or inflated line is worse than a missing one. Every sentence must trace to `FACTS.md`.

## The design system to mirror (read the real files, don't guess)
- Source pages from olliverweb.co.nz, copied into `docs/dev-redesign/ref/ow-src/`: `index.html` (its inline `<style>` has the tokens and components), `about/index.html`, `work/back-to-nature-tours/index.html`, `web-application-development/index.html`, plus `site-shell.css` and `site-shell.js` (the header, footer and phone-menu behaviour). They reference images and fonts that aren't in this repo; use them for CSS and structure only.
- Screenshots of those pages as they look today, in viewport-sized chunks: `docs/dev-redesign/ref/ow-shots/ow-{home,about,case,webapps}-{390,1440}-cN.jpg`. Read them. The current /dev page is in `docs/dev-redesign/ref/current-shots/`, and its text is in `ref/current-dev-text.txt`.
- Tokens (from the OW home `:root`; copy these exactly):
  - spacing: `--s-1..--s-6`, `--space-section clamp(3rem,…,5.5rem)`, `--space-page-top`, `--space-block`, `--space-card`, `--flow-head`, `--flow-intro`, `--gutter clamp(1.25rem,…,2.5rem)`, `--measure 36em`
  - type: `--fs-body 1rem`, `--fs-lead clamp(1.125rem,…,1.5rem)`, `--fs-h3`, `--fs-h2 clamp(1.875rem,…,3rem)`, `--fs-h1`, `--fs-display clamp(2.5rem,…,5.5rem)`
- Colours: page #f7f8f5, text #24313a, headings #111827, accent #256f8f (links and focus), green-teal #2f6f64 (the highlight underline uses #2f6f643d), borders #d8ded8, white cards, and dark bands near #111827 (see the OW bands "The enquiries you never hear about." and "Ring the person who'll build it."). Check the exact values in the OW CSS.
- Type:
  - Body is **Work Sans** (variable weight 100-900). Headings are **Fraunces 600** (subset, opsz axis), with the OW fallback stack including the "Georgia Display" size-adjust face.
  - The font files are already in `public/dev/assets/`: `work-sans-20261020.woff2`, `work-sans-20261020.ttf` (fallback) and `fraunces-20261020.woff2`. Preload the two woff2 files.
  - **The Fraunces subset only has ASCII plus · × – — ‘ ’ “ ”.** Never set "é", "→", "↗" or any other non-ASCII character in Fraunces; use Work Sans for those.
- Components to echo:
  - the sticky header: brand with the green highlight underline, 0.9rem/700 nav, a dark rounded CTA, and a details-based phone menu panel
  - the eyebrow line, the two-tone Fraunces H1 (second line in the muted teal) and the lead paragraph
  - the dark primary button and the outlined secondary button
  - editorial two-column rows with hairline rules
  - white cards with a soft shadow and 8-10px radius
  - the image card with rounded corners and a caption tag ("● LIVE CLIENT SITE"), and the quote block with a left rule
  - numbered steps, dark full-bleed bands, and the OW footer layout (columns plus a legal line)
- Max content width like OW (`.wrap`: 80rem at 92% width; 95rem at 1800px and up). Keep a 16px or wider side gutter on phones and no horizontal scroll at 320px.

## Content
- `docs/dev-redesign/FACTS.md` is the only source of claims.
- Keep all the substance the current page has (work, experience, toolbox, education, contact, the CV, GitHub, and cross-links to olliverweb.co.nz), plus one small link to https://danielolliver.com/ for AI and research. Tighten and rewrite in the OW voice; don't pad.
- Keep **client work** (the UK healthcare platform, Back to Nature Tours, and the WordPress and e-commerce freelance work) separate from **his own earlier builds** (Scenic, NZ Camps, Eon). Never label the earlier builds as client work.
- Images, already in `public/dev/assets/`:
  - 16:10 browser captures: `scenic|nzcamps|eon|btn-20261020-{720,1440}.webp`
  - phone captures: `scenic|nzcamps|eon|btn-phone-20261020-{390,780}.webp` (390x844 and 780x1688)
  - portrait: `daniel-20261020-{480,720,960}.webp` (3:4; the same photo as on OW /about)

  Use srcset and sizes, width and height attributes, `loading="lazy"` below the fold, `decoding="async"`, and meaningful alt text. No screenshots exist of the healthcare platform: design that card with type alone, and never draw a fake UI.
- A short "Need a website for your business?" cross-link to Olliver Web is welcome (no prices).

## Technical rules
- One self-contained file, `public/dev/index.html`, with an inline `<style>` and at most a tiny inline `<script>` for the phone menu. No frameworks, and no external CSS, JS, fonts or CDNs.
- Keep `<script defer src="/ga.js"></script>`. In your local copies, replace `ga.js` with an empty file so tests don't send analytics.
- Head:
  - `<title>`, meta description, canonical https://danielolliver.com/dev/
  - og:title, og:description, og:type, og:url, og:image, twitter:card
  - theme-color, and the favicon (the existing `/dev/favicon.png`)
  - JSON-LD Person: name, jobTitle, url, address (Auckland, NZ), alumniOf AUT and the University of Auckland, sameAs GitHub, LinkedIn and https://olliverweb.co.nz/about
- For og:image, use https://danielolliver.com/dev/assets/daniel-20261020-960.webp, unless the finisher makes a proper 1200x630 card at `public/dev/assets/og-dev-20261020.png` (under about 150 KB).
- Wrap every mailto link in `<!--email_off-->…<!--/email_off-->`.
- Accessibility:
  - a skip link, landmarks, one H1, and a logical H2/H3 order
  - a visible `:focus-visible` (3px #256f8f), 44px tap targets for buttons and nav, and AA contrast
  - `prefers-reduced-motion` respected
  - a phone menu that works by keyboard and closes on Escape or an outside tap, like OW's
- Performance: no layout shift from fonts or images (a size-adjust fallback like OW's, and explicit image dimensions). Only the above-the-fold image loads eagerly, with `fetchpriority="high"`. Keep the total page weight sensible on phones.
- Keep the old files (`public/dev/font.ttf`, `profile.jpg`, `favicon.png`) where they are; just stop using `font.ttf` and `profile.jpg`.

## How to run it
- If the **Workflow** tool is available, run it with `scriptPath: "docs/dev-redesign/workflow.js"` (no args). It builds three competing prototypes, has three judges score them, and then a finisher writes the winner, with the judges' fixes and grafts, into `public/dev/index.html`.
- If the Workflow tool isn't available, do the same stages yourself, in order: three prototypes (the three directions in workflow.js) in `work/dev/protos/{A,B,C}/site`, three judging passes (OW match, audiences and truth, Daniel proxy), then finish. Use subagents for these if you have them.
- Screenshot tool: `cd docs/tools && npm install && npx playwright install chromium` (if Chromium won't launch, run `npx playwright install --with-deps chromium`). Then run `node docs/tools/shoot.mjs <url> <outDir> 390,768,1440,1920 <prefix>` from the repo root. It prints layout metrics as JSON and writes viewport chunks `<prefix>-<w>-cN.png`. Read the chunks and look at them: measuring is not the same as looking.

## Deliverables
- `public/dev/index.html` (and the og card, if made) on your branch, plus a pull request (no deploy, no Claude attribution).
- `docs/dev-redesign/SUMMARY.md`:
  - what came from which prototype, each judge item and whether it was applied
  - every factual claim with its FACTS line
  - remaining doubts
- Final screenshots at 390 and 1440 in `docs/dev-redesign/screens/` (JPEG, quality about 75).
- The exact preview command for Daniel, which you don't run: `npx firebase-tools@15.34.0 hosting:channel:deploy dev-<yyyymmdd> --expires 7d --project portfolio-6f211`. If the homepage PR has switched `firebase.json` to `"public": "public"`, the /dev change previews as it is. If not, Daniel's machine handles the build.
