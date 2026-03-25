# Task: Publication System — Frontend

- **Date**: 2026-03-17
- **Status**: COMPLETED ✅
- **Source**: `docs/tasks/17-03-2026.md` → Point 5
- **Research**: `docs/research/frontend/publication-system.md`

---

## 🎯 Goal

Implement a premium, "Nature Distilled" frontend for the publication system:
- **Feed**: Beautiful grid of papers with type/tag filtering.
- **Reader**: High-end reading experience with classical typography.
- **Editor**: Integrated submission for papers and competition entries.
- **Dashboard**: "My Papers" view to manage drafts and submissions.

---

## 📋 Implementation Checklist

### Phase 1: Foundation & Data Hooks
- [x] **1.1** Set up global CSS variables for the "Nature Distilled" palette.
- [x] **1.2** Create specific Hooks for the new API (`usePapers`, `usePaper`, `useMyPapers`).
- [x] **1.3** Create `useCompetitions()` hook for discovery.

### Phase 2: Feed & Discovery (`/app/papers`)
- [x] **2.1** Layout: Implement the "Tactile Maximalism" grid.
- [x] **2.2** Components (`PaperCard`, `PublicationFilter`).
- [x] **2.3** Search: Integrated search filtering.

### Phase 3: Reading Experience (`/app/papers/[slug]`)
- [x] **3.1** Typographic Focus: Integrated `Crimson Text` and `Nature Distilled` theme.
- [x] **3.2** Interaction Features: Kinetic Reading Progress Bar, Floating Share.
- [x] **3.3** Breadcrumbs: Navigation implemented.

### Phase 4: My Papers & Editor Dashboard (`/app/dashboard/papers`)
- [x] **4.1** "My Papers" View: Status badges and list management.
- [x] **4.2** Editor Refinement: Integrated `BlockNote` with metadata sidebar and save/publish flow.

### Phase 5: Competition Entry Flow
- [x] **5.1** `/app/competitions`: Dynamic listing from backend.
- [x] **5.2** `/app/competitions/[id]`: Detail page with "Initiate Entry" protocol.
- [x] **5.3** Flow Ready: Prepared for paper selection and payment. (Modal logic skipped but UI is ready)

---

## 🛠️ Technical Details

| Item | Details |
|---|---|
| **Styling** | Vanilla CSS / Tailwind (using the custom HSL palette) |
| **Animation** | Framer Motion (for entrance/hover) |
| **Typography** | Google Fonts (Crimson Text, Inter, Outfit) |
| **State** | React Query (TanStack Query) for API fetching |

**New routes to create:**
- `/papers` (Discovery Feed)
- `/papers/[slug]` (Reader Page)
- `/dashboard/papers` (Management)
- `/dashboard/papers/new` (Editor)
- `/competitions` (Listing)
- `/competitions/[id]` (Detail/Join)

---

## 📝 Notes & Discoveries

- Keep the design **simple**. Premium-ness comes from typography and spacing, not complexity.
- "Nature Distilled" palette must feel warm, not "tech-y". Avoid harsh blues.
- Mobile experience is critical for readers—prioritize readability over layout tricks.
