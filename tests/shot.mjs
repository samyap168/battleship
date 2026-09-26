// Usage: node tests/shot.mjs <url> <out.png> [waitMs] [width] [height] [evalJs]
// Headless Chromium with SwiftShader WebGL, for visual checks in CI/cloud.
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); }
catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }

const [url, out = 'tests/output/shot.png', wait = '4000', w = '1600', h = '900', evalJs] = process.argv.slice(2);
const browser = await chromium.launch({
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--autoplay-policy=no-user-gesture-required'],
});
const page = await browser.newPage({ viewport: { width: +w, height: +h } });
const logs = [];
page.on('console', (m) => logs.push(`[${m.type()}] ${m.text()}`));
page.on('pageerror', (e) => logs.push(`[pageerror] ${e.message}\n${e.stack}`));
await page.goto(url, { waitUntil: 'load' });
if (evalJs) await page.evaluate(evalJs);
await page.waitForTimeout(+wait);
await page.screenshot({ path: out, timeout: 180000 });
console.log(logs.slice(-40).join('\n'));
await browser.close();
