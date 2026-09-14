# scripts/build_stage7.py
import os

importer_code = """export interface RawQuestionRow {
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
  const lines = content.split(/\\r?\\n/).map(l => l.trim()).filter(Boolean);
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map(h => h.trim().replace(/^[\"']|[\"']$/g, ''));
  const rows: RawQuestionRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const rawCols = lines[i].split(',').map(c => c.trim().replace(/^[\"']|[\"']$/g, ''));
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
  if (trimmed.startsWith('{') && trimmed.includes('\\n')) {
    try {
      return trimmed.split(/\\r?\\n/).map(l => l.trim()).filter(Boolean).map(l => JSON.parse(l));
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

  return {
    totalRows: rows.length,
    validRows: validQuestions.length,
    errorRows: errors.filter(e => e.severity === 'error').length,
    warningRows: errors.filter(e => e.severity === 'warning').length,
    errors,
    validQuestions,
    unmappedQuestions
  };
}
"""

assessor_code = """import { QuestionType } from '../grading/evaluator';

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
"""

doc_code = """# GATE CSE MASTERY — Question Bank Import Specification

## 1. Five-Step Import Pipeline
The importer enforces a transactional five-step workflow:
`UPLOAD → VALIDATE → PREVIEW → COMMIT → REPORT`

1. **Upload:** Accepts `.json`, `.csv`, or `.jsonl` files.
2. **Validate:** Checks row integrity (valid types, answer schemas, options >= 2, non-duplicate IDs, valid 1/2 marks).
3. **Preview:** Displays valid questions, unmapped questions, warnings, and validation errors.
4. **Commit:** Persists accepted rows atomically in a single transaction.
5. **Report:** Emits an `ImportBatch` summary detailing imported, unmapped, and skipped items.

---

## 2. JSON Format Specification
```json
[
  {
    "id": "OS-PYQ-2024-01",
    "subject": "Operating Systems",
    "topic": "Process Synchronization & Deadlocks",
    "type": "MSQ",
    "year": 2024,
    "difficulty": "Medium",
    "marks": 2,
    "sourceType": "pyq",
    "source": "GATE CSE 2024 Official",
    "question": "Which of the following conditions are necessary for deadlock to occur?",
    "options": ["Mutual exclusion", "Hold and wait", "Preemption", "Circular wait"],
    "answer": ["A", "C", "D"],
    "explanation": "Coffman conditions require mutual exclusion, hold and wait, no preemption, and circular wait.",
    "tags": ["deadlock", "coffman"]
  }
]
```

---

## 3. CSV Format Specification
CSV columns: `id, subject, topic, type, marks, year, question, options, answer, explanation`
- Options separated by pipe: `"Option A | Option B | Option C | Option D"`
- MSQ answers pipe-separated: `"A|C|D"`
- NAT answers: `"12.5"` or range `"10..15"` or tolerance `"12.5~2%"`

---

## 4. Question Type Assessor Tool
The Type Assessor allows modifying question classifications (e.g. converting single-answer numeric MCQs to NAT, or multi-statement MCQs to MSQ) with a permanent before/after audit log.
"""

os.makedirs(r"c:\Users\karth\OneDrive\Desktop\gate note\src\lib\importer", exist_ok=True)

with open(r"c:\Users\karth\OneDrive\Desktop\gate note\src\lib\importer\importer.ts", "w", encoding="utf-8") as f:
    f.write(importer_code.strip() + "\n")

with open(r"c:\Users\karth\OneDrive\Desktop\gate note\src\lib\importer\assessor.ts", "w", encoding="utf-8") as f:
    f.write(assessor_code.strip() + "\n")

with open(r"c:\Users\karth\OneDrive\Desktop\gate note\docs\IMPORT_FORMATS.md", "w", encoding="utf-8") as f:
    f.write(doc_code.strip() + "\n")

print("Stage 7 importer and assessor written successfully")
