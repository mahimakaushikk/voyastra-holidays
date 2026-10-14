"use client";

import React, { useState } from "react";
import { TESTIMONIALS } from "@/data/travelData";
import { Star, HeartHandshake, Sparkles, Briefcase } from "lucide-react";
import Image from "next/image";

export default function Testimonials() {
  const [filter, setFilter] = useState<string>("all");

  const filteredTestimonials =
    filter === "all" ? TESTIMONIALS : TESTIMONIALS.filter((t) => t.category === filter);

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case "family":
        return { label: "Family Vacation", icon: <HeartHandshake size={12} />, color: "var(--color-secondary)" };
      case "honeymoon":
        return { label: "Honeymoon Sanctuary", icon: <Sparkles size={12} />, color: "var(--color-accent)" };
      case "corporate":
        return { label: "Corporate Offsite", icon: <Briefcase size={12} />, color: "var(--color-secondary)" };
      default:
        return { label: "Traveller", icon: <Sparkles size={12} />, color: "var(--color-secondary)" };
    }
  };

  return (
    <section id="reviews" className="section" style={{ backgroundColor: "var(--color-bg)" }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <Star size={16} fill="var(--color-accent)" color="var(--color-accent)" />
            <span>Guest Journeys</span>
          </div>
          <h2>Experiences Shared By Our Travellers</h2>
          <p>
            Rated 4.8★ across verified reviews. Hear from travellers who explored the world in their
            own distinct style.
          </p>
        </div>

        {/* Filter Chips */}
        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 36, flexWrap: "wrap" }}>
          {[
            { id: "all", label: "All Stories" },
            { id: "family", label: "Family Vacations" },
            { id: "honeymoon", label: "Honeymoon Stories" },
            { id: "corporate", label: "Corporate Offsites" },
          ].map((tab) => {
            const isActive = tab.id === filter;
            return (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                style={{
                  padding: "8px 20px",
                  borderRadius: "var(--radius-full)",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  border: isActive ? "1.5px solid var(--color-primary)" : "1px solid var(--color-border)",
                  backgroundColor: isActive ? "var(--color-primary)" : "#FFFFFF",
                  color: isActive ? "#FFFFFF" : "var(--color-text-main)",
                  transition: "all 0.2s ease",
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Testimonials Grid */}
        <div className="testimonials-grid">
          {filteredTestimonials.map((t) => {
            const catBadge = getCategoryBadge(t.category);
            return (
              <div
                key={t.id}
                className="editorial-card testimonial-card"
              >
                <div>
                  {/* Rating & Category Badge */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: 8,
                      marginBottom: 16,
                    }}
                  >
                    <div style={{ display: "flex", gap: 3 }}>
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={15} fill="var(--color-accent)" color="var(--color-accent)" />
                      ))}
                    </div>

                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 5,
                        backgroundColor: "var(--color-bg)",
                        color: "var(--color-primary)",
                        padding: "3px 10px",
                        borderRadius: "var(--radius-full)",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        border: "1px solid var(--color-border)",
                      }}
                    >
                      {catBadge.icon}
                      <span>{catBadge.label}</span>
                    </div>
                  </div>

                  {/* Trip Title */}
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--color-secondary)", marginBottom: 12 }}>
                    📍 {t.trip}
                  </div>

                  {/* Review Text */}
                  <p
                    style={{
                      fontSize: "0.95rem",
                      color: "var(--color-text-main)",
                      lineHeight: 1.65,
                      fontStyle: "italic",
                      marginBottom: 24,
                    }}
                  >
                    &ldquo;{t.review}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    borderTop: "1px solid var(--color-border-subtle)",
                    paddingTop: 16,
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      overflow: "hidden",
                      border: "2px solid var(--color-accent)",
                      flexShrink: 0,
                    }}
                  >
                    <Image src={t.avatar} alt={t.name} fill sizes="44px" style={{ objectFit: "cover" }} />
                  </div>

                  <div>
                    <div style={{ fontWeight: 700, color: "var(--color-primary)", fontSize: "0.95rem" }}>
                      {t.name}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", display: "flex", alignItems: "center", gap: 6 }}>
                      <span>{t.location}</span>
                      <span>•</span>
                      <span>{t.travelDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
