import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Blog from "@/models/Blog";
import { authenticateAdmin } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const publishedOnly = searchParams.get("published") !== "false";
    const tag = searchParams.get("tag");

    const query: any = {};
    if (publishedOnly) {
      query.isPublished = true;
    }
    if (tag) {
      query.tags = tag;
    }

    const blogs = await Blog.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: blogs }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

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

    // Strip HTML tags to check if content is actually empty
    const textContent = body.content?.replace(/<[^>]*>/g, "").trim();

    if (!body.title?.trim()) {
      return NextResponse.json(
        { success: false, message: "Title is required." },
        { status: 400 }
      );
    }
    if (!textContent) {
      return NextResponse.json(
        { success: false, message: "Content cannot be empty." },
        { status: 400 }
      );
    }

    const blog = await Blog.create(body);
    return NextResponse.json({ success: true, data: blog }, { status: 201 });
  } catch (error: any) {
    // Log full error to terminal for easier debugging
    console.error("[POST /api/blogs] Error:", error.message, error.code);

    // Check for duplicate slug error (MongoDB code 11000)
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, message: "A blog with this title/slug already exists." },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}
