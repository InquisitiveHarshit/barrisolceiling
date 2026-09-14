import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";
import { Admin } from "@/models/Admin";
import { authenticateAdmin } from "@/lib/auth";

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

// GET /api/admin-users — list all admins from MongoDB
export async function GET(req: NextRequest) {
  const { error, status } = await authenticateAdmin(req);
  if (error) return NextResponse.json({ error }, { status });

  await connectDB();
  await ensureDefaultAdmins();

  const dbAdmins = await Admin.find({}).sort({ createdAt: -1 });

  const admins = dbAdmins.map((a) => ({
    _id: a._id.toString(),
    username: a.username,
    rawPassword: a.rawPassword || "••••••••",
    createdAt: a.createdAt,
  }));

  return NextResponse.json({ admins });
}

// POST /api/admin-users — create a new admin in MongoDB
export async function POST(req: NextRequest) {
  const { error, status } = await authenticateAdmin(req);
  if (error) return NextResponse.json({ error }, { status });

  try {
    const { username, password } = await req.json();

    if (!username?.trim() || !password?.trim()) {
      return NextResponse.json(
        { error: "Username and password are required." },
        { status: 400 }
      );
    }

    await connectDB();

    const cleanUsername = username.trim();
    const existing = await Admin.findOne({
      username: { $regex: new RegExp(`^${cleanUsername.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i") },
    });

    if (existing) {
      return NextResponse.json(
        { error: "An admin with this username already exists." },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password.trim(), 12);
    const admin = await Admin.create({
      username: cleanUsername,
      passwordHash,
      rawPassword: password.trim(),
    });

    return NextResponse.json(
      {
        success: true,
        admin: {
          _id: admin._id,
          username: admin.username,
          rawPassword: admin.rawPassword,
          createdAt: admin.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
