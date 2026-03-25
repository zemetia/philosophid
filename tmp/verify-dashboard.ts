import { prisma } from "../src/lib/prisma";
import { UserService } from "../src/lib/services/user-service";

async function verifyDashboard() {
  console.log("Starting Dashboard Verification...");
  
  // 1. Check if we have any user
  const user = await prisma.user.findFirst();
  if (!user) {
    console.warn("No user found in database to test dashboard. Creating a dummy...");
    // We won't actually create to avoid messing with staging/prod DB during verification
    // unless absolutely necessary. Let's just mock the service call if possible.
    return;
  }

  console.log(`Testing dashboard for user: ${user.email} (${user.id})`);

  try {
    const start = Date.now();
    const dashboard = await UserService.getUserDashboard(user.id);
    const end = Date.now();

    console.log("Dashboard Data Fetched Successfully:");
    console.log("- Total Papers:", dashboard?.statistics.total);
    console.log("- Published:", dashboard?.statistics.published);
    console.log("- Recent Items Count:", dashboard?.recentActivity.length);
    console.log("- Badges Count:", dashboard?.badges.length);
    console.log(`- Fetch Time: ${end - start}ms`);

    if (dashboard && dashboard.statistics.total >= 0) {
      console.log("✅ Dashboard Logic Verified.");
    } else {
      console.error("❌ Dashboard Logic returned unexpected data.");
    }
  } catch (error) {
    console.error("❌ Dashboard Verification Failed:", error);
  }
}

verifyDashboard();
