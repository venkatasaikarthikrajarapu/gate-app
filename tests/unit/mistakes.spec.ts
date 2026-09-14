import { describe, it, expect } from 'vitest';
import {
  recordNewMistake,
  evaluateMistakeAttempt,
  detectTopicMistakePatterns,
  MistakeEntry
} from '../../src/lib/mistakes/engine';

describe('Stage 9: Mistakes, Repeat Patterns & Confidence Engine', () => {
  it('identifies dangerous mistakes when confidence is high or category is overconfidence_trap', () => {
    const dangerous1 = recordNewMistake({
      userId: 'usr-1',
      questionId: 'q-101',
      topicId: 'top-os-vm',
      subjectId: 'sub-os',
      date: '2026-10-01',
      classification: 'conceptual_gap',
      confidence: 'high'
    });
    expect(dangerous1.isDangerous).toBe(true);

    const dangerous2 = recordNewMistake({
      userId: 'usr-1',
      questionId: 'q-102',
      topicId: 'top-os-vm',
      subjectId: 'sub-os',
      date: '2026-10-01',
      classification: 'overconfidence_trap',
      confidence: 'low'
    });
    expect(dangerous2.isDangerous).toBe(true);

    const nonDangerous = recordNewMistake({
      userId: 'usr-1',
      questionId: 'q-103',
      topicId: 'top-os-vm',
      subjectId: 'sub-os',
      date: '2026-10-01',
      classification: 'calculation_error',
      confidence: 'medium'
    });
    expect(nonDangerous.isDangerous).toBe(false);
  });

  it('triggers 1.5x priority multiplier, RED bucket floor, and quarantine on repeat mistakes', () => {
    // First time error
    const firstTime = recordNewMistake({
      userId: 'usr-1',
      questionId: 'q-201',
      topicId: 'top-algo-graph',
      subjectId: 'sub-algo',
      date: '2026-10-01',
      classification: 'edge_case_missed',
      confidence: 'low',
      previousQuestionMistakeCount: 0
    });
    expect(firstTime.isRepeated).toBe(false);
    expect(firstTime.repeatCount).toBe(1);
    expect(firstTime.priorityWeight).toBe(1.0);
    expect(firstTime.quarantined).toBe(false);
    expect(firstTime.consecutiveCorrectNeeded).toBe(1);

    // Repeat error (same question missed previously)
    const repeatError = recordNewMistake({
      userId: 'usr-1',
      questionId: 'q-201',
      topicId: 'top-algo-graph',
      subjectId: 'sub-algo',
      date: '2026-10-03',
      classification: 'edge_case_missed',
      confidence: 'low',
      previousQuestionMistakeCount: 1 // now 2nd miss
    });
    expect(repeatError.isRepeated).toBe(true);
    expect(repeatError.repeatCount).toBe(2);
    expect(repeatError.priorityWeight).toBe(1.5);
    expect(repeatError.quarantined).toBe(true);
    expect(repeatError.consecutiveCorrectNeeded).toBe(2);
    expect(repeatError.revisionBucket).toBe('RED');
  });

  it('enforces quarantine: requires 2 consecutive correct attempts to graduate', () => {
    let mistake = recordNewMistake({
      userId: 'usr-1',
      questionId: 'q-301',
      topicId: 'top-db-norm',
      subjectId: 'sub-db',
      date: '2026-10-01',
      classification: 'formula_forgotten',
      confidence: 'medium',
      previousQuestionMistakeCount: 1
    });

    expect(mistake.quarantined).toBe(true);
    expect(mistake.resolved).toBe(false);

    // First correct attempt
    mistake = evaluateMistakeAttempt(mistake, true, '2026-10-02');
    expect(mistake.consecutiveCorrectCount).toBe(1);
    expect(mistake.quarantined).toBe(true);
    expect(mistake.resolved).toBe(false);

    // Relapse on attempt 2
    mistake = evaluateMistakeAttempt(mistake, false, '2026-10-03');
    expect(mistake.consecutiveCorrectCount).toBe(0);
    expect(mistake.repeatCount).toBe(3);
    expect(mistake.priorityWeight).toBe(2.25); // 1.5 * 1.5
    expect(mistake.quarantined).toBe(true);
    expect(mistake.resolved).toBe(false);

    // Now 2 consecutive correct attempts
    mistake = evaluateMistakeAttempt(mistake, true, '2026-10-04');
    expect(mistake.consecutiveCorrectCount).toBe(1);
    expect(mistake.resolved).toBe(false);

    mistake = evaluateMistakeAttempt(mistake, true, '2026-10-05', 'Mastered functional dependencies');
    expect(mistake.consecutiveCorrectCount).toBe(2);
    expect(mistake.quarantined).toBe(false);
    expect(mistake.resolved).toBe(true);
    expect(mistake.revisionBucket).toBe('YELLOW');
    expect(mistake.resolvedAt).toBe('2026-10-05');
  });

  it('detects systemic topic mistake patterns (>=3 occurrences) and prescribes remedies', () => {
    const mistakes: MistakeEntry[] = [
      recordNewMistake({ userId: 'u1', questionId: 'q1', topicId: 'top-cn-sub', subjectId: 'sub-cn', date: '2026-10-01', classification: 'calculation_error', confidence: 'low' }),
      recordNewMistake({ userId: 'u1', questionId: 'q2', topicId: 'top-cn-sub', subjectId: 'sub-cn', date: '2026-10-02', classification: 'calculation_error', confidence: 'low' }),
      recordNewMistake({ userId: 'u1', questionId: 'q3', topicId: 'top-cn-sub', subjectId: 'sub-cn', date: '2026-10-03', classification: 'calculation_error', confidence: 'low' }),
      recordNewMistake({ userId: 'u1', questionId: 'q4', topicId: 'top-cn-sub', subjectId: 'sub-cn', date: '2026-10-03', classification: 'conceptual_gap', confidence: 'low' })
    ];

    const patterns = detectTopicMistakePatterns('top-cn-sub', 'sub-cn', mistakes);
    expect(patterns).toHaveLength(1);
    expect(patterns[0].classification).toBe('calculation_error');
    expect(patterns[0].occurrences).toBe(3);
    expect(patterns[0].remedialAction).toContain('Slow down computation');
  });
});
