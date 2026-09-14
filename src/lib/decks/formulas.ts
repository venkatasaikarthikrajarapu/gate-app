export interface FormulaVariable {
  symbol: string;
  meaning: string;
  unit?: string;
}

export interface FormulaEntry {
  id: string;
  subjectId: string;
  topicId: string;
  name: string;
  latex: string; // KaTeX mathematical notation
  plainText: string; // Search twin
  variables: FormulaVariable[];
  conditions?: string;
  relatedConcept?: string;
  commonTrap?: string;
  tags: string[];
  pinned: boolean;
  reviewCount: number;
  lastReviewedAt?: string;
}

export function createFormulaSearchTwin(latex: string, name: string): string {
  const cleaned = latex
    .replace(/\\[a-zA-Z]+/g, ' ')
    .replace(/[_^{}()$\[\]]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return `${name} ${cleaned}`.toLowerCase();
}

export function validateFormulaLatex(latex: string): boolean {
  if (!latex || latex.trim().length === 0) return false;
  let openBraces = 0;
  for (const ch of latex) {
    if (ch === '{') openBraces++;
    if (ch === '}') openBraces--;
    if (openBraces < 0) return false;
  }
  return openBraces === 0;
}

export interface FormulaRecallPrompt {
  id: string;
  name: string;
  variables: FormulaVariable[];
  conditions?: string;
  promptText: string;
}

export interface FormulaRecallReveal {
  id: string;
  name: string;
  latex: string;
  variables: FormulaVariable[];
  conditions?: string;
  commonTrap?: string;
}

export function generateFormulaRecallCard(formula: FormulaEntry): {
  prompt: FormulaRecallPrompt;
  reveal: FormulaRecallReveal;
} {
  return {
    prompt: {
      id: formula.id,
      name: formula.name,
      variables: formula.variables,
      conditions: formula.conditions,
      promptText: `Recall formula for: ${formula.name}. Given variables: ${formula.variables.map(v => v.symbol).join(', ')}.`
    },
    reveal: {
      id: formula.id,
      name: formula.name,
      latex: formula.latex,
      variables: formula.variables,
      conditions: formula.conditions,
      commonTrap: formula.commonTrap
    }
  };
}

export function scoreFormulaRecall(
  formula: FormulaEntry,
  recallScore: 1 | 2 | 3 // 1: forgot, 2: partial, 3: perfect
): FormulaEntry {
  const updated = { ...formula };
  updated.reviewCount += 1;
  updated.lastReviewedAt = new Date().toISOString();
  return updated;
}
