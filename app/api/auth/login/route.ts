import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";
import { Admin } from "@/models/Admin";

// Ensure default admin accounts exist in MongoDB
async function ensureDefaultAdmins() {
  const count = await Admin.countDocuments();
  if (count === 0) {
    const defaultAdmins = [
      { username: "admin", password: "admin123" },
      { username: "barrisol admin", password: "barisol panjab" },
    ];

    for (const def of defaultAdmins) {
      const passwordHash = await bcrypt.hash(def.password, 12);
      await Admin.create({
        username: def.username,
        passwordHash,
        rawPassword: def.password,
      });
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "Username and password required" },
        { status: 400 }
      );
    }

    const cleanUsername = username.trim();
    const cleanPassword = password.trim();

    await connectDB();
    await ensureDefaultAdmins();

    // Find admin by username (case-insensitive)
    const dbAdmin = await Admin.findOne({
      username: { $regex: new RegExp(`^${cleanUsername.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i") },
    });

    let isValid = false;
    if (dbAdmin) {
      // 1. Check bcrypt hash
      isValid = await bcrypt.compare(cleanPassword, dbAdmin.passwordHash);
      // 2. Fallback to rawPassword check if bcrypt compare fails
      if (!isValid && dbAdmin.rawPassword) {
        isValid = dbAdmin.rawPassword.trim() === cleanPassword;
      }
    }

    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate JWT
    const token = jwt.sign(
      { role: "admin", username: dbAdmin?.username || cleanUsername },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "24h" }
    );

    const response = NextResponse.json({ success: true }, { status: 200 });
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 24 * 60 * 60, // 24 hours
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
