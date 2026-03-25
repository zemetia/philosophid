# BlockNote Editor Implementation Research (Medium-Like)

## Overview

This research focuses on implementing a **distraction-free, Medium-style** writing experience using BlockNote. Unlike the previous Notion-style approach, this implementation prioritizes a clean interface where tools appear only when needed (on selection) or via a simple trigger, removing drag handles and complex side menus.

## Inspiration & Sources (Mandatory)

> [!IMPORTANT]
> You must list all websites and URLs where information or inspiration was gathered.

- **Medium Editor**: [https://medium.com/new-story](https://medium.com) - The gold standard for distraction-free writing.
- **BlockNote Customization**: [https://www.blocknotejs.org/docs/ui-components/side-menu](https://www.blocknotejs.org/docs/ui-components/side-menu) - Documentation on disabling the default side menu.
- **BlockNote Theming**: [https://www.blocknotejs.org/docs/styling/theming](https://www.blocknotejs.org/docs/styling/theming) - CSS variable overrides for fonts and spacing.

## Design Implementation

- **Visual Style**: "Classical Brutalism" meets "Zen Mode".
  - **Clean Slate**: No visible UI elements until interaction.
  - **Typography**:
    - Headers: **Space Grotesk** (Bold, Tight tracking)
    - Body: **Literata** (Serif, High readability, `1.125rem` base size)
- **Component Behavior**:
  - **Side Menu**: **DISABLED**. We remove the `::` drag handle completely to mimic Medium's clean left margin.
  - **Bubble Menu**: Active. Appears _only_ when text is selected (Bold, Italic, Link).
  - **Slash Menu**: Active. Acts as the primary "Add Block" trigger.

## Color Palette

- **Background**: `#F4F2ED` (Warm Paper Cream) - Global application background.
- **Text**: `#1A1A1A` (Near Black) - High contrast for readability.
- **Selection**: `#B4D5FE` (Soft Blue) - Standard, non-intrusive selection color.

## Code Snippet (Core Logic)

```tsx
"use client";

import dynamic from "next/dynamic";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@/styles/editor-overrides.css"; // Custom CSS for fonts

// Dynamic import to avoid SSR errors
const Editor = () => {
  const editor = useCreateBlockNote({
    initialContent: undefined,
    // We can add a custom hint here if supported in future versions
    // or handled via CSS pseudo-elements
  });

  return (
    <div className="brutalist-editor-container max-w-2xl mx-auto py-12">
      <BlockNoteView
        editor={editor}
        theme="light"
        sideMenu={false} // KEY: Disables the Notion-style drag handle
        className="min-h-[50vh]"
      />
    </div>
  );
};

export default Editor;
```

## CSS Overrides (`editor-overrides.css`)

To achieve the specific typography without heavy JS:

```css
/* Editor Container */
.bn-editor {
  background-color: transparent !important;
}

/* Typography Overrides */
.bn-block-content[data-content-type="paragraph"] {
  font-family: "Literata", serif;
  font-size: 1.125rem;
  line-height: 1.8;
}

.bn-block-content[data-content-type="heading"] {
  font-family: "Space Grotesk", sans-serif;
  font-weight: 700;
  letter-spacing: -0.02em;
}
```

## Considerations

- **Simplicity**: By removing `framer-motion` and `GSAP`, the bundle size is significantly smaller.
- **User Flow**:
  1. Click anywhere to type.
  2. Highlight text -> Bubble menu appears (Bold/Italic).
  3. Type `/` -> Menu appears to add Image/Heading/List.
  4. Integration: This fits perfectly with the "Classical Brutalism" ethos—unadorned, functional, and bold.

## Action Plan

1. Install `@blocknote/core @blocknote/react @blocknote/mantine`.
2. Create the `BlockEditor.tsx` with `sideMenu={false}`.
3. Add the `editor-overrides.css` to the global styles or component module.
