import { NextRequest, NextResponse } from "next/server";
import { PaperService } from "@/lib/services/paper-service";
import { withAuth } from "@/backend/middleware/auth.middleware";
import { verifyCustomToken } from "@/lib/jwt";
import { userRepository } from "@/backend/repositories/user.repository";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idOrSlug } = await params;
    const paper = await PaperService.getPaperByIdOrSlug(idOrSlug, true);

    if (!paper) {
      return NextResponse.json({ error: "Paper not found" }, { status: 404 });
    }

    // Security: If paper is DRAFT, only owner can see
    if (paper.status === "DRAFT") {
      const token = req.cookies.get("philosophid_session")?.value;
      if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      try {
        const payload = verifyCustomToken(token);
        if (payload.uid !== paper.authorId) {
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
      } catch (e) {
        return NextResponse.json({ error: "Unauthorized: Invalid session" }, { status: 401 });
      }
    }

    return NextResponse.json({ data: paper });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch paper" }, { status: 500 });
  }
}

export const PUT = withAuth(async (req, user, { params }) => {
  try {
    const { id } = await params;
    const body = await req.json();
    const paper = await PaperService.updatePaper(id, body, user.id);

    return NextResponse.json({ data: paper });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
});

export const DELETE = withAuth(async (req, user, { params }) => {
  try {
    const { id } = await params;
    await PaperService.archivePaper(id, user.id);
    return NextResponse.json({ message: "Paper archived successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
});
