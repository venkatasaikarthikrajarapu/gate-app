export interface DailyMetricEntry {
  date: string;
  subjectId?: string;
  topicId?: string;
  actualMinutes: number;
  questionsAttempted: number;
  questionsCorrect: number;
  masteryPointsGained: number;
}

export interface WeeklyRollup {
  weekStartDate: string;
  totalMinutes: number;
  totalQuestionsAttempted: number;
  totalCorrect: number;
  overallAccuracy: number;
  masteryPointsGained: number;
  effectivenessScore: number;
  studyDaysCount: number;
}

export interface MonthlyRollup {
  month: string;
  totalMinutes: number;
  totalQuestionsAttempted: number;
  totalCorrect: number;
  overallAccuracy: number;
  masteryPointsGained: number;
  effectivenessScore: number;
  mockTestsCompleted: number;
  avgMockScore: number;
}

export interface WeakTopicRadarPoint {
  topicId: string;
  topicName: string;
  subjectId: string;
  accuracy: number;
  attemptCount: number;
  masteryLevel: number;
  priorityFlag: 'critical' | 'watchlist' | 'stable';
}

export interface TimeManagementAnalysis {
  avgSecondsPerQuestion: number;
  avgSecondsPerCorrect: number;
  avgSecondsPerWrong: number;
  potentialTimeSavedSeconds: number;
  recommendation: string;
}

function addDaysStr(dateStr: string, days: number): string {
  const d = new Date(dateStr + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().split('T')[0];
}

export function computeWeeklyRollup(
  dailyEntries: DailyMetricEntry[],
  weekStart: string
): WeeklyRollup {
  const weekEnd = addDaysStr(weekStart, 6);
  const inWeek = dailyEntries.filter(e => e.date >= weekStart && e.date <= weekEnd);

  const totalMinutes = inWeek.reduce((s, e) => s + e.actualMinutes, 0);
  const totalAttempted = inWeek.reduce((s, e) => s + e.questionsAttempted, 0);
  const totalCorrect = inWeek.reduce((s, e) => s + e.questionsCorrect, 0);
  const masteryGained = inWeek.reduce((s, e) => s + e.masteryPointsGained, 0);
  const studyDays = new Set(inWeek.filter(e => e.actualMinutes > 0).map(e => e.date)).size;

  const accuracy = totalAttempted > 0
    ? Number(((totalCorrect / totalAttempted) * 100).toFixed(1))
    : 0;

  const studyHours = totalMinutes / 60;
  const effectiveness = studyHours >= 0.1
    ? Number(((masteryGained / studyHours) * 10).toFixed(2))
    : 0;

  return {
    weekStartDate: weekStart,
    totalMinutes,
    totalQuestionsAttempted: totalAttempted,
    totalCorrect,
    overallAccuracy: accuracy,
    masteryPointsGained: Number(masteryGained.toFixed(2)),
    effectivenessScore: effectiveness,
    studyDaysCount: studyDays
  };
}

export function computeMonthlyRollup(
  dailyEntries: DailyMetricEntry[],
  month: string,
  mockTestScores: number[] = []
): MonthlyRollup {
  const inMonth = dailyEntries.filter(e => e.date.startsWith(month));

  const totalMinutes = inMonth.reduce((s, e) => s + e.actualMinutes, 0);
  const totalAttempted = inMonth.reduce((s, e) => s + e.questionsAttempted, 0);
  const totalCorrect = inMonth.reduce((s, e) => s + e.questionsCorrect, 0);
  const masteryGained = inMonth.reduce((s, e) => s + e.masteryPointsGained, 0);

  const accuracy = totalAttempted > 0
    ? Number(((totalCorrect / totalAttempted) * 100).toFixed(1))
    : 0;

  const studyHours = totalMinutes / 60;
  const effectiveness = studyHours >= 0.1
    ? Number(((masteryGained / studyHours) * 10).toFixed(2))
    : 0;

  const avgMock = mockTestScores.length > 0
    ? Number((mockTestScores.reduce((s, x) => s + x, 0) / mockTestScores.length).toFixed(1))
    : 0;

  return {
    month,
    totalMinutes,
    totalQuestionsAttempted: totalAttempted,
    totalCorrect,
    overallAccuracy: accuracy,
    masteryPointsGained: Number(masteryGained.toFixed(2)),
    effectivenessScore: effectiveness,
    mockTestsCompleted: mockTestScores.length,
    avgMockScore: avgMock
  };
}

export function detectWeakTopics(
  topicStats: Array<{
    topicId: string;
    topicName: string;
    subjectId: string;
    attempted: number;
    correct: number;
    masteryLevel: number;
  }>
): WeakTopicRadarPoint[] {
  return topicStats
    .filter(t => t.attempted >= 3)
    .map(t => {
      const accuracy = Number(((t.correct / t.attempted) * 100).toFixed(1));
      let priorityFlag: WeakTopicRadarPoint['priorityFlag'] = 'stable';
      if (accuracy < 40 || t.masteryLevel < 30) priorityFlag = 'critical';
      else if (accuracy < 60 || t.masteryLevel < 50) priorityFlag = 'watchlist';
      return {
        topicId: t.topicId,
        topicName: t.topicName,
        subjectId: t.subjectId,
        accuracy,
        attemptCount: t.attempted,
        masteryLevel: t.masteryLevel,
        priorityFlag
      };
    })
    .sort((a, b) => a.accuracy - b.accuracy);
}

export function analyzeTimeManagement(
  attempts: Array<{
    isCorrect: boolean;
    timeTakenSeconds: number;
    marks: number;
  }>
): TimeManagementAnalysis {
  const timed = attempts.filter(a => a.timeTakenSeconds > 0);
  if (timed.length === 0) {
    return {
      avgSecondsPerQuestion: 0,
      avgSecondsPerCorrect: 0,
      avgSecondsPerWrong: 0,
      potentialTimeSavedSeconds: 0,
      recommendation: 'No timing data available to analyze.'
    };
  }

  const total = timed.reduce((s, a) => s + a.timeTakenSeconds, 0);
  const correct = timed.filter(a => a.isCorrect);
  const wrong = timed.filter(a => !a.isCorrect);

  const avgAll = Number((total / timed.length).toFixed(1));
  const avgCorrect = correct.length > 0
    ? Number((correct.reduce((s, a) => s + a.timeTakenSeconds, 0) / correct.length).toFixed(1))
    : 0;
  const avgWrong = wrong.length > 0
    ? Number((wrong.reduce((s, a) => s + a.timeTakenSeconds, 0) / wrong.length).toFixed(1))
    : 0;

  const potentialSaved = wrong.length > 0
    ? Number((wrong.reduce((s, a) => s + a.timeTakenSeconds, 0) - wrong.length * avgCorrect).toFixed(0))
    : 0;

  let recommendation = 'Timing is balanced. Keep up your pace.';
  if (avgWrong > avgCorrect * 1.5) {
    recommendation = 'You spend significantly more time on wrong answers. Practice quick elimination to cut losses faster.';
  } else if (avgAll > 150) {
    recommendation = 'Average time per question exceeds 2.5 minutes. Work on speed drills for high-frequency question types.';
  }

  return {
    avgSecondsPerQuestion: avgAll,
    avgSecondsPerCorrect: avgCorrect,
    avgSecondsPerWrong: avgWrong,
    potentialTimeSavedSeconds: max0(potentialSaved),
    recommendation
  };
}

function max0(n: number): number {
  return Math.max(0, n);
}
