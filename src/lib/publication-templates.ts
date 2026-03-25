import articleTemplate from "./templates/article.json";
import shortStoryTemplate from "./templates/short-story.json";
import longEssayTemplate from "./templates/long-essay.json";

export type PublicationType = "article" | "short-story" | "long-essay";

export const PUBLICATION_TEMPLATES: Record<PublicationType, any[]> = {
  article: articleTemplate,
  "short-story": shortStoryTemplate,
  "long-essay": longEssayTemplate,
};
