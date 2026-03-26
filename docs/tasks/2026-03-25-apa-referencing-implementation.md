# Task: Automated APA Referencing System in BlockNote Editor

- **Date**: 2026-03-25
- **Status**: Planning
- **Source**: [docs/tasks/25-03-2026.md](file:///d:/Kerja/Philosophid/Website/docs/tasks/25-03-2026.md) - Task #9

## 🎯 Goal
Implement a professional-grade citation and referencing system for the publication editor that supports the **APA 7th Edition** style, allowing in-text citations and automatic bibliography generation.

## 📋 Implementation Checklist

### Phase 1: Research & Discovery (COMPLETED)
- [x] Step 1.1: Research BlockNote custom inline content extension.
- [x] Step 1.2: Research APA 7th Edition requirements for various source types.
- [x] Step 1.3: Analyze existing `Paper` model and propose `PaperReference` extensions.
- [x] Step 1.4: Document findings in [docs/research/backend/apa-referencing-system.md](file:///d:/Kerja/Philosophid/Website/docs/research/backend/apa-referencing-system.md).

### Phase 2: Backend Infrastructure
- [ ] Step 2.1: Update Prisma schema with the `PaperReference` model.
    - Add `ReferenceSourceType` enum.
    - Add `PaperReference` model with relations to `Paper`.
- [ ] Step 2.2: Generate and push database migration.
- [ ] Step 2.3: Create API endpoints for Reference management:
    - `GET /api/publication/[id]/references` - List all references for a paper.
    - `POST /api/publication/[id]/references` - Create a new reference metadata entry.
    - `PATCH /api/publication/[id]/references/[refId]` - Edit reference metadata.
    - `DELETE /api/publication/[id]/references/[refId]` - Remove a reference.
- [ ] Step 2.4: Implement validation for reference metadata (Required fields for different types).

### Phase 3: Frontend: Custom BlockNote Extension
- [ ] Step 3.1: Create custom inline content type `Citation` in `BlockEditor.tsx`.
    - Props: `referenceId`.
    - Component: Fetches reference from paper's context and renders formatted `(Author, Year)` or numbering `[X]`.
- [ ] Step 3.2: Create a "Reference Manager" side panel/modal.
    - UI to view list of references associated with the current `Paper`.
    - Form to add/edit references (Book, Journal, Web).
- [ ] Step 3.3: Extend the BlockNote slash menu and formatting toolbar.
    - Add "Insert Citation" option.
    - Open a search/selection menu to pick from existing references or add a new one.

### Phase 4: Automation: Bibliography & Sorting
- [ ] Step 4.1: Implement automatic sorting logic.
    - Alphabetical (Default APA) or Order of Appearance (Numerical).
- [ ] Step 4.2: Create a `ReferencesList` custom block type.
    - When inserted, it automatically queries all `PaperReference` entries and renders them as formatted APA bibliography entries.
- [ ] Step 4.3: Add reactive synchronization.
    - When metadata in the Reference Manager is updated, the in-text citations and bibliography should reflect changes immediately.

### Phase 5: Testing & Verification
- [ ] Step 5.1: Verify various source types (Multiple authors, different years, missing URLs).
- [ ] Step 5.2: Test concurrent citation insertion and edge cases (e.g., deleting a reference that's still cited).
- [ ] Step 5.3: Ensure responsiveness of the reference management UI on mobile/tablet.

## 🛠️ Technical Details
- **Files Affected**:
    - `prisma/schema/publication.prisma`
    - `src/components/organisms/BlockEditor.tsx`
    - New service: `src/backend/services/reference.service.ts`
    - New API route: `src/app/api/publication/[id]/references/route.ts`
- **Dependencies**:
    - `citation-js` (or similar formatting utility)
    - `zod` for validation
    - `framer-motion` for side panel animations

## 📝 Notes & Discoveries
- APA 7th Edition has specific rules for direct quotes vs. general citations. Consider adding an optional `pageNumber` prop to the `Citation` inline content for quotes.
- Handling "automatically numbering" while maintaining APA sorting rules might be tricky if the user wants true numbering (Vancouver style). We should ensure both options are conceptually supported.
