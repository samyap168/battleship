# Armada Ascension — Art Review 14

Reviewed all 26 frames in `tests/output/gallery14/`, pixel-cropped and hue/contrast-sampled with PIL against the five claimed changes since Review 13. The boss-nameplate fade bug is genuinely fixed. The karst "per-tower tint" claim does not hold up under sampling — same material, just fog brightness. The damage-number gap flagged in Review 13 is still open, on the exact frame built to close it.

## Scores

**Visual Quality: 8/10.** The opening-sequence complaint (four near-identical shots) is resolved: `00` is a distinct enemy pagoda-citadel reveal, `01` a low close home-castle pass, `13` a genuinely higher crane-up wide shot — three compositions, not one repeated four times. `18` (citadel collapse, rain, flying debris) and `23` (mothership hangar) remain top-tier. Held back by claim (2): sampled across four stacks each in `00`/`01`/`16`, hue stays in a 0.058–0.098 band (HSV) regardless of stack — brightness varies with atmospheric depth, color does not.

**VFX Readability & Impact: 7/10.** Splinter debris (`11`, `21`, `25`) is a real, verified upgrade: zoomed crops show long thin silhouettes, roughly 1-in-4 fully dark/unburnt next to others with ember-crack glow scattered irregularly across the shape rather than a uniform burn — matches the brief. `25` delivers hit sparks and hull splinters flying off the ship convincingly. But no frame in the 26-shot set — including `25`, staged as "a close exchange of fire" — shows a single floating damage number, the identical gap Review 13 flagged, now surviving a screenshot built specifically to disprove it.

**UI/UX: 8/10, up from 6.5.** `03`'s boss nameplate is the standout fix: "THE LEVIATHAN" now renders at the same low-contrast fade level as the "JERVIS COMMISSIONS..." subtitle beneath it (local contrast std 20.2 vs 21.8, both well under the opaque headline's 33.5) instead of fighting the banner at full opacity. `24`'s laptop HUD remains clean; `20`'s six-line kill-feed never touches the score bar or minimap.

**First-10-Seconds Wow: 8/10.** `06` menu is still the best single frame. The opening sequence now plays as three directed beats (enemy reveal → home pass → crane-up) instead of recycled b-roll, directly fixing Review 13's top complaint.

**Gameplay Camera Readability: 7.5/10.** Unchanged core strength — `19`/`20` still deliver legible 3/4 hulls with readable deck detail and a non-intrusive event feed.

## Verified changes

| # | Change | Status | Evidence |
|---|---|---|---|
| 1 | Banner fade covers whole nameplate incl. boss names | **Landed** | `03` (x:550-1050,y:180-320): "THE LEVIATHAN" contrast (std 20.2) now matches subtitle fade (std 21.8), down from the full-opacity collision in R13. `hud.js:570` widens the fade rect to `y0-24`, covering label height for hero and boss alike. |
| 2 | Per-tower colour tint on karst stacks | **Not landed** | Hue sampled across 4+ stacks each in `00`, `01`, `16`: all cluster H=0.058-0.098 (same warm tan). Only brightness (atmospheric fog) varies with depth; no stack reads as a distinct color from another. |
| 3 | Debris = long thin splinters, ~40% unburnt, ember-crack glow | **Landed** | `11` (x:520-780,y:180-340), `21` same region, `25` (x:300-650,y:410-500): elongated dark shapes confirmed; roughly 1-in-4 fully dark/unburnt, others show patchy ember glow along cracks rather than uniform burn. |
| 4 | Direct hits throw hull splinters | **Landed** | `25` (x:300-650,y:410-500): visible splinter debris launched from the player ship's bow at the moment of impact. |
| 5 | Damage taken = smaller number right of own bar | **Unverifiable in gallery** | `hud.js:643` implements it (`s.x+58`, smaller, red, starts above the bar). No frame — including `25` — shows any floating damage number at all; same capture gap as Review 13, now on the frame designed to close it. |

## Top 6 fixes, ranked by visual impact per hour of work

1. **Damage numbers never render, even in the dedicated hit-moment frame (`25`, full frame).** Two reviews running, this feature exists only in code (`hud.js:301-317,642-646`). Either the hit trigger isn't firing or the harness captures before the float spawns/after it decays. Guarantee one visible pop in the `25` capture script — cheapest fix for the single most-requested, never-seen element in the gallery.
2. **Karst stacks: add real per-instance hue variance.** Current material is one warm-tan albedo lit by distance fog (`00`/`01`/`16`, hue locked to 0.06-0.10 everywhere). A per-instance hue/saturation offset (moss-green, cool slate, rust) in the shared triplanar shader sells "distinct towers" immediately — a material-param change, not new geometry.
3. **Water reflection Fresnel falloff (`15`, x:550-1050,y:500-900).** Reflection is darker than direct (mean 70.8 vs 87.6) but still a clean flipped duplicate with no distance-based blur/desaturation — carried three reviews, still the clearest "nice" vs "AAA" tell.
4. **Floating-island illusion at low camera angles (`02`, x:0-1600,y:0-400).** The foreground island's waterline blends into its own reflection, reading as levitating rather than sitting in water. A waterline foam/AO strip fixes this cheaply.
5. **Gunboat/captain scale differentiation** — still no frame shows a lower-tier hull beside a captain ship at comparable depth. Carried from Reviews 11-13.
6. **Boss nameplate fade, one notch further** — "THE LEVIATHAN" no longer collides, but its glow shadow still reads slightly hotter than the subtitle above it. Lowest priority; the collision bug itself is dead.

## Broken

- No screenshot — including the purpose-built `25_hit_moment` — exercises the floating damage-number system; same gap as Review 13, now surviving a frame engineered to disprove it.
- Claim (2) fails pixel sampling: karst "per-tower colour tint" is brightness/fog falloff with depth, not color.
