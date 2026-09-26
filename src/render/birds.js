import * as THREE from 'three';
import { applyCloudShadow } from './cloudShadow.js';

// Ambient seabird flocks wheeling above the archipelago (one instanced draw call).
// Wings flap in the vertex shader, phase-offset per instance via gl_InstanceID.
const N = 90;

function birdGeometry() {
  // body + two wings (wing verts have |x| > 0.2 and get flapped in the shader)
  const v = new Float32Array([
    // left wing
    -0.2, 0, 0.25, -1.6, 0.05, -0.1, -0.2, 0, -0.35,
    // right wing
    0.2, 0, 0.25, 0.2, 0, -0.35, 1.6, 0.05, -0.1,
    // body
    0, 0.06, 0.7, -0.2, 0, -0.3, 0.2, 0, -0.3,
    0, 0.06, -0.3, 0, 0.1, -0.9, 0.0, -0.05, -0.3,
  ]);
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(v, 3));
  g.computeVertexNormals();
  return g;
}

export class Birds {
  constructor(scene, islands) {
    this.u = { uTime: { value: 0 } };
    const mat = new THREE.MeshStandardMaterial({ color: 0xf0ede6, roughness: 0.8, side: THREE.DoubleSide });
    const U = this.u;
    mat.onBeforeCompile = (sh) => {
      sh.uniforms.uTime = U.uTime;
      sh.vertexShader = sh.vertexShader
        .replace('#include <common>', '#include <common>\nuniform float uTime;')
        .replace('#include <begin_vertex>', `#include <begin_vertex>
float ph = float(gl_InstanceID) * 1.37;
float flap = sin(uTime * (7.0 + mod(float(gl_InstanceID), 3.0)) + ph);
float glide = step(0.35, fract(uTime * 0.13 + ph * 0.1)); // birds alternate flapping and gliding
float span = abs(transformed.x);
if (span > 0.25) transformed.y += flap * span * 0.55 * glide;`);
    };
    mat.customProgramCacheKey = () => 'birds-v1';
    applyCloudShadow(mat);
    this.mesh = new THREE.InstancedMesh(birdGeometry(), mat, N);
    this.mesh.frustumCulled = false;
    this.mesh.castShadow = true;
    scene.add(this.mesh);
    // flocks orbit a few of the big islands
    const homes = islands.filter((i) => i.r > 30).slice(0, 8);
    this.b = [];
    for (let i = 0; i < N; i++) {
      const h = homes[i % homes.length];
      this.b.push({ cx: h.x, cz: h.z, r: h.r * (1.1 + Math.random() * 0.9), a: Math.random() * 6.28, sp: (0.18 + Math.random() * 0.14) * (Math.random() < 0.5 ? 1 : -1),
        y: 34 + Math.random() * 30, bob: Math.random() * 6.28, s: 0.6 + Math.random() * 0.35 });
    }
    this._m = new THREE.Matrix4(); this._q = new THREE.Quaternion(); this._e = new THREE.Euler(0, 0, 0, 'YXZ'); this._p = new THREE.Vector3(); this._s = new THREE.Vector3();
  }

  update(dt, t) {
    this.u.uTime.value = t;
    for (let i = 0; i < N; i++) {
      const b = this.b[i];
      b.a += b.sp * dt * (0.8 + 0.2 * Math.sin(t * 0.3 + i));
      const wob = Math.sin(t * 0.4 + b.bob) * 8;
      const x = b.cx + Math.cos(b.a) * (b.r + wob), z = b.cz + Math.sin(b.a) * (b.r + wob);
      const y = b.y + Math.sin(t * 0.7 + b.bob) * 3;
      // heading = tangent of the orbit; bank into the turn
      const yaw = Math.atan2(-Math.sin(b.a) * Math.sign(b.sp), Math.cos(b.a) * Math.sign(b.sp));
      this._e.set(0, yaw, -0.35 * Math.sign(b.sp));
      this._q.setFromEuler(this._e);
      this._s.setScalar(b.s);
      this._m.compose(this._p.set(x, y, z), this._q, this._s);
      this.mesh.setMatrixAt(i, this._m);
    }
    this.mesh.instanceMatrix.needsUpdate = true;
  }
}
