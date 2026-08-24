import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export interface JwtPayload {
  role: string;
  iat: number;
  exp: number;
}

/**
 * Middleware utility to protect API routes.
 * Checks for the authorization header, verifies the JWT, and returns
 * the payload if valid.
 */
export async function authenticateAdmin(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return { error: "Missing or invalid authorization header.", status: 401 };
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "default_secret"
    ) as JwtPayload;

    if (decoded.role !== "admin") {
      return { error: "Forbidden: Admin access required.", status: 403 };
    }

    return { user: decoded, error: null };
  } catch (error) {
    return { error: "Invalid or expired token.", status: 401 };
  }
}
