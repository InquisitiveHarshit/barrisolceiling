import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { GalleryImage } from "@/models/GalleryImage";

export async function GET() {
  try {
    await connectDB();
    const images = await GalleryImage.find({ showInHero: true }).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, images }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
