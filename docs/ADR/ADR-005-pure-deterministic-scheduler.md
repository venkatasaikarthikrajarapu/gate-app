# ADR-005: Pure Deterministic Scheduler Module

## Context
Directive D14 mandates that the scheduler, grading, diagnostic generation, and risk metrics must be 100% deterministic and testable without black-box LLM dependencies.

## Decision
1. Implement the core scheduler engine (src/lib/scheduler/) as a pure TypeScript module with zero I/O (no database, no filesystem, no network calls).
2. The current date (today) and timezone are injected as parameters; the module never calls Date.now().
3. Tie-breaking in sorting algorithms uses deterministic seeds (e.g., topic displayOrder, deterministic hash) to guarantee that identical inputs produce byte-identical plans.
4. Impure adapters in API route handlers load state from Prisma, pass it to the pure engine, persist resulting DailyTask and ScheduleChangeEvent records, and trigger notifications.

## Consequences
- Exhaustive automated unit testing with high speed and zero database setup.
- 100% reproducible schedule calculations.
