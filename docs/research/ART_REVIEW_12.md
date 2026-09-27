# Armada Ascension — Art Review 12

Reviewed all 24 frames in `tests/output/gallery12/`, pixel-cropped with PIL against the ten claimed changes since Review 11. Real progress on models and a couple of VFX bugs, but the worst bug from Review 11 — HUD text stacking on other HUD text — was not fixed. It's now confirmed in **three** separate screens, suggesting one instance got patched rather than the underlying z-order system.

## Scores

**Visual Quality: 7/10.** Crimson finally has its own silhouette — the pagoda citadel in `00`/`22`/`18` is a genuinely different building from Azure's blue-roof western castle in `01`/`13`/`15`, fixing Review 11's worst complaint. Cannonballs (`04`, x:540-680,y:540-640) are now matte bronze with a soft ember core, not glass ornaments. But karst-stack texture is still the identical tiling stripe material on every tower (`01`, x:0-500 and x:950-1600) — silhouettes vary now, surfaces don't. And the three "different" Crimson citadel shots (`00`,`12`,`22`) are the same camera composition rendered three times (pixel-diffed, not identical, but same set-up), so gallery variety is thinner than it looks.

**VFX Readability & Impact: 7/10.** `21_mega_explosion` is a real fix: the flat gold disc is gone, replaced by a volumetric fireball plus a ground shockwave/dust ring, addressing two Review 11 complaints at once. Cannon smoke now trails continuously off broadsides (`16`,`08`) instead of puffing. But readability is undercut by HUD collisions at exactly the moments VFX should sell: `07`'s "FIRST BLOOD" moment has a "2543" damage number and "STUNNED" status text stacked illegibly on the ship itself.

**UI/UX: 4/10.** This is where the claimed fixes fail hardest. `05_age_choice` (x:650,y:330-420) shows a translucent "DREADNOUGHT" subtitle bleeding through "AGE OF DREADNOUGHTS," with the "1 Drake" nameplate at full opacity on top of the letters "READN" — no fade at all. `03_leviathan` (x:550-950,y:220-310) is worse: a nameplate is interleaved letter-for-letter with "DE RUYTER COMMISSIONS A FLEET CARRIER," directly above "THE LEVIATHAN" and its aggro bar — three text layers in one 90px band. `17_zoomed_in_gameplay` (x:550-1050,y:220-300) repeats the same bug on the "FIRST BLOOD" banner. Three independent confirmations means this is a system-level layering bug that was not addressed.

**First-10-Seconds Wow: 7.5/10.** Opening on the enemy Crimson citadel (`00`) then cutting home to Azure's castle (`01`/`13`) works — two distinct buildings, two color languages (warm lantern-lit pagoda vs. cool blue-roofed keep), so the prologue no longer front-loads the same asset. `06_menu` remains the gallery's best single frame.

**Gameplay Camera Readability: 7/10.** `19`/`20` ship crops (x:650-950,y:330-530) show a legible 3/4-view hull with sails and deck detail, a clear step up from Review 11's top-down blob. `08`'s dreadnought crop reads its turret and funnel cleanly.

## Verified changes

| Change | Status | Evidence |
|---|---|---|
| Crimson pagoda citadel + forts | Landed | `00`,`22`,`18`: multi-tier pagoda, red banners, pagoda outbuildings inside the wall. No fort confirmed outside the capital. |
| No banner bleed / nameplates fade under banners | **Not landed** | `05` (x:650,y:330-420): ghost "DREADNOUGHT" text + full-opacity nameplate over "AGE OF DREADNOUGHTS"; `03` (x:550-950,y:220-310), `17` (x:550-1050,y:220-300): same unfixed collision on kill banners. |
| Dull-iron cannonballs with ember | Landed | `04` (x:540-680,y:540-640): matte bronze sphere, small warm highlight, no hard specular. |
| Captain ships 15% larger than gunboats | Not visible | No frame shows an unnamed gunboat at comparable depth to a captain ship to compare scale. |
| Camera closer/lower | Landed | `19`/`20` (x:650-950,y:330-530): hull + sails legible vs. prior top-down blob. |
| Continuous shot smoke trails | Landed | `16` (x:150-950,y:250-600), `08` (x:1150-1400,y:400-460). |
| Mothership hangar shuttered slats | Landed | `14`/`23`: recessed dark bay, two thin backlit slit lines per bay, not a solid glow panel. |
| Karst stacks individually eroded | Partial | `01` (x:0-500 / x:950-1600): silhouettes vary, but every tower shares one tiling stripe texture. |
| Mega explosion shockwave/lens fix | Landed | `21`: volumetric fireball + real dust shockwave ring, flat gold disc gone. |
| Opening prologue on enemy citadel | Landed | `00` opens on Crimson pagoda, cuts to Azure home in `01`/`13`. |

## Broken

- Karst material: one tiling texture on every silhouette (`01`); see UI/UX above for the nameplate/banner bug (`05`,`03`,`17`) and `07`'s stacked damage/status text.

## Top 8 fixes, ranked by impact/hour

1. **`05`,`03`,`17` — nameplate/banner z-order.** Same bug, three screens. Give world-space nameplates one opacity multiplier driven by "is a screen-space banner active in this Y-band," not per-banner-type logic. Highest value fix here.
2. **`07`, x:650-950,y:380-460 — combat text clutter.** Damage numbers, status text, and banner subtitles all target one point. Add a vertical stacking offset so elements queue instead of overlapping.
3. **`01`, karst material, x:0-1600,y:150-650.** Silhouettes are fixed; surfaces aren't. Swap the tiling stripe texture for triplanar rock with per-instance UV offset.
4. **`00`/`12`/`22` — repeated composition.** Three gallery beats (enemy reveal, reflections, citadel close) share one camera setup on one building. Re-block at least one.
5. **Gunboat/captain scale differentiation.** No frame shows a lower-tier ship; add a visibly distinct small hull class so the claimed 15% bump has something to read against.
6. **`22` — pagoda forts outside the capital.** Confirm scattered map forts got the reskin too; only the citadel's own outbuildings show it here.
7. **`14`/`23` — hangar interior, x:650-950,y:440-540.** Slats read well at range but the bay is a flat black void up close; add faint interior parallax.
8. **`15`,`12` water reflections.** Carried over from Review 11: still a flat mirrored duplicate with no Fresnel falloff — lowest priority, but still what separates "nice" from "AAA" here.
