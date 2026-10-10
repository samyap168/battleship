// Authored hull shells (built in Blender from the game's own hull lines, see tools/ship-assets/).
// Loaded once at start-up; a hull without a model, or a failed load, falls back to the code-built one.
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export const HULL_GLB = {}; // hull id -> { hull, team, deck, trim: { geo, mat } }

const FILES = { frigate: 'models/frigate_hull.glb' };

export async function loadHullModels() {
  const base = (import.meta.env && import.meta.env.BASE_URL) || './';
  const loader = new GLTFLoader();
  const jobs = Object.entries(FILES).map(async ([id, file]) => {
    try {
      const g = await loader.loadAsync(base + file);
      g.scene.updateMatrixWorld(true);
      const parts = {};
      g.scene.traverse((o) => {
        if (!o.isMesh) return;
        const geo = o.geometry.clone(); geo.applyMatrix4(o.matrixWorld);
        geo.computeBoundingSphere();
        const m = o.material;
        for (const k of ['map', 'normalMap']) if (m[k]) { m[k].anisotropy = 8; m[k].needsUpdate = true; }
        parts[o.name.replace(/\.\d+$/, '')] = { geo, mat: m };
      });
      if (parts.hull) HULL_GLB[id] = parts;
    } catch (e) { console.warn(`[models] ${id} hull model unavailable, using the built-in one`, e); }
  });
  await Promise.race([Promise.all(jobs), new Promise((r) => setTimeout(r, 8000))]);
}
