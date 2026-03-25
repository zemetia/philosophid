# Task: BlockNote JS Editor Implementation

- **Date**: 2026-03-16
- **Status**: In Progress
- **Source**: [16-03-2026.md](file:///d:/Kerja/Philosophid/Website/docs/tasks/16-03-2026.md) (Item #2)

## 🎯 Goal

Implement a robust, aesthetically pleasing, and feature-rich block-based text editor using BlockNote JS. 
The editor will be the primary tool for users to write articles, long essays, and short stories, supporting rich text, images, and structured content that persists to the database.

## 📋 Implementation Checklist

### Phase 1: Research & Discovery
- [x] **Step 1.1: Environment Setup & Version Check**
  - Verify `@blocknote/core`, `@blocknote/react`, and `@blocknote/mantine` versions in `package.json`.
  - Ensure compatibility with React 19 and Next.js 16.
- [x] **Step 1.2: Style Audit**
  - Analyzed "Brutalist" design language: `#F4F2ED` background, `Literata` and `Space Grotesk` fonts, sharp borders.
  - Identified existing CSS overrides for BlockNote.

### Phase 2: Core Implementation
- [x] **Step 2.1: Enhance Base BlockEditor Component**
  - [x] Refactor `src/components/organisms/BlockEditor.tsx` to handle `Json` input/output correctly.
  - [x] Implement a "Brutalist" theme with heavy shadows (`8px 8px 0px 0px #000`) and sharp borders.
  - [x] Added a live Word Counter and Mode indicator.
  - [x] Integrated "Brutalist" CSS overrides for internal BlockNote components (menus, toolbars).
- [x] **Step 2.2: Image Upload Integration**
  - [x] Implement a `uploadFile` handler for BlockNote using `/api/upload`.
  - [x] Successfully linked editor with local storage upload route.
- [x] **Step 2.3: Toolbar & Menu Customization**
  - [x] Customized the slash menu and formatting toolbar via deep CSS overrides in `globals.css`.
  - [x] Ensured sharp, rectangular aesthetics for all popups and active states.
- [x] **Step 2.4: Interactive Features**
  - [x] Added a live word counter to the editor header.
  - [x] Implemented a pulse-animated "Autosaved" indicator.
  - [x] Added GSAP entrance animations for a "premium" component feel.

### Phase 3: Testing & Verification
- [x] **Step 3.1: Content Serialization Testing**
  - [x] Refactored types to handle JSON objects directly (compatible with Prisma and BlockNote).
  - [x] Verified data flow from editor to parent component.
- [x] **Step 3.2: Mobile Responsiveness**
  - [x] Added responsive padding and flexible header layouts.
  - [x] Implemented scale-down logic for shadows on mobile devices.
- [x] **Step 3.3: Final Visual Polish**
  - [x] Refined typography (Literata and Space Grotesk integration).
  - [x] Balanced line heights and margins for a "premium" essay feel.
- [x] **Step 3.4: Definition of Done Audit**
  - [x] Verified Brutalist theme: Heavy shadows and sharp borders applied correctly.
  - [x] Verified Image Upload: Successfully integrated with local `/api/upload`.
  - [x] Verified Read-only mode: Header switches to "Reader Mode" and editing is disabled.

## 🛠️ Technical Details

- **Files affected**: 
  - `src/components/organisms/BlockEditor.tsx`
  - `src/app/globals.css` (for global editor styling overrides)
- **Dependencies**: 
  - `@blocknote/react`
  - `@blocknote/mantine`
  - `gsap` (for animations)
- **Schema Reference**: 
  - `Paper.content` (Json)

## 📝 Notes & Discoveries

- Current `BlockEditor.tsx` is very basic and needs a lot of work to feel "premium".
- BlockNote 0.46.1 uses Mantine for its default components, which might need specific CSS overrides to fit the Brutalist theme.
- The `Json` type in Prisma is an array of objects for BlockNote; ensure the frontend handles this mapping without type errors.
