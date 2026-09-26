// Standalone model viewer.  /preview/models.html?focus=<id>
// ids: all (default) | heroes | creeps | structures | small |
//      <hullId> | creep<era>[h] | outer | inner | citadel | port
// extra params: team=0|1, era=1..5 (structures), yaw=deg, pitch=deg, dist=mul, speed=0..1, t=seconds, bloom=0|1
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { buildHeroShip, buildCreepShip, HERO_IDS } from '../src/render/models/shipModels.js';
import { buildStructure, buildPort } from '../src/render/models/structureModels.js';
import { getDroneAssets, getProjectileAssets } from '../src/render/models/smallModels.js';

const q = new URLSearchParams(location.search);
const focus = q.get('focus') || 'all';
const team = +(q.get('team') ?? 0);
const era = +(q.get('era') ?? 1);
const speed = +(q.get('speed') ?? 0.6);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
// sky gradient background
{
  const c = document.createElement('canvas'); c.width = 4; c.height = 256;
  const g = c.getContext('2d');
  const grd = g.createLinearGradient(0, 0, 0, 256);
  grd.addColorStop(0, '#2d6fb0'); grd.addColorStop(0.55, '#8fc2e6'); grd.addColorStop(1, '#e8f1f4');
  g.fillStyle = grd; g.fillRect(0, 0, 4, 256);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  scene.background = t;
}
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
scene.environmentIntensity = 0.55;

const hemi = new THREE.HemisphereLight(0xcfe6ff, 0x1c3a4a, 0.6);
scene.add(hemi);
const sun = new THREE.DirectionalLight(0xfff1dc, 2.4);
sun.castShadow = true;
sun.shadow.mapSize.set(4096, 4096);
sun.shadow.bias = -0.0004;
sun.shadow.normalBias = 0.04;
scene.add(sun, sun.target);

const ocean = new THREE.Mesh(
  new THREE.PlaneGeometry(4000, 4000),
  new THREE.MeshStandardMaterial({ color: 0x14506e, roughness: 0.32, metalness: 0.05 }),
);
ocean.rotation.x = -Math.PI / 2;
ocean.receiveShadow = true;
scene.add(ocean);

// ---------------------------------------------------------------- content
const items = []; // { id, obj, rig, draws }
function place(id, rig, x, z, ry = 0) {
  rig.root.position.set(x, 0, z);
  rig.root.rotation.y = ry;
  scene.add(rig.root);
  let draws = 0;
  rig.root.traverse((o) => { if (o.isMesh && o.visible && isVisible(o)) draws++; });
  items.push({ id, obj: rig.root, rig, draws });
}
function isVisible(o) { for (let p = o; p; p = p.parent) if (!p.visible) return false; return true; }

const want = (group, id) => focus === 'all' || focus === group || focus === id;
// heroes: two rows (team 0 / team 1)
let x = 0;
const heroX = {};
for (const id of HERO_IDS) { heroX[id] = x; x += 16 + (id === 'carrier' || id === 'mothership' ? 8 : 4); }
const heroW = x;
for (const t of [0, 1]) for (const id of HERO_IDS) {
  if (!want('heroes', id)) continue;
  if (focus === id && t !== team) continue;
  place(focus === id ? id : `${id}/${t}`, buildHeroShip(id, t), heroX[id] - heroW / 2, t === 0 ? 0 : -48);
}
// creeps
for (let e = 1; e <= 5; e++) for (const h of [false, true]) for (const t of [0, 1]) {
  const id = `creep${e}${h ? 'h' : ''}`;
  if (!want('creeps', id)) continue;
  if (focus === id && t !== team) continue;
  place(focus === id ? id : `${id}/${t}`, buildCreepShip(e, h, t), (e - 3) * 26 + (h ? 7 : -7), 44 + t * 16);
}
// structures + port
const structs = [['outer', -120], ['inner', -80], ['citadel', -20]];
for (const [kind, sx] of structs) for (const t of [0, 1]) {
  if (!want('structures', kind)) continue;
  if (focus === kind && t !== team) continue;
  const r = buildStructure(kind, t);
  r.setEra(focus === kind ? era : (t === 0 ? era : Math.min(5, era + 2)));
  place(focus === kind ? kind : `${kind}/${t}`, r, sx + (t ? 0 : 0), t === 0 ? -130 : -200);
}
if (want('structures', 'port')) {
  const p = buildPort();
  p.setOwner(focus === 'port' ? (q.has('team') ? team : -1) : 0);
  place('port', p, 60, -140);
}
// drones + projectiles
if (want('small', 'small')) {
  const d = getDroneAssets(), pr = getProjectileAssets();
  const all = { ...d, ...pr };
  let i = 0;
  for (const [k, a] of Object.entries(all)) {
    const im = new THREE.InstancedMesh(a.geometry, a.material, 2);
    im.setMatrixAt(0, new THREE.Matrix4().compose(new THREE.Vector3(0, 0, 0), new THREE.Quaternion(), new THREE.Vector3(1, 1, 1)));
    im.setMatrixAt(1, new THREE.Matrix4().compose(new THREE.Vector3(0, 0, -4), new THREE.Quaternion(), new THREE.Vector3(1, 1, 1)));
    im.setColorAt(0, new THREE.Color(0.55, 0.8, 1.2));
    im.setColorAt(1, new THREE.Color(1.25, 0.55, 0.45));
    im.castShadow = true;
    const g = new THREE.Group(); g.add(im);
    g.position.set((i - 5) * 4, 3, 100);
    if (focus === 'small') g.position.set((i - 5) * 4, 3, 0);
    scene.add(g);
    items.push({ id: k, obj: g, rig: null, draws: 1 });
    i++;
  }
}

// ---------------------------------------------------------------- camera
const camera = new THREE.PerspectiveCamera(35, innerWidth / innerHeight, 1, 5000);
const controls = new OrbitControls(camera, renderer.domElement);
const box = new THREE.Box3();
for (const it of items) box.expandByObject(it.obj);
const center = box.getCenter(new THREE.Vector3());
const size = box.getSize(new THREE.Vector3());
const radius = Math.max(size.x, size.z * 1.1, size.y) * 0.5 + 2;
const pitch = THREE.MathUtils.degToRad(+(q.get('pitch') ?? 55));
const yaw = THREE.MathUtils.degToRad(+(q.get('yaw') ?? (items.length <= 1 ? 35 : 0)));
const dist = (radius / Math.sin(THREE.MathUtils.degToRad(camera.fov / 2)) * 0.75) * +(q.get('dist') ?? 1);
camera.position.set(
  center.x + Math.sin(yaw) * Math.cos(pitch) * dist,
  center.y + Math.sin(pitch) * dist,
  center.z + Math.cos(yaw) * Math.cos(pitch) * dist,
);
controls.target.copy(center);
camera.lookAt(center);
camera.far = dist * 6;
camera.updateProjectionMatrix();

sun.position.copy(center).add(new THREE.Vector3(-0.5, 1.0, 0.35).normalize().multiplyScalar(radius * 3 + 60));
sun.target.position.copy(center);
const sc = sun.shadow.camera;
sc.left = -radius * 1.2; sc.right = radius * 1.2; sc.top = radius * 1.2; sc.bottom = -radius * 1.2;
sc.near = 1; sc.far = radius * 8 + 200;
sc.updateProjectionMatrix();

// ---------------------------------------------------------------- post
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const bloom = new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), 0.55, 0.45, 0.9);
if (q.get('bloom') !== '0') composer.addPass(bloom);
composer.addPass(new OutputPass());

const hud = document.getElementById('hud');
hud.textContent = `focus=${focus}  team=${team}  era=${era}\n` + items.map((i) => `${i.id}: ${i.draws} draws`).join('\n');
console.log('DRAWS ' + items.map((i) => `${i.id}=${i.draws}`).join(' '));

addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight); composer.setSize(innerWidth, innerHeight);
});

const clock = new THREE.Clock();
let time = +(q.get('t') ?? 0);
function frame() {
  const dt = Math.min(0.05, clock.getDelta());
  time += dt;
  for (const it of items) it.rig?.update?.(dt, time, speed);
  controls.update();
  composer.render();
  requestAnimationFrame(frame);
}
frame();
