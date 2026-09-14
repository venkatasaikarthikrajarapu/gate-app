# ADR-002: Dual Database Profile (PostgreSQL 16 & SQLite Fallback)

## Context
Directive D8 and Requirement R9 specify that PostgreSQL/server state is authoritative. However, in environments where Docker daemon or system-level PostgreSQL service cannot run without elevated administrator privileges, the application must provide zero-friction local execution.

## Decision
1. Standard production configuration specifies PostgreSQL 16 via Docker Compose or native service.
2. Implement a transparent SQLite fallback profile (dev.db) where all 45+ entities share identical relational schemas, foreign keys, and indexes.
3. Complex JSONB fields in Postgres are mapped cleanly to JSON-stringified text columns in SQLite with automatic serialization/deserialization.
4. Full-text search in PostgreSQL leverages tsvector and pg_trgm; in SQLite fallback, it utilizes indexed LIKE and token-set scoring.

## Consequences
- Guaranteed zero-barrier execution on any machine regardless of Docker permissions.
- Automated tests run instantly in-memory or on local SQLite instances.
- Zero architectural compromise on relational integrity.
