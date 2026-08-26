import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { ContactLead } from "@/models/ContactLead";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const leads = await ContactLead.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, leads }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, email, phone, message } = body;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: "Name and email are required." },
        { status: 400 }
      );
    }

    const lead = await ContactLead.create({ name, email, phone, message });
    return NextResponse.json({ success: true, lead }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
