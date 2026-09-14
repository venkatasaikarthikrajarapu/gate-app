import { QuestionType } from '../grading/evaluator';

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
