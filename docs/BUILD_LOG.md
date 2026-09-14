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
