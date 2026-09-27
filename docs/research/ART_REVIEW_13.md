# Armada Ascension — Art Review 13

Reviewed all 25 frames in `tests/output/gallery13/`, pixel-cropped with PIL against the five claimed changes since Review 12. The headline HUD-collision bug is genuinely fixed for player nameplates — four independent confirmations, clean this time, not one. But the same bug class reappears on the one nameplate type nobody tested: the Leviathan boss plate. A new repeated-shot problem also surfaced in the opening sequence.

## Scores

**Visual Quality: 7.5/10.** Karst stacks now measurably vary: sampling brightness minima down three columns of one tower gives band spacings from 4px to 57px, non-uniform within a stack and between stacks (`01`, x:60-330/950-1230/1210-1420,y:90-560) — a real fix for Review 12's "one tiling texture" complaint. The Mothership hangar (`23`, x:440-980,y:440-650) is the gallery's new best asset: three distinct recessed bays, each with double backlit slit-lines and drones parked on deck for scale, replacing the flat glow panel. Held back by the opening sequence: `00`, `01`, `12`, and `22` are now four near-identical renders of the same pagoda-between-karst-stacks shot, worse than Review 12's three.

**VFX Readability & Impact: 7/10.** `07`'s "FIRST BLOOD / DRAKE SINKS YAMAMOTO" and `08`'s "TRIPLE SINK" banners are now completely clean — no stacked damage number, no status text, the Review 12 stacking bug is gone here. Mega-explosion (`21`) volumetric fireball + shockwave still lands. But no frame in the 25-shot set actually shows a floating damage number, so the claimed drift/positioning cannot be confirmed visually (code inspection below), and `03`'s boss-nameplate collision (see UI/UX) happens at exactly the moment the game is trying to sell "the Leviathan is here, defend the citadel" — the worst possible place for it.

**UI/UX: 6.5/10, up sharply from 4.** The core fix landed: `05` (x:650-950,y:180-300) shows the "1 [name]" nameplate faded to ~15% alpha, sitting clear above the "AGE OF DREADNOUGHTS" subtitle with a visible gap, not overlapping it. `24`'s bottom HUD at 1280×650 (x:0-1280,y:440-650) has clean gutters between minimap, portrait, abilities, gold, and armory — no overlap at laptop width. But `03` (x:650-950,y:225-300) shows "THE LEVIATHAN" interleaved letter-for-letter with "BOTH INNER FORTS HAVE FALLEN," both at full opacity, plus the cyan boss health bar sitting on "HAVE" — the identical bug Review 12 flagged, just narrowed to one entity type.

**First-10-Seconds Wow: 7/10.** `06_menu` is still the gallery's best single frame. The new Mothership hangar bays and mega-explosion help. Undercut by the same repeated pagoda establishing shot appearing four times in the set — if that's genuinely what the first 10 seconds cycles through, it reads as recycled b-roll rather than a directed intro.

**Gameplay Camera Readability: 7/10.** Unchanged from Review 12 — `19`/`20` (x:650-950,y:330-600) still deliver a legible 3/4 hull with sails and deck detail.

## Verified changes

| # | Change | Status | Evidence |
|---|---|---|---|
| 1 | World nameplates fade instantly under banners, band extends below subtitle | **Partial** | Player nameplates: landed (`05`,`07`,`08`,`24`, all clean). Boss nameplate: **not landed** — `03` (x:650-950,y:225-300), "THE LEVIATHAN" full-opacity over "BOTH INNER FORTS HAVE FALLEN." |
| 2 | Damage-you-take drifts right of own bar; combat text starts above nameplate row | **Unverifiable in gallery** | `hud.js:301-317,641-642` implements it (incoming numbers offset `+58px` right, smaller, red; start `y0-18`/`-26` above the bar) but none of the 25 frames capture a hit moment. |
| 3 | Cliff strata: per-outcrop dip + band spacing | **Landed** | `01`, three towers sampled: spacing sequences `[5,5,5,20,33,13,...]`, `[7,23,7,17,15,19,...]`, `[9,7,23,5,19,8,...]` — non-repeating, non-identical across stacks. |
| 4 | Laptop-width bottom HUD scales, no overlap | **Landed** | `24` (x:0-1280,y:440-650): minimap/portrait/abilities/gold/armory all have clear gutters at 1280×650. |
| 5 | Mothership hangar bays | **Landed** | `23` (x:440-980,y:440-650): three separate recessed bay doors, double lit slits each, drones on deck. |

## Top 6 fixes, ranked by visual impact per hour of work

1. **`03`, x:650-950,y:225-300 — boss nameplate ignores the fade band.** In `hud.js` the alpha check at line 568-569 tests the health-bar's `y0`, but the boss name text is drawn 8-15px *above* `y0` (line 590). When the bar sits just outside the banner's `annRect`, the name glyphs above it can still fall inside it and render at full alpha. Widen the y-test to include the label height (e.g. `y0 - 20` instead of `y0`) for `hero`/`boss` alike. Same system, same file, one-line-scale fix; highest value here since it's the one confirmed instance of Review 12's worst bug surviving.
2. **`00`/`01`/`12`/`22` — four near-identical establishing shots.** Re-block at least two of these; same karst ring, same pagoda, same lens flare angle.
3. **Damage-number capture gap.** Add a forced-hit moment to the screenshot harness — the feature can't be graded (or caught if broken) if it never appears in 25 frames.
4. **Karst material still one shared triplanar texture.** Spacing now varies; add per-instance moss tint/albedo so surfaces read as unique, not just silhouettes.
5. **Gunboat/captain scale differentiation.** Still no frame shows a lower-tier hull next to a captain ship at comparable depth — carried from Review 11 and 12.
6. **Water reflections (`12`,`15`,`22`).** Still a flat mirrored duplicate, no Fresnel falloff — carried over three reviews; lowest priority but the clearest "nice" vs "AAA" tell left.

## Broken

- Boss/objective nameplate ("THE LEVIATHAN") is the sole confirmed survivor of the banner-collision bug family (see fix #1).
- Opening sequence composition variety has regressed from three repeats to four (`00`,`01`,`12`,`22`).
- No screenshot in the gallery exercises the damage-number system, so claim (2) is confirmed only by code reading, not pixels.
