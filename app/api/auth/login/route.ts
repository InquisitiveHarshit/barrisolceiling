import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    // In a real application, you'd verify against a database user.
    // For this simple admin panel, we're using hardcoded credentials via env variables
    // or just a basic hardcoded check as fallback for now.
    const validUsername = process.env.ADMIN_USERNAME || "admin";
    const validPassword = process.env.ADMIN_PASSWORD || "admin123";

    if (username !== validUsername || password !== validPassword) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate JWT
    const token = jwt.sign(
      { role: "admin" },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "24h" }
    );

    return NextResponse.json({ success: true, token }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
