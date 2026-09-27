import * as THREE from 'three';

// Pooled CPU-simulated particles drawn as a single Points draw call per
// blend mode. Sprite shapes are procedural (no textures):
//   kind 0 = soft glow, 1 = smoke puff, 2 = hard spark, 3 = water spray, 4 = flame lick

const VERT = /* glsl */ `
attribute vec4 aColor; attribute vec2 aSK; // size, kind
varying vec4 vColor; varying float vKind; varying float vSeed;
uniform float uScale;
void main() {
  vColor = aColor; vKind = aSK.y; vSeed = fract(position.x * 0.137 + position.z * 0.311);
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = clamp(aSK.x * uScale / -mv.z, 0.0, 512.0);
  gl_Position = projectionMatrix * mv;
}`;

const FRAG = /* glsl */ `
varying vec4 vColor; varying float vKind; varying float vSeed;
uniform vec3 uLight; uniform float uAdditive;
float h(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453); }
float nz(vec2 p){ vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.0-2.0*f);
  return mix(mix(h(i),h(i+vec2(1,0)),u.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),u.x),u.y); }
void main() {
  vec2 p = gl_PointCoord * 2.0 - 1.0;
  float r = length(p);
  if (r > 1.0) discard;
  float a;
  vec3 col = vColor.rgb;
  if (vKind < 0.5) {
    a = pow(max(1.0 - r, 0.0), 2.2);
  } else if (vKind < 1.5) {
    float n = nz(p * 2.3 + vSeed * 17.0) * 0.55 + nz(p * 5.1 - vSeed * 9.0) * 0.45;
    a = (1.0 - smoothstep(0.3, 1.0, r + (n - 0.5) * 0.8));
    // fake lighting: brighter top-left
    float lit = 0.75 + 0.35 * (-p.y * 0.6 - p.x * 0.3) + n * 0.2;
    col *= lit;
  } else if (vKind < 2.5) {
    a = (1.0 - smoothstep(0.0, 1.0, r)); a = a * a * a;
  } else if (vKind < 3.5) {
    float n = nz(p * 3.0 + vSeed * 31.0);
    a = (1.0 - smoothstep(0.2, 1.0, r + (n - 0.5) * 0.9)) * (0.6 + n * 0.5);
  } else if (vKind < 4.5) {
    float n = nz(vec2(p.x * 2.5, p.y * 1.5 + vSeed * 20.0));
    a = (1.0 - smoothstep(0.1, 1.0, r + (n - 0.5) * 1.1));
    col *= mix(vec3(1.0), vec3(1.6, 1.3, 0.8), 1.0 - r);
  } else {
    // kind 5: self-lit fire puff (alpha blended so it occludes instead of saturating)
    float n = nz(p * 2.6 + vSeed * 23.0) * 0.6 + nz(p * 6.0 - vSeed * 7.0) * 0.4;
    a = (1.0 - smoothstep(0.25, 1.0, r + (n - 0.5) * 0.9));
    float core = (1.0 - smoothstep(0.0, 0.75, r + (n - 0.5) * 0.6));
    col *= 0.55 + core * 0.9 + n * 0.25;
  }
  a *= vColor.a;
  if (a < 0.003) discard;
  if (uAdditive > 0.5) gl_FragColor = vec4(col, a);           // SrcAlpha, One
  else if (vKind > 4.5) gl_FragColor = vec4(col * a, a);         // emissive, premultiplied
  else gl_FragColor = vec4(col * uLight * a, a);               // premultiplied over
}`;

class Pool {
  constructor(scene, max, additive) {
    this.max = max;
    this.n = 0;
    this.pos = new Float32Array(max * 3);
    this.col = new Float32Array(max * 4);
    this.sk = new Float32Array(max * 2);
    // sim state
    this.vel = new Float32Array(max * 3);
    this.age = new Float32Array(max);
    this.life = new Float32Array(max);
    this.s0 = new Float32Array(max); this.s1 = new Float32Array(max);
    this.c0 = new Float32Array(max * 3); this.c1 = new Float32Array(max * 3);
    this.a0 = new Float32Array(max); this.a1 = new Float32Array(max);
    this.drag = new Float32Array(max); this.grav = new Float32Array(max);
    const g = new THREE.BufferGeometry();
    this.pAttr = new THREE.BufferAttribute(this.pos, 3).setUsage(THREE.DynamicDrawUsage);
    this.cAttr = new THREE.BufferAttribute(this.col, 4).setUsage(THREE.DynamicDrawUsage);
    this.sAttr = new THREE.BufferAttribute(this.sk, 2).setUsage(THREE.DynamicDrawUsage);
    g.setAttribute('position', this.pAttr);
    g.setAttribute('aColor', this.cAttr);
    g.setAttribute('aSK', this.sAttr);
    g.setDrawRange(0, 0);
    this.uniforms = { uScale: { value: 600 }, uLight: { value: new THREE.Color(1, 1, 1) }, uAdditive: { value: additive ? 1 : 0 } };
    const m = new THREE.ShaderMaterial({
      uniforms: this.uniforms, vertexShader: VERT, fragmentShader: FRAG,
      transparent: true, depthWrite: false,
      blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
    });
    if (!additive) { m.blending = THREE.CustomBlending; m.blendSrc = THREE.OneFactor; m.blendDst = THREE.OneMinusSrcAlphaFactor; }
    this.points = new THREE.Points(g, m);
    this.points.frustumCulled = false;
    this.points.renderOrder = additive ? 5 : 4;
    this.geo = g;
    scene.add(this.points);
  }

  emit(o) {
    let i;
    if (this.n < this.max) i = this.n++;
    else i = (Math.random() * this.max) | 0;
    const i3 = i * 3;
    this.pos[i3] = o.x; this.pos[i3 + 1] = o.y; this.pos[i3 + 2] = o.z;
    this.vel[i3] = o.vx || 0; this.vel[i3 + 1] = o.vy || 0; this.vel[i3 + 2] = o.vz || 0;
    this.age[i] = 0; this.life[i] = o.life || 1;
    this.s0[i] = o.s0 ?? 1; this.s1[i] = o.s1 ?? this.s0[i];
    this.c0[i3] = o.r ?? 1; this.c0[i3 + 1] = o.g ?? 1; this.c0[i3 + 2] = o.b ?? 1;
    this.c1[i3] = o.r1 ?? this.c0[i3]; this.c1[i3 + 1] = o.g1 ?? this.c0[i3 + 1]; this.c1[i3 + 2] = o.b1 ?? this.c0[i3 + 2];
    this.a0[i] = o.a0 ?? 1; this.a1[i] = o.a1 ?? 0;
    this.drag[i] = o.drag ?? 0; this.grav[i] = o.grav ?? 0;
    this.sk[i * 2 + 1] = o.kind ?? 0;
  }

  update(dt) {
    let n = this.n;
    const P = this.pos, V = this.vel;
    for (let i = 0; i < n; i++) {
      const age = (this.age[i] += dt);
      if (age >= this.life[i]) {
        n--;
        if (i !== n) this.move(n, i);
        i--;
        continue;
      }
      const i3 = i * 3;
      const k = age / this.life[i];
      const dr = Math.max(0, 1 - this.drag[i] * dt);
      V[i3] *= dr; V[i3 + 1] = V[i3 + 1] * dr - this.grav[i] * dt; V[i3 + 2] *= dr;
      P[i3] += V[i3] * dt; P[i3 + 1] += V[i3 + 1] * dt; P[i3 + 2] += V[i3 + 2] * dt;
      if (this.grav[i] > 0 && P[i3 + 1] < -0.5) this.age[i] = this.life[i]; // hit water
      this.sk[i * 2] = this.s0[i] + (this.s1[i] - this.s0[i]) * (1 - (1 - k) * (1 - k));
      const i4 = i * 4;
      this.col[i4] = this.c0[i3] + (this.c1[i3] - this.c0[i3]) * k;
      this.col[i4 + 1] = this.c0[i3 + 1] + (this.c1[i3 + 1] - this.c0[i3 + 1]) * k;
      this.col[i4 + 2] = this.c0[i3 + 2] + (this.c1[i3 + 2] - this.c0[i3 + 2]) * k;
      // alpha: quick fade-in then curve to a1
      const fin = Math.min(1, k * 12);
      this.col[i4 + 3] = (this.a0[i] + (this.a1[i] - this.a0[i]) * k) * fin;
    }
    this.n = n;
    this.geo.setDrawRange(0, n);
    this.pAttr.needsUpdate = this.cAttr.needsUpdate = this.sAttr.needsUpdate = true;
  }

  move(from, to) {
    const f3 = from * 3, t3 = to * 3;
    for (let k = 0; k < 3; k++) {
      this.pos[t3 + k] = this.pos[f3 + k]; this.vel[t3 + k] = this.vel[f3 + k];
      this.c0[t3 + k] = this.c0[f3 + k]; this.c1[t3 + k] = this.c1[f3 + k];
    }
    this.col.copyWithin(to * 4, from * 4, from * 4 + 4);
    this.sk[to * 2] = this.sk[from * 2]; this.sk[to * 2 + 1] = this.sk[from * 2 + 1];
    this.age[to] = this.age[from]; this.life[to] = this.life[from];
    this.s0[to] = this.s0[from]; this.s1[to] = this.s1[from];
    this.a0[to] = this.a0[from]; this.a1[to] = this.a1[from];
    this.drag[to] = this.drag[from]; this.grav[to] = this.grav[from];
  }
}

export class Particles {
  constructor(scene) {
    this.add = new Pool(scene, 9000, true);
    this.alpha = new Pool(scene, 7000, false);
  }
  setScale(renderer) {
    // point size in px = size * uScale / depth. Derive uScale from fov + viewport height.
    const h = renderer.gl.domElement.height;
    const s = h / (2 * Math.tan(THREE.MathUtils.degToRad(renderer.camera.fov / 2)));
    this.add.uniforms.uScale.value = s;
    this.alpha.uniforms.uScale.value = s;
  }
  setLight(color) { this.alpha.uniforms.uLight.value.copy(color); }
  update(dt) { this.add.update(dt); this.alpha.update(dt); }
}
