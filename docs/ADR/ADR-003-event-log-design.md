# ADR-003: Pragmatic Append-Only Preparation Event Log

## Context
Requirement R15 and Part D mandate tracking all meaningful preparation events to survive change, provide explainable scheduling, and preserve historical truth (Directive D12). A full event-sourcing rebuild engine is over-engineering for a single student, whereas mutable state alone loses auditability.

## Decision
Implement a pragmatic append-only PreparationEvent log coupled with authoritative relational projections:
1. **PreparationEvent Table:** Stores immutable facts (study_session, missed_day_declared, availability_changed, exam_date_changed, syllabus_activated, topic_added, etc.).
2. **Immutability:** Events are never updated or deleted. Corrections emit new events referencing the prior event (corrects: priorEventId).
3. **Three-Tier Logging (Part E):**
   - Tier 1: PreparationEvent (What happened? - domain facts)
   - Tier 2: AuditLog (What entity changed? - before/after snapshots)
   - Tier 3: ScheduleChangeEvent (Why did the plan change? - planning rationale)

## Consequences
- Every schedule change is attributable to a specific event.
- Complete reconstruction of student preparation history is possible.
- High query performance for day-to-day screens via indexed relational projections.
