# Philoshopid - Frontend Design Prompt & Guideline

## 1. Context & Goal
*   **Objective**: Build a premium digital platform for "Philoshopid," facilitating philosophical inquiry, article archiving, and intellectual competitions.
*   **User Intent**: Users visit to read deep philosophical content, participate in debates (Arena), and view the Hall of Fame. The experience must feel "heavy" with thought yet "light" in motion.

## 2. Visual Style (Prompt Mode)
*   **Canvas**: Warm Paper Cream (`#F4F2ED`) with a fixed 4% noise overlay for texture. Subtle 60px grid pattern in background (opacity 0.05).
*   **Typography**:
    *   **Headings**: **Space Grotesk**. Uppercase, Massive tracking (0.3em to 0.5em), Bold. Used for structural elements (Nav, Titles).
    *   **Body**: **Literata**. Serif, Italicized for emphasis, High Line-Height for readability. Used for content and quotes.
*   **Theme**: **Classical Brutalism**. Stark contrasts (Black on Cream). High-precision borders mixed with organic classical imagery (Statues).

## 3. Layout & Structure
*   **Container**: Standard flexible container with `max-w-7xl` centered. 12-column grid system for internal alignments.
*   **Header**: Sticky top, blurred background (`backdrop-blur-md`), 1px bottom border. Logo on left, widely spaced uppercase links on right.
*   **Main Section**: Often categorized by a split view—Text/Structure on the left or overlapping, Visual/Statue on the right or center.
*   **Footer**: Minimalist 2-column grid. Left side for mission statement, right side for archival links.

## 4. Components (Descriptions Only)
*   **Primary Button**: A transparent rectangular container with a thick 2px black border. Text is small, uppercase, and widely spaced. **Interaction**: On hover, a black curtain rises from the bottom (using absolute positioning and overflow hidden) to fill the button, and text turns white.
*   **Navigation Link**: Small, uppercase, bold sans-serif text in grey. **Interaction**: Turns black on hover. Active state has a solid 1px black underline.
*   **Article Card**: A minimal container with a simple 1px border. Image is grayscale by default. **Interaction**: Hovering restores color to the image and slightly lifts the card (y: -4px).
*   **Statue Image**: Always cut out (transparent background). Must have a CSS mask applied (`mask-image: linear-gradient`) to fade the bottom 20% into the background.

## 5. Interactions & States
*   **Normal State**: Static elements are sharp, high contrast.
*   **Hover Effects**: Buttons fill with ink (black). Links sharpen from grey to black.
*   **Entry Animation**: Elements do not just appear; they "Reveal". Use GSAP. Text staggers up (`y: 40px` -> `0`) while fading in.
*   **Parallax**: Large background text and central statues should move slightly slower than the scroll speed (`scrub: true`).

## 6. Logic Strategy
*   **Routing**: Standard Next.js App Router structure.
*   **State**: Use `useState` for simple UI toggles (Search Overlay). Use `GSAP` Context for complex timeline management.

## 7. Directives for Implementation
*   **Strict Rule 1**: Never use a default shadow. If depth is needed, use a hard offset border or a blurred backdrop.
*   **Strict Rule 2**: All decorative images (statues) must be `grayscale` and high contrast unless they are active content (like an article thumbnail).
*   **Strict Rule 3**: Padding is king. Use `p-12` or `p-24` to create "breathable" negative space.
