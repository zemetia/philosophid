# Task: Move New Publication to Dedicated Page

- **Date**: 2026-03-25
- **Status**: Completed
- **Source**: User Request

## 🎯 Goal

Create a Publication Management page at `/dashboard/publication` with a list of publications (Published, In Review, Draft). The actual editor will be moved to `/dashboard/publication/new`, leaving the main dashboard cleaner with a button linking to the list.

## 📋 Implementation Checklist

### 🔍 Phase 1: Research & Discovery
- [x] Step 1.1: Audit `src/app/dashboard/page.tsx` to identify all imports and states related to `BlockEditor`.
- [x] Step 1.2: Verify layout structure for `/dashboard/publication` route and plan Next.js Link placement.

### ⚡ Phase 2: Core Implementation
- [x] Step 2.1: Create `src/app/dashboard/publication/page.tsx` component.
- [x] Step 2.2: Move `BlockEditor` dynamic import, state (`content`), and UI layout from `src/app/dashboard/page.tsx`.
- [x] Step 2.3: Refactor `src/app/dashboard/page.tsx` by removing unused imports.
- [x] Step 2.4: Introduce an "Add New Publication" button (styled with `Button` component or a clean card) linking to `/dashboard/publication`.

### ✅ Phase 3: Secondary Implementation (New Editor Route)
- [x] Step 3.1: Move editor to `/dashboard/publication/new/page.tsx`.
- [x] Step 3.2: Update `/dashboard/publication` to be the Publication List hub with tabs for (Published, In Review, Draft).
- [x] Step 3.3: Link "Add New Publication" button correctly.

## 🛠️ Technical Details

- **Files affected**: 
  - `src/app/dashboard/page.tsx`
  - `src/app/dashboard/publication/page.tsx`
  - `src/app/dashboard/publication/new/page.tsx`

## 📝 Notes & Discoveries
- Redirected the strategy: `/dashboard/publication` will hold the list of publications, while the editor itself is nested at `/new`.
