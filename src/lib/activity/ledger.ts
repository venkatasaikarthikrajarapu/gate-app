export interface PlannedTaskEntry {
  id: string;
  date: string;
  topicId?: string;
  topicName?: string;
  plannedMinutes: number;
}

export interface ActualActivityEntry {
  id: string;
  date: string;
  effectiveDate: string; // supports backfill
  topicId?: string;
  actualMinutes: number;
  source: 'timer' | 'manual' | 'auto';
}

export interface LedgerReconciliation {
  date: string;
  topicId?: string;
  plannedMinutes: number;
  actualMinutes: number;
  deltaMinutes: number; // actual - planned
  status: 'met' | 'surplus' | 'deficit';
}

/**
 * Reconciles planned vs actual without mutating planned historical values (Directive D13).
 */
export function reconcileDailyActivity(
  planned: PlannedTaskEntry[],
  actuals: ActualActivityEntry[]
): LedgerReconciliation[] {
  const actualByTopicDate: Record<string, number> = {};

  for (const act of actuals) {
    const key = `${act.effectiveDate}_${act.topicId || 'general'}`;
    actualByTopicDate[key] = (actualByTopicDate[key] || 0) + act.actualMinutes;
  }

  return planned.map(plan => {
    const key = `${plan.date}_${plan.topicId || 'general'}`;
    const actualMins = actualByTopicDate[key] || 0;
    const delta = actualMins - plan.plannedMinutes;

    let status: LedgerReconciliation['status'] = 'met';
    if (delta > 0) status = 'surplus';
    else if (delta < 0) status = 'deficit';

    return {
      date: plan.date,
      topicId: plan.topicId,
      plannedMinutes: plan.plannedMinutes, // Guaranteed immutable
      actualMinutes: actualMins,
      deltaMinutes: delta,
      status
    };
  });
}
