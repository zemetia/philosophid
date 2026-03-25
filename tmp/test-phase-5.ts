import { prisma } from "../src/lib/prisma";
import { PaperService } from "../src/lib/services/paper-service";
import { BadgeService } from "../src/lib/services/badge-service";

async function testUserSystem() {
  console.log("🚀 Starting User System Verification (Phase 5)...");

  try {
    // 1. Setup Test User
    const testEmail = `tester-${Date.now()}@example.com`;
    const testFirebaseUid = `fb-${Date.now()}`;
    
    console.log(`\n1. Creating Test User: ${testEmail}`);
    const user = await prisma.user.create({
      data: {
        email: testEmail,
        firebaseUid: testFirebaseUid,
        name: "Test User",
      },
    });
    console.log("✅ User created:", user.id);

    // 2. Setup Test Competition
    console.log("\n2. Creating Test Competition (Free Article Competition)");
    const competition = await prisma.competition.create({
      data: {
        title: "Test Philosophy Competition",
        description: "A test competition for verification.",
        type: "ARTICLE",
        fee: 0,
        startDate: new Date(),
        endDate: new Date(Date.now() + 86400000), // tomorrow
      },
    });
    console.log("✅ Competition created:", competition.id);

    // 3. Test Standalone Paper Creation (Step 5.1)
    console.log("\n3. Testing Standalone Paper Creation...");
    const paper1 = await PaperService.createPaper({
      title: "My First Philosophy Article",
      content: { type: "doc", content: [{ type: "paragraph", content: [{ type: "text", text: "Hello World" }] }] },
      type: "ARTICLE",
      authorId: user.id
    });
    console.log("✅ Paper created:", paper1.id);

    // 4. Verify Score for Standalone Paper (Step 5.3)
    const userState1 = await prisma.user.findUnique({ where: { id: user.id } });
    console.log("📊 Current Score (Expected 10):", userState1?.score);
    if (userState1?.score !== 10) throw new Error("Score mismatch after standalone paper");

    // 5. Verify Badge Unlocked for First Paper (Step 5.4)
    const badges1 = await prisma.userBadge.findMany({ 
      where: { userId: user.id },
      include: { badge: true }
    });
    console.log("🏅 Badges Unlocked:", badges1.map(b => b.badge.name).join(", "));
    if (!badges1.some(b => b.badge.name === "First Word")) throw new Error("Badge 'First Word' not awarded");

    // 6. Test Competition Entry (Step 5.2)
    console.log("\n4. Testing Competition Entry...");
    const paper2 = await PaperService.createPaper({
      title: "Enrolling in Competition",
      content: { type: "doc", content: [] },
      type: "ARTICLE",
      authorId: user.id,
      competitionId: competition.id
    });
    console.log("✅ Competition Paper created:", paper2.id);

    // 7. Verify Entry & Score
    const entry = await prisma.competitionEntry.findUnique({ where: { paperId: paper2.id } });
    if (!entry) throw new Error("Competition entry not found in database");
    console.log("✅ Competition entry relation verified.");

    const userState2 = await prisma.user.findUnique({ where: { id: user.id } });
    console.log("📊 Current Score (Expected 30: 10 + 20):", userState2?.score);
    if (userState2?.score !== 30) throw new Error("Score mismatch after competition entry");

    // 8. Verify Analytics (Step 5.5)
    console.log("\n5. Checking Analytics...");
    const analytics = await PaperService.getUserAnalytics(user.id);
    console.log("📈 Analytics Result:", JSON.stringify(analytics, null, 2));
    if (analytics.totalCompetitions !== 1) throw new Error("Analytics competition count mismatch");

    console.log("\n✨ ALL TESTS PASSED SUCCESSFULLY! ✨");

  } catch (error) {
    console.error("\n❌ TEST FAILED:");
    console.error(error);
    process.exit(1);
  } finally {
    // Cleanup is optional for manual verification but good practice
    // For now, we keep the data for manual UI check if needed
  }
}

testUserSystem();
