// Screenshot + layout probe for the danielolliver.com redesigns (Playwright Chromium).
// Setup once: cd docs/tools && npm install && npx playwright install chromium
//   (if Chromium fails to launch: npx playwright install --with-deps chromium)
// Usage (from the repo root): node docs/tools/shoot.mjs <url> <outDir> [widths=390,768,1440,1920] [prefix=dev]
// Writes <outDir>/<prefix>-<w>-full.png and viewport-height chunks <prefix>-<w>-c<N>.png
// (chunks are what you should Read: full pages are too tall to view).
// Prints one JSON line per width: overflowX, small tap targets (<44px, visible), console
// errors, failed requests, fonts loaded, heading outline, images missing alt, page height.
// Only ever point it at a local server (http://127.0.0.1:<port>/...), never at danielolliver.com.
import fs from "fs";
import { chromium } from "playwright";

const [url, outDir, widthsArg, prefixArg] = process.argv.slice(2);
if (!url || !outDir) { console.error("usage: node shoot.mjs <url> <outDir> [widths] [prefix]"); process.exit(2); }
const widths = (widthsArg || "390,768,1440,1920").split(",").map(Number);
const prefix = prefixArg || "dev";
// SHOT_FORMAT=jpeg writes .jpg chunks at quality 75 (use it for screenshots you commit)
const JPEG = (process.env.SHOT_FORMAT || "").toLowerCase().startsWith("jp");
const EXT = JPEG ? "jpg" : "png";
const IMG = JPEG ? { type: "jpeg", quality: 75 } : {};
fs.mkdirSync(outDir, { recursive: true });
if (/danielolliver\.com/.test(url)) { console.error("refusing to shoot the live domain; use a local server"); process.exit(2); }
const browser = await chromium.launch({ headless: true, args: ["--no-sandbox", "--disable-gpu", "--hide-scrollbars"], ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
try {
  for (const w of widths) {
    const mobile = w < 760;
    const vh = mobile ? 844 : 900;
    const context = await browser.newContext({ viewport: { width: w, height: vh }, deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile });
    const page = await context.newPage();
    const consoleErrors = [], failed = [];
    page.on("console", (m) => { if (m.type() === "error") consoleErrors.push(m.text().slice(0, 200)); });
    page.on("pageerror", (e) => consoleErrors.push("pageerror: " + String(e).slice(0, 200)));
    page.on("requestfailed", (r) => failed.push(r.url().slice(0, 150) + " " + (r.failure()?.errorText || "")));
    page.on("response", (r) => { if (r.status() >= 400) failed.push(r.status() + " " + r.url().slice(0, 150)); });
    await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
    await page.evaluate(async () => { await document.fonts.ready; });
    // scroll through so lazy images load, then back to top
    await page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); }
      window.scrollTo(0, 0);
    });
    await new Promise(r => setTimeout(r, 700));
    const m = await page.evaluate(() => {
      const de = document.documentElement;
      const small = [];
      for (const el of document.querySelectorAll("a,button,summary,input,select,textarea")) {
        const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
        if (!r.width || !r.height || cs.visibility === "hidden") continue;
        // inline text links inside paragraphs are exempt (WCAG 2.5.8 inline exception)
        if (cs.display === "inline" && el.closest("p,li,dd,figcaption")) continue;
        if (r.height < 44 || r.width < 44) small.push(`${el.tagName.toLowerCase()} "${(el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 30)}" ${Math.round(r.width)}x${Math.round(r.height)}`);
      }
      const wide = [];
      for (const el of document.querySelectorAll("body *")) {
        const r = el.getBoundingClientRect();
        if (r.right > de.clientWidth + 1 && r.width > 0 && getComputedStyle(el).position !== "fixed") wide.push(el.tagName.toLowerCase() + "." + (el.className || "").toString().slice(0, 30) + " right=" + Math.round(r.right));
        if (wide.length > 8) break;
      }
      const fonts = [...document.fonts].map(f => `${f.family} ${f.weight} ${f.status}`);
      const heads = [...document.querySelectorAll("h1,h2,h3")].map(h => h.tagName + ": " + h.textContent.trim().replace(/\s+/g, " ").slice(0, 70));
      const noAlt = [...document.images].filter(i => !i.hasAttribute("alt")).map(i => i.src.slice(-60));
      return { overflowX: de.scrollWidth > de.clientWidth, scrollWidth: de.scrollWidth, clientWidth: de.clientWidth, wide, small: small.slice(0, 25), smallCount: small.length, fonts, heads, noAlt, height: de.scrollHeight };
    });
    if (!JPEG) await page.screenshot({ path: `${outDir}/${prefix}-${w}-full.png`, fullPage: true });
    // viewport-sized chunks for reading
    let n = 0;
    for (let y = 0; y < m.height; y += vh) {
      await page.screenshot({ ...IMG, path: `${outDir}/${prefix}-${w}-c${n}.${EXT}`, clip: { x: 0, y, width: w, height: Math.min(vh, m.height - y) }, fullPage: true });
      n++;
      if (n > 14) break;
    }
    console.log(JSON.stringify({ width: w, chunks: n, ...m, consoleErrors, failed }));
    await context.close();
  }
} finally { await browser.close(); }
