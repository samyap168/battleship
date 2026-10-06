// Player commands for multiplayer. A command is what one captain asks their ship to do. Commands travel as small
// JSON objects and are applied at an agreed simulation tick on every peer, so every peer runs the same match.
import { HULLS, UPGRADES } from '../core/config.js';
import { BOUNDS } from '../game/map.js';
import { cast } from '../game/abilities.js';

const num = (v) => (typeof v === 'number' && Number.isFinite(v) ? v : null);
const r1 = (v) => Math.round(v * 10) / 10;
const clampX = (x) => Math.max(-BOUNDS.x, Math.min(BOUNDS.x, x));
const clampZ = (z) => Math.max(-BOUNDS.z, Math.min(BOUNDS.z, z));

export const Cmd = {
  move: (x, z) => ({ k: 'mv', x: r1(x), z: r1(z) }),
  attack: (id) => ({ k: 'at', t: id }),
  stop: () => ({ k: 'st' }),
  cast: (i, x, z) => ({ k: 'ca', i, x: r1(x), z: r1(z) }),
  ageUp: (hull) => ({ k: 'ag', h: hull }),
  buy: (id) => ({ k: 'bu', id }),
  rally: (x, z) => ({ k: 'ra', x: r1(x), z: r1(z) }),
  bot: () => ({ k: 'bot' }), // host-only: the seat's player left, a bot takes the helm
};

/** Validate a command received over the wire; returns a clean copy or null. Never trust a peer. */
export function sanitize(c) {
  if (!c || typeof c !== 'object') return null;
  switch (c.k) {
    case 'mv': case 'ra': { const x = num(c.x), z = num(c.z); return x === null || z === null ? null : { k: c.k, x: clampX(x), z: clampZ(z) }; }
    case 'at': return Number.isInteger(c.t) ? { k: 'at', t: c.t } : null;
    case 'st': return { k: 'st' };
    case 'ca': { const x = num(c.x), z = num(c.z); return Number.isInteger(c.i) && c.i >= 0 && c.i < 4 && x !== null && z !== null ? { k: 'ca', i: c.i, x: clampX(x), z: clampZ(z) } : null; }
    case 'ag': return typeof c.h === 'string' && HULLS[c.h] ? { k: 'ag', h: c.h } : null;
    case 'bu': return typeof c.id === 'string' && UPGRADES.some((u) => u.id === c.id) ? { k: 'bu', id: c.id } : null;
    case 'bot': return { k: 'bot' };
    default: return null;
  }
}

/** Run a command for a hero. Called at the start of the tick it was scheduled for, identically on every peer. */
export function applyCommand(G, h, c) {
  if (!h || (!h.human && c.k !== 'bot')) return; // a bot's seat takes no player orders
  switch (c.k) {
    case 'bot': G.botify(h); return;
    case 'mv': if (h.alive) h.commandMove(c.x, c.z); return;
    case 'at': {
      if (!h.alive) return;
      const u = G.units.find((o) => o.id === c.t);
      if (u && u.alive && u.team !== h.team) h.commandAttack(u);
      return;
    }
    case 'st': if (h.alive) h.stop(); return;
    case 'ca': if (h.alive) cast(G, h, c.i, c.x, c.z); return;
    case 'ag': G.ageUp(h, c.h); return;
    case 'bu': G.buyUpgrade(h, c.id); return;
    case 'ra': if (h.alive) G.callRally(h, c.x, c.z); return;
    default:
  }
}
