import { SyllabusDiffResult } from './diff';
import { DeadlineRisk, RiskLevel } from '../scheduler/types';
import { computeDeadlineRisk } from '../scheduler/engine';

export interface SyllabusImpactReport {
  netHoursDelta: number;
  addedTopicsCount: number;
  removedTopicsCount: number;
  modifiedTopicsCount: number;
  oldRisk: DeadlineRisk;
  newRisk: DeadlineRisk;
  requiresImpossibilityTriage: boolean;
  explanation: string;
}

export function generateSyllabusImpactReport(
  diff: SyllabusDiffResult,
  currentRemainingMinutes: number,
  daysToDeadline: number,
  normalDailyHours: number,
  bufferPercent: number,
  todayStr: string
): SyllabusImpactReport {
  const normalDailyMinutes = normalDailyHours * 60;

  const oldRisk = computeDeadlineRisk(
    currentRemainingMinutes,
    daysToDeadline,
    normalDailyMinutes,
    bufferPercent,
    todayStr
  );

  const newRemainingMinutes = Math.max(0, currentRemainingMinutes + (diff.netHoursDelta * 60));

  const newRisk = computeDeadlineRisk(
    newRemainingMinutes,
    daysToDeadline,
    normalDailyMinutes,
    bufferPercent,
    todayStr
  );

  const deltaHours = diff.netHoursDelta;
  const sign = deltaHours >= 0 ? '+' : '';
  const explanation = `This syllabus change adds ${sign}${deltaHours}h net; required daily study changes from ${oldRisk.requiredDailyHours}h to ${newRisk.requiredDailyHours}h; risk level: ${newRisk.level}.`;

  const requiresTriage = newRisk.level === 'HIGH' || newRisk.level === 'CRITICAL';

  return {
    netHoursDelta: deltaHours,
    addedTopicsCount: diff.added.length,
    removedTopicsCount: diff.removed.length,
    modifiedTopicsCount: diff.modified.length,
    oldRisk,
    newRisk,
    requiresImpossibilityTriage: requiresTriage,
    explanation
  };
}
