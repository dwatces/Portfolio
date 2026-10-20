export const meta = {
  name: 'dev-page-redesign-cloud',
  description: 'danielolliver.com/dev: three prototypes in the olliverweb.co.nz design language, three-lens judge panel, finisher writes public/dev/index.html',
  phases: [
    { title: 'Setup', detail: 'install the screenshot tool, make three clean site copies' },
    { title: 'Prototype', detail: '3 directions, each built, screenshotted and self-revised' },
    { title: 'Judge', detail: 'OW match, audiences + truth, Daniel proxy' },
    { title: 'Finish', detail: 'winner + grafts + must-fixes into public/dev/index.html' },
  ],
}

// All paths are relative to the repo root, which is every agent's working directory
// (run `cd "$(git rev-parse --show-toplevel)"` first if unsure).

const SHOOT = 'node docs/tools/shoot.mjs'

const COMMON = `You are redesigning ONE page: danielolliver.com/dev, Daniel Olliver's development portfolio. Daniel's words: "/dev should look much better - mirror the recent changes in olliverweb.co.nz" and "the ./dev should focus on dev work, the main danielolliver.com should focus on AI work".
Work from the repo root (cd "$(git rev-parse --show-toplevel)").
FIRST read CLAUDE.md, docs/dev-redesign/BRIEF.md and docs/dev-redesign/FACTS.md in full and follow them exactly (design system, content truth, technical and safety rules). Then study the Olliver Web reference: Read the screenshot chunks in docs/dev-redesign/ref/ow-shots/ (ow-home-1440-c0..c6, ow-home-390-c0..c4, ow-about-1440-c0..c2, ow-case-1440-c0..c2, ow-webapps-1440-c0..c3) and read the CSS in docs/dev-redesign/ref/ow-src/index.html (inline <style>) and docs/dev-redesign/ref/ow-src/site-shell.css. Look at the current /dev too: docs/dev-redesign/ref/current-shots/.
Hard rules: never request anything on https://danielolliver.com (Cloudflare caches 404s for new paths); test only on 127.0.0.1; work only in your own directory; kill your server PID when done; every claim must trace to FACTS.md; don't commit or push (the main session does that); /dev is dev work only (one small link to https://danielolliver.com/ for AI and research is the only AI mention; never link /ai/ or /law/).`

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
  { id: 'A', port: 6401, name: 'Editorial twin',
    idea: `Mirror the Olliver Web homepage rhythm as closely as possible so a visitor arriving from olliverweb.co.nz feels no seam. Eyebrow + two-tone Fraunces H1 + lead + dark/outlined buttons with the portrait or a live-client proof card on the right (like the OW hero's Back to Nature card + Google review quote). Then client work as OW-style editorial blocks (Back to Nature as the big image feature with the "● LIVE CLIENT SITE" tag and the review; the healthcare platform as a typographic panel), his own earlier builds as a 3-up row of browser-framed thumbnails, experience as an OW "No big reveal"-style numbered/connected timeline, toolbox as editorial rows, education, a dark full-bleed contact band in the spirit of "Ring the person who'll build it." and an OW-style footer.` },
  { id: 'B', port: 6402, name: 'Work-first case studies',
    idea: `Make the work carry the page. A compact, confident hero, then large alternating case-study panels: each with a big browser-framed screenshot (desktop capture with the phone capture overlapping it where it helps), a one-line "the job", what he built, stack, and Live/Code links. The healthcare platform gets an equal-weight typographic panel with a simple architecture strip built only from FACTS (patient screens -> React front end -> Node/Express API -> Supabase/PostgreSQL), clearly marked private, walkthrough on request. Experience as a clean ledger (role, place, years, one line), toolbox and education compact, then a dark contact band and OW-style footer.` },
  { id: 'C', port: 6403, name: 'Thirty-second read',
    idea: `Optimise for the hiring manager who skims, while keeping OW's editorial calm. Hero with the two-tone Fraunces H1, a short lead, an "at a glance" strip built only from FACTS (e.g. five years / freelance since 2024 / React, Next.js, TypeScript, Node, Supabase / Auckland, contract and freelance) and prominent "CV (PDF)" + email buttons. Below, use the OW /about "pair" pattern throughout: sticky Fraunces section titles on the left at desktop, content on the right (Work, Experience, Toolbox, Education, Contact), with thumbnails for the live builds and a clear client-work vs own-builds split. A light in-page section index in the header. End with a dark contact band and OW-style footer.` },
]

phase('Setup')
const setup = await agent(
`Work from the repo root (cd "$(git rev-parse --show-toplevel)"). Prepare the workspace for a page-redesign workflow. Don't commit anything.
1. cd docs/tools && npm install --no-audit --no-fund && npx playwright install chromium ; cd back to the repo root. If a later launch fails with missing libraries, run (cd docs/tools && npx playwright install --with-deps chromium).
2. For X in A B C: rm -rf work/dev/protos/X && mkdir -p work/dev/protos/X/shots && cp -a public work/dev/protos/X/site && : > work/dev/protos/X/site/ga.js   (the empty ga.js stops analytics in tests).
3. Prove the tool works: start python3 -m http.server 6400 --bind 127.0.0.1 in work/dev/protos/A/site in the background, note its PID, run ${SHOOT} http://127.0.0.1:6400/dev/ work/dev/baseline 390,1440 base , then kill the PID. It must print one JSON line per width with "chunks" > 0.
Return a short text: OK or the exact error, plus the two JSON lines.`,
  { label: 'setup', phase: 'Setup', effort: 'low' })
log(`setup: ${String(setup).slice(0, 300)}`)

phase('Prototype')
const protos = await parallel(DIRECTIONS.map(d => () => agent(
`${COMMON}

YOUR DIRECTION: ${d.id}, "${d.name}". ${d.idea}
Interpret the direction with judgement; it's a starting point, not a wireframe. Copy is yours to write in the Olliver Web voice (plain, first person, specific, no hype), within FACTS.md.

Your site directory: work/dev/protos/${d.id}/site (a full copy of public/ with ga.js emptied; the new fonts, photos and screenshots are in site/dev/assets/, and site/dev/resume.pdf is the new CV). Write ONLY site/dev/index.html (replace it completely). Your port: ${d.port}. Shots: work/dev/protos/${d.id}/shots.
Process:
1. Build the complete page.
2. Serve it (cd work/dev/protos/${d.id}/site && python3 -m http.server ${d.port} --bind 127.0.0.1 & ; save the PID to work/dev/protos/${d.id}/serve.pid) and from the repo root run: ${SHOOT} http://127.0.0.1:${d.port}/dev/ work/dev/protos/${d.id}/shots/r1 390,768,1440,1920 r1
3. Read the chunks at every width and compare them side by side with the OW shots. Be your own harshest critic: random-looking spacing, weak hierarchy, anything template-y, a cramped phone layout, anything that doesn't look like it came from the same studio as olliverweb.co.nz. Also fix every overflow, small tap target, console error and failed request the JSON reports.
4. Revise and re-shoot (r2, r3 ...). Do at least two full revise-and-look rounds.
5. Leave your final screenshots as work/dev/protos/${d.id}/shots/final-<w>-cN.png (run the tool with prefix "final" into work/dev/protos/${d.id}/shots). Kill your server PID.
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
  { key: 'ow-match', port: 6404, text: `LENS: Does it belong with olliverweb.co.nz? Judge type, palette, spacing rhythm, components, header/footer, image treatment and voice against the OW screenshots and CSS, at 390 and 1440 especially. A visitor clicking "my development portfolio" on olliverweb.co.nz must feel the same studio made both. Penalise anything generic, template-y or off-system (wrong fonts, chip soup, inconsistent radii/shadows, random gaps).` },
  { key: 'audiences-truth', port: 6405, text: `LENS: Does it work for both audiences and is every word true? (1) An Auckland small-business owner arriving from Olliver Web wanting proof he builds real software and a way back/contact; (2) a hiring manager skimming for 30 seconds (who, stack, what shipped, where worked, education, CV, contact). Then check EVERY sentence of each prototype's dev/index.html against FACTS.md and list each untraceable or inflated claim in truthProblems (quote the text). Flag any AI-research content beyond one small link to https://danielolliver.com/, and any link to /ai/ or /law/. Also check head meta, canonical, JSON-LD, email_off wrapping, the ga.js tag and that the CV link is "resume.pdf".` },
  { key: 'daniel-proxy', port: 6406, text: `LENS: You are Daniel. You rejected an earlier olliverweb round as "not compelling; not eloquent at all" and "weird spacing thats random", and approved lines like "The person who picks up the phone builds your website." Compared with the current /dev (docs/dev-redesign/ref/current-shots/), which prototype makes you say "that's far better and it matches my new site"? Which one would you send to a hiring manager tomorrow? Be blunt about anything meh, cramped, over-long or awkward on a phone.` },
]

phase('Judge')
const judges = await parallel(LENSES.map(l => () => agent(
`${COMMON}

You are a judge. ${l.text}
Prototypes to compare (each is a complete page): ${ok.map(p => `\n- ${p.id}: file ${p.file}; final screenshots ${p.shotsDir}/final-<390|768|1440|1920>-cN.png; author's direction: ${p.direction}; author's self-critique: ${p.selfCritique}`).join('')}
Read each prototype's final screenshot chunks at 390, 1440 and 1920 (all chunks, top to bottom) and its HTML. If you need to interact (menu, hover, focus), serve the prototype's site dir yourself on port ${l.port} only (one at a time, kill the PID after).
Score each prototype 0-100 for your lens with specific notes. Pick a winner. List grafts: specific elements from the non-winners that would make the winner better (be concrete: which section, what about it). List mustFix items for the winner (concrete, actionable). Return structured output.`,
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
1. rm -rf work/dev/final && mkdir -p work/dev/final && cp -a work/dev/protos/${winner}/site work/dev/final/site (don't modify the protos).
2. Apply EVERY mustFix and every truthProblem fix from all three judges (truth problems on the winner must be fixed; if one was found only in another prototype, make sure the winner doesn't have it too). Apply the grafts the judges agree on, and any single-judge graft that clearly makes the page better without breaking its coherence. Keep it one coherent design, not a collage.
3. Serve work/dev/final/site on port 6410 only (PID to work/dev/final/serve.pid) and run the tool at 390,768,1440,1920 into work/dev/final/shots (prefix f1, then f2 ...). Read every chunk. Iterate until there is nothing left you would be embarrassed to show Daniel: even spacing rhythm, nothing cramped at 390 or 320 (also shoot 320), no overflow, all buttons and nav at least 44px, no console errors or failed requests, fonts loaded, headings logical.
4. Make a proper 1200x630 social card if feasible: an HTML card in the OW style rendered with Playwright (docs/tools has it installed), saved as work/dev/final/site/dev/assets/og-dev-20261020.png (under about 150 KB). Point og:image and twitter:image at https://danielolliver.com/dev/assets/og-dev-20261020.png with width/height meta. Do NOT request that URL.
5. Copy the result into the repo: cp work/dev/final/site/dev/index.html public/dev/index.html (and the og png into public/dev/assets/ if you made one). Change nothing else under public/.
6. Final screenshots for the PR: SHOT_FORMAT=jpeg ${SHOOT} http://127.0.0.1:6410/dev/ docs/dev-redesign/screens 390,1440 final . Kill your server PID.
7. Write docs/dev-redesign/SUMMARY.md: what came from which prototype, every judge item and whether you applied it (and why not if skipped), every factual claim on the page with its FACTS.md line, remaining doubts, and Daniel's preview command: npx firebase-tools@15.34.0 hosting:channel:deploy dev-<yyyymmdd> --expires 7d --project portfolio-6f211
Don't commit. Return a concise text report: what you changed, remaining doubts.`,
  { label: 'finisher', phase: 'Finish' })

return { winner, votes, tally, protos: ok, judges: js, finish }
