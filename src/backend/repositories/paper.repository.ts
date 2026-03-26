import { prisma } from "@/lib/prisma";
import { PaperType, PaperStatus, Prisma } from "@prisma/client";

export class PaperRepository {
  async findById(id: string) {
    return prisma.paper.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
            bio: true,
          },
        },
      },
    });
  }

  async findBySlug(slug: string) {
    return prisma.paper.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
            bio: true,
          },
        },
      },
    });
  }

  async findMany(params: {
    where?: Prisma.PaperWhereInput;
    orderBy?: Prisma.PaperOrderByWithRelationInput;
    skip?: number;
    take?: number;
    include?: Prisma.PaperInclude;
  }) {
    return prisma.paper.findMany(params);
  }

  async count(where: Prisma.PaperWhereInput) {
    return prisma.paper.count({ where });
  }

  async create(data: Prisma.PaperCreateInput) {
    return prisma.paper.create({ data });
  }

  async update(id: string, data: Prisma.PaperUpdateInput) {
    return prisma.paper.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.paper.delete({
      where: { id },
    });
  }

  async incrementViewCount(id: string) {
    return prisma.paper.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
    });
  }

  async createCompetitionEntry(data: Prisma.CompetitionEntryCreateInput) {
    return prisma.competitionEntry.create({ data });
  }

  async groupByStatus(authorId: string) {
    return prisma.paper.groupBy({
      by: ["status"],
      where: { authorId },
      _count: {
        id: true,
      },
    });
  }

  async groupByType(authorId: string) {
    return prisma.paper.groupBy({
      by: ["type"],
      where: { authorId },
      _count: true,
    });
  }

  async countCompetitionEntries(userId: string) {
    return prisma.competitionEntry.count({
      where: { userId },
    });
  }

  async getRecentPapers(authorId: string, limit: number = 5) {
    return prisma.paper.findMany({
      where: { authorId },
      orderBy: { updatedAt: "desc" },
      take: limit,
      select: {
        id: true,
        title: true,
        status: true,
        type: true,
        updatedAt: true,
      },
    });
  }
}

export const paperRepository = new PaperRepository();
