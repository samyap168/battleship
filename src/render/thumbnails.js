import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { buildHeroShip } from './models/shipModels.js';
import { HULLS } from '../core/config.js';

// Studio "photographs" of every hull (per team) for the HUD portrait and the
// age-choice cards. Rendered once at boot on a small offscreen renderer.
const cache = {};

export function hullThumb(hullId, team) { return cache[hullId + ':' + team] || ''; }

export function renderThumbnails(W = 360, H = 200) {
  let r;
  try {
    r = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
  } catch { return; }
  r.setSize(W, H, false);
  r.setPixelRatio(1);
  r.toneMapping = THREE.ACESFilmicToneMapping;
  r.toneMappingExposure = 1.05;
  r.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(r);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  const key = new THREE.DirectionalLight(0xfff0dc, 2.6); key.position.set(-30, 40, 30);
  const rim = new THREE.DirectionalLight(0x9fc4ff, 1.6); rim.position.set(30, 20, -40);
  scene.add(key, rim, new THREE.HemisphereLight(0x8899aa, 0x223344, 0.5));
  // subtle reflective plinth of water
  const water = new THREE.Mesh(new THREE.CircleGeometry(400, 48).rotateX(-Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0x0b2630, roughness: 0.25, metalness: 0.0, transparent: true, opacity: 0.85 }));
  water.position.y = 0.05;
  scene.add(water);
  const cam = new THREE.PerspectiveCamera(30, W / H, 1, 500);
  for (const id of Object.keys(HULLS)) {
    for (const team of [0, 1]) {
      const rig = buildHeroShip(id, team);
      rig.root.rotation.y = -0.75;
      scene.add(rig.root);
      const L = rig.length;
      cam.position.set(L * 0.72, L * 0.42, L * 0.95);
      cam.lookAt(0, rig.height * 0.28, 0);
      r.render(scene, cam);
      cache[id + ':' + team] = r.domElement.toDataURL('image/png');
      scene.remove(rig.root);
    }
  }
  pmrem.dispose();
  r.dispose();
  r.forceContextLoss && r.forceContextLoss();
}
