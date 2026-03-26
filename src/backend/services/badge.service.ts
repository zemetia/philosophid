import { badgeRepository, BadgeRepository } from "../repositories/badge.repository";
import { userRepository, UserRepository } from "../repositories/user.repository";
import { prisma } from "@/lib/prisma";

export class BadgeService {
  constructor(
    private badgeRepo: BadgeRepository,
    private userRepo: UserRepository
  ) {}

  /**
   * Check and award badges to a user based on their current stats
   */
  async checkAndAwardBadges(userId: string) {
    // 1. Fetch user data (using prisma for speed or repo if needed)
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
      let badge = await this.badgeRepo.findByName(rule.name);

      if (!badge) {
        badge = await this.badgeRepo.create({
          name: rule.name,
          description: rule.description,
        });
      }

      // 2. If user meets condition and doesn't have it yet, award it
      if (rule.condition() && !existingBadgeIds.has(badge.id)) {
        await this.badgeRepo.awardBadge(user.id, badge.id);
        awardedBadges.push(badge);
      }
    }

    return awardedBadges;
  }
}

export const badgeService = new BadgeService(badgeRepository, userRepository);
