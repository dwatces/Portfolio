// Copies the self-hosted font files from @fontsource into public/static/fonts/<version>/.
// The version is part of the path so Firebase can cache /static/** as immutable.
// Run after changing the font packages:  npm install && npm run fonts
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const fonts = [
  ["@fontsource-variable/newsreader", [
    "newsreader-latin-wght-normal.woff2",
    "newsreader-latin-ext-wght-normal.woff2",
  ]],
  ["@fontsource-variable/instrument-sans", [
    "instrument-sans-latin-wght-normal.woff2",
    "instrument-sans-latin-ext-wght-normal.woff2",
  ]],
];

for (const [pkg, files] of fonts) {
  const pkgDir = path.join(root, "node_modules", pkg);
  const { version } = JSON.parse(fs.readFileSync(path.join(pkgDir, "package.json"), "utf8"));
  const out = path.join(root, "public", "static", "fonts", `v${version}`);
  fs.mkdirSync(out, { recursive: true });
  for (const file of files) {
    fs.copyFileSync(path.join(pkgDir, "files", file), path.join(out, file));
    console.log(`${pkg}@${version}  ${file}`);
  }
}
