import { NextRequest, NextResponse } from "next/server";
import { withAuth, hasRole } from "@/backend/middleware/auth.middleware";
import { competitionService } from "@/backend/services/competition.service";
import { handleApiError, ApiError } from "@/backend/middleware/error.middleware";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type") as any;
    const activeRaw = searchParams.get("active");
    const active = activeRaw === "true" ? true : activeRaw === "false" ? false : undefined;

    const competitions = await competitionService.listCompetitions({ type, active });
    return NextResponse.json({ data: competitions });
  } catch (error) {
    return handleApiError(error);
  }
}

export const POST = withAuth(async (req: NextRequest, user) => {
  try {
    if (!hasRole(user, ["ADMIN", "SUPER_ADMIN", "EDITOR"])) {
      throw new ApiError("Unauthorized: Admin access required", 403);
    }

    const body = await req.json();
    const competition = await competitionService.createCompetition({
      ...body,
      creator: { connect: { id: user.id } }
    });

    return NextResponse.json({ data: competition }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
});
