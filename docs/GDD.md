# Armada Ascension — Game Design Document

> *WC3 Battleships* meets *Civilization*. A 3D naval MOBA where every captain's warship evolves through five ages of naval technology, from ships of the line to autonomous drone swarms, inside a single 10-minute 5v5 match.

Research inputs: [`research/AAA_STUDIO_RESEARCH.md`](research/AAA_STUDIO_RESEARCH.md) and [`research/NAVAL_GAMES_RESEARCH.md`](research/NAVAL_GAMES_RESEARCH.md).

## 1. Pillars

| Pillar | Meaning | How we test it |
|---|---|---|
| **Ascension is the fantasy** | Upgrading to the next age is the biggest moment in the game: a pillar of light, a new hull, a new kit and a musical stinger. | Every age-up must be visible from across the screen and audible. |
| **Weight on water** | Ships have momentum, turning radius and heel. Shells arc with real travel time, so a moving target can dodge. | A frigate cannot turn in place. A dodged salvo reads as a splash, not a hit. |
| **Readability over spectacle** | Team color is on every silhouette. The VFX value hierarchy runs abilities > guns > ambient. Big threats get a ground marker. | Screenshot any team fight: you can tell sides and danger in half a second. |
| **Ten minutes, all killer** | The economy is fast. Ages come every 1.5-2 minutes. Towers gate the citadel, and a dusk time-out decides stalemates. | Median bot match reaches Age IV+ and at least one tower falls. |
| **The day passes** | The match runs dawn to dusk. Lighting, sky, fog and exposure grade from cool gold to burning sunset, mirroring the civilizational arc. | The 0:30 and 9:30 screenshots feel like different acts of a film. |

## 2. Core loop

```
sail lane → sink gunboats / trade fire (gold + XP) → buy upgrades or save
         ↘ capture trade ports (+gold/s)       → ADVANCE AGE (new hull, new kit)
         ↘ team fights / towers                → citadel exposed → win
```

## 3. Match structure (10:00)

- **0:00–0:12** Cinematic fly-in, then fleets deploy from their harbors.
- **0:12** First gunboat wave. Waves come every 30 s (3 light + 1 heavy per lane, 4 + 1 from wave 8).
- **~1:30** First captains reach the **Age of Steam** (600 g).
- **~3:30** **Age of Dreadnoughts** (1300 g), where the branch choice begins: Dreadnought (artillery) or Torpedo Cruiser (assassin).
- **~5:30** **Age of Airpower** (2200 g): Fast Battleship or Fleet Carrier.
- **5:30** Bots start grouping to push the weakest enemy lane.
- **~7:30** **Age of Swarms** (3000 g): Arsenal Cruiser or Drone Mothership.
- **10:00** Dusk. If no citadel has fallen, score = 3 × structures destroyed + kills + citadel damage/1000.

## 4. The five ages

| Age | Hero hull(s) | Guns | Signature |
|---|---|---|---|
| I Sail | Frigate | Broadside black-powder | Chain Shot slow, Grapeshot cone, Bombard |
| II Steam | Ironclad | HE shells | Iron Ram stun-dash, Mortar Barrage |
| III Dreadnought | Dreadnought / Torpedo Cruiser | Turret salvos | Smoke Screen, Belt Armour / Torpedo fans, Mine Field, Wolfpack |
| IV Airpower | Battleship / Carrier | Radar salvos / Flak | Cruise Missiles, Flak Umbrella / Fighter Squadrons, Dive Bombers, Air Wing |
| V Swarm | Arsenal Cruiser / Drone Mothership | Pulse / Laser | Railgun, Point-Defense Lasers, Hypersonic Strike / Micro Swarm, Aegis Drones, EMP, Hive Storm (80 drones) |

**Team era** = the median age of the team's five captains. It upgrades that team's gunboats (sloop → gunboat → destroyer → missile boat → autonomous USV) and its fortresses (cannon → steel turret → missile battery).

## 5. Combat rules

- **Auto-guns** target the nearest enemy (heroes preferred), or your right-click target. Shells lead the target by its velocity × flight time with distance-scaled scatter, so dodging works.
- **Critical hits:** a 10% chance of a "citadel hit" for 1.75× damage, shown with a gold ✦ number and an explosion instead of sparks.
- **Armour** is a flat % reduction. **Shields** absorb first.
- **Towers** prefer gunboats. They switch to a hero who damages an allied hero within range for 2.5 s. Tower damage scales +7% per minute.
- **Protection chain:** outer tower → inner tower (same lane) → the citadel becomes vulnerable once two inner towers (two lanes) have fallen.
- **Smoke:** allied heroes inside are untargetable by guns and towers.
- **Point defense / flak** shoots down enemy drones and homing missiles in radius.

## 6. Economy

| Source | Gold |
|---|---|
| Passive | 5 / s |
| Trade port (owned) | +2 / s per player |
| Light / heavy gunboat (last hit) | 40 / 72 |
| Captain kill | 240 + 80 × victim age (+50 per streak above 2) |
| Assist (split) | ~135 total |
| Tower destroyed | 220 (outer) / 280 (inner) to every teammate |

Upgrades (Hull Plating, Gunnery, Engines, Reload Drills, Repair Crews) have 5 levels each and carry across ages.

## 7. Bots (utility AI)

Every 0.25–0.9 s (by difficulty) each bot scores these desires:
1. **Shop** (advance age first, upgrades when far from the next age).
2. **Retreat** (hp < 28%, outnumbered at < 45%, or tanking a tower).
3. **Fight** (prey score = missing hp + power ratio − distance − tower cover).
4. **Capture** a port when uncontested.
5. **Lane:** hold behind the creep front and hit towers only when creeps tank.

Ability logic is per type: skillshots lead the target, barrages hit heroes or creep clusters, and defensive buffs fire on damage or when retreating. Difficulty changes reaction time, aim, ability rate, aggression and a gold multiplier.

## 8. Audio-visual direction

- **Look:** stylized-real, painterly PBR, East-Asian naval epic (karst peaks, pagoda ruins, shrine lanterns). ACES tonemapping, bloom, lift/gamma/gain grade, vignette, grain, chromatic aberration.
- **Ocean:** Gerstner waves shared between the GPU and CPU buoyancy, per-pixel detail ripples, subsurface scattering, crest and shore foam, and wave-riding foam decals for wakes, rings and oil slicks.
- **VFX layering:** flash → fireball → sparks/embers → debris → smoke → water column → foam ring → oil slick, plus point light, screen shockwave and camera trauma.
- **Audio:** fully procedural WebAudio: layered cannon transients with sub, and positional voices with caps. An adaptive score (drone pad, guzheng-like ostinato, taiko that rises with combat) plus stingers for age-ups, first blood and towers.

## 9. The Leviathan (neutral objective)

At **5:30** a colossal sea serpent erupts from its lair at (0, 108), between the mid lane and the south trade port, equidistant from both bases. It has 17,000 hp and 25% armour, and regenerates when left alone.
- **Tail slam:** telegraphed by a cyan ring 1.1 s before impact. It deals 300+ damage and knocks ships back.
- **Bite:** hits the nearest ship for 420+ damage.

The team that lands the killing blow gets **350 gold per captain** and **the Leviathan's Blessing**: +30% damage and +1.2%/s hull regeneration for 75 s, shown as a cyan aura. Bots contest it when three or more allies are nearby and healthy, or when it is below 35%.

## 10. Signature moments

- **The squall** hits at a random time between 4:10 and 5:20 and lasts 55 s. The swell rises 75%, rain and lightning sweep in, visibility drops, and gun scatter widens. It is a natural moment for ambushes.
- **Reforging:** each age-up plays a light pillar, shock rings and a screen shockwave. The new hull scales in with an overshoot, and a brass/choir stinger plays.
- **Fortress fall:** a chain of explosions, a mega-blast, and the fort sinks into the sea while it burns.
- **The opening shot:** a letterboxed sunrise cinematic, low on the water behind your citadel as the fleet sails out, then a crane up to the gameplay camera.
- **The Reforging:** every age-up plays a slow-motion hero dolly around the new hull while the hex shield flares.
- **Sinking:** a ship death plays explosions, then the ship heels and sinks with fire, smoke and an oil slick. The player's own death adds slow-motion and desaturation.

## 11. Comeback and anti-snowball

- **Shutdown bounty:** +90 gold per streak level on a captain with a streak of 3 or more.
- **Diminishing bounty:** feeders are worth 14% less per death in a row, down to a floor of 45%.
- **Kill-gold scaling:** kill gold scales with the team kill difference, between 0.55× and 1.7×.
- **Catch-up XP:** lower-level captains earn up to 1.6× XP.
- **Faster respawn** for the trailing team.
- **Backdoor protection:** forts take 45% damage from captains unless allied gunboats are within 95 units.
- **Catch-up stipend:** captains below the enemy fleet's median age earn +60% passive gold per age behind.
- **Home waters:** a team trailing by 6+ kills takes up to 30% less damage near its own forts, and its forts take up to 25% less. This is announced once.
- **Harbour repairs:** captains within 90 units of their own citadel regenerate 6% hp/s.
- **Spawn guard:** 3 s of invulnerability after recommissioning, so no spawn camping.

## 12. Faction readability

Every captain's hull carries a Fresnel rim light in team colour, so friend and foe read by silhouette through smoke and at fleet zoom.

## 13. Controls

RMB move/attack · QWER quick-cast at cursor · T advance age · Ctrl+1–5 upgrades · Space centre camera · Y free camera · Wheel zoom (all the way in swings to a low cinematic angle) · Tab scoreboard · Alt gun range · M mute.
