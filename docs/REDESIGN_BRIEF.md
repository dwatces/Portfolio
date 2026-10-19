# Brief: make danielolliver.com look far better

You are redesigning Daniel Olliver's personal site, danielolliver.com. This repo is its source: a Create React App (React 17, MUI) homepage plus static pages under `public/` (`/dev`, `/ai`, `/law`, `/essay`, `/anyons`, `/research/*`). It is hosted on Firebase. **Do not deploy.** Work on a new branch and open a pull request. Daniel reviews it on a Firebase preview channel and promotes it himself.

## Who visits and what they need
Daniel's email address is daniel@danielolliver.com, so most visitors arrive after an email from him. In order, they are:
1. **NZ small-business owners** he has emailed about a problem on their website. They want to know within 10 seconds that he's a real person in Auckland who builds and fixes websites, and how to reach him or see his work. His web studio is **Olliver Web** (olliverweb.co.nz). This group matters most. Today the homepage reads as an AI and quantum-research portfolio and says almost nothing about websites.
2. **Employers and recruiters** (he applies for developer roles). They want his CV, real projects and skills.
3. **Researchers and technical readers** of his quantum and geometric-ML work (`/research`, `/anyons`).

The homepage should serve all three. Lead with group 1, keep group 2 one tap away, and keep the research as a strong section of its own, not something buried.

## Facts you may use (only these, or what is on his live pages and in `public/resume.pdf`)
- Daniel Olliver, Auckland, New Zealand. Full-stack developer, about 4 years (React, Next.js, Node, Express, TypeScript, MongoDB, Supabase, Stripe, Firebase, Vercel, AWS, WordPress, Python, PyTorch, Qiskit).
- Runs **Olliver Web**, a one-person web studio for NZ small businesses (sites, fixes, online stores): olliverweb.co.nz. Mobile 021 069 9543. Email daniel@danielolliver.com.
- Freelance since 2024 for NZ, Australian and UK clients:
  - backtonaturetours.co.nz: Webflow CMS migration, FareHarbor online booking, full SEO migration
  - Award Engravers (awardengravers.co.nz), a WooCommerce store, looked after since August 2026: redesign, speed work, a host move
  - a production patient-assessment platform for a UK healthcare provider (React and Node): **do not name the provider**
- 3PM (Auckland): junior developer intern, then full-time, 2022-2024. OutPace intern 2021.
- **BSc in Computer Science (AUT)** and **Postgraduate Certificate in AI (University of Auckland)**. Use exactly this wording, never "Bachelor of Computer and Information Sciences". Graduate teaching assistant at UoA, 2024.
- Independent research in quantum and geometric machine learning, 2025-2026: about 30 pre-registered controlled experiments; anyon braiding reproduced on three IBM quantum processors; equivariant neural decoders for quantum error correction; public demo at `/anyons`. Use the research pages in `public/research/` for detail.
- Linley Hodges of Award Engravers left Olliver Web a 5-star Google review. You may say there are Google reviews and link to olliverweb.co.nz, but don't paste review text that isn't on olliverweb.co.nz.

**Never claim:**
- shipped mobile apps or app-store releases
- OCR work
- "production AI systems" (say "prototypes" or "research")
- a property or real-estate platform
- agency size ("we", a team)
- any client, number or result not listed above

## Design goals
- **First screen:** a phone shows his name, one plain line on what he does ("I build and fix websites for NZ small businesses, and research machine learning for quantum computing", or better), a real photo of him (`public/dev/profile.jpg`; Daniel may supply a daylight photo later), and two clear actions: **See Olliver Web** (olliverweb.co.nz) and **Contact me** (mobile and email as visible text plus links). No hero animation that hides content.
- **Look:** confident, quiet and distinctive. It must not be a template, not a gradient-purple "AI" look, and not a copy of olliverweb.co.nz. It should feel like the same person: share a restrained palette and a characterful type pairing, self-hosted (Google Fonts via npm `@fontsource/*` is fine).
- **Sections:**
  - What I do (web work, with Olliver Web case studies linked)
  - Selected work (Back to Nature Tours, Award Engravers, the UK healthcare platform unnamed)
  - Research (cards linking to each `/research/*` page and `/anyons`, with the figures already in `public/research/`)
  - Experience and education
  - CV (`/resume.pdf`)
  - Contact
- **Performance:** fast on a phone. If you rebuild, a static build is better than the current CRA bundle. The `react-scripts` 4 build needs `--openssl-legacy-provider`, which is a sign it's due for replacement. Your choice: a modern build (Vite or Astro) or hand-written static HTML and CSS. **Every existing URL must keep working:** `/`, `/dev`, `/ai`, `/law`, `/essay`, `/anyons` (and everything under it), `/research/*`, `/resume.pdf`, `/404.html`, `/sitemap.xml`, `/robots.txt`, favicons and manifest.
- **Keep:**
  - the GA4 loader `/ga.js` on every page
  - the existing cross-links to Olliver Web
  - `firebase.json` hosting settings, adjusting `public` if your build folder changes
- **Accessibility:** WCAG AA contrast, visible focus, keyboard navigation, alt text, `prefers-reduced-motion`.
- **SEO:**
  - unique titles and descriptions
  - Person JSON-LD (name, jobTitle, url, sameAs: olliverweb.co.nz, github.com/dwatces, linkedin.com/in/danielolliver)
  - canonical URLs on https://danielolliver.com
  - update `sitemap.xml`
- **Sub-pages:** restyle `/dev`, `/ai`, `/law` and `/essay` to match if time allows, without changing their wording, except to fix the facts listed above. Leave `/anyons` and `/research/*` working exactly as they are; a shared header or footer is fine only if it doesn't break their scripts.

## Before you change anything
The live site (https://danielolliver.com) may differ slightly from this repo, because some edits were deployed from a local copy. Fetch the live homepage and `/dev`, compare them with the repo, and treat the live wording as current. List any differences in your summary.

## Deliverables
1. The redesigned site on a new branch, plus a pull request.
2. `docs/REDESIGN_SUMMARY.md`:
   - what changed and why
   - the URL check (every old URL loads)
   - Lighthouse-style numbers for phone (performance, accessibility, SEO) before and after
   - anything you couldn't verify
3. Screenshots in `docs/screens/`: home at 390x844 and 1440 (top and full page), plus one research page and `/dev`, before and after.
4. How to preview it locally, and the exact Firebase preview command for Daniel: `firebase hosting:channel:deploy redesign-<date> --expires 7d`. **Don't run it.**
