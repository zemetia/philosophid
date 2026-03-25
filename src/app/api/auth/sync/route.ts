import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth-server";
import { UserService } from "@/lib/services/user-service";
import { signCustomToken } from "@/lib/jwt";

export async function POST(req: NextRequest) {
  try {
    const firebaseUser = await getAuthUser();

    if (!firebaseUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    
    const dbUser = await UserService.syncUserWithDatabase({
      ...firebaseUser,
      ...body
    });

    // Generate custom JWT token for client-side storage
    const customToken = signCustomToken({
      uid: dbUser.id,
      email: dbUser.email || undefined,
      name: dbUser.name || undefined,
      picture: dbUser.avatarUrl || undefined,
      isRegistered: !!dbUser.location,
    });

    const response = NextResponse.json({ ...dbUser, customToken });
    response.cookies.set({
      name: 'philosophid_session',
      value: customToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 // 7 days in seconds, matches JWT expiration
    });

    return response;
  } catch (error: any) {
    console.error("Sync error:", error);
    // Log more details for debugging
    if (error.code) console.error("Error Code:", error.code);
    if (error.meta) console.error("Error Meta:", error.meta);
    
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
