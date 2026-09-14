export type MistakeClassification =
  | 'conceptual_gap'
  | 'misread_question'
  | 'calculation_error'
  | 'formula_forgotten'
  | 'unit_conversion_error'
  | 'edge_case_missed'
  | 'time_pressure_rush'
  | 'overconfidence_trap'
  | 'guessing_error';

export interface MistakeEntry {
  id: string;
  userId: string;
  questionId: string;
  topicId: string;
  subjectId: string;
  date: string;
  classification: MistakeClassification;
  customExplanation?: string;
  confidence: 'low' | 'medium' | 'high';
  isDangerous: boolean;
  repeatCount: number;
  isRepeated: boolean;
  quarantined: boolean;
  consecutiveCorrectCount: number;
  consecutiveCorrectNeeded: number;
  priorityWeight: number; // base 1.0, 1.5x on repeat, cap 5.0
  revisionBucket: 'RED' | 'YELLOW' | 'GREEN';
  resolved: boolean;
  resolvedAt?: string;
  resolutionNote?: string;
}

export interface MistakePatternEntry {
  id: string;
  topicId: string;
  subjectId: string;
  classification: MistakeClassification;
  patternText: string;
  occurrences: number;
  status: 'active' | 'resolved';
  remedialAction: string;
}

export interface RecordMistakeInput {
  id?: string;
  userId: string;
  questionId: string;
  topicId: string;
  subjectId: string;
  date: string;
  classification: MistakeClassification;
  customExplanation?: string;
  confidence: 'low' | 'medium' | 'high';
  previousQuestionMistakeCount?: number;
  topicPatternMistakeCount?: number;
}

/**
 * Stage 9: Mistake Engine
 * Directives D9 (Completion != Mastery), Section K (Mistake Intelligence & Repeated-Error Eradication).
 */
export function recordNewMistake(input: RecordMistakeInput): MistakeEntry {
  const previousMistakes = input.previousQuestionMistakeCount || 0;
  const topicMistakes = input.topicPatternMistakeCount || 0;

  // Repeat detection: same question missed >= 2 times (current + previous >= 2) OR topic pattern >= 3
  const isQuestionRepeat = previousMistakes >= 1; // since this is a new mistake, total >= 2
  const isPatternRepeat = topicMistakes >= 2; // total >= 3
  const isRepeated = isQuestionRepeat || isPatternRepeat;
  const repeatCount = previousMistakes + 1;

  // Dangerous mistake detection: high confidence wrong OR overconfidence_trap
  const isDangerous = input.confidence === 'high' || input.classification === 'overconfidence_trap';

  // Repeated mistakes trigger 1.5x priority multiplier, RED bucket floor, and quarantine
  let priorityWeight = 1.0;
  let quarantined = false;
  let consecutiveCorrectNeeded = 1;

  if (isRepeated) {
    priorityWeight = Math.min(5.0, Number((1.0 * Math.pow(1.5, repeatCount - 1)).toFixed(2)));
    quarantined = true;
    consecutiveCorrectNeeded = 2; // Must get 2 consecutive correct attempts to clear quarantine
  }

  return {
    id: input.id || `mst-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    userId: input.userId,
    questionId: input.questionId,
    topicId: input.topicId,
    subjectId: input.subjectId,
    date: input.date,
    classification: input.classification,
    customExplanation: input.customExplanation,
    confidence: input.confidence,
    isDangerous,
    repeatCount,
    isRepeated,
    quarantined,
    consecutiveCorrectCount: 0,
    consecutiveCorrectNeeded,
    priorityWeight,
    revisionBucket: 'RED', // Mistakes immediately enter RED revision bucket
    resolved: false
  };
}

/**
 * Evaluates subsequent attempts on a previously made mistake.
 * If quarantined, requires 2 consecutive corrects to resolve.
 * If wrong, resets consecutive count, increases repeatCount and priority.
 */
export function evaluateMistakeAttempt(
  mistake: MistakeEntry,
  isCorrect: boolean,
  attemptDate: string,
  resolutionNote?: string
): MistakeEntry {
  const updated: MistakeEntry = { ...mistake };

  if (isCorrect) {
    updated.consecutiveCorrectCount += 1;
    if (updated.consecutiveCorrectCount >= updated.consecutiveCorrectNeeded) {
      updated.resolved = true;
      updated.quarantined = false;
      updated.resolvedAt = attemptDate;
      updated.resolutionNote = resolutionNote || 'Mastery restored via consecutive correct retests';
      updated.revisionBucket = 'YELLOW'; // Moves out of RED
    }
  } else {
    // Relapse: reset consecutive count, increment repeat count, enforce quarantine
    updated.consecutiveCorrectCount = 0;
    updated.repeatCount += 1;
    updated.isRepeated = true;
    updated.quarantined = true;
    updated.consecutiveCorrectNeeded = 2;
    updated.priorityWeight = Math.min(5.0, Number((updated.priorityWeight * 1.5).toFixed(2)));
    updated.revisionBucket = 'RED';
    updated.resolved = false;
    updated.resolvedAt = undefined;
  }

  return updated;
}

/**
 * Aggregates mistakes in a topic to identify systemic patterns (>=3 occurrences).
 */
export function detectTopicMistakePatterns(
  topicId: string,
  subjectId: string,
  mistakes: MistakeEntry[]
): MistakePatternEntry[] {
  const topicMistakes = mistakes.filter(m => m.topicId === topicId && !m.resolved);
  const patternCounts: Record<MistakeClassification, number> = {
    conceptual_gap: 0,
    misread_question: 0,
    calculation_error: 0,
    formula_forgotten: 0,
    unit_conversion_error: 0,
    edge_case_missed: 0,
    time_pressure_rush: 0,
    overconfidence_trap: 0,
    guessing_error: 0
  };

  for (const m of topicMistakes) {
    patternCounts[m.classification] = (patternCounts[m.classification] || 0) + 1;
  }

  const patterns: MistakePatternEntry[] = [];

  const remedialMap: Record<MistakeClassification, string> = {
    conceptual_gap: 'Revisit core theory notes and re-derive foundational definitions.',
    misread_question: 'Practice highlighting keywords (NOT, EXCEPT, MUST, CANNOT) before solving.',
    calculation_error: 'Slow down computation and verify intermediate algebra steps.',
    formula_forgotten: 'Add formula to rapid recall flashcard deck with KaTeX.',
    unit_conversion_error: 'Write explicit conversion factors (e.g. KB vs KiB, ms to ns).',
    edge_case_missed: 'Check canonical boundaries: empty inputs, 0, 1, cycle graphs, infinity.',
    time_pressure_rush: 'Attempt questions untimed first; focus on accuracy before speed.',
    overconfidence_trap: 'Verify second-guess assumptions when answer feels deceptively easy.',
    guessing_error: 'Stop blind guessing to eliminate negative marking penalty.'
  };

  for (const [classification, count] of Object.entries(patternCounts) as [MistakeClassification, number][]) {
    if (count >= 3) {
      patterns.push({
        id: `pat-${topicId}-${classification}`,
        topicId,
        subjectId,
        classification,
        patternText: `Systemic ${classification.replace('_', ' ')} detected (${count} occurrences)`,
        occurrences: count,
        status: 'active',
        remedialAction: remedialMap[classification]
      });
    }
  }

  return patterns;
}
