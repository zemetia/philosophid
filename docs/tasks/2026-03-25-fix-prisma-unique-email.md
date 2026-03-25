# Task: Fix Prisma Unique Constraint Error on Sync
- **Date**: 2026-03-25
- **Status**: ✅ COMPLETED
- **Source**: User Request

## 🎯 Goal
Resolve the `PrismaClientKnownRequestError` (Code P2002) which indicates a unique constraint violation on the `email` field when calling `prisma.user.upsert` during the Firebase user sync process. 

## 📋 Implementation Checklist

- [x] **Phase 1: Research & Discovery**
  - [x] Step 1.1: Analyze the error logs and `UserService.syncUserWithDatabase` in `src/lib/services/user-service.ts`.
  - [x] Step 1.2: Identify the logic flaw: `upsert` by `firebaseUid` tries to create a new record if `firebaseUid` is not found, but fails if the provided `email` already exists under a different `firebaseUid` (e.g., due to account linking or multiple Firebase accounts with the same email).
- [x] **Phase 2: Core Implementation**
  - [x] Step 2.1: Refactor `syncUserWithDatabase` to handle lookup by both `firebaseUid` and `email`.
  - [x] Step 2.2: Implement logic: Find user by `firebaseUid`. If not found, fall back to finding by `email`. 
  - [x] Step 2.3: If a user is found (by either), `update` the user (and synchronize the `firebaseUid` if matched by email). If completely not found, `create` a new record.
- [x] **Phase 3: Testing & Verification**
  - [x] Step 3.1: Trigger a sync or login event.
  - [x] Step 3.2: Verify no P2002 errors are thrown in the server logs.
  - [x] Step 3.3: Ensure the returned user has the expected synchronized data.

## 🛠️ Technical Details
- Files affected: `src/lib/services/user-service.ts`
- Dependencies: `@prisma/client`

## 📝 Notes & Discoveries
- Error is likely appearing because a Google sign-in and an Email/Password sign-in might result in different `firebaseUid`s for the same email address, or during database migrations.
