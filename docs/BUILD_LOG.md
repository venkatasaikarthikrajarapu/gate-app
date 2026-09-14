# GATE CSE MASTERY — Build & Decision Log

## Stage 1: Repository Inspection, Scaffolding & Git Guards
- **Date:** 2026-09-14
- **Action:**
  - Verified remote repository `https://github.com/venkatasaikarthikrajarapu/gate-app` is clean and empty on branch `main`.
  - Initialized local workspace at `c:\Users\karth\OneDrive\Desktop\gate note`.
  - Installed Git 2.55 and Node.js v20.18 LTS into local user profile without requiring administrator elevation.
  - Configured strict `.gitignore` enforcing Directives D6 (no secrets) and D7 (no large reference files).
  - Created `.github/workflows/ci.yml` with pre-commit / CI guards rejecting any tracked files >5MB outside seed bank.
  - Scaffolding `docker-compose.yml` for PostgreSQL 16.
  - Authored initial `README.md` and `docs/PRESERVED_WORK.md`.
- **Status:** PASS
## Stage 2: Architecture, ADRs, Event Model & Deterministic Scheduler Skeleton
- **Date:** 2026-09-14
- **Action:**
  - Authored comprehensive `docs/ARCHITECTURE.md` documenting closed-loop learning lifecycle, subsystem boundaries, and PWA resilience.
  - Authored 6 Architectural Decision Records (`docs/ADR/ADR-001` through `ADR-006`): Tech Stack, Dual DB profile (Postgres + SQLite fallback), Event Log, Offline Outbox, Pure Deterministic Scheduler, and Authentication.
  - Authored `docs/DATA_MODEL.md` documenting 45+ entities across 8 domains and planned vs. actual ledgers.
  - Authored `docs/EVENT_MODEL.md` specifying 23 domain event types, append-only immutability, and 3-tier logging.
  - Authored `docs/SCHEDULER.md` specifying priority scoring math, soft subject balance (45% cap), backlog absorption, and impossibility triage (Plan A/B/C).
  - Authored `docs/sync.md` documenting offline replay and conflict resolution rules.
  - Implemented pure deterministic scheduler engine skeleton in `src/lib/scheduler/types.ts` and `src/lib/scheduler/engine.ts`.
  - Authored and verified 5 unit tests in `tests/unit/scheduler.spec.ts` (all green).
- **Status:** PASS
## Stage 3: Complete Database Schema, Migrations & Idempotent Seed
- **Date:** 2026-09-14
- **Action:**
  - Implemented comprehensive `prisma/schema.prisma` modeling 45+ relational entities across 8 core domains.
  - Configured dual DB profile (PostgreSQL 16 in Docker Compose + SQLite dev.db fallback for zero-barrier local execution).
  - Executed Prisma client generation and migrated SQLite authoritative database.
  - Developed and verified idempotent `prisma/seed.ts` script:
    - Versioned ExamCycle for GATE CSE 2027 (2027-02-06, 180m, 100M, 65Q).
    - Syllabus Version 1 with all 12 subjects and starter topic trees.
    - Default user, settings, and weekday availability templates (Mon-Sun).
    - Canonical Edge Cases (M3) and Trap Rules (M4).
    - Curated practice bank: 132 practice questions (36 MCQ, 48 MSQ, 48 NAT), satisfying the >=40 MSQ and >=40 NAT requirement honestly without fake PYQs (D2, R21).
  - Authored and verified `tests/integration/schema.spec.ts` asserting ExamCycle, 12 subjects, quotas, append-only PreparationEvents, TopicLink, and planned vs. actual ledgers.
- **Status:** PASS
## Stage 4: Syllabus Management, Versioning, Diff Engine & Historical Mapping
- **Date:** 2026-09-14
- **Action:**
  - Implemented pure deterministic Syllabus Diff Engine (`src/lib/syllabus/diff.ts`):
    - Hybrid Levenshtein and token-set similarity metric with possessive and punctuation normalization.
    - Accurate classification into ADDED, REMOVED, MODIFIED, and UNCHANGED with field-level diffs.
    - Enforced non-destructive archival semantics for removed topics (Directive D12).
  - Implemented Syllabus Impact Analyzer (`src/lib/syllabus/impact.ts`):
    - Computes net hours delta, required daily study shift, and deadline risk transitions.
    - Generates human-readable schedule consequence explanations.
  - Implemented Topic Lineage Mapping (`src/lib/syllabus/lineage.ts`):
    - Generates `TopicLink` mappings (split, merge, rename) ensuring historical attempts remain anchored to original topics.
  - Authored `docs/SYLLABUS_DIFF.md` documenting matching rules and lineage specifications.
  - Authored and verified unit tests in `tests/unit/syllabus.spec.ts` (all green).
- **Status:** PASS
## Stage 5: Adaptive Scheduler, Event-Driven Recalculation & Impossibility Triage
- **Date:** 2026-09-14
- **Action:**
  - Implemented event trigger router (`src/lib/scheduler/triggers.ts`):
    - Mapped all 23 PreparationEvent types to deterministic schedule recalibrations.
    - Generated explainable `ScheduleChangeEvent` summaries linking to triggering domain events.
  - Formulated full anti-burnout recovery mechanics:
    - 7-day backlog absorption capped at 1.5x capacity and 10h/day ceiling.
    - Emergency day 45-minute floor preserving daily streak.
    - Impossibility triage generator offering concrete Plan A, Plan B, and Plan C options when risk is HIGH/CRITICAL.
  - Authored comprehensive test suite `tests/unit/scheduler_full.spec.ts`:
    - Deterministic byte-for-byte reproducibility assertions.
    - Late start handling without historical fabrication.
    - Missed day absorption within capacity constraints.
    - Impossibility triage activation.
    - Pinned topic overrides floating to the top with priority enforcement.
  - All 22 tests passing.
- **Status:** PASS
## Stage 6: Daily Diagnostic Engine, Pure Grader & Report Card
- **Date:** 2026-09-14
- **Action:**
  - Implemented pure grading engine (`src/lib/grading/evaluator.ts`) shared across diagnostics, practice, and mocks:
    - MCQ grading with official negative marking: -1/3 for 1-mark, -2/3 for 2-mark.
    - MSQ all-or-nothing evaluation without partial marks or negative marking.
    - NAT evaluation supporting exact, range, and relative tolerance (default +/-2%) matches.
    - Robust NAT input parsing: stripped commas, units ("400 MHz" -> 400), whitespace, negative numbers, and rejection of malformed values.
  - Implemented Daily Diagnostic Generator (`src/lib/diagnostic/generator.ts`):
    - 70/20/10 weighting for yesterday's topic, weak/overdue revision, and spaced review.
    - 7-step fallback chain with global 14-day cooldown enforcement.
    - Honest shortfall disclosure (Directive D2, J1.5) reporting exact quota shortfall notices without fabricating synthetic questions.
  - Implemented Post-Diagnostic Report Card (`src/lib/diagnostic/report.ts`):
    - Computes net marks, accuracy, per-type breakdown (MCQ, MSQ, NAT), and prioritized dangerous mistake detection.
  - Authored and verified tests in `tests/unit/grading.spec.ts` (9 tests) and `tests/unit/diagnostic.spec.ts` (3 tests).
- **Status:** PASS
## Stage 7: Question Bank Importer, Five-Step Transaction & Type Assessor
- **Date:** 2026-09-14
- **Action:**
  - Implemented transactional Five-Step Question Importer (`src/lib/importer/importer.ts`):
    - Format auto-detection: JSON, CSV, JSONL.
    - Strict validation enforcing GATE marks (1 or 2), valid question types (MCQ, MSQ, NAT), options >= 2 for MCQ/MSQ.
    - Enforced PYQ integrity (Directive D2): rejected PYQs lacking verified source or exam year.
    - Automated routing of unrecognized topics to the dedicated Unmapped Questions Queue.
    - Distinct row error accounting and non-blocking explanation warnings.
  - Implemented Question Bank Type Assessor (`src/lib/importer/assessor.ts`):
    - Conversion between question types (e.g. numeric MCQ to NAT, multi-statement to MSQ).
    - Full before/after audit trail logging.
  - Authored `docs/IMPORT_FORMATS.md` with schema specifications and format examples.
  - Authored and verified tests in `tests/unit/importer.spec.ts` (6 tests).
- **Status:** PASS

## Stage 8: Activity Tracking, Planned vs Actual Separation & Sync Engine
- **Date:** 2026-09-14
- **Action:**
  - Implemented Planned vs Actual Ledger Reconciliation (`src/lib/activity/ledger.ts`):
    - Strict Directive D13 enforcement: immutable planned task allocations (`DailyTask.plannedMinutes` never mutated).
    - Granular delta tracking (`actualMinutes - plannedMinutes`) and reconciliation statuses (`met`, `surplus`, `deficit`).
  - Implemented Study Session Logging & Event Generation (`src/lib/activity/session.ts`):
    - Preserves historical backfilling with `effectiveDate` and `occurredAt` tracking.
    - Generates immutable `PreparationEvent` instances for audit and scheduler consumption.
  - Implemented Non-Toxic Streak Engine (`src/lib/activity/streak.ts`):
    - Active preparation threshold: normal days >=45 min or >=1 completed task; emergency days >=30 min floor.
    - Directive D4 & Section P5 compliant: missed days trigger gentle recovery copy with one-tap redistribution options, never streak-shaming.
  - Implemented Outbox Replay & Sync Manager (`src/lib/sync/outbox.ts`):
    - Full client-side mutation outbox replay with idempotency UUID (`clientId`) deduplication (ADR-004).
  - Authored and verified unit tests in `tests/unit/planned_actual.spec.ts` (3 tests) and `tests/unit/sync.spec.ts` (1 test).
- **Status:** PASS

## Stage 9: Mistake Intelligence, Repeat Pattern Quarantine & Confidence Calibration
- **Date:** 2026-09-14
- **Action:**
  - Implemented Mistake Classification & Repeat Engine (`src/lib/mistakes/engine.ts`):
    - Full 9-category taxonomy: `conceptual_gap`, `misread_question`, `calculation_error`, `formula_forgotten`, `unit_conversion_error`, `edge_case_missed`, `time_pressure_rush`, `overconfidence_trap`, `guessing_error`.
    - Repeat detection rules: repeats (question count >=2 or topic pattern >=3) trigger 1.5x priority weight multiplier, RED revision bucket floor, and quarantine.
    - Dangerous mistake flagging: detects HIGH confidence wrong answers and overconfidence traps.
    - Retest & Quarantine clearance: requires 2 consecutive correct attempts to graduate out of quarantine; any relapse resets consecutive count to 0 and multiplies priority by 1.5x (capped at 5.0).
    - Topic Mistake Pattern Detection: scans topic mistake history; triggers active alerts and tailored remedial actions when identical patterns reach >=3 occurrences.
  - Authored and verified tests in `tests/unit/mistakes.spec.ts` (4 tests).
- **Status:** PASS

## Stage 10: Guided Short Notes, Formula Decks & Canonical Edge-Case/Trap Engine
- **Date:** 2026-09-14
- **Action:**
  - Implemented Guided Short Notes Engine (`src/lib/decks/notes.ts`):
    - Strict validation enforcing mandatory reflection fields (`title`, `whatILearned`, `keyConcepts`).
    - Full markdown export formatting 7 structured reflection sections plus mnemonics/tricks.
  - Implemented Formula Deck & Recall Engine (`src/lib/decks/formulas.ts`):
    - KaTeX mathematical notation validation with bracket balance checks.
    - Plain-text twin generation for instant offline fuzzy searchability.
    - Formula Recall Mode generating variable prompts and post-reveal recall scoring (1=forgot, 2=partial, 3=perfect).
  - Implemented Canonical Edge Cases & Trap Rule Engine (`src/lib/decks/traps.ts`):
    - Fast search across concepts, trap behaviors, and counter-measures.
    - Topic-specific edge case indexing to prevent recurring boundary misses.
  - Authored and verified tests in `tests/unit/decks.spec.ts` (7 tests).
- **Status:** PASS



