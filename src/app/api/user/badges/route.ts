import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyUserInDatabase } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const firebaseUid = req.headers.get("x-firebase-uid");
    const user = await verifyUserInDatabase(firebaseUid || "");

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

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
}
