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
    // rain: GPU-animated streak quads. Each drop has its own speed, length,
    // brightness and phase; the volume tiles around the camera focus so drops
    // stay fixed in the world while the box follows the view. Streaks are
    // expanded in screen space (>= ~1.3 px) so they never alias away.
    const quad = new THREE.InstancedBufferGeometry();
    quad.setAttribute('position', new THREE.BufferAttribute(new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0]), 3));
    quad.setIndex([0, 1, 2, 1, 3, 2]);
    const seed = new Float32Array(RAIN_N * 4), var2 = new Float32Array(RAIN_N * 3);
    for (let i = 0; i < RAIN_N; i++) {
      // bias drops toward the view centre: that's where the eye (and the camera frustum) is
      const r = Math.pow(Math.random(), 0.75) * 210, a = Math.random() * Math.PI * 2;
      seed[i * 4] = Math.cos(a) * r; seed[i * 4 + 1] = Math.sin(a) * r;
      seed[i * 4 + 2] = Math.random(); seed[i * 4 + 3] = i / RAIN_N;
      var2[i * 3] = rnd(0.8, 1.25); var2[i * 3 + 1] = rnd(0.6, 1.5); var2[i * 3 + 2] = rnd(0.35, 1);
    }
    quad.setAttribute('aSeed', new THREE.InstancedBufferAttribute(seed, 4));
    quad.setAttribute('aVar', new THREE.InstancedBufferAttribute(var2, 3));
    quad.instanceCount = RAIN_N;
    this.rainU = {
      uTime: { value: 0 }, uFocus: { value: new THREE.Vector3() }, uK: { value: 0 }, uCount: { value: 0 },
      uWind: { value: new THREE.Vector2(22, 6) }, uRes: { value: new THREE.Vector2(1600, 900) },
      uColor: { value: new THREE.Color(0.62, 0.68, 0.76) }, uFlash: renderer.grade.uniforms.uFlash,
    };
    this.rainMat = new THREE.ShaderMaterial({
      uniforms: this.rainU, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
      vertexShader: /* glsl */`
        attribute vec4 aSeed; attribute vec3 aVar;
        uniform float uTime, uK, uCount; uniform vec3 uFocus; uniform vec2 uWind, uRes;
        varying vec2 vUv; varying float vA;
        const float H = 130.0, FALL = 150.0, BOX = 420.0;
        void main() {
          vUv = position.xy;
          float live = step(aSeed.w, uCount);
          float sp = FALL * aVar.x;
          float cyc = H / sp;
          float t = uTime / cyc + aSeed.z;
          float ph = fract(t);
          vec3 vel = vec3(uWind.x, -sp, uWind.y);
          // world position: drifts with the wind, wrapped into a box around the focus
          vec2 xz = aSeed.xy + uFocus.xz + uWind * (ph * cyc);
          xz = uFocus.xz + mod(xz - uFocus.xz + BOX * 0.5, BOX) - BOX * 0.5;
          vec3 head = vec3(xz.x, H * (1.0 - ph), xz.y);
          vec3 tail = head - normalize(vel) * (3.2 * aVar.y + 1.2);
          vec4 ch = projectionMatrix * viewMatrix * vec4(head, 1.0);
          vec4 ct = projectionMatrix * viewMatrix * vec4(tail, 1.0);
          vec2 sh = ch.xy / ch.w * uRes, st = ct.xy / ct.w * uRes;
          vec2 d = st - sh; float len = length(d);
          d = len > 1e-3 ? d / len : vec2(0.0, 1.0);
          vec2 perp = vec2(-d.y, d.x);
          vec4 c = mix(ch, ct, position.y);
          float wpx = 1.6 + 40.0 / max(c.w, 1.0);   // near drops are fatter
          c.xy += perp * (position.x - 0.5) * wpx / uRes * 2.0 * c.w;
          gl_Position = c;
          // fade in near the top, out right above the sea, and very close to the lens
          vA = live * aVar.z * smoothstep(0.0, 0.08, ph) * smoothstep(1.0, 0.94, ph) * smoothstep(4.0, 22.0, c.w) * uK;
        }`,
      fragmentShader: /* glsl */`
        uniform vec3 uColor; uniform float uFlash;
        varying vec2 vUv; varying float vA;
        void main() {
          float across = 1.0 - abs(vUv.x - 0.5) * 2.0;
          float along = mix(1.0, 0.15, vUv.y);           // bright head, fading tail
          float a = across * across * along * vA;
          gl_FragColor = vec4(uColor * (0.85 + uFlash * 8.0) * a, 1.0);
        }`,
    });
    this.rain = new THREE.Mesh(quad, this.rainMat);
    this.rain.frustumCulled = false;
    this.rain.renderOrder = 8;
    this.rain.visible = false;
    scene.add(this.rain);
    this.splashAcc = 0;
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
    CLOUD.uCloudAmt.value = 0.6 + k * 0.3;
    // rain
    this.rain.visible = k > 0.01;
    if (this.rain.visible) {
      const u = this.rainU;
      u.uTime.value += dt; u.uK.value = Math.min(1, k * 1.2); u.uCount.value = Math.min(1, k * 1.3);
      u.uFocus.value.set(focus.x, 0, focus.z);
      u.uRes.value.set(window.innerWidth, window.innerHeight);
      // impact rings pock the sea around the view
      this.splashAcc += dt * 150 * k;
      while (this.splashAcc >= 1) {
        this.splashAcc -= 1;
        const r = Math.pow(Math.random(), 0.6) * 150, a = Math.random() * Math.PI * 2;
        this.fx.decals.add(focus.x + Math.cos(a) * r, focus.z + Math.sin(a) * r, rnd(0.35, 1.2), 0.4, 1, 0.16 * k, 2.4);
      }
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
