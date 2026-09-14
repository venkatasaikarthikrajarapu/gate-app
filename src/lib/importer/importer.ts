export interface RawQuestionRow {
  id?: string;
  externalId?: string;
  subject?: string;
  topic?: string;
  subtopic?: string;
  type?: string;
  questionType?: string;
  marks?: number | string;
  year?: number | string;
  session?: string;
  difficulty?: string;
  question?: string;
  questionText?: string;
  options?: any;
  answer?: any;
  correctAnswer?: any;
  answerType?: string;
  tolerance?: number | string;
  min?: number | string;
  max?: number | string;
  explanation?: string;
  concept?: string;
  source?: string;
  sourceType?: string;
  tags?: any;
}

export interface ValidationErrorItem {
  row: number;
  field: string;
  message: string;
  severity: 'error' | 'warning';
}

export interface ImportValidationReport {
  totalRows: number;
  validRows: number;
  errorRows: number;
  warningRows: number;
  errors: ValidationErrorItem[];
  validQuestions: any[];
  unmappedQuestions: any[];
}

export function parseCSV(content: string): RawQuestionRow[] {
  const lines = content.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map(h => h.trim().replace(/^["']|["']$/g, ''));
  const rows: RawQuestionRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const rawCols = lines[i].split(',').map(c => c.trim().replace(/^["']|["']$/g, ''));
    const rowObj: any = {};
    headers.forEach((h, idx) => {
      rowObj[h] = rawCols[idx] ?? '';
    });
    rows.push(rowObj);
  }
  return rows;
}

export function parseRawInput(content: string): RawQuestionRow[] {
  const trimmed = content.trim();
  // JSON array
  if (trimmed.startsWith('[')) {
    try {
      return JSON.parse(trimmed);
    } catch {
      throw new Error('Failed to parse JSON array.');
    }
  }
  // JSONL format
  if (trimmed.startsWith('{') && trimmed.includes('\n')) {
    try {
      return trimmed.split(/\r?\n/).map(l => l.trim()).filter(Boolean).map(l => JSON.parse(l));
    } catch {
      // fallback single object
    }
  }
  // Single JSON object
  if (trimmed.startsWith('{')) {
    try {
      return [JSON.parse(trimmed)];
    } catch {
      throw new Error('Failed to parse JSON object.');
    }
  }
  // CSV format
  return parseCSV(trimmed);
}

export function validateQuestionBatch(
  rows: RawQuestionRow[],
  knownSubjectCodes: string[],
  knownTopicNames: string[]
): ImportValidationReport {
  const errors: ValidationErrorItem[] = [];
  const validQuestions: any[] = [];
  const unmappedQuestions: any[] = [];
  const seenIds = new Set<string>();

  const subjectSet = new Set(knownSubjectCodes.map(s => s.toLowerCase()));
  const topicSet = new Set(knownTopicNames.map(t => t.toLowerCase()));

  rows.forEach((row, idx) => {
    const rowNum = idx + 1;
    let rowHasError = false;

    const qText = row.questionText || row.question;
    if (!qText || String(qText).trim().length < 5) {
      errors.push({ row: rowNum, field: 'question', message: 'Question text must be at least 5 characters.', severity: 'error' });
      rowHasError = true;
    }

    const rawType = String(row.questionType || row.type || '').toLowerCase().trim();
    if (!['mcq', 'msq', 'nat'].includes(rawType)) {
      errors.push({ row: rowNum, field: 'type', message: `Invalid question type '${rawType}'. Must be mcq, msq, or nat.`, severity: 'error' });
      rowHasError = true;
    }

    const marksNum = Number(row.marks) || 1;
    if (marksNum !== 1 && marksNum !== 2) {
      errors.push({ row: rowNum, field: 'marks', message: `Invalid marks '${row.marks}'. GATE questions must carry 1 or 2 marks.`, severity: 'error' });
      rowHasError = true;
    }

    // Source & PYQ integrity
    const sType = String(row.sourceType || 'practice').toLowerCase().trim();
    const sourceStr = String(row.source || '').trim();
    const yearVal = row.year ? Number(row.year) : undefined;

    if (sType === 'pyq') {
      if (!sourceStr) {
        errors.push({ row: rowNum, field: 'source', message: 'PYQ questions must carry a verifiable source name.', severity: 'error' });
        rowHasError = true;
      }
      if (!yearVal || isNaN(yearVal) || yearVal < 1990 || yearVal > 2035) {
        errors.push({ row: rowNum, field: 'year', message: 'PYQ questions must have a valid examination year.', severity: 'error' });
        rowHasError = true;
      }
    }

    // Options validation for MCQ / MSQ
    const rawOptions = row.options;
    let optArray: string[] = [];
    if (rawType === 'mcq' || rawType === 'msq') {
      if (Array.isArray(rawOptions)) {
        optArray = rawOptions.map(String);
      } else if (typeof rawOptions === 'string') {
        try {
          const parsed = JSON.parse(rawOptions);
          optArray = Array.isArray(parsed) ? parsed.map(String) : rawOptions.split('|').map(s => s.trim());
        } catch {
          optArray = rawOptions.split('|').map(s => s.trim()).filter(Boolean);
        }
      }
      if (optArray.length < 2) {
        errors.push({ row: rowNum, field: 'options', message: `${rawType.toUpperCase()} questions must provide at least 2 options.`, severity: 'error' });
        rowHasError = true;
      }
    }

    // Answer validation
    const rawAns = row.correctAnswer !== undefined ? row.correctAnswer : row.answer;
    if (rawAns === undefined || rawAns === null || rawAns === '') {
      errors.push({ row: rowNum, field: 'answer', message: 'Correct answer must be provided.', severity: 'error' });
      rowHasError = true;
    }

    // Duplicate check
    const extId = row.externalId || row.id;
    if (extId) {
      if (seenIds.has(extId)) {
        errors.push({ row: rowNum, field: 'id', message: `Duplicate externalId '${extId}'.`, severity: 'error' });
        rowHasError = true;
      } else {
        seenIds.add(extId);
      }
    }

    // Missing explanation warning (does not block row)
    const hasExp = Boolean(row.explanation && String(row.explanation).trim().length > 0);
    if (!hasExp) {
      errors.push({ row: rowNum, field: 'explanation', message: 'Missing explanation; added to explanation review queue.', severity: 'warning' });
    }

    // Topic mapping validation
    const subjectGiven = String(row.subject || '').toLowerCase().trim();
    const topicGiven = String(row.topic || '').toLowerCase().trim();
    const isTopicMapped = topicGiven && topicSet.has(topicGiven);

    const questionRecord = {
      externalId: extId || `IMPORTED-${Date.now()}-${idx}`,
      subjectName: row.subject,
      topicName: row.topic,
      subtopicName: row.subtopic,
      questionText: qText,
      questionType: rawType,
      marks: marksNum,
      difficulty: String(row.difficulty || 'medium').toLowerCase(),
      options: optArray.length > 0 ? optArray : null,
      correctAnswer: rawAns,
      answerType: row.answerType || 'exact',
      explanation: row.explanation || null,
      explanationMissing: !hasExp,
      concept: row.concept || null,
      source: sourceStr || 'Imported User Bank',
      sourceType: sType,
      year: yearVal,
      session: row.session || null
    };

    if (rowHasError) {
      // Row rejected
    } else if (!isTopicMapped) {
      unmappedQuestions.push(questionRecord);
    } else {
      validQuestions.push(questionRecord);
    }
  });

  const distinctErrorRows = new Set(errors.filter(e => e.severity === 'error').map(e => e.row)).size;
  const distinctWarningRows = new Set(errors.filter(e => e.severity === 'warning').map(e => e.row)).size;

  return {
    totalRows: rows.length,
    validRows: validQuestions.length,
    errorRows: distinctErrorRows,
    warningRows: distinctWarningRows,
    errors,
    validQuestions,
    unmappedQuestions
  };
}
