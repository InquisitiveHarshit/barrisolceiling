import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Admin } from "@/models/Admin";
import { authenticateAdmin } from "@/lib/auth";

// DELETE /api/admin-users/[id] — remove an admin
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error, status } = await authenticateAdmin(req);
  if (error) return NextResponse.json({ error }, { status });

  try {
    const { id } = await params;
    await connectDB();
    const deleted = await Admin.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: "Admin not found." }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
