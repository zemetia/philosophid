import { ReferenceSourceType } from "@prisma/client";
import { referenceRepository } from "../repositories/reference.repository";
import { z } from "zod";

export const ReferenceSchema = z.object({
  type: z.nativeEnum(ReferenceSourceType),
  authors: z.string().min(1, "At least one author is required"),
  year: z.number().int().min(1000).max(new Date().getFullYear() + 1),
  title: z.string().min(1, "Title is required"),
  sourceName: z.string().min(1, "Source name is required"),
  volume: z.string().optional().nullable(),
  issue: z.string().optional().nullable(),
  pages: z.string().optional().nullable(),
  url: z.string().url().optional().nullable().or(z.literal("")),
  doi: z.string().optional().nullable(),
});

export type ReferenceInput = z.infer<typeof ReferenceSchema>;

export class ReferenceService {
  async getByPaperId(paperId: string) {
    return referenceRepository.findByPaperId(paperId);
  }

  async addReference(paperId: string, input: ReferenceInput) {
    const validatedData = ReferenceSchema.parse(input);
    
    // Generate an internal label for citation indexing
    // Use the first author's last name + year + random suffix
    const firstAuthorMatch = validatedData.authors.split(',')[0].trim().match(/^\w+/);
    const authorTag = firstAuthorMatch ? firstAuthorMatch[0].toLowerCase() : "ref";
    const randomSuffix = Math.random().toString(36).substring(2, 5);
    const internalLabel = `${authorTag}_${validatedData.year}_${randomSuffix}`;
    
    return referenceRepository.create({
      ...validatedData,
      paperId,
      internalLabel,
    });
  }

  async updateReference(id: string, input: Partial<ReferenceInput>) {
    // For partial updates, we might want a different schema or permissive validation
    return referenceRepository.update(id, input as any);
  }

  async deleteReference(id: string) {
    return referenceRepository.delete(id);
  }
}

export const referenceService = new ReferenceService();
