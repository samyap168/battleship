# ⚓ Armada Ascension

**A 3D naval MOBA in the browser.** Warcraft III *Battleships* meets *Civilization*: command a warship in 10-minute 5v5 battles against AI captains, and evolve it through five ages of naval technology. You start with a timber ship-of-the-line and can end with a drone mothership that blots out the sun with 80 kamikaze drones.

Everything is procedural and runs in real time in the browser with Three.js: models, ocean, sky, VFX, music and sound effects. There is not a single asset file.

## Play

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production bundle in dist/
```

A GitHub Pages workflow (`.github/workflows/deploy.yml`) publishes `main` automatically once **Settings → Pages → Source** is set to **GitHub Actions**.

URL options: `?autoplay=1` skips the menu, `?quality=low|medium|high` sets graphics quality, `?difficulty=easy|normal|hard` sets bot strength, and `?team=0|1` picks your team.

## Controls

| Input | Action |
|---|---|
| Right mouse | Sail to / attack target |
| Q W E R | Hold to aim (range + AoE / skillshot preview), release to fire. Self-cast abilities fire instantly |
| T | Advance to the next age (choose a hull at ages III-V) |
| Ctrl + 1-5 | Buy armory upgrades |
| Space / Y | Centre camera / toggle free camera (arrows + edge pan) |
| Wheel · Tab · Alt · M · F3 | Zoom · Scoreboard · Gun range · Mute · Performance overlay |

## The five ages

| Age | Warships | Signature abilities |
|---|---|---|
| I · Sail | Frigate | Chain Shot, Full Sail, Grapeshot, Bombard |
| II · Steam | Ironclad | HE Shell, Steam Surge, Iron Ram, Mortar Barrage |
| III · Dreadnought | Dreadnought / Torpedo Cruiser | Main Battery, Smoke Screen, Belt Armour · Torpedo Spread, Mine Field, Wolfpack |
| IV · Airpower | Fast Battleship / Fleet Carrier | Radar Salvo, Flak Umbrella, Cruise Missiles · Fighter Squadron, Dive Bombers, Air Wing |
| V · Swarm | Arsenal Cruiser / Drone Mothership | Railgun, Point-Defense Lasers, Hypersonic Strike · Micro Swarm, Aegis Drones, EMP, Hive Storm |

**The Leviathan**, a colossal sea serpent, rises at 5:30. The team that slays it earns gold and the Leviathan's Blessing (+30% damage).

Each team's **era** is the median age of its captains. It evolves that team's gunboats (sloop → steam gunboat → destroyer → missile boat → autonomous USV) and its fortresses.

## Signature moments

- **Opening shot:** a letterboxed sunrise cinematic, low on the water behind your citadel as the fleet sails out, before the camera cranes up to play.
- **The Reforging:** every age-up plays a slow-motion hero dolly, a pillar of light, shock rings racing across the sea and a hex-shield flare as the new hull materialises.
- **The squall:** mid-match rain sheets, forked lightning, a heavier swell and reduced accuracy.
- **The Leviathan:** a 42-segment sea serpent breaches in great humps, roars and slams ships. The team that slays it earns the Blessing.
- **Menu showreel:** the menu backdrop is a live late-game battle at golden hour.

## Tech highlights

- **Ocean:** Gerstner waves shared by GPU and CPU, so hulls pitch and roll on the exact rendered surface. Also per-pixel detail ripples, subsurface scattering, crest/shore foam, and wave-riding foam decals for wakes, rings and oil slicks.
- **Lighting:** an art-directed analytic sky with fbm clouds, captured into a PMREM for PBR reflections. The match runs **dawn → dusk** and the grade shifts with it. ACES tonemapping, bloom, SMAA, and a custom grade pass with lift/gain, vignette, grain, chromatic aberration, screen-space shockwaves and damage vignette.
- **Weather:** a mid-match squall darkens the sky and raises the swell (the GPU ocean and CPU buoyancy share the same waves). It brings rain sheets, forked lightning with thunder, rain and gale ambience, and reduced gunnery accuracy.
- **Cloud shadows:** drifting cloud shadows cross the sea, islands and ships.
- **God rays:** a screen-space pass casts volumetric light shafts from the sun. Dynamic resolution holds the frame rate.
- **VFX:** layered explosions (flash → fireball → embers → debris → smoke → water column → foam ring → oil slick), with pooled point lights and camera trauma.
- **Swarms:** hundreds of boids-style drones, fighters and bombers in one instanced draw call per type.
- **Audio:** fully procedural WebAudio. Positional SFX with voice management, an adaptive score (guzheng-like ostinato, taiko, brass swells) and cinematic stingers.
- **AI:** utility-scored bots that lane, kite, focus low targets, respect towers, capture ports, choose age branches and group-push late.

## Docs

- [`docs/GDD.md`](docs/GDD.md): game design document
- [`docs/research/AAA_STUDIO_RESEARCH.md`](docs/research/AAA_STUDIO_RESEARCH.md): what CD Projekt Red, HoYoverse, Game Science and others do
- [`docs/research/NAVAL_GAMES_RESEARCH.md`](docs/research/NAVAL_GAMES_RESEARCH.md): lessons from World of Warships, Sea of Thieves, Black Flag, WC3 Battleships and more

## Testing

`node tests/play.mjs "6,60,180" prefix` boots a headless Chromium build (SwiftShader) and steps the simulation deterministically. It screenshots at the given match times and prints a match summary.
