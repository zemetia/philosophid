# Philoshopid - Frontend Design & Implementation Guideline

## 1. Overview
*   **Goal**: To present a digital platform for "Philoshopid - Rational Clarity," specifically tailored for intellectual discourse, article archiving, and philosophical competitions.
*   **Aesthetic Theme**: **Classical Brutalism**. A synthesis of raw structural brutalism (lines, borders, grids) with the profound stillness of classical thought (Greek statues, serif typography, cream backgrounds).
*   **Key Design Principles**:
    *   **Intellectual Rigor**: High contrast, precise typography, vertical text.
    *   **Timelessness**: Noise overlays, monochrome + muted accent colors.
    *   **Dynamic Stillness**: GSAP-driven parallax and smooth reveals against a static grid.

## 2. Design System & Styling
### Color Palette
*   **Background (Canvas)**: `bg-[#F4F2ED]` (variable `--bg-base`) - A warm, paper-like cream.
*   **Primary Text**: `text-[#121212]` (variable `--text-primary`) - Near black for harsh contrast.
*   **Accents**:
    *   **Aegean Blue**: `#4E6E81` (variable `--aegean-blue`) - Used for selections or rigorous highlights.
    *   **Stone Grey**: `#8E8E8E` (variable `--stone`) - Used for inactive states, metadata.
*   **Borders**: `#000000` or `black/5` for grid lines.

### Typography
*   **Primary (UI/Headings)**: **Space Grotesk** (`font-ui`, `var(--font-space-grotesk)`)
    *   *Usage*: Navigation, Buttons, Massive Headers, Labels.
    *   *Style*: Often Uppercase, `tracking-[0.3em]` to `tracking-[0.5em]`.
*   **Secondary (Body/Content)**: **Literata** (`font-serif`, `var(--font-literata)`)
    *   *Usage*: Long-form text, quotes, philosophical prose.
    *   *Style*: Italicized for emphasis, `leading-relaxed`.

### Visual Effects & Textures
*   **Noise Overlay**: A fixed `opacity-0.04` noise filter applied globally via `.noise-overlay`.
*   **Grid Pattern**: Background uses `.grid-pattern` (linear gradient grid 60x60px).
*   **Brutalist Borders**: Default components use `border-2 border-black`.
*   **Masking**: Images often have `mask-image: linear-gradient(...)` to blend into the cream background.

## 3. Component Standards
### Buttons & Interactions
*   **Primary Button**:
    ```jsx
    <button className="group relative px-6 py-3 border-2 border-black overflow-hidden bg-transparent transition-colors duration-500 hover:text-white">
      <div className="absolute inset-0 bg-black translate-y-full transition-transform duration-500 group-hover:translate-y-0 -z-10"></div>
      <span className="text-[10px] uppercase font-bold tracking-[0.3em]">Label</span>
    </button>
    ```
*   **Navigation Links**:
    *   Font: `Space Grotesk`, `text-[10px]`, `uppercase`, `tracking-[0.3em]`.
    *   Active State: `border-b border-black`.
    *   Hover: `text-black` (from grey).

### Layout Patterns
*   **Grid Layouts**: Use `grid-cols-12` for strict alignment.
*   **Dividers**: Thin `1px` lines (`bg-black/5`) spanning the full viewport width/height.
*   **Vertical Text**: Used for sidebars/labels. Class `.vertical-text` (`writing-mode: vertical-rl`).

## 4. Animation Guidelines (GSAP)
*   **Library**: `gsap` with `ScrollTrigger`.
*   **Standard Reveal**: `gsap.from(target, { opacity: 0, y: 40, stagger: 0.15, duration: 1.2, ease: 'power3.out' })`.
*   **Parallax**: Use `scrub: true` on background elements and large text.
*   **Classes**: Use `.reveal-element` for items intended to be animated on entry.

## 5. Implementation Rules for Agents
When creating new pages or components, follow these strict rules:
1.  **Always** wrap the page content in the standard grid background if applicable.
2.  **Typography**: Never use default sans-serif. Use `font-ui` for structure, `font-serif` for thought.
3.  **Spacing**: Use massive padding (`py-24`, `p-12`) to allow the design to breathe.
4.  **Icons**: Use SVG icons with thin strokes (`strokeWidth="2.5"` or less) to match the fine lines of the grid.
5.  **Images**: Apply `grayscale` and `contrast-[1.1]` to images to fit the monochrome aesthetic unless color is critically needed.

## 6. Project Structure References
*   `src/app/globals.css`: Contains CSS variables and base texture classes.
*   `src/components/Hero.tsx`: Reference for GSAP animation implementation.
*   `src/components/Navigation.tsx`: Reference for sticky header and link styles.
