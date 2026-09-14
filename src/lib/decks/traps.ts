export interface EdgeCaseEntry {
  id: string;
  subjectId: string;
  topicId: string;
  title: string;
  description: string;
  expectedBehavior: string;
  whyItMatters: string;
  source?: string;
  tags: string[];
}

export interface TrapRuleEntry {
  id: string;
  subjectId: string;
  topicId: string;
  concept: string;
  trap: string;
  counterMeasure: string;
  example?: string;
  tags: string[];
}

export function findTrapsForConcept(
  traps: TrapRuleEntry[],
  searchQuery: string
): TrapRuleEntry[] {
  const q = searchQuery.toLowerCase();
  return traps.filter(
    t =>
      t.concept.toLowerCase().includes(q) ||
      t.trap.toLowerCase().includes(q) ||
      t.counterMeasure.toLowerCase().includes(q)
  );
}

export function findEdgeCasesForTopic(
  edgeCases: EdgeCaseEntry[],
  topicId: string
): EdgeCaseEntry[] {
  return edgeCases.filter(ec => ec.topicId === topicId);
}
