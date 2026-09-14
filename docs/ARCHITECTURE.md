# GATE CSE MASTERY — System Architecture

## 1. Architectural Philosophy
GATE CSE MASTERY is an autonomous, personal, closed-loop adaptive preparation engine built for exactly one student preparing for the Graduate Aptitude Test in Engineering (GATE) in Computer Science & Information Technology.

The product is built to survive change (V2 Core Principle):
- **Exam rules, syllabus, and schedules are versioned editable data**, never hard-coded constants.
- **Append-only Preparation Event Log**: every meaningful change is recorded as an immutable fact.
- **Deterministic core intelligence**: the scheduler, grading engine, diagnostic selection, mastery math, and syllabus diff are pure, testable functions without probabilistic LLM dependencies.
- **Strict separation of Planned vs. Actual activity**: what was planned is never rewritten by what actually occurred.

---

## 2. High-Level System Architecture

`
+-----------------------------------------------------------------------------------+
|                                 CLIENT LAYER (PWA)                                |
|  - Next.js App Router (React 18 + Tailwind CSS + Lucide + KaTeX)                 |
|  - Service Worker: Pre-caches app shell & static assets                           |
|  - IndexedDB: Local Cache (last 7 days missions/plans/notes) + Append-only Outbox|
|  - Real-time client state with optimistic updates and offline resilience          |
+-----------------------------------------------------------------------------------+
                                         |
                                         | HTTP / HTTPS API & Server Actions
                                         v
+-----------------------------------------------------------------------------------+
|                                 API & COMMAND LAYER                               |
|  - Next.js Route Handlers: /api/commands, /api/sync, /api/backup, etc.            |
|  - Authentication: Single-user bcrypt session cookie (HttpOnly, SameSite=Strict)  |
|  - Command Dispatcher: Translates structured user actions into PreparationEvents  |
|  - Three-Tier Logger: Emits PreparationEvent + AuditLog + ScheduleChangeEvent      |
+-----------------------------------------------------------------------------------+
                                         |
                                         v
+-----------------------------------------------------------------------------------+
|                           PURE DETERMINISTIC CORE ENGINES                         |
|  - Scheduler Engine (src/lib/scheduler/): Pure functions, zero I/O                |
|  - Diagnostic Engine (src/lib/diagnostic/): Weighted selection & fallback chains  |
|  - Grading Engine (src/lib/grading/): MCQ negative, MSQ exact, NAT tolerances     |
|  - Mastery Engine (src/lib/mastery/): Deterministic mastery & recency decay       |
|  - Revision Engine (src/lib/revision/): Stability buckets [1,3,7,14,30,60] days    |
|  - Syllabus Diff Engine (src/lib/syllabus/): Levenshtein >=0.85 fuzzy matching    |
+-----------------------------------------------------------------------------------+
                                         |
                                         v
+-----------------------------------------------------------------------------------+
|                                AUTHORITATIVE DATA LAYER                           |
|  - Prisma ORM: Multi-database profile (PostgreSQL 16 default, SQLite zero-infra)  |
|  - Relational Models: 45+ normalized entities with referential integrity          |
|  - Full-Text Search (FTS): Trigram & tsvector ranked search                       |
|  - Local Storage (storage/reference/): Content-addressed raw reference documents  |
+-----------------------------------------------------------------------------------+
`

---

## 3. The Closed-Loop Lifecycle
The app executes a continuous feedback loop:
1. **PLAN:** The scheduler allocates daily task blocks within student availability (60–150m blocks), respecting subject balance (<=45% rolling 7d cap) and buffer reserves.
2. **STUDY:** Student engages with Today\'s Mission, studying target topics and capturing actual time.
3. **DAILY QUESTIONS:** Morning diagnostic serves 10 questions (~70% yesterday\'s topic, 20% weak/overdue, 10% spaced mixed review) with majority MSQ/NAT target.
4. **PERFORMANCE:** Graded instantly according to official GATE marking (MCQ negative, MSQ all-or-nothing, NAT tolerances).
5. **MISTAKES:** Wrong attempts auto-create Mistake records for student classification and repeat-pattern tracking.
6. **TOPIC MASTERY:** Updated deterministically using accuracy, PYQ performance, recency decay, and attempt confidence.
7. **REVISION:** Memory stability buckets schedule timely reviews with cadence boosts for weak or repeated-mistake topics.
8. **MOCK TESTS:** Full (65Q/100M/3h) and sectional tests mirror official blueprints with actual vs. potential score breakdowns.
9. **MOCK ANALYSIS:** Identifies recoverable mark losses and concept gaps.
10. **UPDATED PLAN:** Change events trigger debounced, idempotent recalculations with human-readable explanations.
11. **STUDY AGAIN:** Loop continues seamlessly.

---

## 4. Subsystem Boundaries & Invariants
- **No LLM in the Core Engine:** Intelligence is transparent and mathematically provable. AI is restricted to an optional Tier-2 reference-extraction assistant (default OFF).
- **Online-First, Gracefully Offline:** Server database is authoritative. IndexedDB serves as cache and outbox only.
- **Zero Data Loss:** Old syllabus versions and historical attempts are permanently preserved.
- **Never Fabricate:** No fake PYQs, no fake processing states, no placeholder analytics.
