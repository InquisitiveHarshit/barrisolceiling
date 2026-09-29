import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import connectDB from "@/lib/db";
import HomePageSettings from "@/models/HomePageSettings";
import { authenticateAdmin } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();
    let settings = await HomePageSettings.findOne({});
    if (!settings) {
      settings = await HomePageSettings.create({});
    }
    return NextResponse.json({ success: true, settings });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
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
    
    let settings = await HomePageSettings.findOne({});
    if (!settings) {
      settings = await HomePageSettings.create(body);
    } else {
      settings = await HomePageSettings.findOneAndUpdate({}, body, { new: true });
    }
    
    revalidatePath("/");
    
    return NextResponse.json({ success: true, settings });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
