import { competitionRepository, CompetitionRepository } from "../repositories/competition.repository";
import { paperRepository, PaperRepository } from "../repositories/paper.repository";
import { userRepository, UserRepository } from "../repositories/user.repository";
import { paymentProvider } from "./payment-provider.service";
import { PaperType } from "@prisma/client";
import { ApiError } from "../middleware/error.middleware";

export class CompetitionService {
  constructor(
    private competitionRepo: CompetitionRepository,
    private paperRepo: PaperRepository,
    private userRepo: UserRepository
  ) {}

  /**
   * List all competitions
   */
  async listCompetitions(filters: { type?: PaperType; active?: boolean }) {
    const { type, active } = filters;
    const where: any = {};
    
    if (type) where.type = type;
    if (active !== undefined) where.isActive = active;

    return await this.competitionRepo.findMany({
      where,
      orderBy: { startDate: "desc" },
    });
  }

  /**
   * Get single competition by ID
   */
  async getCompetitionById(id: string) {
    const competition = await this.competitionRepo.findWithDetails(id);
    if (!competition) throw new ApiError("Competition not found", 404);
    return competition;
  }

  /**
   * Create a competition (Admin Only logic handled at route level usually)
   */
  async createCompetition(data: any) {
    return await this.competitionRepo.create({
      ...data,
      fee: Number(data.fee), 
    });
  }

  /**
   * Enter a competition
   */
  async enterCompetition(competitionId: string, paperId: string, userId: string) {
    // 1. Validate Competition
    const competition = await this.competitionRepo.findById(competitionId);
    if (!competition || !competition.isActive) {
      throw new ApiError("Competition not found or inactive", 404);
    }

    const _count = (competition as any)._count;
    if (competition.maxEntries && _count.entries >= competition.maxEntries) {
      throw new ApiError("Competition is full", 400);
    }

    const now = new Date();
    if (now < competition.startDate || now > competition.endDate) {
      throw new ApiError("Competition is not currently open for entries", 400);
    }

    // 2. Validate Paper
    const paper = await this.paperRepo.findById(paperId);
    if (!paper || paper.authorId !== userId) {
      throw new ApiError("Unauthorized: Paper not found or you are not the author", 403);
    }

    if (paper.type !== competition.type) {
      throw new ApiError(`This competition only accepts ${competition.type} papers`, 400);
    }

    // Check if already entered
    const existingEntry = await this.competitionRepo.findEntryByPaperId(paperId);
    if (existingEntry) {
      throw new ApiError("This paper has already been entered into a competition", 400);
    }

    // 3. Handle Payment vs Free
    if (Number(competition.fee) > 0) {
      // Create Transaction
      const transaction = await this.competitionRepo.createTransaction({
        user: { connect: { id: userId } },
        amount: competition.fee,
        status: "PENDING",
      });

      // Create Entry (linked to transaction)
      await this.competitionRepo.createEntry({
        competition: { connect: { id: competitionId } },
        user: { connect: { id: userId } },
        paper: { connect: { id: paperId } },
        transaction: { connect: { id: transaction.id } },
      });

      // Midtrans Snap Token
      const user = await this.userRepo.findById(userId);
      const snapResponse = await paymentProvider.createSnapTransaction({
        transactionDetails: {
          orderId: transaction.id,
          grossAmount: Number(competition.fee),
        },
        customerDetails: {
          firstName: user?.name?.split(" ")[0],
          lastName: user?.name?.split(" ").slice(1).join(" "),
          email: user?.email,
        },
      });

      // Update transaction with payment URL
      await this.competitionRepo.updateTransaction(transaction.id, {
        paymentUrl: snapResponse.redirect_url,
      });

      return {
        type: "PAYMENT_REQUIRED",
        paymentUrl: snapResponse.redirect_url,
        transactionId: transaction.id,
      };
    } else {
      // Free Entry
      const entry = await this.competitionRepo.createEntry({
        competition: { connect: { id: competitionId } },
        user: { connect: { id: userId } },
        paper: { connect: { id: paperId } },
        status: "SUBMITTED",
      });

      // Mark paper status as COMPETITION_ENTRY
      await this.paperRepo.update(paperId, { status: "COMPETITION_ENTRY" });

      return {
        type: "SUCCESS",
        entryId: entry.id,
      };
    }
  }

  /**
   * Update entry status (Admin Only)
   */
  async updateEntryStatus(entryId: string, status: any) {
    return await this.competitionRepo.updateEntry(entryId, { status });
  }
}

export const competitionService = new CompetitionService(competitionRepository, paperRepository, userRepository);
