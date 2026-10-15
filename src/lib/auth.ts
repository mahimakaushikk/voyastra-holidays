import crypto from "crypto";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const ADMIN_COOKIE_NAME = "voyastra_admin_session";
const SESSION_DURATION_HOURS = 24 * 7; // 7 days

function getSecretKey(): string {
  return process.env.ADMIN_SESSION_SECRET || "voyastra-dev-secret-key-38f01a8b29c";
}

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || "voyastra@admin2026";
}

export interface SessionData {
  role: "admin";
  iat: number;
  exp: number;
}

/**
 * Signs payload using HMAC-SHA256
 */
export function createSessionToken(): string {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + SESSION_DURATION_HOURS * 3600;
  const payload: SessionData = { role: "admin", iat, exp };
  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", getSecretKey())
    .update(payloadB64)
    .digest("base64url");

  return `${payloadB64}.${signature}`;
}

/**
 * Verifies signed session token
 */
export function verifySessionToken(token: string | undefined | null): SessionData | null {
  if (!token || typeof token !== "string") return null;

  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [payloadB64, signature] = parts;
  const expectedSignature = crypto
    .createHmac("sha256", getSecretKey())
    .update(payloadB64)
    .digest("base64url");

  if (signature !== expectedSignature) return null;

  try {
    const payload: SessionData = JSON.parse(
      Buffer.from(payloadB64, "base64url").toString("utf-8")
    );

    const now = Math.floor(Date.now() / 1000);
    if (payload.exp < now) {
      return null; // Expired
    }

    if (payload.role !== "admin") {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * Verifies admin session from NextRequest cookies
 */
export function isAuthenticatedRequest(req: NextRequest): boolean {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  return Boolean(verifySessionToken(token));
}

/**
 * Verifies admin session in Server Components or Server Actions
 */
export async function isAuthenticatedServer(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return Boolean(verifySessionToken(token));
}
