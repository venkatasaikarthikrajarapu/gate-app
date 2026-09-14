import { describe, it, expect } from 'vitest';
import {
  computeWeeklyRollup,
  computeMonthlyRollup,
  detectWeakTopics,
  analyzeTimeManagement,
  DailyMetricEntry
} from '../../src/lib/analytics/metrics';

describe('Stage 13: Analytics — Metrics, Effectiveness & Weak-Topic Radar', () => {
  const mockDailyData: DailyMetricEntry[] = [
    { date: '2026-10-06', actualMinutes: 120, questionsAttempted: 20, questionsCorrect: 14, masteryPointsGained: 8 },
    { date: '2026-10-07', actualMinutes: 90, questionsAttempted: 15, questionsCorrect: 12, masteryPointsGained: 6 },
    { date: '2026-10-08', actualMinutes: 0, questionsAttempted: 0, questionsCorrect: 0, masteryPointsGained: 0 },
    { date: '2026-10-09', actualMinutes: 150, questionsAttempted: 25, questionsCorrect: 20, masteryPointsGained: 12 },
    { date: '2026-10-10', actualMinutes: 60, questionsAttempted: 10, questionsCorrect: 8, masteryPointsGained: 4 },
    { date: '2026-10-13', actualMinutes: 200, questionsAttempted: 30, questionsCorrect: 22, masteryPointsGained: 15 }
  ];

  it('computes weekly rollup correctly (Mon 2026-10-06 to Sun 2026-10-12)', () => {
    const rollup = computeWeeklyRollup(mockDailyData, '2026-10-06');
    expect(rollup.weekStartDate).toBe('2026-10-06');
    expect(rollup.totalMinutes).toBe(120 + 90 + 0 + 150 + 60);
    expect(rollup.totalQuestionsAttempted).toBe(20 + 15 + 0 + 25 + 10);
    expect(rollup.totalCorrect).toBe(14 + 12 + 0 + 20 + 8);
    expect(rollup.studyDaysCount).toBe(4); // 3 days with 0 minutes excluded
    // Accuracy = (54/70)*100 = 77.1
    expect(rollup.overallAccuracy).toBe(77.1);
    // Effectiveness: masteryGained / studyHours * 10 = 30 / (420/60) * 10 = 300/7 ≈ 42.86
    expect(rollup.effectivenessScore).toBeGreaterThan(40);
  });

  it('computes monthly rollup with mock test average', () => {
    const rollup = computeMonthlyRollup(mockDailyData, '2026-10', [72.5, 68.0, 75.0]);
    expect(rollup.month).toBe('2026-10');
    expect(rollup.mockTestsCompleted).toBe(3);
    expect(rollup.avgMockScore).toBeCloseTo(71.8, 0);
    expect(rollup.totalQuestionsAttempted).toBe(100);
    expect(rollup.totalCorrect).toBe(76);
    expect(rollup.overallAccuracy).toBe(76);
  });

  it('weak topic radar flags critical (<40% acc or <30 mastery), watchlist (<60%), stable', () => {
    const topics = [
      { topicId: 't-os-vm', topicName: 'Virtual Memory', subjectId: 's-os', attempted: 10, correct: 3, masteryLevel: 25 },
      { topicId: 't-db-norm', topicName: 'Normalization', subjectId: 's-db', attempted: 8, correct: 4, masteryLevel: 45 },
      { topicId: 't-algo-dp', topicName: 'Dynamic Programming', subjectId: 's-algo', attempted: 12, correct: 10, masteryLevel: 75 },
      { topicId: 't-cn-sub', topicName: 'Subnetting', subjectId: 's-cn', attempted: 2, correct: 1, masteryLevel: 30 } // filtered out (< 3 attempts)
    ];
    const radar = detectWeakTopics(topics);
    expect(radar).toHaveLength(3);
    expect(radar[0].topicId).toBe('t-os-vm'); // Weakest first
    expect(radar[0].priorityFlag).toBe('critical');
    expect(radar[1].priorityFlag).toBe('watchlist');
    expect(radar[2].priorityFlag).toBe('stable');
  });

  it('time management analysis detects excessive time on wrong answers', () => {
    const attempts = [
      { isCorrect: true, timeTakenSeconds: 60, marks: 1 },
      { isCorrect: true, timeTakenSeconds: 50, marks: 1 },
      { isCorrect: false, timeTakenSeconds: 180, marks: 1 }, // 3x slow on wrong
      { isCorrect: false, timeTakenSeconds: 200, marks: 2 },
    ];
    const analysis = analyzeTimeManagement(attempts);
    expect(analysis.avgSecondsPerCorrect).toBe(55);
    expect(analysis.avgSecondsPerWrong).toBe(190);
    expect(analysis.recommendation).toContain('more time on wrong answers');
    expect(analysis.potentialTimeSavedSeconds).toBeGreaterThan(0);
  });
});
