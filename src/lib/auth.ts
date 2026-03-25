import { prisma } from "@/lib/prisma";

/**
 * Verifies if a user exists in the database based on their Firebase UID.
 * This does NOT use the Firebase Admin SDK to verify the token signature,
 * relying instead on the database record existence.
 *
 * @param firebaseUid The UID provided by the client
 * @returns The user record if found, null otherwise
 */
export async function verifyUserInDatabase(firebaseUid: string) {
  if (!firebaseUid) {
    return null;
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        firebaseUid: firebaseUid,
      },
    });

    return user;
  } catch (error) {
    console.error("Error verifying user in database:", error);
    return null;
  }
}
