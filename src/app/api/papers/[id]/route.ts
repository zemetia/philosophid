import { NextRequest, NextResponse } from "next/server";
import { verifyUserInDatabase } from "@/lib/auth";
import { PaperService } from "@/lib/services/paper-service";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const idOrSlug = params.id;
    const paper = await PaperService.getPaperByIdOrSlug(idOrSlug, true);

    if (!paper) {
      return NextResponse.json({ error: "Paper not found" }, { status: 404 });
    }

    // Security: If paper is DRAFT, only owner can see
    if (paper.status === "DRAFT") {
      const firebaseUid = req.headers.get("x-firebase-uid");
      const user = await verifyUserInDatabase(firebaseUid || "");
      if (!user || user.id !== paper.authorId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    return NextResponse.json({ data: paper });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch paper" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const firebaseUid = req.headers.get("x-firebase-uid");
    const user = await verifyUserInDatabase(firebaseUid || "");

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const paper = await PaperService.updatePaper(params.id, body, user.id);

    return NextResponse.json({ data: paper });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const firebaseUid = req.headers.get("x-firebase-uid");
    const user = await verifyUserInDatabase(firebaseUid || "");

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await PaperService.archivePaper(params.id, user.id);
    return NextResponse.json({ message: "Paper archived successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
