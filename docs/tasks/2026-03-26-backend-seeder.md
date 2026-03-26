# Task: Secure Backend Database Seeder (Task #10)

- **Date**: 2026-03-26
- **Status**: Completed
- **Corpus**: `zemetia/philosophid`
- **Source**: `docs/tasks/25-03-2026.md` (Task #10)

## 🎯 Goal
Implement a robust, idempotent database seeder for the Philosophid platform to pre-populate critical administrative roles and dummy accounts with secure, bcrypt-encrypted passwords, compatible with the modular Prisma architecture.

## 📋 Implementation Checklist

### 🔍 Phase 1: Research & Discovery
- [x] **Step 1.1: Dependency Analysis**  
    - Research if `bcryptjs` or `bcrypt` is more appropriate for the current environment (Windows dev).  
    - *Definition of Done*: `bcryptjs` chosen for cross-platform compatibility.
- [x] **Step 1.2: Prisma Seeding Mechanism**  
    - Verify how `npx prisma db seed` interacts with `prismaSchemaFolder`. Determine if any special configuration is needed in `package.json`.  
    - *Definition of Done*: Confirmed seeding command that works with the modular schema.
- [x] **Step 1.3: User Field Requirements**  
    - Inspect `prisma/schema/user.prisma` for critical fields (like `firebaseUid`, `onboardingCompleted`) that must be populated to avoid runtime errors.  
    - *Definition of Done*: List of required fields for seeder users compiled.

### 🛠️ Phase 2: Setup & Schema Refactoring
- [x] **Step 2.1: Dependency Installation**  
    - Install `bcryptjs`, `@types/bcryptjs`, and ensure `tsx` is available for running the TypeScript seeder.  
    - *Definition of Done*: `node_modules` updated and `package.json` reflects dependencies.
- [x] **Step 2.2: Schema Update (Password Support)**  
    - Modify `prisma/schema/user.prisma` to include an optional `password` field (`String?`). Note: This is required as currently the model only supports Firebase UID.  
    - *Definition of Done*: Schema modified and `npx prisma db push` (or migrate) successfully executed.
- [x] **Step 2.3: Package Configuration**  
    - Add `"prisma": { "seed": "tsx prisma/seed.ts" }` to `package.json`.  
    - *Definition of Done*: `package.json` configured for `npx prisma db seed`.

### 🏗️ Phase 3: Core Implementation
- [x] **Step 3.1: Seeder Boilerplate**  
    - Create `prisma/seed.ts`. Initialize `PrismaClient` and import `bcryptjs`.  
    - *Definition of Done*: File created with basic structure and client initialization.
- [x] **Step 3.2: User Data Definition**  
    - Define data objects for:
        - `super_admin`: `superadmin@philosoph.id` / `PhiloSuperAdmin1708#`  
        - `admin`: dummy account  
        - `moderator`: dummy account  
        - `judge`: dummy account  
    - *Definition of Done*: Static data objects ready for insertion.
- [x] **Step 3.3: Idempotent Seed Logic**  
    - Implement `main()` function using `prisma.user.upsert` for each user to prevent record duplication on repeated runs.  
    - *Definition of Done*: Logic handles both initial creation and subsequent updates.
- [x] **Step 3.4: Password Hashing Integration**  
    - Integrate `bcryptjs.hash()` with a salt round of 10 for all password fields.  
    - *Definition of Done*: All seeded passwords stored as hashed strings in the DB.

### 🧪 Phase 4: Testing & Verification
- [x] **Step 4.1: Dry Run & Build Check**  
    - Run `tsx prisma/seed.ts` directly to check for syntax or runtime errors.  
    - *Definition of Done*: Script runs to completion without errors.
- [x] **Step 4.2: Database Integrity Audit**  
    - Inspect the `User` table via `npx prisma studio`. Verify `role` field reflects correct enums.  
    - *Definition of Done*: Users verified as correctly instantiated in the DB.
- [x] **Step 4.3: Hashing & Security Verification**  
    - Manually check the `password` field for the `super_admin`. It must NOT be `PhiloSuperAdmin1708#`.  
    - *Definition of Done*: Cryptographic hashes confirmed for all seeded accounts.

## 🛠️ Technical Details

- **Affected Files**:
    - `prisma/schema/user.prisma`
    - `package.json`
    - `prisma/seed.ts` (new)
- **Primary Credentials**:
    - **Super Admin**: `superadmin@philosoph.id` / `PhiloSuperAdmin1708#`
- **Critical Configuration**:
    - Using `prismaSchemaFolder` preview feature.
    - Idempotency via `upsert`.

## 📝 Notes & Discoveries
- *Constraint*: `firebaseUid` must be unique. I will use `seed-[role]` as a prefix for seeded accounts.
- *Compatibility*: Setting `onboardingCompleted: true` for all seeded users to ensure they can access the dashboard immediately.
- *Future*: This seeder will serve as the template for future mock data (publications, competitions).
