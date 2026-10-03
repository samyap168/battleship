// Map layout: a three-lane archipelago, point-symmetric so both teams are
// exactly fair. Blue (Azure) holds the west, Red (Crimson) the east.

export const BOUNDS = { x: 770, z: 470 };
export const BASE_X = 640;
export const SPAWN_X = 712;

const mirrorZ = (arr) => arr.flatMap((o) => (o.z === 0 ? [o] : [o, { ...o, z: -o.z }]));
const mirrorX = (arr) => arr.flatMap((o) => (o.x === 0 ? [o] : [o, { ...o, x: -o.x }]));

// Collision islands {x, z, r, kind}
export const ISLANDS = [
  ...mirrorX(mirrorZ([
    { x: 340, z: 170, r: 52, kind: 'jungle', seed: 1 },
    { x: 165, z: 205, r: 38, kind: 'jungle', seed: 2 },
    { x: 250, z: 95, r: 20, kind: 'rock', seed: 3 },
    { x: 470, z: 150, r: 24, kind: 'rock', seed: 4 },
    { x: 95, z: 110, r: 16, kind: 'rock', seed: 5 },
    { x: 560, z: 420, r: 34, kind: 'edge', seed: 6 },
    { x: 260, z: 440, r: 30, kind: 'edge', seed: 7 },
    { x: 700, z: 180, r: 30, kind: 'harbor', seed: 8 },
    { x: 700, z: 300, r: 36, kind: 'harbor', seed: 9 },
  ])),
  { x: 0, z: 440, r: 26, kind: 'edge', seed: 10 },
  { x: 0, z: -440, r: 26, kind: 'edge', seed: 11 },
];

// Decorative mountains beyond the play boundary (not colliders).
export const SCENERY = [
  ...mirrorX(mirrorZ([
    { x: 300, z: 640, r: 150, h: 120, seed: 21 },
    { x: 720, z: 620, r: 170, h: 170, seed: 22 },
    { x: 980, z: 300, r: 180, h: 150, seed: 23 },
    { x: 1040, z: 0, r: 150, h: 110, seed: 24 },
  ])),
  { x: 0, z: 700, r: 200, h: 90, seed: 25 },
  { x: 0, z: -700, r: 200, h: 90, seed: 26 },
];

// Lane waypoints from BLUE base to RED base.
const TOP = [
  { x: -600, z: -40 }, { x: -560, z: -230 }, { x: -450, z: -320 }, { x: -220, z: -335 },
  { x: 0, z: -330 }, { x: 220, z: -335 }, { x: 450, z: -320 }, { x: 560, z: -230 }, { x: 600, z: -40 },
];
export const LANES = {
  top: TOP,
  mid: [{ x: -600, z: 0 }, { x: -300, z: 0 }, { x: 0, z: 0 }, { x: 300, z: 0 }, { x: 600, z: 0 }],
  bot: TOP.map((p) => ({ x: p.x, z: -p.z })),
};
export const LANE_IDS = ['top', 'mid', 'bot'];
export function laneFor(team, lane) {
  const pts = LANES[lane];
  return team === 0 ? pts : [...pts].reverse();
}

// Structures for team 0; team 1 is mirrored in x.
const TOWERS_BLUE = [
  { lane: 'top', tier: 'outer', x: -250, z: -372 },
  { lane: 'top', tier: 'inner', x: -500, z: -330 },
  { lane: 'mid', tier: 'outer', x: -230, z: 34 },
  { lane: 'mid', tier: 'inner', x: -440, z: -34 },
  { lane: 'bot', tier: 'outer', x: -250, z: 372 },
  { lane: 'bot', tier: 'inner', x: -500, z: 330 },
];
export const STRUCTURE_LAYOUT = [
  ...TOWERS_BLUE.map((t) => ({ ...t, team: 0 })),
  ...TOWERS_BLUE.map((t) => ({ ...t, team: 1, x: -t.x })),
  { lane: 'base', tier: 'citadel', x: -BASE_X, z: 0, team: 0 },
  { lane: 'base', tier: 'citadel', x: BASE_X, z: 0, team: 1 },
];

export const PORT_LAYOUT = [
  { id: 'north', x: 0, z: -200 },
  { id: 'south', x: 0, z: 200 },
];

export function spawnPoint(team, idx = 0) {
  const sx = team === 0 ? -SPAWN_X : SPAWN_X;
  const off = (idx - 2) * 22;
  return { x: sx, z: off, yaw: team === 0 ? Math.PI / 2 : -Math.PI / 2 };
}
export function fountain(team) { return { x: team === 0 ? -SPAWN_X : SPAWN_X, z: 0, r: 85 }; }

// -------------------------------------------------------------------------
// Obstacles used for collision + nav (islands + structure islets + ports)
export function buildObstacles() {
  const obs = ISLANDS.map((i) => ({ x: i.x, z: i.z, r: i.r, natural: true })); // natural islands draw their own surf ribbon
  for (const s of STRUCTURE_LAYOUT) obs.push({ x: s.x, z: s.z, r: s.tier === 'citadel' ? 30 : s.tier === 'inner' ? 14 : 12.5 });
  for (const p of PORT_LAYOUT) obs.push({ x: p.x, z: p.z, r: 17 });
  return obs;
}

/** Segment (ax,az)->(bx,bz) intersects any obstacle inflated by pad? */
export function segmentBlocked(obs, ax, az, bx, bz, pad) {
  const dx = bx - ax, dz = bz - az;
  const L2 = dx * dx + dz * dz || 1e-6;
  for (const o of obs) {
    let t = ((o.x - ax) * dx + (o.z - az) * dz) / L2;
    t = t < 0 ? 0 : t > 1 ? 1 : t;
    const px = ax + dx * t - o.x, pz = az + dz * t - o.z;
    const r = o.r + pad;
    if (px * px + pz * pz < r * r) return true;
  }
  return false;
}

// -------------------------------------------------------------------------
// A* navigation grid
export class NavGrid {
  constructor(obs, cell = 8, pad = 9) {
    this.obs = obs; this.cell = cell; this.pad = pad;
    this.w = Math.ceil((BOUNDS.x * 2) / cell);
    this.h = Math.ceil((BOUNDS.z * 2) / cell);
    this.blocked = new Uint8Array(this.w * this.h);
    for (let j = 0; j < this.h; j++) for (let i = 0; i < this.w; i++) {
      const x = -BOUNDS.x + (i + 0.5) * cell, z = -BOUNDS.z + (j + 0.5) * cell;
      for (const o of obs) {
        const r = o.r + pad;
        if ((x - o.x) ** 2 + (z - o.z) ** 2 < r * r) { this.blocked[j * this.w + i] = 1; break; }
      }
    }
    this.g = new Float32Array(this.w * this.h);
    this.f = new Float32Array(this.w * this.h);
    this.from = new Int32Array(this.w * this.h);
    this.stamp = new Uint32Array(this.w * this.h);
    this.closed = new Uint32Array(this.w * this.h);
    this.run = 0;
  }
  toCell(x, z) {
    const i = Math.min(this.w - 1, Math.max(0, Math.floor((x + BOUNDS.x) / this.cell)));
    const j = Math.min(this.h - 1, Math.max(0, Math.floor((z + BOUNDS.z) / this.cell)));
    return j * this.w + i;
  }
  center(c) { return { x: -BOUNDS.x + ((c % this.w) + 0.5) * this.cell, z: -BOUNDS.z + (Math.floor(c / this.w) + 0.5) * this.cell }; }
  nearestFree(c) {
    if (!this.blocked[c]) return c;
    const ci = c % this.w, cj = Math.floor(c / this.w);
    for (let r = 1; r < 30; r++) for (let dj = -r; dj <= r; dj++) for (let di = -r; di <= r; di++) {
      if (Math.max(Math.abs(di), Math.abs(dj)) !== r) continue;
      const i = ci + di, j = cj + dj;
      if (i < 0 || j < 0 || i >= this.w || j >= this.h) continue;
      const k = j * this.w + i;
      if (!this.blocked[k]) return k;
    }
    return c;
  }

  /** Returns array of {x,z} waypoints (excluding start), smoothed. */
  findPath(sx, sz, tx, tz) {
    if (!segmentBlocked(this.obs, sx, sz, tx, tz, this.pad - 2)) return [{ x: tx, z: tz }];
    const start = this.nearestFree(this.toCell(sx, sz));
    const goal = this.nearestFree(this.toCell(tx, tz));
    const run = ++this.run;
    const W = this.w;
    const gi = goal % W, gj = Math.floor(goal / W);
    const heap = [start];
    this.stamp[start] = run; this.g[start] = 0; this.f[start] = 0; this.from[start] = -1;
    const push = (k) => { heap.push(k); let i = heap.length - 1; while (i > 0) { const p = (i - 1) >> 1; if (this.f[heap[p]] <= this.f[heap[i]]) break; [heap[p], heap[i]] = [heap[i], heap[p]]; i = p; } };
    const pop = () => { const top = heap[0]; const last = heap.pop(); if (heap.length) { heap[0] = last; let i = 0; for (;;) { const l = i * 2 + 1, r = l + 1; let m = i; if (l < heap.length && this.f[heap[l]] < this.f[heap[m]]) m = l; if (r < heap.length && this.f[heap[r]] < this.f[heap[m]]) m = r; if (m === i) break; [heap[m], heap[i]] = [heap[i], heap[m]]; i = m; } } return top; };
    let found = false, iter = 0;
    while (heap.length && iter++ < 40000) {
      const c = pop();
      if (this.closed[c] === run) continue;
      this.closed[c] = run;
      if (c === goal) { found = true; break; }
      const ci = c % W, cj = (c - ci) / W;
      for (let dj = -1; dj <= 1; dj++) for (let di = -1; di <= 1; di++) {
        if (!di && !dj) continue;
        const i = ci + di, j = cj + dj;
        if (i < 0 || j < 0 || i >= W || j >= this.h) continue;
        const k = j * W + i;
        if (this.blocked[k] || this.closed[k] === run) continue;
        if (di && dj && (this.blocked[cj * W + i] || this.blocked[j * W + ci])) continue;
        const ng = this.g[c] + (di && dj ? 1.4142 : 1);
        if (this.stamp[k] !== run || ng < this.g[k]) {
          this.stamp[k] = run; this.g[k] = ng; this.from[k] = c;
          const hx = Math.abs(i - gi), hz = Math.abs(j - gj);
          this.f[k] = ng + (hx + hz) + (1.4142 - 2) * Math.min(hx, hz);
          push(k);
        }
      }
    }
    if (!found) return [{ x: tx, z: tz }];
    const cells = [];
    for (let c = goal; c !== -1; c = this.from[c]) cells.push(c);
    cells.reverse();
    const pts = cells.map((c) => this.center(c));
    // the last waypoint is the click itself, unless that is inside an island: then stop at the nearest water (a goal inside an obstacle was never reached)
    pts[pts.length - 1] = segmentBlocked(this.obs, tx, tz, tx, tz, this.pad - 3) ? pts[pts.length - 1] : { x: tx, z: tz };
    // string-pull smoothing
    const out = [];
    let ax = sx, az = sz, i = 0;
    while (i < pts.length) {
      let j = pts.length - 1;
      while (j > i && segmentBlocked(this.obs, ax, az, pts[j].x, pts[j].z, this.pad - 3)) j--;
      out.push(pts[j]);
      ax = pts[j].x; az = pts[j].z; i = j + 1;
    }
    return out;
  }
}
