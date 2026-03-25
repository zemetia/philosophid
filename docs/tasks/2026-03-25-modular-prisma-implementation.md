# Task: Modular Prisma Implementation & Futuristic Model Migration

- **Date**: 2026-03-25
- **Status**: In Progress
- **Source**: [25-03-2026.md](file:///d:/Kerja/Philosophid/Website/docs/tasks/25-03-2026.md) (Task #5)
- **Reference**: [2026-03-25-backend-architecture-research.md](file:///d:/Kerja/Philosophid/Website/docs/research/2026-03-25-backend-architecture-research.md)

## 🎯 Goal

Modularize the Prisma schema into separate files for better maintainability and implement the expanded database models (User, Publication, Competition, Scoring, Payment) as researched.

## 📋 Implementation Checklist

### Phase 1: Setup Modular Schema Environment
- [ ] **Step 1.1: Enable `prismaSchemaFolder` Preview Feature**
    - Update `generator client` in `schema.prisma`.
- [ ] **Step 1.2: Directory Structure Preparation**
    - Create `prisma/schema/` directory.
    - Move current `schema.prisma` content into logical modules.

### Phase 2: Implement Model Enhancements (From Research)
- [ ] **Step 2.1: User Model (user.prisma)**
    - Add `username` (Unique string).
    - Add `reputationScore` (Int, default 0).
    - Remove `age` (Redundant, use birthday instead).
    - Add `stats` (Json for aggregate metrics).
- [ ] **Step 2.2: Publication Model (publication.prisma)**
    - Ensure `Paper` supports independent and competition-linked states.
    - Add `slug` (Unique) and SEO fields.
- [ ] **Step 2.3: Competition & Scoring Model (competition.prisma)**
    - Add `topics` (String[]) and `tags` (String[]).
    - Add `badgeId` for rewards (Optional relation to Badge).
    - Implement `CompetitionScoringConfig` and `Score` models for granular judging.
- [ ] **Step 2.4: Payment & Transactions (payment.prisma)**
    - Enhance `Transaction` and `TransactionLog` if needed for future scalability.

### Phase 3: Validation & Migration
- [ ] **Step 3.1: Prisma Validation**
    - Run `npx prisma validate` to ensure all cross-file relations are correct.
- [ ] **Step 3.2: Database Migration**
    - Run `npx prisma migrate dev --name futuristic_modular_schema`.
    - Handle potential data migration for existing users (e.g., generating usernames from email if needed).

## 🛠️ Technical Details

- **Preview Feature**: `prismaSchemaFolder`
- **Files Affected**:
    - `prisma/schema/base.prisma`
    - `prisma/schema/user.prisma`
    - `prisma/schema/publication.prisma`
    - `prisma/schema/competition.prisma`
    - `prisma/schema/payment.prisma`
- **Cleanup**: Delete `prisma/schema.prisma` after migration to the folder structure.

## 📝 Notes & Discoveries

- Ensure `DATABASE_URL` is still correctly picked up.
- All models must remain consistent with the research report documentation.
