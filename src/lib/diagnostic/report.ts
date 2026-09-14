import { QuestionGradeResult } from '../grading/evaluator';

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
  if (dangerousCount > 0) {
    suggestion = `${dangerousCount} dangerous mistake(s) detected (high confidence yet incorrect). Mandatory review queued.`;
  } else if (typeStats.msq.attempted > 0 && (typeStats.msq.correct / typeStats.msq.attempted) < 0.5) {
    suggestion = 'MSQ accuracy is below 50%. Review multi-select elimination strategy and verify all necessary conditions.';
  } else if (typeStats.nat.attempted > 0 && (typeStats.nat.correct / typeStats.nat.attempted) < 0.5) {
    suggestion = 'NAT errors detected. Practice step-by-step formula execution and check units.';
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
