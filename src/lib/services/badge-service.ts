import { prisma } from "@/lib/prisma";
import { ScoreService } from "./score-service";

export const BadgeService = {
  /**
   * Check and award badges to a user based on their current stats
   */
  async checkAndAwardBadges(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        papers: true,
        badges: true,
      },
    });

    if (!user) return [];

    const awardedBadges = [];
    const existingBadgeIds = new Set(user.badges.map((b) => b.badgeId));

    // Define rules for badges
    const rules = [
      {
        name: "First Word",
        description: "Published your first paper",
        condition: () => user.papers.length >= 1,
      },
      {
        name: "Prolific Writer",
        description: "Published 5 papers",
        condition: () => user.papers.length >= 5,
      },
      {
        name: "Philosopher's Stone",
        description: "Reached 100 contribution points",
        condition: () => user.score >= 100,
      },
    ];

    for (const rule of rules) {
      // 1. Find or Create the Badge in the global Badge table
      let badge = await prisma.badge.findUnique({
        where: { name: rule.name },
      });

      if (!badge) {
        badge = await prisma.badge.create({
          data: {
            name: rule.name,
            description: rule.description,
          },
        });
      }

      // 2. If user meets condition and doesn't have it yet, award it
      if (rule.condition() && !existingBadgeIds.has(badge.id)) {
        await prisma.userBadge.create({
          data: {
            userId: user.id,
            badgeId: badge.id,
          },
        });
        awardedBadges.push(badge);
      }
    }

    return awardedBadges;
  },
};
