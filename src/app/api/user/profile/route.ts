import { NextRequest, NextResponse } from "next/server";
import { verifyUserInDatabase } from "@/lib/auth";
import { UserService } from "@/lib/services/user-service";

export async function GET(req: NextRequest) {
  try {
    const firebaseUid = req.headers.get("x-firebase-uid");
    const user = await verifyUserInDatabase(firebaseUid || "");

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const profileData = await UserService.getUserProfile(user.id);
    
    if (!profileData) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: profileData });
  } catch (error) {
    console.error("Fetch Profile Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const firebaseUid = req.headers.get("x-firebase-uid");
    const user = await verifyUserInDatabase(firebaseUid || "");

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    
    // Update user profile
    const updatedUser = await UserService.syncUserWithDatabase({
      uid: user.firebaseUid,
      email: user.email,
      ...body
    });

    return NextResponse.json({ 
      message: "Profile updated successfully",
      data: updatedUser 
    });
  } catch (error) {
    console.error("Update Profile Error:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
