import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Service from "@/models/Service";
import { authenticateAdmin } from "@/lib/auth";

// GET /api/services
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const publishedOnly = searchParams.get("published") !== "false";

    const query = publishedOnly ? { isPublished: true } : {};
    const services = await Service.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: services }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// POST /api/services  (admin only)
export async function POST(req: NextRequest) {
  try {
    const authResult = await authenticateAdmin(req);
    if (authResult.error) {
      return NextResponse.json(
        { success: false, message: authResult.error },
        { status: authResult.status }
      );
    }

    await connectDB();
    const body = await req.json();
    const service = await Service.create(body);

    return NextResponse.json({ success: true, data: service }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}
