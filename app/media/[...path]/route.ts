import { NextRequest, NextResponse } from "next/server";

function getCloudName(): string {
  const envUrl = process.env.CLOUDINARY_URL || "";
  const match = envUrl.match(/cloudinary:\/\/(?:\d+):(?:[^@]+)@(.+)/);
  if (match && match[1]) {
    return match[1].trim();
  }
  return "fifvpxxi";
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const imagePath = (path || []).join("/");
  const cloudName = getCloudName();
  const targetUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${imagePath}`;

  console.log(`\n----------------------------------------`);
  console.log(`[Media Proxy] 🖼️  Requested: /media/${imagePath}`);
  console.log(`[Media Proxy] 🌐 Fetching from: ${targetUrl}`);

  try {
    const upstreamRes = await fetch(targetUrl);

    if (!upstreamRes.ok) {
      console.error(`[Media Proxy] ❌ Upstream returned ${upstreamRes.status}: ${upstreamRes.statusText}`);
      return new NextResponse(`Image not found on storage (${upstreamRes.status})`, {
        status: upstreamRes.status,
      });
    }

    const contentType = upstreamRes.headers.get("content-type") || "image/jpeg";
    const arrayBuffer = await upstreamRes.arrayBuffer();

    console.log(
      `[Media Proxy] ✅ Served: /media/${imagePath} | Type: ${contentType} | Size: ${(
        arrayBuffer.byteLength / 1024
      ).toFixed(1)} KB`
    );
    console.log(`----------------------------------------\n`);

    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error: any) {
    console.error(`[Media Proxy] 💥 Error fetching image:`, error.message);
    return new NextResponse("Internal Server Error while streaming image", { status: 500 });
  }
}

export async function HEAD(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const res = await GET(req, context);
  return new NextResponse(null, {
    status: res.status,
    headers: res.headers,
  });
}
