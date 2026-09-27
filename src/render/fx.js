import * as THREE from 'three';
import { sampleWaves, WAVES_GLSL, WAVE_UNIFORMS } from './waves.js';

// High-level VFX vocabulary. Every effect is layered the way film/AAA VFX
// are built: flash -> core -> secondary (sparks/debris) -> smoke -> residue
// (foam/scorch decals), plus light, screen shockwave and camera trauma.

const _v = new THREE.Vector3();
const _w = { y: 0, nx: 0, ny: 1, nz: 0 };
const rnd = (a, b) => a + Math.random() * (b - a);

export const FX_TIME = { value: 0 };
const ringMat = (color) => new THREE.ShaderMaterial({
  uniforms: { uColor: { value: new THREE.Color(color) }, uK: { value: 0 }, uAlpha: { value: 1 }, uWidth: { value: 0.12 }, uTime: FX_TIME, ...WAVE_UNIFORMS },
  // rings ride the Gerstner surface so swells never slice them
  vertexShader: `uniform float uTime; varying vec2 vUv; ${WAVES_GLSL}
    void main(){ vUv = uv; vec4 wp = modelMatrix * vec4(position, 1.0); vec3 n = vec3(0.0, 1.0, 0.0);
      wp.xyz += gerstnerWave(wp.xz, uTime, n); wp.y += 0.5;
      gl_Position = projectionMatrix * viewMatrix * wp; }`,
  fragmentShader: `uniform vec3 uColor; uniform float uK, uAlpha, uWidth; varying vec2 vUv;
    void main(){ float r = length(vUv * 2.0 - 1.0);
      float ring = 1.0 - smoothstep(0.0, uWidth, abs(r - 0.92));
      float fill = smoothstep(0.92, 0.0, r) * 0.12;
      float a = (ring + fill) * uAlpha * (1.0 - uK);
      if (r > 1.0) discard;
      gl_FragColor = vec4(uColor * a, a); }`,
  transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
});

const beamMat = () => new THREE.ShaderMaterial({
  uniforms: { uColor: { value: new THREE.Color() }, uAlpha: { value: 1 } },
  vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
  fragmentShader: `uniform vec3 uColor; uniform float uAlpha; varying vec2 vUv;
    void main(){ float d = abs(vUv.x - 0.5) * 2.0; float core = pow(1.0 - d, 6.0) * 3.0 + pow(1.0 - d, 1.5) * 0.6;
      float ends = smoothstep(0.0, 0.02, vUv.y) * smoothstep(1.0, 0.97, vUv.y);
      float a = core * uAlpha * ends; gl_FragColor = vec4(uColor * a + vec3(a * 0.35) * pow(1.0-d, 12.0), a); }`,
  transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
});

export class FX {
  constructor(scene, particles, decals, renderer) {
    this.scene = scene; this.p = particles; this.decals = decals; this.renderer = renderer;
    this.time = 0;
    this.onShake = null; // (amount, x, z) => void

    // Point-light pool for explosions / muzzle flashes (constant count -> no shader recompiles)
    this.lights = [];
    for (let i = 0; i < 8; i++) {
      const l = new THREE.PointLight(0xffaa66, 0, 60, 1.6);
      l.userData = { t: 0, life: 0, i0: 0 };
      scene.add(l);
      this.lights.push(l);
    }
    this.lightIdx = 0;

    // Rings (water shock rings, EMP, capture, age-up)
    const ringGeo = new THREE.PlaneGeometry(2, 2, 24, 24);
    ringGeo.rotateX(-Math.PI / 2);
    this.rings = [];
    for (let i = 0; i < 32; i++) {
      const m = new THREE.Mesh(ringGeo, ringMat(0xffffff));
      m.visible = false; m.renderOrder = 6; m.frustumCulled = false;
      m.userData = { t: 0, life: 1, r0: 1, r1: 10 };
      scene.add(m); this.rings.push(m);
    }
    this.ringIdx = 0;

    // Beams (railgun, lasers, light pillars)
    const beamGeo = new THREE.PlaneGeometry(1, 1);
    beamGeo.translate(0, 0.5, 0);
    this.beams = [];
    for (let i = 0; i < 40; i++) {
      const g = new THREE.Group();
      const mat = beamMat();
      const a = new THREE.Mesh(beamGeo, mat), b = new THREE.Mesh(beamGeo, mat);
      b.rotation.y = Math.PI / 2;
      g.add(a, b);
      g.visible = false; g.userData = { t: 0, life: 1, mat };
      a.frustumCulled = b.frustumCulled = false;
      a.renderOrder = b.renderOrder = 7;
      scene.add(g); this.beams.push(g);
    }
    this.beamIdx = 0;

    // Debris chunks
    this.debrisMax = 400;
    // splintered planks: a subdivided box with jagged, torn vertices
    const dGeo = new THREE.BoxGeometry(1, 0.35, 0.6, 3, 1, 2);
    { const dp = dGeo.attributes.position;
      for (let i = 0; i < dp.count; i++) {
        const x = dp.getX(i), h = Math.sin(x * 91.7 + dp.getZ(i) * 37.3) * 0.5 + 0.5;
        dp.setXYZ(i, x * (1 + (Math.abs(x) > 0.49 ? h * 0.5 : 0)), dp.getY(i) * (0.7 + h * 0.5), dp.getZ(i) * (0.8 + h * 0.35));
      }
      dGeo.computeVertexNormals(); }
    this.dHeat = new THREE.InstancedBufferAttribute(new Float32Array(this.debrisMax), 1).setUsage(THREE.DynamicDrawUsage);
    dGeo.setAttribute('aHeat', this.dHeat);
    const dMat = new THREE.MeshStandardMaterial({ color: 0x2e2620, roughness: 0.85, metalness: 0.2 });
    // burning debris: glowing ember cracks that cool as the chunk flies
    dMat.onBeforeCompile = (sh) => {
      sh.vertexShader = sh.vertexShader
        .replace('#include <common>', '#include <common>\nattribute float aHeat; varying float vHeat; varying vec3 vDbP;')
        .replace('#include <begin_vertex>', '#include <begin_vertex>\nvHeat = aHeat; vDbP = position * 4.0;');
      sh.fragmentShader = sh.fragmentShader
        .replace('#include <common>', `#include <common>
varying float vHeat; varying vec3 vDbP;
float dbH(vec3 p) { return fract(sin(dot(floor(p), vec3(12.9898, 78.233, 37.719))) * 43758.5453); }`)
        .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
{
  float cr = dbH(vDbP) * 0.6 + dbH(vDbP * 2.3 + 1.7) * 0.4;
  float ember = smoothstep(0.45, 0.9, cr) * vHeat;
  totalEmissiveRadiance += vec3(3.2, 1.0, 0.22) * ember * 1.6 + vec3(0.9, 0.25, 0.05) * vHeat * 0.35 + vec3(0.75, 0.24, 0.05) * smoothstep(0.25, 0.9, cr) * step(0.01, vHeat); // smouldering edges even far from fire
  diffuseColor.rgb *= 1.0 - vHeat * 0.45; // charred
}`);
    };
    dMat.customProgramCacheKey = () => 'debris-ember';
    this.debris = new THREE.InstancedMesh(dGeo, dMat, this.debrisMax);
    this.debris.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.debris.count = 0; this.debris.castShadow = true; this.debris.frustumCulled = false;
    scene.add(this.debris);
    this.dState = [];
    this._m = new THREE.Matrix4(); this._q = new THREE.Quaternion(); this._e = new THREE.Euler(); this._s = new THREE.Vector3();
  }

  // ---------------------------------------------------------------- primitives
  light(pos, color, intensity, dist, life) {
    const l = this.lights[this.lightIdx++ % this.lights.length];
    l.position.copy(pos); l.position.y += 3;
    l.color.set(color); l.distance = dist;
    l.userData.t = 0; l.userData.life = life; l.userData.i0 = intensity;
    l.intensity = intensity;
  }

  ring(x, z, r0, r1, color, life = 0.6, width = 0.12, y = 0.6) {
    const m = this.rings[this.ringIdx++ % this.rings.length];
    m.visible = true;
    m.position.set(x, y, z);
    m.material.uniforms.uColor.value.set(color);
    m.material.uniforms.uWidth.value = width;
    Object.assign(m.userData, { t: 0, life, r0, r1 });
    m.scale.setScalar(r0);
    return m;
  }

  beam(from, to, color, width = 1.5, life = 0.35) {
    const g = this.beams[this.beamIdx++ % this.beams.length];
    g.visible = true;
    g.position.copy(from);
    _v.subVectors(to, from);
    const len = _v.length();
    g.scale.set(width, len, width);
    g.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), _v.normalize());
    g.userData.mat.uniforms.uColor.value.set(color).multiplyScalar(width > 6 ? 0.9 : 2.2);
    g.userData.t = 0; g.userData.life = life;
    return g;
  }

  shake(amount, x, z) { if (this.onShake) this.onShake(amount, x, z); }

  waterY(x, z) { return sampleWaves(x, z, this.time, _w).y; }

  // ---------------------------------------------------------------- composites
  muzzle(pos, dir, scale = 1, kind = 'ball') {
    const P = this.p;
    const smokeHeavy = kind === 'ball';
    const flashCol = kind === 'laser' || kind === 'pulse' ? [0.5, 0.9, 1.6] : [2.4, 1.5, 0.7];
    P.add.emit({ x: pos.x, y: pos.y, z: pos.z, life: 0.09, s0: 6 * scale, s1: 9 * scale, r: flashCol[0], g: flashCol[1], b: flashCol[2], a0: 1, a1: 0, kind: 0 });
    for (let i = 0; i < 5; i++) {
      const s = rnd(4, 14) * scale;
      P.add.emit({ x: pos.x, y: pos.y, z: pos.z, vx: dir.x * s + rnd(-2, 2), vy: dir.y * s + rnd(0, 2), vz: dir.z * s + rnd(-2, 2),
        life: rnd(0.08, 0.18), s0: 3.5 * scale, s1: 1.5 * scale, r: flashCol[0], g: flashCol[1] * 0.9, b: flashCol[2], a0: 1, a1: 0, kind: 4, drag: 5 });
    }
    if (kind === 'laser' || kind === 'pulse') return;
    // black powder (sail era) = thick white banks; cordite = a brief grey puff
    const n = smokeHeavy ? 5 : 2;
    for (let i = 0; i < n; i++) {
      const s = rnd(3, 11) * scale;
      const c = smokeHeavy ? rnd(0.7, 0.85) : rnd(0.3, 0.42);
      P.alpha.emit({ x: pos.x + dir.x * 2, y: pos.y, z: pos.z + dir.z * 2, vx: dir.x * s + rnd(-1, 1), vy: rnd(0.5, 2.5), vz: dir.z * s + rnd(-1, 1),
        life: rnd(1.2, smokeHeavy ? 3.0 : 1.6), s0: 2.5 * scale, s1: rnd(6, 10) * scale * (smokeHeavy ? 1.3 : 0.9), r: c, g: c, b: c * 1.02, a0: smokeHeavy ? 0.45 : 0.28, a1: 0, kind: 1, drag: 1.8 });
    }
    if (scale > 1.2) this.light(pos, 0xffb070, 18 * scale, 40 * scale, 0.12);
  }

  splash(x, z, scale = 1, alpha = 0.85) {
    const y = this.waterY(x, z);
    const P = this.p;
    const n = Math.round(14 * scale);
    for (let i = 0; i < n; i++) {
      const a = Math.random() * 6.283, sp = rnd(1, 5) * scale;
      P.alpha.emit({ x: x + Math.cos(a) * scale, y, z: z + Math.sin(a) * scale, vx: Math.cos(a) * sp, vy: rnd(10, 26) * Math.sqrt(scale), vz: Math.sin(a) * sp,
        life: rnd(0.8, 1.4), s0: rnd(1.5, 3) * scale, s1: rnd(4, 7) * scale, r: 0.95, g: 0.98, b: 1.0, a0: alpha, a1: 0, kind: 3, grav: 26 });
    }
    // central column
    P.alpha.emit({ x, y: y + 2 * scale, z, vy: 6 * scale, life: 1.1, s0: 3 * scale, s1: 9 * scale, r: 0.92, g: 0.96, b: 1, a0: alpha * 0.8, a1: 0, kind: 3, grav: 4 });
    this.decals.add(x, z, 4 * scale, 2.5, 1, 0.8, 2.5);
    this.decals.add(x, z, 5 * scale, 6, 0, 0.9, 0.6);
  }

  hitSpark(pos, scale = 1, color = [2.2, 1.4, 0.6]) {
    const P = this.p;
    P.add.emit({ x: pos.x, y: pos.y, z: pos.z, life: 0.1, s0: 5 * scale, s1: 7 * scale, r: color[0], g: color[1], b: color[2], a0: 1, a1: 0 });
    for (let i = 0; i < 10; i++) {
      const a = Math.random() * 6.283, e = rnd(0.2, 1.2), sp = rnd(15, 40) * scale;
      P.add.emit({ x: pos.x, y: pos.y, z: pos.z, vx: Math.cos(a) * Math.cos(e) * sp, vy: Math.sin(e) * sp, vz: Math.sin(a) * Math.cos(e) * sp,
        life: rnd(0.25, 0.6), s0: 0.9 * scale, s1: 0.3, r: 2.5, g: 1.6, b: 0.6, a0: 1, a1: 0, kind: 2, grav: 30, drag: 1.5 });
    }
    P.alpha.emit({ x: pos.x, y: pos.y, z: pos.z, vy: 2, life: 1.2, s0: 2 * scale, s1: 7 * scale, r: 0.3, g: 0.29, b: 0.28, a0: 0.5, a1: 0, kind: 1 });
  }

  explosion(pos, scale = 1, opts = {}) {
    const P = this.p;
    const water = opts.water !== false;
    const hot = opts.color || [2.4, 1.35, 0.5];
    const S = scale;
    // 0. water first, so fire and smoke layer over the spray
    if (water) {
      this.splash(pos.x, pos.z, scale * 0.7, 0.55);
      this.decals.add(pos.x, pos.z, 9 * scale, 1.2, 1, 0.9, 3);
      this.decals.add(pos.x, pos.z, 6 * scale, 10, 2, 0.55, 0.5);
      this.ring(pos.x, pos.z, 2 * scale, 20 * scale, 0xffc890, 0.45, 0.07);
    }
    // 1. flash (brief, additive)
    P.add.emit({ x: pos.x, y: pos.y + 1, z: pos.z, life: 0.08, s0: 9 * S, s1: 13 * S, r: 2.2, g: 1.8, b: 1.3, a0: 0.9, a1: 0 });
    // 2. white-hot core
    for (let i = 0; i < 4; i++) P.add.emit({ x: pos.x + rnd(-1, 1) * S, y: pos.y + 1.5, z: pos.z + rnd(-1, 1) * S, vy: rnd(1, 4) * S, life: rnd(0.15, 0.28), s0: 3.5 * S, s1: 5 * S, r: 2.6, g: 2.0, b: 1.2, a0: 0.8, a1: 0, kind: 0 });
    // 3. fireball: occluding, self-lit puffs cooling from yellow to deep red
    const nf = Math.round(8 + 6 * S);
    for (let i = 0; i < nf; i++) {
      const a = Math.random() * 6.283, e = rnd(0.1, 1.3), sp = rnd(3, 11) * S;
      P.alpha.emit({ x: pos.x, y: pos.y + 1.5, z: pos.z, vx: Math.cos(a) * Math.cos(e) * sp, vy: Math.sin(e) * sp + 2 * S, vz: Math.sin(a) * Math.cos(e) * sp,
        life: rnd(0.5, 0.95) * Math.sqrt(S), s0: rnd(4, 6) * S, s1: rnd(9, 13) * S, r: hot[0], g: hot[1], b: hot[2], r1: 0.28, g1: 0.06, b1: 0.02, a0: 1, a1: 0, kind: 5, drag: 3.2 });
    }
    // 4. embers
    for (let i = 0; i < 12 * S; i++) {
      const a = Math.random() * 6.283, e = rnd(0.3, 1.4), sp = rnd(18, 50) * S;
      P.add.emit({ x: pos.x, y: pos.y + 1, z: pos.z, vx: Math.cos(a) * Math.cos(e) * sp, vy: Math.sin(e) * sp, vz: Math.sin(a) * Math.cos(e) * sp,
        life: rnd(0.6, 1.3), s0: rnd(0.7, 1.2) * Math.sqrt(S), s1: 0.2, r: 2.6, g: 1.3, b: 0.4, a0: 1, a1: 0.1, kind: 2, grav: 22, drag: 0.8 });
    }
    // 5. thick rolling smoke (lit by the sun) for contrast
    for (let i = 0; i < 7 + 6 * S; i++) {
      const a = Math.random() * 6.283, sp = rnd(2, 6) * S;
      const c = rnd(0.07, 0.14);
      P.alpha.emit({ x: pos.x + rnd(-2, 2) * S, y: pos.y + rnd(2, 5) * S, z: pos.z + rnd(-2, 2) * S, vx: Math.cos(a) * sp, vy: rnd(3, 8) * S, vz: Math.sin(a) * sp,
        life: rnd(2.6, 4.6) * Math.sqrt(S), s0: 4 * S, s1: rnd(15, 22) * S, r: c + 0.42, g: c * 0.95 + 0.16, b: c * 0.9 + 0.04, r1: c, g1: c * 0.97, b1: c * 0.95, a0: 0.82, a1: 0, kind: 1, drag: 1.1 }); // fire-lit from inside, cooling to soot
    }
    // 6. debris
    const nd = Math.round(4 * Math.min(scale, 2.5));
    for (let i = 0; i < nd; i++) this.spawnDebris(pos, scale);
    // 8. light, shockwave, shake
    this.light(pos, 0xff8a40, 14 * Math.min(scale, 2), 40 * Math.min(scale, 2.2), 0.28 + 0.06 * scale);
    if (scale >= 1.6) this.renderer.shockwave(pos, Math.min(1.5, scale * 0.5), 0.6);
    this.shake(0.12 * scale, pos.x, pos.z);
  }

  /** Hypersonic / nuke-lite impact. */
  megaExplosion(pos, radius) {
    const s = Math.min(2.6, radius / 12);
    this.explosion(pos, s);
    this.p.add.emit({ x: pos.x, y: pos.y + 4, z: pos.z, life: 0.3, s0: radius * 0.9, s1: radius * 1.4, r: 1.6, g: 1.3, b: 1.0, a0: 0.8, a1: 0 });
    this.ring(pos.x, pos.z, 4, radius * 2.2, 0xffe0b0, 0.9, 0.05);
    this.ring(pos.x, pos.z, 2, radius * 1.4, 0xff7a30, 1.2, 0.2);
    // low base surge of spray racing outward
    for (let i = 0; i < 18; i++) {
      const a = Math.random() * 6.283, sp = rnd(14, 32);
      this.p.alpha.emit({ x: pos.x + Math.cos(a) * 4, y: pos.y + 1, z: pos.z + Math.sin(a) * 4, vx: Math.cos(a) * sp, vy: rnd(0, 2), vz: Math.sin(a) * sp, life: rnd(1.6, 2.6),
        s0: 5, s1: 13, r: 0.85, g: 0.87, b: 0.9, a0: 0.32, a1: 0, kind: 3, drag: 1.6 });
    }
    // rising mushroom column of dark smoke with a fiery stem
    for (let i = 0; i < 22; i++) {
      const up = rnd(10, 26), c = rnd(0.06, 0.12);
      this.p.alpha.emit({ x: pos.x + rnd(-3, 3), y: pos.y + rnd(2, 8), z: pos.z + rnd(-3, 3), vx: rnd(-3, 3), vy: up, vz: rnd(-3, 3), life: rnd(3, 5),
        s0: radius * 0.25, s1: radius * rnd(0.6, 0.9), r: c, g: c * 0.95, b: c * 0.9, a0: 0.85, a1: 0, kind: 1, drag: 0.9 });
      if (i < 10) this.p.alpha.emit({ x: pos.x + rnd(-2, 2), y: pos.y + 3, z: pos.z + rnd(-2, 2), vy: up * 0.8, life: rnd(0.8, 1.4), s0: radius * 0.2, s1: radius * 0.45,
        r: 2.4, g: 1.2, b: 0.45, r1: 0.4, g1: 0.08, b1: 0.02, a0: 1, a1: 0, kind: 5, drag: 1.2 });
    }
    this.renderer.shockwave(pos, 2.2, 0.9);
    this.renderer.grade.uniforms.uFlash.value = Math.min(0.12, this.renderer.grade.uniforms.uFlash.value + 0.08);
    this.shake(1.2, pos.x, pos.z);
  }

  spawnDebris(pos, scale = 1) {
    let d;
    if (this.dState.length < this.debrisMax) { d = {}; this.dState.push(d); }
    else {
      this.dCursor = ((this.dCursor || 0) + 1) % this.debrisMax;
      d = this.dState[this.dCursor];
    }
    const a = Math.random() * 6.283, sp = rnd(8, 24) * scale;
    d.p = new THREE.Vector3(pos.x, pos.y + 2, pos.z);
    d.v = new THREE.Vector3(Math.cos(a) * sp * 0.5, rnd(12, 28) * Math.sqrt(scale), Math.sin(a) * sp * 0.5);
    d.r = new THREE.Vector3(rnd(0, 6), rnd(0, 6), rnd(0, 6));
    d.w = new THREE.Vector3(rnd(-8, 8), rnd(-8, 8), rnd(-8, 8));
    d.s = rnd(0.55, 1.35) * Math.min(1.6, Math.sqrt(scale)); // chunkier splinters: embers must read at gameplay zoom
    d.alive = true; d.smoke = Math.random() < 0.5; d.heat = d.smoke ? rnd(0.7, 1) : rnd(0.25, 0.5);
  }

  emp(x, z, radius) {
    const y = this.waterY(x, z) + 2;
    this.ring(x, z, 2, radius, 0x66ccff, 0.6, 0.06);
    this.ring(x, z, 1, radius * 0.8, 0xaa88ff, 0.9, 0.15);
    this.p.add.emit({ x, y, z, life: 0.2, s0: radius, s1: radius * 1.6, r: 0.6, g: 1.2, b: 2.8, a0: 1, a1: 0 });
    for (let i = 0; i < 40; i++) {
      const a = Math.random() * 6.283, sp = rnd(20, 60);
      this.p.add.emit({ x, y, z, vx: Math.cos(a) * sp, vy: rnd(-2, 8), vz: Math.sin(a) * sp, life: rnd(0.2, 0.5),
        s0: 1.2, s1: 0.2, r: 0.8, g: 1.6, b: 3, a0: 1, a1: 0, kind: 2, drag: 3 });
    }
    this.light(new THREE.Vector3(x, y, z), 0x66bbff, 60, radius * 2.5, 0.4);
    this.renderer.shockwave(new THREE.Vector3(x, y, z), 1.0, 0.5);
    this.shake(0.3, x, z);
  }

  /** Transformation moment: a pillar of light, rising rings, sparks. */
  ageUp(pos, color) {
    const c = new THREE.Color(color);
    // ascension light is warm gold: it must read apart from the team-blue hex dome it rises through
    const gold = 0xffc766, gc = new THREE.Color(gold);
    const b = this.beam(new THREE.Vector3(pos.x, -2, pos.z), new THREE.Vector3(pos.x, 130, pos.z), gold, 5.5, 1.5);
    b.userData.pillar = true;
    for (let i = 0; i < 3; i++) this.ring(pos.x, pos.z, 3, 40 + i * 25, color, 1.0 + i * 0.35, 0.06);
    for (let i = 0; i < 80; i++) {
      const a = Math.random() * 6.283, r = rnd(4, 20);
      this.p.add.emit({ x: pos.x + Math.cos(a) * r, y: rnd(0, 6), z: pos.z + Math.sin(a) * r, vx: Math.cos(a) * 3, vy: rnd(15, 45), vz: Math.sin(a) * 3,
        life: rnd(0.8, 1.8), s0: rnd(0.8, 1.8), s1: 0.1, r: (i % 3 ? c.r : gc.r) * 3, g: (i % 3 ? c.g : gc.g) * 3, b: (i % 3 ? c.b : gc.b) * 3, a0: 1, a1: 0, kind: 2, drag: 0.5 });
    }
    this.light(pos, color, 80, 120, 1.2);
    this.renderer.shockwave(pos, 1.4, 0.8);
    this.shake(0.35, pos.x, pos.z);
  }

  /** Continuous emitters (called per-frame by entities) */
  trailSmoke(pos, scale = 1, dark = 0.8, alpha = 0.35) {
    const c = dark * rnd(0.85, 1.05);
    this.p.alpha.emit({ x: pos.x, y: pos.y, z: pos.z, vy: rnd(0.2, 1.2), life: rnd(0.8, 1.6), s0: 1.2 * scale, s1: 4 * scale, r: c, g: c, b: c, a0: alpha, a1: 0, kind: 1, drag: 1 });
  }
  trailGlow(pos, color, size = 2, life = 0.18) {
    this.p.add.emit({ x: pos.x, y: pos.y, z: pos.z, life, s0: size, s1: size * 0.3, r: color[0], g: color[1], b: color[2], a0: 1, a1: 0, kind: 0 });
  }
  fire(pos, scale = 1) {
    this.p.add.emit({ x: pos.x + rnd(-1, 1) * scale, y: pos.y, z: pos.z + rnd(-1, 1) * scale, vx: rnd(-1, 1), vy: rnd(4, 9), vz: rnd(-1, 1),
      life: rnd(0.3, 0.6), s0: 2.5 * scale, s1: 0.8 * scale, r: 2.4, g: 1.0, b: 0.3, r1: 0.8, g1: 0.2, b1: 0.05, a0: 1, a1: 0, kind: 4 });
    if (Math.random() < 0.5) this.p.alpha.emit({ x: pos.x, y: pos.y + 2, z: pos.z, vx: rnd(-1, 1), vy: rnd(4, 8), vz: rnd(-1, 1),
      life: rnd(1.5, 2.8), s0: 2 * scale, s1: 9 * scale, r: 0.1, g: 0.09, b: 0.09, a0: 0.55, a1: 0, kind: 1, drag: 0.6 });
  }
  stackSmoke(pos, color = 0.25, scale = 1) {
    this.p.alpha.emit({ x: pos.x, y: pos.y, z: pos.z, vx: rnd(-0.5, 0.5), vy: rnd(3, 5), vz: rnd(-0.5, 0.5), life: rnd(1.8, 3), s0: 1.5 * scale, s1: 7 * scale, r: color, g: color, b: color * 1.05, a0: 0.45, a1: 0, kind: 1, drag: 0.8 });
  }

  update(dt, time) {
    this.time = time;
    FX_TIME.value = time;
    for (const l of this.lights) {
      const u = l.userData;
      if (u.life <= 0) continue;
      u.t += dt;
      const k = u.t / u.life;
      l.intensity = k >= 1 ? 0 : u.i0 * (1 - k) * (1 - k);
      if (k >= 1) u.life = 0;
    }
    for (const m of this.rings) {
      if (!m.visible) continue;
      const u = m.userData;
      u.t += dt;
      const k = u.t / u.life;
      if (k >= 1) { m.visible = false; continue; }
      const e = 1 - Math.pow(1 - k, 3);
      m.scale.setScalar(u.r0 + (u.r1 - u.r0) * e);
      m.position.y = 0;
      m.material.uniforms.uK.value = k;
    }
    for (const g of this.beams) {
      if (!g.visible) continue;
      const u = g.userData;
      u.t += dt;
      const k = u.t / u.life;
      if (k >= 1) { g.visible = false; continue; }
      u.mat.uniforms.uAlpha.value = u.pillar ? Math.sin(k * Math.PI) : (1 - k) * (1 - k);
      if (!u.pillar) g.scale.x = g.scale.z = g.scale.z * (1 - dt * 2);
    }
    // debris
    let n = 0;
    for (const d of this.dState) {
      if (!d.alive) continue;
      d.v.y -= 32 * dt;
      d.p.addScaledVector(d.v, dt);
      d.r.addScaledVector(d.w, dt);
      d.heat = Math.max(0, d.heat - dt * 0.35);
      if (d.smoke && Math.random() < 0.6) this.trailSmoke(d.p, 0.8, 0.15, 0.5);
      if (d.heat > 0.35 && Math.random() < 0.5) // licking flame + sparks off burning chunks
        this.p.alpha.emit({ x: d.p.x, y: d.p.y, z: d.p.z, vx: d.v.x * 0.1, vy: 2, vz: d.v.z * 0.1, life: rnd(0.25, 0.45), s0: 1.1 * d.s, s1: 2.2 * d.s,
          r: 2.2, g: 1.0, b: 0.35, r1: 0.35, g1: 0.08, b1: 0.02, a0: 0.9 * d.heat, a1: 0, kind: 5, drag: 2 });
      if (d.p.y < this.waterY(d.p.x, d.p.z) - 0.5 && d.v.y < 0) {
        d.alive = false;
        this.p.alpha.emit({ x: d.p.x, y: d.p.y + 0.5, z: d.p.z, vy: 8, life: 0.6, s0: 1.5, s1: 3.5, r: 0.95, g: 0.97, b: 1, a0: 0.8, a1: 0, kind: 3, grav: 20 });
        this.decals.add(d.p.x, d.p.z, 2, 1.4, 1, 0.6, 2);
        continue;
      }
      this._e.set(d.r.x, d.r.y, d.r.z);
      this._q.setFromEuler(this._e);
      this._s.setScalar(d.s);
      this._m.compose(d.p, this._q, this._s);
      this.dHeat.array[n] = d.heat || 0;
      this.debris.setMatrixAt(n++, this._m);
    }
    this.dHeat.needsUpdate = true;
    this.debris.count = n;
    this.debris.instanceMatrix.needsUpdate = true;
  }
}
