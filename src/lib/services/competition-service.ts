import { prisma } from "@/lib/prisma";
import { PaperType } from "@prisma/client";
import { PaymentService } from "@/lib/payment";

const paymentService = new PaymentService();

export const CompetitionService = {
  /**
   * List all competitions
   */
  async listCompetitions(filters: { type?: PaperType; active?: boolean }) {
    const { type, active } = filters;
    const where: any = {};
    
    if (type) where.type = type;
    if (active !== undefined) where.isActive = active;

    const competitions = await prisma.competition.findMany({
      where,
      orderBy: { startDate: "desc" },
      include: {
        _count: {
          select: { entries: true },
        },
      },
    });

    return competitions;
  },

  /**
   * Get single competition by ID
   */
  async getCompetitionById(id: string) {
    return await prisma.competition.findUnique({
      where: { id },
      include: {
        entries: {
          include: {
            user: {
              select: { name: true, avatarUrl: true },
            },
          },
        },
        _count: {
          select: { entries: true },
        },
      },
    });
  },

  /**
   * Create a competition (Admin Only)
   */
  async createCompetition(data: any) {
    return await prisma.competition.create({
      data: {
        ...data,
        fee: Number(data.fee), // Ensure decimal
      },
    });
  },

  /**
   * Enter a competition
   */
  async enterCompetition(competitionId: string, paperId: string, userId: string) {
    // 1. Validate Competition
    const competition = await prisma.competition.findUnique({
      where: { id: competitionId },
      include: { _count: { select: { entries: true } } },
    });

    if (!competition || !competition.isActive) {
      throw new Error("Competition not found or inactive");
    }

    if (competition.maxEntries && competition._count.entries >= competition.maxEntries) {
      throw new Error("Competition is full");
    }

    const now = new Date();
    if (now < competition.startDate || now > competition.endDate) {
      throw new Error("Competition is not currently open for entries");
    }

    // 2. Validate Paper
    const paper = await prisma.paper.findUnique({
      where: { id: paperId },
    });

    if (!paper || paper.authorId !== userId) {
      throw new Error("Unauthorized: Paper not found or you are not the author");
    }

    if (paper.type !== competition.type) {
      throw new Error(`This competition only accepts ${competition.type} papers`);
    }

    // Check if already entered
    const existingEntry = await prisma.competitionEntry.findUnique({
      where: { paperId },
    });

    if (existingEntry) {
      throw new Error("This paper has already been entered into a competition");
    }

    // 3. Handle Payment vs Free
    if (Number(competition.fee) > 0) {
      // Create Transaction
      const transaction = await prisma.transaction.create({
        data: {
          userId,
          amount: competition.fee,
          status: "PENDING",
        },
      });

      // Initially create the entry as "PENDING_PAYMENT" status is not in enum, 
      // but we use status: "SUBMITTED" or handle it via transaction status
      // Actually we create the entry ONLY when paid? Or create as PENDING?
      // Since CompetitionEntry just has status: SUBMITTED | WINNER | DISQUALIFIED,
      // we'll create it now with a placeholder if needed, or better:
      // Create the entry but link to the transaction. 
      // The frontend will only consider it active if transaction is SUCCESS.
      
      const entry = await prisma.competitionEntry.create({
        data: {
          competitionId,
          userId,
          paperId,
          transactionId: transaction.id,
          // note: status defaults to SUBMITTED. 
        },
      });

      // Create Midtrans Snap Token
      const user = await prisma.user.findUnique({ where: { id: userId } });
      const snapResponse = await paymentService.createSnapTransaction({
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
      await prisma.transaction.update({
        where: { id: transaction.id },
        data: { paymentUrl: snapResponse.redirect_url },
      });

      return {
        type: "PAYMENT_REQUIRED",
        paymentUrl: snapResponse.redirect_url,
        transactionId: transaction.id,
      };
    } else {
      // Free Entry
      const entry = await prisma.competitionEntry.create({
        data: {
          competitionId,
          userId,
          paperId,
          status: "SUBMITTED",
        },
      });

      // Mark paper status as COMPETITION_ENTRY
      await prisma.paper.update({
        where: { id: paperId },
        data: { status: "COMPETITION_ENTRY" },
      });

      return {
        type: "SUCCESS",
        entryId: entry.id,
      };
    }
  },

  /**
   * Update entry status (Admin Only)
   */
  async updateEntryStatus(entryId: string, status: string) {
    return await prisma.competitionEntry.update({
      where: { id: entryId },
      data: { status },
    });
  },
};
