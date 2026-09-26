import * as THREE from 'three';
import { Unit } from './units.js';
import { sampleWaves } from '../render/waves.js';
import { applyCloudShadow } from '../render/cloudShadow.js';

// The Leviathan: a neutral sea-serpent objective that rises mid-match.
// Body = chain of scaled segments along an animated arching spline that
// breaches the surface; attacks are telegraphed tail slams and a bite.
export const LEVIATHAN = { x: 0, z: 108, riseAt: 330, hp: 17000, armor: 0.25, radius: 20, gold: 350, buffDur: 75 };

const SEG = 26;
const rnd = (a, b) => a + Math.random() * (b - a);
const _w = { y: 0 };

function serpentMaterials() {
  const skin = applyCloudShadow(new THREE.MeshStandardMaterial({ color: 0x1d3b3a, roughness: 0.42, metalness: 0.25 }));
  const belly = applyCloudShadow(new THREE.MeshStandardMaterial({ color: 0x8a8a6a, roughness: 0.6 }));
  const spine = applyCloudShadow(new THREE.MeshStandardMaterial({ color: 0x3a2a24, roughness: 0.5, metalness: 0.2 }));
  const glow = new THREE.MeshStandardMaterial({ color: 0x000000, emissive: 0x7dfff0, emissiveIntensity: 5 });
  return { skin, belly, spine, glow };
}

export class Leviathan extends Unit {
  constructor(G) {
    super(G, 'boss', 2);
    this.name = 'The Leviathan';
    this.maxHp = this.hp = LEVIATHAN.hp;
    this.armor = LEVIATHAN.armor;
    this.radius = LEVIATHAN.radius;
    this.x = LEVIATHAN.x; this.z = LEVIATHAN.z;
    this.risen = false; this.rise = 0; this.t = 0;
    this.slamT = 4; this.biteT = 2.5; this.regenT = 0;
    this.pending = [];
    this.alive = false; // dormant until it rises
    const M = serpentMaterials();
    const root = new THREE.Group();
    this.segs = [];
    const segGeo = new THREE.SphereGeometry(1, 20, 14);
    const spineGeo = new THREE.ConeGeometry(0.35, 1.6, 6);
    for (let i = 0; i < SEG; i++) {
      const g = new THREE.Group();
      const body = new THREE.Mesh(segGeo, M.skin); body.scale.set(1, 0.92, 1.35); body.castShadow = true;
      const bel = new THREE.Mesh(segGeo, M.belly); bel.scale.set(0.82, 0.55, 1.2); bel.position.y = -0.42;
      const sp = new THREE.Mesh(spineGeo, M.spine); sp.position.set(0, 1.05, 0); sp.rotation.x = -0.5;
      g.add(body, bel, sp);
      root.add(g);
      this.segs.push(g);
    }
    // head: skull, jaw, fins, glowing eyes
    const head = new THREE.Group();
    const skull = new THREE.Mesh(new THREE.ConeGeometry(1.25, 4.2, 12), M.skin); skull.rotation.x = Math.PI / 2; skull.scale.set(1.1, 1, 0.75); skull.castShadow = true;
    const jaw = new THREE.Mesh(new THREE.ConeGeometry(0.95, 3.4, 10), M.belly); jaw.rotation.x = Math.PI / 2; jaw.position.set(0, -0.7, -0.2); jaw.scale.set(1, 1, 0.5);
    const finL = new THREE.Mesh(new THREE.ConeGeometry(0.4, 3.2, 5), M.spine); finL.position.set(1.1, 0.8, -0.8); finL.rotation.set(-0.9, 0, -0.8);
    const finR = finL.clone(); finR.position.x = -1.1; finR.rotation.z = 0.8;
    const eyeGeo = new THREE.SphereGeometry(0.26, 10, 8);
    const eyeL = new THREE.Mesh(eyeGeo, M.glow); eyeL.position.set(0.72, 0.42, 0.7);
    const eyeR = eyeL.clone(); eyeR.position.x = -0.72;
    head.add(skull, jaw, finL, finR, eyeL, eyeR);
    this.jaw = jaw;
    root.add(head);
    this.head = head;
    root.visible = false;
    this.rig = { root, length: 60, beam: 20, height: 26, update() {} };
    G.scene.add(root);
  }

  get invulnerable() { return !this.risen; }

  /** Spline of the serpent: arches breaching the sea around the lair. */
  spine(u, t, out) {
    const ang = u * 5.2 + t * 0.35;
    const R = 16 + u * 30;
    const breach = Math.sin(u * Math.PI * 3.2 - t * 1.4) * 9 * (1 - u * 0.5) + (1 - u) * 10;
    const rise = this.rise;
    out.set(this.x + Math.cos(ang) * R, (breach - 6) * rise - (1 - rise) * 18, this.z + Math.sin(ang) * R * 0.75);
    return out;
  }

  emerge() {
    const G = this.G;
    this.risen = true; this.alive = true; this.rig.root.visible = true;
    G.ui.announce('THE LEVIATHAN RISES', 'Slay it for gold and the Leviathan\'s Blessing', '#7dfff0');
    G.audio.play('hypersonic', { x: this.x, z: this.z, vol: 1, pitch: 0.5 });
    G.audio.play('explosionBig', { x: this.x, z: this.z, vol: 1.2, pitch: 0.4 });
    G.audio.stinger('warning');
    for (let i = 0; i < 6; i++) G.combat.after(i * 0.25, () => G.fx.splash(this.x + rnd(-30, 30), this.z + rnd(-22, 22), 3.2));
    G.fx.ring(this.x, this.z, 10, 90, 0x7dfff0, 1.6, 0.05);
    G.fx.shake(0.8, this.x, this.z);
    G.ui.ping && G.ui.ping(this.x, this.z, '#7dfff0');
  }

  update(dt) {
    const G = this.G;
    this.t += dt;
    if (!this.risen) { if (G.time >= LEVIATHAN.riseAt) this.emerge(); else return; }
    if (!this.alive) return;
    this.rise = Math.min(1, this.rise + dt / 3);
    this.hitFlash = Math.max(0, this.hitFlash - dt);
    // regenerate when nobody is fighting it
    this.regenT -= dt;
    if (this.regenT <= 0) this.heal(this.maxHp * 0.02 * dt);
    const foes = G.heroes.filter((h) => h.alive && h.dist(this) < 105);
    // telegraphed tail slam: warning ring, then impact 1.1s later
    this.slamT -= dt;
    if (this.slamT <= 0 && foes.length && this.rise >= 1) {
      this.slamT = rnd(2.2, 3.2);
      const t = foes[(Math.random() * foes.length) | 0];
      const x = t.x + (t.vx || 0) * 0.6, z = t.z + (t.vz || 0) * 0.6;
      G.fx.ring(x, z, 18, 18, 0x7dfff0, 1.1, 0.06);
      this.pending.push({ x, z, t: 1.1 });
    }
    for (let i = this.pending.length - 1; i >= 0; i--) {
      const p = this.pending[i];
      p.t -= dt;
      if (p.t > 0) continue;
      this.pending.splice(i, 1);
      for (const h of G.units) {
        if (!h.alive || !h.isShip || (h.x - p.x) ** 2 + (h.z - p.z) ** 2 > 20 * 20) continue;
        G.combat.damage(h, 300 + G.time * 0.4, this);
        const d = Math.hypot(h.x - p.x, h.z - p.z) || 1;
        h.pushX = ((h.x - p.x) / d) * 40; h.pushZ = ((h.z - p.z) / d) * 40;
      }
      G.fx.splash(p.x, p.z, 3.4);
      G.fx.ring(p.x, p.z, 4, 34, 0xd8fff8, 0.7, 0.08);
      G.fx.shake(0.4, p.x, p.z);
      G.audio.play('explosionBig', { x: p.x, z: p.z, vol: 0.9, pitch: 0.55 });
    }
    // bite the nearest ship
    this.biteT -= dt;
    if (this.biteT <= 0 && foes.length) {
      this.biteT = 3.4;
      const t = foes.sort((a, b) => a.dist2(this) - b.dist2(this))[0];
      if (t.dist(this) < 70) {
        G.combat.damage(t, 420 + G.time * 0.5, this);
        G.fx.explosion(new THREE.Vector3(t.x, 3, t.z), 1.1, { color: [0.8, 2.2, 2.0] });
        G.audio.play('ram', { x: t.x, z: t.z, pitch: 0.6 });
        this.biteAt = this.t;
      }
    }
  }

  onDamaged() { this.regenT = 6; }

  sync(t) {
    if (!this.risen) return;
    const p = new THREE.Vector3(), q = new THREE.Vector3();
    for (let i = 0; i < SEG; i++) {
      const u = i / SEG;
      this.spine(u, t, p);
      this.spine(u + 0.01, t, q);
      const g = this.segs[i];
      g.position.copy(p);
      g.lookAt(q);
      const s = 3.8 * (1 - u * 0.72) + 0.6;
      g.scale.setScalar(s);
      // churn where the body cuts the surface
      const wy = sampleWaves(p.x, p.z, t, _w).y;
      if (Math.abs(p.y - wy) < s && Math.random() < 0.08) this.G.ocean.decals.add(p.x, p.z, s * 2.4, 2.2, 0, 0.6, 1.4);
    }
    // head leads the first segment, rearing up; jaw snaps on bite
    this.spine(0, t, p); this.spine(0.02, t, q);
    const dir = p.clone().sub(q).normalize();
    this.head.position.copy(p).addScaledVector(dir, 5).add(new THREE.Vector3(0, 3.5 * this.rise, 0));
    this.head.lookAt(this.head.position.clone().add(dir).add(new THREE.Vector3(0, -0.25, 0)));
    this.head.scale.setScalar(3.4);
    const bite = this.biteAt ? Math.max(0, 1 - (this.t - this.biteAt) / 0.5) : 0;
    this.jaw.rotation.x = Math.PI / 2 + 0.15 + Math.sin(this.t * 1.7) * 0.06 + bite * 0.55;
    this.x = LEVIATHAN.x; this.z = LEVIATHAN.z;
  }

  dispose() { this.G.scene.remove(this.rig.root); }
}
