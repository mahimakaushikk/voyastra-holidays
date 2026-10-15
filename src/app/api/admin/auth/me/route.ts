import { NextRequest, NextResponse } from "next/server";
import { isAuthenticatedRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const isAuth = isAuthenticatedRequest(req);
  return NextResponse.json({
    authenticated: isAuth,
  });
}
