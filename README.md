# GATE CSE MASTERY — Adaptive Preparation System

> **A personal, closed-loop adaptive preparation engine for GATE Computer Science and Information Technology (CSE).**
> Built to survive change: versioned seed data, immutable preparation event logging, deterministic scheduling, and complete auditability.

---

## The Six Daily Questions (Product North Star)
1. **What should I study today?** → Today\'s Mission (main study block)
2. **What should I revise today?** → Revision queue + stability decks
3. **Which questions should I solve?** → Daily diagnostic + practice sets
4. **What mistakes should I review?** → Mistake review queue & repeated-error drills
5. **Which topics are weak?** → Weak-topic radar & mastery views
6. **Am I on track?** → Deadline risk analysis & syllabus completion metrics

---

## Core Philosophy & The Closed Loop
`PLAN → STUDY → DAILY QUESTIONS → PERFORMANCE → MISTAKES → TOPIC MASTERY → REVISION → MOCK → MOCK ANALYSIS → UPDATED PLAN → STUDY AGAIN`

- **Optimization Target:** Retention + Accuracy + Speed + PYQ Mastery + Error Elimination.
- **Completion ≠ Mastery:** A 100% completed topic with 58% accuracy is weak, not mastered.
- **Deterministic Core:** Scheduler, diagnostics, grading, mastery, and recovery math are 100% deterministic TypeScript algorithms without black-box LLM dependencies.
- **Append-Only History:** All events (study sessions, mistakes, availability changes, syllabus diffs) are immutably logged.

---

## Quickstart Guide

### Prerequisites
- Node.js 20+ LTS
- pnpm or npm
- PostgreSQL 16 (or SQLite local profile)

### Installation
```bash
# Clone the repository
git clone https://github.com/venkatasaikarthikrajarapu/gate-app.git
cd gate-app

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env

# Generate Prisma Client & run migrations
pnpm prisma generate
pnpm prisma db push

# Seed default ExamCycle (GATE CSE 2027), Syllabus v1, settings, and demo bank
pnpm db:seed

# Start development server
pnpm dev
```
Navigate to `http://localhost:3000`.

---

## Architectural Documentation
- [Architecture Overview](docs/ARCHITECTURE.md)
- [Data Model & Schema Contract](docs/DATA_MODEL.md)
- [Preparation Event Model](docs/EVENT_MODEL.md)
- [Adaptive Scheduler Engine](docs/SCHEDULER.md)
- [Offline Sync & Conflict Resolution](docs/sync.md)
- [Import Formats Guide](docs/IMPORT_FORMATS.md)
- [Syllabus Diff Algorithm](docs/SYLLABUS_DIFF.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Build Log & Decision Record](docs/BUILD_LOG.md)
- [Architectural Decision Records (ADR)](docs/ADR/)
