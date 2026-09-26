import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { applyCloudShadow } from './cloudShadow.js';

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
  grass: new THREE.Color(0.16, 0.28, 0.08), jungle: new THREE.Color(0.07, 0.18, 0.05),
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
  const hAt = (x, z) => {
    const a = Math.atan2(z, x);
    // wobble the coastline
    const wob = 1 + (fbm(Math.cos(a) * 1.3 + seed, Math.sin(a) * 1.3, seed, 3) - 0.5) * 0.35;
    const r = Math.hypot(x, z) / (R * wob);
    const n = fbm(x / 14 + seed * 3, z / 14, seed);
    const ridge = 1 - Math.abs(fbm(x / 22, z / 22 + seed, seed + 5) * 2 - 1);
    let dome = Math.max(0, 1 - r * r);
    dome = Math.pow(dome, 1 - P.cliff * 0.6);
    let h = H * dome * (0.6 + 0.6 * n + 0.35 * ridge);
    // beach shelf
    h += (1 - THREE.MathUtils.smoothstep(r, 0.9, 1.04)) * 1.1 - 2.6 * THREE.MathUtils.smoothstep(r, 0.98, 1.12);
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
    if (y < 0.4) tmp.copy(C.wetSand);
    else if (y < 1.8 + n * 1.5) tmp.copy(C.sand);
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
  return { geometry: g, heightAt: hAt, H };
}

// ---------------------------------------------------------------------------
function treeGeometries() {
  const trunk = new THREE.CylinderGeometry(0.35, 0.55, 5, 6);
  trunk.translate(0, 2.5, 0);
  const crowns = [];
  for (let i = 0; i < 3; i++) {
    const c = new THREE.IcosahedronGeometry(2.2 - i * 0.45, 2);
    c.scale(1, 0.8, 1);
    c.translate((i - 1) * 0.5, 5 + i * 1.7, (i % 2) * 0.4);
    crowns.push(c);
  }
  const crown = mergeGeometries(crowns);
  // jitter crown vertices for organic look
  const p = crown.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const s = 1 + (hash2(p.getX(i) * 3, p.getZ(i) * 3, p.getY(i)) - 0.5) * 0.35;
    p.setXYZ(i, p.getX(i) * s, p.getY(i), p.getZ(i) * s);
  }
  crown.computeVertexNormals();
  return { trunk, crown };
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
  return { body: mergeGeometries(parts), roof: mergeGeometries(roofs) };
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
const LIME = new THREE.Color(0.3, 0.315, 0.32), LIME_D = new THREE.Color(0.13, 0.14, 0.145), STAIN = new THREE.Color(0.08, 0.085, 0.08);
const CANOPY = new THREE.Color(0.07, 0.19, 0.05), CANOPY_L = new THREE.Color(0.2, 0.34, 0.08), WET = new THREE.Color(0.1, 0.1, 0.09);
export function karstTower(r, h, seed, lean = 0) {
  const radial = 36, rows = 26;
  const g = new THREE.CylinderGeometry(1, 1, 1, radial, rows, false);
  g.deleteAttribute('uv');
  const p = g.attributes.position;
  const lx = Math.cos(seed * 2.1) * lean, lz = Math.sin(seed * 2.1) * lean;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i) + 0.5, z = p.getZ(i); // y: 0..1
    const a = Math.atan2(z, x);
    const cx = Math.cos(a), sz = Math.sin(a);
    // silhouette: slight taper, bulging shoulders, rounded crown
    let rad = r * (1.0 - 0.18 * y + 0.12 * Math.sin(y * 3.1 + seed));
    // domed summit: circular profile over the top 35%
    const c = Math.max(0, (y - 0.65) / 0.35);
    rad *= Math.sqrt(Math.max(0.0, 1 - c * c * 0.97));
    // wave-cut notch
    rad *= 1 - 0.14 * Math.exp(-Math.pow((y * h - 1.6) / 1.2, 2));
    // vertical fluting + horizontal strata ledges
    const flute = fbm(cx * 2.2 + seed, sz * 2.2 + y * 1.5, seed, 4);
    const strata = Math.sin(y * h * 0.9 + fbm(a * 2, y * 4, seed + 3, 2) * 3) * 0.5 + 0.5;
    rad *= 0.78 + flute * 0.45 + strata * 0.05;
    const yy = y * h + (y > 0.98 ? (fbm(cx * 3, sz * 3, seed + 7, 3) - 0.3) * r * 0.25 : 0);
    const bend = y * y;
    p.setXYZ(i, Math.cos(a) * rad + lx * bend * h * 0.15, yy - 2.5, Math.sin(a) * rad + lz * bend * h * 0.15);
  }
  g.computeVertexNormals();
  const n = g.attributes.normal;
  const col = new Float32Array(p.count * 3);
  const c = new THREE.Color();
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

export class Environment {
  constructor(scene, islands, scenery) {
    this.group = new THREE.Group();
    scene.add(this.group);
    const islandMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.92, metalness: 0 });
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x4a3524, roughness: 0.9 });
    const leafMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.75 });
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x8a8378, roughness: 0.85 });
    const roofMat = new THREE.MeshStandardMaterial({ color: 0x2b3a3a, roughness: 0.55, metalness: 0.2 });
    const lampMat = new THREE.MeshStandardMaterial({ color: 0x000000, emissive: 0xffa040, emissiveIntensity: 4 });
    [islandMat, trunkMat, leafMat, stoneMat, roofMat].forEach(applyCloudShadow);

    const { trunk, crown } = treeGeometries();
    const trees = [];
    const pagodas = [], lanterns = [];
    for (const isl of islands) {
      const kind = isl.kind === 'edge' ? 'edge' : isl.kind;
      const built = buildIsland(isl.r, kind, isl.seed || 1);
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
          const kt = karstTower(r, h, isl.seed * 10 + k, rngS() * 0.6);
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
        const count = Math.round(isl.r * isl.r * 0.04 * (kind === 'jungle' ? 1.4 : 0.8));
        for (let k = 0; k < count; k++) {
          const a = rng() * Math.PI * 2, rr = Math.sqrt(rng()) * isl.r * 0.8;
          const x = Math.cos(a) * rr, z = Math.sin(a) * rr;
          const h = built.heightAt(x, z);
          if (h < 2.5) continue;
          trees.push({ x: isl.x + x, y: h - 0.4, z: isl.z + z, s: 0.5 + rng() * 0.6, r: rng() * 6.28 });
        }
      }
      // jungle crowns on the karst summits
      for (const t of tops) {
        const cnt = Math.round(t.r * t.r * 0.34) + 5;
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
    const inst = (geo, mat, list, fn, shadow = true) => {
      if (!list.length) return null;
      const im = new THREE.InstancedMesh(geo, mat, list.length);
      const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), s = new THREE.Vector3(), p = new THREE.Vector3();
      list.forEach((o, i) => { fn(o, p, q, s); m4.compose(p, q, s); im.setMatrixAt(i, m4); });
      im.castShadow = shadow; im.receiveShadow = true;
      this.group.add(im);
      return im;
    };
    const place = (o, p, q, s) => { p.set(o.x, o.y, o.z); q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), o.r || 0); s.setScalar(o.s || 1); };
    inst(trunk, trunkMat, trees, place);
    const crowns = inst(crown, leafMat, trees, place);
    if (crowns) {
      const c = new THREE.Color();
      trees.forEach((t, i) => { c.setHSL(0.21 + hash2(t.x, t.z, 1) * 0.1, 0.55 + hash2(t.x, t.z, 3) * 0.2, 0.13 + hash2(t.z, t.x, 2) * 0.12); crowns.setColorAt(i, c); });
    }
    const pg = pagodaGeometry();
    inst(pg.body, stoneMat, pagodas, place);
    inst(pg.roof, roofMat, pagodas, place);
    inst(lanternGeometry(), stoneMat, lanterns, place, false);
    const glow = new THREE.SphereGeometry(0.45, 8, 6); glow.translate(0, 1.9, 0);
    inst(glow, lampMat, lanterns, place, false);

    // Horizon karst peaks (fogged silhouettes).
    const karstMat = applyCloudShadow(new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.95 }));
    for (const s of scenery) {
      const rng = mulberry(s.seed);
      const n = 3 + Math.floor(rng() * 4);
      for (let k = 0; k < n; k++) {
        const r = s.r * (0.25 + rng() * 0.3), h = s.h * (0.5 + rng() * 0.8);
        const g = karstGeometry(r, h, s.seed * 10 + k);
        const m = new THREE.Mesh(g, karstMat);
        m.position.set(s.x + (rng() - 0.5) * s.r * 1.4, 0, s.z + (rng() - 0.5) * s.r * 1.4);
        m.rotation.y = rng() * 6.28;
        this.group.add(m);
      }
    }
  }
}
