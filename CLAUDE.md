# Armada Ascension: working agreements for Claude

## Work in parallel with subagents (always, in every session)
Whenever a request contains two or more pieces of work that do not depend on each other, do NOT do them one after another yourself. Split them and run them at the same time:
- Spawn one subagent per independent piece (several `Agent` calls in a single message so they run concurrently). Use `isolation: "worktree"` when they edit code, so edits cannot collide; give read-only research/audit agents no isolation.
- Give each subagent a self-contained brief: goal, files it owns and files it must not touch, how to run/verify (ports, test commands), constraints, and what to report (commit hash, screenshots, numbers). Subagents do not see this conversation.
- Pick separate dev-server ports per agent (5191, 5192, ...). Never let two agents edit the same function.
- While they run, do the pieces that only you can do (answering the user, merging, tests of finished work). Do not wait idle and do not duplicate their work.
- When they finish, review each result (read the diff and screenshots, rerun the tests), merge or cherry-pick the worktree commits into the working branch, resolve conflicts, rerun the full gate, then push once.
- Typical splits here: art (hulls, textures, rigging, lighting) vs UI/controls vs audio vs multiplayer vs tests/CI vs audits. For audits, one read-only agent per focus area.
Run things sequentially only when step B needs step A's output, or the change is a few lines.

## Repo basics
- Development happens on `claude/exciting-hamilton-5jf5vt`; the test scripts, tools and models below live there until it is merged. `main` carries the shared agent setup (this file and `.claude/skills/`).
- Skill and CLAUDE.md updates (including each skill's `learnings.md` retrospective) are pushed to `main` as soon as they are committed, in their own commit, so every session gets them. Game code goes to `main` only when the owner says so.
- Branch work on the branch the session names; never open a PR unless asked; commit trailers: `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>` and the session link.
- Gate before pushing: `npm run build`, `node tests/smoke.mjs`, `node tests/determinism.mjs`, `node tests/mp.mjs`, `npm run test:ui`, `node tests/fullmatch.mjs "&autopilot=1"`. CI runs the same on every push. A failed build leaves a stale `dist`: confirm the build first.
- Simulation code (`Game.tick` and everything it calls) must be deterministic: seeded `srand/srnd/rnd` from `src/core/rng.js` only; presentation code uses `Math.random`.
- Skills in `.claude/skills/`: `/polish` (end-to-end test, audit, fix) and `/discover` (find and ship the next best enhancements). Both read and update their own `learnings.md`.
- Ship models: `tools/ship-assets/` rebuilds the Blender hull GLBs (see its README). Keep all models under 15 MB.
- Controls and layouts are tested by `tests/ui_controls.mjs` and `tests/ui_layout.mjs`; update them with any HUD change.
