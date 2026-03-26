import { NextRequest, NextResponse } from "next/server";
import { userRepository } from "../repositories/user.repository";
import { verifyCustomToken } from "@/lib/jwt";

export type AuthenticatedHandler = (req: NextRequest, user: any, context: any) => Promise<Response>;

/**
 * Higher-order function to wrap route handlers with authentication check.
 * Extracts the user from the database based on the 'philosophid_session' cookie JWT.
 * 
 * @param handler The actual route handler function
 * @returns A wrapped route handler
 */
export const withAuth = (handler: AuthenticatedHandler) => {
  return async (req: NextRequest, context: any) => {
    try {
      const token = req.cookies.get("philosophid_session")?.value;
      
      if (!token) {
        return NextResponse.json(
          { error: "Unauthorized: Missing authentication session" },
          { status: 401 }
        );
      }

      let payload;
      try {
        payload = verifyCustomToken(token);
      } catch (error) {
        return NextResponse.json(
          { error: "Unauthorized: Invalid or expired session" },
          { status: 401 }
        );
      }

      const user = await userRepository.findById(payload.uid);
      
      if (!user) {
        return NextResponse.json(
          { error: "Unauthorized: User not found in database" },
          { status: 401 }
        );
      }

      // Add user to the context or request for easier access in handlers
      return handler(req, user, context);
    } catch (error) {
      console.error("[Middleware: Authentication] Unexpected error:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  };
};

/**
 * Checks if a user has a specific role. Should be used within an authenticated handler.
 */
export const hasRole = (user: any, roles: string[]) => {
  return roles.includes(user.role);
};
