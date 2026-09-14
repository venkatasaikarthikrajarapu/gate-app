# scripts/build_stage6.py
import os

grading_code = """export type QuestionType = 'mcq' | 'msq' | 'nat';
export type NATAnswerType = 'exact' | 'range' | 'tolerance';

export interface NATCorrectAnswer {
  answerType?: NATAnswerType;
  value?: number;
  min?: number;
  max?: number;
  tolerance?: number; // percentage, e.g. 2 for 2%
  unit?: string;
}

export interface QuestionGradeInput {
  questionType: QuestionType;
  marks: number; // 1 or 2
  correctAnswer: any; // string for MCQ, string[] for MSQ, NATCorrectAnswer for NAT
  userAnswer: any;
  answerType?: NATAnswerType;
}

export interface QuestionGradeResult {
  isCorrect: boolean;
  marksAwarded: number;
  negativeMarks: number;
  netMarks: number;
  errorMessage?: string;
  feedback?: string;
}

export function parseNATInput(input: any): { value?: number; error?: string } {
  if (input === null || input === undefined || input === '') {
    return { error: 'Empty answer submitted.' };
  }
  if (typeof input === 'number') {
    if (isNaN(input)) return { error: 'Input is NaN.' };
    return { value: input };
  }
  if (typeof input !== 'string') {
    return { error: 'Malformed input type.' };
  }

  // Strip commas, units, and extraneous whitespace
  let clean = input.trim().replace(/,/g, '');
  // Remove trailing units if separated by space, e.g. "400 MHz" -> "400"
  clean = clean.replace(/\\s+[a-zA-Z%^*/]+$/, '').trim();

  // Validate format: valid integer or floating point, optionally negative
  if (!/^-?\\d+(\\.\\d+)?$/.test(clean)) {
    return { error: `Could not parse numeric answer from '${input}'.` };
  }

  const parsed = parseFloat(clean);
  if (isNaN(parsed)) {
    return { error: `Could not parse numeric answer from '${input}'.` };
  }
  return { value: parsed };
}

export function evaluateQuestionAnswer(input: QuestionGradeInput): QuestionGradeResult {
  const { questionType, marks, correctAnswer, userAnswer } = input;

  if (userAnswer === null || userAnswer === undefined || userAnswer === '' || (Array.isArray(userAnswer) && userAnswer.length === 0)) {
    return {
      isCorrect: false,
      marksAwarded: 0,
      negativeMarks: 0,
      netMarks: 0,
      feedback: 'Unattempted'
    };
  }

  // 1. MCQ Evaluation
  if (questionType === 'mcq') {
    const canonicalCorrect = String(correctAnswer).trim().toUpperCase();
    const userOption = String(userAnswer).trim().toUpperCase();
    const isCorrect = canonicalCorrect === userOption;

    if (isCorrect) {
      return {
        isCorrect: true,
        marksAwarded: marks,
        negativeMarks: 0,
        netMarks: marks,
        feedback: 'Correct'
      };
    } else {
      const negative = marks === 1 ? Number((1 / 3).toFixed(2)) : Number((2 / 3).toFixed(2));
      return {
        isCorrect: false,
        marksAwarded: 0,
        negativeMarks: negative,
        netMarks: -negative,
        feedback: 'Incorrect'
      };
    }
  }

  // 2. MSQ Evaluation (All or nothing, no partial marks, no negative marking)
  if (questionType === 'msq') {
    let correctSet: string[] = [];
    if (Array.isArray(correctAnswer)) {
      correctSet = correctAnswer.map(x => String(x).trim().toUpperCase()).sort();
    } else if (typeof correctAnswer === 'string') {
      try {
        const parsed = JSON.parse(correctAnswer);
        correctSet = Array.isArray(parsed) ? parsed.map((x: any) => String(x).trim().toUpperCase()).sort() : [correctAnswer.toUpperCase()];
      } catch {
        correctSet = [correctAnswer.toUpperCase()];
      }
    }

    let userSet: string[] = [];
    if (Array.isArray(userAnswer)) {
      userSet = userAnswer.map(x => String(x).trim().toUpperCase()).sort();
    } else if (typeof userAnswer === 'string') {
      try {
        const parsed = JSON.parse(userAnswer);
        userSet = Array.isArray(parsed) ? parsed.map((x: any) => String(x).trim().toUpperCase()).sort() : [userAnswer.toUpperCase()];
      } catch {
        userSet = [userAnswer.toUpperCase()];
      }
    }

    // Exact set equality
    const isExactMatch = correctSet.length === userSet.length &&
      correctSet.every((val, idx) => val === userSet[idx]);

    return {
      isCorrect: isExactMatch,
      marksAwarded: isExactMatch ? marks : 0,
      negativeMarks: 0, // Zero negative marking for MSQ
      netMarks: isExactMatch ? marks : 0,
      feedback: isExactMatch ? 'Correct (All options matched)' : 'Incorrect (MSQ requires all-or-nothing selection)'
    };
  }

  // 3. NAT Evaluation (Tolerance, Range, Exact)
  if (questionType === 'nat') {
    const parseResult = parseNATInput(userAnswer);
    if (parseResult.error || parseResult.value === undefined) {
      return {
        isCorrect: false,
        marksAwarded: 0,
        negativeMarks: 0,
        netMarks: 0,
        errorMessage: parseResult.error,
        feedback: parseResult.error
      };
    }

    const val = parseResult.value;
    let natConfig: NATCorrectAnswer = {};

    if (typeof correctAnswer === 'number') {
      natConfig = { answerType: 'exact', value: correctAnswer };
    } else if (typeof correctAnswer === 'string') {
      try {
        natConfig = JSON.parse(correctAnswer);
      } catch {
        natConfig = { answerType: 'exact', value: parseFloat(correctAnswer) };
      }
    } else if (typeof correctAnswer === 'object' && correctAnswer !== null) {
      natConfig = correctAnswer;
    }

    const aType = input.answerType || natConfig.answerType || 'exact';
    let isCorrect = false;

    if (aType === 'exact') {
      const target = natConfig.value ?? 0;
      isCorrect = Math.abs(val - target) < 0.0001;
    } else if (aType === 'range') {
      const min = natConfig.min ?? -Infinity;
      const max = natConfig.max ?? Infinity;
      isCorrect = val >= min && val <= max;
    } else if (aType === 'tolerance') {
      const target = natConfig.value ?? 0;
      const tolPercent = natConfig.tolerance ?? 2.0; // default +/- 2%
      const allowedDelta = Math.abs(target * (tolPercent / 100));
      isCorrect = Math.abs(val - target) <= allowedDelta;
    }

    return {
      isCorrect,
      marksAwarded: isCorrect ? marks : 0,
      negativeMarks: 0, // No negative marks for NAT
      netMarks: isCorrect ? marks : 0,
      feedback: isCorrect ? 'Correct' : 'Incorrect numerical value'
    };
  }

  return {
    isCorrect: false,
    marksAwarded: 0,
    negativeMarks: 0,
    netMarks: 0,
    errorMessage: 'Unknown question type.'
  };
}
"""

diag_generator_code = """import { QuestionType } from '../grading/evaluator';

export interface BankQuestion {
  id: string;
  externalId?: string;
  subjectId: string;
  topicId: string;
  subtopicId?: string;
  questionType: QuestionType;
  difficulty: 'easy' | 'medium' | 'hard';
  questionText: string;
  options?: string;
  correctAnswer: any;
  answerType?: string;
  sourceType: 'pyq' | 'practice' | 'generated' | 'demo';
  source: string;
  year?: number;
  marks: number;
  lastServedAt?: string;
}

export interface DiagnosticSelectionInput {
  date: string; // YYYY-MM-DD
  userId: string;
  yesterdayTopicId?: string;
  mostRecentTopicId?: string;
  weakTopicIds: string[];
  overdueRevisionTopicIds: string[];
  questionBank: BankQuestion[];
  targetCount?: number; // default 10
  cooldownDays?: number; // default 14
}

export interface DiagnosticSelectionOutput {
  questions: BankQuestion[];
  targetCount: number;
  achievedMix: { mcq: number; msq: number; nat: number };
  shortfallNotices: string[];
  selectionProvenance: Array<{ questionId: string; reason: string }>;
}

export function generateDailyDiagnostic(input: DiagnosticSelectionInput): DiagnosticSelectionOutput {
  const targetCount = input.targetCount || 10;
  const cooldownDays = input.cooldownDays || 14;
  const selected: BankQuestion[] = [];
  const selectedIds = new Set<string>();
  const provenance: Array<{ questionId: string; reason: string }> = [];
  const shortfallNotices: string[] = [];

  const targetDate = new Date(input.date);

  // Filter out questions within cooldown period
  const eligibleBank = input.questionBank.filter(q => {
    if (!q.lastServedAt) return true;
    const servedDate = new Date(q.lastServedAt);
    const diffDays = (targetDate.getTime() - servedDate.getTime()) / (1000 * 60 * 60 * 24);
    return diffDays >= cooldownDays;
  });

  const primaryTopicId = input.yesterdayTopicId || input.mostRecentTopicId;

  // Helper to pick questions
  const pickFromPool = (pool: BankQuestion[], maxCount: number, reason: string) => {
    for (const q of pool) {
      if (selected.length >= targetCount) break;
      if (selectedIds.has(q.id)) continue;
      selected.push(q);
      selectedIds.add(q.id);
      provenance.push({ questionId: q.id, reason });
      if (selected.length >= targetCount) break;
    }
  };

  // Step 1: ~70% yesterday primary topic (or fallback chain)
  const yesterdayTarget = Math.round(targetCount * 0.7); // 7
  if (primaryTopicId) {
    const yesterdayPool = eligibleBank.filter(q => q.topicId === primaryTopicId);
    pickFromPool(yesterdayPool, yesterdayTarget, 'yesterday_primary_topic');
  }

  // Step 2: ~20% weak or overdue revision topics
  const weakTarget = Math.round(targetCount * 0.2); // 2
  const weakPool = eligibleBank.filter(q =>
    input.weakTopicIds.includes(q.topicId) || input.overdueRevisionTopicIds.includes(q.topicId)
  );
  pickFromPool(weakPool, weakTarget, 'weak_overdue_revision');

  // Step 3: Spaced mixed review & general fallback chain
  if (selected.length < targetCount) {
    pickFromPool(eligibleBank, targetCount - selected.length, 'spaced_mixed_review');
  }

  // Count question types
  const achievedMix = {
    mcq: selected.filter(q => q.questionType === 'mcq').length,
    msq: selected.filter(q => q.questionType === 'msq').length,
    nat: selected.filter(q => q.questionType === 'nat').length
  };

  // Honest shortfall check (Directive D2, R2, Section J1.5)
  if (achievedMix.nat < 3) {
    shortfallNotices.push(`Only ${achievedMix.nat} NAT question(s) were available. Diagnostic quota of 3 NAT could not be fully satisfied.`);
  }
  if (achievedMix.msq < 2) {
    shortfallNotices.push(`Only ${achievedMix.msq} MSQ question(s) were available. Diagnostic quota of 2 MSQ could not be fully satisfied.`);
  }

  return {
    questions: selected,
    targetCount,
    achievedMix,
    shortfallNotices,
    selectionProvenance: provenance
  };
}
"""

report_code = """import { QuestionGradeResult } from '../grading/evaluator';

export interface QuestionSubmission {
  questionId: string;
  topicId: string;
  subjectId: string;
  questionType: 'mcq' | 'msq' | 'nat';
  marks: number;
  userAnswer: any;
  gradeResult: QuestionGradeResult;
  timeTakenSeconds?: number;
  confidence?: 'low' | 'medium' | 'high';
}

export interface DailyDiagnosticReportCard {
  totalQuestions: number;
  attempted: number;
  correctCount: number;
  wrongCount: number;
  skippedCount: number;
  totalMarksEarned: number;
  maxPossibleMarks: number;
  accuracyPercent: number;
  typeAccuracy: {
    mcq: { attempted: number; correct: number; accuracy: number };
    msq: { attempted: number; correct: number; accuracy: number };
    nat: { attempted: number; correct: number; accuracy: number };
  };
  dangerousMistakesCount: number;
  weakTopicsDetected: string[];
  improvementSuggestion: string;
}

export function generateDailyReportCard(submissions: QuestionSubmission[]): DailyDiagnosticReportCard {
  const total = submissions.length;
  let attempted = 0;
  let correct = 0;
  let wrong = 0;
  let skipped = 0;
  let marksEarned = 0;
  let maxMarks = 0;

  const typeStats = {
    mcq: { attempted: 0, correct: 0 },
    msq: { attempted: 0, correct: 0 },
    nat: { attempted: 0, correct: 0 }
  };

  let dangerousCount = 0;
  const topicAccuracyMap: Record<string, { attempted: number; correct: number }> = {};

  for (const sub of submissions) {
    maxMarks += sub.marks;
    const isAttempted = sub.userAnswer !== null && sub.userAnswer !== undefined && sub.userAnswer !== '';

    if (!isAttempted) {
      skipped++;
      continue;
    }

    attempted++;
    typeStats[sub.questionType].attempted++;

    if (!topicAccuracyMap[sub.topicId]) {
      topicAccuracyMap[sub.topicId] = { attempted: 0, correct: 0 };
    }
    topicAccuracyMap[sub.topicId].attempted++;

    if (sub.gradeResult.isCorrect) {
      correct++;
      typeStats[sub.questionType].correct++;
      topicAccuracyMap[sub.topicId].correct++;
      marksEarned += sub.gradeResult.marksAwarded;
    } else {
      wrong++;
      marksEarned -= sub.gradeResult.negativeMarks;
      if (sub.confidence === 'high') {
        dangerousCount++;
      }
    }
  }

  const accuracy = attempted > 0 ? Number(((correct / attempted) * 100).toFixed(1)) : 0;

  const weakTopics = Object.entries(topicAccuracyMap)
    .filter(([_, stats]) => stats.attempted >= 2 && (stats.correct / stats.attempted) < 0.5)
    .map(([topicId]) => topicId);

  let suggestion = 'Solid performance. Maintain balanced practice across all question formats.';
  if (typeStats.msq.attempted > 0 && (typeStats.msq.correct / typeStats.msq.attempted) < 0.5) {
    suggestion = 'MSQ accuracy is below 50%. Review multi-select elimination strategy and verify all necessary conditions.';
  } else if (typeStats.nat.attempted > 0 && (typeStats.nat.correct / typeStats.nat.attempted) < 0.5) {
    suggestion = 'NAT errors detected. Practice step-by-step formula execution and check units.';
  } else if (dangerousCount > 0) {
    suggestion = `${dangerousCount} dangerous mistake(s) (high confidence yet incorrect). Mandatory review queued.`;
  }

  return {
    totalQuestions: total,
    attempted,
    correctCount: correct,
    wrongCount: wrong,
    skippedCount: skipped,
    totalMarksEarned: Number(Math.max(0, marksEarned).toFixed(2)),
    maxPossibleMarks: maxMarks,
    accuracyPercent: accuracy,
    typeAccuracy: {
      mcq: {
        attempted: typeStats.mcq.attempted,
        correct: typeStats.mcq.correct,
        accuracy: typeStats.mcq.attempted > 0 ? Number(((typeStats.mcq.correct / typeStats.mcq.attempted) * 100).toFixed(1)) : 0
      },
      msq: {
        attempted: typeStats.msq.attempted,
        correct: typeStats.msq.correct,
        accuracy: typeStats.msq.attempted > 0 ? Number(((typeStats.msq.correct / typeStats.msq.attempted) * 100).toFixed(1)) : 0
      },
      nat: {
        attempted: typeStats.nat.attempted,
        correct: typeStats.nat.correct,
        accuracy: typeStats.nat.attempted > 0 ? Number(((typeStats.nat.correct / typeStats.nat.attempted) * 100).toFixed(1)) : 0
      }
    },
    dangerousMistakesCount: dangerousCount,
    weakTopicsDetected: weakTopics,
    improvementSuggestion: suggestion
  };
}
"""

os.makedirs(r"c:\Users\karth\OneDrive\Desktop\gate note\src\lib\grading", exist_ok=True)
os.makedirs(r"c:\Users\karth\OneDrive\Desktop\gate note\src\lib\diagnostic", exist_ok=True)

with open(r"c:\Users\karth\OneDrive\Desktop\gate note\src\lib\grading\evaluator.ts", "w", encoding="utf-8") as f:
    f.write(grading_code.strip() + "\n")

with open(r"c:\Users\karth\OneDrive\Desktop\gate note\src\lib\diagnostic\generator.ts", "w", encoding="utf-8") as f:
    f.write(diag_generator_code.strip() + "\n")

with open(r"c:\Users\karth\OneDrive\Desktop\gate note\src\lib\diagnostic\report.ts", "w", encoding="utf-8") as f:
    f.write(report_code.strip() + "\n")

print("Stage 6 grading and diagnostic modules written successfully")
