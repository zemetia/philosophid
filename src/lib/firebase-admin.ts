import * as admin from "firebase-admin";

const getAdminApp = () => {
  if (admin.apps.length > 0) return admin.app();

  let credential: admin.credential.Credential;

  // In dev, load directly from the service account JSON to avoid PEM parsing issues with .env
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const serviceAccount = require("../../philosophid-db7c6-firebase-adminsdk-fbsvc-50d234327b.json");
    credential = admin.credential.cert(serviceAccount);
  } else {
    // In production, use individual env vars (e.g. Vercel secrets)
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
    credential = admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey,
    });
  }

  try {
    admin.initializeApp({ 
      credential, 
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID 
    });
  } catch (error) {
    console.error("Firebase admin init error:", error);
  }

  return admin.app();
};

export const adminAuth = admin.auth(getAdminApp());
export const adminDb = admin.firestore(getAdminApp());
export const adminStorage = admin.storage(getAdminApp());
