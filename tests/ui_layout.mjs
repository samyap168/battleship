// HUD layout across window sizes and input types: nothing off-screen, nothing important overlapping, options reachable.
//   BASE=http://localhost:5173 node tests/ui_layout.mjs
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const BASE = process.env.BASE || 'http://localhost:5173';
const SIZES = [
  ['desktop 1920x1080', 1920, 1080, false], ['desktop 1280x720', 1280, 720, false], ['laptop 1024x640', 1024, 640, false],
  ['tablet 1024x768 touch', 1024, 768, true], ['tablet portrait 768x1024 touch', 768, 1024, true],
  ['phone landscape 844x390', 844, 390, true], ['phone small landscape 667x375', 667, 375, true], ['phone large landscape 932x430', 932, 430, true],
  ['phone portrait 390x844', 390, 844, true], ['phone small portrait 360x640', 360, 640, true], ['phone large portrait 430x932', 430, 932, true],
];
const SHOW = ['#topbar', '#minimap', '#portrait', '#abilities', '#goldbox', '#optBtn', '#howtoBtn'];
const TOUCH_EXTRA = ['#armBtn', '#recenterBtn'];
const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
let bad = 0;
for (const [name, w, h, touch] of SIZES) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, hasTouch: touch, isMobile: touch, deviceScaleFactor: 1 });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(e.message));
  await p.goto(`${BASE}/?autoplay=1&quality=low`);
  await p.waitForFunction(() => window.__aa && window.__aa.G && window.__aa.G.player, null, { timeout: 120000 });
  await p.evaluate(() => { const A = window.__aa; A.howto(false); A.paused = true; A.cameraDir.intro = 0; A.cameraDir.cine = null; for (let i = 0; i < 100; i++) A.ff(0.05); document.body.classList.remove('cinematic'); A.step(5, 1 / 30); });
  await p.waitForTimeout(600);
  const res = await p.evaluate(([sel, touch]) => {
    const vw = innerWidth, vh = innerHeight, out = { off: [], overlap: [], small: [] };
    const rects = {};
    for (const s of sel) { const e = document.querySelector(s); if (!e) continue; const cs = getComputedStyle(e); if (cs.display === 'none' || cs.visibility === 'hidden') continue; const r = e.getBoundingClientRect(); if (r.width < 2) continue; rects[s] = r;
      if (r.left < -1 || r.top < -1 || r.right > vw + 1 || r.bottom > vh + 1) out.off.push(`${s} ${[r.left, r.top, r.right, r.bottom].map(Math.round)}`);
      if (touch && (s === '#armBtn' || s === '#recenterBtn' || s.startsWith('.ab')) && (r.width < 40 || r.height < 40)) out.small.push(`${s} ${Math.round(r.width)}x${Math.round(r.height)}`); }
    const keys = Object.keys(rects);
    for (let i = 0; i < keys.length; i++) for (let j = i + 1; j < keys.length; j++) { const a = rects[keys[i]], b = rects[keys[j]]; const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left), oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top); if (ox > 3 && oy > 3) out.overlap.push(`${keys[i]} x ${keys[j]} (${Math.round(ox)}x${Math.round(oy)})`); }
    // skill buttons: each at least 44 px on touch
    if (touch) document.querySelectorAll('.ab').forEach((e) => { const r = e.getBoundingClientRect(); if (r.width < 44 || r.height < 44) out.small.push(`.ab ${Math.round(r.width)}x${Math.round(r.height)}`); });
    return out;
  }, [touch ? SHOW.concat(TOUCH_EXTRA) : SHOW, touch]);
  // options panel: fits or scrolls
  await p.evaluate(() => { document.getElementById('optBtn').click(); });
  await p.waitForTimeout(300);
  const opt = await p.evaluate(() => { const box = document.querySelector('.op-box'), root = document.getElementById('options'); if (!box || root.classList.contains('hidden')) return { shown: false }; const r = box.getBoundingClientRect(); const scroll = [box, root].some((e) => { const o = getComputedStyle(e).overflowY; return (o === 'auto' || o === 'scroll') && e.scrollHeight > e.clientHeight + 1; });
    const resume = document.getElementById('optResume').getBoundingClientRect(); return { shown: true, fits: r.top >= -1 && r.bottom <= innerHeight + 1 && r.left >= -1 && r.right <= innerWidth + 1, scroll, resumeVisible: resume.bottom <= innerHeight + 1 && resume.top >= 0 }; });
  const problems = [];
  if (res.off.length) problems.push('off-screen: ' + res.off.join('; '));
  if (res.overlap.length) problems.push('overlap: ' + res.overlap.join('; '));
  if (res.small.length) problems.push('tap targets: ' + res.small.join('; '));
  if (!opt.shown) problems.push('options did not open'); else if (!opt.fits && !opt.scroll) problems.push('options panel clipped and not scrollable'); else if (!opt.fits && opt.scroll) { /* scrolls: fine */ }
  if (errs.length) problems.push('page errors: ' + errs[0]);
  console.log(problems.length ? `FAIL ${name}: ${problems.join(' | ')}` : `ok   ${name}`);
  bad += problems.length ? 1 : 0;
  await ctx.close();
}
await browser.close();
console.log(bad ? `FAIL: ${bad} layouts have problems` : 'PASS: layouts');
process.exit(bad ? 1 : 0);
