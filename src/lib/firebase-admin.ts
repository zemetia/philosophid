import * as admin from "firebase-admin";

let _app: admin.app.App | null = null;

const getAdminApp = (): admin.app.App | null => {
  if (_app) return _app;
  if (admin.apps.length > 0) {
    _app = admin.app();
    return _app;
  }

  try {
    let credential: admin.credential.Credential;

    if (process.env.NODE_ENV !== "production") {
      // In dev, load directly from the service account JSON file
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

    _app = admin.initializeApp({
      credential,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID,
    });
  } catch (error) {
    // Gracefully handle errors (e.g., during next build static analysis or PEM issues)
    console.warn("[firebase-admin] Failed to initialize:", (error as Error).message);
    if (admin.apps.length > 0) {
      _app = admin.app();
      return _app;
    }
    return null;
  }

  return _app;
};

// Lazy getters — only call getAdminApp() when first accessed, not at import time
export const getAdminAuth = (): admin.auth.Auth | null => {
  const app = getAdminApp();
  return app ? admin.auth(app) : null;
};

export const getAdminDb = (): admin.firestore.Firestore | null => {
  const app = getAdminApp();
  return app ? admin.firestore(app) : null;
};

export const getAdminStorage = (): admin.storage.Storage | null => {
  const app = getAdminApp();
  return app ? admin.storage(app) : null;
};

// Backward-compatible proxy exports so existing code using adminAuth.xxx still works
export const adminAuth = new Proxy({} as admin.auth.Auth, {
  get(_target, prop) {
    const auth = getAdminAuth();
    if (!auth) throw new Error("[firebase-admin] Auth not initialized");
    return (auth as any)[prop];
  },
});

export const adminDb = new Proxy({} as admin.firestore.Firestore, {
  get(_target, prop) {
    const db = getAdminDb();
    if (!db) throw new Error("[firebase-admin] Firestore not initialized");
    return (db as any)[prop];
  },
});

export const adminStorage = new Proxy({} as admin.storage.Storage, {
  get(_target, prop) {
    const storage = getAdminStorage();
    if (!storage) throw new Error("[firebase-admin] Storage not initialized");
    return (storage as any)[prop];
  },
});
