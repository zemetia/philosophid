import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth-server";
import { UserService } from "@/lib/services/user-service";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const firebaseUser = await getAuthUser();

    if (!firebaseUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get the internal DB user ID first
    const dbUser = await prisma.user.findUnique({
      where: { firebaseUid: firebaseUser.uid },
      select: { id: true },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found in database" }, { status: 404 });
    }

    const dashboardData = await UserService.getUserDashboard(dbUser.id);

    if (!dashboardData) {
      return NextResponse.json({ error: "Unable to fetch dashboard data" }, { status: 500 });
    }

    return NextResponse.json(dashboardData);
  } catch (error: any) {
    console.error("Dashboard API error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
