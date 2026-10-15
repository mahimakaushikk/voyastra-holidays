"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CLIENT_INFO, DESTINATIONS } from "@/data/travelData";
import { Destination } from "@/types";
import { ArrowRight, Compass, ShieldCheck, MapPin, Calendar, Users, Phone } from "lucide-react";

interface HeroProps {
  onOpenEnquiry?: (destOrContext?: Destination | string) => void;
  onDestinationSelect?: (dest: Destination) => void;
}

export default function Hero({ onOpenEnquiry, onDestinationSelect }: HeroProps) {
  const [selectedDestId, setSelectedDestId] = useState<string>("bali");
  const [travelType, setTravelType] = useState<string>("family");
  const [travelMonth, setTravelMonth] = useState<string>("October 2026");
  const [videoError, setVideoError] = useState<boolean>(false);

  const handleQuickSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dest = DESTINATIONS.find((d) => d.id === selectedDestId) || DESTINATIONS[0];
    if (onDestinationSelect) onDestinationSelect(dest);
    if (onOpenEnquiry) {
      onOpenEnquiry(dest);
    }
  };

  return (
    <section
      style={{
        position: "relative",
        minHeight: "88vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
        backgroundColor: "#12313A",
        color: "#FFFFFF",
      }}
    >
      {/* 1. Cinematic Background Video with Graceful Image Fallback */}
      {!videoError && (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/destinations/maldives.jpg"
          onError={() => setVideoError(true)}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 1,
            pointerEvents: "none",
          }}
        >
          <source src="/videos/hero-travel.webm" type="video/webm" />
        </video>
      )}

      {/* Fallback Static Luxury Poster if video is unsupported or fails */}
      {videoError && (
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Image
            src="/images/destinations/maldives.jpg"
            alt="Luxury Travel Destination"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
      )}

      {/* 2. Refined Dark Gradient Overlay for Maximum Text Legibility */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(10, 28, 34, 0.72) 0%, rgba(18, 49, 58, 0.65) 50%, rgba(10, 28, 34, 0.88) 100%)",
          zIndex: 2,
        }}
      />

      {/* 3. Hero Content Container */}
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 3,
          paddingTop: "clamp(44px, 7vw, 80px)",
          paddingBottom: "clamp(36px, 6vw, 70px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* Simplified, Understated Brand Eyebrow */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.16)",
            padding: "4px 12px",
            borderRadius: "var(--radius-full)",
            marginBottom: 18,
            backdropFilter: "blur(6px)",
            maxWidth: "100%",
            boxSizing: "border-box",
          }}
        >
          <Compass size={12} style={{ color: "var(--color-accent)", flexShrink: 0 }} />
          <span
            style={{
              fontSize: "0.78rem",
              fontWeight: 500,
              color: "#F7F6F0",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Bespoke Holiday Advisory
          </span>
        </div>

        {/* Primary Elegant Brand Headline (Playfair Display, 56-64px on desktop) */}
        <h1
          style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(2.1rem, 4.6vw, 3.85rem)",
            fontWeight: 700,
            lineHeight: 1.15,
            color: "#FFFFFF",
            maxWidth: 860,
            marginBottom: 16,
            letterSpacing: "-0.015em",
            wordBreak: "break-word",
          }}
        >
          Duniya Dekho, <br />
          <span style={{ color: "var(--color-accent)", fontStyle: "italic", fontWeight: 700 }}>
            Apne Andaaz Mein.
          </span>
        </h1>

        {/* Concise Authentic Supporting Paragraph */}
        <p
          style={{
            fontSize: "clamp(1.02rem, 1.25vw, 1.18rem)",
            color: "#E2DFD2",
            maxWidth: 600,
            lineHeight: 1.65,
            marginBottom: 30,
            fontWeight: 400,
          }}
        >
          Thoughtfully planned holidays for families, couples and groups, with personalised itineraries and support at every step.
        </p>

        {/* Dual Primary CTAs */}
        <div className="hero-cta-group">
          <button
            onClick={() => onOpenEnquiry && onOpenEnquiry()}
            className="btn btn-accent btn-lg"
          >
            <span>Plan My Trip</span>
            <ArrowRight size={17} />
          </button>

          <a
            href="#destinations"
            className="btn btn-outline-white btn-lg"
          >
            <span>Explore Destinations</span>
          </a>
        </div>

        {/* 4. Integrated Quick Travel Search Bar */}
        <div
          style={{
            width: "100%",
            maxWidth: 960,
            backgroundColor: "rgba(255, 255, 255, 0.96)",
            backdropFilter: "blur(12px)",
            borderRadius: "var(--radius-lg)",
            padding: "clamp(14px, 3vw, 22px)",
            boxShadow: "0 20px 45px rgba(0, 0, 0, 0.35)",
            border: "1px solid rgba(255, 255, 255, 0.6)",
            color: "var(--color-primary)",
            textAlign: "left",
          }}
        >
          <form onSubmit={handleQuickSearchSubmit}>
            <div className="quick-search-grid">
              {/* Destination Dropdown */}
              <div>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "var(--color-text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginBottom: 6,
                  }}
                >
                  <MapPin size={13} style={{ color: "var(--color-secondary)" }} />
                  <span>Where To?</span>
                </label>
                <select
                  value={selectedDestId}
                  onChange={(e) => setSelectedDestId(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid #D6D2C4",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: "var(--color-primary)",
                    backgroundColor: "#FFFFFF",
                    outline: "none",
                    cursor: "pointer",
                  }}
                >
                  {DESTINATIONS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} (from ₹{d.startingPrice.toLocaleString("en-IN")})
                    </option>
                  ))}
                </select>
              </div>

              {/* Persona Dropdown */}
              <div>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "var(--color-text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginBottom: 6,
                  }}
                >
                  <Users size={13} style={{ color: "var(--color-secondary)" }} />
                  <span>Travel Style</span>
                </label>
                <select
                  value={travelType}
                  onChange={(e) => setTravelType(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid #D6D2C4",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: "var(--color-primary)",
                    backgroundColor: "#FFFFFF",
                    outline: "none",
                    cursor: "pointer",
                  }}
                >
                  <option value="family">Indian Family Vacation</option>
                  <option value="honeymoon">Romantic Honeymoon</option>
                  <option value="corporate">Corporate Offsite / MICE</option>
                </select>
              </div>

              {/* Month Dropdown */}
              <div>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "var(--color-text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginBottom: 6,
                  }}
                >
                  <Calendar size={13} style={{ color: "var(--color-secondary)" }} />
                  <span>Departure Month</span>
                </label>
                <select
                  value={travelMonth}
                  onChange={(e) => setTravelMonth(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid #D6D2C4",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: "var(--color-primary)",
                    backgroundColor: "#FFFFFF",
                    outline: "none",
                    cursor: "pointer",
                  }}
                >
                  <option value="October 2026">October 2026 (Festive Season)</option>
                  <option value="November 2026">November 2026 (Diwali / Autumn)</option>
                  <option value="December 2026">December 2026 (Winter Holidays)</option>
                  <option value="Jan-March 2027">Jan - March 2027</option>
                </select>
              </div>

              {/* Submit Search Button */}
              <div className="quick-search-btn-wrapper">
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "100%", padding: "12px 18px", fontWeight: 700 }}
                >
                  <span>Find Packages</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* 5. Trust Micro-Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
            flexWrap: "wrap",
            marginTop: 24,
            fontSize: "0.82rem",
            color: "#D0DCD9",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <ShieldCheck size={14} style={{ color: "#C7A56B" }} />
            <span>Guaranteed Pure Veg &amp; Jain Meal Coordination</span>
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Phone size={14} style={{ color: "#C7A56B" }} />
            <span>24/7 Dedicated On-Tour Holiday Concierge</span>
          </span>
        </div>
      </div>
    </section>
  );
}
