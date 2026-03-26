import { prisma } from "@/lib/prisma";
import { PaperService } from "./paper-service";

export const UserService = {
  /**
   * Get full user profile data for the profile page
   */
  async getUserProfile(userId: string) {
    const [user, papers, competitionEntries, badges, analytics] = await Promise.all([
      prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          username: true,
          email: true,
          avatarUrl: true,
          role: true,
          score: true,
          bio: true,
          birthday: true,
          location: true,
          institution: true,
          major: true,
          interests: true,
          favoritePhilosopher: true,
          phone: true,
          instagram: true,
          facebook: true,
          linkedIn: true,
          preferredLanguage: true,
          philosophySchool: true,
          createdAt: true,
        },
      }),
      prisma.paper.findMany({
        where: { authorId: userId },
        orderBy: { createdAt: "desc" },
      }),
      prisma.competitionEntry.findMany({
        where: { userId },
        include: {
          competition: true,
          paper: {
            select: {
              title: true,
              status: true,
            },
          },
        },
        orderBy: { submittedAt: "desc" },
      }),
      prisma.userBadge.findMany({
        where: { userId },
        include: {
          badge: true,
        },
        orderBy: { earnedAt: "desc" },
      }),
      PaperService.getUserAnalytics(userId),
    ]);

    if (!user) return null;

    return {
      user,
      papers,
      competitions: competitionEntries,
      badges: badges.map((ub) => ub.badge),
      analytics,
    };
  },

  /**
   * Get full user profile data by username for the public profile page
   */
  async getUserProfileByUsername(username: string) {
    const user = await prisma.user.findUnique({
      where: { username },
      select: { id: true },
    });

    if (!user) return null;
    return this.getUserProfile(user.id);
  },

  /**
   * Syncs a Firebase user with the local database (Upsert)
   */
  async syncUserWithDatabase(firebaseUser: { 
    uid: string; 
    email?: string; 
    name?: string; 
    picture?: string;
    username?: string;
    // Add additional fields
    birthday?: string;
    location?: string;
    institution?: string;
    major?: string;
    interests?: string;
    favoritePhilosopher?: string;
    phone?: string;
    instagram?: string;
    facebook?: string;
    linkedIn?: string;
    preferredLanguage?: string;
    philosophySchool?: string;
  }) {
    if (!firebaseUser.uid || !firebaseUser.email) {
      throw new Error("Invalid firebase user data for sync");
    }

    const userData = {
      email: firebaseUser.email,
      name: firebaseUser.name || null,
      username: firebaseUser.username || undefined,
      avatarUrl: firebaseUser.picture || null,
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

    let user = await prisma.user.findUnique({
      where: { firebaseUid: firebaseUser.uid },
    });

    if (!user && firebaseUser.email) {
      user = await prisma.user.findUnique({
        where: { email: firebaseUser.email },
      });
    }

    if (user) {
      // Update existing user, ensuring firebaseUid is matched
      return await prisma.user.update({
        where: { id: user.id },
        data: {
          firebaseUid: firebaseUser.uid,
          ...userData,
        },
      });
    }

    // Create new user if neither firebaseUid nor email matched
    return await prisma.user.create({
      data: {
        firebaseUid: firebaseUser.uid,
        ...userData,
        role: "USER" as const,
      },
    });
  },

  /**
   * Get dashboard data for the user
   */
  async getUserDashboard(userId: string) {
    const [user, stats, recentPapers, badges] = await Promise.all([
      prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          avatarUrl: true,
          role: true,
          score: true,
        },
      }),
      prisma.paper.groupBy({
        by: ["status"],
        where: { authorId: userId },
        _count: {
          id: true,
        },
      }),
      prisma.paper.findMany({
        where: { authorId: userId },
        orderBy: { updatedAt: "desc" },
        take: 5,
        select: {
          id: true,
          title: true,
          status: true,
          type: true,
          updatedAt: true,
        },
      }),
      prisma.userBadge.findMany({
        where: { userId },
        include: {
          badge: true,
        },
        orderBy: { earnedAt: "desc" },
        take: 3,
      }),
    ]);

    if (!user) return null;

    // Format stats
    const statsMap = stats.reduce((acc, curr) => {
      acc[curr.status] = curr._count.id;
      return acc;
    }, {} as Record<string, number>);

    return {
      profile: user,
      statistics: {
        total: stats.reduce((sum, s) => sum + s._count.id, 0),
        drafts: statsMap["DRAFT"] || 0,
        published: statsMap["PUBLISHED"] || 0,
        pending: statsMap["PENDING_REVIEW"] || 0,
      },
      recentActivity: recentPapers,
      badges: badges.map((ub) => ub.badge),
    };
  },
};
