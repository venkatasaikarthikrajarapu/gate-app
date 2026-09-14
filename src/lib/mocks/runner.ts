export interface MockBlueprint {
  name: string;
  type: 'full' | 'subject' | 'topic' | 'custom';
  totalQuestions: number;
  totalMarks: number;
  timeLimitMinutes: number;
  sections: MockSection[];
}

export interface MockSection {
  name: string;          // e.g. 'General Aptitude', 'Engineering Mathematics', 'Core CS'
  questionCount: number;
  marksAllocation: number;
}

// Official GATE CSE 2027 blueprint
export const GATE_CSE_FULL_BLUEPRINT: MockBlueprint = {
  name: 'GATE CSE 2027 Full Mock',
  type: 'full',
  totalQuestions: 65,
  totalMarks: 100,
  timeLimitMinutes: 180,
  sections: [
    { name: 'General Aptitude', questionCount: 10, marksAllocation: 15 },
    { name: 'Engineering Mathematics', questionCount: 13, marksAllocation: 13 },
    { name: 'Core CS', questionCount: 42, marksAllocation: 72 }
  ]
};

export interface MockQuestionSlot {
  orderIndex: number;
  questionId: string;
  section: string;
  marks: number;
  questionType: 'mcq' | 'msq' | 'nat';
}

export interface MockAttemptEntry {
  orderIndex: number;
  questionId: string;
  section: string;
  marks: number;
  questionType: 'mcq' | 'msq' | 'nat';
  userAnswer: any;
  isCorrect: boolean;
  marksAwarded: number;
  negativePenalty: number;
  timeTakenSeconds?: number;
  confidence?: 'low' | 'medium' | 'high';
}

export interface MockScoreResult {
  totalQuestions: number;
  attempted: number;
  correct: number;
  wrong: number;
  unattempted: number;
  actualScore: number;
  maxScore: number;
  potentialScore: number; // score if wrong answers were correct (no neg marks)
  scorePercent: number;
  potentialPercent: number;
  sectionBreakdown: SectionScoreBreakdown[];
  dangerousWrongCount: number;
  negativeMarksLost: number;
  timingAnalysis: {
    totalTimeSeconds: number;
    avgTimePerQuestion: number;
    fastestQuestionSeconds: number;
    slowestQuestionSeconds: number;
  };
}

export interface SectionScoreBreakdown {
  section: string;
  totalQuestions: number;
  attempted: number;
  correct: number;
  wrong: number;
  score: number;
  maxMarks: number;
  accuracy: number;
}

/**
 * Scores a completed mock test from attempt entries (Directive D4: no fake analytics).
 */
export function scoreMockTest(
  attempts: MockAttemptEntry[],
  blueprint: MockBlueprint
): MockScoreResult {
  let attempted = 0;
  let correct = 0;
  let wrong = 0;
  let unattempted = 0;
  let actualScore = 0;
  let potentialScore = 0;
  let negativeMarksLost = 0;
  let dangerousWrongCount = 0;

  let totalTimeSeconds = 0;
  let fastestSeconds = Infinity;
  let slowestSeconds = 0;

  const sectionMap: Record<string, SectionScoreBreakdown> = {};

  // Init section breakdown
  for (const sec of blueprint.sections) {
    sectionMap[sec.name] = {
      section: sec.name,
      totalQuestions: sec.questionCount,
      attempted: 0,
      correct: 0,
      wrong: 0,
      score: 0,
      maxMarks: sec.marksAllocation,
      accuracy: 0
    };
  }

  for (const att of attempts) {
    const hasAnswer = att.userAnswer !== null && att.userAnswer !== undefined && att.userAnswer !== '';

    if (!hasAnswer) {
      unattempted++;
      potentialScore += att.marks; // Could have earned these marks
      continue;
    }

    attempted++;
    const secData = sectionMap[att.section];
    if (secData) secData.attempted++;

    if (att.timeTakenSeconds !== undefined) {
      totalTimeSeconds += att.timeTakenSeconds;
      if (att.timeTakenSeconds < fastestSeconds) fastestSeconds = att.timeTakenSeconds;
      if (att.timeTakenSeconds > slowestSeconds) slowestSeconds = att.timeTakenSeconds;
    }

    if (att.isCorrect) {
      correct++;
      actualScore += att.marksAwarded;
      potentialScore += att.marksAwarded;
      if (secData) {
        secData.correct++;
        secData.score += att.marksAwarded;
      }
    } else {
      wrong++;
      actualScore -= att.negativePenalty;
      negativeMarksLost += att.negativePenalty;
      potentialScore += att.marks; // Potential if this were correct
      if (secData) {
        secData.wrong++;
        secData.score -= att.negativePenalty;
      }
      if (att.confidence === 'high') {
        dangerousWrongCount++;
      }
    }
  }

  // Compute section accuracy
  for (const sec of Object.values(sectionMap)) {
    sec.accuracy = sec.attempted > 0 ? Number(((sec.correct / sec.attempted) * 100).toFixed(1)) : 0;
    sec.score = Number(Math.max(0, sec.score).toFixed(2));
  }

  actualScore = Number(Math.max(0, actualScore).toFixed(2));
  potentialScore = Number(potentialScore.toFixed(2));

  const avgTime = attempted > 0 ? Number((totalTimeSeconds / attempted).toFixed(1)) : 0;
  if (fastestSeconds === Infinity) fastestSeconds = 0;

  return {
    totalQuestions: blueprint.totalQuestions,
    attempted,
    correct,
    wrong,
    unattempted,
    actualScore,
    maxScore: blueprint.totalMarks,
    potentialScore,
    scorePercent: Number(((actualScore / blueprint.totalMarks) * 100).toFixed(1)),
    potentialPercent: Number(((potentialScore / blueprint.totalMarks) * 100).toFixed(1)),
    sectionBreakdown: Object.values(sectionMap),
    dangerousWrongCount,
    negativeMarksLost: Number(negativeMarksLost.toFixed(2)),
    timingAnalysis: {
      totalTimeSeconds,
      avgTimePerQuestion: avgTime,
      fastestQuestionSeconds: fastestSeconds,
      slowestQuestionSeconds: slowestSeconds
    }
  };
}

/**
 * Validates mock blueprint total question count matches sum of sections.
 */
export function validateBlueprint(bp: MockBlueprint): { valid: boolean; error?: string } {
  const sectionTotal = bp.sections.reduce((sum, s) => sum + s.questionCount, 0);
  if (sectionTotal !== bp.totalQuestions) {
    return {
      valid: false,
      error: `Blueprint question mismatch: sections sum ${sectionTotal} != total ${bp.totalQuestions}`
    };
  }
  const marksTotal = bp.sections.reduce((sum, s) => sum + s.marksAllocation, 0);
  if (marksTotal !== bp.totalMarks) {
    return {
      valid: false,
      error: `Blueprint marks mismatch: sections sum ${marksTotal} != total ${bp.totalMarks}`
    };
  }
  return { valid: true };
}
