import { adminAuth } from "./firebase-admin";
import { headers, cookies } from "next/headers";
import { verifyCustomToken } from "./jwt";

export interface AuthUser {
  uid: string;
  email?: string;
  name?: string;
  picture?: string;
}

/**
 * Gets the authenticated user from the request headers using Custom JWT or Firebase Admin.
 * To be used in Server Components or API Routes.
 */
export async function getAuthUser(): Promise<AuthUser | null> {
  const headersList = await headers();
  const authHeader = headersList.get("authorization");
  
  let token = authHeader?.startsWith("Bearer ") ? authHeader.split("Bearer ")[1] : null;

  // Fallback to cookie if Bearer token is missing
  if (!token) {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("philosophid_session");
    if (sessionCookie?.value) {
      token = sessionCookie.value;
    }
  }

  if (!token) {
    console.debug("Auth header and session cookie are missing");
    return null;
  }

  // 1. Try Custom JWT Verification First
  try {
    const decodedCustomToken = verifyCustomToken(token);
    return {
      uid: decodedCustomToken.uid,
      email: decodedCustomToken.email,
      name: decodedCustomToken.name,
      picture: decodedCustomToken.picture,
    };
  } catch (error) {
    // Custom JWT verification failed, fallback to Firebase
    console.debug("Custom JWT verification failed. Falling back to Firebase ID token.");
  }

  // 2. Fallback to Firebase ID Token Verification
  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    
    // Hardening: Ensure uid is present in decoded token
    if (!decodedToken.uid) {
      console.error("Firebase token decoded but UID is missing");
      return null;
    }

    return {
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name,
      picture: decodedToken.picture,
    };
  } catch (error: any) {
    // Specific error handling for distinct cases
    if (error.code === 'auth/id-token-expired') {
      console.warn("Firebase ID token expired");
    } else {
      console.error("Error verifying Firebase ID token:", error.message || error);
    }
    return null;
  }
}
