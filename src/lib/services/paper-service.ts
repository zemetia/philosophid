import { prisma } from "@/lib/prisma";
import { PaperType, PaperStatus } from "@prisma/client";
import { ScoreService } from "./score-service";
import { BadgeService } from "./badge-service";

export const PaperService = {
  /**
   * Create a new paper, optionally linking it to a competition
   */
  async createPaper(params: {
    title: string;
    content: any;
    type: PaperType;
    authorId: string;
    excerpt?: string;
    coverImageUrl?: string;
    tags?: string[];
    competitionId?: string;
    transactionId?: string;
  }) {
    const { title, content, type, authorId, excerpt, coverImageUrl, tags, competitionId, transactionId } = params;

    // Generate slug
    const slug = this.generateSlug(title);

    // 1. Create the Paper
    const paper = await prisma.paper.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        coverImageUrl,
        tags: tags || [],
        type,
        authorId,
        status: competitionId ? "COMPETITION_ENTRY" : "DRAFT",
      },
    });

    // 2. If it's a competition entry, link it
    if (competitionId) {
      await prisma.competitionEntry.create({
        data: {
          competitionId,
          userId: authorId,
          paperId: paper.id,
          transactionId,
        },
      });

      // Award points for joining competition
      await ScoreService.incrementScore(authorId, ScoreService.RULES.JOIN_COMPETITION);
    } else {
      // Award points for starting a draft/post
      await ScoreService.incrementScore(authorId, ScoreService.RULES.PUBLISH_PAPER);
    }

    // 3. Trigger badge check
    await BadgeService.checkAndAwardBadges(authorId);

    return paper;
  },

  /**
   * List papers with filters and pagination
   */
  async getPapers(filters: {
    type?: PaperType;
    status?: PaperStatus;
    authorId?: string;
    search?: string;
    page?: number;
    limit?: number;
    sortBy?: "createdAt" | "viewCount";
    sortOrder?: "asc" | "desc";
  }) {
    const { 
      type, 
      status = "PUBLISHED", 
      authorId, 
      search, 
      page = 1, 
      limit = 10,
      sortBy = "createdAt",
      sortOrder = "desc"
    } = filters;

    const skip = (page - 1) * limit;

    const where: any = { status };
    if (type) where.type = type;
    if (authorId) where.authorId = authorId;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { excerpt: { contains: search, mode: "insensitive" } },
      ];
    }

    const [papers, total] = await Promise.all([
      prisma.paper.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              avatarUrl: true,
            },
          },
        },
      }),
      prisma.paper.count({ where }),
    ]);

    return {
      data: papers,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  /**
   * Get single paper by ID or Slug
   */
  async getPaperByIdOrSlug(idOrSlug: string, incrementView: boolean = false) {
    const where = idOrSlug.length === 36 // UUID length check
      ? { id: idOrSlug }
      : { slug: idOrSlug };

    const paper = await prisma.paper.findUnique({
      where,
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

    if (paper && incrementView) {
      await prisma.paper.update({
        where: { id: paper.id },
        data: { viewCount: { increment: 1 } },
      });
    }

    return paper;
  },

  /**
   * Update paper with ownership check
   */
  async updatePaper(id: string, data: any, userId: string) {
    // Check ownership
    const existing = await prisma.paper.findUnique({
      where: { id },
      select: { authorId: true },
    });

    if (!existing || existing.authorId !== userId) {
      throw new Error("Unauthorized or Paper not found");
    }

    // If title changes, maybe update slug? 
    // Usually keep slug unless it's a draft to avoid breaking links.
    if (data.title && (await this.isDraft(id))) {
      data.slug = this.generateSlug(data.title);
    }

    return await prisma.paper.update({
      where: { id },
      data,
    });
  },

  /**
   * Request publish (Draft -> Pending Review)
   */
  async requestPublish(id: string, userId: string) {
    const existing = await prisma.paper.findUnique({
      where: { id },
      select: { authorId: true, status: true },
    });

    if (!existing || existing.authorId !== userId) {
      throw new Error("Unauthorized or Paper not found");
    }

    if (existing.status !== "DRAFT") {
      throw new Error("Only drafts can be submitted for review");
    }

    return await prisma.paper.update({
      where: { id },
      data: { status: "PENDING_REVIEW" },
    });
  },

  /**
   * Archive paper (Soft Delete)
   */
  async archivePaper(id: string, userId: string) {
    const existing = await prisma.paper.findUnique({
      where: { id },
      select: { authorId: true },
    });

    // Note: author check is enough for now, admin check usually handled at route level
    if (!existing || existing.authorId !== userId) {
      throw new Error("Unauthorized");
    }

    return await prisma.paper.update({
      where: { id },
      data: { status: "ARCHIVED" },
    });
  },

  /**
   * Internal Helper: Is paper a draft?
   */
  async isDraft(id: string) {
    const paper = await prisma.paper.findUnique({
      where: { id },
      select: { status: true },
    });
    return paper?.status === "DRAFT";
  },

  /**
   * Internal Helper: Generate Slug
   */
  generateSlug(title: string) {
    const KebabTitle = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    
    const randomSuffix = Math.random().toString(36).substring(2, 6);
    return `${KebabTitle}-${randomSuffix}`;
  },

  /**
   * Get user analytics
   */
  async getUserAnalytics(userId: string) {
    const [papersCount, totalScore, competitionEntries] = await Promise.all([
      prisma.paper.groupBy({
        by: ["type"],
        where: { authorId: userId },
        _count: true,
      }),
      prisma.user.findUnique({
        where: { id: userId },
        select: { score: true },
      }),
      prisma.competitionEntry.count({
        where: { userId },
      }),
    ]);

    return {
      papersByType: papersCount,
      score: totalScore?.score || 0,
      totalCompetitions: competitionEntries,
    };
  },
};

