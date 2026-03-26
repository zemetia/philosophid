# Implementation Plan: Move User Profile to Dynamic Public Route `/[username]`

- **Date**: 2026-03-25
- **Task**: No. 6 from [25-03-2026.md](file:///d:/Kerja/Philosophid/Website/docs/tasks/25-03-2026.md)
- **Status**: Ready for Implementation (Plan Phase)

## 🎯 Goal

Transition the current user profile from a private dashboard route (`/dashboard/profile`) to a public-facing dynamic route (`/[username]`). This involves making profiles accessible to anyone while ensuring only the profile owner can edit their information.

---

## 📋 Implementation Checklist

### Phase 1: Research & Discovery
- [ ] **Step 1.1: Verify Prisma Client & Database**
  - [ ] Run `npx prisma generate` to ensure `username` is available in the Prisma Client.
  - [ ] Verify if any users already have `username` populated in the database.
- [ ] **Step 1.2: Map Navigation References**
  - [ ] Identify all components (Sidebar, Navbar, UserMenu) that link to `/dashboard/profile`.
- [ ] **Step 1.3: Define Ownership Verification Strategy**
  - [ ] Plan how to check if the current logged-in user (from Firebase/Session) matches the `username` in the URL.

### Phase 2: Backend Enhancement (`src/lib/services/user-service.ts` & API)
- [ ] **Step 2.1: Add `getUserByByUsername` to `UserService`**
  - [ ] Implement a method that fetches the full user profile (including papers, badges, etc.) using `prisma.user.findUnique({ where: { username } })`.
- [ ] **Step 2.2: Update Profile API or Create New Endpoint**
  - [ ] Modify `src/app/api/user/profile/route.ts` OR create a new endpoint at `src/app/api/user/public/[username]/route.ts` that allows GET requests without requiring authentication (public access).
  - [ ] Ensure specific sensitive data (e.g. `phone`, `email` if private) is omitted for public views if necessary.
- [ ] **Step 2.3: Update User Sync Logic**
  - [ ] (If needed) Ensure `username` can be updated via the existing `PATCH /api/user/profile` endpoint.

### Phase 3: Frontend Implementation (`src/app/[username]/page.tsx`)
- [ ] **Step 3.1: Create the Dynamic Route**
  - [ ] Create folder `src/app/[username]/` and `page.tsx`.
- [ ] **Step 3.2: Port Profile Logic & UI**
  - [ ] Move the UI logic from `src/app/dashboard/profile/page.tsx` to the new dynamic route.
  - [ ] Update data fetching to use the `username` from route parameters.
- [ ] **Step 3.3: Implement Conditional Editing**
  - [ ] Add a check: `isOwner = (session.user.username === params.username)`.
  - [ ] Show/Hide the "Edit Profile" button and the floating "Save Bar" based on `isOwner`.
- [ ] **Step 3.4: Handle "User Not Found"**
  - [ ] Display a "Philosopher Not Found" or 404 state if the username doesn't exist in the database.

### Phase 4: Cleanup & Redirection
- [ ] **Step 4.1: Update Navigation Links**
  - [ ] Replace all links to `/dashboard/profile` with `/@${username}` or `/${username}`.
- [ ] **Step 4.2: Remove Old Dashboard Profile**
  - [ ] Delete `src/app/dashboard/profile/page.tsx` once the new route is verified.
- [ ] **Step 4.3: Implement Optional Redirect**
  - [ ] Create a trivial `src/app/dashboard/profile/page.tsx` that redirects to the current user's profile path as a fallback.

### Phase 5: Verification & Testing
- [ ] **Step 5.1: Owner Test**
  - [ ] Log in as User A, visit `/[username-a]`. Verify "Edit Profile" is visible and functional.
- [ ] **Step 5.2: Public Test**
  - [ ] Visit `/[username-a]` as an unauthenticated guest. Verify "Edit Profile" is hidden.
- [ ] **Step 5.3: Other User Test**
  - [ ] Log in as User B, visit `/[username-a]`. Verify "Edit Profile" is hidden.
- [ ] **Step 5.4: Missing Username Test**
  - [ ] Test the behavior for users who haven't set a username yet.

---

## 🛠️ Technical Details

- **Files affected**:
  - `src/lib/services/user-service.ts`
  - `src/app/api/user/profile/route.ts`
  - `src/app/[username]/page.tsx` (New)
  - `src/app/dashboard/profile/page.tsx` (Remove)
  - `src/components/navigation/*` (Update links)
- **Dependencies**: Next.js App Router (Dynamic Routes), Prisma Client.

## 📝 Notes & Discoveries

- Since `username` is nullable in Prisma, we need to decide what to do for users without one. A common pattern is to either redirect them to a "set username" page on their first dashboard visit or use their `id` as a fallback (though `username` is preferred for URLs).
- Prisma's `prismaSchemaFolder` preview feature is active, so any changes to `prisma/schema/user.prisma` are automatically consolidated.
