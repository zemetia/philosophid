import { NextRequest, NextResponse } from "next/server";
import { PaperService } from "@/lib/services/paper-service";
import { withAuth } from "@/backend/middleware/auth.middleware";

export const GET = withAuth(async (req, user) => {
  try {
    const analytics = await PaperService.getUserAnalytics(user.id);
    return NextResponse.json({ data: analytics });
  } catch (error) {
    console.error("Fetch Analytics Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
});
