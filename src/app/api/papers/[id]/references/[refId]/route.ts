import { NextRequest, NextResponse } from "next/server";
import { referenceService } from "@/backend/services/reference.service";
import { withAuth } from "@/backend/middleware/auth.middleware";

export const PATCH = withAuth(async (req, user, { params }) => {
  try {
    const { refId } = await params;
    const body = await req.json();
    const updated = await referenceService.updateReference(refId, body);
    return NextResponse.json(updated);
  } catch (error: any) {
    console.error(`[PATCH_REFERENCE_API] Error:`, error);
    return NextResponse.json({ error: error.message || "Failed to update reference" }, { status: 400 });
  }
});

export const DELETE = withAuth(async (req, user, { params }) => {
  try {
    const { refId } = await params;
    await referenceService.deleteReference(refId);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error(`[DELETE_REFERENCE_API] Error:`, error);
    return NextResponse.json({ error: error.message || "Failed to delete reference" }, { status: 400 });
  }
});
