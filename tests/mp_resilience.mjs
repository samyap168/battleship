// Multiplayer resilience: (1) a deliberately corrupted client is detected by the snapshot hash and pulled back onto
// the host's state; (2) a client that disconnects hands its ship to a bot while the match carries on.
// Usage: node tests/mp_resilience.mjs     (BroadcastChannel; NET=peer for WebRTC via a local PeerJS server)
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const BASE = process.env.BASE || 'http://localhost:5173';
const PEER = process.env.NET === 'peer';
const QS = PEER ? 'quality=low&photo=1&peerhost=localhost&peerport=9000&peersecure=0' : 'quality=low&photo=1';
const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const ctx = await browser.newContext({ viewport: { width: 640, height: 360 } });
const errs = [];
const open = async (tag) => {
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
const A = await open('Ahab');
await A.click('#mpHost'); await A.waitForSelector('.mp-roomcode');
const code = (await A.textContent('.mp-roomcode')).trim();
const B = await open('Bligh');
await B.fill('#mpCode', code); await B.click('#mpJoin'); await B.waitForSelector('.mp-lobby', { timeout: 30000 });
await A.waitForFunction(() => document.querySelectorAll('.seat.human, .seat.me').length >= 2, null, { timeout: 15000 });
// the client switches to an empty seat on the other team's bench: lobby seat moves must reach the host
await B.evaluate(() => { const b = [...document.querySelectorAll('.seat.bot')].find((e) => +e.dataset.i === 9); b.click(); });
await A.waitForFunction(() => window.__aa.session().seats[9] && window.__aa.session().seats[9].name === 'Bligh', null, { timeout: 15000 });
console.log('seat move reached the host: Bligh now in seat 9');
await A.evaluate(() => document.getElementById('mpStart').click());
for (const p of [A, B]) await p.waitForFunction(() => window.__aa.G && window.__aa.G.mp && window.__aa.session() && window.__aa.session().go, null, { timeout: 120000 });
for (const p of [A, B]) await p.evaluate(() => {
  window.__aa.paused = true;
  const s = window.__aa.session(); s.maxSteps = 40; s.accCap = 1;
  window.__drv = setInterval(() => s.update(0.25), 25);
});
const stat = (p) => p.evaluate(() => { const s = window.__aa.session(), G = window.__aa.G; return { tick: s.tick, desyncs: s.stats.desyncs, humans: G.heroes.filter((h) => h.human).length, seat: G.player.seat }; });
await A.waitForTimeout(8000);
const before = await stat(B);
console.log('client before corruption', JSON.stringify(before));
// corrupt the client: teleport a creep-lane hero and hand it gold the host never gave
await B.evaluate(() => { const G = window.__aa.G; const h = G.heroes[1]; h.x += 90; h.gold += 5000; });
await B.waitForFunction((d) => window.__aa.session().stats.desyncs > d, before.desyncs, { timeout: 60000 });
const hit = await stat(B);
console.log('desync detected:', JSON.stringify(hit));
// healed = the peers agree again and stay agreeing: no new mismatch over a long quiet window
let last = hit.desyncs, quiet = 0, after = hit;
for (let i = 0; i < 40 && quiet < 5; i++) {
  await B.waitForTimeout(3000);
  after = await stat(B);
  if (after.desyncs === last) quiet++; else { quiet = 0; last = after.desyncs; }
}
console.log('after resync     ', JSON.stringify(after), 'quiet checks', quiet);
const healed = quiet >= 5;
// disconnect: close the client page entirely
await B.close();
await A.waitForFunction(() => window.__aa.G.heroes.filter((h) => h.human).length === 1, null, { timeout: 60000 });
const t1 = (await stat(A)).tick;
await A.waitForTimeout(3000);
const t2 = (await stat(A)).tick;
console.log('client left: host now has', (await stat(A)).humans, 'human; ticks still advancing:', t2 > t1);
const ok = hit.desyncs > before.desyncs && healed && t2 > t1 && !errs.length;
console.log(ok ? 'PASS: drift detected and healed, disconnect handed to a bot' : 'FAIL healed=' + healed);
if (errs.length) console.log('page errors:', errs.slice(0, 4).join(' | '));
await browser.close();
process.exit(ok ? 0 : 1);
