# Naval & Battleship Games Research — for Armada Ascension

**Purpose:** survey the highest-quality, best-reviewed naval/battleship games — what reviewers and players say makes each one great or bad — and turn that into concrete design guidance for **Armada Ascension**: a 3D browser naval MOBA (WC3-"Battleships"-style hero ship, 10-minute 5v5 vs bots, civilization ages from sail → steam → dreadnought → carrier/airpower → drone swarms).

**Method note:** research was gathered via web search result summaries (WebSearch), not full-page fetches (WebFetch was expected to be blocked and was not relied on for this report). Quoted scores (Metacritic/Steam percentages) are what search summaries reported at the time of writing and should be treated as approximate/unverified snapshots, not audited figures — flagged inline as "(per search summary, unverified)" where precision matters. No numbers below were invented; anything not turned up by search is marked as such.

---

## 1. Game-by-game survey

### World of Warships (PC) / World of Warships: Legends (console)

World of Warships is the closest existing analogue to our hull-tier/age structure, and it is the single most useful cautionary tale on monetization.

- **Reception:** Critic reviews on Metacritic describe it as "wonderful, captivating and finely crafted," easy to learn but deep in execution (per search summary, unverified exact score). User review sentiment is far more mixed and has trended negative in recent years specifically around monetization, not core gameplay. [Metacritic](https://www.metacritic.com/game/world-of-warships/)
- **Ship-class balance:** the game's core rock-paper-scissors is destroyers (stealth/torpedoes) vs. cruisers (AA/flexible guns) vs. battleships (armor/alpha damage) vs. carriers (area denial/spotting). This class triangle is exactly the kind of asymmetric-role balance we should map onto our hull branches (Torpedo/Dreadnought, Battleship/Carrier, Arsenal/Mothership).
- **Gun ballistics feel:** shells follow real parabolic arcs governed by weight, caliber, drag and muzzle velocity; at long range the shell arcs steeply enough to plunge through deck armor rather than belt armor. This "arc changes what you penetrate" mechanic is a major source of the game's depth and skill expression. [World of Warships gun mechanics](https://warshipsgames.com/world-of-warships-gun-mechanics-guide/)
- **Damage model:** the "citadel" — an armored box around a ship's magazines/engines — is the number one skill-expression and highlight-reel mechanic in the game: landing a citadel hit multiplies damage and is the single most satisfying moment in a match. This is a strong candidate pattern for our own "critical hit zone" feedback.
- **Sound design:** developers deliberately favor big, booming, non-historically-accurate gunfire because focus groups preferred it, and each ship gets a bespoke multi-clip "sound passport" so vessels feel sonically distinct. [Wargaming sound design](https://wargaming.com/en/news/sound_design/)
- **Carrier rework controversy:** Wargaming replaced the old RTS-style top-down carrier control with a direct-control, one-squadron-at-a-time system. Leaked internal comments (via community contributor Flamu) showed Wargaming knew carriers were overpowered post-rework but tolerated it because it kept carrier-player population numbers up — which non-carrier players read as the studio prioritizing retention metrics over game health. This is a textbook "don't ship a mechanic you know is broken because it drives engagement" anti-pattern. [TV Tropes](https://tvtropes.org/pmwiki/pmwiki.php/BrokenBase/WorldOfWarships), [Steam discussion](https://steamcommunity.com/app/552990/discussions/0/1640915206478375090/)
- **Monetization backlash:** by late 2023/early 2024, search summaries describe a large veteran-player exodus (a commonly cited "80% of veteran players left" claim, unverified) tied to loot boxes and premium ships priced like standalone games, and prominent community YouTubers (e.g., The Mighty Jingles) publicly quit and cited "gambling mechanics into a game marketed to children." [PC Gamer](https://www.pcgamer.com/aggressive-monetisation-is-driving-prominent-players-away-from-world-of-warships/), [Massively OP](https://massivelyop.com/2021/08/16/the-soapbox-world-of-warships-aggressive-monetization-incited-a-mass-exodus-of-content-creators/)
- **Takeaway for us:** we have no monetization in scope per the current design, but the lesson generalizes — never let a hero/hull's power level be justified by "it's popular," and never let a top-tier age hull feel mandatory or pay-gated for parity.

### Sea of Thieves

- **Reception:** PC Metacritic around 68 at launch (per search summary, unverified), a "mixed" launch score that improved in later community sentiment as content was added post-launch. [Metacritic](https://www.metacritic.com/game/sea-of-thieves/)
- **Water rendering:** Rare's SIGGRAPH 2018 talk ("The Technical Art of Sea of Thieves") described an FFT-based ocean simulation derived from Jerry Tessendorf's 2001 "Simulating Ocean Water" paper, combined with Gerstner-wave vertex displacement computed cooperatively between CPU (mesh vertices) and GPU (vertex repositioning), deliberately avoiding physically-based shading in favor of an art-directed, stylized look. This is widely cited as the best ocean rendering in games and is the reason critics called the game "an audiovisual masterpiece (that water!)." [SIGGRAPH](https://dl.acm.org/doi/10.1145/3214745.3214820), [Players For Life](https://playersforlife.com/2024/05/01/sea-of-thieves-how-rare-achieved-the-best-water-physics-in-video-games/)
- **Ship-combat feel and sailing physics:** critics praised the granular crew tasks — raising/lowering sails, trimming sail angle to catch wind, working the anchor, patching cannonball holes below deck, bailing water — as the source of the game's signature "teamwork under pressure" feel, even while some reviewers felt the combat itself (vs. the sailing/exploration loop) was comparatively shallow.
- **Social emergent play:** the open, PvPvE Caribbean-style sandbox generates emergent stories (ambushes, alliances, betrayals) that reviewers and players repeatedly cite as the game's real hook, more than any scripted content.
- **Art direction:** a stylized, painterly, Pixar-adjacent look rather than photorealism — this is a deliberate choice that ages well and reads clearly at a distance, relevant to us since we're a browser 3D game with real performance constraints.
- **Takeaway for us:** stylized non-photorealistic water and ship art will read better in a browser engine than an attempt at photoreal PBR, and will age better visually.

### Assassin's Creed IV: Black Flag

- Widely considered one of the best-reviewed entries in the AC franchise and frequently cited by outlets as having the best naval combat "ever seen in a video game" (search summaries did not find an exact single-source verbatim "best naval game ever" claim, but multiple outlets independently praised naval combat as the game's standout system). [GameSpot](https://www.gamespot.com/reviews/assassin-s-creed-iv-black-flag-review/1900-6415509/), [Destructoid](https://www.destructoid.com/reviews/review-assassins-creed-iv-black-flag/)
- **Naval combat design:** described by reviewers as "remarkably fast, brutal, and streamlined" — success depends on risk/reward judgment (how close do you sail to land a boarding vs. staying at cannon range) rather than pure marksmanship. Weapon variety — light and heavy cannons, swivel guns, fire barrels, mortars, and ramming — gave players multiple viable playstyles within a single hull.
- **Sea shanties:** crew sing period-accurate sea shanties while sailing, dynamically triggered by activity; this ambient audio layer is repeatedly singled out by reviewers and players as one of the most memorable, mood-setting details in the game, and Ubisoft leaned into it further in the 2025 "Resynced" re-release with an expanded shanty roster and a manual "shanty wheel." [Ubisoft news](https://news.ubisoft.com/en-us/article/2ld4JIABg5aOvoiUlJlUWF/assassins-creed-black-flag-resynced-deep-dive-into-the-naval-gameplay)
- **Weather and rogue waves:** the Anvil engine's "Atmos" dynamic weather system simulates temperature/pressure/humidity to build storms progressively (clear skies → clouds → full hurricane), spawning rogue waves and waterspouts that can capsize or damage the player's ship if not respected — explicitly designed so "the ship has to respect the fury of the sea or face oblivion." This turns weather into a design-intended mechanical threat, not just a visual skybox effect.
- **Why it's considered the best naval game:** the combination of (a) fast, legible, arcade-weighted combat, (b) a strong risk/reward loop, (c) constant sensory reinforcement (shanties, weather, spray) and (d) a hub-and-open-world structure that made every voyage feel like an event, not a grind.

### Skull and Bones (lessons of what NOT to do)

- **Reception:** described in search summaries as the worst-reviewed game by user score of 2024 at launch, with a user score around 2.9 and roughly 73% of user reviews negative; critic score around 64 (per search summary, unverified precise figures). [TechSpot](https://www.techspot.com/news/101931-skull-bones-currently-has-lowest-metacritic-user-score.html), [GameRant](https://gamerant.com/skull-and-bones-reviews-metacritic-scores/)
- **Root causes cited by reviewers:**
  - Shallow, repetitive sea battles with a "narrow approach to game design" — pacing described as "painfully slow and boring."
  - No ship boarding or swimming — the exact tactile, personal-scale actions (boarding, melee, exploring on foot) that made Black Flag's naval combat feel embodied were cut.
  - Direct unfavorable comparisons to Black Flag, a decade-older game, with reviewers saying the older game did some things better.
  - Perceived as a live-service "microtransaction simulator" rather than a complete game, after a long, publicly troubled, multi-delay development.
- **Takeaway for us:** the risk of a pure-naval game is that removing the "person on the ship" layer (boarding, crew banter, personal stakes) can make combat feel abstract and grindy. Our MOBA hero-ship framing (abilities, levels, a "you are this ship" identity) is actually a hedge against this failure mode — but we must keep matches short, varied, and avoid Skull and Bones' slow pacing at all costs given our 10-minute target.

### Total War naval battles

- Fans consistently rate **Empire: Total War** (the series' first 3D naval battles) and **Napoleon: Total War** as having the best naval combat in the franchise; **Shogun 2: Fall of the Samurai**'s 19th-century ironclad/steamer battles are also praised for steam effects, water textures and explosions — directly relevant to our "Age of Steam" hull. [PCGamesN](https://www.pcgamesn.com/empire-total-war/mods), [TWCenter](https://www.twcenter.net/threads/what-is-your-favourite-total-war-for-naval-battles-warfare.758778/)
- By contrast, **Rome 2**'s galley warfare and **Total War: Pharaoh** (which dropped naval battles entirely for a Bronze Age setting) are cited as disappointments/regressions — evidence that removing large-scale naval battles from a game where the setting calls for them draws real criticism.
- **Takeaway:** large fleet/wave engagements with visible era-appropriate ship silhouettes (ships-of-the-line vs. ironclads) read well to players when the era's signature visual tech (smoke, steam, splash) is foregrounded.

### Naval Action, Ultimate Admiral: Dreadnoughts, From the Depths, Cold Waters, Modern Warships, Atlas

- **Naval Action** — Steam "Mixed," ~49% positive (per search summary). Praised for historically modeled damage (sail/rigging, hull-section penetration, crew loss as separate systems, not one HP bar); explicitly a slow, "earned" simulation, not a quick-session game. Criticized for pay-to-win DLC and a steep learning curve. **Takeaway:** granular rigging/hull/crew damage is a proven source of depth, but taken this far it becomes incompatible with short sessions — the opposite of what we need. [PC Gamer](https://www.pcgamer.com/fight-sail-and-sink-in-open-world-mmo-naval-action/), [mmos.com](https://mmos.com/review/naval-action)
- **Ultimate Admiral: Dreadnoughts** — ~62% positive (per search summary); its most-praised feature is a **ship designer** letting players place armor, turrets and machinery on a hull, called "the most comprehensive tool ever created for the genre." Campaigns span 1890–1940+, squarely our "Age of Dreadnoughts" period. **Takeaway:** a small number of build-defining choices per age (loadout/upgrade picks) captures much of this genre's "design your own capital ship" fantasy without a full ship builder. [Steam](https://store.steampowered.com/app/1069660/Ultimate_Admiral_Dreadnoughts/)
- **From the Depths** — very strong reception (90% positive, per search summary). Praised for block-by-block vehicle construction (1,000+ components) where destroying a specific block changes the vehicle's real-time behavior; steep onboarding noted as a downside. **Takeaway:** localized damage (engine hit = speed loss, gun hit = reduced rate of fire) is a cheap way to capture this without full voxel simulation. [Steam](https://store.steampowered.com/app/268650/From_the_Depths/)
- **Cold Waters** — "Very Positive," ~87% (per search summary); a tense Cold War submarine sim praised for its sonar model, with some "clunky" UI complaints. **Takeaway:** tension can come from detection/stealth mechanics as much as firepower — relevant to our stealth-flavored Arsenal Cruiser. [Steam](https://store.steampowered.com/app/541210/Cold_Waters/), [PC Gamer](https://www.pcgamer.com/cold-waters-is-a-tense-focused-take-on-submarine-combat/)
- **Modern Warships / Warships Mobile** — mixed-to-positive (~64-68% positive, per search summary); praised for flight/submarine physics and a large modern roster (200+ ships/aircraft including drones); criticized for lopsided national representation. **Takeaway:** proves modern combined-arms (carrier air + missiles + drones) reads well in short, match-based sessions rather than full simulations — directly relevant to Age of Airpower/Swarms. [Steam](https://store.steampowered.com/app/3144230/Modern_Warships/)
- **Atlas** — mixed-to-negative, ~32% positive (per search summary), widely described as "ARK: Survival Evolved but with boats." Cited failures: rocky launch, land-claim systems that locked out newcomers, and tedious survival-grind (eat/drink every 5 minutes) bolted onto a pirate MMO fantasy. **Takeaway (anti-pattern):** survival-grind systems dilute a naval combat fantasy — reinforces keeping Armada Ascension a tight, session-based MOBA. [PCWorld](https://www.pcworld.com/article/403099/atlas-review-impressions.html)

### WC3 custom maps: Battleships Crossfire / Battle Ships Pro / Battleships

These are the direct genre ancestor of our concept and deserve the most attention for concrete mechanics:

- **Core structure:** two-team (e.g., "North Empire" vs. "South Empire") naval combat where the win condition is destroying the enemy's main harbor/base — i.e., already a MOBA-shaped base-destruction objective, just with ships instead of heroes on foot. [maps.w3reforged.com](https://maps.w3reforged.com/maps/categories/hero-defense-and-survival/battleships-crossfire)
- **Gold/upgrade loop:** passive gold income funds weapon and hull upgrades; Battleships Crossfire's item system has "doubling" (automatically and freely combining two identical weapons into a stronger one) and "combining" (a purchased ability to fuse hull+sail or crew+wood items via an item-combiner UI) — a satisfying, readable progression loop where players can visually see their ship's loadout compound in power over a match.
- **Ship tiers:** progression from small/cheap ships to bigger, more powerful hulls mirrors our age system directly — the appeal is the same "my ship visibly gets bigger and scarier" power fantasy we're building with Sail → Steam → Dreadnought → Airpower → Swarm.
- **Lanes and towers:** Battle Ships Pro is explicitly built as a 5v5 AoS/MOBA-style map with lane structure and defensive towers, i.e., it already validates the lane+tower+creep-wave structure our STRUCTURES/CREEPS config mirrors.
- **Why they were loved:** low barrier to entry (WC3 custom-map matchmaking, short download), fast readable matches, visible incremental power growth via gold, and clear team-vs-team objectives — precisely the ingredients a hero-ship MOBA needs to reproduce in a modern 3D browser client.

### MOBA crossover lessons: Dota 2 Turbo / League ARAM

- **Dota 2 Turbo:** doubles gold/XP gain, weakens towers, shortens respawns, and gives each player their own courier — collapsing typical 40+ minute ranked matches down to a reported 20–30 minutes. Praised by press as "the best thing Valve has added to the game in years" specifically because it preserves full hero/ability decision-making while cutting the slow build-up phase. [PC Gamer](https://www.pcgamer.com/dota-2-turbo-mode-is-the-best-thing-valve-has-added-to-the-game-in-years/)
- **League ARAM:** single-lane, all-random champion, team-fight-focused mode; academic literature (ACM CHI 2024) frames it as "casual competition by design," lasting roughly 15–20 minutes and deliberately reducing the competitive stakes and lane-phase complexity of the standard 5-lane map so a player experiences a full match arc (skirmish → grouping → closeout) in one sitting. [ACM DL](https://dl.acm.org/doi/10.1145/3686992)
- **Direct lesson for our 10-minute target:** both models compress a match primarily by (1) accelerating gold/XP/level curves rather than shrinking the map, and (2) removing or weakening the slow neutral "farming" phase in favor of forcing early team contact (ARAM's single lane; Turbo's weaker towers/faster respawns). Our MATCH config (passiveGold 4/s, startGold 350, firstWave at 12s, waveInterval 30s) is already tuned in this direction; the research validates that direction rather than suggesting a full lane-map redesign.

---

## 2. Top 12 design lessons for ship-combat feel

1. **Weight and momentum must be readable in the steering input itself**, not just in stats — ships should visibly accelerate/decelerate and carry momentum through turns (Sea of Thieves' sail-trim system, Naval Action's rigging-based turning) so speed and turn rate (already in our `HULLS` table) are felt, not just numeric.
2. **Turn radius should scale inversely with hull size in a way players feel every fight** — our data already ranges turn 1.6 (frigate) down to 1.1–1.2 (carrier/mothership); the games that nail this (WoWS destroyers vs. battleships) make big-hull commitment ("I turned this way, I'm locked in for 3 seconds") a core tactical decision, not a stat footnote.
3. **Broadside/firing arcs create positioning skill** — WoWS's whole skill ceiling rests on "don't show your broadside"; even with top-down MOBA framing, telegraphing a facing-dependent firing arc (vs. omnidirectional) rewards angling and flanking.
4. **Shell travel time (non-hitscan) is what makes gunnery a skill**, per WoWS's arced-ballistics model and Black Flag's cannon lead-aiming — our gun `speed` values (95–260) should stay finite and visible-in-flight rather than becoming instant hitscan, especially for the slower, chunkier Sail/Steam-age guns.
5. **Splash/near-miss feedback matters as much as hit feedback** — WoWS's citadel/near-miss splash geometry teaches players to walk their fire onto a moving target; a near-miss splash plume distinguishable from a hit-splash gives skill feedback even on a miss.
6. **Hit confirmation needs a distinct, escalating tier** (glancing hit → penetrating hit → critical/"citadel" hit), each with its own sound and VFX intensity, mirroring WoWS's citadel mechanic — this is the single most-cited "satisfying" moment across WoWS reviews and should map onto our own gun/ability damage resolution.
7. **Localized/systemic damage reads better than a flat HP bar** — From the Depths' block-based damage (lose a turret, lose a specific capability) and Naval Action's rigging/hull/crew split show players love feeling *what* was damaged, not just *how much*; we can fake this cheaply with damage-state thresholds that visibly disable a turret or slow speed at low HP.
8. **Sinking should be a distinct, unskippable spectacle-beat**, not just an HP-zero despawn — dedicated "sinking" titles (Sinking Simulator) and naval-game round-ups consistently cite the sinking animation itself as a payoff moment; ours should include a multi-second listing/settling/explosion sequence with its own camera beat, not an instant pop.
9. **Weather/environment as an active threat, not a skybox** — Black Flag's Atmos storm system (rogue waves, waterspouts that can capsize) shows that environmental hazards read as legitimate "third player" threats when they can actually damage/displace ships, which fits well as a mid-match map event to break up lane stalemates in our 10-minute format.
10. **Class/role triangle should be legible at a glance by silhouette** — WoWS's DD/CA/BB/CV identity-by-silhouette convention (destroyers low and sleek, battleships tall and armored) should guide our hull art direction per age/role (Brawler/Artillery/Assassin/Controller/Swarm already defined in `HULLS`).
11. **Ability-driven skill expression compounds the base gunnery loop rather than replacing it** — every reviewed title that stays fun long-term (WoWS, From the Depths, Ultimate Admiral) layers cooldown abilities/consumables (smoke, radar, repair) on top of, not instead of, the core aim-and-fire loop; our `ABILITIES` table already does this and should keep base guns relevant even at max age.
12. **Session length must be matched by pacing tools, not map size** — the Turbo/ARAM lesson: to hit 10 minutes reliably we should keep tuning gold/XP acceleration, wave timers and respawn scaling (already present in `MATCH`/`REWARDS`) rather than shrinking the map further, since compressed economies preserve full decision-making inside a short match better than a smaller map does.

## 3. Visual/audio signature moments reviewers praise

- **Storms and rogue waves** (Black Flag's Atmos system) — progressive weather build-up ending in a wave or waterspout that can capsize a ship, repeatedly named a series highlight.
- **Water rendering itself as a headline feature** — Sea of Thieves' FFT/Gerstner-wave ocean is cited by name in reviews ("that water!") as an audiovisual selling point independent of gameplay; water is not set dressing in this genre, it's a marquee visual.
- **Cannon smoke and muzzle flash density** — Total War's Shogun 2: Fall of the Samurai steamer battles are specifically praised for smoke/steam effects layered over water texture, giving big fleet fights visual density and readability of where fire is coming from.
- **Sinking sequences** — settling, listing, and the final plunge (with debris, survivors, and secondary explosions) are called out across multiple round-up articles (Enigma: Rising Tide, Sinking Simulator) as the genre's most gratifying capstone visual.
- **Bespoke per-ship gunfire audio ("sound passports")** — WoWS's approach of giving every ship class/hull a distinct sound signature (deliberately exaggerated for satisfaction over realism) is a cheap, high-leverage audio investment: distinct, punchy sounds per age/hull type (sail cannon vs. steam shell vs. railgun pulse vs. laser) will do a lot of work for perceived quality.
- **Ambient crew/sea-shanty audio layer** — Black Flag's dynamically triggered shanties are consistently named as a beloved atmosphere detail; an equivalent ambient layer (creaking hulls in Age of Sail, engine thrum in Age of Steam, reactor hum in Age of Swarms) would give each age a distinct sonic identity that reinforces the age-progression fantasy.
- **Water spray/wake feedback tied to speed abilities** — our `fullsail`/`steamsurge`/`afterburn` speed-buff abilities are natural places to invest in a spray/wake VFX spike, since "ship visibly surging through water" is a moment reviewers consistently call out as viscerally satisfying (Naval Action, Black Flag).

## 4. Concrete recommendations mapped to our systems, and anti-patterns to avoid

**Ages (`AGES`/`AGE_HULLS`):** Give each age a distinct *combat verb*, not just bigger numbers — Sail should feel like broadside positioning (arcs, wind), Steam should introduce ramming/armor trade-offs (already present via `ram`), Dreadnought should be about long-range salvo timing (`mainbattery`), Airpower should introduce a genuinely different input mode (drone/plane micro, matching Carrier's `fighters`/`divebomb`), and Swarm should feel like area-denial/attrition (`microswarm`/`hivestorm`) rather than "Dreadnought but stronger." This mirrors why WoWS's DD/CA/BB/CV roles stay distinct rather than being a single power ladder.

**Hulls (`HULLS`):** The age-3/4/5 branch choices (Dreadnought/Torpedo, Battleship/Carrier, Arsenal/Mothership) should keep silhouette and audio distinct per WoWS's silhouette-legibility lesson — carriers and motherships in particular need a visibly different "I am not a gunship" read (larger flat deck, drone-hive glow) since their `guns.dmg` is comparatively low and their power lives in abilities.

**Abilities (`ABILITIES`):** Continue investing in tiered hit-feedback (regular hit vs. `he_shell`'s splash-radius detonation vs. `railgun`'s piercing beam vs. `hypersonic`'s area-wipe) with escalating VFX/audio/camera-shake intensity — this directly implements lesson #6 (citadel-style hit-tiering) using systems already defined.

**Economy (`UPGRADES`/`REWARDS`/`PORTS`):** The existing passive-gold-plus-kill/assist/streak/port-capture blend already matches the Turbo/ARAM lesson of accelerating economy rather than shrinking the map; consider making early upgrade tiers (`plating`/`gunnery` level 1) cheap enough to buy within the first wave (12s) so players feel the "gold/upgrade loop" satisfaction WC3 Battleships maps were loved for within the first minute, not the first three.

**Bots (`DIFFICULTY`):** Naval Action and Cold Waters show that AI opponents feel best when they respect the same ballistic/positioning rules as the player (leading shots, respecting arcs) rather than cheating with instant-hit accuracy; tie bot `aim` scaling to the same shell-travel-time model players experience, not a hidden hit-chance roll.

**10-minute pacing:** Validate against Turbo (20–30 min from a 40+ min baseline via 2x gold/XP, weaker towers, shorter respawns) and ARAM (15–20 min via single-lane, no farm phase) — our 600s match target is aggressive by comparison, so `respawnBase`/`respawnPerAge` and `waveInterval` should be watched closely in playtesting to make sure a losing team doesn't get locked out of comebacks the way slow economies punish stalling in longer-form MOBAs.

**Five anti-patterns to avoid:**

1. **Do not let any age/hull's dominance be justified by "it keeps players engaged" (WoWS carrier rework)** — balance every age tier as if popularity and power were unrelated; a hull that's simultaneously the most popular and the strongest should be treated as a bug, not a retention feature.
2. **Do not gate competitive parity behind acquisition cost or grind (WoWS monetization backlash, Naval Action's pay-to-win DLC)** — even without real-money monetization in scope, avoid any in-match gold-gated power spike so large that a losing team's hull choice becomes mathematically unwinnable.
3. **Do not strip the "person on the ship" identity layer while keeping only abstract naval mechanics (Skull and Bones)** — our hero-ship framing already avoids this by making the ship itself the hero with named abilities and a bot-opponent roster of named admirals (`BOT_NAMES`), but keep leaning into personality (voice lines, ability flavor text) rather than letting hulls become interchangeable stat blocks.
4. **Do not bolt on survival-grind systems that fight the core combat fantasy (Atlas)** — resist any future feature (resource gathering, hunger/durability micromanagement) that would slow the match pacing our 10-minute design commits to.
5. **Do not chase full simulation-depth ballistics/rigging modeling at the cost of session length (Naval Action)** — depth should come from ability/hull-role variety and tiered hit-feedback, not from a rigging/crew/hull-section simulation that makes a single engagement take minutes to resolve; keep our arcade-weighted, Black-Flag-style combat pacing (fast, brutal, streamlined) as the north star over simulation fidelity.

---

## Sources

- [World of Warships Reviews - Metacritic](https://www.metacritic.com/game/world-of-warships/)
- [World of Warships: Legends Reviews - Metacritic](https://www.metacritic.com/game/world-of-warships-legends/)
- [BrokenBase / World of Warships - TV Tropes](https://tvtropes.org/pmwiki/pmwiki.php/BrokenBase/WorldOfWarships)
- [Steam discussion: OMG the Carrier Rework is so bad!](https://steamcommunity.com/app/552990/discussions/0/1640915206478375090/)
- ['Aggressive monetisation' is driving prominent players away from World of Warships — PC Gamer](https://www.pcgamer.com/aggressive-monetisation-is-driving-prominent-players-away-from-world-of-warships/)
- [The Soapbox: World of Warships' aggressive monetization incited a mass-exodus of content creators — Massively OP](https://massivelyop.com/2021/08/16/the-soapbox-world-of-warships-aggressive-monetization-incited-a-mass-exodus-of-content-creators/)
- [World of Warships Gun Mechanics Guide](https://warshipsgames.com/world-of-warships-gun-mechanics-guide/)
- [Wargaming: Secrets of Sound](https://wargaming.com/en/news/sound_design/)
- [Wargaming Dev Diaries 10: Stamping the Sound Passport](https://wargaming.com/en/news/dev_diaries_10/)
- [The technical art of Sea of Thieves — ACM SIGGRAPH 2018 Talks](https://dl.acm.org/doi/10.1145/3214745.3214820)
- [Sea of Thieves: How Rare Achieved the Best Water Physics in Video Games](https://playersforlife.com/2024/05/01/sea-of-thieves-how-rare-achieved-the-best-water-physics-in-video-games/)
- [Sea of Thieves Reviews - Metacritic](https://www.metacritic.com/game/sea-of-thieves/)
- [Sea of Thieves critic reviews - Metacritic](https://www.metacritic.com/game/sea-of-thieves/critic-reviews/)
- [Assassin's Creed IV: Black Flag Review — GameSpot](https://www.gamespot.com/reviews/assassin-s-creed-iv-black-flag-review/1900-6415509/)
- [Review: Assassin's Creed IV: Black Flag — Destructoid](https://www.destructoid.com/reviews/review-assassins-creed-iv-black-flag/)
- [Assassin's Creed Black Flag Resynced - Deep Dive into the Naval Gameplay — Ubisoft](https://news.ubisoft.com/en-us/article/2ld4JIABg5aOvoiUlJlUWF/assassins-creed-black-flag-resynced-deep-dive-into-the-naval-gameplay)
- [Skull And Bones Hit With Overwhelmingly Negative Player Reviews — TheGamer](https://www.thegamer.com/skull-and-bones-reviews-negative-players/)
- [Skull and Bones has the lowest Metacritic user score of 2024 so far — TechSpot](https://www.techspot.com/news/101931-skull-bones-currently-has-lowest-metacritic-user-score.html)
- [Skull and Bones Has Extremely Low Metacritic User Score — GameRant](https://gamerant.com/skull-and-bones-reviews-metacritic-scores/)
- [Total War fans celebrating Empire: Total War's naval battles — PCGamesN](https://www.pcgamesn.com/empire-total-war/mods)
- [Favourite Total War for naval battles/warfare — TWCenter](https://www.twcenter.net/threads/what-is-your-favourite-total-war-for-naval-battles-warfare.758778/)
- [Naval Action on Steam](https://store.steampowered.com/app/311310/Naval_Action/)
- [Fight, sail, and sink in open-world MMO Naval Action — PC Gamer](https://www.pcgamer.com/fight-sail-and-sink-in-open-world-mmo-naval-action/)
- [Naval Action Game Review — mmos.com](https://mmos.com/review/naval-action)
- [Ultimate Admiral: Dreadnoughts on Steam](https://store.steampowered.com/app/1069660/Ultimate_Admiral_Dreadnoughts/)
- [From the Depths on Steam](https://store.steampowered.com/app/268650/From_the_Depths/)
- [Cold Waters on Steam](https://store.steampowered.com/app/541210/Cold_Waters/)
- [Cold Waters is a tense, focused take on submarine combat — PC Gamer](https://www.pcgamer.com/cold-waters-is-a-tense-focused-take-on-submarine-combat/)
- [Modern Warships on Steam](https://store.steampowered.com/app/3144230/Modern_Warships/)
- [Atlas is a disheartening MMO shipwreck that plunders your time — PCWorld](https://www.pcworld.com/article/403099/atlas-review-impressions.html)
- [Atlas (video game) — Wikipedia](https://en.wikipedia.org/wiki/Atlas_(video_game))
- [Battleships Crossfire map database — w3reforged](https://maps.w3reforged.com/maps/categories/hero-defense-and-survival/battleships-crossfire)
- [Battleships Pro map database — w3reforged](https://maps.w3reforged.com/maps/categories/hero-defense-and-survival/Battleships%20Pro%20by%20Mofear)
- [Dota 2 Turbo mode is the best thing Valve has added to the game in years — PC Gamer](https://www.pcgamer.com/dota-2-turbo-mode-is-the-best-thing-valve-has-added-to-the-game-in-years/)
- [Casual Competition by Design: A Study of ARAM in League of Legends — ACM CHI](https://dl.acm.org/doi/10.1145/3686992)
- [The best naval games on PC — Wargamer](https://www.wargamer.com/best-naval-games)
- [6 Games With The Best Ship Combat — GameRant](https://gamerant.com/games-best-ship-combat/)
- [Sinking Simulator on Steam](https://store.steampowered.com/app/1164850/Sinking_Simulator/)

*Compiled by Claude Code, September 2026, for the Armada Ascension naval MOBA design effort. Figures marked "(per search summary, unverified)" were reported by WebSearch result summaries rather than confirmed against primary review pages, since direct page fetches were unavailable in this session.*
