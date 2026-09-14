export const STABILITY_INTERVALS = [1, 3, 7, 14, 30, 60] as const;

export type RevisionBucket = 'RED' | 'YELLOW' | 'GREEN';
export type RevisionOutcome = 'recalled' | 'partial' | 'forgot';
export type RevisionKind = 'topic' | 'shortnote' | 'formula' | 'edgecase' | 'traprule' | 'mistake_retest';

export interface SpacedRevisionItem {
  id: string;
  topicId: string;
  topicName?: string;
  subjectId: string;
  kind: RevisionKind;
  refId?: string;
  currentStability: number;
  scheduledAt: string; // YYYY-MM-DD
  nextDueAt: string;   // YYYY-MM-DD
  bucket: RevisionBucket;
  weight?: number; // 0 to 1 exam weight
  isMistakeRetest?: boolean;
}

export function bucketFromStability(stabilityDays: number): RevisionBucket {
  if (stabilityDays <= 1) return 'RED';
  if (stabilityDays <= 7) return 'YELLOW';
  return 'GREEN';
}

function addDaysToDate(dateStr: string, days: number): string {
  const d = new Date(dateStr + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().split('T')[0];
}

function daysDiff(fromStr: string, toStr: string): number {
  const fromMs = new Date(fromStr + 'T00:00:00Z').getTime();
  const toMs = new Date(toStr + 'T00:00:00Z').getTime();
  return Math.round((toMs - fromMs) / (1000 * 60 * 60 * 24));
}

export interface NextRevisionResult {
  newStabilityDays: number;
  nextDueAt: string;
  bucket: RevisionBucket;
  outcome: RevisionOutcome;
}

/**
 * Calculates next spaced repetition interval based on outcome and 6-stage bucket schedule.
 */
export function calculateNextRevision(
  currentStability: number,
  outcome: RevisionOutcome,
  currentDateStr: string
): NextRevisionResult {
  // Find current index in STABILITY_INTERVALS or closest match
  let currentIndex = 0;
  for (let i = 0; i < STABILITY_INTERVALS.length; i++) {
    if (STABILITY_INTERVALS[i] <= currentStability) {
      currentIndex = i;
    }
  }

  let newStability: number;

  switch (outcome) {
    case 'forgot':
      // Reset back to base interval (1 day) -> immediate RED bucket
      newStability = STABILITY_INTERVALS[0];
      break;
    case 'partial':
      // Retain current interval without penalty or advancement
      newStability = STABILITY_INTERVALS[currentIndex];
      break;
    case 'recalled':
      // Advance to next interval step (capped at 60 days)
      const nextIndex = Math.min(currentIndex + 1, STABILITY_INTERVALS.length - 1);
      newStability = STABILITY_INTERVALS[nextIndex];
      break;
  }

  const nextDueAt = addDaysToDate(currentDateStr, newStability);
  const bucket = bucketFromStability(newStability);

  return {
    newStabilityDays: newStability,
    nextDueAt,
    bucket,
    outcome
  };
}

/**
 * Computes revision urgency score considering days overdue, topic weight, and bucket status.
 */
export function calculateRevisionUrgency(
  item: SpacedRevisionItem,
  todayStr: string
): { urgencyScore: number; daysOverdue: number; isOverdue: boolean } {
  const diff = daysDiff(item.nextDueAt, todayStr);
  const daysOverdue = Math.max(0, diff);
  const isOverdue = diff > 0;

  const bucketBonus = item.bucket === 'RED' ? 5.0 : item.bucket === 'YELLOW' ? 2.0 : 0.5;
  const mistakeBonus = item.isMistakeRetest ? 4.0 : 0.0;
  const weightVal = item.weight || 0.5;

  // Urgency formula
  const urgencyScore = Number(
    (daysOverdue * 2.0 + weightVal * 3.0 + bucketBonus + mistakeBonus).toFixed(2)
  );

  return { urgencyScore, daysOverdue, isOverdue };
}

export interface Phase3RapidRevisionQueue {
  formulasAndTraps: SpacedRevisionItem[];
  edgeCases: SpacedRevisionItem[];
  mistakeRetests: SpacedRevisionItem[];
  coreConcepts: SpacedRevisionItem[];
}

/**
 * Orders items for Phase 3 deck-first rapid revision workflow.
 */
export function buildPhase3RevisionQueue(items: SpacedRevisionItem[]): Phase3RapidRevisionQueue {
  const formulasAndTraps = items.filter(
    i => i.kind === 'formula' || i.kind === 'traprule'
  );
  const edgeCases = items.filter(i => i.kind === 'edgecase');
  const mistakeRetests = items.filter(
    i => i.kind === 'mistake_retest' || i.isMistakeRetest
  );
  const coreConcepts = items.filter(
    i => i.kind === 'topic' || i.kind === 'shortnote'
  );

  return {
    formulasAndTraps,
    edgeCases,
    mistakeRetests,
    coreConcepts
  };
}
