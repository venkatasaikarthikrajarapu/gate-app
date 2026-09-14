# GATE CSE MASTERY — Preparation Event Model

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
