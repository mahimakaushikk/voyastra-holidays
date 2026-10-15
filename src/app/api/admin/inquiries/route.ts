import { NextRequest, NextResponse } from "next/server";
import { isAuthenticatedRequest } from "@/lib/auth";
import { getInquiries } from "@/lib/db";
import { InquiryFilters, InquiryStatus } from "@/lib/types";

export async function GET(req: NextRequest) {
  // Enforce server-side authentication
  if (!isAuthenticatedRequest(req)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized access. Valid admin session required." },
      { status: 401 }
    );
  }

  try {
    const searchParams = req.nextUrl.searchParams;
    const search = searchParams.get("search") || undefined;
    const statusParam = searchParams.get("status") || "all";
    const destination = searchParams.get("destination") || undefined;
    const travelType = searchParams.get("travelType") || undefined;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const sortBy = (searchParams.get("sortBy") as any) || "createdAt";
    const sortOrder = (searchParams.get("sortOrder") as any) || "desc";

    const filters: InquiryFilters = {
      search,
      status: statusParam as InquiryStatus | "all",
      destination,
      travelType,
      page: isNaN(page) ? 1 : page,
      limit: isNaN(limit) ? 10 : limit,
      sortBy,
      sortOrder,
    };

    const result = await getInquiries(filters);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (err) {
    console.error("[API Admin Inquiries Error]:", err);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve inquiries" },
      { status: 500 }
    );
  }
}
