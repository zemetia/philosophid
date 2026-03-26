# Task: Fix Build Failures and Major System Bugs

- **Date**: 2026-03-26
- **Status**: ✅ Completed
- **Source**: USER_REQUEST

## 🎯 Goal

Ensure the project can successfully run `npm run build` and resolve all major module resolution and dependency issues identified during the build process.

## 📋 Implementation Checklist

- [x] **Phase 1: Dependency & Environment Audit**
    - [x] 1.1: Install missing Mantine dependencies required by BlockNote (`@mantine/core`, `@mantine/hooks`, etc.)
    - [x] 1.2: Run `npx prisma generate` to ensure the Prisma client is up to date.
    - [x] 1.3: Verify all imports and module resolution paths.

- [x] **Phase 2: Resolving Module Resolution Errors**
    - [x] 2.1: Fixed stale `CompetitionService` imports across 3 routes → migrated to `competitionService` from `@/backend/services/competition.service`.
    - [x] 2.2: Fixed `competitions/[id]/route.ts` — old class import and non-Promise params type.
    - [x] 2.3: Fixed `competitions/[id]/enter/route.ts` — same stale import.
    - [x] 2.4: Fixed `competitions/[id]/entries/[entryId]/route.ts` — same stale import.

- [x] **Phase 3: TypeScript Type Errors**
    - [x] 3.1: Removed non-existent `age` field from `user-service.ts` getUserProfile select and syncUserWithDatabase.
    - [x] 3.2: Fixed `paper-service.ts` — invalid `role: { select: { role: true } }` on Paper model (Paper has no `role` relation).
    - [x] 3.3: Fixed `auth.middleware.ts` — changed `AuthenticatedHandler` return type to `Promise<Response>` to match Next.js 16 route handler type.
    - [x] 3.4: Fixed `ReferenceManager.tsx` — replaced `Object.values(ReferenceSourceType)` with explicit `REFERENCE_SOURCE_TYPES` array, added explicit generic type to `useState<formData>`.

- [x] **Phase 4: Firebase Admin Build Crash**
    - [x] 4.1: Rewrote `firebase-admin.ts` — moved all initialization inside a lazy `getAdminApp()` function with full try/catch (returns `null` on failure).
    - [x] 4.2: Made `adminAuth`, `adminDb`, `adminStorage` use `Proxy` pattern so they only initialize on first property access.
    - [x] 4.3: Added `export const dynamic = 'force-dynamic'` to `/api/auth/me` and `/api/auth/sync` routes.
    - [x] 4.4: Added `export const dynamic = 'force-dynamic'` to `dashboard/layout.tsx` to prevent static pre-render of all dashboard pages at build time.

- [x] **Phase 5: Final Verification**
    - [x] 5.1: `npm run build` exits with code 0 — build successful ✅

## 🛠️ Technical Details

- **Files affected**:
    - `src/lib/firebase-admin.ts`
    - `src/lib/services/user-service.ts`
    - `src/lib/services/paper-service.ts`
    - `src/backend/middleware/auth.middleware.ts`
    - `src/components/organisms/ReferenceManager.tsx`
    - `src/app/api/competitions/[id]/route.ts`
    - `src/app/api/competitions/[id]/enter/route.ts`
    - `src/app/api/competitions/[id]/entries/[entryId]/route.ts`
    - `src/app/api/auth/me/route.ts`
    - `src/app/api/auth/sync/route.ts`
    - `src/app/dashboard/layout.tsx`
    - `package.json` (added @mantine/core, @mantine/hooks, @emotion/react, @emotion/styled)

## 📝 Notes & Discoveries

- Next.js 16 with Turbopack runs Firebase Admin initialization during "Collecting page data" — any top-level firebase-admin calls crash the build. Lazy initialization + Proxy pattern is the correct fix.
- `Object.values(EnumType)` from Prisma doesn't work reliably in TypeScript strict mode — always use explicit arrays.
- `export const dynamic = 'force-dynamic'` on the dashboard layout propagates to all nested dashboard pages.
- The old `@/lib/services/competition-service.ts` was a leftover from before the backend refactor — all routes needed to point to `@/backend/services/competition.service`.
