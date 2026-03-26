import { prisma } from "@/lib/prisma";
import { Prisma, TransactionStatus } from "@prisma/client";

export class PaymentRepository {
  async findTransactionById(id: string) {
    return prisma.transaction.findUnique({
      where: { id },
    });
  }

  async createTransaction(data: {
    userId: string;
    amount: number;
    description?: string;
    externalId?: string;
  }) {
    return prisma.transaction.create({
      data: {
        userId: data.userId,
        amount: data.amount,
        status: "PENDING",
      },
    });
  }

  async updateTransactionStatus(id: string, status: TransactionStatus) {
    return prisma.transaction.update({
      where: { id },
      data: { status },
    });
  }

  async updateTransactionDetails(id: string, data: Prisma.TransactionUpdateInput) {
    return prisma.transaction.update({
      where: { id },
      data,
    });
  }
}

export const paymentRepository = new PaymentRepository();
