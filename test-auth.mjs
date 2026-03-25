import fs from 'fs';

const API_KEY = "AIzaSyCb8kOM3w4-yesyDoioh90rRIMAdmZ_Qug";

async function runTest() {
  console.log("1. Signing up/in test user via Firebase REST API...");
  const email = "test_auth_flow" + Date.now() + "@example.com";
  const password = "password123!";

  // Sign up
  const signUpRes = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, returnSecureToken: true }),
  });
  
  if (!signUpRes.ok) throw new Error("Firebase Sign Up Failed: " + await signUpRes.text());
  
  const signUpData = await signUpRes.json();
  const idToken = signUpData.idToken;
  console.log("✅ Firebase Sign Up successful, got ID token.");

  console.log("\n2. Calling /api/auth/sync with Firebase ID token (Simulating Login)...");
  const sync1Res = await fetch("http://localhost:3000/api/auth/sync", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${idToken}`
    },
    body: JSON.stringify({
      uid: signUpData.localId,
      email: signUpData.email,
      name: "Test User",
      picture: "https://example.com/pic.jpg"
    })
  });

  if (!sync1Res.ok) throw new Error("First Sync Failed: " + await sync1Res.text());
  
  const sync1Data = await sync1Res.json();
  const setCookieHeader = sync1Res.headers.get("set-cookie");
  
  if (!setCookieHeader) throw new Error("❌ No Set-Cookie header found in response.");
  console.log("✅ First Sync successful. Set-Cookie header received:", setCookieHeader);
  
  // Extract philosophid_session cookie
  const match = setCookieHeader.match(/philosophid_session=([^;]+)/);
  if (!match) throw new Error("❌ philosophid_session cookie not found in Set-Cookie header.");
  const sessionCookie = match[0];
  console.log("✅ Extracted custom cookie:", sessionCookie);

  console.log("\n3. Calling /api/auth/sync with ONLY the custom cookie (Simulating Register Wizard)...");
  const sync2Res = await fetch("http://localhost:3000/api/auth/sync", {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Cookie": sessionCookie // Sending just the cookie, NO Authorization header
    },
    body: JSON.stringify({
      location: "Test City",
      institution: "Test University"
    })
  });

  if (!sync2Res.ok) throw new Error("❌ Second Sync (Wizard) Failed with status: " + sync2Res.status + " " + await sync2Res.text());
  
  const sync2Data = await sync2Res.json();
  console.log("✅ Second Sync successful! 200 OK. User data merged:", sync2Data.location);
  console.log("\n🎉 E2E Authentication Flow Test COMPLETED SUCCESSFULLY!");
}

runTest().catch(console.error);
