# GATE CSE MASTERY — Data Model & Schema Specification

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
