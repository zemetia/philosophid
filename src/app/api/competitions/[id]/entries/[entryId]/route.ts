import { NextRequest, NextResponse } from "next/server";
import { competitionService } from "@/backend/services/competition.service";
import { withAuth } from "@/backend/middleware/auth.middleware";

export const PATCH = withAuth(async (req, user, { params }) => {
  try {
    if (user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized: Admin access required" }, { status: 401 });
    }

    const { entryId } = await params;
    const { status } = await req.json();
    if (!status) {
      return NextResponse.json({ error: "Status is required" }, { status: 400 });
    }

    const entry = await competitionService.updateEntryStatus(entryId, status);
    return NextResponse.json({ data: entry });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
});
