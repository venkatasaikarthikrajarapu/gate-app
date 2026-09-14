import { describe, it, expect } from 'vitest';
import { reconcileDailyActivity, PlannedTaskEntry, ActualActivityEntry } from '../../src/lib/activity/ledger';
import { createStudySessionEntry } from '../../src/lib/activity/session';
import { computeNonToxicStreak, DayActivitySummary } from '../../src/lib/activity/streak';

describe('Stage 8: Planned vs Actual Activity & Non-Toxic Streak', () => {
  it('Directive D13: Reconciles planned vs actual without mutating planned minutes', () => {
    const planned: PlannedTaskEntry[] = [
      { id: 'p1', date: '2026-10-01', topicId: 'top-1', plannedMinutes: 90 },
      { id: 'p2', date: '2026-10-01', topicId: 'top-2', plannedMinutes: 60 },
      { id: 'p3', date: '2026-10-02', topicId: 'top-1', plannedMinutes: 120 }
    ];

    const actuals: ActualActivityEntry[] = [
      { id: 'a1', date: '2026-10-01', effectiveDate: '2026-10-01', topicId: 'top-1', actualMinutes: 100, source: 'timer' },
      { id: 'a2', date: '2026-10-01', effectiveDate: '2026-10-01', topicId: 'top-2', actualMinutes: 40, source: 'manual' },
      { id: 'a3', date: '2026-10-02', effectiveDate: '2026-10-02', topicId: 'top-1', actualMinutes: 120, source: 'timer' }
    ];

    const reconciliation = reconcileDailyActivity(planned, actuals);

    // Verify immutability of planned array
    expect(planned[0].plannedMinutes).toBe(90);
    expect(planned[1].plannedMinutes).toBe(60);
    expect(planned[2].plannedMinutes).toBe(120);

    // Verify calculations
    expect(reconciliation).toHaveLength(3);
    expect(reconciliation[0]).toEqual({
      date: '2026-10-01',
      topicId: 'top-1',
      plannedMinutes: 90,
      actualMinutes: 100,
      deltaMinutes: 10,
      status: 'surplus'
    });
    expect(reconciliation[1]).toEqual({
      date: '2026-10-01',
      topicId: 'top-2',
      plannedMinutes: 60,
      actualMinutes: 40,
      deltaMinutes: -20,
      status: 'deficit'
    });
    expect(reconciliation[2]).toEqual({
      date: '2026-10-02',
      topicId: 'top-1',
      plannedMinutes: 120,
      actualMinutes: 120,
      deltaMinutes: 0,
      status: 'met'
    });
  });

  it('Session Logging: Emits study_session event with backfilled effectiveDate', () => {
    const result = createStudySessionEntry({
      userId: 'usr-1',
      topicId: 'top-os-1',
      subjectId: 'sub-os',
      actualMinutes: 75,
      effectiveDate: '2026-09-28', // Backfill to 2 days ago
      source: 'manual',
      taskDescription: 'Backfilled offline study session'
    });

    expect(result.sessionRecord.date).toBe('2026-09-28');
    expect(result.sessionRecord.actualMinutes).toBe(75);
    expect(result.preparationEvent.eventType).toBe('study_session');
    expect(result.preparationEvent.effectiveDate).toBe('2026-09-28');
    expect(result.preparationEvent.actor).toBe('student');
    expect(result.preparationEvent.payload.actualMinutes).toBe(75);
  });

  it('Non-toxic streak engine: emergency floor (>=30m) preserves streak and recovery notice on reset', () => {
    const history: DayActivitySummary[] = [
      { date: '2026-10-01', actualMinutes: 60, dayMode: 'normal', tasksCompletedCount: 2 },
      { date: '2026-10-02', actualMinutes: 35, dayMode: 'emergency', tasksCompletedCount: 0 }, // >=30m emergency floor
      { date: '2026-10-03', actualMinutes: 90, dayMode: 'full', tasksCompletedCount: 3 }
    ];

    const streakRes = computeNonToxicStreak(history, '2026-10-04');
    expect(streakRes.currentStreak).toBe(3);
    expect(streakRes.longestStreak).toBe(3);
    expect(streakRes.totalDaysStudied).toBe(3);
    expect(streakRes.missedDaysCount).toBe(0);

    // Test missed day recovery
    const historyWithGap: DayActivitySummary[] = [
      { date: '2026-10-01', actualMinutes: 60, dayMode: 'normal', tasksCompletedCount: 2 },
      { date: '2026-10-02', actualMinutes: 0, dayMode: 'normal', tasksCompletedCount: 0 } // Missed
    ];

    const gapRes = computeNonToxicStreak(historyWithGap, '2026-10-03');
    expect(gapRes.currentStreak).toBe(0);
    expect(gapRes.longestStreak).toBe(1);
    expect(gapRes.missedDaysCount).toBe(1);
    expect(gapRes.recoveryNotice).toContain('One-tap schedule redistribution available');
  });
});
