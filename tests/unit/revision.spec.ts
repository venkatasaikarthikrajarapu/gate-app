import { describe, it, expect } from 'vitest';
import {
  calculateNextRevision,
  calculateRevisionUrgency,
  buildPhase3RevisionQueue,
  bucketFromStability,
  SpacedRevisionItem
} from '../../src/lib/revision/engine';

describe('Stage 11: Unified Spaced Repetition Engine', () => {
  describe('Stability Intervals & Bucket Classification', () => {
    it('classifies stability correctly into RED, YELLOW, and GREEN buckets', () => {
      expect(bucketFromStability(1)).toBe('RED');
      expect(bucketFromStability(3)).toBe('YELLOW');
      expect(bucketFromStability(7)).toBe('YELLOW');
      expect(bucketFromStability(14)).toBe('GREEN');
      expect(bucketFromStability(30)).toBe('GREEN');
      expect(bucketFromStability(60)).toBe('GREEN');
    });

    it('advances through intervals [1, 3, 7, 14, 30, 60] on recalled outcome and caps at 60', () => {
      let result = calculateNextRevision(1, 'recalled', '2026-10-01');
      expect(result.newStabilityDays).toBe(3);
      expect(result.bucket).toBe('YELLOW');
      expect(result.nextDueAt).toBe('2026-10-04');

      result = calculateNextRevision(3, 'recalled', '2026-10-04');
      expect(result.newStabilityDays).toBe(7);
      expect(result.bucket).toBe('YELLOW');

      result = calculateNextRevision(7, 'recalled', '2026-10-11');
      expect(result.newStabilityDays).toBe(14);
      expect(result.bucket).toBe('GREEN');

      result = calculateNextRevision(14, 'recalled', '2026-10-25');
      expect(result.newStabilityDays).toBe(30);

      result = calculateNextRevision(30, 'recalled', '2026-11-24');
      expect(result.newStabilityDays).toBe(60);

      // Capped at 60
      result = calculateNextRevision(60, 'recalled', '2027-01-23');
      expect(result.newStabilityDays).toBe(60);
    });

    it('resets back to interval 1 (RED bucket) on forgot outcome', () => {
      const result = calculateNextRevision(30, 'forgot', '2026-11-01');
      expect(result.newStabilityDays).toBe(1);
      expect(result.bucket).toBe('RED');
      expect(result.nextDueAt).toBe('2026-11-02');
    });

    it('retains current stability on partial outcome', () => {
      const result = calculateNextRevision(7, 'partial', '2026-10-15');
      expect(result.newStabilityDays).toBe(7);
      expect(result.bucket).toBe('YELLOW');
      expect(result.nextDueAt).toBe('2026-10-22');
    });
  });

  describe('Urgency Score & Overdue Calculation', () => {
    it('computes higher urgency score for overdue RED bucket items with mistake retest bonus', () => {
      const urgentItem: SpacedRevisionItem = {
        id: 'rev-1',
        topicId: 'top-db-concur',
        subjectId: 'sub-db',
        kind: 'mistake_retest',
        currentStability: 1,
        scheduledAt: '2026-10-01',
        nextDueAt: '2026-10-02', // 3 days overdue relative to 2026-10-05
        bucket: 'RED',
        weight: 0.9,
        isMistakeRetest: true
      };

      const calmItem: SpacedRevisionItem = {
        id: 'rev-2',
        topicId: 'top-math-la',
        subjectId: 'sub-math',
        kind: 'topic',
        currentStability: 30,
        scheduledAt: '2026-10-01',
        nextDueAt: '2026-10-20', // Not overdue
        bucket: 'GREEN',
        weight: 0.5,
        isMistakeRetest: false
      };

      const urgentMetrics = calculateRevisionUrgency(urgentItem, '2026-10-05');
      expect(urgentMetrics.isOverdue).toBe(true);
      expect(urgentMetrics.daysOverdue).toBe(3);

      const calmMetrics = calculateRevisionUrgency(calmItem, '2026-10-05');
      expect(calmMetrics.isOverdue).toBe(false);
      expect(calmMetrics.daysOverdue).toBe(0);

      expect(urgentMetrics.urgencyScore).toBeGreaterThan(calmMetrics.urgencyScore);
    });
  });

  describe('Phase 3 Rapid Revision Queue Builder', () => {
    it('segments items into deck-first categories for Phase 3 blitz', () => {
      const items: SpacedRevisionItem[] = [
        { id: '1', topicId: 't1', subjectId: 's1', kind: 'formula', currentStability: 3, scheduledAt: '', nextDueAt: '', bucket: 'YELLOW' },
        { id: '2', topicId: 't1', subjectId: 's1', kind: 'traprule', currentStability: 1, scheduledAt: '', nextDueAt: '', bucket: 'RED' },
        { id: '3', topicId: 't2', subjectId: 's1', kind: 'edgecase', currentStability: 7, scheduledAt: '', nextDueAt: '', bucket: 'YELLOW' },
        { id: '4', topicId: 't3', subjectId: 's2', kind: 'mistake_retest', currentStability: 1, scheduledAt: '', nextDueAt: '', bucket: 'RED' },
        { id: '5', topicId: 't4', subjectId: 's3', kind: 'topic', currentStability: 14, scheduledAt: '', nextDueAt: '', bucket: 'GREEN' }
      ];

      const queue = buildPhase3RevisionQueue(items);
      expect(queue.formulasAndTraps).toHaveLength(2);
      expect(queue.edgeCases).toHaveLength(1);
      expect(queue.mistakeRetests).toHaveLength(1);
      expect(queue.coreConcepts).toHaveLength(1);
    });
  });
});
