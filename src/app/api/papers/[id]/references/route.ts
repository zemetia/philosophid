import { NextRequest, NextResponse } from "next/server";
import { referenceService } from "@/backend/services/reference.service";
import { withAuth } from "@/backend/middleware/auth.middleware";

export const GET = withAuth(async (req, user, { params }) => {
  try {
    const { id: paperId } = await params;
    const references = await referenceService.getByPaperId(paperId);
    return NextResponse.json(references);
  } catch (error: any) {
    console.error(`[GET_REFERENCES_API] Error:`, error);
    return NextResponse.json({ error: error.message || "Failed to fetch references" }, { status: 500 });
  }
});

export const POST = withAuth(async (req, user, { params }) => {
  try {
    const { id: paperId } = await params;
    const body = await req.json();
    const newReference = await referenceService.addReference(paperId, body);
    return NextResponse.json(newReference, { status: 201 });
  } catch (error: any) {
    console.error(`[POST_REFERENCE_API] Error:`, error);
    return NextResponse.json({ error: error.message || "Failed to create reference" }, { status: 400 });
  }
});
