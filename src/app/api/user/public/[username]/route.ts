import { NextRequest, NextResponse } from "next/server";
import { UserService } from "@/lib/services/user-service";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await params;

    if (!username) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    const profileData = await UserService.getUserProfileByUsername(username);

    if (!profileData) {
      return NextResponse.json(
        { error: "Philosopher not found" },
        { status: 404 }
      );
    }

    // Omit sensitive data if accessing publicly
    const publicProfile = {
      user: {
        id: profileData.user.id,
        name: profileData.user.name,
        username: profileData.user.username,
        avatarUrl: profileData.user.avatarUrl,
        role: profileData.user.role,
        score: profileData.user.score,
        bio: profileData.user.bio,
        location: profileData.user.location,
        institution: profileData.user.institution,
        major: profileData.user.major,
        interests: profileData.user.interests,
        favoritePhilosopher: profileData.user.favoritePhilosopher,
        philosophySchool: profileData.user.philosophySchool,
        createdAt: profileData.user.createdAt,
      },
      papers: profileData.papers.filter((p: any) => p.status === "PUBLISHED"),
      badges: profileData.badges,
    };

    return NextResponse.json({ data: publicProfile });
  } catch (error) {
    console.error("Fetch Public Profile Error:", error);
    return NextResponse.json(
      { error: "An existential crisis occurred on the server" },
      { status: 500 }
    );
  }
}
