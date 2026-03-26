import { paperRepository, PaperRepository } from "../repositories/paper.repository";
import { userRepository, UserRepository } from "../repositories/user.repository";
import { scoreService, SCORE_RULES } from "./score.service";
import { badgeService } from "./badge.service";
import { PaperType, PaperStatus } from "@prisma/client";
import { ApiError } from "../middleware/error.middleware";

export class PaperService {
  constructor(
    private paperRepo: PaperRepository,
    private userRepo: UserRepository
  ) {}

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
      this.paperRepo.findMany({
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
      this.paperRepo.count(where),
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
  }

  /**
   * Get single paper by ID or Slug
   */
  async getPaperByIdOrSlug(idOrSlug: string, incrementView: boolean = false) {
    const isId = idOrSlug.length === 36;
    const paper = isId 
      ? await this.paperRepo.findById(idOrSlug)
      : await this.paperRepo.findBySlug(idOrSlug);

    if (!paper) throw new ApiError("Paper not found", 404);

    if (incrementView) {
      await this.paperRepo.incrementViewCount(paper.id);
    }

    return paper;
  }

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
    const { title, authorId, competitionId, transactionId } = params;

    // Generate slug
    const slug = this.generateSlug(title);

    // 1. Create the Paper
    const paper = await this.paperRepo.create({
      title: params.title,
      slug,
      content: params.content,
      excerpt: params.excerpt,
      coverImageUrl: params.coverImageUrl,
      tags: params.tags || [],
      type: params.type,
      author: { connect: { id: authorId } },
      status: competitionId ? "COMPETITION_ENTRY" : "DRAFT",
    });

    // 2. If it's a competition entry, link it
    if (competitionId) {
      await this.paperRepo.createCompetitionEntry({
        competition: { connect: { id: competitionId } },
        user: { connect: { id: authorId } },
        paper: { connect: { id: paper.id } },
        transaction: transactionId ? { connect: { id: transactionId } } : undefined,
      });

      // Award points for joining competition
      await scoreService.incrementScore(authorId, SCORE_RULES.JOIN_COMPETITION);
    } else {
      // Award points for starting a draft/post
      await scoreService.incrementScore(authorId, SCORE_RULES.PUBLISH_PAPER);
    }

    // 3. Trigger badge check
    await badgeService.checkAndAwardBadges(authorId);

    return paper;
  }

  /**
   * Update paper with ownership check
   */
  async updatePaper(id: string, data: any, userId: string) {
    const existing = await this.paperRepo.findById(id);
    if (!existing || existing.authorId !== userId) {
      throw new ApiError("Unauthorized or Paper not found", 403);
    }

    // If title changes, update slug if it's still a draft
    if (data.title && existing.status === "DRAFT") {
      data.slug = this.generateSlug(data.title);
    }

    return await this.paperRepo.update(id, data);
  }

  /**
   * Request publish (Draft -> Pending Review)
   */
  async requestPublish(id: string, userId: string) {
    const existing = await this.paperRepo.findById(id);
    if (!existing || existing.authorId !== userId) {
      throw new ApiError("Unauthorized or Paper not found", 403);
    }

    if (existing.status !== "DRAFT") {
      throw new ApiError("Only drafts can be submitted for review", 400);
    }

    return await this.paperRepo.update(id, { status: "PENDING_REVIEW" });
  }

  /**
   * Private Helper: Generate Slug
   */
  private generateSlug(title: string) {
    const KebabTitle = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    
    const randomSuffix = Math.random().toString(36).substring(2, 6);
    return `${KebabTitle}-${randomSuffix}`;
  }
}

export const paperService = new PaperService(paperRepository, userRepository);
