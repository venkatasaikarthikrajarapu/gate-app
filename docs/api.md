# API Reference & Service Interfaces — GATE CSE MASTERY

This document outlines the core module interfaces and deterministic algorithms powering the GATE CSE preparation engine.

---

## 1. Adaptive Scheduler Engine (`src/lib/scheduler/`)
- **`generatePlan(input: SchedulerInputState): SchedulerOutput`*
  - Generates daily tasks, remaining topic backlog, burnout risk assessment, and planned allocations.
  - Enforces 7-day backlog absorption cap (<= 1.5x normal capacity, max 10h/day).
  - Triggers Plan A / Plan B / Plan C triage when schedules become impossible (Directive D10).
- **ZandlePreparationEvent(event: PreparationEvent, ...): RecalculationResult`*
  - Handles all 22 PreparationEvent types (day rollover, availability change, mock completion, missed topic, etc.).

---

## 2. Daily Diagnostic & Grading (`src/lib/grading/`, `src/lib/diagnostic/`)
- **`evaluateQuestionAnswer(input: QuestionGradeInput): QuestionGradeResult`*
  - MCQ: +1 or +2 on correct; negative markings -1/3 or -2/3 on incorrect.
  - MSQ: All-or-nothing exact match; no negative marks.
  - NAT: Exact, range [min, max], or tolerance +/- 2j%; no negative marks.
- **generateDailyDiagnostic(context: DiagnosticContext): DailyDiagnosticSet`*
  - 70% yesterday's topic, 20% weak/overdue, 10% spaced revision.
  - 7-step fallback chain with honest shortfall disclosure (Directive D2).

---

## 3. Spaced Repetition Engine (`src/lib/revision/`)
- **`calculateNextRevision(currentStability: number, outcome: RevisionOutcome, date: string): NextRevisionResult`*
  - Fixed stability intervals: `[1, 3, 7, 14, 30, 60]` days.
  - `recalled`: advances to next stability interval (caps at 60).
  - `forgot`: resets immediately to 1-day stability (RED bucket).
  - `partial`: retains current interval.
- **gbuildPhase3RevisionQueue(items: SpacedRevisionItem[]): Phase3RapidRevisionQueue`*
  - Organizes rapid revision into deck-first categories: formulas/traps, edge cases, mistake retests, and core concepts.

---

## 4. Mistake Intelligence Engine (`src/lib/mistakes/`)
- **	recordNewMistake(input: RecordMistakeInput): MistakeEntry`*
  - Classifies into 9 categories.
  - Repeat detection (>= 2 on question or >= 3 in topic) sets 1.5x priority multiplier and forces RED quarantine.
- **evaluateMistakeAttempt(mistake: MistakeEntry, isCorrect: boolean, ...): MistakeEntry` *
  - Quarantined mistakes require 2 consecutive correct attempts to graduate.

---

## 5. Mock Test Runner2 (`src/lib/mocks/`)
- **`scoreMockTest(attempts: MockAttemptEntry[], blueprint: MockBlueprint): MockScoreResult`*
  - Computes actual score, potential score, timing stats, and dangerous wrong answer count.

---

## 6. Question Importer (`src/lib/importer/`)
- **importQuestionsTransaction(rawInput: string, format: string, ...): ImportResult`*
  - 5-step pipeline (upload -> validate -> preview -> commit -> report) with auto-routing to Unmapped Topics queue.
