# Armada Ascension — Art Review 15

All 26 frames cropped and sampled with PIL against the four claimed changes since Review 14. The damage-number gap that survived two prior reviews is finally closed, twice over (`25`, `07`). Gunboat/captain scale differentiation reads clearly, though it overshoots the stated multiplier. Karst per-stack tint still doesn't exist. Reflections genuinely break up with distance — and checking that turned up a real seam bug.

## Scores

**Visual Quality: 8/10.** Reflection break-up with distance is real and attractive (see verification below), and the new hull-scale hierarchy reads well in motion. Held back by the same karst complaint as Review 14 — hue across 15 stacks in `00`/`01`/`16` still clusters H=0.066–0.129, one warm-tan family, only brightness/fog varying — and a new find: a hard vertical seam in the far reflection plane (`15`, x:1080-1180,y:440-620) where a rock-stack reflection meets open water on a razor-straight clip edge, no fog blend.

**VFX Readability & Impact: 9/10, up from 7.** Floating damage numbers now fire reliably: `25` (x:590-940,y:340-460) shows white "811" for an outgoing hit and red "3222" above-right of the "4 You" bar for damage taken, and `07` independently reproduces the same pattern ("2974" red above "1 You", "79" white further off). Two separate captures, not a one-off — this is landed. Splinter debris and explosion VFX (`18`, `21`) remain excellent.

**UI/UX: 8/10.** Kill-feed stacking (`20`) and the boss-nameplate fade (`03`) remain clean. New nuisance: in a packed brawl (`17`, x:650-1050,y:240-420) every hull — ally and enemy — is the same warm tan; team is legible only from the nameplate bar color, slower to parse than it should be in a 5-a-side skirmish.

**First-10-Seconds Wow: 8/10.** Unchanged from Review 14 — `06` menu and the three-beat opening (`00`/`01`/`13`) still land.

**Gameplay Camera Readability: 8/10, up from 7.5.** The hull-scale split genuinely helps at-a-glance parsing of threat tier: in `04` (x:560-930,y:400-620 vs x:970-1060,y:535-575) and `08` (x:690-870,y:420-590 vs x:970-1060,y:535-575) the unnamed AI hull is roughly 0.4-0.45x the linear size of the adjacent named hull even when closer to camera — an unmissable tell.

## Verification

| # | Change | Status | Evidence |
|---|---|---|---|
| 1 | Floating damage numbers: outgoing white, incoming red above-right of own bar | **Landed** | `25` (x:590-940,y:340-460): white "811" (outgoing) up-right, red "3222" directly above the "4 You" bar (incoming). Reproduced in `07`: red "2974" above "1 You", white "79" further out. |
| 2 | Karst per-stack tint, iron-red to cool grey | **Not landed** | 15 stacks sampled across `00`/`01`/`16`: HSV hue 0.066-0.129 throughout (warm tan-brown). No sample approaches red (~0.0) or cool grey/blue (~0.5-0.6, low sat). Only value/saturation shift with fog depth, same finding as Review 14. |
| 3 | Gunboats 0.9x, captains 1.15x+ | **Landed, overshoots spec** | `04`/`08`: unnamed hull ≈0.4-0.45x captain hull length at equal-or-closer depth — a ~2.2x visual gap, not the ~1.28x the multipliers imply. Reads as a different (simpler) small-boat model plus the scalar. Very readable; worth confirming it's intended. |
| 4 | Water reflections break up more with distance | **Landed** | `15`: near castle-turret reflection (x:580-900,y:480-760) keeps legible blue roof silhouettes; the island 700px further back (x:1260-1600,y:350-650) reflects as a soft, indistinct green-grey smear with no readable tree shapes. Same near/far gap confirmed in `01` (ship hull vs distant rock stack) and `12`. |

## Top 6 fixes, ranked by visual impact per hour of work

1. **Karst stacks still one hue, three reviews running (`00`/`01`/`16`).** Add a per-instance hue/saturation offset in the shared triplanar rock shader — a material-param change, no new geometry. Cheapest, most-repeated ask in the whole review chain.
2. **Reflection plane has a hard clip seam (`15`, x:1080-1180,y:440-620).** The far reflection cuts from open water to a flat-shaded rock duplicate along a dead-straight vertical line with no fog blend — visible in every wide establishing shot. Extend the existing distance-fog falloff across the reflection's far edge, or feather it with a soft alpha mask.
3. **Team hull tint missing in mixed brawls (`17`, x:650-1050,y:240-420).** Every ship is the same warm tan regardless of faction; only the nameplate bar carries team color. Tint hull trim/waterline or sail piping by faction color — cheap material tweak, meaningfully faster to read in a 5v5 scrum.
4. **Creep hull silhouette lost in weather/smoke (`09`, x:100-260,y:420-500).** Small AI hulls are dark-on-dark against storm chop and gun smoke; a thin emissive rim-light or brighter team-stripe on the low-tier hull would keep them legible without touching hero ships.
5. **Gunboat/captain scale gap overshoots spec (`04`/`08`, evidence above).** Confirm whether the ~2.2x gap (vs. the stated 1.28x) is intended; if it's a new smaller creep mesh compounding the 0.9x scalar, dial one back so creeps read as "the same ship, smaller" rather than a different toy-sized vessel.
6. **Boss title-card double-labels the same name (`03`, x:380-1215,y:180-290).** "THE LEVIATHAN RISES" sits directly over a ghosted "THE LEVIATHAN" world nameplate mid-fade — non-colliding contrast-wise (Review 14's fix holds) but still two overlapping instances of the same name. Suppress the world nameplate while the title card is active.

## Broken

- Reflection seam above (`15`) is a genuine rendering artifact, not a capture artifact.
- In `04`, two ally hulls show a health bar with no name text (x:600-950,y:230-310) — the known harness/DOM-banner capture limitation, not a game bug; flagged only since it looks like a regression at a glance.
- No other functional breakage found; claim (2) is a design gap, not a bug.
