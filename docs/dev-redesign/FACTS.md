# FACTS: what /dev may say

Every claim on the new page must trace to a line below. Add no new facts, no new numbers and no upgraded wording. If a sentence can't be traced here, cut it. Where the CV PDF and this file differ, this file wins.

## Identity
- Daniel Olliver. Full-stack developer, Auckland, New Zealand.
- Five years building production web applications (2021-2026, the CV's wording); freelance since 2024. Use "five years" so the page matches the CV it links to.
- The stack he uses every day: React, Next.js, TypeScript, Node.js, Supabase.
  Also real: Express, MongoDB, JavaScript, HTML, CSS, REST APIs, EJS, Stripe, Google APIs, WordPress, Webflow, Auth/JWT, Git, Vercel, Firebase, Heroku, AWS, Python, Agile.
- AI may appear only as a toolbox item, "AI / LLM (RAG)", or as "retrieval-based (RAG) document-AI prototypes". Never "production AI", and never an AI product claim.
- /dev covers development work only. His AI and research work lives on the main site, https://danielolliver.com/. One small link to it is fine (for example "AI and research: danielolliver.com" in the footer). Don't describe research results on /dev. Never link `/ai/` or `/law/`.
- Availability: "Available for contract and freelance work", locally and remote.
- He also runs **Olliver Web** (https://olliverweb.co.nz), his web design and development service for small-business websites, online stores and web applications. "Olliver Web is just me." Don't put Olliver Web prices on /dev.
- Olliver Web also does website redesigns: https://olliverweb.co.nz/website-redesign-auckland. Don't put its prices on /dev.

## Contact (all already public)
- Email: daniel@danielolliver.com. Wrap mailto links in `<!--email_off-->…<!--/email_off-->`.
- Mobile: 021 069 9543 (`tel:+64210699543`). It's on every olliverweb.co.nz page and on the CV. Optional on /dev.
- CV PDF: `/dev/resume.pdf` (relative href `resume.pdf`). Label it "CV (PDF)". It is one A4 page.
- GitHub: https://github.com/dwatces. LinkedIn: https://www.linkedin.com/in/danielolliver

## Client work (real, citable)
1. **Patient-assessment platform for a UK healthcare provider** (freelance, three-month contract).
   - Allowed wording: "I wrote it for a UK healthcare provider in React, Node and Supabase, from the screens its patients use to the database behind them, and took it through to production and handover."
   - Also allowed: a patient-facing ADHD assessment platform; React front end, Node/Express back end, Supabase (PostgreSQL) for patient data; a multi-step assessment flow used by patients on mobile, with saved progress, validation and clear error states; deployed to production under strict reliability requirements; "Private client product. Walkthrough on request."
   - Never name the provider. No screenshots exist (it's private), so don't invent any.
2. **Back to Nature Tours** (https://backtonaturetours.co.nz): a Dunedin tour operator running since 1997.
   - A live client site, rebuilt on Webflow CMS (native elements plus CMS collections for Tours and Testimonials) so the owner can update it himself, with FareHarbor booking on every tour page.
   - SEO wording must be exactly: "most of the old page addresses kept or redirected", or "with an SEO migration that kept or redirected most of the old page addresses". Never "full SEO migration" or "preserved URLs". Structured data (LocalBusiness, Product, FAQ) may be mentioned.
   - The owner's public Google review: "The finished website exceeded my expectations, with a seamless booking integration, great attention to detail, and a polished, professional result." (Chris Roberts, Google review, https://share.google/sIOe7Edtwx5IqWUvq)
   - Case study on Olliver Web: https://olliverweb.co.nz/work/back-to-nature-tours
3. **WordPress and e-commerce freelance work:** built and maintained WordPress sites for international clients across hosting, DNS, CRM integrations and GA4/GTM analytics; integrated Stripe payment flows and Facebook Ads pixels across e-commerce projects; built form-to-CRM pipelines. No client names.

## Employment
- **3PM**, Auckland, February 2022 to January 2024. Title "Developer". He joined on a three-month contract and was then brought on full-time. He shipped production MERN features in an Agile team (sprints and code review).
  - Allowed wording: "I spent two years adding features to 3PM's live product, used by the trades every day." The product is resource-scheduling software for construction trades.
  - Prefer "shipped features in 3PM's live scheduling product" over "delivered the platform".
- **University of Auckland**, Graduate Teaching Assistant, March to June 2024. He supported COMPSCI 719 (Programming with Web Technologies) with tutorials and one-on-one mentoring.
- **OutPace**, Full-Stack Developer Intern and Scrum Master, March to November 2021. He designed and built a responsive full-stack application working directly with the company directors, and led standups, retrospectives and weekly demos.

## Education (exact names)
- "BSc in Computer Science", Auckland University of Technology (AUT), 2021.
- "Postgraduate Certificate in AI", University of Auckland, 2024.

## Earlier full-stack builds (his own projects, built in 2021, modernised and redeployed on Vercel in 2026)
These are not client work. Label them as his own builds or earlier projects, never as "client".
The October 2026 lines below are true only once each app's `improve-20261020` branch is merged to `main` and deployed to the same live URL. Until all three are deployed, /dev keeps the earlier wording ("built in 2021, redeployed on Vercel in 2026").
- **Scenic** (https://scenic-app.vercel.app/, code https://github.com/dwatces/Scenic): a full-stack image-sharing app where users register, authenticate (JWT), post photos of places with their location on a map, and browse community posts. React client plus an Express/MongoDB API, both serverless on Vercel, with MongoDB Atlas.
  - Modernised in October 2026: the client moved from Create React App to Vite, with React 19 and React Router 7; the API moved to Express 5 and Mongoose 9 on Node 24. It has accounts, member pages, an Explore feed of everyone's scenes, and a page per scene with an OpenStreetMap map of the place.
  - Has API, component and end-to-end tests (Vitest, Testing Library, Playwright), with automated accessibility checks (axe, WCAG 2.2 AA rules) at phone and desktop widths.
  - Allowed wording: "modernised in 2026", "moved the client to Vite", "API, component and end-to-end tests", "automated accessibility checks".
- **NZ Camps** (https://nz-camps.vercel.app/, code https://github.com/dwatces/NZCamps): a campground review platform for New Zealand with accounts, campground CRUD, reviews and location geocoding with maps. Server-rendered Express, EJS, MongoDB and Passport; modernised (mongoose 5 to 8) and redeployed serverless.
  - Maps are Leaflet with OpenStreetMap tiles.
  - Reworked in October 2026: security fixes (no email addresses in pages, user text escaped everywhere, a content security policy, same-origin checks on form submissions), forms that explain each problem at its field, search, sort and pages on the camps list, and sample listings labelled as samples.
  - Has an automated test suite: Node's test runner with Supertest and an in-memory MongoDB (integration tests), plus Playwright end-to-end tests and automated accessibility checks (axe, WCAG 2.2 AA rules).
  - Allowed wording: "tightened its security", "security fixes", "search", "integration and end-to-end tests", "automated accessibility checks".
- **Eon Candles** (https://eon-ht82.vercel.app/, code https://github.com/dwatces/Eon): "A brand and shop site for Eon, a New Zealand candle label." A multi-page Next.js build (home, shop, about) with a responsive product layout, on Vercel. Don't call Eon a client.
  - Since October 2026: Next.js 16 and React 19; a shop, one product page per candle from a catalogue, and a cart kept in the browser; checkout validated and priced on the server. The live site takes no payment.
  - Note, not wording: by default the live site runs in demo mode and shows a demo order summary. If a Stripe test key is set on Vercel it hands off to Stripe test Checkout instead; live payments need an explicit opt-in (`EON_ALLOW_LIVE_PAYMENTS=true`), which must stay unset. So "takes no payment" is true either way, but don't say "demo mode" on /dev unless the deployed site is confirmed to be in it.
  - Has unit, API and end-to-end tests, with automated accessibility checks (axe, WCAG 2.2 A and AA rules) on every page.
  - Allowed wording: "checkout priced on the server", "the live site takes no payment", "upgraded Next.js and React", "unit, API and end-to-end tests", "automated accessibility checks", and "Stripe" in the stack line (server-side Stripe Checkout).
- For all three:
  - Version numbers stay in this file; the /dev cards name the tools without numbers.
  - Never: test counts, coverage percentages, page weights, load times or Lighthouse scores; "WCAG compliant" or "certified"; for Eon, "takes payments", "live Stripe" or "production shop".
  - Never mention CI or GitHub Actions on /dev until a workflow has passed on GitHub (NZ Camps has none yet; the Scenic and Eon workflows have never run there).

## Never say
- Mobile apps, App Store, Play Store or OCR.
- Any client or project not listed above.
- Production AI.
- Any count or metric not listed above: no "X projects", no uptime figures, no Lighthouse scores.
- "Full SEO migration", or any degree name other than the two above.
