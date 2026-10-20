export const meta = {
  name: 'ai-homepage-cloud',
  description: 'danielolliver.com homepage, AI only: three static prototypes, three-lens judge panel, finisher writes public/index.html',
  phases: [
    { title: 'Setup', detail: 'install the screenshot tool, make three clean site copies' },
    { title: 'Prototype', detail: '3 directions, each built, screenshotted and self-revised' },
    { title: 'Judge', detail: 'truth, design, visitor proxy' },
    { title: 'Finish', detail: 'winner + grafts + must-fixes into public/index.html, firebase.json, sitemap' },
  ],
}

// All paths are relative to the repo root, which is every agent's working directory
// (run `cd "$(git rev-parse --show-toplevel)"` first if unsure).

const SHOOT = 'node docs/tools/shoot.mjs'

const COMMON = `You are rebuilding ONE page: the danielolliver.com homepage. Daniel's words: "danielolliver.com (main page) needs to focus purely on AI and nothing about web dev work whilst linking research papers" and "the ./dev should focus on dev work, the main danielolliver.com should focus on AI work".
Work from the repo root (cd "$(git rev-parse --show-toplevel)").
FIRST read CLAUDE.md and docs/AI_HOMEPAGE_BRIEF.md in full and follow them exactly (papers, facts, the nothing-about-web-dev rules, design and build rules). Then look at what exists: the current homepage screenshots docs/ai-homepage/ref/current-shots/home-*.jpg (what to beat), the research index screenshots docs/ai-homepage/ref/current-shots/research-*.jpg, and the research pages themselves (public/research/index.html and the seven public/research/*/index.html, with their figures public/research/*.png), public/essay/index.html and public/anyons/index.html. Those pages, plus the paper abstracts quoted in the brief, are your only sources of facts.
Hard rules: never request anything on https://danielolliver.com (Cloudflare caches 404s for new paths); test only on 127.0.0.1; work only in your own directory; kill your server PID when done; don't commit or push (the main session does that); never touch public/dev/**; nothing about web development except one small footer link "Software development portfolio" to /dev/; don't link /resume.pdf; never link /ai/ or /law/.`

const PROTO_SCHEMA = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    file: { type: 'string' },
    shotsDir: { type: 'string' },
    direction: { type: 'string', description: 'one paragraph: the idea and page structure' },
    selfCritique: { type: 'string', description: 'honest remaining weaknesses after your last look' },
    revisions: { type: 'number' },
    metrics: { type: 'string', description: 'overflow / small tap targets / console errors / page weight from the last shoot run' },
  },
  required: ['id', 'file', 'shotsDir', 'direction', 'selfCritique', 'revisions', 'metrics'],
}

const DIRECTIONS = [
  { id: 'A', port: 6411, name: 'Papers first',
    idea: `A scholar's homepage done with real typographic care. Name, a one-line statement and "Read the papers" / "Play the Hex demo". Directly below, the two preprints as substantial citation cards (title set large, date, "Preprint · Zenodo", a summary taken from the abstract, DOI as the main link, code / package / LinkedIn as secondary links). Then the research notes as a grid of figure cards (each with its own figure and one result line from its page), then play and read (/anyons/, /anyons/decoder/, /essay/), about and education, contact. Calm, precise, plenty of air.` },
  { id: 'B', port: 6412, name: 'Lab notebook',
    idea: `Figure-led and editorial, like a well-kept lab notebook or a journal's feature spread. The hero pairs the statement with one strong research figure (for example the braiding or decoder figure, with a real caption from its page). The research is told as a sequence of entries: figure on one side, a short plain account and the result on the other, each entry ending in links to the note and, where it applies, the paper DOI. The two preprints sit in a "Papers" band set like a reference list. A monospace accent only for data (DOIs, processor names, error bars). Then play and read, about, contact.` },
  { id: 'C', port: 6413, name: 'The one rule',
    idea: `Lead with credibility. The hero states the method: more than two dozen controlled experiments under one rule, that no result is written down before its run completes, and the honest headline finding from the essay (hexagonal wiring doesn't help a network learn; symmetry helps only when it is really there). Then "What survived": the two preprints, anyon braiding on three IBM processors, the decoders, each with its evidence and figure. Then "Try it" (/anyons/, /anyons/decoder/) and "Read the story" (/essay/), about and education, contact. Confident and plain; no hype words.` },
]

phase('Setup')
const setup = await agent(
`Work from the repo root (cd "$(git rev-parse --show-toplevel)"). Prepare the workspace for a page-redesign workflow. Don't commit anything.
1. cd docs/tools && npm install --no-audit --no-fund && npx playwright install chromium ; cd back to the repo root. If a later launch fails with missing libraries, run (cd docs/tools && npx playwright install --with-deps chromium).
2. For X in A B C: rm -rf work/home/protos/X && mkdir -p work/home/protos/X/shots && cp -a public work/home/protos/X/site && : > work/home/protos/X/site/ga.js   (the empty ga.js stops analytics in tests). Note: site/index.html is still the old React template; each prototype replaces it with a static page.
3. Prove the tool works: serve work/home/protos/A/site on 127.0.0.1:6409 in the background, note its PID, run ${SHOOT} http://127.0.0.1:6409/research/ work/home/baseline 390,1440 research , then kill the PID. It must print one JSON line per width with "chunks" > 0.
Return a short text: OK or the exact error, plus the two JSON lines.`,
  { label: 'setup', phase: 'Setup', effort: 'low' })
log(`setup: ${String(setup).slice(0, 300)}`)

phase('Prototype')
const protos = await parallel(DIRECTIONS.map(d => () => agent(
`${COMMON}

YOUR DIRECTION: ${d.id}, "${d.name}". ${d.idea}
Interpret the direction with judgement; it's a starting point, not a wireframe. Write the copy yourself: plain, first person where it helps, specific, NZ English, no hype, every fact traceable to the brief or the research pages.

Your site directory: work/home/protos/${d.id}/site (a full copy of public/ with ga.js emptied). Write ONLY site/index.html: a complete static, self-contained homepage (inline CSS, a tiny inline script only if needed, no frameworks or CDNs; fonts either system stacks or files already in the site, for example /static/media/font.e7663f1a.ttf, which the research pages use). Reuse the research figures from site/research/*.png with width/height attributes and lazy loading below the fold. Your port: ${d.port}. Shots: work/home/protos/${d.id}/shots.
Process:
1. Build the complete page, including the head: title, description, canonical https://danielolliver.com/, og tags, Person and ScholarlyArticle JSON-LD, and <script defer src="/ga.js"></script>.
2. Serve it (cd work/home/protos/${d.id}/site && python3 -m http.server ${d.port} --bind 127.0.0.1 & ; save the PID to work/home/protos/${d.id}/serve.pid) and from the repo root run: ${SHOOT} http://127.0.0.1:${d.port}/ work/home/protos/${d.id}/shots/r1 390,768,1440,1920 r1
3. Read the chunks at every width. Be your own harshest critic: does it say "careful AI and quantum-computing researcher" in 10 seconds? Is it clearly better than the current homepage and as considered as the research pages? Generic, template-y, cramped on a phone, random spacing, weak hierarchy? Also fix every overflow, small tap target, console error and failed request the JSON reports.
4. Revise and re-shoot (r2, r3 ...). Do at least two full revise-and-look rounds.
5. Leave your final screenshots as work/home/protos/${d.id}/shots/final-<w>-cN.png (prefix "final" into work/home/protos/${d.id}/shots). Kill your server PID.
Return the structured summary.`,
  { label: `proto:${d.id} ${d.name}`, phase: 'Prototype', schema: PROTO_SCHEMA })))

const ok = protos.filter(Boolean)
log(`prototypes done: ${ok.map(p => p.id).join(', ')}`)
if (ok.length === 0) return { error: 'no prototypes', setup }

const JUDGE_SCHEMA = {
  type: 'object',
  properties: {
    lens: { type: 'string' },
    scores: { type: 'array', items: { type: 'object', properties: {
      id: { type: 'string' }, total: { type: 'number', description: '0-100' },
      notes: { type: 'string' } }, required: ['id', 'total', 'notes'] } },
    winner: { type: 'string' },
    grafts: { type: 'array', items: { type: 'object', properties: {
      from: { type: 'string' }, element: { type: 'string' }, why: { type: 'string' } }, required: ['from', 'element', 'why'] } },
    mustFix: { type: 'array', items: { type: 'string' }, description: 'concrete fixes the WINNER needs before it can ship' },
    truthProblems: { type: 'array', items: { type: 'object', properties: {
      id: { type: 'string' }, text: { type: 'string' }, problem: { type: 'string' } }, required: ['id', 'text', 'problem'] } },
  },
  required: ['lens', 'scores', 'winner', 'grafts', 'mustFix', 'truthProblems'],
}

const LENSES = [
  { key: 'truth', port: 6414, text: `LENS: Is every word true and is it purely AI? Check EVERY sentence and number of each prototype's index.html against docs/AI_HOMEPAGE_BRIEF.md (including the quoted abstracts) and the research, essay and anyons pages; list each untraceable, rounded-differently or strengthened claim in truthProblems (quote the text and give the source it contradicts or lacks). Specifically: the 44% figure from "The lattice's teeth" must never appear as a result; nothing may contradict the essay's null finding on hexagonal wiring; no production-AI or client-AI claims; prototypes described as prototypes. Flag ANY web-development content (services, client sites, React/Node skills, Olliver Web) beyond the single small footer link to /dev/, any link to /resume.pdf, /ai/ or /law/. Check both DOIs are exact (10.5281/zenodo.20715320 and 10.5281/zenodo.21614035) and linked, plus head meta, canonical, JSON-LD, email_off wrapping and the ga.js tag.` },
  { key: 'design', port: 6415, text: `LENS: Design quality. Distinctive and calm, a research-lab feel without clichés (no purple gradients, no AI-brain imagery, no stock photos); typography carries it and the research figures are the imagery. Judge hierarchy, rhythm, typographic craft, how the papers are presented, phone layout at 390 and 320, and whether it is clearly better than the current homepage (docs/ai-homepage/ref/current-shots/home-*) and at least as considered as the research pages (research-*). Penalise template-y layouts, chip soup, inconsistent spacing, weak contrast, anything cramped.` },
  { key: 'visitor', port: 6416, text: `LENS: The visitors. (1) A recruiter for ML or quantum roles with 10 seconds: do they see "careful AI researcher with papers and real-hardware results"? (2) A researcher: can they find and trust the papers, code and evidence quickly? (3) Daniel himself, who asked for "purely AI and nothing about web dev work whilst linking research papers" and rejects anything "not compelling", with "weird spacing thats random": which one would he be proud to send with an application for an ML role tomorrow? Be blunt.` },
]

phase('Judge')
const judges = await parallel(LENSES.map(l => () => agent(
`${COMMON}

You are a judge. ${l.text}
Prototypes to compare (each is a complete page): ${ok.map(p => `\n- ${p.id}: file ${p.file}; final screenshots ${p.shotsDir}/final-<390|768|1440|1920>-cN.png; author's direction: ${p.direction}; author's self-critique: ${p.selfCritique}`).join('')}
Read each prototype's final screenshot chunks at 390, 1440 and 1920 (all chunks, top to bottom) and its HTML. If you need to interact, serve the prototype's site dir yourself on port ${l.port} only (one at a time, kill the PID after).
Score each prototype 0-100 for your lens with specific notes. Pick a winner. List grafts from the non-winners (concrete: which section, what about it). List mustFix items for the winner (concrete, actionable). Return structured output.`,
  { label: `judge:${l.key}`, phase: 'Judge', schema: JUDGE_SCHEMA })))

const js = judges.filter(Boolean)
const tally = {}
for (const j of js) for (const s of j.scores) tally[s.id] = (tally[s.id] || 0) + s.total
const votes = {}
for (const j of js) votes[j.winner] = (votes[j.winner] || 0) + 1
let winner = Object.keys(votes).sort((a, b) => (votes[b] - votes[a]) || ((tally[b] || 0) - (tally[a] || 0)))[0]
if (!ok.find(p => p.id === winner)) winner = Object.keys(tally).sort((a, b) => tally[b] - tally[a])[0]
log(`votes ${JSON.stringify(votes)} totals ${JSON.stringify(tally)} -> winner ${winner}`)
const win = ok.find(p => p.id === winner)

phase('Finish')
const finish = await agent(
`${COMMON}

You are the finisher. The judge panel picked prototype ${winner} (votes ${JSON.stringify(votes)}, summed scores ${JSON.stringify(tally)}).
Winner file: ${win.file} (screenshots ${win.shotsDir}/final-*). Other prototypes: ${ok.filter(p => p.id !== winner).map(p => `${p.id}: ${p.file}`).join('; ')}.
Full judge reports (JSON):
${JSON.stringify(js, null, 1)}

Build the final page:
1. rm -rf work/home/final && mkdir -p work/home/final && cp -a work/home/protos/${winner}/site work/home/final/site (don't modify the protos).
2. Apply EVERY mustFix and every truthProblem fix from all three judges (if a truth problem was found only in another prototype, make sure the winner doesn't have it too). Apply the grafts the judges agree on, and any single-judge graft that clearly improves the page without breaking its coherence. One coherent design, not a collage.
3. Serve work/home/final/site on port 6420 only (PID to work/home/final/serve.pid) and run the tool at 320,390,768,1440,1920 into work/home/final/shots (prefix f1, then f2 ...). Read every chunk. Iterate until there is nothing left you would be embarrassed to show Daniel: even rhythm, nothing cramped, no overflow, tap targets at least 44px, no console errors or failed requests, headings logical.
4. Put it into the repo:
   - cp work/home/final/site/index.html public/index.html
   - in firebase.json set "hosting"."public" to "public" (keep the ignore list and headers as they are)
   - public/sitemap.xml: keep every existing URL that still exists, no /ai/ or /law/, update the homepage lastmod
   - leave src/ and public/static/media/font.e7663f1a.ttf in place; change nothing under public/dev/
5. URL check: serve public/ (copy it to work/home/urlcheck first and empty its ga.js) on 127.0.0.1:6421 and request every URL: /, /dev/, /dev/resume.pdf, /essay/, /anyons/, /anyons/decoder/, /research/ and its seven pages, /resume.pdf, /404.html, /sitemap.xml, /robots.txt, /favicon.ico, /favicon.png, /favicon-96.png, /apple-touch-icon.png, /manifest.json, /static/media/font.e7663f1a.ttf. Every one must return 200. Record the results.
6. Final screenshots for the PR: SHOT_FORMAT=jpeg ${SHOOT} http://127.0.0.1:6420/ docs/ai-homepage/screens 390,1440 final . Kill your server PIDs.
7. Write docs/AI_HOMEPAGE_SUMMARY.md: what changed and why, what came from which prototype, every judge item and whether you applied it, every factual claim with its source, the URL check table, remaining doubts, and Daniel's preview command: npx firebase-tools@15.34.0 hosting:channel:deploy ai-home-<yyyymmdd> --expires 7d --project portfolio-6f211
Don't commit. Return a concise text report: what you changed, remaining doubts.`,
  { label: 'finisher', phase: 'Finish' })

return { winner, votes, tally, protos: ok, judges: js, finish }
