import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";
import { authenticateAdmin } from "@/lib/auth";
import connectDB from "@/lib/db";
import { GalleryImage } from "@/models/GalleryImage";
import { toBarrisolUrl, generateImageSlug } from "@/lib/media";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const docs = await GalleryImage.find().sort({ createdAt: -1 }).lean();
    const images = docs.map((img: any) => ({
      ...img,
      url: toBarrisolUrl(img.url),
    }));
    return NextResponse.json({ success: true, images }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // Parse CLOUDINARY_URL: cloudinary://api_key:api_secret@cloud_name
    const cloudinaryUrl = process.env.CLOUDINARY_URL || "";
    const match = cloudinaryUrl.match(/cloudinary:\/\/(\d+):([^@]+)@(.+)/);
    if (!match) {
      return NextResponse.json(
        { success: false, message: "Cloudinary is not configured correctly." },
        { status: 500 }
      );
    }
    cloudinary.config({
      api_key: match[1],
      api_secret: match[2],
      cloud_name: match[3],
    });

    const authResult = await authenticateAdmin(req);
    if (authResult.error) {
      return NextResponse.json(
        { success: false, message: authResult.error },
        { status: authResult.status }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const title = formData.get("title") as string | null;
    const alt = formData.get("alt") as string | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file provided" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const cleanSlug = generateImageSlug(title || file.name) || "gallery-image";

    // Upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "borocelling/gallery",
          public_id: `${cleanSlug}-${Date.now().toString().slice(-6)}`,
          resource_type: "image",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    }) as any;

    await connectDB();
    
    // Save metadata to MongoDB with first-party Barrisol URL
    const newImage = await GalleryImage.create({
      url: toBarrisolUrl(uploadResult.secure_url),
      publicId: uploadResult.public_id,
      title: title?.trim() || file.name.replace(/\.[^/.]+$/, ""),
      alt: alt ? alt.trim() : "",
    });

    revalidatePath("/gallery");
    revalidatePath("/");

    return NextResponse.json(
      { success: true, image: newImage },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const authResult = await authenticateAdmin(req);
    if (authResult.error) {
      return NextResponse.json(
        { success: false, message: authResult.error },
        { status: authResult.status }
      );
    }

    // Parse CLOUDINARY_URL: cloudinary://api_key:api_secret@cloud_name
    const cloudinaryUrl = process.env.CLOUDINARY_URL || "";
    const match = cloudinaryUrl.match(/cloudinary:\/\/(\d+):([^@]+)@(.+)/);
    if (match) {
      cloudinary.config({
        api_key: match[1],
        api_secret: match[2],
        cloud_name: match[3],
      });
    }

    const { id } = await req.json();
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Image ID is required." },
        { status: 400 }
      );
    }

    await connectDB();
    const image = await GalleryImage.findById(id);
    if (!image) {
      return NextResponse.json(
        { success: false, message: "Image not found." },
        { status: 404 }
      );
    }

    // Delete from Cloudinary first
    if (image.publicId) {
      await cloudinary.uploader.destroy(image.publicId);
    }

    // Then delete from MongoDB
    await GalleryImage.findByIdAndDelete(id);

    revalidatePath("/gallery");
    revalidatePath("/");

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const authResult = await authenticateAdmin(req);
    if (authResult.error) {
      return NextResponse.json(
        { success: false, message: authResult.error },
        { status: authResult.status }
      );
    }

    const { id, title, alt, location, showInHero, material, materialSpec, lightingCCT, lightingDimming, photometrics, warranty } = await req.json();
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Image ID is required." },
        { status: 400 }
      );
    }

    await connectDB();
    const updateFields: Record<string, unknown> = { title, location };
    if (alt           !== undefined) updateFields.alt           = alt;
    if (typeof showInHero === "boolean") updateFields.showInHero = showInHero;
    if (material      !== undefined) updateFields.material      = material;
    if (materialSpec  !== undefined) updateFields.materialSpec  = materialSpec;
    if (lightingCCT   !== undefined) updateFields.lightingCCT   = lightingCCT;
    if (lightingDimming !== undefined) updateFields.lightingDimming = lightingDimming;
    if (photometrics  !== undefined) updateFields.photometrics  = photometrics;
    if (warranty      !== undefined) updateFields.warranty      = warranty;

    const updated = await GalleryImage.findByIdAndUpdate(
      id,
      updateFields,
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Image not found." },
        { status: 404 }
      );
    }

    revalidatePath("/gallery");
    revalidatePath("/");

    return NextResponse.json({ success: true, image: updated }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
