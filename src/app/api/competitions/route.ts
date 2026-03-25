import { NextRequest, NextResponse } from "next/server";
import { verifyUserInDatabase } from "@/lib/auth";
import { CompetitionService } from "@/lib/services/competition-service";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type") as any;
    const active = searchParams.get("active") === "true";

    const competitions = await CompetitionService.listCompetitions({ type, active });
    return NextResponse.json({ data: competitions });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch competitions" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const firebaseUid = req.headers.get("x-firebase-uid");
    const user = await verifyUserInDatabase(firebaseUid || "");

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized: Admin access required" }, { status: 401 });
    }

    const body = await req.json();
    const competition = await CompetitionService.createCompetition({
      ...body,
      creatorId: user.id
    });

    return NextResponse.json({ data: competition }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create competition" }, { status: 500 });
  }
}
