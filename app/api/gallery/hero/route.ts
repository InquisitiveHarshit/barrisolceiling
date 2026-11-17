import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { GalleryImage } from "@/models/GalleryImage";

export async function GET() {
  try {
    await connectDB();
    const docs = await GalleryImage.find({ showInHero: true }).sort({ createdAt: -1 }).lean();
    docs.sort((a: any, b: any) => {
      const orderA = typeof a.order === "number" && a.order > 0 ? a.order : 999999;
      const orderB = typeof b.order === "number" && b.order > 0 ? b.order : 999999;
      if (orderA !== orderB) return orderA - orderB;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    return NextResponse.json({ success: true, images: docs }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
