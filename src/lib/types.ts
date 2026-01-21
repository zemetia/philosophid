
export type ContentCategory = 'Long Essay' | 'Article' | 'Short Story';

export interface Post {
  id: string;
  title: string;
  author: string;
  category: ContentCategory;
  excerpt: string;
  date: string;
  year: string;
  readTime: string;
  wordCount: string;
  imageUrl?: string;
  
  // Long Essay Specifics
  abstract?: string;
  sections?: { title: string; content: string }[];
  footnotes?: string[];
  editorialCommentary?: string;
  
  // Philosophical Article Specifics
  openingThesis?: string;
  coreArgument?: string;
  tension?: string;
  closingReflection?: string;
  relatedInquiries?: string[]; // text-only references
  
  // Short Story Specifics
  formatNote?: string;
  storyBody?: string;
  postStoryReflection?: string;
  contextNote?: string;
}

export interface CompetitionType {
  id: string;
  title: string;
  frequency: string;
  description: string;
  requirements: string;
}

export interface Competition {
  title: string;
  deadline: string;
  prize: string;
  description: string;
}

export interface HallOfFameEntry {
  id: string;
  name: string;
  award: string;
  year: number;
  month?: string;
  points: number;
  category: string;
  highlightEntry?: {
    title: string;
    excerpt: string;
    editorialNote: string;
  };
}

export interface JuryNote {
  curator: string;
  note: string;
}
