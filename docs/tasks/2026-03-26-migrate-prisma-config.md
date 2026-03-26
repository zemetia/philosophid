# Task: Migrate Prisma Config to prisma.config.ts

- **Date**: 2026-03-26
- **Status**: Planned
- **Source**: User request based on Prisma 7 deprecation warning

## 🎯 Goal

Resolve the deprecation warning: `The configuration property package.json#prisma is deprecated and will be removed in Prisma 7`. This involves moving the database configuration (seeding and schema location) to a modern `prisma.config.ts` file.

## 📋 Implementation Checklist

### Phase 1: Preparation & Dependency Alignment
- [ ] **Step 1.1: Install `prisma` as a devDependency**
  - Current usage relies on `npx prisma`, but a `prisma.config.ts` file requires the `prisma` package for type safety and `defineConfig` utility.
  - Command: `npm install -D prisma@latest`
- [ ] **Step 1.2: Research `prisma/config` Availability**
  - Verify that `prisma/config` export exists in the installed version (Prisma 5.15+).
- [ ] **Step 1.3: Audit Current Scripts**
  - Map out all current scripts in `package.json` that use `--schema=prisma/schema/base.prisma`.

### Phase 2: Create Prisma Configuration File
- [ ] **Step 2.1: Initialize `prisma.config.ts`**
  - Create the file in the project root.
- [ ] **Step 2.2: Configure Multi-File Schema Support**
  - Set `schema` property to `"prisma/schema/base.prisma"`.
  - *Note*: Ensure it aligns with the `prismaSchemaFolder` preview feature enabled in `base.prisma`.
- [ ] **Step 2.3: Port Seeding Configuration**
  - Set `migrations.seed` to `"tsx prisma/seed.ts"`.
- [ ] **Step 2.4: Configure Datasource & Env**
  - Use `dotenv/config` to ensure environment variables are loaded.
  - Use `env("DATABASE_URL")` helper for the datasource URL.

### Phase 3: Refactor & Cleanup
- [ ] **Step 3.1: Clean up `package.json`**
  - Remove the `"prisma"` object:
    ```json
    "prisma": {
      "seed": "tsx prisma/seed.ts"
    }
    ```
- [ ] **Step 3.2: Simplify CLI Scripts**
  - Update `db:push`, `db:migrate`, and `db:seed` to remove the redundant `--schema` flag:
    - `"db:push": "npx prisma db push"`
    - `"db:migrate": "npx prisma migrate dev"`
    - `"db:seed": "npx prisma db seed"`

### Phase 4: Verification & Validation
- [ ] **Step 4.1: Validate Configuration**
  - Run `npx prisma validate` to ensure the new config is detected and valid.
- [ ] **Step 4.2: Verify Database Synchronization**
  - Run `npx prisma db push --preview-feature` (if needed) or standard `npx prisma db push` to verify schema resolution.
- [ ] **Step 4.3: Verify Seeding**
  - Run `npx prisma db seed` to confirm the seed script executes correctly from the new config location.
- [ ] **Step 4.4: Check for Warnings**
  - Confirm the deprecation warning NO LONGER appears in the console.

## 🛠️ Technical Details

- **Files affected**:
  - `package.json`
  - `prisma.config.ts` (new)
- **Dependencies**:
  - `prisma` (to be added to devDeps)
  - `tsx` (already present)
  - `dotenv` (assumed standard or used via `prisma/config`)

## 📝 Notes & Discoveries

- The project uses `prismaSchemaFolder` preview feature. The config file must correctly point to the base file that initializes this feature.
- Using `prisma.config.ts` allows us to remove boilerplates from `package.json` scripts, making the workflow cleaner.
