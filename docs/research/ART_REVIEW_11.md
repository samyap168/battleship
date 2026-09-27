# Armada Ascension — Art Review 11

Reviewed all 21 images in `tests/output/gallery11/`, including the four new captures (`18_citadel_fall`, `19_orbit_view`, `20_default_view`, `21_mega_explosion`) and a pixel-level crop pass (PIL) on the age-choice modal, the Leviathan kill-banner, the brawl debris, and matched ship crops from `19`/`20`. Round 10's scores (9.6–9.8/10 across the board) do not survive contact with this gallery examined at native resolution and with crops — this review recalibrates downward. A studio that "spent a fortune" does not ship a title-text bleed-through on a core UI modal or reuse one castle mesh for every faction's capital.

## Scores

**Visual Quality: 6.5/10.** The establishing shots (`01`, `13`, `15`, `18`) have a pleasant soft-lit palette and the water surface is genuinely nice, but the illusion collapses under inspection: every karst tower in the background is the same stretched-capsule primitive with a repeating horizontal-stripe texture (clearest at `01`, x:0-260,y:250-650), and the exact same brown/blue-roof castle model is the "capital" in `01`,`02`,`13`,`15`, and (recolored red) `18` — five different "epic" hero shots sharing one prop reads as an asset-store scene, not a bespoke world. Water reflections (`12`,`15`) are soft mirrored duplicates with no Fresnel falloff, which is the classic tell of a screen-space or planar reflection with no angle-based intensity curve.

**VFX Readability & Impact: 6/10.** Hit markers and danger rings still read cleanly in `04` and `09`. The good news: `21_mega_explosion` confirms the flat gold-disc artifact is gone, replaced by a real volumetric fire/smoke blob — a legitimate fix. But it still doesn't sell "mega": no shockwave ring, no rising secondary smoke column, single soft blob. Worse, `16_brawl_lowangle`'s airborne cannonballs (x:1000-1280,y:440-560) are glassy, hard-specular spheres in a static line — they look like Christmas ornaments, not projectiles, and it's the single most "placeholder 3D" asset in the whole gallery.

**UI/UX: 6/10.** The Armory/ability bar/Admiral's-Orders panel layout is clean and consistent across every gameplay frame, no collisions there. But `05_age_choice` has a glaring bug: the giant background "ARMADA ASCENSION" title is bleeding through at full legibility directly behind "AGE OF AIRPOWER" (crop confirmed, x:300-1300,y:100-260) — a modal that should have an opaque backdrop instead ghosts a second unrelated headline through it. `03_leviathan` has a second, worse collision: the "THEMISTOCLES ENDS CHING SHIH'S RAMPAGE" kill-banner text physically overlaps the "Zheng He" nameplate and its HP bar mid-word (crop confirmed) — this is not a minor overlap, letters are interleaved and unreadable.

**First-10-Seconds Wow Factor: 6/10.** `06_menu` is the strongest single frame in the gallery — good typography, nice depth, the light-pillar reflections sell scale. But `01`/`13` (the actual opening cinematic) lean on the same recycled castle+karst kit the menu uses, so the "wow" is front-loaded onto the title screen rather than the game proper, and a trailer cutting between `01`,`13`,`18` will visibly repeat the same building three times in the first ten seconds.

**Gameplay Camera Readability: 5/10.** `19_orbit_view` and `20_default_view` were billed as new/fixed camera work, but matched crops of the player ship (x:700-950,y:350-550) show both are still a near-top-down pitch — the ship reads as a flat elongated blob with no hull silhouette or sail visible, and ally/enemy ships in `07`/`08` are only identifiable by their floating nameplate, not by silhouette. The claimed "lower default pitch" does not show up in the pixels.

## Broken / artifacts

- **`05_age_choice`**: "ARMADA ASCENSION" ghost title overlapping "AGE OF AIRPOWER" heading, x:300-1300,y:100-260 — unreadable double-exposure of two unrelated text layers.
- **`03_leviathan`**: kill-banner text overlapping "Zheng He" nameplate + HP bar, x:650-1000,y:180-300 — letters interleaved, HP bar cuts through the text.
- **`16_brawl_lowangle`**: airborne cannonballs are static, uniformly-lit glossy spheres (x:1000-1280,y:440-560) — no trail, no rotation, no scale jitter.
- No z-fighting or clipping found elsewhere in this pass; the `11`→`21` explosion fix is confirmed real (flat disc gone).

## Top 8 Fixes (ranked by visual impact per hour of work)

1. **`05_age_choice`, x:300-1300,y:100-260** — main-menu title bleeding through the age-choice modal. Give the modal an opaque/near-opaque backdrop panel (or hide the title-screen DOM/canvas layer while the modal is mounted). Minutes of work, kills the single most "unfinished demo" moment in the set.
2. **`03_leviathan`, x:650-1000,y:180-300** — kill-banner overlaps ship nameplate mid-letter. Offset the banner's Y position below the top HUD bar (it currently sits where world-space nameplates land), or suppress nameplates in the banner's on-screen rect for its duration.
3. **`16_brawl_lowangle`, x:1000-1280,y:440-560** — cannonballs look like glass ornaments. Raise material roughness, kill the single hard specular, add a stretched motion-trail sprite and per-instance rotation.
4. **`19_orbit_view`/`20_default_view`, ship crop x:700-950,y:350-550** — default/orbit camera is still near top-down; hull silhouette unreadable. Lower pitch to ~35-45° from horizontal and pull back slightly so sails/hull read.
5. **`21_mega_explosion`, x:450-800,y:150-420** — good fireball shape now, but no shockwave ring or rising smoke column, undersells "mega." Add a ground dust-ring decal and a secondary rising smoke sprite stack.
6. **`01_opening_cinematic`, x:0-260,y:250-650 (also `13`,`15`,`18` backgrounds)** — karst towers are one repeated stretched-capsule primitive with tiling stripe texture. Add per-tower radius noise and a triplanar rock material.
7. **`01`,`02`,`13`,`15`,`18`** — identical castle mesh used as every faction's capital in 5 hero shots. Extend `18`'s red-roof recolor to also vary tower count/silhouette, not just palette.
8. **`12_reflections`,`15_castle_reflection`** — water reflection is a flat mirrored duplicate with no Fresnel falloff. Add angle-based reflection-intensity falloff and tie the reflection UV distortion to the surface ripple normal map.
