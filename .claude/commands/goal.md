---
description: Work through docs/goal.md (Programs v1, M18 to M23, then the long tests) without stopping
---
Start or resume the goal in `docs/goal.md`.

1. Read `.claude/HANDOFF.md`, `docs/goal.md`, `CLAUDE.md` and `docs/build-status.md`. Check `git status`, the current branch and the last commits.
2. Stay on the branch goal.md names and follow its git rule (currently: no commits). Never merge to `main`.
3. Take the first unticked item and do it fully:
   - apply any unapplied planner review first;
   - run `/milestone <id>` (or, for the final item, the full regression);
   - make sure it meets the Definition of done;
   - tick the box and run `/status` (commit only if goal.md allows it).
4. Move straight on to the next item. Don't stop to report between milestones: `docs/build-status.md` is the report.
5. Use sub-agents for independent work packages to save your context. Keep `docs/build-status.md` current, so a compaction loses nothing important.
6. Follow every rule in CLAUDE.md. Questions only the user can answer go to `docs/NEEDS-USER.md`, as goal.md describes. $ARGUMENTS
