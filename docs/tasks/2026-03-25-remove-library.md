# Task: Remove Library from Dashboard

- **Date**: 2026-03-25
- **Status**: In Progress
- **Source**: [docs/tasks/25-03-2026.md](file:///d:/Kerja/Philosophid/Website/docs/tasks/25-03-2026.md)

## 🎯 Goal

Remove all "Library" (also known as "Papers" in some contexts) references and components from the dashboard to streamline the user interface, following the shift towards the "Publication" feature as the main management hub.

## 📋 Implementation Checklist

### Phase 1: Sidebar Cleanup
- [x] **Step 1.1: Remove Library from Sidebar Navigation**
  - Modify `src/components/organisms/Sidebar.tsx` to remove the `Library` item from the `NAV_ITEMS` array.
  - *Verification*: Sidebar should no longer show the "Library" menu item.

### Phase 2: Dashboard Home Cleanup
- [x] **Step 2.1: Remove Library Overview Widget**
  - Modify `src/app/dashboard/page.tsx` to remove the `Library Overview Widget` component/section.
  - *Verification*: The dashboard home page should only show "Recent Activity Widget" or other remaining widgets.

### Phase 3: Competition Page Cleanup
- [x] **Step 3.1: Remove "View My Papers" button**
  - Modify `src/app/dashboard/competition/page.tsx` to remove the button that points to `/dashboard/library`.
  - *Verification*: The competition page should no longer have the "View My Papers" button.

### Phase 4: Redundancy Removal
- [x] **Step 4.1: Delete `/dashboard/papers` directory**
  - Remove the directory `src/app/dashboard/papers` containing the old repository/archive logic.
  - *Verification*: Routes like `/dashboard/papers` should return a 404 or be inaccessible.

## 🛠️ Technical Details

- **Files affected**:
  - `src/components/organisms/Sidebar.tsx`
  - `src/app/dashboard/page.tsx`
  - `src/app/dashboard/competition/page.tsx`
  - `src/app/dashboard/papers` (Delete)
- **Dependencies**: Lucide icons `BookOpen` (might still be used elsewhere).

## 📝 Notes & Discoveries

- "Library" in the sidebar was pointing to `/dashboard/library`, but that route didn't exist; the actual implementation was in `/dashboard/papers`.
- The public `/papers` route (Discovery Feed) will remain untouched as it serves a different purpose than the dashboard management view.
- The `publication` feature is now the designated area for managing articles, short stories, and long essays.
