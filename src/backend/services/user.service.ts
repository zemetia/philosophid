import { userRepository, UserRepository } from "../repositories/user.repository";
import { paperRepository, PaperRepository } from "../repositories/paper.repository";
import { badgeRepository, BadgeRepository } from "../repositories/badge.repository";
import { ApiError } from "../middleware/error.middleware";

export class UserService {
  constructor(
    private userRepo: UserRepository,
    private paperRepo: PaperRepository,
    private badgeRepo: BadgeRepository
  ) {}

  /**
   * Get full user profile data for the profile page
   */
  async getUserProfile(userId: string) {
    const [user, papers, competitionEntries, badges, analytics] = await Promise.all([
      this.userRepo.getProfile(userId),
      this.paperRepo.findMany({
        where: { authorId: userId },
        orderBy: { createdAt: "desc" },
      }),
      // We'll need a way to get competition entries with details in paper repository too, 
      // or we use competition repository. For now, let's keep it simple.
      this.paperRepo.countCompetitionEntries(userId), 
      this.badgeRepo.findUserBadges(userId),
      this.getUserAnalytics(userId),
    ]);

    if (!user) throw new ApiError("User not found", 404);

    return {
      user,
      papers,
      competitionsCount: competitionEntries,
      badges: badges.map((ub) => ub.badge),
      analytics,
    };
  }

  /**
   * Get full user profile data by username for the public profile page
   */
  async getUserProfileByUsername(username: string) {
    const user = await this.userRepo.findByUsername(username);
    if (!user) throw new ApiError("User not found", 404);
    return this.getUserProfile(user.id);
  }

  /**
   * Syncs a Firebase user with the local database (Upsert)
   */
  async syncUserWithDatabase(firebaseUser: { 
    uid: string; 
    email: string; 
    name?: string; 
    picture?: string;
    username?: string;
    [key: string]: any;
  }) {
    if (!firebaseUser.uid || !firebaseUser.email) {
      throw new ApiError("Invalid firebase user data for sync", 400);
    }

    const userData: any = {
      email: firebaseUser.email,
      name: firebaseUser.name || null,
      username: firebaseUser.username || undefined,
      avatarUrl: firebaseUser.picture || null,
      age: firebaseUser.age || undefined,
      birthday: firebaseUser.birthday ? new Date(firebaseUser.birthday) : undefined,
      location: firebaseUser.location || undefined,
      institution: firebaseUser.institution || undefined,
      major: firebaseUser.major || undefined,
      interests: firebaseUser.interests || undefined,
      favoritePhilosopher: firebaseUser.favoritePhilosopher || undefined,
      phone: firebaseUser.phone || undefined,
      instagram: firebaseUser.instagram || undefined,
      facebook: firebaseUser.facebook || undefined,
      linkedIn: firebaseUser.linkedIn || undefined,
      preferredLanguage: firebaseUser.preferredLanguage || undefined,
      philosophySchool: firebaseUser.philosophySchool || undefined,
    };

    let user = await this.userRepo.findByFirebaseUid(firebaseUser.uid);

    if (!user && firebaseUser.email) {
      user = await this.userRepo.findByEmail(firebaseUser.email);
    }

    if (user) {
      // Update existing user
      return await this.userRepo.update(user.id, {
        firebaseUid: firebaseUser.uid,
        ...userData,
      });
    }

    // Create new user
    return await this.userRepo.create({
      firebaseUid: firebaseUser.uid,
      ...userData,
      role: "USER",
    });
  }

  /**
   * Get dashboard data for the user
   */
  async getUserDashboard(userId: string) {
    const [user, stats, recentPapers, badges] = await Promise.all([
      this.userRepo.getDashboard(userId),
      this.paperRepo.groupByStatus(userId),
      this.paperRepo.getRecentPapers(userId, 5),
      this.badgeRepo.findUserBadges(userId),
    ]);

    if (!user) throw new ApiError("User not found", 404);

    // Format stats
    const statsMap = (stats as any[]).reduce((acc, curr) => {
      acc[curr.status] = curr._count.id;
      return acc;
    }, {} as Record<string, number>);

    const total = (stats as any[]).reduce((sum, s) => sum + s._count.id, 0);

    return {
      profile: user,
      statistics: {
        total,
        drafts: statsMap["DRAFT"] || 0,
        published: statsMap["PUBLISHED"] || 0,
        pending: statsMap["PENDING_REVIEW"] || 0,
      },
      recentActivity: recentPapers,
      badges: badges.map((ub) => ub.badge).slice(0, 3), // Take recent 3
    };
  }

  /**
   * Helper for user analytics
   */
  private async getUserAnalytics(userId: string) {
    const [papersCount, user, competitionEntries] = await Promise.all([
      this.paperRepo.groupByType(userId),
      this.userRepo.findById(userId),
      this.paperRepo.countCompetitionEntries(userId),
    ]);

    return {
      papersByType: papersCount,
      score: user?.score || 0,
      totalCompetitions: competitionEntries,
    };
  }
}

export const userService = new UserService(userRepository, paperRepository, badgeRepository);
