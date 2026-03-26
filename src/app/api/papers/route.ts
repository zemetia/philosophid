import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/backend/middleware/auth.middleware";
import { paperService } from "@/backend/services/paper.service";
import { handleApiError } from "@/backend/middleware/error.middleware";

export const POST = withAuth(async (req: NextRequest, user) => {
  try {
    const body = await req.json();
    const { title, content, type, excerpt, coverImageUrl, tags, competitionId } = body;

    const paper = await paperService.createPaper({
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
  } catch (error) {
    return handleApiError(error);
  }
});

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

    const result = await paperService.getPapers(filters);
    return NextResponse.json({ data: result.data, meta: result.meta });
  } catch (error) {
    return handleApiError(error);
  }
}

