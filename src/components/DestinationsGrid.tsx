"use client";

import React, { useState } from "react";
import Image from "next/image";
import { DESTINATIONS, CLIENT_INFO } from "@/data/travelData";
import { Destination } from "@/types";
import { Star, Clock, Check, MessageSquare, ArrowRight, Sparkles } from "lucide-react";

interface DestinationsGridProps {
  onOpenEnquiry?: (dest: Destination) => void;
}

export default function DestinationsGrid({ onOpenEnquiry }: DestinationsGridProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filterDestinations = () => {
    switch (activeFilter) {
      case "international":
        return DESTINATIONS.filter((d) => d.category === "international");
      case "domestic":
        return DESTINATIONS.filter((d) => d.category === "domestic");
      case "honeymoon":
        return DESTINATIONS.filter((d) => d.audience.includes("honeymoon"));
      case "family":
        return DESTINATIONS.filter((d) => d.audience.includes("family"));
      default:
        return DESTINATIONS;
    }
  };

  const filtered = filterDestinations();

  return (
    <section id="destinations" className="section" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <span>Handpicked Journeys</span>
          </div>
          <h2>Bestselling Destinations Across The Globe</h2>
          <p>
            Transparent all-inclusive rates, handpicked 4★/5★ luxury resorts, verified Indian dining, and
            hassle-free visa facilitation.
          </p>
        </div>

        {/* Filter Tabs */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 10,
            marginBottom: 44,
            flexWrap: "wrap",
          }}
        >
          {[
            { id: "all", label: "All Packages (8)" },
            { id: "international", label: "International (5)" },
            { id: "domestic", label: "Incredible India (3)" },
            { id: "honeymoon", label: "Honeymoon Special" },
            { id: "family", label: "Family Friendly" },
          ].map((tab) => {
            const isActive = tab.id === activeFilter;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                style={{
                  padding: "10px 22px",
                  borderRadius: "var(--radius-full)",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  border: isActive ? "1.5px solid var(--color-secondary)" : "1px solid var(--color-border)",
                  backgroundColor: isActive ? "var(--color-primary)" : "var(--color-bg)",
                  color: isActive ? "#FFFFFF" : "var(--color-text-main)",
                  transition: "all 0.2s ease",
                  boxShadow: isActive ? "var(--shadow-sm)" : "none",
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* 8 Destinations Grid */}
        <div className="destinations-grid">
          {filtered.map((dest) => (
            <div
              key={dest.id}
              className="editorial-card"
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "var(--radius-md)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
            >
              {/* Image & Badges */}
              <div style={{ position: "relative", height: 230, width: "100%", overflow: "hidden" }}>
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{
                    objectFit: "cover",
                    transition: "transform 0.4s ease",
                  }}
                  className="dest-image"
                />

                {/* Subtle dark gradient overlay for text readability */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(18, 49, 58, 0.3) 0%, rgba(18, 49, 58, 0) 45%, rgba(10, 28, 34, 0.75) 100%)",
                  }}
                />

                {/* Top Offer Badge */}
                <div
                  style={{
                    position: "absolute",
                    top: 12,
                    left: 12,
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                    alignItems: "flex-start",
                  }}
                >
                  <span
                    style={{
                      backgroundColor: "rgba(18, 49, 58, 0.88)",
                      backdropFilter: "blur(6px)",
                      color: "#FFFFFF",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      padding: "3px 10px",
                      borderRadius: "var(--radius-full)",
                      border: "1px solid rgba(255, 255, 255, 0.16)",
                    }}
                  >
                    {dest.tags[0]}
                  </span>
                </div>

                {/* Bottom of Image: Duration & Rating */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 12,
                    left: 14,
                    right: 14,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: "#FFFFFF",
                    fontSize: "0.82rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 5, fontWeight: 600 }}>
                    <Clock size={13} style={{ color: "var(--color-accent)" }} />
                    <span>
                      {dest.durationNights}N / {dest.durationDays}D
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      background: "rgba(10, 28, 34, 0.65)",
                      backdropFilter: "blur(4px)",
                      padding: "2px 8px",
                      borderRadius: 12,
                      fontWeight: 700,
                      fontSize: "0.78rem",
                      color: "#F7F3E9",
                    }}
                  >
                    <Star size={12} fill="var(--color-accent)" color="var(--color-accent)" />
                    <span>{dest.rating}</span>
                    <span style={{ opacity: 0.8, fontSize: "0.7rem", fontWeight: 400 }}>
                      ({dest.reviewsCount})
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: "22px 20px", display: "flex", flexDirection: "column", flex: 1 }}>
                {/* Destination Title & Country */}
                <div style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <h3 style={{ fontSize: "1.45rem", color: "var(--color-primary)", margin: 0 }}>
                      {dest.name}
                    </h3>
                    <span style={{ fontSize: "0.82rem", color: "var(--color-text-muted)", fontWeight: 500 }}>
                      {dest.country}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "0.86rem",
                      color: "var(--color-text-muted)",
                      marginTop: 4,
                      lineHeight: 1.45,
                      minHeight: 38,
                    }}
                  >
                    {dest.tagline}
                  </p>
                </div>

                {/* Inclusions Snippet */}
                <div
                  style={{
                    marginBottom: 18,
                    borderTop: "1px dashed var(--color-border)",
                    paddingTop: 12,
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "var(--color-secondary)",
                      marginBottom: 8,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Package Inclusions:
                  </div>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 5 }}>
                    {dest.inclusions.slice(0, 3).map((inc, i) => (
                      <li
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 7,
                          fontSize: "0.82rem",
                          color: "var(--color-text-main)",
                        }}
                      >
                        <Check
                          size={13}
                          style={{ color: "var(--color-secondary)", flexShrink: 0, marginTop: 3 }}
                        />
                        <span style={{ lineHeight: 1.35 }}>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price and Action Buttons at Bottom */}
                <div
                  style={{
                    marginTop: "auto",
                    borderTop: "1px solid var(--color-border-subtle)",
                    paddingTop: 16,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "space-between",
                      marginBottom: 14,
                    }}
                  >
                    <div>
                      <span style={{ fontSize: "0.72rem", color: "var(--color-text-muted)", textTransform: "uppercase" }}>
                        Starting from
                      </span>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                        <span
                          style={{
                            fontSize: "1.55rem",
                            fontWeight: 800,
                            color: "var(--color-primary)",
                            fontFamily: "var(--font-playfair)",
                          }}
                        >
                          ₹{dest.startingPrice.toLocaleString("en-IN")}
                        </span>
                        {dest.originalPrice && (
                          <span
                            style={{
                              fontSize: "0.85rem",
                              color: "var(--color-text-muted)",
                              textDecoration: "line-through",
                            }}
                          >
                            ₹{dest.originalPrice.toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <span style={{ fontSize: "0.72rem", color: "var(--color-text-muted)" }}>Per Person</span>
                      <div style={{ fontSize: "0.75rem", color: "var(--color-secondary)", fontWeight: 600 }}>
                        Flights Included
                      </div>
                    </div>
                  </div>

                  {/* Dual Action Buttons */}
                  <div className="dest-card-actions">
                    <a
                      href={`https://wa.me/${CLIENT_INFO.phoneRaw}?text=Hi%20Voyastra%20Holidays%2C%20I%20am%20interested%20in%20the%20${encodeURIComponent(
                        dest.name
                      )}%20package%20at%20₹${dest.startingPrice.toLocaleString(
                        "en-IN"
                      )}.%20Please%20share%20the%20day-wise%20plan.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp btn-sm dest-card-btn"
                    >
                      <MessageSquare size={14} />
                      <span>WhatsApp</span>
                    </a>

                    <button
                      onClick={() => onOpenEnquiry && onOpenEnquiry(dest)}
                      className="btn btn-ocean btn-sm dest-card-btn"
                    >
                      <span>Custom Quote</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .dest-image:hover {
          transform: scale(1.04);
        }
      `}</style>
    </section>
  );
}
