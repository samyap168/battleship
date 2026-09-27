import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { applyCloudShadow } from './cloudShadow.js';
import { applyFoliage, applyTerrainDetail } from './foliage.js';
import { WAVES_GLSL, WAVE_UNIFORMS } from './waves.js';

// Procedural archipelago: sculpted islands with vertex-coloured strata,
// instanced forests, pagoda ruins, and misty karst peaks on the horizon.

function mulberry(seed) {
  let a = seed * 2654435761 >>> 0;
  return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}
function hash2(x, z, s) { const v = Math.sin(x * 127.1 + z * 311.7 + s * 74.7) * 43758.5453; return v - Math.floor(v); }
function vnoise(x, z, s) {
  const xi = Math.floor(x), zi = Math.floor(z), xf = x - xi, zf = z - zi;
  const u = xf * xf * (3 - 2 * xf), v = zf * zf * (3 - 2 * zf);
  const a = hash2(xi, zi, s), b = hash2(xi + 1, zi, s), c = hash2(xi, zi + 1, s), d = hash2(xi + 1, zi + 1, s);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
function fbm(x, z, s, oct = 5) { let v = 0, a = 0.5; for (let i = 0; i < oct; i++) { v += a * vnoise(x, z, s + i * 17); x *= 2.03; z *= 2.03; a *= 0.5; } return v; }

const C = {
  wetSand: new THREE.Color(0.2, 0.17, 0.12), sand: new THREE.Color(0.48, 0.4, 0.27),
  grass: new THREE.Color(0.12, 0.22, 0.06), jungle: new THREE.Color(0.05, 0.13, 0.035),
  rock: new THREE.Color(0.34, 0.32, 0.3), rockDark: new THREE.Color(0.18, 0.17, 0.17), moss: new THREE.Color(0.2, 0.28, 0.14),
};

const PROFILES = {
  jungle: { h: 7, cliff: 0.5, green: 1 },
  rock: { h: 4, cliff: 0.8, green: 0.3 },
  edge: { h: 8, cliff: 0.7, green: 0.7 },
  harbor: { h: 7, cliff: 0.6, green: 0.6 },
  islet: { h: 6, cliff: 0.7, green: 0.3 },
};

/** Island mesh with waterline radius R. Returns {mesh, heightAt(x,z)} */
export function buildIsland(R, kind = 'jungle', seed = 1) {
  const P = PROFILES[kind] || PROFILES.jungle;
  const rings = Math.max(14, Math.round(R / 2.2)), seg = Math.max(40, Math.round(R * 2));
  const outer = R * 1.25;
  const pos = [], col = [], idx = [];
  const H = P.h * (0.8 + 0.4 * hash2(seed, 1, 3)) * Math.min(1.4, 0.6 + R / 60);
  // Lobed, irregular coastline (bays, headlands) instead of a circle.
  const coast = (a) => {
    const n = fbm(Math.cos(a) * 1.6 + seed * 1.7, Math.sin(a) * 1.6 - seed, seed, 4) - 0.5;
    const lobes = 0.1 * Math.sin(3 * a + seed * 2.3) + 0.07 * Math.sin(5 * a - seed) + 0.05 * Math.sin(2 * a + seed * 0.7);
    return R * THREE.MathUtils.clamp(1 + n * 0.5 + lobes, 0.74, 1.1);
  };
  const hAt = (x, z) => {
    const a = Math.atan2(z, x);
    const r = Math.hypot(x, z) / coast(a);
    const n = fbm(x / 14 + seed * 3, z / 14, seed);
    const ridge = 1 - Math.abs(fbm(x / 22, z / 22 + seed, seed + 5) * 2 - 1);
    let dome = Math.max(0, 1 - r * r);
    dome = Math.pow(dome, 1 - P.cliff * 0.6);
    let h = H * dome * (0.6 + 0.6 * n + 0.35 * ridge);
    // beach shelf
    h += (1 - THREE.MathUtils.smoothstep(r, 0.9, 1.02)) * 1.1 - 4.5 * THREE.MathUtils.smoothstep(r, 0.97, 1.06);
    return h;
  };
  pos.push(0, hAt(0, 0), 0);
  for (let i = 1; i <= rings; i++) {
    const rr = (i / rings) * outer;
    for (let j = 0; j < seg; j++) {
      const a = (j / seg) * Math.PI * 2 + (i % 2) * (Math.PI / seg);
      const x = Math.cos(a) * rr, z = Math.sin(a) * rr;
      pos.push(x, hAt(x, z), z);
    }
  }
  for (let j = 0; j < seg; j++) idx.push(0, 1 + ((j + 1) % seg), 1 + j);
  for (let i = 1; i < rings; i++) {
    const a0 = 1 + (i - 1) * seg, b0 = 1 + i * seg;
    for (let j = 0; j < seg; j++) {
      const j1 = (j + 1) % seg;
      const a = a0 + j, b = a0 + j1, c = b0 + j, d = b0 + j1;
      if (i % 2) { idx.push(a, b, d, a, d, c); } else { idx.push(a, b, c, b, d, c); }
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  const nrm = g.attributes.normal;
  const tmp = new THREE.Color();
  for (let i = 0; i < pos.length / 3; i++) {
    const x = pos[i * 3], y = pos[i * 3 + 1], z = pos[i * 3 + 2];
    const slope = 1 - nrm.getY(i);
    const n = fbm(x / 6, z / 6, seed + 9, 3);
    if (y < -0.6) tmp.setRGB(0.05, 0.09, 0.09); // submerged shelf fades into the sea
    else if (y < 0.4) tmp.copy(C.wetSand);
    else if (y < 1.4 + n * 1.2 && slope < 0.35) tmp.copy(C.sand);
    else if (y < 2.5 && slope >= 0.35) tmp.copy(C.rockDark).lerp(C.moss, 0.3); // steep wave-cut banks: dark rock, not sand
    else {
      const green = P.green * (1 - THREE.MathUtils.smoothstep(slope, 0.25, 0.55));
      tmp.copy(C.rock).lerp(C.rockDark, n);
      const g2 = C.grass.clone().lerp(C.jungle, THREE.MathUtils.smoothstep(y / H, 0.1, 0.6));
      tmp.lerp(g2, green * (0.75 + n * 0.25));
      if (slope > 0.5) tmp.lerp(C.moss, 0.15);
    }
    tmp.multiplyScalar(0.85 + n * 0.3);
    col.push(tmp.r, tmp.g, tmp.b);
  }
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  return { geometry: g, heightAt: hAt, H, coast };
}

// ---------------------------------------------------------------------------
function treeGeometries() {
  const trunk = new THREE.CylinderGeometry(0.35, 0.55, 5, 6);
  trunk.translate(0, 2.5, 0);
  const crowns = [];
  // Canopy = a small core plus flattened leaf-cluster pads on two tiers (the
  // cloud-pruned look of hand-painted broadleaf trees): the pads, not a sphere,
  // define the silhouette, so it reads as foliage clumps at any distance.
  for (let i = 0; i < 2; i++) {
    const c = new THREE.IcosahedronGeometry(1.0 - i * 0.25, 0); // core is buried inside the pads: low poly
    c.scale(1, 0.75, 1);
    c.translate(i * 0.3, 5.4 + i * 1.3, 0);
    crowns.push(c);
  }
  const PADS = [ // [angle, ring radius, height, size, detail]
    [0.3, 1.5, 4.7, 1.6, 1], [1.5, 1.7, 5.0, 1.45, 0], [2.6, 1.45, 4.6, 1.7, 0], [3.8, 1.75, 5.1, 1.4, 0], [5.0, 1.5, 4.8, 1.55, 1],
    [0.9, 0.95, 6.2, 1.35, 0], [2.9, 1.0, 6.4, 1.25, 0], [4.7, 0.9, 6.1, 1.3, 0], [0, 0, 7.1, 1.05, 1],
  ];
  for (const [a, r, y, sz, det] of PADS) {
    const c = new THREE.IcosahedronGeometry(sz, det);
    c.scale(1, 0.42, 1);                       // flat pads, not balls
    c.rotateZ((hash2(a, y, 3) - 0.5) * 0.5);   // tilted clusters
    c.rotateY(a + (hash2(y, a, 9) - 0.5) * 0.5);
    c.translate(Math.cos(a) * r, y, Math.sin(a) * r);
    crowns.push(c);
  }
  const crown = mergeGeometries(crowns.map((g) => g.index ? g.toNonIndexed() : g));
  // jitter crown vertices for organic look
  const p = crown.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const s = 1 + (hash2(p.getX(i) * 3, p.getZ(i) * 3, p.getY(i)) - 0.5) * 0.35;
    p.setXYZ(i, p.getX(i) * s, p.getY(i), p.getZ(i) * s);
  }
  crown.computeVertexNormals();
  // baked ambient occlusion: dark, cool underside -> warm sunlit crown
  crown.computeBoundingBox();
  const bb = crown.boundingBox, col = new Float32Array(p.count * 3);
  for (let i = 0; i < p.count; i++) {
    const h = (p.getY(i) - bb.min.y) / (bb.max.y - bb.min.y);
    const up = crown.attributes.normal.getY(i);
    const ao = 0.35 + 0.65 * Math.pow(h, 0.8) + Math.max(0, up) * 0.25;
    col[i * 3] = ao * 1.02; col[i * 3 + 1] = ao; col[i * 3 + 2] = ao * 0.86;
  }
  crown.setAttribute('color', new THREE.BufferAttribute(col, 3));
  return { trunk, crown };
}

function aoColors(geo, low = 0.35) {
  geo.computeBoundingBox();
  const p = geo.attributes.position, bb = geo.boundingBox, col = new Float32Array(p.count * 3);
  for (let i = 0; i < p.count; i++) {
    const h = (p.getY(i) - bb.min.y) / Math.max(1e-3, bb.max.y - bb.min.y);
    const ao = low + (1 - low) * Math.pow(h, 0.8);
    col[i * 3] = ao * 1.02; col[i * 3 + 1] = ao; col[i * 3 + 2] = ao * 0.86;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  return geo;
}

/** Conifer: three stacked jittered cones. */
function coniferGeometries() {
  const parts = [];
  for (let i = 0; i < 3; i++) {
    const c = new THREE.ConeGeometry(2.1 - i * 0.55, 3.2 - i * 0.4, 7, 2);
    c.translate(0, 3.4 + i * 1.9, 0);
    parts.push(c);
  }
  const crown = mergeGeometries(parts.map((g) => g.toNonIndexed()));
  const p = crown.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const j = 1 + (hash2(p.getX(i) * 5, p.getZ(i) * 5, p.getY(i) * 3) - 0.5) * 0.25;
    p.setXYZ(i, p.getX(i) * j, p.getY(i), p.getZ(i) * j);
  }
  crown.computeVertexNormals();
  const trunk = new THREE.CylinderGeometry(0.22, 0.4, 3.6, 5); trunk.translate(0, 1.8, 0);
  return { trunk, crown: aoColors(crown, 0.3) };
}

/** Palm: curved segmented trunk + drooping frond fan. */
function palmGeometries() {
  const segs = [];
  let x = 0, y = 0;
  for (let i = 0; i < 5; i++) {
    const c = new THREE.CylinderGeometry(0.2, 0.26, 1.5, 5);
    c.rotateZ(-0.08 * i);
    c.translate(x, y + 0.75, 0);
    segs.push(c.toNonIndexed());
    x += Math.sin(0.08 * i) * 1.5 * 1.1; y += 1.45;
  }
  const trunk = mergeGeometries(segs);
  const fronds = [];
  for (let k = 0; k < 7; k++) {
    const f = new THREE.PlaneGeometry(0.9, 3.4, 1, 4);
    const fp = f.attributes.position;
    for (let i = 0; i < fp.count; i++) { const t = (fp.getY(i) + 1.7) / 3.4; fp.setZ(i, -t * t * 1.4); fp.setX(i, fp.getX(i) * (1 - t * 0.6)); }
    f.translate(0, 1.7, 0);
    f.rotateX(-1.05);
    f.rotateY((k / 7) * Math.PI * 2);
    f.translate(x, y, 0);
    fronds.push(f.toNonIndexed());
  }
  const crown = mergeGeometries(fronds);
  crown.computeVertexNormals();
  return { trunk, crown: aoColors(crown, 0.5) };
}

function pagodaGeometry() {
  // Tiered East-Asian pagoda with upturned eaves.
  const parts = [], roofs = [];
  let y = 0;
  const base = new THREE.BoxGeometry(9, 1.5, 9); base.translate(0, 0.75, 0); parts.push(base);
  y = 1.5;
  for (let t = 0; t < 4; t++) {
    const w = 6 - t * 1.1, hh = 3.2 - t * 0.35;
    const body = new THREE.BoxGeometry(w, hh, w); body.translate(0, y + hh / 2, 0); parts.push(body);
    y += hh;
    const roof = new THREE.CylinderGeometry(w * 0.35, w * 1.05, 1.4, 4, 1);
    roof.rotateY(Math.PI / 4);
    const rp = roof.attributes.position;
    for (let i = 0; i < rp.count; i++) { // upturn corners
      const x = rp.getX(i), z = rp.getZ(i), yy = rp.getY(i);
      const r = Math.hypot(x, z);
      if (yy < 0) rp.setY(i, yy + Math.pow(r / (w * 1.05), 4) * 0.9);
    }
    roof.computeVertexNormals();
    roof.translate(0, y + 0.5, 0); roofs.push(roof);
    y += 1.0;
  }
  const spire = new THREE.ConeGeometry(0.35, 3.5, 6); spire.translate(0, y + 1.7, 0); parts.push(spire);
  // lantern-lit windows on each face of every tier
  const wins = [];
  let wy = 1.5;
  for (let t = 0; t < 4; t++) {
    const w = 6 - t * 1.1, hh = 3.2 - t * 0.35;
    for (let f = 0; f < 4; f++) {
      const g = new THREE.BoxGeometry(w * 0.34, hh * 0.45, 0.12);
      g.translate(0, wy + hh * 0.5, w / 2 + 0.04);
      g.rotateY((f * Math.PI) / 2);
      wins.push(g);
    }
    wy += hh + 1.0;
  }
  return { body: mergeGeometries(parts), roof: mergeGeometries(roofs), windows: mergeGeometries(wins) };
}

function lanternGeometry() {
  const p = [];
  const b = new THREE.CylinderGeometry(0.5, 0.7, 1.6, 6); b.translate(0, 0.8, 0); p.push(b);
  const top = new THREE.ConeGeometry(1.1, 0.8, 6); top.translate(0, 2.8, 0); p.push(top);
  return mergeGeometries(p);
}

function karstGeometry(r, h, seed) {
  // Tall limestone tower with rounded shoulders.
  const g = new THREE.CylinderGeometry(r * 0.55, r, h, 28, 16, false);
  g.translate(0, h / 2 - 6, 0);
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    let x = p.getX(i), y = p.getY(i), z = p.getZ(i);
    const a = Math.atan2(z, x);
    const t = (y + 6) / h;
    const n = fbm(Math.cos(a) * 2 + seed, t * 4, seed, 4);
    let s = 0.75 + n * 0.6;
    s *= 1 - Math.pow(Math.max(0, t - 0.75) / 0.25, 2) * 0.55; // round top
    p.setXYZ(i, x * s, y + (t > 0.97 ? n * r * 0.2 : 0), z * s);
  }
  g.computeVertexNormals();
  const col = [];
  for (let i = 0; i < p.count; i++) {
    const t = (p.getY(i) + 6) / h;
    const ny = g.attributes.normal.getY(i);
    const c = new THREE.Color(0.42, 0.44, 0.42).lerp(new THREE.Color(0.14, 0.24, 0.12), THREE.MathUtils.smoothstep(ny, 0.1, 0.5) * 0.9 + (t > 0.85 ? 0.4 : 0));
    col.push(c.r, c.g, c.b);
  }
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  return g;
}


// ---------------------------------------------------------------------------
// Limestone karst tower (Ha Long Bay / Guilin): sheer strata cliffs,
// undercut wave notch at the waterline, rounded jungle crown.
const LIME = new THREE.Color(0.25, 0.285, 0.27), LIME_D = new THREE.Color(0.11, 0.13, 0.12), STAIN = new THREE.Color(0.08, 0.085, 0.08);
const CANOPY = new THREE.Color(0.07, 0.19, 0.05), CANOPY_L = new THREE.Color(0.2, 0.34, 0.08), WET = new THREE.Color(0.1, 0.1, 0.09);
export function karstTower(r, h, seed, lean = 0) {
  r = Math.min(r, h * 0.26 + 2); // limestone towers are tall and slim: no squat mesas at any depth
  const radial = 36, rows = 26;
  const g = new THREE.CylinderGeometry(1, 1, 1, radial, rows, false);
  g.deleteAttribute('uv');
  const p = g.attributes.position;
  const lx = Math.cos(seed * 2.1) * lean, lz = Math.sin(seed * 2.1) * lean;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i) + 0.5, z = p.getZ(i); // y: 0..1
    const a = Math.atan2(z, x);
    const cx = Math.cos(a), sz = Math.sin(a);
    // silhouette: every tower gets its own profile (taper, waist/shoulder bulges, crown shape) so a
    // ring of stacks reads as eroded limestone, not a row of identical fingers
    const taper = 0.22 + 0.2 * (Math.sin(seed * 7.3) * 0.5 + 0.5);
    const bA = 0.1 + 0.16 * (Math.sin(seed * 3.7) * 0.5 + 0.5), bF = 2.4 + 3.2 * (Math.sin(seed * 5.9) * 0.5 + 0.5);
    let rad = r * (1.0 - taper * y + bA * Math.sin(y * bF + seed * 2.3));
    // elliptical, lobed cross-section (weathering follows the joints)
    rad *= 1 + 0.14 * Math.cos(2 * a + seed * 1.7) + 0.07 * Math.cos(3 * a + seed * 4.1);
    // one or two deep ledge notches where softer beds eroded out
    const n1 = 0.3 + 0.4 * (Math.sin(seed * 8.3) * 0.5 + 0.5), n2 = 0.55 + 0.3 * (Math.sin(seed * 2.9) * 0.5 + 0.5);
    rad *= 1 - 0.16 * Math.exp(-(((y - n1) / 0.035) ** 2)) - 0.1 * Math.exp(-(((y - n2) / 0.03) ** 2));
    // summit: from a tall dome to a near-flat, forested mesa
    const cs = 0.6 + 0.26 * (Math.sin(seed * 6.1) * 0.5 + 0.5), cp = 2 + 4 * (Math.sin(seed * 9.7) * 0.5 + 0.5);
    const c = Math.max(0, (y - cs) / (1 - cs));
    rad *= Math.sqrt(Math.max(0.0, 1 - Math.pow(c, cp) * 0.97));
    // wave-cut notch
    rad *= 1 - 0.14 * Math.exp(-Math.pow((y * h - 1.6) / 1.2, 2));
    // vertical fluting + horizontal strata ledges
    const flute = fbm(cx * 2.2 + seed, sz * 2.2 + y * 1.5, seed, 4);
    const strata = Math.sin(y * h * 0.9 + fbm(a * 2, y * 4, seed + 3, 2) * 3) * 0.5 + 0.5;
    rad *= 0.78 + flute * 0.45 + strata * 0.05;
    const yy = y * h + (y > 0.9 && y < 0.999 ? (fbm(cx * 3, sz * 3, seed + 7, 3) - 0.3) * r * 0.12 * Math.sin((y - 0.9) / 0.099 * Math.PI) : 0); // smooth crown, no pole spike
    const bend = y * y;
    p.setXYZ(i, Math.cos(a) * rad + lx * bend * h * 0.15, yy - 2.5, Math.sin(a) * rad + lz * bend * h * 0.15);
  }
  g.computeVertexNormals();
  const n = g.attributes.normal;
  const col = new Float32Array(p.count * 3);
  const c = new THREE.Color();
  // hashed per-tower picks: sin(seed * k) with k near a multiple of 2*pi barely moves between adjacent seeds
  const hsh = (k) => { const x = Math.sin(seed * 127.1 + k * 311.7) * 43758.5453; return x - Math.floor(x); };
  const warm = hsh(1), lum = 0.9 + 0.2 * hsh(2);
  const tintR = lum * (0.9 + warm * 0.24), tintG = lum * (0.97 + warm * 0.05), tintB = lum * (1.14 - warm * 0.28); // iron-red to cool grey limestone
  const stoneKind = Math.floor(hsh(3) * 2.999); // 0 warm tan, 1 cool grey, 2 dark weathered
  const _grey = new THREE.Color();
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
    const t = (y + 2.5) / h;
    const ny = n.getY(i);
    const streak = fbm(Math.atan2(z, x) * 6 + seed, t * 1.5, seed + 11, 3);
    c.copy(LIME).lerp(LIME_D, THREE.MathUtils.smoothstep(streak, 0.35, 0.75));
    c.lerp(STAIN, THREE.MathUtils.smoothstep(streak, 0.62, 0.8) * 0.6);
    const ledge = Math.sin(t * h * 0.9) * 0.5 + 0.5;
    const veg = THREE.MathUtils.smoothstep(ny, 0.25, 0.6) * (t > 0.15 ? 1 : 0) + THREE.MathUtils.smoothstep(t, 0.8, 0.92) + (ledge > 0.85 && t > 0.3 && streak < 0.5 ? 0.6 : 0);
    const green = CANOPY.clone().lerp(CANOPY_L, fbm(x * 0.3, z * 0.3, seed + 5, 3));
    c.lerp(green, Math.min(1, veg));
    if (y < 1.2) c.lerp(WET, 0.75 * (1 - THREE.MathUtils.smoothstep(y, -0.5, 1.2)));
    c.multiplyScalar(0.85 + fbm(x * 0.5, y * 0.8 + z * 0.5, seed + 13, 2) * 0.3);
    // per-tower stone: warm tan limestone, cool grey limestone, or dark weathered rock (a real hue
    // and value change between stacks, not just a brightness wobble)
    c.r *= tintR; c.g *= tintG; c.b *= tintB;
    if (stoneKind > 0 && veg < 0.5) {
      const L = c.r * 0.3 + c.g * 0.59 + c.b * 0.11;
      if (stoneKind === 1) { c.lerp(_grey.setRGB(L * 0.95, L * 1.0, L * 1.1), 0.6); }
      else { c.lerp(_grey.setRGB(L * 0.72, L * 0.72, L * 0.76), 0.55); }
    }
    col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
  }
  g.setAttribute('color', new THREE.BufferAttribute(col, 3));
  return { geometry: g, top: h - 2.5 - r * 0.05, topR: r * 0.45 };
}

const STACKS = {
  jungle: { n: [4, 6], r: [0.16, 0.26], h: [34, 52], spread: 0.6 },
  edge: { n: [4, 6], r: [0.18, 0.3], h: [44, 70], spread: 0.6 },
  rock: { n: [2, 3], r: [0.3, 0.44], h: [24, 40], spread: 0.45 },
  harbor: { n: [1, 2], r: [0.24, 0.34], h: [16, 26], spread: 0.4 },
};

// Shoreline surf: a ribbon extruded outward from the true coastline, riding the
// waves, with foam bands rolling onto the beach.
function shoreRibbon(islands) {
  const pos = [], uv = [], idx = [];
  for (const isl of islands) {
    const seg = Math.max(48, Math.round(isl.r * 2.4));
    const base = pos.length / 3;
    let per = 0;
    for (let j = 0; j <= seg; j++) {
      const a = (j / seg) * Math.PI * 2;
      const rc = isl.coast(a) * 0.985;
      const w = 5 + isl.r * 0.06;
      pos.push(isl.x + Math.cos(a) * (rc - 2.5), 0, isl.z + Math.sin(a) * (rc - 2.5));
      pos.push(isl.x + Math.cos(a) * (rc + w), 0, isl.z + Math.sin(a) * (rc + w));
      per = (j / seg) * isl.r * 0.9;
      uv.push(per, 0, per, 1);
      if (j < seg) { const k = base + j * 2; idx.push(k, k + 1, k + 2, k + 1, k + 3, k + 2); }
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  return g;
}

export class Environment {
  update(t) { if (this.shoreUniforms) this.shoreUniforms.uTime.value = t; }
  constructor(scene, islands, scenery) {
    this.group = new THREE.Group();
    scene.add(this.group);
    const islandMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.92, metalness: 0 });
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x4a3524, roughness: 0.9 });
    const leafMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.78, vertexColors: true });
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0xcab89a, roughness: 0.8 });
    const roofMat = new THREE.MeshStandardMaterial({ color: 0x3f7a6c, roughness: 0.45, metalness: 0.35 }); // weathered bronze-patina tiles
    const lampMat = new THREE.MeshStandardMaterial({ color: 0x000000, emissive: 0xffa040, emissiveIntensity: 4 });
    [islandMat, trunkMat, leafMat, stoneMat, roofMat].forEach(applyCloudShadow);
    applyFoliage(leafMat);
    applyTerrainDetail(islandMat);

    const { trunk, crown } = treeGeometries();
    const trees = [];
    const pagodas = [], lanterns = [];
    const shores = [];
    for (const isl of islands) {
      const kind = isl.kind === 'edge' ? 'edge' : isl.kind;
      const built = buildIsland(isl.r, kind, isl.seed || 1);
      shores.push({ x: isl.x, z: isl.z, r: isl.r, coast: built.coast });
      const rngS = mulberry(isl.seed * 31 + 7);
      const cfg = STACKS[kind];
      const geos = [built.geometry];
      const tops = [];
      if (cfg) {
        const n = cfg.n[0] + Math.floor(rngS() * (cfg.n[1] - cfg.n[0] + 1));
        for (let k = 0; k < n; k++) {
          const a = (k / n) * Math.PI * 2 + rngS() * 1.2;
          const d = k === 0 ? rngS() * 0.12 : cfg.spread * (0.55 + rngS() * 0.45);
          const r = isl.r * (cfg.r[0] + rngS() * (cfg.r[1] - cfg.r[0])) * (k === 0 ? 1.15 : 1);
          const h = (cfg.h[0] + rngS() * (cfg.h[1] - cfg.h[0])) * (k === 0 ? 1 : 0.75) * Math.min(1.2, 0.6 + isl.r / 70);
          const kt = karstTower(r * (0.55 + rngS() * 0.45), h, isl.seed * 10 + k, rngS() * 0.6); // slim + stout towers mixed at every depth
          const ox = Math.cos(a) * d * isl.r, oz = Math.sin(a) * d * isl.r;
          kt.geometry.translate(ox, 0, oz);
          geos.push(kt.geometry);
          tops.push({ x: ox, z: oz, y: kt.top, r: kt.topR });
        }
      }
      if (built.geometry.attributes.uv) built.geometry.deleteAttribute('uv');
      const merged = geos.length > 1 ? mergeGeometries(geos.map((g) => g.index ? g.toNonIndexed() : g)) : built.geometry;
      const m = new THREE.Mesh(merged || built.geometry, islandMat);
      m.position.set(isl.x, 0, isl.z);
      m.castShadow = true; m.receiveShadow = true;
      this.group.add(m);
      const rng = mulberry(isl.seed * 97 + 5);
      if (kind === 'jungle' || kind === 'edge' || kind === 'harbor') {
        const count = Math.round(isl.r * isl.r * 0.05 * (kind === 'jungle' ? 1.4 : 0.8));
        for (let k = 0; k < count; k++) {
          const a = rng() * Math.PI * 2, rr = Math.sqrt(rng()) * isl.r * 0.8;
          const x = Math.cos(a) * rr, z = Math.sin(a) * rr;
          const h = built.heightAt(x, z);
          if (h < 2.5) continue;
          trees.push({ x: isl.x + x, y: h - 0.4, z: isl.z + z, s: 0.5 + rng() * 0.6, r: rng() * 6.28 });
        }
      }
      // palms fringing the beaches
      if (kind === 'jungle' || kind === 'harbor' || kind === 'edge') {
        const np = Math.round(isl.r * 0.35);
        for (let k = 0; k < np; k++) {
          const a = rng() * Math.PI * 2, rr = built.coast(a) * (0.72 + rng() * 0.16);
          const x = Math.cos(a) * rr, z = Math.sin(a) * rr, h = built.heightAt(x, z);
          if (h > 0.4 && h < 5) trees.push({ x: isl.x + x, y: h - 0.2, z: isl.z + z, s: 0.8 + rng() * 0.4, r: rng() * 6.28, palm: true });
        }
      }
      // jungle crowns on the karst summits
      for (const t of tops) {
        const cnt = Math.round(t.r * t.r * 0.26) + 4;
        for (let k = 0; k < cnt; k++) {
          const a = rng() * 6.28, rr = Math.sqrt(rng()) * t.r * 0.9;
          trees.push({ x: isl.x + t.x + Math.cos(a) * rr, y: t.y - 1.6 - rr * 0.3, z: isl.z + t.z + Math.sin(a) * rr, s: 0.55 + rng() * 0.55, r: rng() * 6.28 });
        }
      }
      isl._tops = tops;
      if (kind === 'jungle' && isl.r > 45) {
        // pagoda ruin near the summit + shrine lanterns on the shore
        const a = rng() * 6.28;
        const x = Math.cos(a) * isl.r * 0.2, z = Math.sin(a) * isl.r * 0.2;
        const tp = (isl._tops || []).slice().sort((p, q) => q.y - p.y)[0];
        if (tp) pagodas.push({ x: isl.x + tp.x, y: tp.y - 0.6, z: isl.z + tp.z, r: rng() * 6.28, s: 0.9 });
        else pagodas.push({ x: isl.x + x, y: built.heightAt(x, z) - 0.8, z: isl.z + z, r: rng() * 6.28 });
        for (let k = 0; k < 4; k++) {
          const b = a + (k - 1.5) * 0.35;
          const lx = Math.cos(b) * isl.r * 0.86, lz = Math.sin(b) * isl.r * 0.86;
          lanterns.push({ x: isl.x + lx, y: Math.max(0.5, built.heightAt(lx, lz)), z: isl.z + lz });
        }
      }
    }
    this.shoreUniforms = { uTime: { value: 0 }, ...WAVE_UNIFORMS };
    const shoreMat = new THREE.ShaderMaterial({
      uniforms: this.shoreUniforms,
      vertexShader: `uniform float uTime; varying vec2 vUv; varying vec3 vW; ${WAVES_GLSL}
        void main(){ vUv = uv; vec3 p = position; vec3 n = vec3(0.0, 1.0, 0.0);
          p += gerstnerWave(p.xz, uTime, n); p.y += 0.3; vW = p;
          gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0); }`,
      fragmentShader: `uniform float uTime; varying vec2 vUv; varying vec3 vW;
        float h(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
        float nz(vec2 p){ vec2 i = floor(p), f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(mix(h(i), h(i + vec2(1, 0)), u.x), mix(h(i + vec2(0, 1)), h(i + vec2(1, 1)), u.x), u.y); }
        void main(){
          float v = vUv.y;
          float n = nz(vW.xz * 0.35) * 0.6 + nz(vW.xz * 1.1 + uTime * 0.2) * 0.4;
          // wash line hugging the sand + two surf bands rolling shoreward
          float wash = (1.0 - smoothstep(0.0, 0.22, v + (n - 0.5) * 0.18));
          float band1 = (1.0 - smoothstep(0.0, 0.12, abs(fract(v * 1.6 + uTime * 0.18 + n * 0.3) - 0.5) - 0.32)) * (1.0 - v);
          float lace = smoothstep(0.55, 0.75, n) * (1.0 - v) * 0.6;
          float a = clamp(wash + band1 * 0.55 + lace * 0.35, 0.0, 1.0) * (1.0 - smoothstep(0.6, 1.0, v));
          gl_FragColor = vec4(vec3(0.93, 0.96, 0.98) * a, a * 0.9);
        }`,
      transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.CustomBlending, blendSrc: THREE.OneFactor, blendDst: THREE.OneMinusSrcAlphaFactor,
    });
    const shore = new THREE.Mesh(shoreRibbon(shores), shoreMat);
    shore.renderOrder = 1; shore.frustumCulled = false;
    this.group.add(shore);
    const inst = (geo, mat, list, fn, shadow = true) => {
      if (!list.length) return null;
      const im = new THREE.InstancedMesh(geo, mat, list.length);
      const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), p = new THREE.Vector3();
      list.forEach((o, i) => { fn(o, p, q, s); m4.compose(p, q, s); im.setMatrixAt(i, m4); });
      im.castShadow = shadow; im.receiveShadow = true;
      im.computeBoundingSphere(); // enables per-group frustum culling (main + shadow pass)
      this.group.add(im);
      return im;
    };
    const place = (o, p, q, s) => { p.set(o.x, o.y, o.z); q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), o.r || 0); s.setScalar(o.s || 1); };
    // Forests are instanced per ~150-unit cell so off-screen groves are culled.
    const cells = new Map();
    for (const t of trees) {
      const key = Math.floor(t.x / 150) + ',' + Math.floor(t.z / 150);
      if (!cells.has(key)) cells.set(key, []);
      cells.get(key).push(t);
    }
    const c = new THREE.Color();
    const conifer = coniferGeometries(), palm = palmGeometries();
    // fresh material, not clone(): clones keep the patched flags but drop onBeforeCompile
    const leafDS = applyFoliage(applyCloudShadow(new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.78, vertexColors: true, side: THREE.DoubleSide })), 2.2);
    const TYPES = {
      broad: { trunk, crown, mat: leafMat, hue: [0.21, 0.1], sat: [0.55, 0.2], lig: [0.13, 0.12] },
      conifer: { trunk: conifer.trunk, crown: conifer.crown, mat: leafMat, hue: [0.28, 0.06], sat: [0.45, 0.15], lig: [0.09, 0.07] },
      palm: { trunk: palm.trunk, crown: palm.crown, mat: leafDS, hue: [0.19, 0.06], sat: [0.6, 0.15], lig: [0.2, 0.1] },
    };
    // Tilt + scale jitter so no two trees match.
    const placeJ = (o, p, q, sc) => {
      p.set(o.x, o.y, o.z);
      q.setFromEuler(new THREE.Euler((hash2(o.x, o.z, 7) - 0.5) * 0.22, o.r || 0, (hash2(o.z, o.x, 8) - 0.5) * 0.22));
      const s0 = o.s || 1;
      sc.set(s0 * (0.85 + hash2(o.x, o.z, 9) * 0.3), s0 * (0.8 + hash2(o.x, o.z, 10) * 0.5), s0 * (0.85 + hash2(o.z, o.x, 11) * 0.3));
    };
    // One merged geometry per tree type (bark keeps its colour via vertex colours) -> 1 draw per type per cell.
    const merged = (trunkG, crownG) => {
      const tg = trunkG.index ? trunkG.toNonIndexed() : trunkG.clone();
      const cg = crownG.index ? crownG.toNonIndexed() : crownG.clone();
      for (const g of [tg, cg]) { if (g.attributes.uv) g.deleteAttribute('uv'); }
      const tc = new Float32Array(tg.attributes.position.count * 3);
      for (let i = 0; i < tc.length; i += 3) { tc[i] = 0.95; tc[i + 1] = 0.6; tc[i + 2] = 0.42; } // bark (x instance tint)
      tg.setAttribute('color', new THREE.BufferAttribute(tc, 3));
      if (!tg.attributes.normal) tg.computeVertexNormals();
      return mergeGeometries([tg, cg]);
    };
    for (const T of Object.values(TYPES)) T.geo = merged(T.trunk, T.crown);
    for (const list of cells.values()) {
      const byType = { broad: [], conifer: [], palm: [] };
      for (const t of list) byType[t.palm || (t.y < 3.2 && hash2(t.x, t.z, 5) < 0.4) ? 'palm' : t.y > 22 && hash2(t.x, t.z, 6) < 0.6 ? 'conifer' : 'broad'].push(t);
      for (const [type, arr] of Object.entries(byType)) {
        if (!arr.length) continue;
        const T = TYPES[type];
        const crowns = inst(T.geo, T.mat, arr, placeJ);
        arr.forEach((t, i) => { c.setHSL(T.hue[0] + hash2(t.x, t.z, 1) * T.hue[1], T.sat[0] + hash2(t.x, t.z, 3) * T.sat[1], T.lig[0] + hash2(t.z, t.x, 2) * T.lig[1]); crowns.setColorAt(i, c); });
      }
    }
    const pg = pagodaGeometry();
    inst(pg.body, stoneMat, pagodas, place);
    inst(pg.roof, roofMat, pagodas, place);
    inst(pg.windows, lampMat, pagodas, place, false);
    const lanternStone = applyCloudShadow(new THREE.MeshStandardMaterial({ color: 0x5d5a52, roughness: 0.9 }));
    inst(lanternGeometry(), lanternStone, lanterns, place, false);
    const glow = new THREE.SphereGeometry(0.45, 8, 6); glow.translate(0, 1.9, 0);
    inst(glow, lampMat, lanterns, place, false);

    // Horizon karst peaks (fogged silhouettes).
    // same sculpted limestone as the playable islands (fluting, strata ledges, jungle
    // ledges, wet notch) instead of smooth cones: these fill the cinematic backdrops
    const karstMat = applyTerrainDetail(applyCloudShadow(new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.95 })));
    for (const s of scenery) {
      const rng = mulberry(s.seed);
      const n = 3 + Math.floor(rng() * 4);
      for (let k = 0; k < n; k++) {
        const r = s.r * (0.25 + rng() * 0.3), h = s.h * (0.5 + rng() * 0.8);
        const g = karstTower(r * 0.52, h * 1.12, s.seed * 10 + k, (rng() - 0.5) * 0.5).geometry; // slim towers, not mesas
        const m = new THREE.Mesh(g, karstMat);
        m.position.set(s.x + (rng() - 0.5) * s.r * 1.4, 0, s.z + (rng() - 0.5) * s.r * 1.4);
        m.rotation.y = rng() * 6.28;
        this.group.add(m);
      }
    }
  }
}
