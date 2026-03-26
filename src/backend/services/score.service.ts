import { userRepository, UserRepository } from "../repositories/user.repository";

export const SCORE_RULES = {
  PUBLISH_PAPER: 10,
  JOIN_COMPETITION: 20,
  WIN_COMPETITION: 50,
};

export class ScoreService {
  constructor(private userRepo: UserRepository) {}

  /**
   * Increment user score by a specific amount
   */
  async incrementScore(userId: string, amount: number) {
    return this.userRepo.updateScore(userId, amount);
  }
}

export const scoreService = new ScoreService(userRepository);
