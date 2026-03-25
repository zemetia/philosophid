import { prisma } from "@/lib/prisma";

export const ScoreService = {
  /**
   * Increment user score by a specific amount
   */
  async incrementScore(userId: string, amount: number) {
    return await prisma.user.update({
      where: { id: userId },
      data: {
        score: {
          increment: amount,
        },
      },
    });
  },

  /**
   * Standard scoring rules
   */
  RULES: {
    PUBLISH_PAPER: 10,
    JOIN_COMPETITION: 20,
    WIN_COMPETITION: 50,
  },
};
