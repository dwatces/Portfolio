// Site check, run against a local server or a preview channel:
//   npm start            (serves public/ on http://localhost:5000)
//   npm run check        (or: node scripts/check-site.js https://<preview-url>)
// 1. every URL the old site had still answers 200 (or a redirect that lands on 200),
// 2. every HTML page loads /ga.js,
// 3. every same-site href/src in every HTML file under public/ points at something that exists.
const fs = require("fs");
const path = require("path");

const base = (process.argv[2] || "http://localhost:5000").replace(/\/$/, "");
const publicDir = path.resolve(__dirname, "..", "public");

const oldUrls = [
  "/", "/dev", "/dev/", "/ai", "/ai/", "/law", "/law/", "/essay", "/essay/",
  "/anyons", "/anyons/", "/anyons/app.js", "/anyons/engine.js",
  "/anyons/decoder/", "/anyons/phase2/",
  "/research/", "/research/braiding/", "/research/chern/", "/research/coldstart/",
  "/research/decoder/", "/research/hexlife/", "/research/nonabelian/", "/research/qrc/",
  "/resume.pdf", "/dev/resume.pdf", "/dev/profile.jpg", "/404.html", "/sitemap.xml", "/robots.txt",
  "/favicon.ico", "/favicon.png", "/favicon-96.png", "/apple-touch-icon.png", "/manifest.json",
  "/ga.js", "/static/media/font.e7663f1a.ttf",
];

function htmlFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return htmlFiles(p);
    return e.name.endsWith(".html") ? [p] : [];
  });
}

function existsInPublic(urlPath) {
  const clean = decodeURIComponent(urlPath.split(/[?#]/)[0]);
  const p = path.join(publicDir, clean);
  if (!p.startsWith(publicDir)) return false;
  if (fs.existsSync(p) && fs.statSync(p).isFile()) return true;
  if (fs.existsSync(path.join(p, "index.html"))) return true;
  return false;
}

(async () => {
  let failures = 0;
  const fail = (msg) => { failures++; console.log("FAIL " + msg); };

  // 1. old URLs over HTTP
  for (const u of oldUrls) {
    try {
      const res = await fetch(base + u, { redirect: "follow" });
      if (res.status !== 200) fail(`${u} -> ${res.status}`);
      else console.log(`ok   ${u} -> 200${res.redirected ? " (via redirect)" : ""}`);
    } catch (e) {
      fail(`${u} -> ${e.message}`);
    }
  }

  // 2 and 3. static checks over every HTML file
  for (const file of htmlFiles(publicDir)) {
    const rel = "/" + path.relative(publicDir, file).split(path.sep).join("/");
    const html = fs.readFileSync(file, "utf8");
    if (!/<script[^>]+src="\/ga\.js"/.test(html)) fail(`${rel} does not load /ga.js`);
    const refs = [...html.matchAll(/\s(?:href|src)="([^"]+)"/g)].map((m) => m[1]);
    const srcsets = [...html.matchAll(/\ssrcset="([^"]+)"/g)].flatMap((m) => m[1].split(",").map((s) => s.trim().split(/\s+/)[0]));
    for (const ref of [...refs, ...srcsets]) {
      if (/^(https?:|mailto:|tel:|#|data:|javascript:)/.test(ref) || ref.startsWith("//")) continue;
      const resolved = new URL(ref, "https://x" + rel).pathname;
      if (!existsInPublic(resolved)) fail(`${rel} links to missing ${ref}`);
    }
  }

  console.log(failures ? `\n${failures} problem(s)` : "\nAll checks passed");
  process.exit(failures ? 1 : 0);
})();
