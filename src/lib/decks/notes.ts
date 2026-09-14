export interface GuidedShortNoteInput {
  id?: string;
  userId: string;
  topicId: string;
  subtopicId?: string;
  subjectId: string;
  title: string;
  whatILearned: string;
  keyConcepts: string;
  importantFormulas?: string;
  conditions?: string;
  boundaryConditions?: string;
  edgeCases?: string;
  commonTraps?: string;
  pyqInsights?: string;
  myMistakes?: string;
  memoryTrick?: string;
  tags?: string[];
  pinned?: boolean;
}

export interface GuidedShortNote {
  id: string;
  userId: string;
  topicId: string;
  subtopicId?: string;
  subjectId: string;
  title: string;
  whatILearned: string;
  keyConcepts: string;
  importantFormulas?: string;
  conditions?: string;
  boundaryConditions?: string;
  edgeCases?: string;
  commonTraps?: string;
  pyqInsights?: string;
  myMistakes?: string;
  memoryTrick?: string;
  tags: string[];
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
}

export function validateAndCreateShortNote(input: GuidedShortNoteInput): GuidedShortNote {
  if (!input.title || input.title.trim().length === 0) {
    throw new Error('Title is required for Short Note');
  }
  if (!input.whatILearned || input.whatILearned.trim().length === 0) {
    throw new Error('Section "What I Learned" is mandatory in guided reflection');
  }
  if (!input.keyConcepts || input.keyConcepts.trim().length === 0) {
    throw new Error('Section "Key Concepts" is mandatory in guided reflection');
  }

  const now = new Date().toISOString();
  return {
    id: input.id || `sn-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    userId: input.userId,
    topicId: input.topicId,
    subtopicId: input.subtopicId,
    subjectId: input.subjectId,
    title: input.title.trim(),
    whatILearned: input.whatILearned.trim(),
    keyConcepts: input.keyConcepts.trim(),
    importantFormulas: input.importantFormulas?.trim(),
    conditions: input.conditions?.trim(),
    boundaryConditions: input.boundaryConditions?.trim(),
    edgeCases: input.edgeCases?.trim(),
    commonTraps: input.commonTraps?.trim(),
    pyqInsights: input.pyqInsights?.trim(),
    myMistakes: input.myMistakes?.trim(),
    memoryTrick: input.memoryTrick?.trim(),
    tags: input.tags || [],
    pinned: !!input.pinned,
    createdAt: now,
    updatedAt: now
  };
}

export function exportShortNoteToMarkdown(note: GuidedShortNote): string {
  let md = `# ${note.title}\n\n`;
  md += `### 1. What I Learned\n${note.whatILearned}\n\n`;
  md += `### 2. Key Concepts\n${note.keyConcepts}\n\n`;

  if (note.importantFormulas) {
    md += `### 3. Important Formulas\n${note.importantFormulas}\n\n`;
  }
  if (note.conditions) {
    md += `### 4. Conditions & Applicability\n${note.conditions}\n\n`;
  }
  if (note.boundaryConditions) {
    md += `### 5. Boundary Conditions\n${note.boundaryConditions}\n\n`;
  }
  if (note.edgeCases) {
    md += `### 6. Edge Cases\n${note.edgeCases}\n\n`;
  }
  if (note.commonTraps) {
    md += `### 7. Common Traps\n${note.commonTraps}\n\n`;
  }
  if (note.memoryTrick) {
    md += `### Memory Trick / Mnemonic\n> ${note.memoryTrick}\n\n`;
  }

  return md.trim();
}
