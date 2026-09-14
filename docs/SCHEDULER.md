# GATE CSE MASTERY — Adaptive Scheduler Specification

## 1. Pure Function Contract
The scheduler (`src/lib/scheduler/engine.ts`) is a 100% pure TypeScript function with zero I/O:
`generatePlan(input: SchedulerInputState): SchedulerOutput`

The clock (`today`) is injected. Deterministic tie-breakers ensure that identical inputs generate byte-identical plans.

---

## 2. Priority Scoring Formula
Topics are prioritized for first-pass learning using:
```
PriorityScore = (0.35 * priority) + (0.20 * difficulty) + (0.20 * subjectWeightRemaining)
              + (0.15 * (1 - completionPercent)) + (0.10 * dependencyHint)
              - (0.05 * consecutiveDaysOnSameTopic)
```
- Pinned topics float to the top within their subject.
- Ties are broken deterministically by subject displayOrder and topic displayOrder.

---

## 3. Subject Balance Soft Rule
No single subject may exceed 45% of scheduled study minutes in any rolling 7-day window, unless explicitly pinned or overridden by the student. When the threshold is reached, the scheduler rotates to the highest-priority topic in another subject.

---

## 4. Missed-Day Recovery Pipeline
1. Disposable tasks (morning diagnostic, general note tasks) are dropped; missed topics fold into future diagnostics.
2. Core study, practice, and revision tasks carry over into backlog minutes.
3. Carried backlog is absorbed over a 7-day window at recovery capacity (default 1.25x normal capacity, hard-capped at 1.5x, max 10h/day).
4. Critical feedback loops (diagnostic, mistake review) are never sacrificed.

---

## 5. Impossibility Triage (Plan A / B / C)
When requiredDailyHours > recoveryCapacity or deadline risk reaches CRITICAL (>1.35):
- Plan A (Aggressive): Recovery multiplier raised to 1.5x, 14-day absorption, buffer reduced to 5%.
- Plan B (Balanced): 1.25x multiplier maintained; low-priority first-pass topics slip past phase deadline into Phase 2.
- Plan C (Priority Cut-Line): Topics below cutoff moved to selective study without mastery targets; core subjects fully covered.

---

## 6. Deadline Risk Metric
```
requiredDaily = remainingWorkMinutes / availableStudyDays
ratio = requiredDaily / (normalCapacity * (1 - bufferPercent))
```
- LOW: ratio <= 0.85 (Green)
- WATCH: 0.85 < ratio <= 1.05 (Amber)
- HIGH: 1.05 < ratio <= 1.35 (Orange)
- CRITICAL: ratio > 1.35 (Red -> Triggers Plan A/B/C)
