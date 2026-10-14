"use client";

import React from "react";
import Link from "next/link";
import { Compass, Home, MapPin, ArrowRight, MessageSquare } from "lucide-react";
import { CLIENT_INFO } from "@/data/travelData";

export default function NotFound() {
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

      <div className="container" style={{ position: "relative", zIndex: 2, maxWidth: 680 }}>
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
          <Compass size={14} style={{ color: "var(--color-accent)" }} />
          <span
            style={{
              fontSize: "0.8rem",
              fontWeight: 600,
              color: "#F7F6F0",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Page Off The Beaten Path
          </span>
        </div>

        <h1
          style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(4.5rem, 10vw, 7.5rem)",
            fontWeight: 800,
            lineHeight: 1,
            color: "var(--color-accent)",
            margin: "0 auto 10px auto",
          }}
        >
          404
        </h1>

        <h2
          style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(1.6rem, 3.2vw, 2.3rem)",
            color: "#FFFFFF",
            marginBottom: 16,
          }}
        >
          It Looks Like This Trail Hasn&apos;t Been Charted Yet
        </h2>

        <p
          style={{
            fontSize: "1rem",
            color: "#CBD5DA",
            lineHeight: 1.6,
            maxWidth: 520,
            margin: "0 auto 32px auto",
          }}
        >
          The page you are looking for may have been moved, renamed, or is temporarily unavailable.
          Let us guide you back to our curated journeys.
        </p>

        {/* Quick links to all 7 pages */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            justifyContent: "center",
            marginBottom: 36,
          }}
        >
          {[
            { href: "/destinations", label: "Destinations" },
            { href: "/family", label: "Family Holidays" },
            { href: "/honeymoon", label: "Honeymoon Escapes" },
            { href: "/groups", label: "Groups & MICE" },
            { href: "/trip-cost", label: "Trip Cost Estimator" },
            { href: "/about", label: "About Us" },
            { href: "/reviews", label: "Verified Reviews" },
          ].map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.18)",
                color: "#FFFFFF",
                padding: "8px 16px",
                borderRadius: "var(--radius-full)",
                fontSize: "0.85rem",
                fontWeight: 600,
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
          <Link
            href="/"
            className="btn btn-primary"
            style={{
              padding: "13px 28px",
              borderRadius: "var(--radius-full)",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: "0.95rem",
            }}
          >
            <Home size={16} />
            <span>Return to Homepage</span>
          </Link>

          <a
            href={`https://wa.me/${CLIENT_INFO.phoneRaw}?text=${encodeURIComponent(
              "Hi Voyastra, I was exploring your website and needed assistance finding an itinerary."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.12)",
              color: "#FFFFFF",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              padding: "13px 24px",
              borderRadius: "var(--radius-full)",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: "0.95rem",
            }}
          >
            <MessageSquare size={16} style={{ color: "#25D366" }} />
            <span>WhatsApp Concierge</span>
          </a>
        </div>
      </div>
    </div>
  );
}
