export type QuestionType = 'mcq' | 'msq' | 'nat';
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
  clean = clean.replace(/\s+[a-zA-Z%^*/]+$/, '').trim();

  // Validate format: valid integer or floating point, optionally negative
  if (!/^-?\d+(\.\d+)?$/.test(clean)) {
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
        const parsed = JSON.parse(correctAnswer);
        if (typeof parsed === 'number') {
          natConfig = { answerType: 'exact', value: parsed };
        } else if (typeof parsed === 'object' && parsed !== null) {
          natConfig = parsed;
        } else {
          natConfig = { answerType: 'exact', value: parseFloat(correctAnswer) };
        }
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
