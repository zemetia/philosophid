import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyUserInDatabase } from "@/lib/auth";
import { PaperService } from "@/lib/services/paper-service";

export async function POST(req: NextRequest) {
  try {
    const firebaseUid = req.headers.get("x-firebase-uid");
    const user = await verifyUserInDatabase(firebaseUid || "");

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, content, type, excerpt, coverImageUrl, tags, competitionId } = body;

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }

    const paper = await PaperService.createPaper({
      title,
      content,
      type: type || "ARTICLE",
      excerpt,
      coverImageUrl,
      tags,
      authorId: user.id,
      competitionId,
    });

    return NextResponse.json({ data: paper }, { status: 201 });
  } catch (error: any) {
    console.error("Create Paper Error:", error);
    return NextResponse.json({ error: error.message || "Failed to create paper" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    
    const filters = {
      type: searchParams.get("type") as any,
      search: searchParams.get("search") || undefined,
      page: parseInt(searchParams.get("page") || "1"),
      limit: parseInt(searchParams.get("limit") || "10"),
      sortBy: (searchParams.get("sortBy") || "createdAt") as any,
      sortOrder: (searchParams.get("sortOrder") || "desc") as any,
    };

    const result = await PaperService.getPapers(filters);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}

