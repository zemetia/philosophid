# Task: Enhance Dashboard Sidebar

- **Date**: 2026-03-17
- **Status**: In Progress
- **Source**: [docs/tasks/17-03-2026.md](file:///d:/Kerja/Philosophid/Website/docs/tasks/17-03-2026.md)

## 🎯 Goal

Enhance the current sidebar in the dashboard to be more interactive, visually appealing, and collapsable. The design must remain consistent with the website's "Academic Brutalist" theme (Stone, Beige, Black, Space Grotesk).

## 📋 Implementation Checklist

### Phase 1: Preparation & Setup
- [x] **Step 1.1: Install Framer Motion**
  - Ensure `framer-motion` is installed in the project for smooth layout animations.
- [x] **Step 1.2: Research Sidebar Layout Constants**
  - Define the `EXPANDED_WIDTH` (e.g., 256px) and `COLLAPSED_WIDTH` (e.g., 80px).
- [x] **Step 1.3: Analyze Current Sidebar Usage**
  - Check where `Sidebar` is used and ensure the layout can handle a dynamic width sidebar (using `auto` or mapping the sidebar width to a CSS variable).

### Phase 2: Implementation (Core Component)
- [x] **Step 2.1: Refactor Sidebar State Management**
  - Implement a `isCollapsed` state (possibly persistent via `localStorage` or session).
  - Add a toggle button with a smooth transition (using Framer Motion).
- [x] **Step 2.2: Implement Collapsible Layout**
  - Use `motion.aside` for the sidebar container.
  - Animate width and padding changes.
  - Handle logo and text visibility during collapse (fade out text, keep minimal logo/icon).
- [x] **Step 2.3: Enhance Navigation Links**
  - Refine `NAV_ITEMS` with icons (using Lucide React or similar).
  - Add hover animations (e.g., subtle background fill or border-left).
  - Enhance "Active" state indicator.
- [x] **Step 2.4: Consistent Styling**
  - Apply `Space Grotesk` font to all UI elements.
  - Use `brutalist-border` or similar for clear delineation.
  - Maintain the `#F4F2ED` background.

### Phase 3: Integration & Polish
- [x] **Step 3.1: Update Dashboard Layout**
  - Ensure the main content area adjusts its margin/padding according to the sidebar's width.
  - Fix any z-index or overflow issues.
- [x] **Step 3.2: Mobile Responsiveness**
  - Ensure the sidebar behaves correctly on smaller screens (e.g., full-width overlay or completely hidden).
- [x] **Step 3.3: Micro-animations**
  - Add spring-based transitions for a "premium" feel.
  - Ensure hover states are responsive and snappy.

### Phase 4: Verification
- [x] **Step 4.1: Visual Audit**
  - Check consistency with the provided theme (colors, fonts).
- [x] **Step 4.2: Interaction Check**
  - Verify collapse/expand functionality.
  - Verify navigation works correctly in both states.
- [x] **Step 4.3: Accessibility Check**
  - Ensure toggle button is keyboard-accessible and has proper ARIA labels.

## 🛠️ Technical Details

- **Files affected**: 
  - `src/components/organisms/Sidebar.tsx`
  - `src/app/dashboard/layout.tsx` (to handle dynamic margin)
- **Dependencies**: 
  - `framer-motion`
  - `lucide-react` (for icons)
- **Design Tokens**:
  - Background: `#F4F2ED`
  - Stone: `#8E8E8E`
  - Border: `rgba(0,0,0,0.05)` or `2px solid #000` for brutalist effect.

## 📝 Notes & Discoveries

- The current sidebar uses `MetaText` for items. We might need to adjust `MetaText` or use raw `span` for better control over layout during collapse.
- Persisting the sidebar state across page navigation will provide a better UX.
