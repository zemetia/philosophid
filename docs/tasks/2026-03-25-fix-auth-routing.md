# Task: Fix Auth Routing & Registration 401 Error

- **Date**: 2026-03-25
- **Status**: In Progress
- **Source**: USER Request

## 🎯 Goal

Resolve the 401 error on the `/register` page and fix the authentication routing logic. Ensure that fully logged-in users cannot access the login or register pages, and that the registration wizard is exclusively accessible to users who possess a valid session token but have not yet completed their profile.

## 📋 Implementation Checklist

- [x] **Phase 1: Research & Discovery**
  - [x] Step 1.1: Analyze `src/middleware.ts` to understand how `/login` and `/register` are currently handled (Currently treats them identically).
  - [x] Step 1.2: Analyze `src/app/api/auth/sync/route.ts` to see what is included in the custom JWT and why `401 Unauthorized` occurs. (Occurs because `register/page.tsx` is accessible without a token, leading to `getAuthUser` returning null).
  - [x] Step 1.3: Document the exact cause of the problem for the user.

- [x] **Phase 2: Core Implementation**
  - [x] Step 2.1: Update `src/app/api/auth/sync/route.ts` to include `isRegistered: !!dbUser.location` in the custom JWT payload.
  - [x] Step 2.2: Implement Edge-compatible base64 JWT decoding inside `src/middleware.ts` to extract `isRegistered` status without heavy external dependencies.
  - [x] Step 2.3: Modify `src/middleware.ts` routing rules to correctly enforce the auth matrix:
    - If user accesses `/login` AND has `token` -> redirect to `/dashboard`
    - If user accesses `/register` AND has NO `token` -> redirect to `/login`
    - If user accesses `/register`, HAS `token`, AND `isRegistered === true` -> redirect to `/dashboard`
    - If user accesses `/dashboard` (or other protected route), HAS `token`, but `isRegistered === false` -> redirect to `/register`
    - If user accesses `/dashboard` (or other protected route) AND has NO `token` -> redirect to `/login`
  - [x] Step 2.4: Modify `src/lib/jwt.ts` type definition to include `isRegistered` property in `CustomJwtPayload`.

- [ ] **Phase 3: Testing & Verification**
  - [ ] Step 3.1: Verify accessing `/register` without being logged in redirects to `/login` (prevents 401).
  - [ ] Step 3.2: Verify that completing Google/Email login redirects to `/register` if the user is incomplete.
  - [ ] Step 3.3: Verify that after finishing `/register`, the new token with `isRegistered: true` is issued and the user is routed to `/dashboard`.
  - [ ] Step 3.4: Verify that a fully registered user cannot access `/register` or `/login`.

## 🛠️ Technical Details

- Files affected: `src/middleware.ts`, `src/app/api/auth/sync/route.ts`, potentially `src/app/register/page.tsx`.
- The '401 Unauthorized' problem: The system currently allows unauthenticated users to open the `/register` page. When they click 'Complete Registration', the frontend `POST`s to `/api/auth/sync`. However, because the user has no session cookie (they bypassed `/login`), `getAuthUser()` on the backend returns null, throwing a `401 Unauthorized`. Furthermore, if a user *does* get a session from `/login`, the current `middleware.ts` blocks them from opening `/register` entirely!

## 📝 Notes & Discoveries

- The middleware's current logic `const isAuthPage = ...` treats both `/login` and `/register` as pages to block if a token exists. This breaks the registration flow.
- A smart routing approach inside `middleware.ts` using base64 decoding of the JWT payload will perfectly solve these requirements natively.
