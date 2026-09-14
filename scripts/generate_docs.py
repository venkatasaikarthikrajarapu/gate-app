# scripts/generate_docs.py
import os

docs = {
    "docs/DATA_MODEL.md": """# GATE CSE MASTERY — Data Model & Schema Specification

## 1. Schema Overview
The authoritative data layer comprises 45+ relational entities categorized into 8 core domains. It strictly enforces the principle of change survival, versioned exam rules, and separation of planned vs. actual activity.

---

## 2. Core Domains & Key Entities

### Domain 1: Exam & Settings (Versioned Configuration)
- **ExamCycle:** The primary configuration container (name: "GATE CSE 2027", cycleYear: 2027, official examDate: 2027-02-06, durationMinutes: 180, totalMarks: 100, totalQuestions: 65, sections JSON, phases JSON, active syllabusVersionId).
- **Exam:** Versioned rules snapshot (marking schemes, question types).
- **Settings:** Single-user preferences (daily diagnostic count, time limit, type-mix targets, buffer percent, recovery multiplier, max daily ceiling).
- **SyllabusVersion:** Immutable syllabus snapshots (status: draft, review, active, archived).
- **DayType & AvailabilityTemplate:** Base weekday capacity schedules and daily overrides.

### Domain 2: Syllabus & Lineage
- **Subject:** 12 core subjects (displayOrder, marksWeight, priority).
- **Topic:** Subject sub-units (estimatedHours, priority, difficulty, status, masteryScore, completionPercent, pinned).
- **Subtopic:** Granular topics under a topic.
- **TopicLink:** Preserves lineage between syllabus versions (fromTopicId -> toTopicIds, split/merge/rename/move). Historical attempts remain permanently anchored to their original topic ID.

### Domain 3: Questions & Attempts
- **Question:** Question bank item (sourceType: pyq/practice/generated/demo, source, year, questionType: mcq/msq/nat, marks: 1|2, answerType for NAT).
- **QuestionAttempt:** Every answer submitted (context: diagnostic/practice/mock/revision_retest, isCorrect, timeTakenSeconds, confidence: low/med/high, clientId).

### Domain 4: Activity, Plan & Ledgers (Planned vs Actual)
- **Planned Ledger:**
  - DailyTask.plannedMinutes
  - DailyTask.questionTarget
  - DailyTask.plannedTopic
- **Actual Ledger:**
  - DailyTask.completedMinutes
  - StudySession.actualMinutes
  - QuestionAttempt
  - RevisionRecord
  - MockResult
- **PreparationEvent:** The append-only immutable event log (Part D).
- **ScheduleChangeEvent:** The planning-layer causal explanation (Part E).
- **TopicMastery:** Aggregate accuracy, recency decay, and mastery score.
- **MissedDay:** Declared or auto-detected missed days with carried backlog.

### Domain 5: Mistakes, Notes, Decks & Revision
- **Mistake:** Auto-created on wrong answers with 9-tier classification and resolution tracking.
- **MistakePattern:** Tracks repeated mistakes (same question >=2 or pattern >=3).
- **ShortNote:** Structured end-of-topic revision notes.
- **Formula:** KaTeX LaTeX expressions, variables, conditions, and traps.
- **EdgeCase & TrapRule:** Common pitfalls with rapid swipe/grade revision support.
- **RevisionRecord:** Tracks memory stability buckets [1, 3, 7, 14, 30, 60] days.

### Domain 6: Mocks & Analytics
- **MockTest, MockQuestion, MockResult, MockAnalysis:** Full and sectional mock execution and analysis.
- **AnalyticsSnapshot & StreakState:** Daily aggregates and non-toxic streak preservation.

### Domain 7: Reference Library
- **ReferenceDocument, ReferenceChunk, ReferenceTopicLink, ProcessingJob, ImportBatch:** Ingestion and indexing pipeline outside Git.

### Domain 8: Notifications, Audit & Sync
- **Notification, AuditLog, SyncLog:** Outbox sync and row-level change auditing.
""",

    "docs/EVENT_MODEL.md": """# GATE CSE MASTERY — Preparation Event Model

## 1. Core Principle: Append-Only Immutability
The system maintains an append-only log of domain facts (PreparationEvent). Events represent things that happened in the real world. Once written, events are NEVER updated or deleted.

If an event was recorded in error, a correction event is emitted referencing the original event ID via payload.corrects = "<priorEventId>".

---

## 2. Event Entity Schema
```typescript
interface PreparationEvent {
  id: string;                      // UUID
  userId: string;
  occurredAt: Date;                // When the event was recorded
  effectiveDate: string;           // YYYY-MM-DD that the event applies to (backfill support)
  eventType: PreparationEventType;
  source: 'ui_action' | 'onboarding' | 'auto_detect' | 'import' | 'job' | 'api' | 'sync';
  actor: 'student' | 'system' | 'ai_assistant';
  payload: Record<string, any>;    // Structured payload
  relatedEntityType?: string;      // 'topic' | 'subject' | 'question' | 'plan' | etc.
  relatedEntityId?: string;
  createdAt: Date;
}
```

---

## 3. Event Type Catalog
1. study_session: Student completed or logged study time.
2. question_attempt: An answer was submitted.
3. diagnostic_completed: Morning diagnostic completed with score payload.
4. mock_completed: Mock exam completed.
5. missed_day_declared: Student explicitly declared a missed day.
6. missed_day_detected: Rollover detected an unfulfilled day.
7. availability_changed: Weekday capacity or date mode modified.
8. exam_date_changed: Target exam date modified.
9. phase_changed: Transition between preparation phases.
10. syllabus_imported: New syllabus version draft created.
11. syllabus_activated: Syllabus version promoted to active.
12. topic_added: New topic inserted into syllabus.
13. topic_modified: Hours, priority, or difficulty updated.
14. topic_archived: Topic removed from active syllabus.
15. topic_completed: Topic marked complete.
16. topic_reopened: Completed topic reopened for study.
17. priority_changed: Subject or topic priority altered.
18. schedule_override: Student manually pinned or moved tasks.
19. manual_plan_change: Direct plan mutation.
20. reference_imported: New document processed into library.
21. mistake_logged: Mistake recorded from incorrect answer.
22. mistake_resolved: Retests passed, mistake marked resolved.
23. backup_restored: System state restored from backup.

---

## 4. Three-Tier Logging Separation
- PreparationEvent: "What happened?" (Domain level)
- AuditLog: "What database row changed?" (Technical level)
- ScheduleChangeEvent: "Why did the plan change?" (Planning rationale)
""",

    "docs/SCHEDULER.md": """# GATE CSE MASTERY — Adaptive Scheduler Specification

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
""",

    "docs/sync.md": """# GATE CSE MASTERY — Offline Sync & Outbox Protocol

## 1. Architecture
- Authoritative Source of Truth: PostgreSQL / Server database.
- Client Cache: IndexedDB (active plans, Today mission, last 7 days of diagnostics, revision queues, notes).
- Client Outbox: IndexedDB append-only queue for offline user mutations.

---

## 2. Replay Protocol
1. While offline, mutations (attempts, session time, note edits, mistake classifications) are stored in the outbox with clientId UUID.
2. When network connectivity resumes, the Service Worker / sync client initiates batch replay to `/api/sync/replay`.
3. The server checks clientId against the SyncLog table to guarantee idempotency.
4. Accepted mutations update the database and emit PreparationEvents with original timestamps.
5. Client revalidates its cache from the server response.

---

## 3. Conflict Resolution Rules
- Attempts & Events: Append-only; no conflicts possible.
- Plans: Server deterministic scheduler wins.
- Notes: Last-write-wins based on client timestamp.
- System Config: Server authoritative.
"""
}

base_dir = r"c:\Users\karth\OneDrive\Desktop\gate note"
for rel_path, text in docs.items():
    p = os.path.join(base_dir, rel_path)
    os.makedirs(os.path.dirname(p), exist_ok=True)
    with open(p, "w", encoding="utf-8") as f:
        f.write(text.strip() + "\n")
    print(f"Generated {rel_path}")
