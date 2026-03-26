# Task: Backend Architecture Refactor (Task 11)

- **Date**: 2026-03-26
- **Status**: In Progress
- **Source**: [Task 11 in docs/tasks/25-03-2026.md](file:///d:/Kerja/Philosophid/Website/docs/tasks/25-03-2026.md#L13)

## 🎯 Goal

Refactor the existing monolithic backend logic into a clean, layered architecture consisting of **Repositories**, **Services**, and **Middlewares** within the `src/backend` directory. This will improve code reusability, testability, and scalability.

## 📋 Implementation Checklist

### Phase 1: Preparation & Base Layers
- [x] **Step 1.1: Create Middleware Layer**
  - [x] Implement `src/backend/middleware/auth.middleware.ts` for Firebase UID verification and user retrieval from DB.
  - [x] Implement `src/backend/middleware/error.middleware.ts` for standardizing API error responses.
- [x] **Step 1.2: Refine Existing Utilities**
  - [x] Align `src/lib/prisma.ts` with the new repository pattern if needed.

### Phase 2: Repository Layer (Data Access)
- [x] **Step 2.1: User Repository**
  - [x] Implement `src/backend/repositories/user.repository.ts` with methods for finding, creating, and updating users.
- [x] **Step 2.2: Paper & Publication Repository**
  - [x] Implement `src/backend/repositories/paper.repository.ts` with methods for CRUD operations on papers and publications.
- [x] **Step 2.3: Competition Repository**
  - [x] Implement `src/backend/repositories/competition.repository.ts` with methods for competition management and entry handling.
- [x] **Step 2.4: Support Repositories**
  - [x] Implement `src/backend/repositories/badge.repository.ts` and `src/backend/repositories/payment.repository.ts`.
  - [x] Ensure `src/backend/repositories/reference.repository.ts` is fully integrated.

### Phase 3: Service Layer (Business Logic)
- [x] **Step 3.1: User Service**
  - [x] Migrate logic from `src/lib/services/user-service.ts` to `src/backend/services/user.service.ts`.
  - [x] Inject `userRepository` and other necessary repos.
- [x] **Step 3.2: Paper Service**
  - [x] Migrate logic from `src/lib/services/paper-service.ts` to `src/backend/services/paper.service.ts`.
  - [x] Include paper analytics and publishing workflows.
- [x] **Step 3.3: Competition Service**
  - [x] Implement domain-specific logic for competition entries, scoring, and winners.
- [x] **Step 3.4: Payment Service**
  - [x] Migrate payment-related logic (e.g., from `src/lib/services/payment-service.ts`) to `src/backend/services/payment.service.ts`.

### Phase 4: API Routes Integration (Controllers)
- [-] **Step 4.1: Update User API Routes**
  - [x] Refactor `src/app/api/user/profile/route.ts` to use `userService` and `auth.middleware.ts`.
  - [ ] Update remaining user routes.
- [-] **Step 4.2: Update Paper API Routes**
  - [x] Refactor `src/app/api/papers/route.ts` to use `paperService`.
  - [ ] Update remaining paper routes.
- [-] **Step 4.3: Update Competition API Routes**
  - [x] Refactor `src/app/api/competitions/route.ts` to use `competitionService`.
  - [ ] Update remaining competition routes.
- [ ] **Step 4.4: Update Auth API Routes**
  - [ ] Refactor `src/app/api/auth/.../route.ts` to use new services.

### Phase 5: Verification & Cleanup
- [ ] **Step 5.1: Removal of Legacy Services**
  - [ ] Delete `src/lib/services/*.ts` once migration is complete.
- [ ] **Step 5.2: Final Audit**
  - [ ] Verify all API endpoints return the correct data structures and status codes.
  - [ ] Ensure consistent use of `@/backend` alias.

## 🛠️ Technical Details

- **Files affected**:
  - `src/backend/**/*` (New)
  - `src/app/api/**/*.ts` (Refactor)
  - `src/lib/services/*.ts` (Delete)
- **Architecture**: Controller (API Route) -> Service -> Repository -> Prisma.
- **Validation**: All service methods must use `Zod` for input validation.

## 📝 Notes & Discoveries

- The `Reference` system is already partially implemented using this pattern in `src/backend/repositories/reference.repository.ts` and `src/backend/services/reference.service.ts`.
- `auth.middleware.ts` will replace the repeated `verifyUserInDatabase` calls in each route handler.
