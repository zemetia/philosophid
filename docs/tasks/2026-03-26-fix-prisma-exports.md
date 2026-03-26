# Task: Fix Prisma Client Export Issues

- **Date**: 2026-03-26
- **Status**: In Progress
- **Source**: USER request for build failure in Vercel: `Type error: Module '"@prisma/client"' has no exported member 'TransactionStatus'`

## 🎯 Goal

Resolve all TypeScript "no exported member" errors related to Prisma enums/models in the production build (Vercel) and local environment.

## 📋 Implementation Checklist

- [x] **Phase 1: Research & Discovery**
  - [x] Step 1.1: Verify if `TransactionStatus` exists in modular schema (`prisma/schema/payment.prisma`). (Result: Yes, it exists).
  - [x] Step 1.2: Check `base.prisma` for correct generator and preview features. (Result: Missing `prismaSchemaFolder`).
  - [x] Step 1.3: Analyze `package.json` build scripts. (Result: `next build` lacks explicit `prisma generate`).
- [ ] **Phase 2: Core Implementation**
  - [x] Step 2.1: Add `previewFeatures = ["prismaSchemaFolder"]` to `prisma/schema/base.prisma` to ensure all split files are bridged.
  - [x] Step 2.2: Update `package.json` to include `npx prisma generate` in the `build` script for Vercel.
  - [ ] Step 2.3: Verify other split schemas for potential naming conflicts or lack of enums.
  - [ ] Step 2.4: Check for presence of `dist` or stale `.prisma` folders in `node_modules` (Local Cleanup).
- [ ] **Phase 3: Testing & Verification**
  - [ ] Step 3.1: Run `npx prisma generate` locally and verify success.
  - [ ] Step 3.2: Check `node_modules/.prisma/client/index.d.ts` for presence of `TransactionStatus`.
  - [ ] Step 3.3: (Optional/User Step) Push to branch and verify Vercel build success.

## 🛠️ Technical Details

- Files affected:
  - `prisma/schema/base.prisma`
  - `package.json`
  - `src/app/api/payment/notification/route.ts` (Already checked)
- Dependencies: `@prisma/client@^6.19.2`, `prisma@^6.19.2`

## 📝 Notes & Discoveries

- Prisma 6.x graduated `prismaSchemaFolder` to GA, but in some build environments (like Vercel), explicitly providing the flag or build script ensures the modular directory is correctly recognized.
- The `EBUSY` error locally is due to the `npm run dev` process locking the client folder. Must stop dev server for deep local cleanup if needed.
- The `prisma.config.ts` file is a very new feature (v6.2.0+) and might be part of the confusion if the CLI isn't using it consistently.
