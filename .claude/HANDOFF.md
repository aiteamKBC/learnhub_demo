# Handoff: where the work stands (2026-11-17)

Read this first, then `CLAUDE.md`, `docs/goal.md` and `docs/build-status.md` (newest first).
The SessionStart hook (`.claude/hooks/context.py`) points every new Claude Code session here.

---

## 1. The state in one paragraph

Branch `demo-work`. **Nothing from M17 or Programs v1 (M18–M23) is committed.** About 200 files are
modified or new in the working tree (the user's decision on 2026-11-16 was "no commits, no pushes" so they
could review everything first). Programs v1 is built: M18 to M22 are ticked in `docs/goal.md`. M23 is half
done, and the final "Long tests" box is half done. Both are blocked on the user (see §4).

> If you are on a different machine: this work only exists where it was built, until someone commits and
> pushes it. Agree with the user how it reaches you (for example, they commit to `demo-work` and push to
> `origin`).

---

## 2. What is done

| Item | State | Where it is recorded |
|---|---|---|
| M17 HR system (Breathe HR) | Built. **No tests written** (user decision). Dev migrations applied by the user; e2e not. | build-status "M17", brief `docs/milestones/M17-hr-system.md` (its test list is the to-do) |
| M18 Program structure, cohorts, groups | Built, small tests, reviewer pass | build-status "M18" |
| M19 KSBs, off-the-job hours, CPD | Built, small tests, reviewer pass | build-status "M19" |
| M20 Teams live sessions, recordings, workshops | Built, with a manual fallback when Teams isn't connected | build-status "M20", `docs/teams-setup.md` |
| M21 B2C buying (offers, seats, module unlocks, instalments) | Built | build-status "M21" |
| M22 B2B company seats, orders, swaps, line manager view | Built | build-status "M22" |
| M23 Part 2: `seed_programs` command | Built, tested (3 tests), reviewed. Provisional data for PCP, MM, ME | build-status "M23", `backend/apps/delivery/seed/programs/*.json` |
| Full backend suite | Run once: 465 tests, 1 timing flake (query budget vs the 60 s settings cache), fixed in the test | build-status top section |
| Reviewer over all Programs work | Done; 8 issues fixed, 44 tests OK; 3 became client questions #45–#47 | build-status "Programs v1: cross-milestone review and fixes" |
| ruff, `makemigrations --check`, `tsc -b`, `vite build` | All clean (entry chunk 142.9 kB) | |

Plan for all of Programs v1: `docs/features/programs-v1/plan.md` (decisions D1–D29). Briefs:
`docs/milestones/M18-…` to `M23-merge-and-seed.md`.

---

## 3. What is missing (the to-do list, in order)

1. **Get the user's answers** in `docs/NEEDS-USER.md` (§4). The Stop hook lets a session stop while that
   file exists; delete it once everything in it is answered.
2. **M23 Part 1, the merge of old live cohorts:** build whichever option the user picks for NEEDS-USER #1.
   Recommended is A (keep both flows, rename the old one "Short-course live training"), which is a
   small label change only.
3. **M23 real structure:** if the user allows the export (NEEDS-USER #2, option A), replace the three
   provisional JSON files and add MBA's file. No code change is needed; the seed reads the files.
   Then tick the M23 box in `docs/goal.md`.
4. **Migrations on the e2e branch** (NEEDS-USER #3): 32 pending, all additive (M17's four, every M18–M22
   one, and `learning.0016_seat_counts_access`). Only with the user's OK, only
   `python manage.py migrate --database owner`, never `--fake`. Show `showmigrations` before and after.
   Dev: the user runs the M18+ ones themselves (list in build-status, each milestone section).
5. **E2E scripts for Programs** (none exist yet): `tools/harness/e2e_m18.js` … `e2e_m23.js` (or one
   `e2e_programs.js`), using the `e2e-tester` agent. Then re-run every earlier script (`e2e_m1` … `e2e_m6`,
   `e2e_demo`). Needs the demo password `E2E_DEMO_PASSWORD` from the user for learner pages.
6. **Phone check in light and dark** on every new route (`phone_check.js` for learner routes,
   `phone_business.js` for business routes), and look at the screenshots next to the mockups.
7. **Final full backend suite** once more after any fix, then tick the "Long tests" box.
8. **M17 tests are still owed** (backend tests for `apps.integrations`, `e2e_m17.js`, phone check,
   reviewer pass). Not part of the Programs goal box, but nobody has done them.

Out of the goal but still open: client questions in `docs/client-questions.md` (never decide these;
build the stated default), and the old user actions in `docs/user-actions.md` (M17 key
`CREDENTIAL_ENCRYPTION_KEY`, the `cryptography` pin, the Teams Azure setup, the seat-swap permission on a
staff role, running `seed_programs` on dev or e2e).

Known limits, recorded and not fixed: the build-status sections for M22 and M23 list them (seat swap list
shows the newest 100; releasing a started seat is refused, use a swap; seeded reading hours are dated the
seed day).

The "Next" section near the bottom of `docs/build-status.md` is from before Programs and is out of date.
Use this file and `docs/goal.md` instead.

---

## 4. Blocked on the user (`docs/NEEDS-USER.md`)

1. **Old company live cohorts** (short courses) can't become program cohorts. Recommended: keep both flows.
2. **Real week-by-week structure** of PCP, MBA, MM, ME lives only in LMS_v2's own Neon database (another
   project, with learner data). **Don't touch it** without the user's explicit OK. Recommended: one
   read-only export of the structure tables only.
3. **e2e branch 32 migrations behind**, plus the demo password. Recommended: the user lets Claude migrate
   the e2e branch only.

---

## 5. Rules the user gave that are NOT written elsewhere in the repo

These lived in the previous developer's private Claude memory, so a new machine won't have them.

- **The product is sold to other training providers.** Nothing KBC-specific. Business rules (OTJ target,
  minimum seats, swap cut-off, attendance threshold, holiday country) are provider settings; staff powers
  are permissions (`core/staff_perms.py`), never role names.
- **Git so far: no commits, no pushes** (user decision 2026-11-16 for the Programs goal). Ask the user
  before your first commit. Never push to the `learnhub` remote (the team repo, fetch only); `origin` is
  `aiteamKBC/learnhub_demo`. Never merge to `main`. `.claude/settings.json` still allows pushing the old
  `frontend-m3-m6` branch; that is stale.
- **Tests:** small targeted tests while building (`--keepdb --noinput`, single apps or classes); the long
  round (full suite, E2E, phone) when the user asks. Never run two test runs at once (they share the
  `test_*` database).
- **Never run `npx prettier` on frontend files.** There is no formatter config; prettier reflows whole
  files. Write TSX by hand in house style (single quotes, no semicolons, wide lines); check with
  `npx tsc -b`.
- **Production site:** `https://learnhub.abcsolutions.ai` (API on the same domain). Only read-only checks
  against it without asking.
- **Plans live in the repo:** Programs `docs/features/programs-v1/`, B2C `docs/features/b2c-monetization-v2/`,
  B2B packages `docs/features/b2b-packages-v1/`, briefs in `docs/milestones/`. Never reuse a milestone number.

---

## 6. Practical notes for Claude Code

- Long checks: `backend/venv/Scripts/python.exe tools/run_check.py <name> -- "<repo>/backend/venv/Scripts/python.exe" manage.py test <labels> --keepdb --noinput --cwd backend`,
  run in the background, then wait once with `until grep -qE "^(OK|FAILED)" logs/<name>.log; do sleep 30; done`.
  A full suite takes about 20 minutes or more on Neon.
- The guard hook (`hooks/guard.py`) blocks Bash commands containing certain words (for example
  "truncate"); rephrase rather than fight it.
- The lint hook (`hooks/lint_python.py`) runs ruff after each Python edit; it flags f-string SQL (S608).
  Write SQL in migrations as plain constants.
- The Stop hook (`hooks/goal_gate.py`) keeps a session working while `docs/goal.md` has unticked boxes,
  unless `docs/NEEDS-USER.md` exists. `.goal_state.json` is its scratch state (git-ignored).
- Useful Programs services: `apps/delivery/services.py` (cohorts, groups, settings), `sessions.plan_sessions`,
  `apps/learning/placement.place`, `apps/learning/live.py`, `apps/learning/records.py` (OTJ),
  `apps/commerce/programs.py` (B2C), `apps/corporate/program_seats.py` (B2B),
  `learning.models.holds_place()` (the one rule for "holds a group place"; SQL twin in `learning.0016`),
  `engagement.notify.muted()` (silence notices, used by the seed).
