"use client";

import React, { useState } from "react";
import { DESTINATIONS, CLIENT_INFO } from "@/data/travelData";
import { Destination } from "@/types";
import { Calculator, MessageSquare, ArrowRight } from "lucide-react";

interface CostEstimatorProps {
  onOpenEnquiry?: (customNotes: string) => void;
}

export default function CostEstimator({ onOpenEnquiry }: CostEstimatorProps) {
  const [selectedDestId, setSelectedDestId] = useState<string>("bali");
  const [adults, setAdults] = useState<number>(2);
  const [kids, setKids] = useState<number>(0);
  const [hotelTier, setHotelTier] = useState<"3star" | "4star" | "5star">("4star");
  const [mealPref, setMealPref] = useState<string>("Pure Vegetarian / Jain");

  const currentDest = DESTINATIONS.find((d) => d.id === selectedDestId) || DESTINATIONS[0];

  const getMultiplier = () => {
    switch (hotelTier) {
      case "3star":
        return 0.85;
      case "4star":
        return 1.0;
      case "5star":
        return 1.45;
    }
  };

  const basePerPerson = Math.round(currentDest.startingPrice * getMultiplier());
  const adultTotal = adults * basePerPerson;
  const kidTotal = kids * Math.round(basePerPerson * 0.65);
  const finalTotal = adultTotal + kidTotal;

  const whatsappMessage = `Hi Voyastra Holidays, I calculated an itinerary estimate for ${
    currentDest.name
  }:
- Travelers: ${adults} Adults${kids > 0 ? `, ${kids} Kids` : ""}
- Hotel Category: ${hotelTier.toUpperCase()}
- Meals: ${mealPref}
- Estimated Total: ₹${finalTotal.toLocaleString("en-IN")} (All-inclusive stays, meals & transfers)
Please connect with me to finalize my itinerary!`;

  return (
    <section id="estimator" className="section section-dark" style={{ backgroundColor: "#12313A" }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-eyebrow" style={{ color: "var(--color-accent)" }}>
            <Calculator size={15} />
            <span>Transparent Pricing</span>
          </div>
          <h2 style={{ color: "#FFFFFF" }}>Calculate Your Custom Package Cost</h2>
          <p style={{ color: "#A3B5BE" }}>
            Get instant transparent pricing for your family, honeymoon, or corporate group with zero hidden fees.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="estimator-grid">
          {/* Left Column: Form Controls */}
          <div className="estimator-card">
            <h3 style={{ color: "#FFFFFF", fontSize: "1.3rem", marginBottom: 20 }}>
              Customize Your Holiday Parameters
            </h3>

            {/* 1. Destination Select */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: "0.82rem", color: "#CBD5DA", marginBottom: 8, fontWeight: 600 }}>
                1. Select Destination
              </label>
              <select
                value={selectedDestId}
                onChange={(e) => setSelectedDestId(e.target.value)}
                style={{
                  width: "100%",
                  backgroundColor: "#0A1C22",
                  color: "#FFFFFF",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  padding: "12px 14px",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "0.95rem",
                  outline: "none",
                }}
              >
                {DESTINATIONS.map((d) => (
                  <option key={d.id} value={d.id} style={{ background: "#12313A" }}>
                    {d.name} ({d.durationNights}N/{d.durationDays}D) - From ₹{d.startingPrice.toLocaleString("en-IN")}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Travelers Count */}
            <div className="estimator-counter-grid">
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", color: "#CBD5DA", marginBottom: 8, fontWeight: 600 }}>
                  Adults (12+ yrs)
                </label>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <button
                    type="button"
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 8,
                      background: "rgba(255,255,255,0.1)",
                      color: "#FFF",
                      border: "none",
                      fontSize: "1.2rem",
                      cursor: "pointer",
                    }}
                  >
                    -
                  </button>
                  <span style={{ fontSize: "1.2rem", fontWeight: 700, minWidth: 24, textAlign: "center" }}>
                    {adults}
                  </span>
                  <button
                    type="button"
                    onClick={() => setAdults(adults + 1)}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 8,
                      background: "rgba(255,255,255,0.1)",
                      color: "#FFF",
                      border: "none",
                      fontSize: "1.2rem",
                      cursor: "pointer",
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", color: "#CBD5DA", marginBottom: 8, fontWeight: 600 }}>
                  Children (2-11 yrs)
                </label>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <button
                    type="button"
                    onClick={() => setKids(Math.max(0, kids - 1))}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 8,
                      background: "rgba(255,255,255,0.1)",
                      color: "#FFF",
                      border: "none",
                      fontSize: "1.2rem",
                      cursor: "pointer",
                    }}
                  >
                    -
                  </button>
                  <span style={{ fontSize: "1.2rem", fontWeight: 700, minWidth: 24, textAlign: "center" }}>
                    {kids}
                  </span>
                  <button
                    type="button"
                    onClick={() => setKids(kids + 1)}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 8,
                      background: "rgba(255,255,255,0.1)",
                      color: "#FFF",
                      border: "none",
                      fontSize: "1.2rem",
                      cursor: "pointer",
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

              {/* 3. Hotel Category */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: "0.82rem", color: "#CBD5DA", marginBottom: 8, fontWeight: 600 }}>
                  3. Preferred Accommodation Level
                </label>
                <div className="hotel-tier-grid">
                {[
                  { id: "3star", label: "3★ Comfort", sub: "Handpicked cozy" },
                  { id: "4star", label: "4★ Premium", sub: "Popular choice" },
                  { id: "5star", label: "5★ Ultra-Lux", sub: "Luxury villas" },
                ].map((tier) => {
                  const isSel = hotelTier === tier.id;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setHotelTier(tier.id as any)}
                      style={{
                        padding: "10px 8px",
                        borderRadius: "var(--radius-md)",
                        border: isSel ? "2px solid var(--color-accent)" : "1px solid rgba(255, 255, 255, 0.14)",
                        background: isSel ? "rgba(199, 165, 107, 0.2)" : "rgba(255, 255, 255, 0.04)",
                        color: "#FFFFFF",
                        cursor: "pointer",
                        textAlign: "center",
                      }}
                    >
                      <div style={{ fontWeight: 700, fontSize: "0.88rem" }}>{tier.label}</div>
                      <div style={{ fontSize: "0.7rem", color: "#A3B5BE" }}>{tier.sub}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Meal Preference */}
            <div style={{ marginBottom: 22 }}>
              <label style={{ display: "block", fontSize: "0.82rem", color: "#CBD5DA", marginBottom: 8, fontWeight: 600 }}>
                4. Dietary &amp; Meal Preference
              </label>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {[
                  "Pure Vegetarian / Jain",
                  "Indian Continental Mix",
                  "Halal Friendly",
                  "Any Meal",
                ].map((meal) => {
                  const isSel = mealPref === meal;
                  return (
                    <button
                      key={meal}
                      type="button"
                      onClick={() => setMealPref(meal)}
                      style={{
                        padding: "6px 14px",
                        borderRadius: "var(--radius-full)",
                        border: isSel ? "1px solid var(--color-accent)" : "1px solid rgba(255,255,255,0.12)",
                        background: isSel ? "rgba(199, 165, 107, 0.2)" : "transparent",
                        color: isSel ? "#F7F3E9" : "#CBD5DA",
                        fontSize: "0.82rem",
                        fontWeight: isSel ? 600 : 400,
                        cursor: "pointer",
                      }}
                    >
                      {meal}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. Inclusions Transparency Note */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: "var(--radius-md)",
                padding: "12px 14px",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  backgroundColor: "rgba(20, 107, 101, 0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Calculator size={16} style={{ color: "var(--color-accent)" }} />
              </div>
              <div style={{ fontSize: "0.8rem", color: "#D0DCD9", lineHeight: 1.4 }}>
                <strong style={{ color: "#FFFFFF" }}>Zero Hidden Charges:</strong> All quotes include verified 4★/5★ accommodations, breakfast, private transfers, and local sightseeing.
              </div>
            </div>
          </div>

          {/* Right Column: Price Summary Card */}
          <div
            className="estimator-card"
            style={{
              backgroundColor: "#0A1C22",
              border: "1px solid rgba(199, 165, 107, 0.35)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 18px 40px rgba(0,0,0,0.45)",
            }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <div>
                  <span className="badge-gold">Estimated Custom Quote</span>
                  <h4 style={{ color: "#FFFFFF", fontSize: "1.7rem", marginTop: 8 }}>
                    {currentDest.name} Holiday Package
                  </h4>
                  <div style={{ color: "#A3B5BE", fontSize: "0.85rem" }}>
                    {currentDest.durationNights} Nights / {currentDest.durationDays} Days • {hotelTier.toUpperCase()} Stays
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 16, marginBottom: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "#CBD5DA", marginBottom: 8 }}>
                  <span>{adults} Adult(s) @ ₹{basePerPerson.toLocaleString("en-IN")}</span>
                  <span>₹{adultTotal.toLocaleString("en-IN")}</span>
                </div>

                {kids > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "#CBD5DA", marginBottom: 8 }}>
                    <span>{kids} Child(ren) (with bed/meals)</span>
                    <span>₹{kidTotal.toLocaleString("en-IN")}</span>
                  </div>
                )}



                <div
                  style={{
                    borderTop: "1px dashed rgba(255,255,255,0.2)",
                    paddingTop: 12,
                    marginTop: 8,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                  }}
                >
                  <span style={{ fontSize: "1.05rem", fontWeight: 700, color: "#FFFFFF" }}>
                    Total Estimated Cost
                  </span>
                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        fontSize: "2.1rem",
                        fontWeight: 800,
                        color: "var(--color-accent)",
                        fontFamily: "var(--font-playfair)",
                        lineHeight: 1,
                      }}
                    >
                      ₹{finalTotal.toLocaleString("en-IN")}*
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "#A3B5BE" }}>
                      *Inclusive of stays, breakfast, tours &amp; transfers
                    </div>
                  </div>
                </div>
              </div>

              {/* Included Perks */}
              <div
                style={{
                  background: "rgba(255,255,255,0.04)",
                  borderRadius: "var(--radius-md)",
                  padding: "14px 18px",
                  marginBottom: 26,
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--color-accent)", marginBottom: 6 }}>
                  VOYASTRA PROMISE INCLUDED:
                </div>
                <div style={{ fontSize: "0.82rem", color: "#F7F6F0", lineHeight: 1.5 }}>
                  ✓ {mealPref} dining arrangements <br />
                  ✓ 24/7 dedicated Noida holiday coordinator on WhatsApp <br />
                  ✓ All internal airport &amp; sightseeing private transfers
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <a
                href={`https://wa.me/${CLIENT_INFO.phoneRaw}?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                style={{ width: "100%", justifyContent: "center", padding: "13px" }}
              >
                <MessageSquare size={17} />
                <span>Send Estimate To WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() =>
                  onOpenEnquiry &&
                  onOpenEnquiry(
                    `Estimator details: ${currentDest.name}, ${adults} Adults, ${kids} Kids, ${hotelTier}, ${mealPref}, Est. ₹${finalTotal.toLocaleString("en-IN")}`
                  )
                }
                className="btn btn-accent"
                style={{ width: "100%", justifyContent: "center", padding: "13px" }}
              >
                <span>Lock In This Quote (Free Callback)</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
