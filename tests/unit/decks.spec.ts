import { describe, it, expect } from 'vitest';
import { validateAndCreateShortNote, exportShortNoteToMarkdown } from '../../src/lib/decks/notes';
import {
  createFormulaSearchTwin,
  validateFormulaLatex,
  generateFormulaRecallCard,
  scoreFormulaRecall,
  FormulaEntry
} from '../../src/lib/decks/formulas';
import { findTrapsForConcept, findEdgeCasesForTopic, TrapRuleEntry, EdgeCaseEntry } from '../../src/lib/decks/traps';

describe('Stage 10: Short Notes, Formula Decks, and Trap Engine', () => {
  describe('Guided Short Notes', () => {
    it('enforces mandatory fields (title, whatILearned, keyConcepts)', () => {
      expect(() =>
        validateAndCreateShortNote({
          userId: 'u1',
          topicId: 't1',
          subjectId: 's1',
          title: '',
          whatILearned: 'learned something',
          keyConcepts: 'concepts'
        })
      ).toThrow('Title is required');

      expect(() =>
        validateAndCreateShortNote({
          userId: 'u1',
          topicId: 't1',
          subjectId: 's1',
          title: 'Notes on Paging',
          whatILearned: '',
          keyConcepts: 'concepts'
        })
      ).toThrow('What I Learned');
    });

    it('exports a structured markdown note containing guided reflections and formulas', () => {
      const note = validateAndCreateShortNote({
        userId: 'u1',
        topicId: 't-os-paging',
        subjectId: 's-os',
        title: 'Virtual Memory & Multi-Level Paging',
        whatILearned: 'Multi-level paging saves space for sparse address spaces.',
        keyConcepts: 'Page table base register, TLB miss penalty, page offset invariance.',
        importantFormulas: '\\text{Effective Memory Access Time} = h \\cdot (c + m) + (1-h) \\cdot (c + 2m)',
        conditions: 'Assuming single-level page table without inverted tables.',
        boundaryConditions: 'Page size = virtual address space size -> 1 page.',
        edgeCases: 'Page table does not fit in one page.',
        commonTraps: 'Forgetting to include TLB access time in miss penalty.',
        memoryTrick: 'Paging = fixed size, Segmentation = variable size'
      });

      const md = exportShortNoteToMarkdown(note);
      expect(md).toContain('# Virtual Memory & Multi-Level Paging');
      expect(md).toContain('### 1. What I Learned');
      expect(md).toContain('### 3. Important Formulas');
      expect(md).toContain('### 7. Common Traps');
      expect(md).toContain('Memory Trick / Mnemonic');
    });
  });

  describe('Formula Deck & Recall Mode', () => {
    const sampleFormula: FormulaEntry = {
      id: 'f-amat-1',
      subjectId: 's-co',
      topicId: 't-cache',
      name: 'Average Memory Access Time (AMAT)',
      latex: '\\text{AMAT} = t_{hit} + (MR \\times t_{miss})',
      plainText: 'amat average memory access time',
      variables: [
        { symbol: 't_{hit}', meaning: 'Hit time' },
        { symbol: 'MR', meaning: 'Miss rate' },
        { symbol: 't_{miss}', meaning: 'Miss penalty' }
      ],
      conditions: 'Single level cache hierarchy',
      commonTrap: 'Using miss rate in percentage directly without dividing by 100',
      tags: ['cache', 'amat', 'coa'],
      pinned: true,
      reviewCount: 0
    };

    it('creates accurate plain-text search twin from LaTeX', () => {
      const twin = createFormulaSearchTwin('\\frac{a+b}{c}', 'Add Div');
      expect(twin).toContain('add div');
      expect(twin).toContain('a+b');
    });

    it('validates LaTeX bracket balance correctly', () => {
      expect(validateFormulaLatex('\\frac{a}{b}')).toBe(true);
      expect(validateFormulaLatex('\\frac{a}{b')).toBe(false);
      expect(validateFormulaLatex('')).toBe(false);
    });

    it('supports formula recall prompt generation and scoring review', () => {
      const card = generateFormulaRecallCard(sampleFormula);
      expect(card.prompt.name).toBe('Average Memory Access Time (AMAT)');
      expect(card.prompt.promptText).toContain('Recall formula for: Average Memory Access Time');
      expect(card.reveal.latex).toBe(sampleFormula.latex);
      expect(card.reveal.commonTrap).toContain('dividing by 100');

      const scored = scoreFormulaRecall(sampleFormula, 3);
      expect(scored.reviewCount).toBe(1);
      expect(scored.lastReviewedAt).toBeDefined();
    });
  });

  describe('Edge Cases & Trap Engine', () => {
    const traps: TrapRuleEntry[] = [
      {
        id: 'tr-1',
        subjectId: 's-algo',
        topicId: 't-dijkstra',
        concept: 'Dijkstra Shortest Path',
        trap: 'Applying Dijkstra to graphs with negative edge weights',
        counterMeasure: 'Use Bellman-Ford for negative edge weights. Dijkstra assumes greedy optimality.',
        tags: ['greedy', 'shortest-path']
      },
      {
        id: 'tr-2',
        subjectId: 's-db',
        topicId: 't-bplus',
        concept: 'B+ Tree Order',
        trap: 'Confusing order m with number of keys (keys = m - 1)',
        counterMeasure: 'Order m = max children; max keys = m - 1.',
        tags: ['dbms', 'indexing']
      }
    ];

    const edgeCases: EdgeCaseEntry[] = [
      {
        id: 'ec-1',
        subjectId: 's-algo',
        topicId: 't-dijkstra',
        title: 'Disconnected source vertex',
        description: 'Target vertex has no path from source.',
        expectedBehavior: 'Distance remains infinity.',
        whyItMatters: 'Unchecked infinity causes overflow when adding edge weights.',
        tags: ['graph']
      }
    ];

    it('finds traps by concept, trap query, or counter-measure keywords', () => {
      const matches = findTrapsForConcept(traps, 'negative edge');
      expect(matches).toHaveLength(1);
      expect(matches[0].concept).toBe('Dijkstra Shortest Path');
    });

    it('finds edge cases for a specific topic', () => {
      const cases = findEdgeCasesForTopic(edgeCases, 't-dijkstra');
      expect(cases).toHaveLength(1);
      expect(cases[0].title).toBe('Disconnected source vertex');
    });
  });
});
