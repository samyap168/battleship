---
name: discover
description: Self-discovery of high-impact enhancements for Armada Ascension (UI/UX intuitiveness, 3D visuals, VFX, SFX, environment, lighting, camera). Plays and inspects the game like a new player and an art director, benchmarks against reference games, ranks ideas by impact and cost, implements the top few behind tests, and hands off to /polish. Use when the user asks what to improve, for new features, or to make the game more intuitive or stunning.
---

# Discover (find the next best enhancements)

Output: a ranked backlog of enhancements, the top 3 to 5 implemented and verified, and a "needs a human" list. Never invent features without evidence from steps 1-3.

## 0. Read the learnings, set a measurable target
Read `.claude/skills/discover/learnings.md` first. Write one measurable target for the run at the top of the report (for example "a first-time phone player sails and fires within 60 s without reading anything", or "every combat event has a distinct sound and a visual cue"). Question the requirement before adding anything: which player problem does this solve, and what could we delete instead? Prefer deleting or simplifying a HUD element over adding one.

## 1. Experience it as a first-time player (UX friction audit)
Drive the game with Playwright (see the `polish` skill for setup) with zero prior knowledge, desktop and phone (`?touch=1`, 844x390 and 390x844). Record, with a screenshot each:
- Time to first meaningful action; what the player must guess (controls, goals, what a ring or icon means).
- Every moment of confusion: unlabeled icons, unexplained numbers, silent failures (a click that does nothing), feedback missing for cast, hit, low hull, capture, age-up, death, respawn.
- Is the next goal always visible? Is danger readable in under half a second (incoming shells, low hull, fort under attack)?
- Information overload: HUD elements that never matter during a fight, text under 12 px, overlaps at 1024x640 and phone sizes.
Turn each friction into a one-line fix idea (tooltip, context hint, highlight, sound cue, default, shortcut).

## 2. Look at it as an art director
Screenshot each hull, each age, dusk, storm, the Leviathan, fort sieges, island shores, water at min and max zoom, and the opening and end cinematics. Score 1-5 on: silhouette readability of ships and teams at gameplay zoom, lighting and colour contrast, water and sky, particle density and shape, camera framing, composition during the key moments (age-up, boss rise, citadel fall). List the weakest three per category with a concrete visual change (rim light colour, bloom threshold, wake length, muzzle flash shape, camera shake curve, FOV punch, slow-mo on a kill streak).

## 3. Listen to it
Check coverage and mix: every event in the list above has a distinct, short, readable sound; music intensity follows combat; sounds are positional and centred for the player's own actions; nothing clips in a ten-captain fight. Note gaps (for example incoming-salvo whistle, streak callouts, respawn).

## 4. Benchmark
For each gap, name how two or three well-loved games solve it (League of Legends / Wild Rift for MOBA readability and mobile controls, Sea of Thieves / Black Flag for ocean and ship feel, Halo Wars for RTS feedback, Alto's Odyssey for lighting mood) and take the principle, not the asset. Prefer principles that cost little: feedback within 100 ms, one clear focal point per screen, colour carries team and danger, motion before text, progressive disclosure of complexity.

## 5. Rank and decide
Make a table: idea, player impact (1-5), wow factor (1-5), cost (S/M/L), risk to performance or determinism, how to verify. Pick the top 3-5 by (impact + wow) / cost, with at least one UX and one visual/audio item. Budgets: Low preset stays near 50 draw calls and 60 fps on integrated GPUs; any simulation change must keep `tests/determinism.mjs` and `NET=peer` multiplayer green; presentation effects must use `Math.random` or `vrnd`, never the seeded sim RNG.

## 6. Implement behind a check
For each pick: write the smallest version, add a toggle or quality gate if it costs GPU, add a screenshot or test that proves it, compare before and after screenshots, and run the baseline gate. First-run guidance goes in as contextual hints that appear once and respect the "coached" flags, never as walls of text.

## 7. Hand off
Run `/polish` on the result. Finish with: shipped enhancements with before/after evidence, the ranked backlog of the rest, and what needs real players or hardware (first-time-player test with 3 people, a real phone, a real GPU). Suggest the human playtest questions: where did you hesitate, what did you not understand, what moment felt best.

## 8. Retrospective (self-update, mandatory)
Before the final report, improve this skill from what just happened:
1. Which of the ideas shipped actually moved the measurable target (check with the same before/after screenshots or timings)? Note winners and duds in `learnings.md` with evidence.
2. Which discovery step produced the best ideas per minute spent? Do more of that next time, and shorten or drop steps that produced nothing.
3. Add the new reference principles you used and the questions that were most useful to the playtest list.
4. Move repeated lessons into the steps above, delete stale ones, keep `learnings.md` under 80 lines, append one line to its yield log.
5. Commit the skill changes in their own commit, and push that commit to `main` too (apply only `.claude/skills/` and `CLAUDE.md` onto a `main` worktree, push; the owner approved this for skill updates only) ("discover: learned ...") and mention them in the report.
