// Instanced small models: drones and projectiles.
//
//   getDroneAssets()      -> { fighter, bomber, micro, shield }
//   getProjectileAssets() -> { ball, shell, torpedo, missile, hypersonic, emp }
//
// Each entry is { geometry, material } for THREE.InstancedMesh. Local +Z = forward,
// +Y = up. Every asset is a single merged geometry with a `color` attribute and
// one material, so each type costs exactly one draw call.
//
// Drones: base parts are near-white so instanceColor tints them by team. Glowing
// parts (engines, eyes) use an emissive mask (uv.x) and the emissive is multiplied
// by the vertex*instance colour, so the glow is team-coloured as well.
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { prep, M, prism, rodGeo } from './shipModels.js';
import { emissiveMaskTex } from './materials.js';

const PI = Math.PI;
const GLOW_U = 0.625, DARK_U = 0.125;

class Kit {
  constructor() { this.list = []; }
  add(geo, color, matrix, glow = false) {
    const g = prep(geo, color);
    if (matrix) g.applyMatrix4(matrix);
    const uv = g.attributes.uv;
    for (let i = 0; i < uv.count; i++) uv.setXY(i, glow ? GLOW_U : DARK_U, 0.5);
    this.list.push(g);
    return g;
  }
  mirror(geo, color, matrix, glow) {
    this.add(geo, color, matrix, glow);
    const m = new THREE.Matrix4().makeScale(-1, 1, 1).multiply(matrix || new THREE.Matrix4());
    const g = this.add(geo, color, m, glow);
    // fix winding after mirroring
    const flip = (attr) => {
      const a = attr.array, s = attr.itemSize;
      for (let t = 0; t < attr.count; t += 3) for (let k = 0; k < s; k++) {
        const i1 = (t + 1) * s + k, i2 = (t + 2) * s + k; const tmp = a[i1]; a[i1] = a[i2]; a[i2] = tmp;
      }
    };
    for (const k of Object.keys(g.attributes)) flip(g.attributes[k]);
  }
  build() {
    const g = mergeGeometries(this.list, false);
    g.computeBoundingSphere();
    g.computeBoundingBox();
    return g;
  }
}

const matCache = new Map();
function smallMat(key, { metalness = 0.4, roughness = 0.45, glow = 3.5, flat = false } = {}) {
  if (matCache.has(key)) return matCache.get(key);
  const m = new THREE.MeshStandardMaterial({
    color: 0xffffff, vertexColors: true, metalness, roughness, flatShading: flat,
    emissive: 0xffffff, emissiveIntensity: glow, emissiveMap: emissiveMaskTex(),
  });
  m.onBeforeCompile = (sh) => {
    sh.fragmentShader = sh.fragmentShader.replace(
      '#include <emissivemap_fragment>',
      // glow fades as a drone/projectile nears the camera: a swarm around a low camera must not bloom into a veil
      '#include <emissivemap_fragment>\n#ifdef USE_COLOR\n totalEmissiveRadiance *= vColor.rgb;\n#endif\n totalEmissiveRadiance *= smoothstep(3.0, 30.0, length(vViewPosition));',
    );
  };
  m.customProgramCacheKey = () => 'small-emissive-tint-nearfade';
  m.name = 'small:' + key;
  matCache.set(key, m);
  return m;
}

// Flat plate from a plan polygon ([x,z]) with thickness t, centred on y.
function plate(pts, t, y = 0) { return prism(pts, y - t / 2, null, y + t / 2, { base: true }); }

const WHITE = 0xeef1f4, LIGHT = 0xc9cfd6, DARK = 0x2a2e33, CANOPY = 0x1a2430, GLOW = 0xffffff;

let drones = null;
export function getDroneAssets() {
  if (drones) return drones;
  const mat = smallMat('drone', { metalness: 0.35, roughness: 0.4, glow: 3.2 });

  // ---- fighter (wingspan 2.2)
  const f = new Kit();
  {
    const body = new THREE.LatheGeometry([[0, -0.95], [0.16, -0.9], [0.2, -0.3], [0.19, 0.3], [0.13, 0.7], [0.0, 1.05]].map((p) => new THREE.Vector2(p[0], p[1])), 10);
    f.add(body, WHITE, M(0, 0, 0, PI / 2, 0, 0));
    f.add(new THREE.SphereGeometry(0.12, 10, 6, 0, PI * 2, 0, PI / 2), CANOPY, M(0, 0.12, 0.35, 0, 0, 0, 1, 0.9, 2.4));
    f.add(plate([[0.15, 0.45], [1.1, -0.55], [1.1, -0.72], [0.15, -0.72]], 0.05), WHITE);
    f.add(plate([[-0.15, 0.45], [-1.1, -0.55], [-1.1, -0.72], [-0.15, -0.72]], 0.05), WHITE);
    f.add(plate([[1.0, -0.5], [1.1, -0.55], [1.1, -0.72], [1.0, -0.72]], 0.055), LIGHT);
    f.add(plate([[-1.0, -0.5], [-1.1, -0.55], [-1.1, -0.72], [-1.0, -0.72]], 0.055), LIGHT);
    for (const s of [-1, 1]) {
      const fin = plate([[0, -0.35], [0, -0.85], [0.5, -0.95], [0.45, -0.7]], 0.04);
      f.add(fin, WHITE, M(s * 0.16, 0.08, 0, 0, 0, s * (PI / 2 - 0.35)));
      f.add(plate([[0.15, -0.6], [0.55, -0.85], [0.55, -0.95], [0.15, -0.95]], 0.035), LIGHT, M(0, 0, 0, 0, 0, 0, s, 1, 1));
    }
    f.add(new THREE.CylinderGeometry(0.13, 0.15, 0.12, 10, 1), DARK, M(0, 0, -0.98, PI / 2, 0, 0));
    f.add(new THREE.CircleGeometry(0.11, 10), GLOW, M(0, 0, -1.045, 0, PI, 0), true);
    f.add(new THREE.BoxGeometry(0.08, 0.03, 0.08), GLOW, M(1.08, 0, -0.62), true);
    f.add(new THREE.BoxGeometry(0.08, 0.03, 0.08), GLOW, M(-1.08, 0, -0.62), true);
  }
  // ---- bomber (wingspan 3)
  const b = new Kit();
  {
    const body = new THREE.LatheGeometry([[0, -1.3], [0.2, -1.2], [0.3, -0.4], [0.3, 0.5], [0.22, 1.0], [0.0, 1.35]].map((p) => new THREE.Vector2(p[0], p[1])), 10);
    b.add(body, WHITE, M(0, 0, 0, PI / 2, 0, 0, 1, 0.85, 1));
    b.add(new THREE.SphereGeometry(0.17, 10, 6, 0, PI * 2, 0, PI / 2), CANOPY, M(0, 0.14, 0.7, 0, 0, 0, 1, 0.8, 2));
    b.add(plate([[0.2, 0.35], [1.5, 0.05], [1.5, -0.25], [0.2, -0.45]], 0.07), WHITE);
    b.add(plate([[-0.2, 0.35], [-1.5, 0.05], [-1.5, -0.25], [-0.2, -0.45]], 0.07), WHITE);
    for (const s of [-1, 1]) {
      b.add(new THREE.CylinderGeometry(0.14, 0.16, 1.0, 10), LIGHT, M(s * 0.75, -0.08, 0.05, PI / 2, 0, 0));
      b.add(new THREE.CylinderGeometry(0.1, 0.1, 0.06, 10), DARK, M(s * 0.75, -0.08, 0.56, PI / 2, 0, 0));
      b.add(new THREE.CircleGeometry(0.11, 10), GLOW, M(s * 0.75, -0.08, -0.46, 0, PI, 0), true);
      b.add(plate([[0.2, -0.9], [0.9, -1.15], [0.9, -1.3], [0.2, -1.3]], 0.05), WHITE, M(0, 0, 0, 0, 0, 0, s, 1, 1));
      b.add(new THREE.BoxGeometry(0.1, 0.03, 0.1), GLOW, M(s * 1.48, 0, -0.1), true);
    }
    b.add(plate([[0, -0.7], [0, -1.3], [0.55, -1.35], [0.5, -1.05]], 0.05), WHITE, M(0, 0.12, 0, 0, 0, PI / 2));
    b.add(new THREE.BoxGeometry(0.28, 0.12, 0.7), DARK, M(0, -0.25, 0.0)); // bomb bay / payload
  }
  // ---- micro quad-drone (0.9 across)
  const q = new Kit();
  {
    q.add(new THREE.OctahedronGeometry(0.14, 0), WHITE, M(0, 0, 0, 0, PI / 4, 0, 1.2, 0.6, 1.5));
    for (let i = 0; i < 4; i++) {
      const a = PI / 4 + i * PI / 2;
      const x = Math.sin(a) * 0.33, z = Math.cos(a) * 0.33;
      q.add(rodGeo(0.025, 0.025, [0, 0, 0], [x, 0.02, z], 5), LIGHT);
      q.add(new THREE.CylinderGeometry(0.04, 0.04, 0.07, 6), DARK, M(x, 0.04, z));
      q.add(new THREE.CylinderGeometry(0.13, 0.13, 0.012, 12), DARK, M(x, 0.08, z));
      q.add(new THREE.TorusGeometry(0.13, 0.012, 3, 12), WHITE, M(x, 0.08, z, PI / 2, 0, 0));
    }
    q.add(new THREE.SphereGeometry(0.05, 8, 6), GLOW, M(0, -0.01, 0.18), true);
    q.add(new THREE.BoxGeometry(0.1, 0.02, 0.1), GLOW, M(0, 0.09, -0.02), true);
  }
  // ---- shield drone (1.2 across)
  const sd = new Kit();
  {
    sd.add(new THREE.CylinderGeometry(0.42, 0.5, 0.16, 8, 1), WHITE, M(0, 0, 0, 0, PI / 8, 0));
    sd.add(new THREE.SphereGeometry(0.3, 12, 6, 0, PI * 2, 0, PI / 2), LIGHT, M(0, 0.08, 0, 0, 0, 0, 1, 0.55, 1));
    sd.add(new THREE.CylinderGeometry(0.5, 0.36, 0.12, 8, 1), DARK, M(0, -0.14, 0, 0, PI / 8, 0));
    sd.add(new THREE.TorusGeometry(0.58, 0.035, 4, 24), GLOW, M(0, 0, 0, PI / 2, 0, 0), true);
    sd.add(new THREE.SphereGeometry(0.08, 8, 6), GLOW, M(0, 0.24, 0), true);
    for (let i = 0; i < 3; i++) {
      const a = i * PI * 2 / 3;
      sd.add(new THREE.BoxGeometry(0.1, 0.06, 0.18), LIGHT, M(Math.sin(a) * 0.58, 0, Math.cos(a) * 0.58, 0, a, 0));
    }
    sd.add(new THREE.CircleGeometry(0.16, 10), GLOW, M(0, -0.21, 0, PI / 2, 0, 0), true);
  }
  drones = {
    fighter: { geometry: f.build(), material: mat },
    bomber: { geometry: b.build(), material: mat },
    micro: { geometry: q.build(), material: mat },
    shield: { geometry: sd.build(), material: mat },
  };
  return drones;
}

let projectiles = null;
export function getProjectileAssets() {
  if (projectiles) return projectiles;
  const lathe = (pts, seg = 12) => {
    const g = new THREE.LatheGeometry(pts.map((p) => new THREE.Vector2(p[0], p[1])), seg);
    g.rotateX(PI / 2); // lathe axis +Y -> +Z
    return g;
  };

  // cannonball (radius 0.4)
  const ball = new Kit();
  ball.add(new THREE.IcosahedronGeometry(0.4, 2), 0x303236);
  ball.add(new THREE.IcosahedronGeometry(0.2, 1), 0xff9a50, M(0, 0, -0.26, 0, 0, 0, 1, 1, 0.6), true);

  // shell (length 1.3): brass casing, steel ogive, glowing tracer base
  const shell = new Kit();
  shell.add(lathe([[0, -0.62], [0.17, -0.6], [0.18, -0.2], [0.18, 0.15], [0.14, 0.42], [0.07, 0.6], [0, 0.68]]), 0xd8a955);
  shell.add(lathe([[0.185, -0.45], [0.19, -0.45], [0.19, -0.35], [0.185, -0.35]]), 0x8a5a2a);
  shell.add(new THREE.CircleGeometry(0.16, 12), 0xffa040, M(0, 0, -0.625, 0, PI, 0), true);
  shell.add(new THREE.ConeGeometry(0.15, 0.5, 10, 1, true), 0xff7a20, M(0, 0, -0.85, -PI / 2, 0, 0), true);

  // torpedo (length 3)
  const torp = new Kit();
  torp.add(lathe([[0, -1.5], [0.08, -1.45], [0.2, -1.1], [0.22, -0.8], [0.22, 1.1], [0.18, 1.35], [0.08, 1.48], [0, 1.52]], 14), 0x4a5058);
  torp.add(lathe([[0.225, 0.9], [0.23, 0.9], [0.23, 1.15], [0.2, 1.3]], 14), 0xb33a2a);
  for (let i = 0; i < 4; i++) torp.add(new THREE.BoxGeometry(0.02, 0.5, 0.3), 0x3a3f45, M(0, 0, -1.25, 0, 0, i * PI / 2 + PI / 4));
  torp.add(new THREE.CylinderGeometry(0.16, 0.16, 0.02, 3), 0x9a8a50, M(0, 0, -1.52, PI / 2, 0, 0));
  torp.add(new THREE.CircleGeometry(0.06, 8), 0x9fe8ff, M(0, 0, -1.54, 0, PI, 0), true);

  // missile (length 2.2): white body, dark nose, cruciform fins, exhaust flame
  const mis = new Kit();
  mis.add(lathe([[0, -1.05], [0.13, -1.05], [0.14, 0.6], [0.1, 0.9], [0.04, 1.08], [0, 1.12]], 12), 0xe9ecef);
  mis.add(lathe([[0.141, 0.55], [0.12, 0.8], [0.04, 1.08], [0, 1.12]], 12), 0x2a2e33);
  for (let i = 0; i < 4; i++) {
    const r = i * PI / 2;
    mis.add(new THREE.BoxGeometry(0.02, 0.45, 0.4), 0xc9cfd6, M(0, 0, -0.8, 0, 0, r).multiply(M(0, 0.2, 0)));
    mis.add(new THREE.BoxGeometry(0.015, 0.2, 0.25), 0xc9cfd6, M(0, 0, 0.3, 0, 0, r).multiply(M(0, 0.12, 0)));
  }
  mis.add(new THREE.ConeGeometry(0.12, 0.9, 10, 1, true), 0xffb050, M(0, 0, -1.5, -PI / 2, 0, 0), true);
  mis.add(new THREE.CircleGeometry(0.12, 10), 0xffe0a0, M(0, 0, -1.06, 0, PI, 0), true);

  // hypersonic glide vehicle (length 2.5): faceted wedge with plasma-hot leading edges
  const hyp = new Kit();
  {
    const b = [[0, 1.3], [0.55, -1.1], [0.35, -1.25], [-0.35, -1.25], [-0.55, -1.1]];
    const t = [[0, 1.0], [0.25, -0.9], [0.18, -1.15], [-0.18, -1.15], [-0.25, -0.9]];
    hyp.add(prism(b, -0.08, t, 0.22, { base: true }), 0x2a2e34);
    hyp.add(prism([[0, 1.32], [0.08, 0.9], [-0.08, 0.9]], -0.09, null, 0.12, { base: true }), 0xffd0a0, null, true);
    for (const s of [-1, 1]) hyp.add(new THREE.BoxGeometry(0.05, 0.05, 2.0), 0xff9a60, M(s * 0.3, -0.02, 0.05, 0, -s * 0.23, 0), true);
    hyp.add(new THREE.ConeGeometry(0.28, 1.4, 8, 1, true), 0xffc080, M(0, 0.05, -1.9, -PI / 2, 0, 0), true);
  }

  // EMP orb (radius 0.8): dark shell with glowing core + ring
  const emp = new Kit();
  emp.add(new THREE.IcosahedronGeometry(0.42, 1), 0x9fdcff, null, true);
  emp.add(new THREE.TorusGeometry(0.7, 0.06, 6, 24), 0x7ac8ff, M(0, 0, 0, PI / 2, 0, 0), true);
  emp.add(new THREE.TorusGeometry(0.6, 0.04, 6, 24), 0x7ac8ff, M(0, 0, 0, 0, 0.6, 0), true);
  for (let i = 0; i < 4; i++) {
    const a = i * PI / 2;
    emp.add(new THREE.BoxGeometry(0.16, 0.16, 0.3), 0x30353b, M(Math.cos(a) * 0.52, Math.sin(a) * 0.52, 0, 0, 0, a));
  }

  const metal = smallMat('proj-metal', { metalness: 0.7, roughness: 0.35, glow: 4.0 });
  const iron = smallMat('proj-iron', { metalness: 0.4, roughness: 0.82, glow: 3.2 }); // cast shot: dull, not a polished bauble
  const paint = smallMat('proj-paint', { metalness: 0.2, roughness: 0.45, glow: 4.5 });
  const hot = smallMat('proj-hot', { metalness: 0.4, roughness: 0.4, glow: 5.0, flat: true });
  projectiles = {
    ball: { geometry: ball.build(), material: iron },
    shell: { geometry: shell.build(), material: metal },
    torpedo: { geometry: torp.build(), material: metal },
    missile: { geometry: mis.build(), material: paint },
    hypersonic: { geometry: hyp.build(), material: hot },
    emp: { geometry: emp.build(), material: paint },
  };
  return projectiles;
}
