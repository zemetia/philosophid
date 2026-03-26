# Research: Automatic APA Referencing System Design

## Overview
This research outlines the design for a robust, automated referencing system within the BlockNote editor, specifically following the **APA (7th Edition)** style. The goal is to allow users to manage a reference pool for each publication, insert in-text citations, and have a formatted bibliography automatically generated.

## Recommended Libraries
1. **Citation.js**: The industry standard for parsing and formatting citations. It can convert metadata (authors, year, title) into APA-style strings or bibliography lists.
2. **@blocknote/core / @blocknote/react**: To create custom inline content for citations and potentially a custom block for the bibliography.
3. **Zod**: For backend validation of different reference types (Book, Journal, Website).

## Implementation Strategy

### 1. Database Schema (Prisma)
We need a dedicated model to store metadata for each reference. This allows for sorting, filtering, and global reference management in the future.

```prisma
enum ReferenceSourceType {
  BOOK
  JOURNAL_ARTICLE
  WEBSITE
  CONFERENCE_PAPER
  REPORT
  THESIS
}

model PaperReference {
  id              String             @id @default(uuid())
  paperId         String
  paper           Paper              @relation(fields: [paperId], references: [id], onDelete: Cascade)
  
  type            ReferenceSourceType
  authors         String             // JSON string or comma-separated: "Smith, A., Jones, B."
  year            Int
  title           String
  sourceName      String             // Journal title, Website name, or Publisher
  volume          String?
  issue           String?
  pages           String?
  url             String?
  doi             String?
  
  // Unique label for internal linking within the BlockNote JSON content
  // e.g., "ref_smith_2023"
  internalLabel   String             
  
  createdAt       DateTime           @default(now())
  updatedAt       DateTime           @updatedAt

  @@index([paperId])
}
```

### 2. Frontend: BlockNote Integration
- **Custom Inline Content (`Citation`)**:
    - Each citation in the text will be a custom inline element.
    - Props: `referenceId` (UUID of the `PaperReference`).
    - Display: Shows `(Smith, 2023)` dynamically based on the linked reference data.
- **Reference Management UI**:
    - A side drawer or modal in `/dashboard/publication/new` to "Add/Manage References".
    - Forms specifically validated for different source types.
- **Automated Bibliography**:
    - A custom block type `ReferencesList` that can be inserted at the end of the document.
    - This block will automatically fetch all references for the current paper, sort them alphabetically by author, and format them using `Citation.js`.

### 3. Logic: Sorting and Numbering
- **Automated Sorting**: The system will automatically sort the bibliography.
    - **APA Default**: Sort alphabetically by author's last name.
    - **Numerical Option**: Sort by order of appearance in the text (if numbering is selected).
- **Automated Numbering**:
    - For in-text citations, the system can dynamically assign numbers `[1], [2]...` based on either the alphabetical sort order or the order of first appearance.
    - This satisfies the user's requirement for "automatically numbering" while maintaining APA style for the actual entry formatting.

## Security & Performance
- **Integrity**: Deleting a reference from the pool should warn the user if it's currently cited in the text.
- **Data Footprint**: Store references in a separate table rather than embedding them in the `Paper.content` JSON to keep the editor payload small and searchable.

## Future Considerations
- **Global Reference Pool**: Allow users to reuse a reference across multiple papers.
- **Import from BibTeX/DOI**: Use external APIs to fetch citation metadata automatically from a DOI.
