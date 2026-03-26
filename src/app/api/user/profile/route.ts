import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/backend/middleware/auth.middleware";
import { userService } from "@/backend/services/user.service";
import { handleApiError } from "@/backend/middleware/error.middleware";

export const GET = withAuth(async (req: NextRequest, user) => {
  try {
    const profileData = await userService.getUserProfile(user.id);
    return NextResponse.json({ data: profileData });
  } catch (error) {
    return handleApiError(error);
  }
});

export const PATCH = withAuth(async (req: NextRequest, user) => {
  try {
    const body = await req.json();
    
    // Update user profile
    const updatedUser = await userService.syncUserWithDatabase({
      uid: user.firebaseUid,
      email: user.email,
      ...body
    });

    return NextResponse.json({ 
      message: "Profile updated successfully",
      data: updatedUser 
    });
  } catch (error) {
    return handleApiError(error);
  }
});
