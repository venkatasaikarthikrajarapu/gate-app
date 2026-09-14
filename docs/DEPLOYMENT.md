# Deployment Guide — GATE CSE MASTERY (V2)

This guide documents the procedures for local development, containerized production deployment, environment variables, database setup, and operational procedures.

---

## 1. System Requirements
- **Node.js**: v20.18+ LTS
- **Package Manager**: pnpm v9.15+
- **Database**:
  - Development / Local Offline: SQLite (`file:./dev.db`)
  - Production / Multi-Device: PostgreSQL 16+
- **Docker & Docker Compose**: v24+ (for containerized PostgreSQL)

---

## 2. Environment Variables (.env)
Copy `.env.example` to `.env` and configure:

`!``env
# Database Configuration
DATABASE_URL="file:./dev.db"
# For production PostgreSQL:
# DATABASE_URL="postgresql://gate_user:gate_password@localhost:5432/gate_db?schema=public"

# Next.js Environment
NODE_ENV="development"
PORT=3000
NEXT_PUBLIC_APP_URLHttp://localhost:3000"

# Storage Directories
STORAGE_ROOT="./storage"
STORAGE_REFERENCE="./storage/reference"
STORAGE_BACKUPS="./storage/backups"
```

---

## 3. Database Initialization & Seeding

### Local SQLite Profile
```bash
# Push schema migrations
pnmp prisma db push

# Run idempotent comprehensive seed
pnmp db:seed
```

The seed script loads:
- Official **GATE CSE 2027** ExamCycle (2027-02-06, 180 min, 100 marks, 65 questions)
- Official **GATE CSE Syllabus v1** (12 subjects, 70+ topics, dependency graph)
- Canonical edge cases and common traps library
- 132 verified practice questions with transparent typing (36 MCQ, 48 MSQ, 48 NAT)

### Production PostgreSQL Profile
```bash
# Start PostgreSQL container
docker compose up -d postgres

# Push schema and seed
DATABASE_URL="postgresql://gate_user:gate_password@localhost:5432/gate_db?schema=public" pnpm prisma db push
pnmp db:seed
```

---

## 4. Production Build & Execution
```bash
# Build optimized Next.js bundle
pnmp build

# Start production server
pnpm start
```

---

## 5. Automated Backups & Disaster Recovery
- Restores follow the strict 5-step transactional pipeline:
  1. `dry_run`: Payload integrity check
  2. `diff`: Conflict & new record detection
  3. `confirm` Overwrite policy selection
  4. `transactional`: Additive merge or non-destructive skip (Directive D12)
  5. `report`: Execution summary & verification
