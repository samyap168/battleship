# Architecture

```
index.html ─ src/main.js            boot, menu, input, frame loop, time-of-day, cinematic grading
             ├─ render/
             │   renderer.js        WebGLRenderer + composer: Render → Bloom → God rays → Output (ACES) → Grade → SMAA; dynamic resolution
             │   sky.js             analytic sky dome + fbm clouds, dawn→dusk keyframes, PMREM environment capture, sun/shadow rig
             │   ocean.js           Gerstner ocean (MeshStandard + onBeforeCompile): detail ripples, SSS, body scatter, crest/shore foam, WaterDecals
             │   waves.js           single source of truth for waves (GLSL chunk + CPU sampler), global swell uniform
             │   cloudShadow.js     shared drifting cloud-shadow patch for every lit material
             │   weather.js         squall: rain, lightning, swell, storm grade, storm ambience
             │   environment.js     karst islands, instanced forests (per-cell culled), pagodas, lanterns, horizon peaks
             │   particles.js       pooled CPU particles → 2 Points draw calls (additive / premultiplied), procedural sprites
             │   fx.js              VFX vocabulary: muzzle, splash, explosion, mega, EMP, beams, rings, debris, light pool, age-up
             │   models/            procedural ships, creeps, structures, ports, drones, projectiles, materials
             ├─ game/
             │   game.js            match orchestration: waves, economy, kills/assists/streaks, eras, ports, storm, win, visuals sync
             │   units.js           Unit / Hero / Creep / Structure, ship physics (momentum, turn, buoyancy), separation
             │   combat.js          damage model, ballistic/straight/homing projectiles, mines, instanced projectile rendering
             │   abilities.js       ability implementations by type (projectile, barrage, volley, homing, buff, dash, smoke, mines, swarm, beam, pointdefense)
             │   drones.js          boids micro-swarms, fighters, dive bombers, shield drones (instanced)
             │   map.js             lanes, islands, structures, ports, A* nav grid with string-pulling
             │   ai/bot.js          utility AI: shop, retreat, fight, capture, lane, per-ability logic
             ├─ audio/              procedural WebAudio: SFX recipes, adaptive score, stingers, ambience/rain/swarm buses
             ├─ ui/                 HUD (DOM + canvas overlay), minimap, icons, styles
             └─ core/               config.js (all balance data), camera.js (director: follow, zoom, trauma shake, intro)
```

## Conventions

- **All tuning lives in `core/config.js`.** Systems read data; they never hard-code balance.
- **Local +Z is the bow** for every model. `yaw = atan2(dx, dz)`. Screen right = +X, screen up = −Z.
- **Waves:** anything that must sit on the sea (decals, rings, shields, hulls) samples `waves.js`, either `sampleWaves` on the CPU or `WAVES_GLSL` in shaders.
- **No per-frame allocation in hot paths.** Particles, decals, rings, beams, lights and debris are pooled.
- **Test hooks** live on `window.__aa`: `paused`, `step(n, dt)`, `castAt(i)`, `G`, `R`, `cameraDir`, `fx`.

## Tests (headless Chromium + SwiftShader; run `npx vite build && npx vite preview --port 5173` first)

| Script | Purpose |
|---|---|
| `tests/fullmatch.mjs` | Simulates a full match; asserts no runtime errors and that the end screen appears |
| `tests/play.mjs "t1,t2"` | Screenshots at given match times |
| `tests/photo.mjs out x z dist t` | Photo mode at a world position (x = `player` to follow) |
| `tests/showcase.mjs hull "0,3"` | Stages a hull next to enemies and casts abilities |
| `tests/vfx.mjs effect` | Isolated VFX gallery (explosion, mega, emp, rail, ageup, muzzle) |
