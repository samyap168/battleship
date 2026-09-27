# Armada Ascension — Art Review 16

All five claims checked at pixel level, cross-referenced against source where it explains *why* a change does or doesn't read. Sails: landed, clean. Karst: still doesn't read — a genuine seed-math bug, not missing effort. Rim light: correct in code, marginal at gunboat scale. Nameplate fade: exact-spec code, unexercised by any shot here. Reflection seam from Review 15: unchanged.

## Scores

**Visual Quality: 8/10.** The Crimson junk sail (rust-red battens, gold band, `materials.js:264`) is a real upgrade — reads as a distinct culture, not a recolor (`16`, `00`, `22`). Held down by two repeat offenders: karst hue still clusters H=0.045–0.091 across 15+ samples in `00`/`01`/`16`/`22` despite three review cycles of "fix per-stack tint" (root cause found this pass), and the far-reflection seam from Review 15 (`15`, x:1055-1170,y:485-650) is pixel-identical to before — a dead-straight vertical clip with no fog blend.

**VFX Readability & Impact: 9/10.** Damage numbers still fire reliably (white "426" outgoing in `25`), explosions and drone-swarm particles remain excellent (`21`, `14`). One ding: in dense brawl smoke (`17`) the warm dust grade crushes both factions' sail hue toward H≈0.06-0.10, leaving only a saturation gap (Crimson S=0.53-0.58 vs Azure S=0.17-0.20) to read team by — the new sail system gets partially erased exactly when you need it most.

**UI/UX: 8/10.** Kill-feed and boss nameplate fade read cleanly in normal play (`20`, `24`). New nuisance: in `17`'s smoke, nameplates ("1 Drake", "1 Zheng He") anti-alias into near-invisibility (x:830-1150,y:260-340) — possibly the harness's documented banner/fade capture quirk rather than a game bug, but unreadable regardless of cause.

**First-10-Seconds Wow: 8/10.** Unchanged — menu (`06`) and opening beats (`00`/`01`/`13`) still land.

**Gameplay Camera Readability: 8/10.** Orbit/top-down views (`19`, `20`) stay crisp. Gunboat rim light is real in code (`teamRim.js`, applied at `units.js:306`) and faintly visible as a cyan edge on the `07` creep hull, but at ~50px on-screen with wake/foam noise it barely survives — "confirmed present" more than "confirmed working."

## Verification

| # | Change | Status | Evidence |
|---|---|---|---|
| 1 | Crimson rust-red junk sails + gold band vs Azure cream + blue band | **Landed** | `materials.js:264-299` implements exactly this. Crisp in `16` (close-up, unmistakable rust/gold), `00`/`22` (distant junks), `14` ("1 Yamamoto"). |
| 2 | Karst: 3 stone types (warm tan / cool grey / dark weathered) per stack | **Not landed — root cause found** | `environment.js:333` computes `stoneKind = floor((sin(seed*12.7)*0.5+0.5)*2.999)`, but `seed = isl.seed*10 + k` steps only ~0.134 rad per adjacent stack (`12.7 mod 2π`). Reproduced in Python: 8 of 10 test island-seeds give all 6 stacks in a cluster the *identical* stoneKind. Pixel hue across `00`/`01`/`16`/`22` (15+ samples) stays at H=0.045-0.091 — one family, confirming the bug's effect. |
| 3 | Gunboats get faction rim light | **Landed in code, marginal on screen** | `teamRim.js`'s Fresnel-emissive twin is applied to creep meshes at `units.js:306`. `07`'s distant AI gunboat shows a faint cyan hull-edge tint vs. its body color, but at this scale it's easy to miss. |
| 4 | Nameplates under a live banner fade to 8% | **Inconclusive** | `hud.js:570` exactly matches spec (`globalAlpha = ... ? 0.08 : 1`). In every banner shot (`03`, `05`, `07`), the nearest named unit sits just outside the padded rect (`03`'s "7 Drake" bar ends ~12px short of `A.t`) — none of the 26 shots catch the fade firing. |
| 5 | Distant reflections break up more | **Landed, Review-15 bug intact** | Near/far breakup still reads well (`15`, `12`). But the hard seam at x:1055-1170,y:485-650 in `15` — a rock-reflection duplicate meeting open water on a razor-straight edge — is pixel-for-pixel the same unresolved bug. |

## Top 6 fixes, ranked by visual impact per hour of work

1. **Karst stoneKind never diverges within a cluster (`00`/`01`/`16`/`22`).** `sin(seed*12.7)` advances only 0.134 rad per adjacent stack index, so `floor(...)` rarely crosses a bin boundary across a 2-6 stack cluster. Swap in a per-index hash (or a larger, non-2π-friendly multiplier). Three review cycles old, cheapest fix here, biggest payoff.
2. **Reflection seam, still unfixed (`15`, x:1055-1170,y:485-650).** Identical to Review 15. Extend the existing fog falloff across the reflection plane's far edge, or feather it with an alpha mask.
3. **Rim-light too subtle on gunboat-scale meshes (`07`).** Code is correct (`teamRim.js`) but the `*1.5` emissive multiplier gets lost at ~50px with wake foam nearby. Bump it specifically for `kind==='creep'` meshes.
4. **Brawl smoke desaturates the new faction sail colors (`17`, x:600-1350,y:250-650).** Crimson/Azure sail hue converges to H≈0.06-0.10 under the warm dust grade, leaving only saturation to read team by. Preserve more saturation on ship materials through the smoke pass.
5. **Nameplate legibility collapses in bright smoke (`17`, x:830-1150,y:260-340).** Capture quirk or contrast bug, "1 Drake"/"1 Zheng He" are unreadable against warm bloom. Strengthen the dark backing plate's alpha at high scene luminance.
6. **Nameplate-fade rect is a near-miss for adjacent names (`03`, `05`).** `hud.js:570`'s padding (-14/+34 vertical) left "7 Drake" and "1 Togo" just outside the band despite sitting right above the banner. Widen the pad, and add a repro test so this feature gets an on-screen check next time.

## Broken

- The `15` reflection seam is a confirmed, repeat rendering bug, not a capture artifact.
- The karst tri-tone system is implemented but functionally inert due to the seed bug in fix #1 — a bug report, not just an art note.
- No other breakage found; claim 4's non-exercise is a test-coverage gap, not a defect.
