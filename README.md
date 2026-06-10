# Daniel Olliver Portfolio

A responsive React portfolio for Daniel Olliver — AI and full-stack development, with research results verified on real quantum hardware.

## Structure

- **Research** — six result cards, each linking to a full detail page (`/research/<slug>/`) with figures, headline numbers, and honest-limits notes.
- **Quantum Playground** (`/anyons/`) — interactive toric-code board: drag-to-braid anyons, a magic dial, and a hardware-request queue, backed by a client-side stabilizer engine.
- **Essay** (`/essay/`) — the six-year hexagon research arc.
- **Projects** — earlier full-stack work, all live:
  - Scenic: `https://scenic-app.vercel.app/` (React client + Express API on Vercel, MongoDB Atlas)
  - NZ Camps: `https://nz-camps.vercel.app/` (Express/EJS on Vercel, MongoDB Atlas, mongoose 8)
  - Eon Candles: `https://eon-ht82.vercel.app/` (Next.js on Vercel)
- **Resume** — self-hosted at `/resume.pdf`.

## Development

```bash
npm install
npm start        # dev server
npm run build    # production build (build/)
```

Static pages under `public/` (anyons, essay, research, resume) are copied into the build verbatim.

## Deploy

Firebase Hosting:

```bash
npm run build
firebase deploy
```
