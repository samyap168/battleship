// Rigging and modelled detail for the sail-age frigate: ratlines, shrouds with deadeyes and chainplates,
// stays with a slight sag, blocks, gammoning, figurehead, stern gallery, deck guns with tackle, anchors,
// longboat on its booms, pinrails, bell, wheel and binnacles, flag halyards.
//
// Everything goes through the Parts helper (`P`, merged per material by the caller), so it adds no draw calls
// and the geometry stays static (instancing/clone safe). Fully deterministic: no RNG at all.
// Units are metres in the ship frame (+Z bow, +Y up, starboard -X). Hero frigate only (the creep sail ships skip it).
import * as THREE from 'three';

const V3 = THREE.Vector3;
const TAU = Math.PI * 2;
const lerp = (a, b, t) => a + (b - a) * t;

const COL = {
  tar: 0x1d1813, tarGrey: 0x2c251e, hemp: 0x8f7d5e, hempDark: 0x6b5a42, iron: 0x1c1d20, ironLight: 0x34363b,
  gilt: 0xf0cf86, giltDark: 0xb88a3c, wood: 0x5a4030, woodDark: 0x3a2a1c, woodPale: 0xb89a70, deckWood: 0x6a4a34,
  white: 0xe8e2d2, red: 0x8c2a22,
};

// ---------------------------------------------------------------------------
// Line / spar batcher: thin faceted prisms merged into one geometry per colour.
// ---------------------------------------------------------------------------
const _a = new V3(), _b = new V3(), _d = new V3(), _u = new V3(), _v = new V3(), _h = new V3();
export class Lines {
  constructor(sides = 3, uvScale = 1, phase = 0.6) { this.sides = sides; this.uvScale = uvScale; this.phase = phase; this.pos = []; this.nor = []; this.uv = []; this.count = 0; }
  seg(a, b, r0, r1 = r0) {
    _a.set(a[0], a[1], a[2]); _b.set(b[0], b[1], b[2]);
    _d.subVectors(_b, _a);
    const len = _d.length();
    if (len < 1e-5) return this;
    _d.divideScalar(len);
    _h.set(0, 1, 0); if (Math.abs(_d.y) > 0.9) _h.set(1, 0, 0);
    _u.crossVectors(_d, _h).normalize();
    _v.crossVectors(_d, _u);
    const n = this.sides, ring = [];
    for (let i = 0; i <= n; i++) {
      const th = (i / n) * TAU + this.phase;
      ring.push([_u.x * Math.cos(th) + _v.x * Math.sin(th), _u.y * Math.cos(th) + _v.y * Math.sin(th), _u.z * Math.cos(th) + _v.z * Math.sin(th)]);
    }
    const push = (p, nn, u, v) => { this.pos.push(p[0], p[1], p[2]); this.nor.push(nn[0], nn[1], nn[2]); this.uv.push(u, v); };
    const A = (r) => [_a.x + r[0] * r0, _a.y + r[1] * r0, _a.z + r[2] * r0];
    const B = (r) => [_b.x + r[0] * r1, _b.y + r[1] * r1, _b.z + r[2] * r1];
    const vl = len * this.uvScale;
    for (let i = 0; i < n; i++) {
      let ri = ring[i], rj = ring[i + 1], ni = ri, nj = rj;
      const ui = i / n, uj = (i + 1) / n;
      if (n === 2) { // flat ribbon: one face normal per side (the ring directions lie in the ribbon plane)
        const f = new V3().crossVectors(_d, new V3(ri[0], ri[1], ri[2])).multiplyScalar(i === 0 ? -1 : 1);
        ni = nj = [f.x, f.y, f.z];
      }
      push(A(ri), ni, ui, 0); push(A(rj), nj, uj, 0); push(B(rj), nj, uj, vl);
      push(A(ri), ni, ui, 0); push(B(rj), nj, uj, vl); push(B(ri), ni, ui, vl);
    }
    this.count += n * 2;
    return this;
  }
  /** Hanging line: parabolic sag (metres, downward) between two points. */
  sag(a, b, r, amt, n = 4, r1 = r) {
    let p = a;
    for (let i = 1; i <= n; i++) {
      const t = i / n;
      const q = [lerp(a[0], b[0], t), lerp(a[1], b[1], t) - 4 * amt * t * (1 - t), lerp(a[2], b[2], t)];
      this.seg(p, q, lerp(r, r1, (i - 1) / n), lerp(r, r1, t));
      p = q;
    }
    return this;
  }
  geo() {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(this.pos, 3));
    g.setAttribute('normal', new THREE.Float32BufferAttribute(this.nor, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(this.uv, 2));
    return g;
  }
  flush(P, mat, color) { if (this.pos.length) P.add(mat, this.geo(), color); this.pos = []; this.nor = []; this.uv = []; this.count = 0; }
}

const pt = (x, y, z) => [x, y, z];
// Axis-aligned cylinder along X (rz = -PI/2 puts the +Y end at +X).
function cylX(P, mat, rEnd, rBase, len, x, y, z, color, dir, seg = 8) {
  P.cyl(mat, rEnd, rBase, len, x, y, z, color, seg, 0, 0, dir >= 0 ? -Math.PI / 2 : Math.PI / 2);
}

// ---------------------------------------------------------------------------
// Standing rigging: channels, deadeyes, chainplates, shrouds, ratlines, stays, lifts, braces, tops
// ---------------------------------------------------------------------------
export function standingRigging(P, env) {
  const { hull, tops, qTop } = env;
  const tarT = new Lines(3, 0.5), tar = new Lines(3, 0.5), hemp = new Lines(3, 0.5), rungs = new Lines(2, 1, Math.PI / 4), iron = new Lines(4, 0.5), ring = new Lines(6, 1), pale = new Lines(3, 1);
  const skinX = (z, y) => hull.sideAt(z, y, 1).p.x;
  const sides = [-1, 1];
  tops.forEach((t, mi) => {
    const mizzen = mi === tops.length - 1 && tops.length === 3;
    const zc = t.z + (mizzen ? 0.12 : -0.1);
    const spread = mizzen ? [-0.34, -0.11, 0.11, 0.34] : [-0.45, -0.15, 0.15, 0.45];
    const dk = hull.deckAt(zc);
    const chY = dk.top - 0.34;
    const sx = skinX(zc, chY);
    const yTop = t.base + t.H * 0.56 + 0.06;
    const span = [zc + spread[0] - 0.12, zc + spread[3] + 0.12];
    for (const side of sides) {
      // channel plank, with a rubbing edge and knees
      P.box('wood', 0.42, 0.06, span[1] - span[0], side * (sx + 0.19), chY, (span[0] + span[1]) / 2, COL.woodDark);
      P.box('wood', 0.05, 0.1, span[1] - span[0], side * (sx + 0.4), chY + 0.03, (span[0] + span[1]) / 2, COL.wood);
      for (const kz of [span[0] + 0.12, span[1] - 0.12]) iron.seg(pt(side * (sx + 0.34), chY - 0.04, kz), pt(side * (sx + 0.02), chY - 0.34, kz), 0.022);
      spread.forEach((dz, i) => {
        const z = zc + dz;
        const sxz = skinX(z, chY);
        const ex = side * (sxz + 0.3);
        const lowY = chY + 0.04, upY = chY + 0.4;
        // lower deadeye on the channel edge + chainplate down the topsides, upper deadeye in the shroud
        P.box('wood', 0.11, 0.06, 0.09, side * (sxz + 0.34), lowY, z, COL.woodDark);
        P.box('wood', 0.11, 0.06, 0.09, ex, upY, z, COL.woodDark);
        iron.seg(pt(side * (sxz + 0.34), lowY - 0.03, z), pt(side * (sxz + 0.03), chY - 0.05, z), 0.016);               // bolt under the channel
        iron.seg(pt(side * (sxz + 0.03), chY - 0.05, z), pt(side * (skinX(z, chY - 0.5) + 0.03), chY - 0.5, z), 0.016);  // chainplate flush on the topsides
        // lanyard zig-zag between the deadeyes
        hemp.seg(pt(ex - side * 0.02, upY - 0.03, z - 0.025), pt(side * (sxz + 0.32), lowY + 0.03, z + 0.025), 0.008);
        // the shroud itself (tarred, slight catenary) up to the top
        const tz = t.z - 0.05 + dz * 0.6;
        tarT.sag(pt(ex, upY + 0.04, z), pt(side * 0.4, yTop, tz), 0.026, 0.045, 3);
      });
      // ratlines: rungs every ~0.35 m between the shrouds, lying on the sagged lines
      const yb = chY + 0.44, len = yTop - yb;
      const posAt = (i, tt) => {
        const dz = spread[i];
        const z = zc + dz, tz = t.z - 0.05 + dz * 0.6;
        const sxz = skinX(z, chY);
        return [lerp(side * (sxz + 0.3), side * 0.4, tt), lerp(chY + 0.44, yTop, tt) - 4 * 0.045 * tt * (1 - tt), lerp(z, tz, tt)];
      };
      const t0 = (dk.top + 0.55 - yb) / len, dt = 0.35 / len;
      for (let tt = t0; tt < 0.93; tt += dt) {
        for (let i = 0; i < 3; i++) rungs.seg(posAt(i, tt), posAt(i + 1, tt), 0.0135);
      }
      // topmast shrouds + short ratlines from the top platform to the crosstrees
      const yU = t.base + t.H * 0.84;
      for (const sgn of [-1, 1]) {
        const a = pt(side * 0.38, yTop + 0.02, t.z - 0.05 + sgn * 0.2), b = pt(side * 0.1, yU, t.z - 0.03 + sgn * 0.04);
        tar.seg(a, b, 0.016);
      }
      const ul = yU - yTop;
      for (let tt = 0.18; tt < 0.92; tt += 0.3 / ul) {
        const mk = (sgn) => [lerp(side * 0.38, side * 0.1, tt), lerp(yTop + 0.02, yU, tt), lerp(t.z - 0.05 + sgn * 0.2, t.z - 0.03 + sgn * 0.04, tt)];
        rungs.seg(mk(-1), mk(1), 0.012);
      }
      // backstays from the topmast head to the channel (mizzen: to the quarterdeck bulwark)
      for (const bi of mizzen ? [0] : [0, 1]) {
        const zEnd = mizzen ? t.z - 1.55 : zc - 0.95 - bi * 0.3;
        const yEnd = mizzen ? qTop - 0.02 : chY + 0.4;
        const xEnd = mizzen ? side * (hull.deckAt(zEnd).half + 0.06) : side * (skinX(zEnd, chY) + 0.3);
        tarT.sag(pt(side * 0.07, t.base + t.H * (0.9 - bi * 0.06), t.z - 0.08 - bi * 0.03), pt(xEnd, yEnd, zEnd), 0.02, 0.08, 4);
      }
    }
    // top: trestletrees, cap, rail and posts, mast hoops, partners
    const pz = t.z - 0.05;
    for (const side of sides) P.box('wood', 0.07, 0.07, 0.8, side * 0.26, t.base + t.H * 0.56 - 0.06, pz, COL.woodDark);
    P.box('wood', 0.5, 0.06, 0.1, 0, t.base + t.H * 0.56 - 0.06, pz + 0.1, COL.woodDark);
    for (const [sxp, szp] of [[-0.44, -0.33], [0.44, -0.33], [-0.44, 0.23], [0.44, 0.23], [-0.44, -0.05], [0.44, -0.05]]) iron.seg(pt(sxp, yTop, pz + szp), pt(sxp, yTop + 0.3, pz + szp), 0.016);
    const rl = (x0, z0, x1, z1) => tar.seg(pt(x0, yTop + 0.3, pz + z0), pt(x1, yTop + 0.3, pz + z1), 0.014);
    rl(-0.44, -0.33, 0.44, -0.33); rl(-0.44, 0.23, 0.44, 0.23); rl(-0.44, -0.33, -0.44, 0.23); rl(0.44, -0.33, 0.44, 0.23);
    P.box('wood', 0.28, 0.09, 0.4, 0, t.base + t.H * 0.585, t.z, COL.woodDark); // cap
    P.box('wood', 0.2, 0.07, 0.22, 0, t.base + t.H * 0.99, t.z, COL.woodDark); // topmast cap
    P.sphere('wood', 0.07, 0, t.base + t.H + 0.07, t.z, COL.woodPale, 6, 4); // truck
    for (const f of [0.08, 0.2, 0.32, 0.44]) { const y = t.base + t.H * f, r = 0.17 - 0.07 * (f / 0.58) + 0.015; ring.seg(pt(0, y - 0.025, t.z), pt(0, y + 0.025, t.z), r); }
    for (const f of [0.66, 0.74]) { const y = t.base + t.H * f; ring.seg(pt(0, y - 0.02, t.z), pt(0, y + 0.02, t.z), 0.1 - 0.05 * ((f - 0.55) / 0.45) + 0.012); }
    ring.seg(pt(0, t.base - 0.02, t.z), pt(0, t.base + 0.32, t.z), 0.215, 0.185); // mast coat at the deck
    // lifts and braces: yardarm blocks, lifts up to the tops, braces aft to the bulwark
    t.ys.forEach((ys, yi) => {
      const w = t.ws[yi] / 2;
      const top = yi === 0 ? yTop + 0.02 : yi === 1 ? yU0(t) : t.base + t.H * 0.97;
      for (const side of sides) {
        const end = pt(side * w, ys - 0.03, t.z + 0.12);
        P.box('wood', 0.07, 0.12, 0.05, side * w, ys - 0.09, t.z + 0.12, COL.woodPale); // block at the yardarm
        tar.sag(pt(side * w, ys, t.z + 0.1), pt(side * 0.12, top, t.z + 0.02), 0.011, 0.04, 2);
        if (yi < 2) {
          const zE = Math.max(t.z - 2.9 + yi * 0.5, -6.6);
          const dE = hull.deckAt(zE);
          const yE = zE < -3.8 ? qTop + 0.02 : dE.top + 0.02;
          tar.sag(pt(side * (w + 0.05), ys - 0.03, t.z + 0.12), pt(side * (dE.half + 0.05), yE, zE), 0.011, 0.14, 5);
        }
        void end;
      }
    });
    // running rigging falling to the fife rail behind the mast
    const rz = t.z - 0.42, ry = t.base + 0.62;
    P.box('wood', 1.14, 0.06, 0.08, 0, ry, rz, COL.wood);
    for (const side of sides) iron.seg(pt(side * 0.52, t.base - 0.02, rz), pt(side * 0.52, ry, rz), 0.03);
    for (let i = 0; i < 6; i++) {
      const x = -0.45 + i * 0.18;
      pale.seg(pt(x, ry - 0.06, rz), pt(x, ry + 0.17, rz), 0.016);
    }
    for (let yi = 0; yi < 3; yi++) for (const side of sides) {
      const pin = [side * (0.08 + yi * 0.13) + (side > 0 ? 0.05 : -0.05), ry + 0.17, rz];
      hemp.sag(pt(side * 0.1, t.ys[yi] - 0.06, t.z - 0.15), pin, 0.009, 0.05, 4);
    }
    for (const sd of [-1, 1]) hemp.sag(pt(sd * 0.03, t.base + t.H * 0.985, t.z - 0.09), pt(sd * 0.1 + sd * 0.02, ry + 0.17, rz + 0.02), 0.007, 0.03, 3); // signal / pennant halyards
    // pinrails inside the bulwark with belaying pins
    for (const side of sides) {
      const dk2 = hull.deckAt(t.z);
      const px = side * (dk2.half - 0.05), py = dk2.y + 0.4;
      P.box('wood', 0.07, 0.05, 1.25, px, py, t.z - 0.1, COL.wood);
      for (let i = 0; i < 5; i++) pale.seg(pt(px, py - 0.06, t.z - 0.5 + i * 0.25), pt(px, py + 0.12, t.z - 0.5 + i * 0.25), 0.014);
    }
  });
  // fore-and-aft stays between the masts, with a slight catenary
  for (let i = 0; i < tops.length - 1; i++) {
    const f = tops[i], a = tops[i + 1];
    tarT.sag(pt(0.02, a.y - 0.2, a.z - 0.04), pt(0.02, f.base + f.H * 0.56 + 0.04, f.z - 0.06), 0.03, 0.14, 5);
    tar.sag(pt(-0.03, a.base + a.H * 0.84, a.z - 0.03), pt(-0.03, f.base + f.H * 0.84 - 0.1, f.z - 0.04), 0.02, 0.1, 4);
  }
  tarT.flush(P, 'wood', COL.tar); tar.flush(P, 'wood', COL.tarGrey); hemp.flush(P, 'wood', COL.hemp); rungs.flush(P, 'wood', COL.hemp);
  iron.flush(P, 'iron', COL.iron); ring.flush(P, 'iron', COL.ironLight); pale.flush(P, 'wood', COL.woodPale);
}
const yU0 = (t) => t.base + t.H * 0.84;

// ---------------------------------------------------------------------------
// Bow: bowsprit, jib-boom with gammoning, bobstays, martingale, carved figurehead, trailboards, cathead + anchors
// ---------------------------------------------------------------------------
export function bowDetails(P, env) {
  const { hull, bowZ, bowY, tip } = env;
  const tar = new Lines(3, 0.5), tarT = new Lines(4, 0.5), ring = new Lines(6, 1), iron = new Lines(4, 0.5), gilt = new Lines(5, 1), wood = new Lines(5, 1);
  const B0 = new V3(0, bowY - 0.25, bowZ - 1.4), B1 = new V3(tip.x, tip.y, tip.z);
  const along = (s) => B0.clone().lerp(B1, s);
  const dir = B1.clone().sub(B0).normalize();
  const rAt = (s) => lerp(0.12, 0.06, s);
  // gammoning wraps where the bowsprit leaves the knightheads, bowsprit cap and jib-boom
  for (let i = 0; i < 6; i++) { const p = along(0.34 + i * 0.035); ring.seg([p.x - dir.x * 0.018, p.y - dir.y * 0.018, p.z - dir.z * 0.018], [p.x + dir.x * 0.018, p.y + dir.y * 0.018, p.z + dir.z * 0.018], rAt(0.34 + i * 0.035) + 0.014); }
  const jb0 = along(0.86), jb1 = [tip.x, tip.y, tip.z].map((v, i) => v + [0, 0.38, 0.9][i]);
  wood.seg([jb0.x, jb0.y, jb0.z], jb1, 0.05, 0.03);
  const cap = along(0.97);
  P.box('wood', 0.2, 0.1, 0.22, cap.x, cap.y + 0.02, cap.z, COL.woodDark);
  P.box('wood', 0.08, 0.12, 0.06, tip.x, tip.y - 0.12, tip.z + 0.05, COL.woodPale); // jib sheet block
  // bowsprit shrouds / bobstays / martingale
  const stemY = 1.05, stemZ = hull.zAt(1, stemY) + 0.01;
  for (const sd of [-1, 1]) {
    const bx = hull.sideAt(5.35, hull.deckAt(5.35).top - 0.02, sd).p.x;
    tar.sag(pt(sd * 0.07, tip.y - 0.12, tip.z - 0.55), pt(bx, hull.deckAt(5.35).top, 5.35), 0.017, 0.05, 4);
    tarT.sag(pt(sd * 0.03, tip.y - 0.1, tip.z - 0.1), pt(sd * 0.03, stemY, stemZ), 0.022, 0.1, 6);
  }
  const sp = along(0.8);
  tarT.seg([sp.x, sp.y, sp.z], [0, sp.y - 0.7, sp.z + 0.12], 0.03, 0.022); // dolphin striker
  tar.seg([0, sp.y - 0.7, sp.z + 0.12], [0, tip.y - 0.1, tip.z - 0.05], 0.012);
  tar.seg([0, sp.y - 0.7, sp.z + 0.12], [0, bowY - 0.1, bowZ - 0.2], 0.012);
  // carved figurehead (gilt lion): bust on the knee of the head, with trailboards along the bow
  const fz = bowZ + 0.05, fy = bowY - 0.52;
  gilt.seg([0, fy - 0.12, fz - 0.28], [0, fy + 0.1, fz + 0.22], 0.17, 0.12);       // chest
  gilt.seg([0, fy + 0.1, fz + 0.22], [0, fy + 0.28, fz + 0.38], 0.12, 0.1);      // neck
  P.sphere('brass', 0.14, 0, fy + 0.34, fz + 0.45, COL.gilt, 8, 6, 1, 1, 1.15);  // head
  gilt.seg([0, fy + 0.3, fz + 0.52], [0, fy + 0.26, fz + 0.74], 0.07, 0.05);     // muzzle
  for (let i = 0; i < 6; i++) { // mane
    const a = (i / 6) * TAU;
    const cx = Math.cos(a) * 0.14, cy = Math.sin(a) * 0.14;
    gilt.seg([cx * 0.6, fy + 0.34 + cy * 0.6, fz + 0.4], [cx * 1.5, fy + 0.34 + cy * 1.5, fz + 0.36], 0.045, 0.01);
  }
  for (const sd of [-1, 1]) {
    gilt.seg([sd * 0.1, fy + 0.02, fz + 0.1], [sd * 0.22, fy - 0.18, fz - 0.05], 0.05, 0.04);                  // forelegs swept back
    P.box('brass', 0.03, 0.12, 0.2, sd * 0.07, fy - 0.1, fz - 0.4, COL.gilt, 0, 0, sd * 0.3);       // scroll
    for (const [ty, th, col, mat] of [[2.06, 0.2, COL.giltDark, 'wood'], [2.24, 0.045, COL.gilt, 'brass']]) {
      const p0 = hull.sideAt(5.7, ty, sd), p1 = hull.sideAt(6.6, ty, sd);
      const cx = (p0.p.x + p1.p.x) / 2 + (p0.n.x + p1.n.x) * 0.012, cz = (p0.p.z + p1.p.z) / 2;
      P.box(mat, 0.035, th, Math.hypot(p1.p.x - p0.p.x, p1.p.z - p0.p.z) + 0.06, cx, ty, cz, col, 0, Math.atan2(p1.p.x - p0.p.x, p1.p.z - p0.p.z));
    }
    // cathead with an anchor hung from it, fish tackle to the rail
    const z0 = 5.0, dk = hull.deckAt(z0);
    const hx = sd * (hull.sideAt(z0, dk.top - 0.05, 1).p.x + 0.56);
    wood.seg([sd * (dk.half - 0.25), dk.top + 0.01, z0], [hx, dk.top - 0.05, z0], 0.07, 0.065);
    P.box('wood', 0.13, 0.13, 0.12, hx, dk.top - 0.12, z0, COL.woodPale);
    const ax = hx, ay = dk.top - 0.2;
    iron.seg(pt(ax, ay, z0), pt(ax - sd * 0.02, ay - 1.05, z0), 0.032, 0.04);        // shank
    iron.seg(pt(ax - sd * 0.1, ay - 0.1, z0), pt(ax + sd * 0.42, ay - 0.1, z0), 0.026); // stock
    const cy2 = ay - 1.05;
    for (const e of [-1, 1]) {
      iron.seg(pt(ax - sd * 0.02, cy2, z0), pt(ax - sd * 0.02, cy2 + 0.08, z0 + e * 0.26), 0.032, 0.026);
      iron.seg(pt(ax - sd * 0.02, cy2 + 0.08, z0 + e * 0.26), pt(ax - sd * 0.02, cy2 + 0.24, z0 + e * 0.4), 0.026, 0.022);
      P.box('iron', 0.025, 0.17, 0.13, ax - sd * 0.02, cy2 + 0.27, z0 + e * 0.43, COL.ironLight, e * 0.35);
    }
    P.sphere('iron', 0.05, ax - sd * 0.02, cy2 - 0.02, z0, COL.ironLight, 6, 4);
    tar.sag(pt(ax, ay + 0.02, z0), pt(sd * (dk.half - 0.05), dk.top + 0.04, z0 - 0.5), 0.012, 0.05, 3);
  }
  tarT.flush(P, 'wood', COL.tar); tar.flush(P, 'wood', COL.tarGrey);
  ring.flush(P, 'iron', COL.ironLight); iron.flush(P, 'iron', COL.iron);
  gilt.flush(P, 'brass', COL.gilt); wood.flush(P, 'wood', COL.wood);
}

// ---------------------------------------------------------------------------
// Stern: framed windows, balustraded gallery, lower lights, quarter galleries, lantern cages, ensign halyard
// ---------------------------------------------------------------------------
export function sternDetails(P, env) {
  const { hull, qTop, qz0, qh, sw } = env;
  const wy = qTop - qh * 0.45, wh = qh * 0.35;
  const zAt = (y) => hull.zAt(0, y);
  const wz = zAt(wy) - 0.05;
  const tilt = -Math.atan(hull.spec.overhang);
  const n = 5;
  P.box('brass', sw * 1.06, 0.045, 0.06, 0, wy + wh / 2 + 0.05, wz - 0.045, COL.gilt, tilt);   // gilt lintel
  P.box('wood', sw * 1.06, 0.05, 0.08, 0, wy - wh / 2 - 0.045, wz - 0.045, COL.woodDark, tilt);
  P.box('brass', sw * 1.16, 0.06, 0.2, 0, qTop - 0.01, wz - 0.07, COL.gilt, tilt);              // cornice
  for (let i = 0; i <= n; i++) {                                                                   // carved pilasters
    const x = (i - n / 2) * (sw / n);
    P.box('wood', 0.045, wh + 0.1, 0.07, x, wy, wz - 0.045, COL.woodPale, tilt);
    P.sphere('brass', 0.032, x, wy + wh / 2 + 0.09, wz - 0.07, COL.gilt, 5, 4);
  }
  // balustrade on the stern gallery shelf
  const sy = qTop - qh * 0.8, gz = wz - 0.2;
  const bal = new Lines(3, 1);
  for (let i = 0; i <= 14; i++) { const x = (i / 14 - 0.5) * sw * 1.02; bal.seg(pt(x, sy + 0.04, gz - 0.16), pt(x, sy + 0.18, gz - 0.16), 0.014); }
  bal.seg(pt(-sw * 0.51, sy + 0.18, gz - 0.16), pt(sw * 0.51, sy + 0.18, gz - 0.16), 0.02);
  bal.seg(pt(-sw * 0.51, sy + 0.18, gz - 0.16), pt(-sw * 0.51, sy + 0.18, gz + 0.18), 0.02);
  bal.seg(pt(sw * 0.51, sy + 0.18, gz - 0.16), pt(sw * 0.51, sy + 0.18, gz + 0.18), 0.02);
  bal.flush(P, 'wood', COL.woodPale);
  // lower tier of small lights on the transom with gilt frames
  const ly = sy - 0.42, lz0 = qz0 - 0.01;   // the castle's aft wall (z = qz0) is what shows below the gallery
  for (const x of [-0.62, -0.2, 0.2, 0.62]) {
    P.box('brass', 0.27, 0.27, 0.04, x, ly, lz0 - 0.015, COL.giltDark);
    P.box('iron', 0.19, 0.19, 0.05, x, ly, lz0 - 0.025, COL.iron);
  }
  P.box('brass', sw * 0.96, 0.05, 0.07, 0, ly - 0.2, lz0 - 0.03, COL.gilt);                         // counter rail
  P.box('wood', sw * 1.04, wh + 0.12, qz0 - (wz + 0.03), 0, wy, (qz0 + wz + 0.03) / 2, COL.wood);                // bay behind the stern windows
  // quarter galleries
  for (const sd of [-1, 1]) {
    const gz0 = qz0 + 0.5, h = hull.deckAt(gz0).half + 0.08;
    const cx = sd * (h + 0.1), cy = qTop - qh * 0.5;
    P.box('wood', 0.34, qh * 0.85, 1.05, cx, cy, gz0 + 0.1, COL.wood);
    P.box('wood', 0.42, 0.05, 1.18, cx, cy + qh * 0.45, gz0 + 0.1, COL.woodPale);
    P.box('wood', 0.42, 0.05, 1.18, cx, cy - qh * 0.45, gz0 + 0.1, COL.woodDark);
    for (let i = -1; i <= 1; i++) P.box('lantern', 0.03, 0.26, 0.2, sd * (h + 0.28), cy, gz0 + 0.1 + i * 0.3, 0xffffff);
    for (const dz of [-0.45, 0.65]) P.box('brass', 0.05, qh * 0.8, 0.05, sd * (h + 0.285), cy, gz0 + dz - 0.05, COL.gilt);
  }
  // lantern cages: brass ribs and base plates around the three stern lanterns
  const lz = qz0 + 0.25;
  const cage = new Lines(4, 1);
  for (const [lx, ls] of [[0, 1.25], [-sw * 0.45, 1], [sw * 0.45, 1]]) {
    const cy = qTop + 0.85 * ls;
    P.cyl('brass', 0.14 * ls, 0.12 * ls, 0.05, lx, qTop + 0.62 * ls, lz, COL.gilt, 8);
    for (const [ox, oz] of [[0.14, 0], [-0.14, 0], [0, 0.14], [0, -0.14]]) cage.seg(pt(lx + ox * ls, cy - 0.2 * ls, lz + oz * ls), pt(lx + ox * 0.5 * ls, cy + 0.2 * ls, lz + oz * 0.5 * ls), 0.008);
  }
  cage.flush(P, 'brass', COL.gilt);
  // ensign staff: gilt ball, halyard and cleat
  const sT = [0, qTop + 1.9, qz0 - 0.35], sB = [0, qTop, qz0 + 0.05];
  P.sphere('brass', 0.05, sT[0], sT[1] + 0.05, sT[2], COL.gilt, 6, 4);
  const hal = new Lines(3, 1);
  hal.sag(pt(0.05, sT[1] - 0.05, sT[2] + 0.02), pt(0.06, qTop + 0.55, qz0 + 0.0), 0.007, 0.04, 3);
  hal.sag(pt(-0.05, sT[1] - 0.05, sT[2] + 0.02), pt(-0.06, qTop + 0.55, qz0 + 0.0), 0.007, 0.04, 3);
  void sB;
  hal.flush(P, 'wood', COL.hemp);
}

// ---------------------------------------------------------------------------
// Deck: guns with carriages + tackle, longboat on booms, bell, wheel + binnacles, hatch coamings
// ---------------------------------------------------------------------------
export function deckDetails(P, env) {
  const { hull, qTop, qz1, dy, boat } = env;
  const tar = new Lines(3, 0.5), iron = new Lines(4, 0.5), pale = new Lines(3, 1), wood = new Lines(5, 1);
  // broadside guns behind ports cut in the bulwark, on truck carriages with breeching + gun tackles
  for (const z of [-2.5, 1.6]) for (const sd of [-1, 1]) {
    const d = hull.deckAt(z), y0 = dy(z), half = d.half;
    const gy = y0 + 0.3;
    const xb = sd * (half - 0.82), xm = sd * (hull.sideAt(z, gy, 1).p.x + 0.07);
    // barrel: breech swell, chase, muzzle astragal
    const mid = (xb + xm) / 2;
    cylX(P, 'iron', 0.064, 0.098, Math.abs(xm - xb), mid, gy, z, COL.iron, sd, 8);
    cylX(P, 'iron', 0.082, 0.082, 0.07, xm - sd * 0.05, gy, z, COL.ironLight, sd, 8);
    // port frame on the outside
    const sa = hull.sideAt(z, gy, sd);
    P.box('iron', 0.03, 0.3, 0.34, sa.p.x + sa.n.x * 0.02, gy, z, 0x0e0e10);
    // carriage: cheeks, axle trucks, quoin
    const cmid = sd * (half - 0.5);
    for (const e of [-1, 1]) P.box('wood', 0.78, 0.18, 0.06, cmid, y0 + 0.17, z + e * 0.12, COL.wood);
    P.box('wood', 0.5, 0.05, 0.3, cmid - sd * 0.05, y0 + 0.07, z, COL.woodDark);
    for (const xo of [-0.26, 0.28]) P.box('wood', 0.12, 0.12, 0.4, cmid + sd * xo, y0 + 0.06, z, COL.woodDark);
    P.box('wood', 0.12, 0.05, 0.12, xb + sd * 0.12, y0 + 0.24, z, COL.woodPale);
    // ring bolts, breeching and gun tackles to the bulwark
    const bx = sd * (half - 0.04);
    for (const e of [-1, 1]) {
      tar.sag(pt(xb, gy - 0.02, z + e * 0.04), pt(bx, y0 + 0.3, z + e * 0.42), 0.014, 0.06, 3);
      tar.sag(pt(cmid + sd * 0.38, y0 + 0.2, z + e * 0.14), pt(bx, y0 + 0.36, z + e * 0.55), 0.011, 0.04, 3);
      P.box('wood', 0.06, 0.07, 0.05, cmid + sd * 0.4, y0 + 0.22, z + e * 0.14, COL.woodPale);
    }
    tar.sag(pt(xb - sd * 0.06, gy - 0.05, z), pt(sd * (half - 1.25), y0 + 0.02, z), 0.012, 0.04, 3);
  }
  // longboat on its booms between the mainmast and the foremast
  const bz = 1.95, by = dy(bz) + 0.9;
  for (const x of [-0.3, 0.3]) wood.seg(pt(x, dy(bz) + 0.8, bz - 1.5), pt(x, dy(bz) + 0.8, bz + 1.45), 0.05);
  for (const bzz of [bz - 1.15, bz + 1.15]) for (const x of [-0.3, 0.3]) wood.seg(pt(x, dy(bzz) + 0.02, bzz), pt(x, dy(bzz) + 0.8, bzz), 0.045);
  boat(P, 0, by, bz, 2.9, 0x6a4a34, 0, 'wood');
  tar.seg(pt(-0.38, by + 0.4, bz - 0.5), pt(-0.28, dy(bz) + 0.82, bz - 0.5), 0.012);
  tar.seg(pt(0.38, by + 0.4, bz - 0.5), pt(0.28, dy(bz) + 0.82, bz - 0.5), 0.012);
  // bell on its frame
  const bellX = 0.62, bellZ = 4.55, bd = dy(bellZ);
  for (const e of [-1, 1]) iron.seg(pt(bellX + e * 0.16, bd, bellZ), pt(bellX + e * 0.16, bd + 0.55, bellZ), 0.025);
  iron.seg(pt(bellX - 0.17, bd + 0.55, bellZ), pt(bellX + 0.17, bd + 0.55, bellZ), 0.022);
  P.cyl('brass', 0.045, 0.13, 0.2, bellX, bd + 0.4, bellZ, COL.gilt, 10);
  P.sphere('brass', 0.03, bellX, bd + 0.29, bellZ, COL.gilt, 5, 4);
  // wheel with spokes and drum, binnacles
  const wz = qz1 - 0.45, wy = qTop + 0.42;
  P.box('wood', 0.2, 0.7, 0.16, 0, qTop + 0.35, wz - 0.12, COL.woodDark);
  P.cyl('wood', 0.07, 0.07, 0.36, 0, wy, wz - 0.02, COL.woodDark, 8, Math.PI / 2);
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * TAU, c = Math.cos(a), s = Math.sin(a);
    wood.seg(pt(0, wy, wz + 0.1), pt(c * 0.3, wy + s * 0.3, wz + 0.1), 0.012);
    wood.seg(pt(c * 0.28, wy + s * 0.28, wz + 0.1), pt(c * 0.4, wy + s * 0.4, wz + 0.1), 0.017, 0.022);
  }
  P.add('wood', new THREE.TorusGeometry(0.29, 0.03, 4, 12), COL.woodDark, new THREE.Matrix4().makeTranslation(0, wy, wz + 0.1));
  for (const sd of [-1, 1]) {
    P.box('wood', 0.2, 0.34, 0.2, sd * 0.52, qTop + 0.17, qz1 - 0.2, COL.wood);
    P.sphere('brass', 0.09, sd * 0.52, qTop + 0.4, qz1 - 0.2, COL.gilt, 7, 4, 1, 0.8, 1);
  }
  tar.flush(P, 'wood', COL.tarGrey); iron.flush(P, 'iron', COL.iron); pale.flush(P, 'wood', COL.woodPale); wood.flush(P, 'wood', COL.woodDark);
}
