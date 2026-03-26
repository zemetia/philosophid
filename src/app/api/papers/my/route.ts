import { NextRequest, NextResponse } from "next/server";
import { PaperService } from "@/lib/services/paper-service";
import { withAuth } from "@/backend/middleware/auth.middleware";

export const GET = withAuth(async (req, user) => {
  try {
    const { searchParams } = new URL(req.url);
    
    // For "My Papers", we want ALL statuses (Draft, Published, etc)
    const filters = {
      authorId: user.id,
      status: searchParams.get("status") as any || undefined, // Allow filter by specific status if provided
      page: parseInt(searchParams.get("page") || "1"),
      limit: parseInt(searchParams.get("limit") || "10"),
    };

    const result = await PaperService.getPapers(filters);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
});
