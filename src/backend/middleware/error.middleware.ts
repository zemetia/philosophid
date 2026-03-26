import { NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Common API error response standard
 * @param error 
 */
export const handleApiError = (error: any) => {
  console.error("[API Error Controller]:", error);

  if (error instanceof ZodError) {
    return NextResponse.json(
      { 
        error: "Validation failed", 
        details: error.issues.map(e => ({ path: e.path.join('.'), message: e.message }))
      },
      { status: 400 }
    );
  }

  const message = error.message || "Something went wrong";
  const status = error.status || 500;

  return NextResponse.json(
    { error: message },
    { status: status }
  );
};

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number = 400) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}
