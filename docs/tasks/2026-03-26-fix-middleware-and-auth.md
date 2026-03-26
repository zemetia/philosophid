# Task: Middleware & Authentication Modernization

- **Date**: 2026-03-26
- **Status**: Completed
- **Source**: USER_REQUEST

## 🎯 Goal

Address the Next.js 16 middleware deprecation, resolve dynamic routing slug conflicts in the `papers` API, and refactor the authentication system to use JWT tokens (via cookies) instead of relying on `x-firebase-uid` headers, making it more general for both Firebase and non-Firebase users.

## 📋 Implementation Checklist

- [x] **Phase 0: Planning & Initial Analysis**
  - [x] Analyze current middleware and auth logic (sign/verify).
  - [x] Confirm dynamic slug conflict between `[id]` and `[paperId]`.
  - [x] Research Next.js 16 "proxy" requirements.

- [x] **Phase 1: Route Conflict Resolution**
  - [x] Delete redundant conflicting directory `src/app/api/papers/[paperId]` (relying on `src/app/api/papers/[id]`).
  - [x] Verify `src/app/api/papers/[id]/references` and its sub-routes are fully functional.
  - [x] Ensure all dynamic route parameter names are standardized to `id`.

- [x] **Phase 2: Next.js 16 Middleware Migration**
  - [x] Rename `src/middleware.ts` to `src/proxy.ts`.
  - [x] Update `middleware` function to `proxy`.
  - [x] Update export in `src/proxy.ts` to match Next.js 16 conventions.

- [x] **Phase 3: JWT Authentication Refactor**
  - [x] Update `src/backend/middleware/auth.middleware.ts` to:
    - [x] Extract JWT from `philosophid_session` cookie.
    - [x] Verify JWT using `verifyCustomToken` from `@/lib/jwt`.
    - [x] Retrieve user from database by ID (`uid` from JWT payload).
    - [x] Remove `x-firebase-uid` header requirements.
  - [x] Update `src/lib/auth.ts`:
    - [x] Update `verifyUserInDatabase` or replace it with a more generic user verification by ID.
  - [x] Refactor API routes and frontend components:
    - [x] Identify all occurrences of `x-firebase-uid` header usage.
    - [x] Remove header sending from frontend (hooks, components).
    - [x] Update backend route handlers to use the `withAuth` middleware or updated session-based checks.

- [x] **Phase 4: Database Schema & Cleanup**
  - [x] Update `prisma/schema/user.prisma` to make `firebaseUid` optional (`String?`).
  - [x] Run `npx prisma db push` or create a migration.
  - [x] Remove dead code/unused imports related to the old auth mechanism.

## 🛠️ Technical Details

- **Files affected**:
  - `src/middleware.ts` (rename to `src/proxy.ts`)
  - `src/backend/middleware/auth.middleware.ts`
  - `src/app/api/papers/[id]/route.ts`
  - `src/app/api/papers/[paperId]/...` (delete)
  - `src/lib/auth.ts`
  - `prisma/schema/user.prisma`
  - Multiple API routes using `x-firebase-uid`
- **Dependencies**:
  - `jsonwebtoken`
  - `@prisma/client`

## 📝 Notes & Discoveries

- Next.js 16 replaces `middleware.ts` with `proxy.ts`.
- `[id]` and `[paperId]` cannot exist at the same level because they resolve to the same dynamic slot but use different identifier names.
- Since "not every user has firebaseUid", the system must rely on its own internal UUID (dbUser.id) stored in the JWT payload.
