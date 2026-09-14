# ADR-001: Technology Stack Selection

## Context
The application requires a robust, modern, type-safe full-stack environment capable of running locally without paid external cloud services, providing instant feedback, PWA support, complex relational modeling (45+ entities), and fast unit/integration testing.

## Decision
Adopt the following stack:
- **Frontend & Server Framework:** Next.js 14+ (App Router) with React 18 and TypeScript.
- **Styling & UI:** Tailwind CSS + custom accessible UI tokens adhering to WCAG AA standards.
- **Database & ORM:** Prisma ORM supporting PostgreSQL 16 as authoritative primary with SQLite fallback profile (ADR-002).
- **Math Rendering:** KaTeX configured with trust: false for secure offline LaTeX rendering.
- **Testing:** Vitest for sub-second deterministic unit/integration testing; Playwright for critical user journeys.
- **Runtime:** Node.js 20 LTS with pnpm package manager.

## Consequences
- Single codebase for both UI and API route handlers.
- Strong end-to-end type safety across domain entities, scheduler inputs, and API responses.
- Complete local operability without external cloud service dependencies.
