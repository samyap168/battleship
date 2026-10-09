# Discover learnings (the skill reads this first and updates it last)

Rules: one line per lesson with evidence; a lesson seen twice becomes a step in SKILL.md; delete lessons that stop helping after 5 runs; keep under 80 lines.

## What worked (keep doing)
- Phones and tablets were unplayable (panels covered the view, no touch controls): testing at 844x390 and 390x844 with `hasTouch,isMobile` found it; fix was a dedicated touch HUD (2d1122f). Always include a phone pass.
- Small friction items had outsized impact: re-centre the camera after a minimap click (double-tap portrait / ◎ button), `M` mute everywhere, banner that wraps beside the feed.
- Visual defects that only show in screenshots at gameplay zoom: rust streaks, rock strata swirls, blurry hit arcs. An art-director pass with 30 screenshots found them; code reading did not.
- Audible danger cues (low hull, fort under attack) were missing even though visual ones existed.

- Ocean look: most reference-ocean techniques were already ported (detail layers, SSS, lacy foam); adding large drifting wind-gust patches (rougher, darker) gave the sea visible life for ~10 lines of shader (before/after sea screenshots).
- Audible danger: the unused `shellWhistle` plus a camera kick on hits cost almost nothing and make fights readable by ear and feel.

## Dead ends (do not repeat)
- Blender-built hulls: measured first. At default zoom a frigate is ~110 px long and the game merges all ship parts into a few meshes, so authored hull detail is mostly invisible and costly to integrate. The user chose to skip it. Blender 5 installs fine here (`pip download bpy`, python 3.11, ~375 MB) if it is ever wanted for landmarks (citadel) that have no rigging.
- Hunting for a "10/10" verdict: not measurable, produced 60 empty loops. Use a measurable target.
- Adding a default public TURN relay: a third party would carry players' traffic and it cannot be tested here; needs the owner's decision.

## Needs real players or hardware (hand off)
- First-time-player test with 3 silent people; real phones; real GPUs; Safari and Firefox.

## Yield log (one line per run: date, ideas found, shipped, biggest regret)
- 2026-10 (look-and-feel run): 3 shipped (gust patches, shell whistle, hit kick); best ideas per minute came from reading the reference branch's shader comments; Blender detour cost ~30 min of questions and install before measuring payoff: measure payoff first next time.
- 2026-10: mobile layout + portrait double-tap shipped from user feedback; no run of this skill yet.
