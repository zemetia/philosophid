import { NextRequest, NextResponse } from "next/server";
import { verifyUserInDatabase } from "@/lib/auth";
import { CompetitionService } from "@/lib/services/competition-service";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const firebaseUid = req.headers.get("x-firebase-uid");
    const user = await verifyUserInDatabase(firebaseUid || "");

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { paperId } = await req.json();
    if (!paperId) {
      return NextResponse.json({ error: "Paper ID is required" }, { status: 400 });
    }

    const result = await CompetitionService.enterCompetition(params.id, paperId, user.id);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
