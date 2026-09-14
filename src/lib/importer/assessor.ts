import { QuestionType } from '../grading/evaluator';

export interface QuestionConversionRequest {
  questionId: string;
  currentType: QuestionType;
  targetType: QuestionType;
  newOptions?: string[];
  newCorrectAnswer: any;
  answerType?: string;
  tolerancePercent?: number;
  reason: string;
  userId: string;
}

export interface AssessorAuditEntry {
  questionId: string;
  action: 'convert_type' | 'update_answer' | 'set_tolerance';
  before: Record<string, any>;
  after: Record<string, any>;
  reason: string;
  timestamp: string;
}

export function convertQuestionType(
  currentQuestion: any,
  request: QuestionConversionRequest
): { updatedQuestion: any; auditEntry: AssessorAuditEntry } {
  const beforeState = {
    questionType: currentQuestion.questionType,
    correctAnswer: currentQuestion.correctAnswer,
    options: currentQuestion.options,
    answerType: currentQuestion.answerType
  };

  const afterState: any = {
    questionType: request.targetType,
    correctAnswer: request.newCorrectAnswer,
    options: request.newOptions || currentQuestion.options,
    answerType: request.answerType || currentQuestion.answerType
  };

  const updatedQuestion = {
    ...currentQuestion,
    ...afterState
  };

  const auditEntry: AssessorAuditEntry = {
    questionId: currentQuestion.id,
    action: 'convert_type',
    before: beforeState,
    after: afterState,
    reason: request.reason,
    timestamp: new Date().toISOString()
  };

  return { updatedQuestion, auditEntry };
}
