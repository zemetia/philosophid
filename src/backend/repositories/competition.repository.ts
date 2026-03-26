import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class CompetitionRepository {
  async findById(id: string) {
    return prisma.competition.findUnique({
      where: { id },
      include: {
        _count: {
          select: { entries: true },
        },
      },
    });
  }

  async findWithDetails(id: string) {
    return prisma.competition.findUnique({
      where: { id },
      include: {
        entries: {
          include: {
            user: {
              select: { name: true, avatarUrl: true },
            },
          },
        },
        _count: {
          select: { entries: true },
        },
      },
    });
  }

  async findMany(params: {
    where?: Prisma.CompetitionWhereInput;
    orderBy?: Prisma.CompetitionOrderByWithRelationInput;
    include?: Prisma.CompetitionInclude;
  }) {
    return prisma.competition.findMany(params);
  }

  async create(data: Prisma.CompetitionCreateInput) {
    return prisma.competition.create({ data });
  }

  async update(id: string, data: Prisma.CompetitionUpdateInput) {
    return prisma.competition.update({
      where: { id },
      data,
    });
  }

  async findEntryById(id: string) {
    return prisma.competitionEntry.findUnique({
      where: { id },
    });
  }

  async findEntryByPaperId(paperId: string) {
    return prisma.competitionEntry.findUnique({
      where: { paperId },
    });
  }

  async createEntry(data: Prisma.CompetitionEntryCreateInput) {
    return prisma.competitionEntry.create({ data });
  }

  async updateEntry(id: string, data: Prisma.CompetitionEntryUpdateInput) {
    return prisma.competitionEntry.update({
      where: { id },
      data,
    });
  }

  async deleteEntry(id: string) {
    return prisma.competitionEntry.delete({
      where: { id },
    });
  }

  async createTransaction(data: Prisma.TransactionCreateInput) {
    return prisma.transaction.create({ data });
  }

  async updateTransaction(id: string, data: Prisma.TransactionUpdateInput) {
    return prisma.transaction.update({
      where: { id },
      data,
    });
  }
}

export const competitionRepository = new CompetitionRepository();
