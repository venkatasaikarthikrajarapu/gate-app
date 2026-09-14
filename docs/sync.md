# GATE CSE MASTERY — Offline Sync & Outbox Protocol

## 1. Architecture
- Authoritative Source of Truth: PostgreSQL / Server database.
- Client Cache: IndexedDB (active plans, Today mission, last 7 days of diagnostics, revision queues, notes).
- Client Outbox: IndexedDB append-only queue for offline user mutations.

---

## 2. Replay Protocol
1. While offline, mutations (attempts, session time, note edits, mistake classifications) are stored in the outbox with clientId UUID.
2. When network connectivity resumes, the Service Worker / sync client initiates batch replay to `/api/sync/replay`.
3. The server checks clientId against the SyncLog table to guarantee idempotency.
4. Accepted mutations update the database and emit PreparationEvents with original timestamps.
5. Client revalidates its cache from the server response.

---

## 3. Conflict Resolution Rules
- Attempts & Events: Append-only; no conflicts possible.
- Plans: Server deterministic scheduler wins.
- Notes: Last-write-wins based on client timestamp.
- System Config: Server authoritative.
