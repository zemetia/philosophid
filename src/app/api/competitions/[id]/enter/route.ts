import { NextRequest, NextResponse } from "next/server";
import { competitionService } from "@/backend/services/competition.service";
import { withAuth } from "@/backend/middleware/auth.middleware";

export const POST = withAuth(async (req, user, { params }) => {
  try {
    const { id } = await params;
    const { paperId } = await req.json();
    if (!paperId) {
      return NextResponse.json({ error: "Paper ID is required" }, { status: 400 });
    }

    const result = await competitionService.enterCompetition(id, paperId, user.id);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
});
