// Many humans over real WebRTC: one host and N-1 clients through a local PeerJS server (see README), commands from everyone.
//   NET=peer node tests/mp_many.mjs [humans=5] [seconds=40]
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PW || '/opt/node22/lib/node_modules/playwright');
const BASE = process.env.BASE || 'http://localhost:5173';
const PEER = process.env.NET === 'peer';
const N = +process.argv[2] || 5, SECONDS = +process.argv[3] || 40;
const QS = PEER ? 'quality=low&photo=1&peerhost=localhost&peerport=9000&peersecure=0' : 'quality=low&photo=1';
const ARGS = ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'];
const browsers = []; let opened = 0;
const errs = [];
const open = async (tag) => {
  if (opened++ % 3 === 0) browsers.push(await chromium.launch({ args: ARGS })); // a few pages per browser process: dozens of software-GL contexts in one GPU process fall over
  const ctx = await browsers[browsers.length - 1].newContext({ viewport: { width: 480, height: 300 } });
  const p = await ctx.newPage();
  p.on('pageerror', (e) => errs.push(tag + ': ' + e.message));
  await p.goto(`${BASE}/?${QS}`);
  await p.waitForSelector('#mpBtn', { timeout: 120000, state: 'visible' });
  await p.evaluate(() => { window.__aa.paused = true; });
  await p.click('#mpBtn', { timeout: 120000 });
  if (!PEER) await p.click('#mpNet button[data-v="local"]');
  await p.fill('#mpName', tag);
  return p;
};
const pages = [await open('H0')];
await pages[0].click('#mpHost');
await pages[0].waitForSelector('.mp-roomcode');
const code = (await pages[0].textContent('.mp-roomcode')).trim();
for (let i = 1; i < N; i++) {
  const p = await open('P' + i);
  await p.fill('#mpCode', code); await p.click('#mpJoin'); await p.waitForSelector('.mp-lobby', { timeout: 40000 });
  pages.push(p);
}
await pages[0].waitForFunction((n) => document.querySelectorAll('.seat.human, .seat.me').length >= n, N, { timeout: 20000 });
console.log(`${N} humans seated, room ${code}`);
// the sim is under test, not the picture: nothing is drawn (N software-rendered pages would starve each other); each page's session is driven by hand
for (const p of pages) await p.evaluate(() => { const s = window.__aa.session(); setInterval(() => s.update(0.25), 25); });
await pages[0].evaluate(() => document.getElementById('mpStart').click());
for (const p of pages) await p.waitForFunction(() => window.__aa.G && window.__aa.G.mp && window.__aa.session() && window.__aa.session().go, null, { timeout: 180000 });
console.log('match running on all');
for (const p of pages) await p.evaluate(() => { const s = window.__aa.session(); s.maxSteps = 40; s.accCap = 1; });
const t0 = Date.now(); let n = 0;
while (Date.now() - t0 < SECONDS * 1000) {
  await Promise.all(pages.map((p, k) => p.evaluate(([i, k]) => { const G = window.__aa.G, h = G.player; window.__aa.cmd({ k: 'mv', x: h.x + ((i + k) % 2 ? 70 : -70), z: h.z + ((i + k) % 3 - 1) * 40 }); }, [n, k])));
  n++; await pages[0].waitForTimeout(2000);
}
const stats = await Promise.all(pages.map((p) => p.evaluate(() => { const s = window.__aa.session(), G = window.__aa.G; return { tick: s.tick, desyncs: s.stats.desyncs, humans: G.heroes.filter((h) => h.human).length, time: +G.time.toFixed(0) }; })));
stats.forEach((s, i) => console.log(i === 0 ? 'host  ' : 'client', JSON.stringify(s)));
const ok = stats.every((s) => s.tick > 1500 && s.desyncs === 0 && s.humans === N) && !errs.length;
console.log(ok ? `PASS: ${N} humans stayed in sync` : 'FAIL');
if (errs.length) console.log('page errors:', errs.slice(0, 4).join(' | '));
for (const b of browsers) await b.close();
process.exit(ok ? 0 : 1);
