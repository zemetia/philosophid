import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class BadgeRepository {
  async findByName(name: string) {
    return prisma.badge.findUnique({
      where: { name },
    });
  }

  async create(data: Prisma.BadgeCreateInput) {
    return prisma.badge.create({ data });
  }

  async findUserBadges(userId: string) {
    return prisma.userBadge.findMany({
      where: { userId },
      include: {
        badge: true,
      },
      orderBy: { earnedAt: "desc" },
    });
  }

  async awardBadge(userId: string, badgeId: string) {
    return prisma.userBadge.create({
      data: {
        userId,
        badgeId,
      },
    });
  }
}

export const badgeRepository = new BadgeRepository();
