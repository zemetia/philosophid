# Task: User System Enhancement (Task #1)

- **Date**: 2026-03-16
- **Status**: Backend Complete (Phases 1-4)
- **Source**: [docs/tasks/16-03-2026.md](file:///d:/Kerja/Philosophid/Website/docs/tasks/16-03-2026.md) (Task #1)

## 🎯 Goal

Enhance the User system to support:
1. Joining 3 types of competitions (integrated with papers and payments).
2. Posting standalone content (Article, Short Story, Long Essay) without competition involvement.
3. A scoring/contribution system based on user activities.
4. An automated Badge system for achievements.
5. User analytics for tracking performance and contributions.

## 📋 Implementation Checklist

### Phase 1: Research & Discovery
- [x] **Step 1.1**: Define "3 Types" of Competitions. 
    - *Mapping*: Mapping to `ARTICLE`, `SHORT_STORY`, `LONG_ESSAY`.
- [x] **Step 1.2**: Define Scoring Rules.
    - *Implemented*: +10 (Post), +20 (Join Competition), +50 (Win - Placeholder).
- [x] **Step 1.3**: Define Initial Badges.
    - *Implemented*: "First Word", "Prolific Writer", "Philosopher's Stone".

### Phase 2: Database Schema Update
- [x] **Step 2.1**: Update `Competition` model.
    - Add `type` (PaperType enum).
    - Add `isActive` boolean.
- [x] **Step 2.2**: Add `Badge` and `UserBadge` models.
- [x] **Step 2.3**: Update `User` model to include `score` (Int) and link to `UserBadge`.
- [x] **Step 2.4**: Run `npx prisma migrate dev` and generate client.

### Phase 3: Service Layer Implementation
- [x] **Step 3.1**: Create `src/lib/services/paper-service.ts`.
    - Function to create paper (standalone vs entry).
    - Function to handle competition enrollment logic.
- [x] **Step 3.2**: Create `src/lib/services/score-service.ts`.
    - Atomic functions to increment user score.
- [x] **Step 3.3**: Create `src/lib/services/badge-service.ts`.
    - Logic to check and award badges based on triggers.

### Phase 4: API Endpoint Development
- [x] **Step 4.1**: Refactor `POST /api/papers`.
    - Handle `isCompetitionEntry` flag.
    - Handle `competitionId`.
    - Integrate with `Transaction` if competition has a `fee`.
- [x] **Step 4.2**: Create `GET /api/user/analytics`.
    - Return stats: count of papers by type, total score, competition wins.
- [x] **Step 4.3**: Create `GET /api/user/badges`.
    - Return list of badges owned by the user.

### Phase 5: Testing & Verification
- [ ] **Step 5.1**: Verify standalone post creation (no competition linked).
- [ ] **Step 5.2**: Verify competition join flow (with payment if necessary).
- [ ] **Step 5.3**: Audit score increments for various actions.
- [ ] **Step 5.4**: Verify badge unlocking after meeting criteria.
- [ ] **Step 5.5**: Check analytics aggregation results.

## 🛠️ Technical Details

- **Files affected**:
    - `prisma/schema.prisma`
    - `src/app/api/papers/route.ts`
    - `src/lib/services/*` (New)
    - `src/app/api/user/analytics/route.ts` (New)
    - `src/app/api/user/badges/route.ts` (New)
- **Dependencies**: Prisma, Next.js, Midtrans (for paid competitions).

## 📝 Notes & Discoveries

- The current `Paper` model already supports `PaperType` (Article, Short Story, Long Essay).
- `CompetitionEntry` already has a `transactionId`, which is good for payment integration.
- `ScoreService` uses Prisma atomic `increment` for safe scoring.
- `BadgeService` uses a multi-stage check (Find/Create Badge -> Verify User Criteria -> Award).
- Initial Badges implemented:
  - **First Word**: >= 1 paper.
  - **Prolific Writer**: >= 5 papers.
  - **Philosopher's Stone**: >= 100 contribution points.
