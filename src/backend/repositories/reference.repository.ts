import { prisma } from "@/lib/prisma";
import { ReferenceSourceType } from "@prisma/client";

export class ReferenceRepository {
  async findByPaperId(paperId: string) {
    return prisma.paperReference.findMany({
      where: { paperId },
      orderBy: { createdAt: "asc" },
    });
  }

  async findById(id: string) {
    return prisma.paperReference.findUnique({
      where: { id },
    });
  }

  async create(data: {
    paperId: string;
    type: ReferenceSourceType;
    authors: string;
    year: number;
    title: string;
    sourceName: string;
    volume?: string | null;
    issue?: string | null;
    pages?: string | null;
    url?: string | null;
    doi?: string | null;
    internalLabel?: string | null;
  }) {
    return prisma.paperReference.create({
      data,
    });
  }

  async update(id: string, data: Partial<{
    type: ReferenceSourceType;
    authors: string;
    year: number;
    title: string;
    sourceName: string;
    volume: string | null;
    issue: string | null;
    pages: string | null;
    url: string | null;
    doi: string | null;
    internalLabel: string | null;
  }>) {
    return prisma.paperReference.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.paperReference.delete({
      where: { id },
    });
  }
}

export const referenceRepository = new ReferenceRepository();
