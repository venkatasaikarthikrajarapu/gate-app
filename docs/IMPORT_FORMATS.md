# GATE CSE MASTERY — Question Bank Import Specification

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
