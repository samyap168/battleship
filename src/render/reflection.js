import * as THREE from 'three';
import { Reflector } from 'three/addons/objects/Reflector.js';

// Planar water reflections. A mirror camera (restricted to layer 2, the
// "reflection-worthy" layer: sky, islands, forts, captains, lights, VFX)
// renders at reduced resolution; the ocean shader samples it with
// wave-normal distortion and Fresnel weighting.
export const REFLECT_LAYER = 2;

export class WaterReflection {
  constructor(renderer, scene, camera, scale = 1 / 3) {
    this.gl = renderer; this.scene = scene; this.camera = camera; this.scale = scale;
    const w = Math.max(64, Math.round(window.innerWidth * scale)), h = Math.max(64, Math.round(window.innerHeight * scale));
    this.reflector = new Reflector(new THREE.PlaneGeometry(10, 10), { textureWidth: w, textureHeight: h, clipBias: 0.02, multisample: 0 });
    this.reflector.rotation.x = -Math.PI / 2;
    this.reflector.updateMatrixWorld(true);
    this.reflector.forceUpdate = true;
    this.cam = this.reflector.getReflectionCamera(camera);
    this.cam.layers.set(REFLECT_LAYER);
    this.invPlane = this.reflector.matrixWorld.clone().invert();
    this.worldTexMatrix = new THREE.Matrix4();
    this.uniforms = {
      tReflect: { value: this.reflector.getRenderTarget().texture },
      uReflMat: { value: this.worldTexMatrix },
      uReflOn: { value: 1 },
    };
    window.addEventListener('resize', () => {
      this.reflector.getRenderTarget().setSize(Math.round(window.innerWidth * this.scale), Math.round(window.innerHeight * this.scale));
    });
  }

  /** Render the mirror view (hide the water itself while doing so). */
  update(hide = []) {
    for (const o of hide) o.visible = false;
    this.reflector.onBeforeRender(this.gl, this.scene, this.camera);
    for (const o of hide) o.visible = true;
    this.worldTexMatrix.multiplyMatrices(this.reflector.material.uniforms.textureMatrix.value, this.invPlane);
  }
}

/** Put an object (and its whole subtree) on the reflection layer too. */
export function reflectable(obj) {
  obj.traverse((o) => o.layers.enable(REFLECT_LAYER));
  return obj;
}
