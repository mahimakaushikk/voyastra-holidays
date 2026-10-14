"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { DESTINATIONS, CLIENT_INFO } from "@/data/travelData";
import { useEnquiry } from "@/components/EnquiryContext";
import {
  Calculator,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  MessageSquare,
  ArrowRight,
  Plane,
  Building,
  Utensils,
  Receipt,
  Car,
  ChevronDown,
  Info,
} from "lucide-react";

export default function TripCostPage() {
  const { openEnquiry } = useEnquiry();

  // Estimator States
  const [destId, setDestId] = useState<string>("bali");
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [hotelTier, setHotelTier] = useState<"3star" | "4star" | "5star">("4star");
  const [includeFlights, setIncludeFlights] = useState<boolean>(true);
  const [mealPlan, setMealPlan] = useState<"cp" | "map" | "ai">("map");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const currentDest = useMemo(() => {
    return DESTINATIONS.find((d) => d.id === destId) || DESTINATIONS[0];
  }, [destId]);

  // Flight cost estimates per person based on destination
  const flightEstimates: Record<string, number> = {
    bali: 28000,
    dubai: 22000,
    maldives: 26000,
    switzerland: 65000,
    thailand: 19000,
    kashmir: 9500,
    goa: 7500,
    kerala: 8500,
  };

  // Tier multiplier
  const tierMultiplier = hotelTier === "3star" ? 0.82 : hotelTier === "4star" ? 1.0 : 1.48;

  // Meal Plan cost per person per day
  const mealCostPerDay = mealPlan === "cp" ? 0 : mealPlan === "map" ? 1200 : 2500;

  // Calculate Breakdown Components
  const days = currentDest.durationDays;
  const nights = currentDest.durationNights;

  // Land baseline package per adult
  const landBaseAdult = Math.round(currentDest.startingPrice * tierMultiplier);
  const landBaseChild = Math.round(landBaseAdult * 0.65);

  // Sub-breakdowns (proportional)
  const accommodationTotal = Math.round(
    (adults * landBaseAdult * 0.52 + children * landBaseChild * 0.45)
  );

  const transportToursTotal = Math.round(
    (adults * landBaseAdult * 0.38 + children * landBaseChild * 0.42)
  );

  const mealTotal = (adults + children * 0.7) * (mealCostPerDay * days);

  const flightUnit = flightEstimates[currentDest.id] || 20000;
  const flightTotal = includeFlights ? Math.round(adults * flightUnit + children * (flightUnit * 0.85)) : 0;

  const subtotal = accommodationTotal + transportToursTotal + mealTotal + flightTotal;
  const gst = Math.round(subtotal * 0.05); // 5% GST
  const grandTotal = subtotal + gst;
  const perPersonCost = Math.round(grandTotal / (adults + children));

  const whatsappMessage = `Hi Voyastra Holidays, I used your Budget Estimator for ${currentDest.name}:
- Destination: ${currentDest.name} (${nights}N/${days}D)
- Travelers: ${adults} Adults, ${children} Children
- Hotel Tier: ${hotelTier.toUpperCase()}
- Flights Included: ${includeFlights ? "Yes" : "Land Only"}
- Meal Plan: ${mealPlan.toUpperCase()}
- Indicative Total: ₹${grandTotal.toLocaleString("en-IN")} (~₹${perPersonCost.toLocaleString("en-IN")}/person)
Please send me a detailed itinerary and finalize this quotation.`;

  const budgetFaqs = [
    {
      q: "Are there any hidden charges or surprise local fees excluded from this estimate?",
      a: "No! At Voyastra, we pride ourselves on absolute transparency. This estimate includes your hotel stays with taxes, private airport and sightseeing transfers, selected meal plans, and 5% Indian GST. Optional personal expenses such as visa fees (where charged separately) and personal shopping are clearly itemized in your formal proposal.",
    },
    {
      q: "How does TCS (Tax Collected at Source) apply to international tour packages?",
      a: "As per Government of India guidelines, international holiday packages under ₹7 Lakhs per financial year attract 5% TCS, and amounts exceeding ₹7 Lakhs attract 20% TCS. This TCS is NOT an extra expense; it is deposited against your PAN card and can be 100% adjusted or refunded when you file your annual Income Tax Return (ITR).",
    },
    {
      q: "Can we pay in easy monthly installments (EMI)?",
      a: "Yes! We partner with leading Indian banks (HDFC, ICICI, SBI, Axis, and Kotak) to offer 3, 6, 9, and 12-month low-interest or no-cost EMI options for packages booked at least 30 days prior to departure.",
    },
    {
      q: "What is your deposit and payment timeline?",
      a: "To confirm hotel rooms and flight tickets, an initial booking deposit of 25% is required. 50% is payable 30 days before departure, and the remaining 25% balance is due 15 days prior to travel along with visa release.",
    },
    {
      q: "Why do prices vary during Diwali, Christmas, and New Year?",
      a: "Airlines and international resort chains apply peak season holiday surcharges during peak periods (late October/November for Diwali and December 20 - January 5 for New Year). Booking 60 to 90 days in advance locks in regular tier rates.",
    },
  ];

  return (
    <div style={{ backgroundColor: "var(--color-bg)", minHeight: "100vh" }}>
      {/* 1. CINEMATIC PAGE HEADER */}
      <section
        style={{
          position: "relative",
          backgroundColor: "#12313A",
          color: "#FFFFFF",
          paddingTop: "clamp(60px, 9vw, 90px)",
          paddingBottom: "clamp(50px, 7vw, 75px)",
          overflow: "hidden",
          textAlign: "center",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 50% 20%, rgba(224, 122, 43, 0.25) 0%, rgba(18, 49, 58, 0.95) 70%, #0A1C22 100%)",
            zIndex: 1,
          }}
        />

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.16)",
              padding: "4px 14px",
              borderRadius: "var(--radius-full)",
              marginBottom: 16,
            }}
          >
            <Calculator size={14} style={{ color: "var(--color-accent)" }} />
            <span
              style={{
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "#F7F6F0",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              100% Transparent Travel Pricing
            </span>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
              fontWeight: 700,
              lineHeight: 1.18,
              color: "#FFFFFF",
              maxWidth: 840,
              margin: "0 auto 16px auto",
            }}
          >
            Voyastra Interactive <br />
            <span style={{ color: "var(--color-accent)", fontStyle: "italic" }}>
              Holiday Cost Estimator
            </span>
          </h1>

          <p
            style={{
              fontSize: "clamp(1rem, 1.3vw, 1.15rem)",
              color: "#E2DFD2",
              maxWidth: 680,
              margin: "0 auto 0 auto",
              lineHeight: 1.6,
            }}
          >
            Configure your destination, hotel preference, travelers, flights, and meals.
            Get an instant, itemized indicative breakdown with zero hidden fees.
          </p>
        </div>
      </section>

      {/* 2. THE ESTIMATOR APPLICATION */}
      <section className="section" style={{ padding: "40px 0 60px 0" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 32,
              alignItems: "flex-start",
            }}
          >
            {/* LEFT COLUMN: CONTROLS */}
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--color-border)",
                padding: "clamp(20px, 3.5vw, 32px)",
                boxShadow: "0 6px 24px rgba(0, 0, 0, 0.05)",
              }}
            >
              <h2 style={{ fontSize: "1.35rem", color: "var(--color-primary)", fontWeight: 700, marginBottom: 20 }}>
                1. Configure Your Trip Parameters
              </h2>

              {/* Destination Selector */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--color-primary)", marginBottom: 8 }}>
                  Destination ({DESTINATIONS.length} Available)
                </label>
                <select
                  value={destId}
                  onChange={(e) => setDestId(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--color-border)",
                    backgroundColor: "#F8FAFC",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: "var(--color-primary)",
                    outline: "none",
                  }}
                >
                  {DESTINATIONS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.durationNights}N/{d.durationDays}D) — Starting ₹{d.startingPrice.toLocaleString("en-IN")}
                    </option>
                  ))}
                </select>
              </div>

              {/* Travelers (Adults + Children) */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--color-primary)", marginBottom: 8 }}>
                    Adults (12+ yrs)
                  </label>
                  <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--color-border)", borderRadius: "var(--radius-sm)" }}>
                    <button
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      style={{ width: 40, height: 40, backgroundColor: "#F1F5F9", border: "none", cursor: "pointer", fontSize: "1.2rem", fontWeight: 700 }}
                    >
                      -
                    </button>
                    <span style={{ flex: 1, textAlign: "center", fontWeight: 700, fontSize: "1rem" }}>{adults}</span>
                    <button
                      onClick={() => setAdults(Math.min(10, adults + 1))}
                      style={{ width: 40, height: 40, backgroundColor: "#F1F5F9", border: "none", cursor: "pointer", fontSize: "1.2rem", fontWeight: 700 }}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--color-primary)", marginBottom: 8 }}>
                    Children (2-11 yrs)
                  </label>
                  <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--color-border)", borderRadius: "var(--radius-sm)" }}>
                    <button
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      style={{ width: 40, height: 40, backgroundColor: "#F1F5F9", border: "none", cursor: "pointer", fontSize: "1.2rem", fontWeight: 700 }}
                    >
                      -
                    </button>
                    <span style={{ flex: 1, textAlign: "center", fontWeight: 700, fontSize: "1rem" }}>{children}</span>
                    <button
                      onClick={() => setChildren(Math.min(6, children + 1))}
                      style={{ width: 40, height: 40, backgroundColor: "#F1F5F9", border: "none", cursor: "pointer", fontSize: "1.2rem", fontWeight: 700 }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Accommodation Tier */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--color-primary)", marginBottom: 8 }}>
                  Accommodation Category
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                  {[
                    { id: "3star", label: "Comfort 3★", desc: "Clean, verified" },
                    { id: "4star", label: "Premium 4★", desc: "Most popular" },
                    { id: "5star", label: "Luxury 5★", desc: "Resort / Villa" },
                  ].map((tier) => (
                    <button
                      key={tier.id}
                      onClick={() => setHotelTier(tier.id as any)}
                      style={{
                        padding: "10px 8px",
                        borderRadius: "var(--radius-sm)",
                        border: hotelTier === tier.id ? "2px solid var(--color-accent)" : "1px solid var(--color-border)",
                        backgroundColor: hotelTier === tier.id ? "rgba(224, 122, 43, 0.08)" : "#FFFFFF",
                        cursor: "pointer",
                        textAlign: "center",
                      }}
                    >
                      <strong style={{ display: "block", fontSize: "0.85rem", color: "var(--color-primary)" }}>
                        {tier.label}
                      </strong>
                      <span style={{ fontSize: "0.72rem", color: "var(--color-text-muted)" }}>{tier.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Flights Toggle */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--color-primary)", marginBottom: 8 }}>
                  Flight Inclusion
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <button
                    onClick={() => setIncludeFlights(true)}
                    style={{
                      padding: "12px",
                      borderRadius: "var(--radius-sm)",
                      border: includeFlights ? "2px solid var(--color-secondary)" : "1px solid var(--color-border)",
                      backgroundColor: includeFlights ? "rgba(20, 107, 101, 0.08)" : "#FFFFFF",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      justifyContent: "center",
                      fontSize: "0.88rem",
                      fontWeight: 600,
                      color: "var(--color-primary)",
                    }}
                  >
                    <Plane size={16} style={{ color: "var(--color-secondary)" }} />
                    <span>Include Flights (~₹{flightEstimates[currentDest.id]?.toLocaleString("en-IN")})</span>
                  </button>

                  <button
                    onClick={() => setIncludeFlights(false)}
                    style={{
                      padding: "12px",
                      borderRadius: "var(--radius-sm)",
                      border: !includeFlights ? "2px solid var(--color-secondary)" : "1px solid var(--color-border)",
                      backgroundColor: !includeFlights ? "rgba(20, 107, 101, 0.08)" : "#FFFFFF",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      justifyContent: "center",
                      fontSize: "0.88rem",
                      fontWeight: 600,
                      color: "var(--color-primary)",
                    }}
                  >
                    <Building size={16} style={{ color: "var(--color-secondary)" }} />
                    <span>Land Only (No Flights)</span>
                  </button>
                </div>
              </div>

              {/* Meal Plan */}
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--color-primary)", marginBottom: 8 }}>
                  Meal Preference
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                  {[
                    { id: "cp", label: "Breakfast Only (CP)", note: "Included" },
                    { id: "map", label: "Breakfast + Dinner (MAP)", note: "+₹1,200/day" },
                    { id: "ai", label: "All Meals / AI", note: "+₹2,500/day" },
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setMealPlan(m.id as any)}
                      style={{
                        padding: "10px 6px",
                        borderRadius: "var(--radius-sm)",
                        border: mealPlan === m.id ? "2px solid var(--color-primary)" : "1px solid var(--color-border)",
                        backgroundColor: mealPlan === m.id ? "#F1F5F9" : "#FFFFFF",
                        cursor: "pointer",
                        textAlign: "center",
                      }}
                    >
                      <strong style={{ display: "block", fontSize: "0.82rem", color: "var(--color-primary)" }}>
                        {m.label}
                      </strong>
                      <span style={{ fontSize: "0.7rem", color: "var(--color-text-muted)" }}>{m.note}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: ITEMIZED BREAKDOWN CARD */}
            <div
              style={{
                backgroundColor: "#12313A",
                color: "#FFFFFF",
                borderRadius: "var(--radius-md)",
                padding: "clamp(22px, 3.5vw, 34px)",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <span
                  style={{
                    backgroundColor: "rgba(224, 122, 43, 0.2)",
                    color: "var(--color-accent)",
                    border: "1px solid rgba(224, 122, 43, 0.4)",
                    padding: "4px 12px",
                    borderRadius: "var(--radius-full)",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                  }}
                >
                  Indicative Package Estimate
                </span>
                <span style={{ fontSize: "0.82rem", color: "#A3B5BE" }}>
                  {nights} Nights / {days} Days
                </span>
              </div>

              <h2 style={{ fontSize: "1.8rem", color: "#FFFFFF", fontWeight: 700, marginBottom: 6 }}>
                {currentDest.name} Holiday
              </h2>
              <p style={{ fontSize: "0.88rem", color: "#CBD5DA", marginBottom: 24 }}>
                For {adults} Adult{adults > 1 ? "s" : ""}{children > 0 ? `, ${children} Child${children > 1 ? "ren" : ""}` : ""} &bull; {hotelTier.toUpperCase()} Hotels
              </p>

              {/* Itemized Lines */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12, borderTop: "1px solid rgba(255, 255, 255, 0.12)", paddingTop: 18, marginBottom: 22 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.92rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#E2DFD2" }}>
                    <Building size={16} style={{ color: "var(--color-accent)" }} />
                    <span>Hotel Stays ({hotelTier.toUpperCase()}) &amp; Breakfast</span>
                  </div>
                  <strong style={{ color: "#FFFFFF" }}>₹{accommodationTotal.toLocaleString("en-IN")}</strong>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.92rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#E2DFD2" }}>
                    <Car size={16} style={{ color: "var(--color-accent)" }} />
                    <span>Private Airport &amp; Sightseeing Transfers</span>
                  </div>
                  <strong style={{ color: "#FFFFFF" }}>₹{transportToursTotal.toLocaleString("en-IN")}</strong>
                </div>

                {mealTotal > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.92rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#E2DFD2" }}>
                      <Utensils size={16} style={{ color: "var(--color-accent)" }} />
                      <span>Meal Plan Supplement ({mealPlan.toUpperCase()})</span>
                    </div>
                    <strong style={{ color: "#FFFFFF" }}>₹{mealTotal.toLocaleString("en-IN")}</strong>
                  </div>
                )}

                {includeFlights && (
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.92rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#E2DFD2" }}>
                      <Plane size={16} style={{ color: "var(--color-accent)" }} />
                      <span>Estimated Return Flights (Economy)</span>
                    </div>
                    <strong style={{ color: "#FFFFFF" }}>₹{flightTotal.toLocaleString("en-IN")}</strong>
                  </div>
                )}

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.85rem", color: "#A3B5BE" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Receipt size={14} />
                    <span>Government GST (5%) &amp; Local Tourism Taxes</span>
                  </div>
                  <span>₹{gst.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Total Box */}
              <div
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  borderRadius: "var(--radius-sm)",
                  padding: "18px 20px",
                  marginBottom: 24,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 6 }}>
                  <div>
                    <span style={{ fontSize: "0.78rem", color: "#CBD5DA", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Estimated Package Total
                    </span>
                    <div style={{ fontSize: "2rem", color: "var(--color-accent)", fontWeight: 800 }}>
                      ₹{grandTotal.toLocaleString("en-IN")}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontSize: "0.75rem", color: "#CBD5DA" }}>Per Person Avg</span>
                    <div style={{ fontSize: "1.15rem", color: "#FFFFFF", fontWeight: 700 }}>
                      ₹{perPersonCost.toLocaleString("en-IN")}
                    </div>
                  </div>
                </div>
                <div style={{ fontSize: "0.75rem", color: "#A3B5BE", display: "flex", alignItems: "center", gap: 6 }}>
                  <Info size={12} />
                  <span>Includes all stays, transfers, specified meals &amp; taxes.</span>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <button
                  onClick={() =>
                    openEnquiry({
                      destination: currentDest,
                      customContext: `Calculated Estimate: ₹${grandTotal.toLocaleString("en-IN")} (${adults} Adults, ${children} Kids, ${hotelTier.toUpperCase()}, ${includeFlights ? "With Flights" : "Land Only"})`,
                    })
                  }
                  className="btn btn-primary"
                  style={{
                    padding: "14px",
                    fontSize: "1rem",
                    borderRadius: "var(--radius-full)",
                    justifyContent: "center",
                  }}
                >
                  Request Official Proposal &amp; Lock Rates
                </button>

                <a
                  href={`https://wa.me/${CLIENT_INFO.phoneRaw}?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                  style={{
                    backgroundColor: "rgba(37, 211, 102, 0.18)",
                    border: "1px solid #25D366",
                    color: "#FFFFFF",
                    padding: "12px",
                    fontSize: "0.95rem",
                    borderRadius: "var(--radius-full)",
                    justifyContent: "center",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <MessageSquare size={16} style={{ color: "#25D366" }} />
                  Send This Estimate to WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TRANSPARENT ASSUMPTIONS & SEASONAL VARIANCE TABLE */}
      <section className="section" style={{ backgroundColor: "#F7F6F0" }}>
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow" style={{ color: "var(--color-secondary)" }}>
              <ShieldCheck size={16} />
              <span>Transparent Terms</span>
            </div>
            <h2>Pricing Assumptions &amp; Seasonal Variances</h2>
            <p>
              Travel rates fluctuate naturally with seasonal flight load factors and hotel occupancy. Here is how to plan your travel timing.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
              marginBottom: 36,
            }}
          >
            <div style={{ backgroundColor: "#FFFFFF", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", padding: "26px 22px" }}>
              <div style={{ color: "var(--color-secondary)", fontWeight: 700, fontSize: "1.1rem", marginBottom: 8 }}>
                Off-Peak / Monsoon Savings
              </div>
              <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--color-secondary)", marginBottom: 10 }}>
                15% – 25% Lower
              </div>
              <p style={{ fontSize: "0.88rem", color: "var(--color-text-muted)", lineHeight: 1.6 }}>
                Ideal for budget-conscious families and couples seeking peace, uncrowded temples, lush green landscapes, and lowest flight fares.
              </p>
            </div>

            <div style={{ backgroundColor: "#FFFFFF", border: "2px solid var(--color-accent)", borderRadius: "var(--radius-md)", padding: "26px 22px", position: "relative" }}>
              <div style={{ position: "absolute", top: -11, right: 18, backgroundColor: "var(--color-accent)", color: "#FFFFFF", padding: "2px 10px", borderRadius: "var(--radius-full)", fontSize: "0.72rem", fontWeight: 700 }}>
                CURRENT ESTIMATE
              </div>
              <div style={{ color: "var(--color-primary)", fontWeight: 700, fontSize: "1.1rem", marginBottom: 8 }}>
                Regular / Shoulder Season
              </div>
              <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--color-primary)", marginBottom: 10 }}>
                Standard Published Rate
              </div>
              <p style={{ fontSize: "0.88rem", color: "var(--color-text-muted)", lineHeight: 1.6 }}>
                Pleasant weather, standard flight connections, and optimal availability for 4★ and 5★ properties.
              </p>
            </div>

            <div style={{ backgroundColor: "#FFFFFF", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", padding: "26px 22px" }}>
              <div style={{ color: "#E11D48", fontWeight: 700, fontSize: "1.1rem", marginBottom: 8 }}>
                Peak Festive / New Year
              </div>
              <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "#E11D48", marginBottom: 10 }}>
                25% – 40% Higher
              </div>
              <p style={{ fontSize: "0.88rem", color: "var(--color-text-muted)", lineHeight: 1.6 }}>
                Applies during Diwali week and Christmas / New Year (Dec 22 – Jan 5). Mandatory resort gala dinners apply on Dec 24 and Dec 31.
              </p>
            </div>
          </div>

          {/* Legal Disclaimer Box */}
          <div
            style={{
              backgroundColor: "rgba(224, 122, 43, 0.08)",
              border: "1px solid rgba(224, 122, 43, 0.3)",
              borderRadius: "var(--radius-sm)",
              padding: "18px 22px",
              display: "flex",
              alignItems: "flex-start",
              gap: 14,
            }}
          >
            <AlertCircle size={20} style={{ color: "var(--color-accent)", flexShrink: 0, marginTop: 2 }} />
            <div style={{ fontSize: "0.85rem", color: "var(--color-text-dark)", lineHeight: 1.6 }}>
              <strong>Important Transparent Pricing Disclaimer:</strong> All figures produced by this tool are indicative baseline calculations based on current airline averages and contracting hotel rates. Actual finalized quotes may vary slightly depending on exact dates of travel, airfare class availability at the time of booking, foreign exchange currency fluctuation (USD/INR), and specific resort surcharges.
            </div>
          </div>
        </div>
      </section>

      {/* 4. BUDGETING FAQS */}
      <section className="section" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="container" style={{ maxWidth: 840 }}>
          <div className="section-header">
            <h2>Frequently Asked Pricing &amp; Payment Questions</h2>
            <p>Clear guidance on taxes, TCS, bank EMIs, and booking deposits.</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {budgetFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  style={{
                    backgroundColor: "#F8FAFC",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-sm)",
                    overflow: "hidden",
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    style={{
                      width: "100%",
                      padding: "18px 22px",
                      textAlign: "left",
                      backgroundColor: "transparent",
                      border: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      cursor: "pointer",
                      fontSize: "1rem",
                      fontWeight: 600,
                      color: "var(--color-primary)",
                    }}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={18}
                      style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s ease",
                        color: "var(--color-accent)",
                        flexShrink: 0,
                      }}
                    />
                  </button>
                  {isOpen && (
                    <div
                      style={{
                        padding: "0 22px 20px 22px",
                        fontSize: "0.92rem",
                        color: "var(--color-text-muted)",
                        lineHeight: 1.65,
                        borderTop: "1px solid var(--color-border)",
                        paddingTop: 14,
                      }}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
