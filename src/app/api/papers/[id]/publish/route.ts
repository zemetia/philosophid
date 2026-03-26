import { NextRequest, NextResponse } from "next/server";
import { PaperService } from "@/lib/services/paper-service";
import { withAuth } from "@/backend/middleware/auth.middleware";

export const PATCH = withAuth(async (req, user, { params }) => {
  try {
    const { id } = await params;
    const paper = await PaperService.requestPublish(id, user.id);

    return NextResponse.json({ 
      message: "Publication request submitted",
      data: paper 
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
});
