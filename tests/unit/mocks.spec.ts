import { describe, it, expect } from 'vitest';
import {
  scoreMockTest,
  validateBlueprint,
  GATE_CSE_FULL_BLUEPRINT,
  MockAttemptEntry,
  MockBlueprint
} from '../../src/lib/mocks/runner';

describe('Stage 12: Mock Test Runner & Scoring Engine', () => {
  it('validates the official GATE CSE 2027 full blueprint (65Q / 100M / 180m)', () => {
    const result = validateBlueprint(GATE_CSE_FULL_BLUEPRINT);
    expect(result.valid).toBe(true);
    expect(GATE_CSE_FULL_BLUEPRINT.totalQuestions).toBe(65);
    expect(GATE_CSE_FULL_BLUEPRINT.totalMarks).toBe(100);
    expect(GATE_CSE_FULL_BLUEPRINT.timeLimitMinutes).toBe(180);
    const sectionQTotal = GATE_CSE_FULL_BLUEPRINT.sections.reduce((s, sec) => s + sec.questionCount, 0);
    expect(sectionQTotal).toBe(65);
    const sectionMTotal = GATE_CSE_FULL_BLUEPRINT.sections.reduce((s, sec) => s + sec.marksAllocation, 0);
    expect(sectionMTotal).toBe(100);
  });

  it('rejects mismatched blueprints (section totals != declared totals)', () => {
    const badBlueprint: MockBlueprint = {
      name: 'Bad Blueprint',
      type: 'full',
      totalQuestions: 65,
      totalMarks: 100,
      timeLimitMinutes: 180,
      sections: [
        { name: 'GA', questionCount: 5, marksAllocation: 15 },
        { name: 'EngMath', questionCount: 13, marksAllocation: 13 },
        { name: 'Core CS', questionCount: 42, marksAllocation: 72 }
      ]
    };
    const result = validateBlueprint(badBlueprint);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('question mismatch');
  });

  it('scores MCQ correct (1M), wrong (-1/3M negative), and unattempted (0M) correctly', () => {
    const attempts: MockAttemptEntry[] = [
      { orderIndex: 0, questionId: 'q1', section: 'Core CS', marks: 1, questionType: 'mcq', userAnswer: 'B', isCorrect: true, marksAwarded: 1, negativePenalty: 0, timeTakenSeconds: 45 },
      { orderIndex: 1, questionId: 'q2', section: 'Core CS', marks: 1, questionType: 'mcq', userAnswer: 'A', isCorrect: false, marksAwarded: 0, negativePenalty: 0.33, timeTakenSeconds: 30 },
      { orderIndex: 2, questionId: 'q3', section: 'Core CS', marks: 1, questionType: 'mcq', userAnswer: null, isCorrect: false, marksAwarded: 0, negativePenalty: 0, timeTakenSeconds: 0 },
      { orderIndex: 3, questionId: 'q4', section: 'Core CS', marks: 2, questionType: 'nat', userAnswer: '42', isCorrect: true, marksAwarded: 2, negativePenalty: 0, timeTakenSeconds: 60 },
      { orderIndex: 4, questionId: 'q5', section: 'Engineering Mathematics', marks: 1, questionType: 'msq', userAnswer: ['A','B'], isCorrect: false, marksAwarded: 0, negativePenalty: 0.67, confidence: 'high', timeTakenSeconds: 50 }
    ];

    const bp: MockBlueprint = {
      name: 'Mini Mock',
      type: 'custom',
      totalQuestions: 5,
      totalMarks: 6,
      timeLimitMinutes: 30,
      sections: [
        { name: 'Core CS', questionCount: 4, marksAllocation: 5 },
        { name: 'Engineering Mathematics', questionCount: 1, marksAllocation: 1 }
      ]
    };

    const result = scoreMockTest(attempts, bp);

    expect(result.attempted).toBe(4);
    expect(result.unattempted).toBe(1);
    expect(result.correct).toBe(2);
    expect(result.wrong).toBe(2);
    expect(result.actualScore).toBeCloseTo(1 + 2 - 0.33 - 0.67, 1); // 2.0
    expect(result.maxScore).toBe(6);
    expect(result.dangerousWrongCount).toBe(1); // high confidence MSQ wrong
    expect(result.negativeMarksLost).toBeCloseTo(1.0, 1);
  });

  it('computes potential score (what score would be if wrong answers were correct)', () => {
    const attempts: MockAttemptEntry[] = [
      { orderIndex: 0, questionId: 'q1', section: 'General Aptitude', marks: 1, questionType: 'mcq', userAnswer: 'A', isCorrect: true, marksAwarded: 1, negativePenalty: 0 },
      { orderIndex: 1, questionId: 'q2', section: 'General Aptitude', marks: 2, questionType: 'nat', userAnswer: '100', isCorrect: false, marksAwarded: 0, negativePenalty: 0 }, // NAT no negative
      { orderIndex: 2, questionId: 'q3', section: 'General Aptitude', marks: 1, questionType: 'mcq', userAnswer: null, isCorrect: false, marksAwarded: 0, negativePenalty: 0 } // unattempted
    ];

    const bp: MockBlueprint = {
      name: 'Potential Score Test',
      type: 'custom',
      totalQuestions: 3,
      totalMarks: 4,
      timeLimitMinutes: 10,
      sections: [{ name: 'General Aptitude', questionCount: 3, marksAllocation: 4 }]
    };

    const result = scoreMockTest(attempts, bp);
    // Actual: 1 correct MCQ = 1 mark
    // Potential: 1 (correct) + 2 (wrong NAT could have been right) + 1 (unattempted could have been right) = 4
    expect(result.actualScore).toBe(1);
    expect(result.potentialScore).toBe(4);
  });

  it('computes per-section breakdown with accuracy', () => {
    const attempts: MockAttemptEntry[] = [
      { orderIndex: 0, questionId: 'q1', section: 'Core CS', marks: 1, questionType: 'mcq', userAnswer: 'A', isCorrect: true, marksAwarded: 1, negativePenalty: 0 },
      { orderIndex: 1, questionId: 'q2', section: 'Core CS', marks: 1, questionType: 'mcq', userAnswer: 'B', isCorrect: false, marksAwarded: 0, negativePenalty: 0.33 },
      { orderIndex: 2, questionId: 'q3', section: 'Engineering Mathematics', marks: 1, questionType: 'mcq', userAnswer: 'C', isCorrect: true, marksAwarded: 1, negativePenalty: 0 }
    ];

    const bp: MockBlueprint = {
      name: 'Section Test',
      type: 'custom',
      totalQuestions: 3,
      totalMarks: 3,
      timeLimitMinutes: 15,
      sections: [
        { name: 'Core CS', questionCount: 2, marksAllocation: 2 },
        { name: 'Engineering Mathematics', questionCount: 1, marksAllocation: 1 }
      ]
    };

    const result = scoreMockTest(attempts, bp);
    const coreSection = result.sectionBreakdown.find(s => s.section === 'Core CS');
    const mathSection = result.sectionBreakdown.find(s => s.section === 'Engineering Mathematics');

    expect(coreSection).toBeDefined();
    expect(coreSection!.correct).toBe(1);
    expect(coreSection!.wrong).toBe(1);
    expect(coreSection!.accuracy).toBe(50);

    expect(mathSection).toBeDefined();
    expect(mathSection!.correct).toBe(1);
    expect(mathSection!.accuracy).toBe(100);
  });
});
