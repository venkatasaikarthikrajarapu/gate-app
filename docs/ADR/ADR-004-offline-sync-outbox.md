# ADR-004: Offline Resilience via IndexedDB Outbox

## Context
The student may study in offline environments (libraries, transit). Requirement R8 and Directive D8 dictate an online-first architecture with graceful offline resilience where server state is authoritative.

## Decision
1. Local browser storage (LocalStorage) is prohibited as system of record.
2. The Service Worker caches the app shell and static assets.
3. IndexedDB caches the active plan, Today mission, last 7 days of diagnostics, revision queues, and notes.
4. Offline mutations (diagnostic attempts, session logs, note edits) are appended to an IndexedDB outbox with unique clientId UUIDs.
5. On reconnect, the outbox replays to the server sequentially, deduplicated by clientId (via SyncLog), and revalidates the cache.

## Conflict Resolution
- System state: Server authoritative.
- Notes / user edits: Last-write-wins or explicit merge prompt.
- Attempts & Events: Append-only (no conflicts possible).
- Plan: Server deterministic scheduler wins.
