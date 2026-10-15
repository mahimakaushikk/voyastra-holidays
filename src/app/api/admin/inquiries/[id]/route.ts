import { NextRequest, NextResponse } from "next/server";
import { isAuthenticatedRequest } from "@/lib/auth";
import { getInquiryById, updateInquiry, deleteInquiry } from "@/lib/db";
import { InquiryStatus } from "@/lib/types";

const ALLOWED_STATUSES: InquiryStatus[] = ["new", "contacted", "quoted", "converted", "lost"];

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  if (!isAuthenticatedRequest(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized access" },
      { status: 401 }
    );
  }

  const { id } = await context.params;
  const inquiry = await getInquiryById(id);

  if (!inquiry) {
    return NextResponse.json(
      { success: false, error: "Inquiry not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, data: inquiry });
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  if (!isAuthenticatedRequest(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized access" },
      { status: 401 }
    );
  }

  const { id } = await context.params;

  try {
    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON request body" },
        { status: 400 }
      );
    }
    const { status, adminNotes, notes, assignedTo } = body || {};
    const effectiveAdminNotes = adminNotes !== undefined ? adminNotes : notes;

    if (status && !ALLOWED_STATUSES.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid status. Allowed values are: ${ALLOWED_STATUSES.join(", ")}`,
        },
        { status: 400 }
      );
    }

    const updated = await updateInquiry(id, {
      status,
      adminNotes: effectiveAdminNotes,
      assignedTo,
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Inquiry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry updated successfully",
      data: updated,
    });
  } catch (err) {
    console.error("[API Update Inquiry Error]:", err);
    return NextResponse.json(
      { success: false, error: "Failed to update inquiry" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  if (!isAuthenticatedRequest(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized access" },
      { status: 401 }
    );
  }

  const { id } = await context.params;
  const deleted = await deleteInquiry(id);

  if (!deleted) {
    return NextResponse.json(
      { success: false, error: "Inquiry not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "Inquiry deleted successfully",
  });
}
