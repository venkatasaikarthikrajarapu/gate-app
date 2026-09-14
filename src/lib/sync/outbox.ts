export interface OutboxMutation {
  id: string;
  clientId: string; // Idempotency UUID
  endpoint: string;
  payload: Record<string, any>;
  occurredAt: string;
  effectiveDate: string;
}

export interface SyncReplayResult {
  processedCount: number;
  duplicateCount: number;
  replayedEvents: any[];
  syncStatus: 'synced' | 'partial_error';
}

/**
 * Server-side outbox replay handler with clientId deduplication (ADR-004 & Section R).
 */
export function processOutboxReplay(
  outboxEntries: OutboxMutation[],
  processedClientIds: Set<string>
): SyncReplayResult {
  let processed = 0;
  let duplicates = 0;
  const replayedEvents: any[] = [];

  for (const mutation of outboxEntries) {
    if (processedClientIds.has(mutation.clientId)) {
      duplicates++;
      continue;
    }

    processedClientIds.add(mutation.clientId);
    processed++;

    replayedEvents.push({
      clientId: mutation.clientId,
      eventType: mutation.endpoint.replace('/api/', '').replace('/', '_'),
      occurredAt: mutation.occurredAt,
      effectiveDate: mutation.effectiveDate,
      payload: mutation.payload
    });
  }

  return {
    processedCount: processed,
    duplicateCount: duplicates,
    replayedEvents,
    syncStatus: 'synced'
  };
}
