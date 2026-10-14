"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { DESTINATIONS, CLIENT_INFO } from "@/data/travelData";
import { Destination } from "@/types";
import { useEnquiry } from "@/components/EnquiryContext";
import {
  Compass,
  MapPin,
  Clock,
  Plane,
  Sun,
  ShieldCheck,
  Check,
  ArrowRight,
  MessageSquare,
  Search,
  Calendar,
  Sparkles,
  Phone,
} from "lucide-react";

export default function DestinationsPage() {
  const { openEnquiry } = useEnquiry();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("all");

  const filteredDestinations = useMemo(() => {
    return DESTINATIONS.filter((dest) => {
      // Category filter
      let matchesCategory = true;
      if (selectedCategory === "international") {
        matchesCategory = dest.category === "international";
      } else if (selectedCategory === "domestic") {
        matchesCategory = dest.category === "domestic";
      } else if (selectedCategory === "honeymoon") {
        matchesCategory = dest.audience.includes("honeymoon");
      } else if (selectedCategory === "family") {
        matchesCategory = dest.audience.includes("family");
      }

      // Search filter
      let matchesSearch = true;
      if (searchQuery.trim() !== "" && searchQuery !== "all") {
        const q = searchQuery.toLowerCase();
        matchesSearch =
          dest.name.toLowerCase().includes(q) ||
          dest.country.toLowerCase().includes(q) ||
          dest.tagline.toLowerCase().includes(q);
      }

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div style={{ backgroundColor: "var(--color-bg)", minHeight: "100vh" }}>
      {/* 1. Cinematic Page Header */}
      <section
        style={{
          position: "relative",
          backgroundColor: "#12313A",
          color: "#FFFFFF",
          paddingTop: "clamp(60px, 9vw, 90px)",
          paddingBottom: "clamp(50px, 7vw, 80px)",
          overflow: "hidden",
          textAlign: "center",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        {/* Subtle Dark Background Gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 50% 20%, rgba(20, 107, 101, 0.4) 0%, rgba(18, 49, 58, 0.95) 70%, #0A1C22 100%)",
            zIndex: 1,
          }}
        />

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          {/* Eyebrow Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.16)",
              padding: "4px 14px",
              borderRadius: "var(--radius-full)",
              marginBottom: 16,
            }}
          >
            <Compass size={13} style={{ color: "var(--color-accent)" }} />
            <span
              style={{
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "#F7F6F0",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Curated World Escapes
            </span>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(2.4rem, 4.5vw, 3.6rem)",
              fontWeight: 700,
              lineHeight: 1.18,
              color: "#FFFFFF",
              maxWidth: 820,
              margin: "0 auto 16px auto",
            }}
          >
            Bespoke Domestic &amp; <br />
            <span style={{ color: "var(--color-accent)", fontStyle: "italic" }}>
              International Destinations
            </span>
          </h1>

          <p
            style={{
              fontSize: "clamp(1rem, 1.3vw, 1.15rem)",
              color: "#E2DFD2",
              maxWidth: 640,
              margin: "0 auto 32px auto",
              lineHeight: 1.6,
            }}
          >
            Every journey includes verified 4★/5★ accommodations, verified Indian dining arrangements,
            private chauffeur transfers, and 24/7 dedicated travel concierge.
          </p>

          {/* Quick Search Bar */}
          <div
            style={{
              maxWidth: 580,
              margin: "0 auto",
              position: "relative",
            }}
          >
            <Search
              size={18}
              style={{
                position: "absolute",
                left: 16,
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--color-text-muted)",
              }}
            />
            <input
              type="text"
              placeholder="Search by country, city, or experience (e.g. Bali, Switzerland, Houseboat)..."
              value={searchQuery === "all" ? "" : searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 18px 14px 44px",
                borderRadius: "var(--radius-full)",
                border: "1px solid rgba(255, 255, 255, 0.25)",
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                color: "var(--color-primary)",
                fontSize: "0.95rem",
                fontWeight: 500,
                outline: "none",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.25)",
              }}
            />
          </div>
        </div>
      </section>

      {/* 2. Interactive Category Tabs */}
      <section style={{ padding: "34px 0 20px 0" }}>
        <div className="container">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            {[
              { id: "all", label: `All Destinations (${DESTINATIONS.length})` },
              { id: "international", label: "International (5)" },
              { id: "domestic", label: "Incredible India (3)" },
              { id: "honeymoon", label: "Romantic Escapes" },
              { id: "family", label: "Family Preferred" },
            ].map((tab) => {
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  style={{
                    padding: "9px 20px",
                    borderRadius: "var(--radius-full)",
                    cursor: "pointer",
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    border: isActive ? "1.5px solid var(--color-secondary)" : "1px solid var(--color-border)",
                    backgroundColor: isActive ? "var(--color-primary)" : "#FFFFFF",
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
        </div>
      </section>

      {/* 3. Destination Cards Grid */}
      <section style={{ padding: "20px 0 70px 0" }}>
        <div className="container">
          {filteredDestinations.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                backgroundColor: "#FFFFFF",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--color-border)",
                maxWidth: 600,
                margin: "0 auto",
              }}
            >
              <Compass size={40} style={{ color: "var(--color-accent)", marginBottom: 14 }} />
              <h3 style={{ fontSize: "1.4rem", marginBottom: 8, color: "var(--color-primary)" }}>
                No Destinations Found
              </h3>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.92rem", marginBottom: 20 }}>
                We couldn&rsquo;t find packages matching &ldquo;{searchQuery}&rdquo;. Try another destination name or reset filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="btn btn-primary"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="destinations-grid">
              {filteredDestinations.map((dest) => (
                <div
                  key={dest.id}
                  className="editorial-card"
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "var(--radius-md)",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Card Image */}
                  <div style={{ position: "relative", height: 240, width: "100%", overflow: "hidden" }}>
                    <Image
                      src={dest.image}
                      alt={`${dest.name}, ${dest.country} luxury holiday package by Voyastra`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(180deg, rgba(18, 49, 58, 0.3) 0%, rgba(18, 49, 58, 0) 45%, rgba(10, 28, 34, 0.8) 100%)",
                      }}
                    />

                    {/* Top Badges */}
                    <div
                      style={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        display: "flex",
                        gap: 6,
                        flexWrap: "wrap",
                      }}
                    >
                      <span
                        style={{
                          backgroundColor: "rgba(18, 49, 58, 0.9)",
                          backdropFilter: "blur(4px)",
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
                      {dest.category === "international" && (
                        <span
                          style={{
                            backgroundColor: "var(--color-secondary)",
                            color: "#FFFFFF",
                            fontSize: "0.72rem",
                            fontWeight: 600,
                            padding: "3px 8px",
                            borderRadius: "var(--radius-full)",
                          }}
                        >
                          International
                        </span>
                      )}
                    </div>

                    {/* Bottom Metadata inside Image */}
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
                      <span style={{ display: "flex", alignItems: "center", gap: 5, fontWeight: 600 }}>
                        <Clock size={14} style={{ color: "var(--color-accent)" }} />
                        <span>
                          {dest.durationNights}N / {dest.durationDays}D
                        </span>
                      </span>

                      <span style={{ display: "flex", alignItems: "center", gap: 4, fontWeight: 700 }}>
                        <span style={{ color: "#F59E0B" }}>★</span>
                        <span>{dest.rating.toFixed(1)}</span>
                        <span style={{ opacity: 0.8, fontSize: "0.72rem" }}>({dest.reviewsCount})</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div
                    style={{
                      padding: "20px 22px",
                      display: "flex",
                      flexDirection: "column",
                      flex: 1,
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      {/* Destination Title & Country */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "baseline",
                          marginBottom: 4,
                        }}
                      >
                        <h3
                          style={{
                            fontSize: "1.45rem",
                            fontWeight: 800,
                            fontFamily: "var(--font-playfair)",
                            color: "var(--color-primary)",
                          }}
                        >
                          {dest.name}
                        </h3>
                        <span
                          style={{
                            fontSize: "0.8rem",
                            color: "var(--color-text-muted)",
                            fontWeight: 600,
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <MapPin size={12} style={{ color: "var(--color-secondary)" }} />
                          {dest.country}
                        </span>
                      </div>

                      <p
                        style={{
                          fontSize: "0.85rem",
                          color: "var(--color-text-muted)",
                          lineHeight: 1.5,
                          marginBottom: 14,
                        }}
                      >
                        {dest.tagline}
                      </p>

                      {/* Travel Specs: Flight & Best Season */}
                      <div
                        style={{
                          backgroundColor: "var(--color-bg)",
                          padding: "8px 12px",
                          borderRadius: "var(--radius-sm)",
                          marginBottom: 14,
                          fontSize: "0.78rem",
                          color: "var(--color-text-main)",
                          display: "flex",
                          flexDirection: "column",
                          gap: 4,
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <Plane size={13} style={{ color: "var(--color-secondary)" }} />
                          <span>Flight time from Delhi: <strong>{dest.flightHoursFromDelhi}</strong></span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <Sun size={13} style={{ color: "var(--color-accent)" }} />
                          <span>Best season: <strong>{dest.bestSeason}</strong></span>
                        </div>
                      </div>

                      {/* Top Highlights List */}
                      <div style={{ marginBottom: 16 }}>
                        <div
                          style={{
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            color: "var(--color-primary)",
                            textTransform: "uppercase",
                            letterSpacing: "0.06em",
                            marginBottom: 8,
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
                                gap: 6,
                                fontSize: "0.8rem",
                                color: "#4A5D67",
                              }}
                            >
                              <Check size={13} style={{ color: "var(--color-secondary)", flexShrink: 0, marginTop: 3 }} />
                              <span>{inc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Price & Action Row */}
                    <div
                      style={{
                        borderTop: "1px solid var(--color-border-subtle)",
                        paddingTop: 16,
                        marginTop: 10,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "baseline",
                          marginBottom: 14,
                        }}
                      >
                        <div>
                          <div style={{ fontSize: "0.72rem", color: "var(--color-text-muted)", textTransform: "uppercase" }}>
                            Indicative Rate / Person
                          </div>
                          <div
                            style={{
                              fontSize: "1.5rem",
                              fontWeight: 800,
                              color: "var(--color-primary)",
                              fontFamily: "var(--font-playfair)",
                            }}
                          >
                            ₹{dest.startingPrice.toLocaleString("en-IN")}
                          </div>
                        </div>

                        <span style={{ fontSize: "0.72rem", color: "var(--color-secondary)", fontWeight: 600 }}>
                          Stays + Tours Included
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 8 }}>
                        <button
                          onClick={() => openEnquiry({ destination: dest, travelType: dest.audience[0] === "honeymoon" ? "Honeymoon Couple" : "Family Vacation" })}
                          className="btn btn-accent btn-sm"
                          style={{ width: "100%", fontWeight: 700 }}
                        >
                          <span>Plan This Trip</span>
                          <ArrowRight size={14} />
                        </button>

                        <a
                          href={`https://wa.me/${CLIENT_INFO.phoneRaw}?text=Hi%20Voyastra%2C%20I%20am%20interested%20in%20the%20${encodeURIComponent(dest.name)}%20package.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Chat on WhatsApp"
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: "var(--radius-full)",
                            backgroundColor: "rgba(37, 211, 102, 0.12)",
                            color: "#25D366",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "1px solid rgba(37, 211, 102, 0.35)",
                            transition: "all 0.2s ease",
                          }}
                        >
                          <MessageSquare size={16} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. Seasonal Travel Calendar Table */}
      <section
        style={{
          backgroundColor: "#FFFFFF",
          padding: "70px 0",
          borderTop: "1px solid var(--color-border)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">
              <Calendar size={14} />
              <span>Smart Travel Planner</span>
            </div>
            <h2>Best Seasons &amp; Timing For Every Destination</h2>
            <p>
              Plan ahead with our weather-optimised holiday advisory so you experience pleasant temperatures,
              clear skies, and seasonal attractions at their peak.
            </p>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "0.9rem",
                textAlign: "left",
                minWidth: 640,
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#12313A", color: "#FFFFFF" }}>
                  <th style={{ padding: "14px 18px", borderTopLeftRadius: "var(--radius-sm)" }}>Destination</th>
                  <th style={{ padding: "14px 18px" }}>Peak Travel Window</th>
                  <th style={{ padding: "14px 18px" }}>Key Experiences</th>
                  <th style={{ padding: "14px 18px" }}>Meal Assurance</th>
                  <th style={{ padding: "14px 18px", borderTopRightRadius: "var(--radius-sm)" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    name: "Bali, Indonesia",
                    season: "May to October (Sunny & Dry)",
                    exp: "Infinity pool villas, Uluwatu sunset dances, water sports",
                    meals: "Verified Indian & Jain dining in Kuta/Ubud",
                    destId: "bali",
                  },
                  {
                    name: "Dubai, UAE",
                    season: "October to April (Cool & Breezy)",
                    exp: "Burj Khalifa, Red Dune Safari, Dubai Mall shopping",
                    meals: "100% Halal & Pure Veg restaurants throughout",
                    destId: "dubai",
                  },
                  {
                    name: "Maldives",
                    season: "November to April (Calm Blue Waters)",
                    exp: "Overwater villas, dolphin cruises, private sandbanks",
                    meals: "Resort Indian chefs with Jain prep available",
                    destId: "maldives",
                  },
                  {
                    name: "Switzerland",
                    season: "May-Oct (Scenic) & Dec-Mar (Snow)",
                    exp: "Mt Titlis Rotair, Swiss rail pass, alpine valleys",
                    meals: "Pre-booked Indian dining in Interlaken/Zurich",
                    destId: "switzerland",
                  },
                  {
                    name: "Thailand",
                    season: "November to April (Pleasant Island Weather)",
                    exp: "Coral Island speedboat tours, Bangkok river cruise",
                    meals: "Indian restaurants in Bangkok & Pattaya",
                    destId: "thailand",
                  },
                  {
                    name: "Kashmir, India",
                    season: "Mar-Aug (Greenery) & Dec-Feb (Snow)",
                    exp: "Dal Lake houseboats, Gulmarg Gondola, Pahalgam valleys",
                    meals: "Authentic Kashmiri & North Indian vegetarian food",
                    destId: "kashmir",
                  },
                  {
                    name: "Goa, India",
                    season: "October to April (Vibrant Beach Days)",
                    exp: "Beachfront luxury resorts, Mandovi river sundowners",
                    meals: "Multi-cuisine vegetarian & seafood buffets",
                    destId: "goa",
                  },
                  {
                    name: "Kerala, India",
                    season: "Sep-Mar (Pleasant) & Jun-Aug (Ayurveda)",
                    exp: "Alleppey backwater houseboats, Munnar tea gardens",
                    meals: "Fresh vegetarian Kerala Sadhya and custom menus",
                    destId: "kerala",
                  },
                ].map((row, idx) => (
                  <tr
                    key={row.name}
                    style={{
                      borderBottom: "1px solid var(--color-border-subtle)",
                      backgroundColor: idx % 2 === 0 ? "#FAFAF8" : "#FFFFFF",
                    }}
                  >
                    <td style={{ padding: "14px 18px", fontWeight: 700, color: "var(--color-primary)" }}>
                      {row.name}
                    </td>
                    <td style={{ padding: "14px 18px", color: "var(--color-secondary)", fontWeight: 600 }}>
                      {row.season}
                    </td>
                    <td style={{ padding: "14px 18px", color: "var(--color-text-muted)" }}>
                      {row.exp}
                    </td>
                    <td style={{ padding: "14px 18px", color: "#4A5D67" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                        <ShieldCheck size={14} style={{ color: "var(--color-accent)" }} />
                        <span>{row.meals}</span>
                      </span>
                    </td>
                    <td style={{ padding: "14px 18px" }}>
                      <button
                        onClick={() => {
                          const d = DESTINATIONS.find((dest) => dest.id === row.destId);
                          openEnquiry({ destination: d || row.name });
                        }}
                        style={{
                          backgroundColor: "transparent",
                          color: "var(--color-accent)",
                          fontWeight: 700,
                          border: "none",
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                          fontSize: "0.85rem",
                        }}
                      >
                        <span>Enquire</span>
                        <ArrowRight size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. Custom Itinerary CTA Block */}
      <section style={{ backgroundColor: "#12313A", color: "#FFFFFF", padding: "70px 0" }}>
        <div className="container" style={{ textAlign: "center", maxWidth: 720 }}>
          <span className="badge-gold" style={{ marginBottom: 14 }}>
            Personalised Consultation
          </span>
          <h2 style={{ color: "#FFFFFF", fontSize: "2.2rem", marginBottom: 16 }}>
            Want a Custom Route Not Listed Here?
          </h2>
          <p style={{ color: "#CBD5DA", fontSize: "1.02rem", lineHeight: 1.6, marginBottom: 28 }}>
            Whether you are planning a multi-country European expedition, a self-drive New Zealand tour, or an
            exotic African safari, our Noida travel specialists design bespoke itineraries tailored to your exact dates.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
            <button
              onClick={() => openEnquiry({ customContext: "Custom itinerary request for unlisted destination" })}
              className="btn btn-accent btn-lg"
            >
              <span>Request Custom Itinerary</span>
              <ArrowRight size={17} />
            </button>
            <a
              href={`tel:${CLIENT_INFO.phoneRaw}`}
              className="btn btn-outline-white btn-lg"
            >
              <Phone size={16} />
              <span>Call Specialist: {CLIENT_INFO.phone}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
