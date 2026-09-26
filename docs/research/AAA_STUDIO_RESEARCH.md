# What the Top 1% of AAA Studios Do: Research for BlueWhale

*A research brief for a browser-based (Three.js) 5v5 naval MOBA. Compiled September 2026.*

> **Method and caveats.** Sources were gathered by web search. Direct page fetching was blocked in the research environment, so most claims come from search-result summaries of the cited pages rather than full reads. Treat every figure as "as reported by the linked source". Where a number could not be checked, or where sources disagree, the text says so. Recommendations in Sections 5 and 6 are this document's own engineering judgement, not claims about any studio.

---

## 1. Executive summary: the ingredients, ranked

Ranked by how much each one explains the quality gap between top studios and everyone else, and how well it carries over to a small web team.

1. **A single, strong art direction that beats raw fidelity.** Genshin Impact's anime look, Black Myth's scanned Chinese heritage and Dota 2's readable silhouettes all win on *style* and *coherence*, not polygon counts. miHoYo chose the anime style and set "art core pillars" before building the world ([GDC 2021, Hugh Cai](https://gdcvault.com/play/1027539/-Genshin-Impact-Crafting-an)).
2. **A playable whole early, then iteration.** CDPR's biggest process change after Cyberpunk: the base game "couldn't be played in full until ~80-90% of development"; Phantom Liberty was playable end to end about a month into active development ([Game Informer summary](https://gameinformer.com/2023/09/14/lessons-learned-from-cyberpunk-2077s-terrible-launch-and-hands-on-with-phantom-liberty)). Mark Cerny's "publishable first playable" is the same idea ([Cerny Method](https://iterative.co.nz/mark-cerny-method)).
3. **Game feel ("juice") as a discipline**, not a polish pass: hit-stop, screen shake, layered audio, anticipation and impact ([Sakurai on hitstop](https://sourcegaming.info/2015/11/11/thoughts-on-hitstop-sakurais-famitsu-column-vol-490-1/); [Vlambeer, The Art of Screenshake](https://www.youtube.com/watch?v=AJdEqssNZ-U); [Juice It or Lose It](https://www.gdcvault.com/play/1016487/juice-it-or-lose)). Game Science spent a long time on "basic functions, hit feedback, AI, and combo feel" ([PC Gamer](https://www.pcgamer.com/games/action/black-myth-wukong-developer-gamescience-had-to-grow-into-a-aaa-powerhouse-to-bring-its-vision-of-journey-to-the-west-to-life/)).
4. **Readability before spectacle** (critical for a MOBA). Riot's VFX priorities are gameplay accuracy first, readability second and theme third, and "visual impact should represent gameplay impact" ([Riot VFX style guide](https://nexus.leagueoflegends.com/en-us/2017/10/dev-leagues-vfx-style-guide/); [Clarity in League](https://www.leagueoflegends.com/en-us/news/dev/clarity-in-league/)).
5. **Honest performance targets on the weakest platform you ship to.** Cyberpunk was pulled from the PlayStation Store over last-gen performance ([CNBC](https://www.cnbc.com/2020/12/18/sony-pulls-cyberpunk-2077-from-playstation-store-after-backlash.html)), and Black Myth's PS5 modes were criticised ([Digital Foundry via N4G](https://n4g.com/news/2617514/black-myth-wukong-ps5-tech-review-excellent-visuals-but-too-many-tech-problems)). For us, the weakest platform is a mid-range laptop or phone browser.
6. **Lighting as the main source of mood**: GI, atmosphere, volumetrics and a tuned tonemapper. Lumen let Game Science drop lightmap baking and iterate on lighting in real time ([Unreal Engine interview](https://www.unrealengine.com/en-US/developer-interviews/black-myth-wukong-wows-with-ue5-early-access-visuals)).
7. **Cross-functional content pods with clear ownership.** CDPR moved from a siloed "old-fashioned" structure to pods of quest designers, cinematic designers, writers, QA and artists working on one piece of content ([Game Informer](https://gameinformer.com/2023/09/14/lessons-learned-from-cyberpunk-2077s-terrible-launch-and-hands-on-with-phantom-liberty)). Naughty Dog's flat, producer-light structure pursues the same goal ([Game Developer](https://www.gamedeveloper.com/production/-i-uncharted-4-i-and-the-impact-of-naughty-dog-s-aversion-to-producers)).
8. **Buy the engine, own the look.** CDPR left REDengine for UE5 to be "a video game company, not a tech company" ([TechPowerUp](https://www.techpowerup.com/352859/cd-projekt-red-explains-why-the-witcher-4-switched-to-unreal-engine-5)). miHoYo customised Unity deeply rather than writing an engine ([Unity Japan talk, Zhenzhong Yi](https://www.docswell.com/s/UnityJapan/KWRPQ5-210617-unity-dojo20211mihoyozhenzhongyi)). Our version: use Three.js, and spend the effort on shaders and art.
9. **Culturally specific identity.** Black Myth's scanned temples and Shaanbei storytelling music ([Global Times](https://www.globaltimes.cn/page/202408/1318580.shtml); [Wikipedia](https://en.wikipedia.org/wiki/Black_Myth:_Wukong)) and Genshin's real-world-inspired nations ([Siliconera](https://www.siliconera.com/genshin-impact-gdc-2021-character-designs/)) make the games memorable. Naval history from sail to carrier is our equivalent.
10. **A fixed, predictable live cadence** (if we go live-service). Genshin runs 42-day versions split into two 21-day phases ([Genshin wiki](https://genshin-impact.fandom.com/wiki/Version)).
11. **Sound designed for play, not only for mood.** Overwatch's director set "Play by Sound" as a production goal, and enemy footsteps are louder than allies' ([GDC 2016](https://gdcvault.com/play/1023317/Overwatch-The-Elusive-Goal-Play); [Game Developer](https://www.gamedeveloper.com/audio/video-how-i-overwatch-i-was-designed-so-people-could-play-by-sound-)).
12. **A match-pacing skeleton built for the target length**: a smaller map, faster XP and shorter respawns (Wild Rift), shared XP (Heroes of the Storm) and a scripted final-stretch event (Pokemon Unite) ([Wild Rift](https://www.fragster.com/how-long-do-wild-rift-games-last-a-quick-guide-to-match-durations/); [HotS](https://heroesofthestorm.fandom.com/wiki/Heroes_of_the_Storm); [Pokemon Unite](https://www.sportskeeda.com/pokemon/rayquaza-pokemon-unite-when-appear-buffs)).
13. **Bots worth playing against.** Valve's utility-style "desire" architecture is simple enough to copy ([Dota Bot Scripting](https://pastebin.com/du8mRjei)).
14. **Accessibility and options as a quality signal.** The Last of Us Part II shipped more than 60 accessibility settings ([Naughty Dog](https://www.naughtydog.com/blog/the_last_of_us_part_ii_accessibility_features_detailed)).
15. **Sustainable pace.** Crunch is a documented failure mode even at the very top: Cyberpunk ([Bloomberg via PCGamesN](https://www.pcgamesn.com/cyberpunk-2077/report-crunch-e3)) and TLOU2 ([Kotaku](https://kotaku.com/as-naughty-dog-crunches-on-the-last-of-us-ii-developer-1842289962)). It is a cost, not an ingredient.

---

## 2. Studio case studies

### 2.1 CD Projekt Red: Cyberpunk 2077, 2.0, Phantom Liberty, and the move to UE5

**Team and org.**
- Phantom Liberty plus Update 2.0 reportedly cost about USD 63M and involved around 400 in-house developers plus co-development partners ([Wikipedia: Phantom Liberty](https://en.wikipedia.org/wiki/Cyberpunk_2077:_Phantom_Liberty)).
- The key structural change was the move from waterfall to agile, with content pods. Each pod combined quest design, cinematics, writing, QA and art on a single piece of content, replacing a structure that CDPR said had bottlenecks ([Game Informer](https://gameinformer.com/2023/09/14/lessons-learned-from-cyberpunk-2077s-terrible-launch-and-hands-on-with-phantom-liberty)).
- Leadership named "alignment" as the biggest lesson, alongside clear ownership, cross-team communication and realistic planning ([GameFile](https://www.gamefile.news/p/interview-cd-projekt-red-has-learned)).
- A Cyberpunk 2 associate director said Cyberpunk "forced us to grow up as a studio… we have redone or iterated most of our procedures" ([GamingBolt](https://gamingbolt.com/cyberpunk-2-associate-director-on-lessons-learned-from-2077-it-forced-us-to-grow-up-as-a-studio)).

**What went wrong at launch (December 2020).**
- Bloomberg's investigation, based on more than 20 staff, reported the following ([PCGamesN](https://www.pcgamesn.com/cyberpunk-2077/report-crunch-e3); [Newsweek](https://www.newsweek.com/cyberpunk-2077-e3-demo-fake-bugs-ignored-developers-say-1562097)):
  - The E3 2018 demo was "almost entirely fake": the underlying systems had not been built.
  - Full development only started around 2016, although the game was announced in 2012.
  - The engine and the game were being built at the same time ("driving a train while the tracks are being laid").
  - Deadlines were unrealistic, and there was a belief that "we made The Witcher 3 — it'll work out".
- Some programmers warned that last-gen consoles could not run the game well, and were overruled ([Game World Observer](https://gameworldobserver.com/2021/01/18/cd-projekt-red)).
- Sony removed the game from the PlayStation Store and offered refunds. It was the first high-profile game treated that way ([Game Developer](https://www.gamedeveloper.com/business/sony-removes-i-cyberpunk-i-from-playstation-store-promises-refunds); [CNBC](https://www.cnbc.com/2020/12/18/sony-pulls-cyberpunk-2077-from-playstation-store-after-backlash.html)).
- CDPR apologised, in part for *not showing the game running on base last-gen consoles before launch* ([Wccftech](https://wccftech.com/cd-projekt-red-apologizes-cyberpunk-2077-ps4-xb1-performance-promises-patches-are-inbound/)).

**The turnaround.**
- Update 2.0 (September 21, 2023) was a systemic redesign, not only a set of bug fixes ([Kotaku](https://kotaku.com/cyberpunk-2077-update-2-0-patch-notes-skills-cyberware-1850861309); [Dexerto](https://www.dexerto.com/cyberpunk-2077/cyberpunk-2077-2-0-update-patch-notes-perk-tree-overhaul-new-police-system-more-2303732/)):
  - The perk trees were rebuilt with fewer perks, each with more impact, and with build-defining abilities.
  - A proper police pursuit system was added, with escalating wanted levels.
  - Players can now fight from vehicles.
  - The lesson: players forgive a bad launch if the core loops are rebuilt, but not if the studio only patches around them.
- Sales passed 30M by November 2024 ([PC Games Insider](https://www.pcgamesinsider.biz/news/74838/cyberpunk-2077-hits-30m-sales/)). VGChartz later reported over 35M and then over 40M, citing CD Projekt ([VGChartz](https://www.vgchartz.com/article/468389/cyberpunk-2077-sales-top-40-million-units/)). Not independently verified here.

**Tech and pipeline.**
- RT Overdrive (full path tracing) was built with Nvidia, using RTXDI for many-light direct illumination and later ReSTIR GI ([Nvidia](https://www.nvidia.com/en-us/geforce/news/cyberpunk-2077-ray-tracing-overdrive-update-launches-april-11); [ReSTIR course slides](https://intro-to-restir.cwyman.org/presentations/2023ReSTIR_Course_Cyberpunk_2077_Integration.pdf)). Night City's look depends on thousands of emissive light sources: neon, signs and headlights.
- **The move to UE5.** CDPR moved to UE5 for The Witcher 4 and later projects ([TechPowerUp](https://www.techpowerup.com/352859/cd-projekt-red-explains-why-the-witcher-4-switched-to-unreal-engine-5); [MP1st](https://mp1st.com/news/cd-projekt-explains-reason-it-switched-to-unreal-engine-5)):
  - The stated aim was to make "convincing and immersive" games rather than act as a technology company.
  - Leadership said it had to redesign large parts of REDengine each cycle.
  - The co-CEO called the idea that REDengine *caused* Cyberpunk's problems "a bit of a false assumption", and said the decision followed an early look at Epic's Matrix Awakens demo ([VGC](https://www.videogameschronicle.com/news/cd-projekt-reds-move-from-redengine-to-ue5-for-the-witcher-4-wasnt-because-of-cyberpunks-launch-co-ceo-says/)).
- CDPR did not simply adopt UE5; it co-develops it. The Witcher 4 tech demo (State of Unreal 2025) ran on PS5 at 60 fps and showed several shared technologies ([CDPR press](https://press.cdprojektred.com/en/news/1778/cd-projekt-red-and-epic-games-present-the-witcher-4-unreal-engine-5-tech-demo-at-the-state-of-unreal-2025)):
  - FastGeo streaming, built with Epic
  - Nanite Foliage
  - Mass AI crowds
  - ML Deformer
  - The new Unreal Animation Framework

**Art direction, VFX, SFX and lighting.**
- Night City is an art-directed city first, with distinct district moods, and path tracing was added later as a high-end layer.
- Music is treated as part of the art direction. Composer P.T. Adamczyk: "Everything has to work together to create one coherent image" ([CDPR press](https://press.cdprojektred.com/en/news/1384/listen-to-the-tunes-from-cyberpunk-2077-phantom-liberty-today)).
- Radio stations double as world-building, including a community-made station, Growl FM.

**Production lessons for us.**
1. Never show footage of systems that do not exist yet.
2. Test on the weakest target platform continuously, not in the final months.
3. Get the game playable from start to end early.
4. Put small cross-disciplinary teams on each feature.
5. If a core system is weak, rebuild it rather than patch around it.

### 2.2 miHoYo / HoYoverse: Genshin Impact, Honkai: Star Rail, Zenless Zone Zero

**Team and org.**
- Headcount figures conflict. One data provider lists 4,507 employees in 2024, while a fan-circulated figure claims 6,677 ([Revelio Labs](https://www.reveliolabs.com/companies/mihoyo/employees)). Treat both as unverified.
- Hugh (Haoyu) Cai, then CEO, was the producer of Genshin and presented its GDC 2021 talk ([GDC Vault](https://gdcvault.com/play/1027539/-Genshin-Impact-Crafting-an)).
- HoYoverse is reported to be a significant shareholder in Unity China. This comes from secondary sources only and was not verified.

**Tech and pipeline: customised Unity.**
- Genshin uses Unity, heavily modified. miHoYo's technical director said Unity's "concise coding style" made it practical to customise the rendering pipeline for mobile and console ([Unity Japan / Zhenzhong Yi slides](https://www.docswell.com/s/UnityJapan/KWRPQ5-210617-unity-dojo20211mihoyozhenzhongyi)).
- Details reported from that talk ([summary](https://nugglet.github.io/posts/2022/12/console_graphics_rendering_pipeline_genshin_impact)):
  - **Split shading.** Characters use forward rendering while the scene uses deferred shading, so artists keep full control of how characters are lit.
  - **Shadows.** Up to 8 shadow cascades (instead of the usual 4) with Poisson-noise soft shadows. The near 4 cascades update every frame and the far 4 are interleaved. Shadow caching cuts draw calls.
  - **Volumetric fog.** The view frustum is voxelised and aligned with clustered-deferred light clusters, so local lights (including projected textures) light the fog.
- **Face shading.** The light/shadow boundary on faces is art-directed and adjusts with the main light's direction, so the terminator line on the face always looks good. Outlines appear as a stylised rim. Reports differ on whether this uses inverted-hull geometry or post-process Sobel edge detection; fan reimplementations use both ([Class Central summary of GDC talk](https://www.classcentral.com/course/youtube-genshin-impact-crafting-an-anime-style-open-world-165663); [HoyoToon](https://github.com/Hoyotoon/HoyoToon); [Adrian Mendez breakdown](https://adrianmendez.artstation.com/projects/wJZ4Gg)). *Exact internals are not publicly documented. Fan shaders are reverse-engineered approximations.*
- **Cross-platform.** One account and one save across mobile, PC, PS4 and PS5, with cross-save added in version 2.0 ([PCGamesN](https://www.pcgamesn.com/genshin-impact/cross-save)). PS5 runs at native 4K/60 ([Twisted Voxel](https://twistedvoxel.com/genshin-impact-now-runs-at-native-4k-at-60-fps-on-ps5/)). Content is authored once, and scalability comes from rendering tiers rather than separate asset sets. That last point is inferred from the talk and not confirmed in detail.

**Art direction.**
- The GDC 2021 talk covered why they chose the anime style, the "art core pillars", real-world cultures as inspiration for each nation, and character creation ([Siliconera](https://www.siliconera.com/genshin-impact-gdc-2021-character-designs/)).
- miHoYo says characters "are the most desired content for players" and "the foundation for commercialization". The business model and the art pipeline are one system.
- ZZZ designs each agent's combat style from their personality and background, so visuals, motion and mechanics tell one story ([ZZZ official, Ye Shunguang design video](https://zenless.hoyoverse.com/en-us/news/161660)).

**Design pillars.**
- **Genshin.** A "chemistry engine" of elemental reactions acts as a systemic layer, much as a physics engine does ([Game Design Post](https://medium.com/game-design-post/the-chemistry-engine-powering-the-core-pillars-of-genshin-impact-b1e48971aa7)). Character swapping plus reactions is what makes a team more than its members.
- **Honkai: Star Rail.** The goal was to make turn-based combat accessible yet deep for a mass audience, and to make a live-service turn-based game work where "most turn-based games were not live-service" ([GDC Vault, Chengnan An](https://gdcvault.com/play/1035480/-Honkai-Star-Rail-Reimagining); [Pocket Tactics](https://www.pockettactics.com/honkai-star-rail/gdc-interview)).
- **Zenless Zone Zero.** Perfect Assist turns defence into a strong-feedback moment. The designers found that limiting strong feedback to offence (Chain Attacks) "felt dull", so they rewarded well-timed swaps and parries as well ([Beebom review / dev notes](https://beebom.com/zenless-zone-zero-review/); [Dot Esports](https://dotesports.com/zzz/news/zenless-zone-zero-how-to-perform-a-perfect-assist-in-zzz)). **This lesson carries straight over to our game:** defensive plays such as dodging a torpedo spread or a well-timed smoke screen deserve hit-stop and sting-level feedback too.

**Live-service cadence and economics.**
- **Cadence.** Genshin runs 42-day versions of two 21-day banner phases, very consistently ([Genshin wiki](https://genshin-impact.fandom.com/wiki/Version); [Game8](https://game8.co/games/Genshin-Impact/archives/402264)).
- **Gacha pity.** A hard pity at 90 pulls, a soft pity ramp from about pull 74, a 50/50 with a guarantee after a loss, and later "Capturing Radiance", which reportedly raises effective featured odds to about 55% ([Game8](https://game8.co/games/Genshin-Impact/archives/305937); [PlayAware](https://playaware.gg/guides/genshin-pity)). Fan guides are the source for the exact curves.
- **Revenue** (Sensor Tower mobile estimates; these exclude PC, console and Chinese third-party Android):
  - Genshin: about USD 2B in its first year, and USD 1B in under 6 months ([Sensor Tower](https://sensortower.com/blog/genshin-impact-mobile-two-billion-revenue)).
  - Star Rail: over USD 1B across all platforms in its first year, per Naavik ([GameDev Reports](https://gamedevreports.substack.com/p/naavik-honkai-star-rail-revenue-surpassed)).
  - ZZZ: about USD 96M in its first month on mobile ([GosuGamers](https://www.gosugamers.net/zenless-zone-zero/news/72406-zenless-zone-zero-rakes-in-96-million-in-global-mobile-earnings-in-its-launch-month)).
- **For a competitive 5v5 game**, gacha that sells *power* would break fairness. The transferable parts are:
  - cosmetics with character-level production value
  - a predictable content calendar
  - a Riot-style rule that skins may never be clearer or less clear than the base ability ([Clarity in League](https://www.leagueoflegends.com/en-us/news/dev/clarity-in-league/))

**Production lessons.**
1. Choose a style you can make at scale across every platform.
2. Customise the renderer where the style needs it, especially characters and faces, and use stock features elsewhere.
3. Build the business model, the content calendar and the art pipeline together.

### 2.3 Game Science: Black Myth: Wukong

**Team and org.**
- Founded in 2014 by Feng Ji (ex-Tencent) and colleagues. Development of Wukong started in 2018 ([Wikipedia](https://en.wikipedia.org/wiki/Black_Myth:_Wukong)).
- The team was about 7 people at the start, about 20 by 2019 and about 30 by around 2022. About 140 are credited at release, per Wikipedia's reading of the credits. The mid-period figures come from secondary sources and look low; treat them with caution.
- The August 2020 13-minute pre-alpha video was partly a **recruitment ad**, because the studio was "quite short of people" ([GameRevolution](https://www.gamerevolution.com/news/656759-black-myth-wukong-gameplay-trailer-development-recruiting-ad)). A vertical slice good enough to recruit with is a strategy in its own right.
- A widely repeated cost figure ("15-20 million RMB per hour") is garbled in secondary sources. It probably refers to cost per hour of gameplay, and it is **unverified**.

**Results.**
- 10M copies in 3 days ([Wccftech](https://wccftech.com/black-myth-wukong-sells-a-whopping-10-million-copies-in-just-three-days-surpassing-industry-records/)).
- A peak of about 2.2-2.36M concurrent players on Steam, the highest ever for a single-player game ([TechNode](https://technode.com/2024/08/21/black-myth-wukong-hits-2-2-million-concurrent-players-on-launch-day-second-highest-all-time-peak-on-steam/); [TechSpot](https://www.techspot.com/news/104365-black-myth-wukong-smashes-steam-concurrent-single-player.html)).
- The sequel, Black Myth: Zhong Kui, was revealed at Gamescom 2025 ([TechNode](https://technode.com/2025/08/20/game-science-reveals-black-myth-zhong-kui-trailer-at-gamescom-2025-following-global-success-of-black-myth-wukong/)).

**Tech and pipeline.**
- **Engine.** The project started on UE4 and moved to UE5 partway through, announced in 2021 ([GamesRadar](https://www.gamesradar.com/black-myth-wukong-trailer-reveals-switch-to-unreal-engine-5/)). CTO Zhao Wenyong said the migration was faster than their earlier move from UE 4.24 to 4.26 ([Unreal Engine interview](https://www.unrealengine.com/en-US/developer-interviews/black-myth-wukong-wows-with-ue5-early-access-visuals)).
- **Why they valued Nanite and Lumen: production speed, not just looks.**
  - Lumen removed the need to bake lightmaps or to "use point lights to fake GI", which made lighting iteration interactive.
  - Nanite made scene performance optimisation much easier ([same interview](https://www.unrealengine.com/en-US/developer-interviews/black-myth-wukong-wows-with-ue5-early-access-visuals)).
  - On PC, full ray tracing (path tracing) and DLSS 3 were added with Nvidia ([Nvidia](https://www.nvidia.com/en-us/geforce/news/black-myth-wukong-full-ray-tracing-dlss-3/)).
- **Photogrammetry.**
  - 36 in-game locations are modelled on real sites, 27 of them in Shanxi, including the Jade Emperor Temple and Kaiyuan Temple ([Global Times](https://www.globaltimes.cn/page/202408/1318580.shtml)).
  - The team scanned the Yungang and Longmen grottoes ([China Heritage Guide](https://chinaheritageguide.com/black-myth-real-museum-guide)).
  - They abandoned one scan, of the Ming statues at Gaoping Iron Buddha Temple, because the confined space risked damaging the relics.
  - Their scan library reportedly exceeds the game's needs by 6-7x ([Sohu/GDToday](https://www.newsgd.com/node_d36b0ef83f/a92f49969d.shtml); [Shining3D](https://www.shining3d.com/how-black-myth-wukong-turned-chinas-historical-and-cultural-heritage-into-realistic-game-digital-models-through-3d-scanning-technology)).

**Art direction and cultural IP.**
- The source is the classical novel *Journey to the West*.
- The music mixes Chinese instruments with Western orchestra, Shaanbei storytelling, Hua'er folk singing and Buddhist chant. It includes a symphonic rearrangement of "Yungong Xunyin", the theme of the 1986 TV series ([Wikipedia](https://en.wikipedia.org/wiki/Black_Myth:_Wukong)).
- Nostalgia and heritage are used deliberately as emotional amplifiers.

**Combat feel and boss design.**
- Stated goal: fluid movement and many transformations, so players have "space to think through what abilities they should use to conquer each enemy and boss" ([PC Gamer](https://www.pcgamer.com/games/action/black-myth-wukong-developer-gamescience-had-to-grow-into-a-aaa-powerhouse-to-bring-its-vision-of-journey-to-the-west-to-life/)).
- Early bosses act as skill checks for light/heavy attacks, dodge and chain-dodge timing ([UX Collective analysis](https://uxdesign.cc/how-to-design-an-early-boss-fight-wandering-wight-boss-in-black-myth-wukong-6ec8408d06e0)). The game is boss-dense, which reviewers saw as both a strength and a pacing weakness ([PC Gamer preview](https://www.pcgamer.com/games/rpg/my-first-2-hours-with-black-myth-wukong-were-a-flurry-of-demanding-boss-fights-unbelievably-pretty-characters-and-a-surprisingly-sparse-world/)).
- **Weaknesses.**
  - Critics cited invisible walls, uneven level design and hit-detection complaints.
  - On PS5, Digital Foundry found unstable performance modes, including drops into the 30s and 40s when alpha effects fill the screen ([ResetEra thread on DF](https://www.resetera.com/threads/digital-foundry-black-myth-wukong-ps5-tech-review-excellent-visuals-but-too-many-tech-problems.960147/)).
  - **Lesson:** overdraw from transparent particles is the classic frame-rate killer, and it will be ours too in team fights.

**Production lessons.**
1. A small team can reach AAA quality by leaning on a commercial engine's "free" features (GI, virtualised geometry) and putting the saved effort into one distinctive cultural identity.
2. Use a vertical slice to recruit and to fund.
3. Scanning pays off when the art direction needs *specific* real objects, not generic realism.

---

## 3. Cross-cutting references

### 3.1 FromSoftware
- **Taste as the quality gate.** Hidetaka Miyazaki directs most of the studio's games and approves designs personally. "Refinement, elegance, and dignity are very important to me… flat-out grotesque or splatter type designs will not get past me" ([PlayStation Blog interview](https://blog.playstation.com/2022/01/28/an-interview-with-fromsoftwares-hidetaka-miyazki/)).
- **A clear point of view.** Games are made because "this is a game I want to see exist" ([GamesRadar](https://www.gamesradar.com/games/action-rpg/even-after-elden-ring-exploded-hidetaka-miyazaki-says-fromsoftware-doesnt-make-games-for-anyone-the-motivation-is-that-this-is-a-game-i-want-to-see-exist/)).
- **Systems carried from game to game.** Sekiro's posture system (deflects build enemy posture) carried into Elden Ring's stance break ([GamesRadar](https://www.gamesradar.com/how-sekiro-influenced-elden-ring-according-to-hidetaka-miyazaki/)). Elden Ring has passed 30M sales ([VGC](https://www.videogameschronicle.com/news/elden-ring-has-sold-over-30-million-copies-fromsoftware-says/)).
- FromSoftware's reuse of its engine and assets across titles is widely discussed but was not verified from primary sources here.

### 3.2 Naughty Dog
- **Flat structure.** The studio has relatively few producers. Evan Wells: "If you get a single person having too much authority, you get surrounded by yes-men… You're going to get better results when you have more challenges to an idea" ([Game Developer](https://www.gamedeveloper.com/production/-i-uncharted-4-i-and-the-impact-of-naughty-dog-s-aversion-to-producers)).
- **Talks on art pipeline and technical art culture:** cinematic environment production, Substance texturing, and technical art for foliage, cloth and LOD ([GDC Vault: Art Direction Bootcamp](https://www.gdcvault.com/play/1024310/Art-Direction-Bootcamp-Cinematic-Environment); [Technical Art Culture of Uncharted 4](https://gdcvault.com/play/1023251/Technical-Art-Culture-of-Uncharted)).
- **More than 60 accessibility settings** in TLOU2 ([Naughty Dog](https://www.naughtydog.com/blog/the_last_of_us_part_ii_accessibility_features_detailed)).
- **Cerny's "Method".** Mark Cerny, a long-time Naughty Dog collaborator, split projects into pre-production ("capturing lightning") and production, with a *publishable* first playable as the gate between them ([Iterative](https://iterative.co.nz/mark-cerny-method)).
- **Cost.** A Kotaku report describes heavy crunch on TLOU2 ([Kotaku](https://kotaku.com/as-naughty-dog-crunches-on-the-last-of-us-ii-developer-1842289962)).

### 3.3 Riot and Valve: MOBA art rules
- **Riot's VFX framework** has five parts: gameplay, value, colour, shape and timing ([Riot VFX style guide](https://nexus.leagueoflegends.com/en-us/2017/10/dev-leagues-vfx-style-guide/)).
  - Every effect needs anticipation, impact and dissipation. Outros have lower value, saturation and opacity.
  - The guiding principle: "lead the brain with anticipation… overload the brain in that moment… then give the brain time to process" ([VFX Apprentice summary](https://www.vfxapprentice.com/blog/10-league-of-legends-vfx-design-tips)).
  - Update priorities: (1) hitbox accuracy, (2) readability and noise, (3) theme ([Riot /dev](https://www.leagueoflegends.com/en-us/news/dev/dev-behind-the-scenes-of-vfx-updates/)).
  - The clarity goals are to convey gameplay, preserve hierarchy and minimise noise ([Clarity in League](https://www.leagueoflegends.com/en-us/news/dev/clarity-in-league/)).
- **Valve's Dota 2 Character Art Guide** covers silhouette, value, colour, areas of visual rest and directionality ([Steam Support](https://support.steampowered.com/kb/9334-YDXV-8590/dota-2-workshop-character-art-guide); [PDF](https://media.steampowered.com/apps/dota2/workshop/Dota2CharacterArtGuide.pdf)).
  - The key rule for top-down cameras: value runs dark at the feet and light towards the head, so the eye lands on the upper body.
  - Items are judged *in the gameplay camera*, not in the loadout view.
  - For ships, this means dark hulls, bright superstructures and turrets, and a bright team-colour band near the top.

### 3.4 The WC3 custom-map lineage
- The line runs from StarCraft's *Aeon of Strife*, a co-op four-lane map, to Eul's *Defense of the Ancients* for WC3 (2003), which made it team versus team ([Liquipedia](https://liquipedia.net/dota2/Dota_History/Part_1)).
- Eul open-sourced the map. Forks merged into *DotA Allstars*, maintained by Guinsoo and later IceFrog, which led to Dota 2 ([Wikipedia: DotA](https://en.wikipedia.org/wiki/Defense_of_the_Ancients)).
- **Battleships Crossfire** is a WC3 naval DotA-like map:
  - Players start in a cheap low-tier ship bought with gold and buy into bigger hulls ([Hive Workshop](https://www.hiveworkshop.com/threads/wc3-what-custom-maps-have-gone-stand-alone.325944/); [wc3maps](https://wc3maps.com/map/357299)).
  - A standalone Kickstarter reportedly fizzled.
  - Its ship-upgrade ladder is the closest ancestor of our "ages" system.
- **Lesson from the lineage:** the fun was proven with programmer art. Readable roles, a tight economy and a clear upgrade ladder carried these games before any polish.

---

## 4. Cross-cutting production and craft patterns

### 4.1 Art direction over fidelity
The studios above all share these practices:
- choosing one style and writing it down as pillars (Genshin)
- building a reference library far larger than needed (Game Science's 6-7x scan surplus)
- judging assets *in the game camera* (Valve)
- giving one person with taste the final say (Miyazaki)

Fidelity features such as path tracing come last, as optional layers (CDPR, Game Science).

### 4.2 Game feel and juice
- **Hit-stop.** Freeze or slow both attacker and target for a few frames on impact, scaled to power. Sakurai notes that small sub-frame motion during the freeze still adds impact ([Source Gaming](https://sourcegaming.info/2015/11/11/thoughts-on-hitstop-sakurais-famitsu-column-vol-490-1/); [SmashWiki: Hitlag](https://www.ssbwiki.com/Hitlag)).
- **Camera shake.** Use trauma-based shake that decays over time. Vlambeer built a flat platformer into a satisfying prototype with about 30 such tricks ([Art of Screenshake](https://www.youtube.com/watch?v=AJdEqssNZ-U)).
- **Juice.** Particles, squash and stretch, tweening, and sound on everything ([Juice It or Lose It, GDC Europe 2012](https://www.gdcvault.com/play/1016487/juice-it-or-lose)). A known caution: juice cannot rescue weak mechanics ([Game Developer](https://www.gamedeveloper.com/design/video-indies-resist-the-urge-to-juice-it-or-lose-it-)).
- **Reward defence too**, as in ZZZ's Perfect Assist (Section 2.2).

### 4.3 Lighting
- **Global illumination** without baking (Lumen), or a cheap substitute: hemisphere light plus an environment map.
- **Volumetrics** tied to local lights (Genshin's froxel fog).
- **Soft cascaded shadows**, with the far cascades updated on alternate frames (Genshin).
- **Time of day** as a mood tool.
- **Emissive light counts** as a style element (Night City's RTXDI neon).

### 4.4 VFX layering
Build every significant effect from layers:

| Layer | Purpose | Timing |
|---|---|---|
| Anticipation / telegraph | Tells the target where and when | Before impact; must be readable to enemies |
| Flash | A one-to-two-frame bright additive sprite that sells the moment | Impact frame |
| Core | The shaped body of the effect (fireball, shell burst) | Impact +0-150 ms |
| Sparks / debris | Fast, small, gravity-affected; shows direction and force | 100-600 ms |
| Smoke | Slow, low value, alpha-blended; shows scale | 0.5-3 s; **overdraw risk** |
| Distortion | Heat or shockwave refraction ring | Impact +0-300 ms |
| Decal / residue | Scorch, oil slick, foam ring on water | Lingers; lower value (Riot "outro") |
| Light | A short-lived point light, or a fake light via additive glow | Impact frame, then fades |
| Camera / hit-stop / audio | Sells the weight | Impact frame |

The timings are this document's suggested starting points. The anticipation, impact and dissipation structure and the lower-value outro follow Riot's guide ([Riot VFX style guide](https://nexus.leagueoflegends.com/en-us/2017/10/dev-leagues-vfx-style-guide/)).

### 4.5 Audio design
- **Design for play first.** Make threats locatable, give each ability a distinct audio signature ("Pavlovian" responses) and mix for clarity. Enemy sounds should be louder than ally sounds ([Overwatch GDC 2016 PDF](https://media.gdcvault.com/gdc2016/Presentations/Lawlor_Neumann_Overwatch_Play_by_Sound.pdf)).
- **Treat music as world-building** (CDPR's radio stations; Game Science's folk forms).
- **Layer each impact**: transient click, body, low-end thump, tail and debris. Pitch- and volume-randomise each layer.

### 4.6 Performance budgets
- Fix the frame budget on the weakest target first; Cyberpunk and Black Myth on PS5 show what happens otherwise.
- Transparent overdraw is the usual culprit in dense fights.
- Update expensive things at lower frequency: Genshin interleaves its far shadow cascades.

### 4.7 Vertical slice, greybox and playtesting
- Build a publishable first playable before starting production (Cerny).
- Get a greybox of the whole game playable end to end early (Phantom Liberty).
- Use a vertical slice for recruiting and funding (Game Science).
- Playtest with target players continuously. Naughty Dog's accessibility work and Riot's clarity work both came from observing players.

### 4.8 Pillars documents
- Write three to five pillars that settle arguments, for example "clarity beats spectacle in a team fight".
- Genshin's "art core pillars" and CDPR's post-mortem focus on "alignment" both show that pillars exist to keep hundreds of people moving in the same direction.

---

## 5. MOBA and RTS design lessons for roughly 10-minute matches

**Pacing reference points.**

| Game | Typical length | Mechanisms | Source |
|---|---|---|---|
| League of Legends (PC) | ~30 min average | Baron at 20 min; surrender vote from 15 min | [The Spike](https://www.thespike.gg/league-of-legends/beginner-guides/how-long-is-a-league-of-legends-game) |
| Heroes of the Storm | ~20 min target | Shared team XP; talent spikes at levels 10 and 20 | [Fandom](https://heroesofthestorm.fandom.com/wiki/Heroes_of_the_Storm) |
| Wild Rift | 15-20 min | Smaller map, faster XP and gold, shorter respawns | [Fragster](https://www.fragster.com/how-long-do-wild-rift-games-last-a-quick-guide-to-match-durations/) |
| Pokemon Unite | 10 min hard cap | Rayquaza spawns in the final 2 minutes as a decisive objective | [Sportskeeda](https://www.sportskeeda.com/pokemon/rayquaza-pokemon-unite-when-appear-buffs); [Wikipedia](https://en.wikipedia.org/wiki/Pok%C3%A9mon_Unite) |

**Suggested skeleton for a 10-minute naval match.** This is a proposal, not a sourced fact.
- **0:00-2:30, Age I (sail).** Laning, last-hitting creep fleets, first skirmishes.
- **~2:30-5:00, Age II (ironclad).** First objectives: forts or a lighthouse buff.
- **~5:00-8:00, Age III (dreadnought).** Grouped team fights, sieging harbour defences.
- **8:00+, Age IV (carrier / drone swarm).** A single decisive "leviathan" or "storm" event, like Unite's final-stretch Rayquaza, and base pushes.
- **Hard cap near 12:00** with a sudden-death tiebreak.

**Comeback mechanics** (should be visible and earnable, not free):
- Bounty gold on players with kill streaks.
- Shared or partial XP catch-up (HotS style) for the trailing team.
- Objective value that scales with the deficit.
- One late neutral objective that can swing the match.
- The Dota community's experience is a warning: overly strong comeback mechanics were added in reaction to snowbally "deathball" metas and were then repeatedly re-tuned ([DotaSense](https://dotasense.com/guides/comeback-mechanics); [Dotabuff discussion](https://www.dotabuff.com/topics/2015-04-20-the-comeback-is-real)). Keep them tunable from data.

**Readability of VFX in team fights.** Follow the Riot and Valve rules:
- visual impact proportional to gameplay impact
- a consistent colour grammar for enemy and ally, with an optional colour-blind palette
- telegraphs the enemy can always see
- low-value outros
- skins never altering clarity

On water specifically, spray, foam and smoke must never hide a torpedo wake or a shell-landing marker.

**Bot AI.** Copy Valve's layered utility structure ([Dota Bot Scripting](https://pastebin.com/du8mRjei)):
- **Team level.** Each tick, compute desires in 0-1 for push, defend and farm per lane, plus the major objective.
- **Bot level.** Each bot scores its modes (lane, farm, retreat, push, team fight, chase) and runs the highest.
- **Action level.** Micro such as ability use, dodging and kiting.

This is cheap enough for a browser and debuggable: log the desire values on screen. OpenAI Five shows the learning-based alternative, but it needed massive compute ([OpenAI paper](https://cdn.openai.com/dota-2.pdf)). It is not practical here, except perhaps offline-trained policies later.

---

## 6. Applying this to our game: checklist for a Three.js naval MOBA

Scope: a browser 5v5 naval MOBA with a hero battleship. Civilisation ages upgrade each hero from sail to ironclad to dreadnought to a carrier launching drone swarms.

### 6.1 Pillars (write these first)
- [ ] **Clarity first.** In a 10-ship fight, any player can tell who is shooting whom within 250 ms.
- [ ] **Every age feels like a new era.** Silhouette, sound, VFX palette and water interaction all change per age.
- [ ] **Weight.** Ships are massive: momentum, recoil, list and roll, and hit-stop on big hits.
- [ ] **Ten great minutes.** A fixed pacing skeleton ending in a finale event.
- [ ] **Runs anywhere.** 60 fps on a mid-range laptop's integrated GPU. A scalable tier for phones.

### 6.2 Process
- [ ] **Greybox milestone.** Boxes on a flat plane, a full 5v5 match with bots and all four ages playable end to end. This is the Phantom Liberty rule.
- [ ] **Vertical slice.** One hero ship fully polished through all four ages, in one lane, with final VFX, audio and water. Use it for recruiting and pitching (Game Science).
- [ ] **Weekly playtests** with a fixed survey: "Could you tell what killed you?" and "Which age felt best?".
- [ ] **Continuous low-end testing.** Keep a reference low-spec device and a CI performance smoke test (Cyberpunk lesson).
- [ ] **Feature pods.** Each feature (a hero, an age, an objective) gets one owner plus design, art and code together (CDPR).
- [ ] **No fake footage.** Trailers only show systems that are in the build.

### 6.3 Rendering: achievable in WebGL2 (and WebGPU where available)
- [ ] **Colour pipeline.** sRGB output with linear workflow, then `renderer.toneMapping = ACESFilmicToneMapping`. Also try `AgXToneMapping` and pick one by art review. Expose exposure as a tunable ([three.js tonemapping discussion](https://discourse.threejs.org/t/tone-mapping-overview/75204); [AgX issue](https://github.com/mrdoob/three.js/issues/27362)).
- [ ] **PBR ships.** Use `MeshStandardMaterial` / `MeshPhysicalMaterial`, lit by a PMREM-filtered environment generated from the sky, so reflections and ambient light match the time of day.
  - Follow Dota's value rule: dark hull, bright superstructure, and a team-colour stripe near the top.
  - Ages move from wood to riveted iron to grey steel to carrier deck.
- [ ] **Sky and atmosphere.** Start from the three.js `Sky` (Preetham) shader ([example](https://threejs.org/examples/webgl_shaders_sky.html)). Drive sun direction, fog colour and the env map from a time-of-day parameter. Match changes can shift the mood per age, for example dawn to storm.
- [ ] **Ocean.**
  - Sum 4-8 Gerstner waves in the vertex shader ([GPU Gems ch. 1](https://developer.nvidia.com/gpugems/gpugems/part-i-natural-effects/chapter-1-effective-water-simulation-physical-models); [three.js forum example](https://discourse.threejs.org/t/classic-ocean-shader-example-with-gestner-waves/29227); [sbcode tutorial](https://sbcode.net/threejs/gerstnerwater/)). Add scrolling normal maps for detail and Fresnel sky reflection.
  - Foam from wave crests, using the Jacobian or height threshold, plus foam trails behind ships from a render-target "wake map".
  - Use a camera-following grid with LOD rings. Keep FFT for a high tier only ([three.js ocean example](https://threejs.org/examples/webgl_shaders_ocean.html)).
  - **Evaluate the same Gerstner function on the CPU** for ship bobbing and buoyancy, so ships sit on the visible waves.
- [ ] **Post-processing.** Use `EffectComposer` or pmndrs `postprocessing` (fewer passes, merged effects):
  - bloom on a threshold, so only muzzle flashes, explosions and emissives bloom
  - FXAA or SMAA
  - vignette and colour grade through a LUT
  - optional light shafts on the high tier
  - screen-space distortion for shockwaves, using a distortion buffer where effects write offsets and one composite pass applies them
- [ ] **Shadows.** One directional-light shadow map with a tight frustum around the camera focus. Water receives a cheap blob or projected shadow. Only the high tier gets a second cascade (cf. Genshin's cascade interleaving).
- [ ] **Instancing.** Use `InstancedMesh` for creep fleets, drones, shells, debris and rocks, and `BatchedMesh` for varied static props. Aim for draw calls in the low hundreds or fewer. One practitioner suggests about 300 as a practical ceiling on average hardware ([Three.js Roadmap](https://threejsroadmap.com/blog/draw-calls-the-silent-killer); [BatchedMesh docs](https://threejs.org/docs/pages/BatchedMesh.html)).
- [ ] **GPU particles.**
  - Instanced quads whose motion is computed in the vertex shader from spawn time, velocity and gravity, with no per-frame CPU updates. Or use WebGPU compute where available.
  - Use soft particles (a depth fade against the scene) so smoke does not clip into water.
  - Put a hard budget on alpha-blended smoke; this was Black Myth's PS5 overdraw lesson. Prefer additive or alpha-tested particles for sparks.
- [ ] **Carrier drone swarms.** Instanced boids with GPU or worker-thread steering. One draw call, with LOD down to impostor dots at distance.
- [ ] **Scalability tiers** (Low / Med / High), auto-detected at startup and adjustable. Each tier sets: resolution scale, wave count, shadow resolution, bloom on or off, particle caps and post passes.
- [ ] **Frame-budget targets** (proposed):

  | Area | Budget at 60 fps (~16.6 ms) on mid-range integrated GPU |
  |---|---|
  | Main-thread JS (sim, AI, netcode) | 4 ms |
  | Draw calls | 150 or fewer typical, 300 in a worst-case team fight |
  | Particles on screen | ~5k instanced, with a smoke-overdraw cap |

### 6.4 Game feel checklist (per weapon and ability)
- [ ] Anticipation (turret traverse, a charge glow, a telegraph on the water that enemies can read).
- [ ] Fire: muzzle flash plus a short point light, recoil kick on the hull (roll impulse), a camera nudge for the shooter.
- [ ] Travel: tracer or visible shell arc, with a landing marker for artillery.
- [ ] Impact: hit-stop scaled by damage (suggested 0-80 ms; tune by playtest), camera trauma for nearby players, and the full layer stack (flash, core, sparks, water column, smoke, distortion, foam decal).
- [ ] Defensive rewards: a successful torpedo dodge or smoke-screen escape gets its own sting and a brief slow-motion flash (ZZZ lesson).
- [ ] Kills: sinking animation (list, fire, capsize), a debris field, a lingering oil-slick decal and a team-coloured announcement.
- [ ] Age-up moment: a 1-2 s transformation with a shipyard-flash effect, a musical sting and a new silhouette. It is the "power spike" beat, like HotS level-10 talents.

### 6.5 Audio: positional Web Audio, synthesised where sensible
- [ ] One `AudioContext` with a `PannerNode` per emitter: `panningModel = "HRTF"`, `distanceModel = "inverse"`, and tuned `refDistance`, `rolloffFactor` and `maxDistance` ([MDN PannerNode](https://developer.mozilla.org/en-US/docs/Web/API/PannerNode/panningModel); [MDN spatialisation basics](https://github.com/mdn/content/blob/main/files/en-us/web/api/web_audio_api/web_audio_spatialization_basics/index.md?plain=1)). Update the listener from the camera. Pool the nodes.
- [ ] Layered synthesised cannon fire: a noise-burst transient, a pitched-down oscillator "body", a low sine thump, then a filtered-noise tail through a `ConvolverNode` for sea-air reverb.
  - Randomise pitch ±5-10% and gain per shot.
  - Change the timbre per age: black-powder boom, then breech-loader crack, then heavy naval rifle, then jet whine and drone buzz.
- [ ] Mix rules taken from Overwatch:
  - Enemy sounds get priority over ally sounds.
  - Ultimates get unique, instantly recognisable cues.
  - A voice-limit and priority system ducks low-priority sounds in team fights.
  - Use a `DynamicsCompressorNode` on the master bus.
- [ ] Ambient ocean bed (filtered noise with a slow LFO), rising with wave height, plus adaptive music intensity driven by the combat state.

### 6.6 Design and systems
- [ ] Timeline for ages, the finale event, comeback bounties and the late neutral objective, as described in Section 5.
- [ ] Hero ship identity carries through all four ages. The same hero keeps its signature mechanic re-skinned per era (e.g., a "boarding" hero's grapple becomes a harpoon, then EMP tethers, then drone hacking), so the silhouette changes but mastery carries over.
- [ ] Bots use a Valve-style desire system, with a debug overlay showing the desire values.
- [ ] Clarity rules for cosmetics (Riot): cosmetics never change hitboxes, telegraph shapes or team colours.
- [ ] Accessibility: a colour-blind team palette, screen-shake and flash intensity sliders, subtitles for callouts and remappable keys (following TLOU2's example).
- [ ] Monetisation, if any: cosmetics only, on a predictable content calendar (miHoYo cadence without power gacha).

### 6.7 Art direction deliverables
- [ ] One-page art bible per age: palette, materials, silhouette sheet from the gameplay camera, and VFX colour language.
- [ ] Reference library of historical ships and harbours (our version of Game Science's scan library). Use public-domain museum photographs and plans.
- [ ] Every asset approved **in the game camera** at gameplay distance (Valve), and by a single art-direction owner (Miyazaki model).

---

### Source reliability notes
- Primary or near-primary sources: GDC Vault talks and slides, the Riot and Valve style guides, Epic's developer interview, CDPR press releases, and MDN.
- Revenue figures are third-party estimates (Sensor Tower, Naavik) and exclude some platforms.
- Team-size and budget figures for Game Science and miHoYo come from secondary sources and are marked as uncertain above.
- Genshin rendering internals come from a talk summary plus fan reverse-engineering. Treat them as plausible, not confirmed.
