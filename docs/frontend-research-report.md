# Frontend Research Report: Dashboard Setup

## Objective

To create a simple, consistent dashboard layout for Philoshopid, adhering to the "Classical Brutalism" design language. The dashboard will feature a sidebar navigation and a main content area.

## Proposed Components

### 1. Sidebar (`src/components/organisms/Sidebar.tsx`)

**Purpose**: Primary navigation for the dashboard area.

- **Structure**:
  - **Container**: Fixed width (e.g., `w-64`), full height (`min-h-screen`), sticky positioning.
  - **Content**: A vertical list of navigation links.
  - **Links**:
    - Library
    - Profile
    - Publication
    - Stats

- **Design & Styling**:
  - **Background**: Warm Paper Cream (`#F4F2ED`), matching the global theme.
  - **Border**: A subtle right border (`border-r border-black/5`) to separate it from the content.
  - **Typography**: Use **Space Grotesk** (`font-ui`) via the existing `MetaText` style or similar custom styling.
    - _Text Style_: Uppercase, bold, wide tracking (`0.3em`).
    - _Size_: Small (approx `10px` or `text-xs`).
  - **Interactions**:
    - _Hover_: Text turns black (or dark grey if defaulting to lighter).
    - _Active_: Solid black underline or opacity change to indicate current page.
  - **Padding**: Generous vertical spacing between links (`gap-8`) to maintain the "breathable" aesthetic.

### 2. Dashboard Template (`src/components/templates/DashboardTemplate.tsx`)

**Purpose**: The layout wrapper for all dashboard-related pages.

- **Structure**:
  - **Layout**: A flex container (`flex flex-row`).
  - **Left Column**: Renders the `Sidebar` component.
  - **Right Column**: Renders the dynamic `children` (page content).

- **Design & Styling**:
  - **Content Area**:
    - `flex-1` to take up remaining width.
    - **Padding**: Strict adherence to "Strict Rule 3: Padding is king". Use `p-12` or `p-24` to create negative space around the content.
    - **Background**: Same global background (`#F4F2ED`) with the shared noise overlay (from `globals.css` or `RootLayout`).

## Implementation Strategy

1.  **Reuse Existing Atoms**:
    - Use `MetaText` from `src/components/atoms/Typography.tsx` for sidebar links to ensure font consistency.
    - Use `Logo` from `src/components/atoms/Logo.tsx` at the top of the Sidebar if branding is desired within the dashboard view.

2.  **Consistency Check**:
    - Ensure no default shadows are used (Strict Rule 1).
    - Ensure all text adheres to the `Space Grotesk` (headers/ui) and `Literata` (body) distinction.

3.  **Routing**:
    - The `DashboardTemplate` will likely wrap pages within a `(dashboard)` route group (e.g., `src/app/dashboard/layout.tsx`) to isolate the dashboard layout from the public marketing pages.
