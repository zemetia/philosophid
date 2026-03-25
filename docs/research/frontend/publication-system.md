# Publication System Frontend Research

## Overview
The goal is to create a premium, high-end editorial experience for philosophers. Instead of a generic "blog," we aim for a Substack/Medium hybrid but with more "classical" and "grounded" aesthetics—using muted earthy tones, exceptional typography, and smooth, purposeful micro-animations.

## Inspiration & Sources (Mandatory)

- **Medium**: [medium.com](https://medium.com) - Reference for minimalist reading UI and focus on content.
- **Substack**: [substack.com](https://substack.com) - Reference for author-centric feed and discovery.
- **Apple Editorial**: [apple.com/newsroom](https://apple.com/newsroom) - Reference for exaggerated hierarchy and hero-centric layouts.
- **Kinetic Typography Inspiration**: [lovable.dev](https://lovable.dev) - Reference for animated/responsive text that guide user eye.
- **Tactile Maximalism**: [wix.com](https://wix.com) - Design trend for symmetrical screens with asymmetrical logic.

## Design Implementation

### 1. Visual Style: "Nature Distilled" & Retro Editorial
- **Philosophy**: Classical, grounded, and intellectually stimulating.
- **Aesthetic**: Grainy background textures (subtle), bordered images, and generous white space.
- **Layering**: Use of Glassmorphism for floating UI elements (like the floating "Join Competition" button).

### 2. Color Palette (HSL Muted Earthy)
| Tone | HSL | Descriptive Name | Use Case |
|---|---|---|---|
| **Primary/Neutral** | `41° 19% 95%` | Swiss Coffee | Page Background |
| **Deep Accent** | `158° 35% 15%` | Midnight Garden | Headlines, Call to Action |
| **Dark Contrast** | `24° 10% 20%` | Charcoal-Chocolate | Footer, Secondary Text |
| **Muted Highlight** | `41° 19% 85%` | Light Truffle | Card Backgrounds, Dividers |
| **Secondary Accent** | `113° 22% 58%` | Comfort Green | Success states, Badges |

### 3. Typography
- **Headlines**: *Outfit* or *Inter* (Sans-serif) for high readability in grid views.
- **Body Text**: *Crimson Text* or *Playfair Display* (Serif) for the reading experience. It evokes a feeling of reading a physical philosophy book.
- **Micro-copy**: *JetBrains Mono* for metadata (date, estimated read time, word count) to give a modern, precise feel.

## Animation Implementation

- **Trigger 1: Hover Cards**: Subtle scale-up (102%) with a soft shadow transition.
- **Trigger 2: Scroll Entry**: Sequential fade-in for list items to prevent visual overload.
- **Trigger 3: Reading Progress**: A thin, kinetic progress bar at the top (`Midnight Garden` color) that expands as the user scrolls.

## Code Snippet (Hover Logic)
```css
.paper-card {
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  border: 1px solid transparent;
}

.paper-card:hover {
  transform: translateY(-4px);
  background: var(--light-truffle);
  border-color: var(--midnight-garden);
  box-shadow: 0 10px 30px -10px rgba(0,0,0,0.1);
}
```

## Considerations
- **Readability**: Ensure contrast ratios (WCAG) are met despite muted colors.
- **Performance**: Use CSS transitions for cards; GSAP only for complex entrance animations.
- **Responsive**: Switch from 3-column to 1-column with full-width hero on mobile.
