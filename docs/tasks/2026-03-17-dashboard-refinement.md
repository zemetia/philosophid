# Task: Dashboard Refinement & Profile Implementation

- **Date**: 2026-03-17
- **Status**: In Progress
- **Source**: Task 2 & 3 from `docs/tasks/17-03-2026.md`

## 🎯 Goal

Enhance the dashboard experience by:
1. Removing the global website navbar and footer from dashboard routes.
2. Implementing a premium, fully-functional profile page in the dashboard.

## 📋 Implementation Checklist

### Phase 1: Dashboard Layout Refinement (Task 2)
- [x] **1.1: Conditional Rendering in PageTemplate**
  - [x] Import `usePathname` from `next/navigation`.
  - [x] Detect route starts with `/dashboard`.
  - [x] Bypass `Navbar` and `Footer` for dashboard routes.
- [ ] **1.2: Style Verification**
  - [ ] Verify layout looks correct in browser (manual check).

### Phase 2: User Profile Backend (Task 3 Prep)
- [x] **2.1: Update Profile API**
  - [x] Added `PATCH` handler to `src/app/api/user/profile/route.ts`.
  - [x] Uses `UserService.syncUserWithDatabase` to update fields.
- [x] **2.2: User Service Expansion**
  - [x] Updated `getUserProfile` to select all Prisma fields (bio, location, institution, etc.).

### Phase 3: Profile Dashboard UI (Task 3)
- [x] **3.1: Page Structure**
  - [x] Created `src/app/dashboard/profile/page.tsx`.
- [x] **3.2: Premium UI Design**
  - [x] Header: Avatar, Name, Role, Logical Points.
  - [x] Philosophical Persona: Bio, Fav Philosopher, School of Thought.
  - [x] Academic Grounding: Institution, Major, Interests (tag display).
  - [x] Connections: Email, Instagram, LinkedIn, Phone.
  - [x] Metadata: Location, Join Date.
- [x] **3.3: Interactive Features**
  - [x] Firebase `onAuthStateChanged` for secure auth-aware fetch.
  - [x] Edit toggle + floating animated save bar (framer-motion).
  - [x] Success/error status messages.

### Phase 4: Verification
- [x] **4.1: TypeScript** — `npx tsc --noEmit` = 0 errors.
- [ ] **4.2: Layout Check** — Confirm Navbar/Footer hidden in `/dashboard`.
- [ ] **4.3: CRUD Test** — Load → Edit → Save → Verify update in browser.

## 🛠️ Technical Details

- **Files modified**:
  - `src/components/templates/PageTemplate.tsx` — conditional nav/footer
  - `src/app/api/user/profile/route.ts` — added PATCH handler
  - `src/lib/services/user-service.ts` — expanded field selection
  - `src/app/dashboard/profile/page.tsx` — new premium UI page

## 📝 Notes & Discoveries

- `score` and `UserBadge` lint errors were stale TS cache — confirmed by `tsc --noEmit` passing cleanly.
- Profile page uses `onAuthStateChanged` instead of `localStorage` for cleaner auth integration.
- Sidebar already points to `/dashboard/profile` — no changes needed there.
