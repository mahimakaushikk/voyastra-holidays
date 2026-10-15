"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, Home, MessageSquare } from "lucide-react";
import { CLIENT_INFO } from "@/data/travelData";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Voyastra App Error]", error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: "80vh",
        backgroundColor: "#12313A",
        color: "#FFFFFF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 20px",
        textAlign: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 30%, rgba(224, 122, 43, 0.18) 0%, rgba(18, 49, 58, 0.95) 70%, #0A1C22 100%)",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 2, maxWidth: 640 }}>
        {/* Eyebrow */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.16)",
            padding: "4px 14px",
            borderRadius: "var(--radius-full)",
            marginBottom: 20,
          }}
        >
          <AlertCircle size={14} style={{ color: "var(--color-accent)" }} />
          <span
            style={{
              fontSize: "0.8rem",
              fontWeight: 600,
              color: "#F7F6F0",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Unexpected Detour
          </span>
        </div>

        <h1
          style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(2rem, 4vw, 2.8rem)",
            fontWeight: 800,
            lineHeight: 1.2,
            color: "#FFFFFF",
            marginBottom: 16,
          }}
        >
          Something Didn&apos;t Go According to Plan
        </h1>

        <p
          style={{
            fontSize: "1rem",
            color: "#CBD5DA",
            lineHeight: 1.6,
            maxWidth: 500,
            margin: "0 auto 32px auto",
          }}
        >
          We encountered an unexpected issue while loading this page. Our travel desk has been alerted, and you can try reloading the journey or return home.
        </p>

        {/* Action Buttons */}
        <div
          style={{
            display: "flex",
            gap: 14,
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            marginBottom: 40,
          }}
        >
          <button
            onClick={() => reset()}
            className="btn btn-accent"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 24px",
              cursor: "pointer",
            }}
          >
            <RotateCcw size={16} />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="btn btn-outline-white"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 24px",
              textDecoration: "none",
            }}
          >
            <Home size={16} />
            <span>Return to Home</span>
          </Link>
        </div>

        {/* Emergency WhatsApp Help */}
        <div
          style={{
            padding: "16px 20px",
            borderRadius: "var(--radius-md)",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            maxWidth: 420,
            margin: "0 auto",
            fontSize: "0.85rem",
            color: "#A3B5BE",
          }}
        >
          <span>Need immediate travel assistance? </span>
          <a
            href={`https://wa.me/${CLIENT_INFO.phoneRaw}?text=Hi%20Voyastra%2C%20I%20encountered%20an%20issue%20on%20the%20website.`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "var(--color-accent)",
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              textDecoration: "none",
              marginLeft: 4,
            }}
          >
            <MessageSquare size={13} />
            <span>WhatsApp Concierge</span>
          </a>
        </div>
      </div>
    </div>
  );
}
