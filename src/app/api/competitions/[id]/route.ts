import { NextRequest, NextResponse } from "next/server";
import { competitionService } from "@/backend/services/competition.service";
import { handleApiError } from "@/backend/middleware/error.middleware";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const competition = await competitionService.getCompetitionById(id);
    return NextResponse.json({ data: competition });
  } catch (error) {
    return handleApiError(error);
  }
}
