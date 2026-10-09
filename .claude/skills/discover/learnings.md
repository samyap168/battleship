# Discover learnings (the skill reads this first and updates it last)

Rules: one line per lesson with evidence; a lesson seen twice becomes a step in SKILL.md; delete lessons that stop helping after 5 runs; keep under 80 lines.

## What worked (keep doing)
- Phones and tablets were unplayable (panels covered the view, no touch controls): testing at 844x390 and 390x844 with `hasTouch,isMobile` found it; fix was a dedicated touch HUD (2d1122f). Always include a phone pass.
- Small friction items had outsized impact: re-centre the camera after a minimap click (double-tap portrait / ◎ button), `M` mute everywhere, banner that wraps beside the feed.
- Visual defects that only show in screenshots at gameplay zoom: rust streaks, rock strata swirls, blurry hit arcs. An art-director pass with 30 screenshots found them; code reading did not.
- Audible danger cues (low hull, fort under attack) were missing even though visual ones existed.

## Dead ends (do not repeat)
- Hunting for a "10/10" verdict: not measurable, produced 60 empty loops. Use a measurable target.
- Adding a default public TURN relay: a third party would carry players' traffic and it cannot be tested here; needs the owner's decision.

## Needs real players or hardware (hand off)
- First-time-player test with 3 silent people; real phones; real GPUs; Safari and Firefox.

## Yield log (one line per run: date, ideas found, shipped, biggest regret)
- 2026-10: mobile layout + portrait double-tap shipped from user feedback; no run of this skill yet.
