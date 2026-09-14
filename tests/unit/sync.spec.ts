import { describe, it, expect } from 'vitest';
import { processOutboxReplay, OutboxMutation } from '../../src/lib/sync/outbox';

describe('Stage 8: Sync & Outbox Replay Engine', () => {
  it('Deduplicates mutations by clientId (ADR-004)', () => {
    const processedIds = new Set<string>(['client-id-existing']);

    const mutations: OutboxMutation[] = [
      {
        id: 'mut-1',
        clientId: 'client-id-existing',
        endpoint: '/api/sessions',
        payload: { actualMinutes: 60 },
        occurredAt: '2026-10-01T10:00:00Z',
        effectiveDate: '2026-10-01'
      },
      {
        id: 'mut-2',
        clientId: 'client-id-new-1',
        endpoint: '/api/sessions',
        payload: { actualMinutes: 45 },
        occurredAt: '2026-10-01T11:00:00Z',
        effectiveDate: '2026-10-01'
      },
      {
        id: 'mut-3',
        clientId: 'client-id-new-1', // duplicate in same batch
        endpoint: '/api/sessions',
        payload: { actualMinutes: 45 },
        occurredAt: '2026-10-01T11:00:00Z',
        effectiveDate: '2026-10-01'
      },
      {
        id: 'mut-4',
        clientId: 'client-id-new-2',
        endpoint: '/api/attempts',
        payload: { questionId: 'q-101', score: 1 },
        occurredAt: '2026-10-01T12:00:00Z',
        effectiveDate: '2026-10-01'
      }
    ];

    const result = processOutboxReplay(mutations, processedIds);

    expect(result.processedCount).toBe(2);
    expect(result.duplicateCount).toBe(2);
    expect(result.syncStatus).toBe('synced');
    expect(result.replayedEvents).toHaveLength(2);
    expect(result.replayedEvents[0].clientId).toBe('client-id-new-1');
    expect(result.replayedEvents[1].clientId).toBe('client-id-new-2');
    expect(processedIds.has('client-id-new-1')).toBe(true);
    expect(processedIds.has('client-id-new-2')).toBe(true);
  });
});
