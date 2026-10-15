import { NextRequest, NextResponse } from "next/server";
import { createInquiry } from "@/lib/db";
import { InquiryInput } from "@/lib/types";

// In-memory rate limiting map: ip -> timestamps[]
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 6;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return false; // Rate limit exceeded
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    // 1. Rate limiting check
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many inquiries submitted. Please wait a few minutes before trying again or reach us directly on WhatsApp.",
        },
        { status: 429 }
      );
    }

    let body: InquiryInput;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON request payload." },
        { status: 400 }
      );
    }

    // 2. Anti-spam honeypot check: If the hidden honeypot field has a value, silently reject
    if (body.hp_website && body.hp_website.trim().length > 0) {
      console.warn("[Spam Protection] Honeypot triggered from IP:", ip);
      return NextResponse.json({
        success: true,
        reference: "VY-" + Math.floor(100000 + Math.random() * 900000),
        message: "Inquiry received successfully",
      });
    }

    // 3. Server-side validation
    const errors: string[] = [];

    if (!body.name || typeof body.name !== "string" || body.name.trim().length < 2) {
      errors.push("Full Name is required (minimum 2 characters).");
    } else if (body.name.trim().length > 100) {
      errors.push("Name must not exceed 100 characters.");
    }

    if (!body.phone || typeof body.phone !== "string" || body.phone.trim().length < 7) {
      errors.push("A valid contact number is required.");
    }

    if (!body.destination || typeof body.destination !== "string" || body.destination.trim().length < 2) {
      errors.push("Please select or specify a travel destination.");
    }

    if (body.email && typeof body.email === "string" && body.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(body.email.trim())) {
        errors.push("Please provide a valid email address.");
      }
    }

    if (errors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: errors,
        },
        { status: 400 }
      );
    }

    // 4. Save to database
    const userAgent = req.headers.get("user-agent") || undefined;
    const inquiry = await createInquiry(body, { userAgent });

    return NextResponse.json(
      {
        success: true,
        reference: inquiry.reference,
        id: inquiry.id,
        message: "Your travel inquiry has been received! A Voyastra specialist will connect with you shortly.",
        inquiry: {
          reference: inquiry.reference,
          name: inquiry.name,
          destination: inquiry.destination,
          travelMonth: inquiry.travelMonth,
        },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("[API Inquiries] Error processing inquiry:", err);
    return NextResponse.json(
      {
        success: false,
        error: "An internal server error occurred while processing your request. Please try again or WhatsApp our travel desk directly.",
      },
      { status: 500 }
    );
  }
}
