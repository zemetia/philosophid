---
name: generating-frontend-specs
description: Generates comprehensive frontend documentation, design systems, and page layouts. Use when the user wants to plan a new page, create a UI/UX guide, or define structure/style before coding.
---

# Generating Frontend Specs

## Quick Start
To generate a design specification for a new feature or page:
1.  **Understand** the requirements.
2.  **View** the template at `.agent/skills/generating-frontend-specs/templates/design-spec.md`.
3.  **Create or Update** the report at `./design-guideline.md`.
4.  **Fill** the template using **descriptive prompts** only (NO CODE).

## When to Use
- User asks to "plan a page" or "design a feature" before coding.
- User needs a "style guide" or "UI/UX documentation".
- You want to create a "Prompt" for another agent to build the UI.
- **Trigger**: "create report", "design guideline", "plan UI".

## Workflow
1.  **Analyze Context**
    *   Read existing styles (`globals.css`) and components to understand the "vibe".

2.  **Generate Report (`./design-guideline.md`)**
    *   **Target File**: `./design-guideline.md` (Root directory).
    *   **Style**: Prompt-Engineering format. You are writing instructions for a smarter AI.
    *   **Structure**: Use `templates/design-spec.md`.

3.  **Write Descriptions (The "No-Code" Rule)**
    *   **See component? Describe it.** Do not write `<div className="...">`.
    *   *Bad*: `Use <Button variant="primary" />`
    *   *Good*: "Use the Primary Button component. It should be a rectanglular block with a thick black border that fills with ink on hover."
    *   **Why?**: This prevents hallucinated props and focuses on the *intent* and *design* rather than implementation details.

4.  **Review with User**
    *   Present the prompt/plan.
    *   Wait for approval.

## Instructions
- **Straight to the Point**: Don't use filler words. "Header: Fixed, Blur, White text."
- **Describe, Don't Code**: Define the *look and feel*. Trust the implementer to know the CSS.
- **Consistency**: Ensure your descriptions match the `Classical Brutalism` (or current project) theme.
- **Visual Vocabulary**: Use terms like "Padding", "Margin", "Contrast", "Opacity", "Backdrop Filter", "Easing".

## Example
**Input**: "Plan a dashboard home page."

**Output Action**:
1.  Updates `./design-guideline.md`.
2.  Content:
    *   **Layout**: "3-column grid. Left column is navigation (20% width). Center is wide (50%). Right is widgets (30%)."
    *   **Cards**: "Glass effect cards. White text, 10% opacity white background. Rounding: 16px."
    *   **Animations**: "Cards should stagger in from bottom (y: 20px) with reduced opacity."
