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
| Q W E R | Cast ability at cursor |
| T | Advance to the next age (choose a hull at ages III-V) |
| Ctrl + 1-5 | Buy armory upgrades |
| Space / Y | Centre camera / toggle free camera (arrows + edge pan) |
| Wheel · Tab · Alt · M | Zoom · Scoreboard · Gun range · Mute |

## The five ages

| Age | Warships | Signature abilities |
|---|---|---|
| I · Sail | Frigate | Chain Shot, Full Sail, Grapeshot, Bombard |
| II · Steam | Ironclad | HE Shell, Steam Surge, Iron Ram, Mortar Barrage |
| III · Dreadnought | Dreadnought / Torpedo Cruiser | Main Battery, Smoke Screen, Belt Armour · Torpedo Spread, Mine Field, Wolfpack |
| IV · Airpower | Fast Battleship / Fleet Carrier | Radar Salvo, Flak Umbrella, Cruise Missiles · Fighter Squadron, Dive Bombers, Air Wing |
| V · Swarm | Arsenal Cruiser / Drone Mothership | Railgun, Point-Defense Lasers, Hypersonic Strike · Micro Swarm, Aegis Drones, EMP, Hive Storm |

Each team's **era** is the median age of its captains. It evolves that team's gunboats (sloop → steam gunboat → destroyer → missile boat → autonomous USV) and its fortresses.

## Tech highlights

- **Ocean:** Gerstner waves shared by GPU and CPU, so hulls pitch and roll on the exact rendered surface. Also per-pixel detail ripples, subsurface scattering, crest/shore foam, and wave-riding foam decals for wakes, rings and oil slicks.
- **Lighting:** an art-directed analytic sky with fbm clouds, captured into a PMREM for PBR reflections. The match runs **dawn → dusk** and the grade shifts with it. ACES tonemapping, bloom, SMAA, and a custom grade pass with lift/gain, vignette, grain, chromatic aberration, screen-space shockwaves and damage vignette.
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
