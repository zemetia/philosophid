import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { withAuth } from "@/backend/middleware/auth.middleware";

export const GET = withAuth(async (req, user, { params }) => {
  try {
    if (user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized: Admin access required" }, { status: 401 });
    }

    const { id } = await params;

    const entries = await prisma.competitionEntry.findMany({
      where: { competitionId: id },
      include: {
        user: { select: { name: true, email: true } },
        paper: { select: { title: true, status: true } },
        transaction: { select: { status: true, amount: true } }
      },
      orderBy: { submittedAt: "desc" }
    });

    return NextResponse.json({ data: entries });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch entries" }, { status: 500 });
  }
});
