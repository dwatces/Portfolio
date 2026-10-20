# /dev redesign: summary

Final page: `public/dev/index.html`. New social card: `public/dev/assets/og-dev-20261020.png` (1200x630, 100 KB). Nothing else under `public/` changed. Final screenshots: `docs/dev-redesign/screens/` (`final-390-c*.jpg`, `final-1440-c*.jpg`).

Nothing was deployed. Daniel's preview command (not run):

```
npx firebase-tools@15.34.0 hosting:channel:deploy dev-20261020 --expires 7d --project portfolio-6f211
```

`firebase.json` still says `"public": "build"`. If the homepage PR hasn't switched it to `"public": "public"`, Daniel's local build copies `public/dev/` into `build/`, as it does today.

## Where it came from
The judges picked prototype A 3–0 (summed scores A 260, B 224, C 220). The final page keeps A's whole system:
- the Olliver Web header and footer
- the 7/5 hero with the Back to Nature card, the ringed Book now button and the Google review
- alternating white and paper bands
- the Back to Nature feature with the phone capture
- the hairline freelance stories
- the three browser frames for his own builds
- the year-pill experience path
- the toolbox ledger
- the dark closing band with the phone pill

Grafts:
- **From B:**
  - **Healthcare card:** a dark "How the platform fits together" card with numbered circles joined by a rule. Steps run horizontally from 640px up and as a vertical rail on phones, ending in "Private client product. / Walkthrough on request." The healthcare panel now comes first and its text sits above the card on phones, so B's stacking bug is not repeated.
  - **Olliver Web row:** a full-width ruled "Need a website for your business?" row with an outlined "Visit olliverweb.co.nz ↗" button. It replaces A's orphaned callout.
  - **Portrait:** the 4:5 portrait (14px radius, soft shadow) under the Toolbox lead, from 1024px up only.
  - **Smooth scroll:** `html:focus-within` smooth scrolling inside a no-reduced-motion query, which fixed the blank frames in scrolled captures.
- **From B and C:** LinkedIn in the hero byline, and "One A4 page" under CV (PDF) in the phone menu.
- **From C:**
  - **Shorter H1:** "I build web apps / from the screen to the database."
  - **At-a-glance strip:** a hairline strip under the hero (Freelance client work / Where I've worked / Education), reworded to FACTS, with no "Shipped" cell.
  - **Footer Olliver Web links:** Small-business websites, Online stores and Web applications, alongside A's case-study and About Daniel links.
  - **Tighter phone hero:** both buttons side by side under 600px.

Education is now its own white band. The bands run paper, white, paper, white, paper, white, then the dark close.

## Judge items
**Judge 1 (Olliver Web match):**
- **H1 clearance:** done. Shorter wording, capped at 9.5em; first line ends 274px clear of the card at 1440 and 366px at 1920.
- **Empty sage panel at 1920:** done. The panel is now 5 columns, the text 6, and the phone 15rem from 1024px up. At 1920 the panel is about 640px tall against about 470px of text.
- **Orphaned scope note:** done, replaced by B's ruled row (no prices).
- **Empty left columns in Toolbox and Education:** done. Portrait under the Toolbox lead; Education is its own band.
- **NZ Camps blank at 390:** done. All images report loaded at every width and every frame is painted in the final shots.
- **"ran" → "led":** done.
- **"Freelance · since 2024" on the WordPress and e-commerce stories:** done, now "Freelance".
- **Drop "bigger":** done. The bridge reads "Alongside those, WordPress and e-commerce work. / Hosting, payments, analytics and CRM pipelines."
- **Fallback font metrics measured:** done. In Chromium a sample at weight 400 measures 8668 in Work Sans against 7829 in Arial, giving `size-adjust:110.7%`, `ascent-override:84%`, `descent-override:21.9%`. A's guesses (111/84/22) were close. Layout shift is 0.
- **Re-shoot at all widths:** done, including 320.
- **Missing `--sticky` token:** skipped, because nothing on the page uses it.

**Judge 2 (audiences and truth):**
- **"led":** done.
- **CV link as `resume.pdf`:** done on all five links. Firebase adds the trailing slash to directories by default, so `/dev` goes to `/dev/`.
- **"runs himself" → "updates himself":** done.
- **Bridge and Experience wording:** done. "International clients" now only describes the WordPress sites.
- **Story metas:** "Freelance".
- **Education in the 30-second read:** done via the glance strip.
- **LinkedIn in the hero:** done.
- **og image alt and twitter:card:** done. With the new 1200x630 card, `summary_large_image` is correct. The portrait alt is now "Daniel Olliver, standing outside at night".
- **Shorter phone hero:** done.
- **Slow-scroll re-shoot with no blank frames:** done.
- **AI footprint unchanged:** "AI / LLM (RAG)" in the toolbox, the degree name, and the single footer link. No `/ai/` or `/law/`.

**Judge 3 (Daniel proxy):**
- "led", the story metas and the international-clients wording: done.
- **Quote attribution:** "Chris Roberts · Google review", Olliver Web's exact form.
- **Client work order:** healthcare first, so it matches the H2 and Back to Nature no longer appears twice in a row.
- **Healthcare wording:** the glosses are replaced with FACTS lines. The text column has "Patients: …" and "Delivery: Deployed to production under strict reliability requirements, then handed over". The card steps are labels only.
- Smooth-scroll fix, ruled Olliver Web row and sage panel: done.
- **Contact band:** now the availability line, the Email me button, and an address line without the word "Email".
- **Footer:** "AI and research: danielolliver.com" is kept on one line.
- **Toolbox → Education spacing:** Education is its own band.
- email_off, ga.js and the single AI link: kept.
- **Skipped: B's desktop capture with an overlapping phone in the Back to Nature panel.** The same desktop capture already leads the hero, so it would repeat. The empty-panel problem is fixed by narrowing the panel instead.

**Also fixed:**
- A's toolbox lead "The rest is what a job has needed along the way" had the same inflation the judges flagged in C. It now reads "I've used the rest too."
- In A, the header's menu button wrapped to a second line below 360px. From 360 to 399px the brand and button padding are now tighter, and below 360px the "Get in touch" button is hidden (the phone icon and the menu, which has Contact, stay). The header is a single 61px row from 320 to 414px.

## Every claim and its FACTS line
- **Identity:**
  - "Full-stack developer, Auckland"
  - "five years building production web applications, freelance since 2024"
  - the every-day stack
  - "Available for contract and freelance work, in Auckland and remote" (FACTS: "locally and remote")
- **Contact:** phone, email, CV (PDF), "One A4 page", GitHub, LinkedIn.
- **Client work 1 (healthcare):**
  - the allowed sentence, verbatim
  - "UK healthcare provider · freelance · three-month contract"
  - "A multi-step ADHD assessment flow, used on mobile, with saved progress, validation and clear error states"
  - "Deployed to production under strict reliability requirements, then handed over"
  - React front end, Node and Express back end, Supabase (PostgreSQL) for patient data
  - "Private client product. Walkthrough on request."
- **Client work 2 (Back to Nature Tours):**
  - "Live client site"; "Dunedin tour operator · running since 1997"
  - Webflow CMS "so the owner can update it himself"
  - FareHarbor booking on every tour page
  - "native elements plus CMS collections for Tours and Testimonials"
  - the exact SEO-migration wording, plus structured data (LocalBusiness, Product, FAQ)
  - the Chris Roberts review, verbatim
  - the case-study link
- **Client work 3 (WordPress and e-commerce):**
  - WordPress sites for international clients across hosting, DNS, CRM integrations and GA4/GTM analytics
  - Stripe payment flows and Facebook Ads pixels across e-commerce projects
  - form-to-CRM pipelines
  - the bridge line ("Hosting, payments, analytics and CRM pipelines") summarises only these items
- **Olliver Web line:** verbatim from FACTS, no prices.
- **Earlier builds:**
  - "My own projects, not client work… built them in 2021 and redeployed them on Vercel in 2026"
  - Scenic, NZ Camps and Eon descriptions and stacks from their FACTS entries (the Eon sentence is verbatim)
- **Employment:**
  - OutPace: title, dates, "designed and built… directly with the company's directors, and led standups, retrospectives and weekly demos"
  - 3PM: Developer, February 2022 to January 2024, three-month contract then full-time, "two years adding features to 3PM's live scheduling product, used by the trades every day", Agile with sprints and code review
  - University of Auckland: Graduate Teaching Assistant, March to June 2024, COMPSCI 719, tutorials and one-on-one mentoring
  - Freelance since 2024: the client-work items above
- **Glance strip:**
  - Freelance client work: the Client work 1, 2 and 3 items
  - Where I've worked: the Employment entries (the roles listed in lower case)
  - Education: both exact degree names
- **Toolbox:** the every-day stack plus the "Also real" list, "AI / LLM (RAG)", "I've used the rest too."
- **Education:** "BSc in Computer Science", AUT, 2021; "Postgraduate Certificate in AI", University of Auckland, 2024; the lead also mentions his teaching-assistant role.
- **Footer:** "AI and research: danielolliver.com", the one allowed AI link.
- **Social card:** the kicker, H1, every-day stack, "Live client site · Back to Nature Tours" and "FareHarbor booking on every tour page", all as above.

## Remaining doubts
1. **The H1 "I build web apps from the screen to the database."** It is a general full-stack statement whose wording echoes the healthcare-only allowed sentence. No judge flagged it on A or C (C's graft proposed it), but if Daniel reads it as an upgrade, "I build full-stack web applications." is a safe swap.
2. **"in Auckland and remote"** stands in for FACTS' "locally and remote".
3. **The glance roles** are lower case for brevity; the proper titles are in Experience.
4. **The relative CV link** relies on Firebase's default trailing-slash redirect. If a `trailingSlash: false` rule is ever added, change the five links to `/dev/resume.pdf`.
5. **The portrait** shows a recognisable building, but no text on the page names the location.
6. **The social card** is a 256-colour PNG to stay at 100 KB. There is slight dithering in the photo area at 100%, which isn't visible at preview size.
7. **The hidden portrait on phones** is still fetched by Chromium (31 KB). A `<picture>` element with a media query would avoid that.
