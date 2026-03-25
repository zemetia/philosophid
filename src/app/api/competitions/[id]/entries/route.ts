import { NextRequest, NextResponse } from "next/server";
import { verifyUserInDatabase } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const firebaseUid = req.headers.get("x-firebase-uid");
    const user = await verifyUserInDatabase(firebaseUid || "");

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const entries = await prisma.competitionEntry.findMany({
      where: { competitionId: params.id },
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
}
