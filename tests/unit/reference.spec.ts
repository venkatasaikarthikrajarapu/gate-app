import { describe, it, expect } from 'vitest';
import {
  classifyDocumentType,
  detectSubjectsFromTitle,
  chunkTextBySections,
  mapReferenceToTopics
} from '../../src/lib/reference/scanner';

describe('Stage 14: Reference Library Scanner & Knowledge Web', () => {
  it('classifies document types by filename heuristics', () => {
    expect(classifyDocumentType('gate-wallah-topicwise-pyq-cs.pdf')).toBe('pyq');
    expect(classifyDocumentType('GATE_Mock_Solutions.pdf')).toBe('question_bank');
    expect(classifyDocumentType('COMPLETE_GFG_CSE_NOTES.html')).toBe('notes');
    expect(classifyDocumentType('Rajarapu_degree.pdf')).toBe('other');
  });

  it('detects Subjects from title keywords', () => {
    const subjs1 = detectSubjectsFromTitle('ALGORITHM SHORT NOTES.pdf');
    expect(subjs1).toContain('subl-algo');

    const subjs2 = detectSubjectsFromTitle('c program short note.pdf');
    expect(subjs2).toContain('subl-prog');
  });

  it('chunks text by paragraphs and computes token counts', () => {
    const text = 'Para 1. This is first section.\n\nPara 2. This is second section.\n\nPara 3. This is third.';
    const chunks = chunkTextBySections(text, 'Algorithms', 50);
    expect(chunks.length).toBeGreaterThanOrEqual(1);
    expect(chunks[0].headingPath).toContain('Algorithms');
    expect(chunks[0].tokenCount).toBeGreaterThan(0);
  });

  it('maps documents to knowledge web topics by filename heuristic', () => {
    const topics = [
      { id: 't-dijkstra', name: 'Dijkstra', subjectId: 's-algo' },
      { id: 't-avl', name: 'AVL Tree', subjectId: 's-algo' }
    ];
    const links = mapReferenceToTopics('doc-1', 'Notes on Dijkstra shortest path', topics);
    expect(links).toHaveLength(1);
    expect(links[0].topicId).toBe('t-dijkstra');
    expect(links[0].confidence).toBe('high');
  });
});
