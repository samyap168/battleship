// Seeded RNG for everything that decides gameplay (bot decisions, shot scatter, crits, wave offsets...).
// Single-player seeds it randomly; multiplayer seeds every peer with the host's number, so all peers
// replay the same match from the same commands. Presentation randomness keeps using Math.random.
// Each Game owns its stream (the menu showreel is a Game too) and selects it at the start of every tick.

export class Rng {
  constructor(seed = 1) { this.s = (seed >>> 0) || 1; }
}
let cur = new Rng(1);

export function useRng(r) { cur = r; }
export function simState() { return cur.s; }
export function setSimState(s) { cur.s = s >>> 0; }

/** mulberry32: 32-bit state, fast, identical on every JS engine (integer maths only). */
export function srand() {
  if (globalThis.__rngTrace) globalThis.__rngTrace.push(new Error().stack.split('\n').slice(2, 5).map((l) => l.trim().replace(/^at /, '').replace(/\(.*\/(.*?)\)/, '($1)')).join(' < '));
  cur.s = (cur.s + 0x6D2B79F5) >>> 0;
  let t = cur.s;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}
export const srnd = (a, b) => a + srand() * (b - a);
