# danielolliver.com: working rules for Claude Code sessions

This repo is the source of danielolliver.com (Firebase Hosting project `portfolio-6f211`). It is a public repo: everything you commit is visible to anyone.

## What Daniel wants from the two pages (his words, 20 Oct 2026)
- "the ./dev should focus on dev work, the main danielolliver.com should focus on AI work"
- **danielolliver.com (the homepage):** "needs to focus purely on AI and nothing about web dev work whilst linking research papers". Also: "on danielolliver.com link the research papers on linkedin". Brief: `docs/AI_HOMEPAGE_BRIEF.md`.
- **danielolliver.com/dev:** "/dev should look much better - mirror the recent changes in olliverweb.co.nz". Many olliverweb.co.nz pages link to it, so it must look like it comes from the same studio. "the CV on danielolliver/dev should be from downloads" (done: `public/dev/resume.pdf` is the new CV). Brief: `docs/dev-redesign/BRIEF.md`.
- "don't make it live". Nothing gets deployed from a session. Daniel previews every change himself and decides.
- "make sure claude doesn't show as a contributor at all". See "Commit identity" below.

The two pages are separate jobs and may run in two sessions at once. Each one owns its own files (see "Who owns what").

## Commit identity (required, every commit)
Before your first commit, run:
```
git config user.name "Daniel Olliver"
git config user.email "74215535+dwatces@users.noreply.github.com"
```
- Never add `Co-Authored-By` trailers, "Generated with Claude Code" lines or any Claude or Anthropic attribution, in commit messages or in pull request titles and bodies.
- Before you push, run `git log --format='%h %an <%ae>%n%b' origin/main..HEAD`. If any commit shows another author or a trailer, fix it with `git rebase origin/main --exec 'git commit --amend --no-edit --reset-author'` (after setting the config above), remove the trailer lines, and push again.

## Never
- Deploy, publish, or run `firebase deploy`, `hosting:clone` or `hosting:channel:deploy`. Write the preview command in your summary for Daniel to run.
- Request any new path on https://danielolliver.com. Cloudflare sits in front of it and caches a 404 for a file that doesn't exist yet, which breaks the later go-live. Test only on a local server (`python3 -m http.server <port> --bind 127.0.0.1`).
- Link or recreate `/ai/` or `/law/`. Both pages were deleted on 20 Oct.
- Add a client, employer, number, award or claim that isn't in the brief's fact list.
- Commit to `main`. Work on a new branch and open a pull request.

## Who owns what
- **/dev session:** `public/dev/**` and `docs/dev-redesign/**` only.
- **Homepage session:** everything else, including `src/`, `public/index.html`, `firebase.json`, `public/sitemap.xml` and `public/static/`. Don't touch `public/dev/**`.
- **Shared and read-only:** `docs/tools/` (the screenshot tool) and this file.
- Put scratch copies and prototypes under `work/`, which is git-ignored.

## Site facts both sessions need
- Live today: `/` (an old React homepage, built from `src/` into `build/`), `/dev/`, `/essay/`, `/anyons/` (Hex demo) and `/anyons/decoder/`, `/research/` plus seven pages (braiding, chern, coldstart, decoder, hexlife, nonabelian, qrc), `/resume.pdf`, `/dev/resume.pdf`, `/404.html`, `/sitemap.xml`, `/robots.txt`, favicons and manifest.
- The research pages and `404.html` load `/static/media/font.e7663f1a.ttf`. That file is now committed at `public/static/media/font.e7663f1a.ttf` and must keep that exact path.
- `<script defer src="/ga.js"></script>` is on every page. Keep it.
- Email: daniel@danielolliver.com. Cloudflare rewrites plain addresses, so wrap every mailto link in `<!--email_off-->…<!--/email_off-->`.
- GitHub: https://github.com/dwatces. LinkedIn: https://www.linkedin.com/in/danielolliver
- Education, worded exactly like this: "BSc in Computer Science (AUT)" and "Postgraduate Certificate in AI (University of Auckland)". Never "Bachelor of Computer and Information Sciences".
- Copy: NZ English, plain, first person, specific. No hype, and no claim a page can't back up.
