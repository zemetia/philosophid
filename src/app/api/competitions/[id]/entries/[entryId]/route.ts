import { NextRequest, NextResponse } from "next/server";
import { verifyUserInDatabase } from "@/lib/auth";
import { CompetitionService } from "@/lib/services/competition-service";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { entryId: string } }
) {
  try {
    const firebaseUid = req.headers.get("x-firebase-uid");
    const user = await verifyUserInDatabase(firebaseUid || "");

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { status } = await req.json();
    if (!status) {
      return NextResponse.json({ error: "Status is required" }, { status: 400 });
    }

    const entry = await CompetitionService.updateEntryStatus(params.entryId, status);
    return NextResponse.json({ data: entry });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
