import { NextRequest, NextResponse } from "next/server";
import { CompetitionService } from "@/lib/services/competition-service";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const competition = await CompetitionService.getCompetitionById(params.id);
    if (!competition) {
      return NextResponse.json({ error: "Competition not found" }, { status: 404 });
    }
    return NextResponse.json({ data: competition });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch competition" }, { status: 500 });
  }
}
