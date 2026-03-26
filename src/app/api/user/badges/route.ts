import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { withAuth } from "@/backend/middleware/auth.middleware";

export const GET = withAuth(async (req, user) => {
  try {
    const badges = await prisma.userBadge.findMany({
      where: { userId: user.id },
      include: {
        badge: true,
      },
    });

    return NextResponse.json({ data: badges.map((ub) => ub.badge) });
  } catch (error) {
    console.error("Fetch Badges Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch badges" },
      { status: 500 }
    );
  }
});
