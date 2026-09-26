import * as THREE from 'three';
import { WAVE_UNIFORMS } from './waves.js';
import { CLOUD } from './cloudShadow.js';

// Squall system: a storm front rolls through mid-match. Drives sky grading,
// fog, swell height, rain, lightning and thunder. `k` (0..1) is intensity.
const RAIN_N = 2600;
const rnd = (a, b) => a + Math.random() * (b - a);

export class Weather {
  constructor(scene, fx, renderer, audio) {
    this.scene = scene; this.fx = fx; this.R = renderer; this.audio = audio;
    this.k = 0; this.target = 0;
    this.boltT = 3;
    // rain: short line segments that fall around the camera focus
    const pos = new Float32Array(RAIN_N * 6);
    this.seed = new Float32Array(RAIN_N * 3);
    for (let i = 0; i < RAIN_N; i++) {
      this.seed[i * 3] = rnd(-200, 200); this.seed[i * 3 + 1] = rnd(0, 120); this.seed[i * 3 + 2] = rnd(-200, 200);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3).setUsage(THREE.DynamicDrawUsage));
    this.rainGeo = g;
    this.rainMat = new THREE.LineBasicMaterial({ color: 0xaab8c8, transparent: true, opacity: 0, depthWrite: false, fog: true });
    this.rain = new THREE.LineSegments(g, this.rainMat);
    this.rain.frustumCulled = false;
    this.rain.renderOrder = 8;
    scene.add(this.rain);
    this.bolts = [];
  }

  /** Begin (1) or end (0) the storm. */
  set(on) { this.target = on ? 1 : 0; }

  /** Blend storm colours into the sky state (called after sky.setTime). */
  grade(sky) {
    const k = this.k;
    if (k <= 0.001) return;
    const u = sky.uniforms;
    const storm = new THREE.Color(0.16, 0.19, 0.23);
    u.uZenith.value.lerp(new THREE.Color(0.05, 0.065, 0.085), k * 0.85);
    u.uHorizon.value.lerp(storm, k * 0.8);
    u.uCloudLit.value.lerp(new THREE.Color(0.42, 0.45, 0.5), k * 0.8);
    u.uCloudDark.value.lerp(new THREE.Color(0.08, 0.09, 0.11), k * 0.8);
    u.uSunColor.value.multiplyScalar(1 - k * 0.8);
    sky.sun.intensity *= 1 - k * 0.8;
    sky.hemi.intensity = 0.55 + k * 0.1;
    sky.hemi.color.lerp(new THREE.Color(0.45, 0.5, 0.58), k);
    sky.fogColor.lerp(new THREE.Color(0.2, 0.23, 0.27), k * 0.85);
    if (this.scene.fog) { this.scene.fog.color.copy(sky.fogColor); this.scene.fog.density = 0.00042 + k * 0.0009; }
    sky.exposure *= 1 - k * 0.06;
  }

  update(dt, focus, cam) {
    this.k += Math.sign(this.target - this.k) * Math.min(Math.abs(this.target - this.k), dt / 7);
    const k = this.k;
    WAVE_UNIFORMS.uWaveAmp.value = 1 + k * 0.75;
    if (Math.abs((this.lastAudioK ?? -1) - k) > 0.02) { this.lastAudioK = k; this.audio.setStorm(k); }
    CLOUD.uCloudAmt.value = 0.5 + k * 0.35;
    // rain
    this.rainMat.opacity = k * 0.42;
    this.rain.visible = k > 0.01;
    if (this.rain.visible) {
      const p = this.rainGeo.attributes.position.array;
      const n = Math.floor(RAIN_N * Math.min(1, k * 1.3));
      const wind = 18, fall = 150;
      for (let i = 0; i < RAIN_N; i++) {
        const s = this.seed;
        s[i * 3 + 1] -= fall * dt;
        s[i * 3] += wind * dt * 0.3;
        if (s[i * 3 + 1] < 0) {
          s[i * 3 + 1] += 120; s[i * 3] = rnd(-200, 200); s[i * 3 + 2] = rnd(-200, 200);
          if (i < 60 && Math.random() < 0.5) this.fx.decals.add(focus.x + s[i * 3], focus.z + s[i * 3 + 2], rnd(1, 2.4), 0.6, 1, 0.35 * k, 2);
        }
        const x = focus.x + s[i * 3], y = s[i * 3 + 1], z = focus.z + s[i * 3 + 2];
        const o = i * 6;
        if (i >= n) { p[o] = p[o + 3] = 1e5; continue; }
        p[o] = x; p[o + 1] = y; p[o + 2] = z;
        p[o + 3] = x - wind * 0.035; p[o + 4] = y + 3.2; p[o + 5] = z;
      }
      this.rainGeo.attributes.position.needsUpdate = true;
    }
    // lightning
    if (k > 0.55) {
      this.boltT -= dt;
      if (this.boltT <= 0) {
        this.boltT = rnd(2.5, 7);
        this.strike(focus.x + rnd(-260, 260), focus.z + rnd(-200, 120));
      }
    }
    for (let i = this.bolts.length - 1; i >= 0; i--) {
      const b = this.bolts[i];
      b.t += dt;
      if (b.t > 0.08 && !b.second) { b.second = true; this.R.grade.uniforms.uFlash.value = Math.max(this.R.grade.uniforms.uFlash.value, 0.18); }
      if (b.t > 1.4) { this.bolts.splice(i, 1); this.audio.play('explosionBig', { x: b.x, z: b.z, vol: 0.9, pitch: 0.45 }); }
    }
  }

  strike(x, z) {
    // forked bolt: jagged beam segments from the cloud base to the sea
    let px = x + rnd(-30, 30), py = 230, pz = z + rnd(-30, 30);
    const segs = 9;
    for (let i = 0; i < segs; i++) {
      const t = (i + 1) / segs;
      const nx = x + (px - x) * (1 - t) + rnd(-10, 10) * (1 - t), ny = 230 * (1 - t), nz = z + (pz - z) * (1 - t) + rnd(-10, 10) * (1 - t);
      this.fx.beam(new THREE.Vector3(px, py, pz), new THREE.Vector3(nx, ny, nz), 0xc8d8ff, 2.4, 0.28);
      if (i === 4) this.fx.beam(new THREE.Vector3(nx, ny, nz), new THREE.Vector3(nx + rnd(-40, 40), ny - rnd(20, 50), nz + rnd(-40, 40)), 0xb0c4ff, 1.2, 0.2);
      px = nx; py = ny; pz = nz;
    }
    this.fx.light(new THREE.Vector3(x, 40, z), 0xbfd0ff, 160, 420, 0.35);
    this.fx.splash(x, z, 2.2);
    this.fx.ring(x, z, 2, 30, 0xbfd0ff, 0.5, 0.06);
    this.R.grade.uniforms.uFlash.value = 0.28;
    this.bolts.push({ t: 0, x, z });
  }
}
