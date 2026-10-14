"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DESTINATIONS, CLIENT_INFO } from "@/data/travelData";
import { useEnquiry } from "@/components/EnquiryContext";
import {
  Users2,
  Briefcase,
  Award,
  Building2,
  FileCheck,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Phone,
  MessageSquare,
  Sparkles,
  Plane,
  Receipt,
  ShieldCheck,
} from "lucide-react";

export default function GroupsPage() {
  const { openEnquiry } = useEnquiry();
  const [activeTab, setActiveTab] = useState<"corporate" | "leisure">("corporate");
  const [paxRange, setPaxRange] = useState<string>("25-50");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const groupDestinations = [
    {
      id: "goa",
      name: "Goa Beach Retreat & Gala",
      capacity: "15 - 150+ Pax",
      highlights: [
        "Private 5★ beachfront lawn setups for gala award nights",
        "Exclusive Mandovi River sunset cruise with live DJ & sound setup",
        "Customized watersports & beach team bonding olympics",
        "North & South Goa private villa clusters with private pools",
      ],
      price: "₹14,999",
      image: "/images/destinations/goa.jpg",
    },
    {
      id: "dubai",
      name: "Dubai Corporate & MICE Summit",
      capacity: "20 - 300+ Pax",
      highlights: [
        "Private camp desert safari with exclusive gala dinner & DJ",
        "Luxury 85-foot private yacht charter at Dubai Marina",
        "Conference hall setups with high-speed AV & banquet catering",
        "Burj Khalifa observation deck & luxury shopping excursions",
      ],
      price: "₹42,500",
      image: "/images/destinations/dubai.jpg",
    },
    {
      id: "thailand",
      name: "Thailand Offsite: Bangkok & Pattaya",
      capacity: "15 - 200+ Pax",
      highlights: [
        "Coral Island speedboat excursion with parasailing & sea walking",
        "Chao Phraya luxury river cruise dinner with traditional shows",
        "Central 5★ convention hotels close to Skytrain & nightlife",
        "Dedicated Hindi/English speaking tour coordinators",
      ],
      price: "₹34,999",
      image: "/images/destinations/thailand.jpg",
    },
    {
      id: "bali",
      name: "Bali Leadership Retreat & Team Culture",
      capacity: "12 - 80+ Pax",
      highlights: [
        "Ubud rainforest resort retreats for strategic goal setting",
        "Ayung River white water rafting team challenge",
        "Exclusive clifftop sunset cocktail reception at Uluwatu",
        "Private luxury villa compounds with shared celebration spaces",
      ],
      price: "₹46,999",
      image: "/images/destinations/bali.jpg",
    },
  ];

  const groupFaqs = [
    {
      q: "Do you issue official GST invoices for corporate tax input credit?",
      a: "Yes, 100%. Voyastra Holidays is a registered Indian travel boutique based in Noida, Uttar Pradesh. We provide verified GST tax invoices with itemized HSN codes for air tickets, hotel accommodations, and conference management so your organization can claim full Input Tax Credit (ITC).",
    },
    {
      q: "Can Voyastra manage flight tickets for 50+ employees traveling from different cities?",
      a: "Absolutely! Multi-city flight logistics is one of our key strengths. Whether your team is flying out of Delhi, Mumbai, Bengaluru, Hyderabad, or Kolkata, our corporate desk books group PNRs, arranges coordinated airport transfers, and aligns check-in timings at the destination.",
    },
    {
      q: "Will a dedicated Voyastra Tour Manager accompany our group on-ground?",
      a: "For all group bookings of 20 passengers and above, we deploy an experienced, dedicated Voyastra Tour Manager who stays on-ground 24/7. They oversee hotel room allocations, coordinate coach movements, inspect banquet dining, and troubleshoot all logistics.",
    },
    {
      q: "What group size discounts can we expect?",
      a: "Because of our wholesale airline contracts and year-round hotel commitments, we offer tiered bulk discounts ranging from 12% to 25% lower than individual FIT bookings, alongside complimentary room upgrades for leadership/organizers.",
    },
    {
      q: "Can you organize private family reunions with children and seniors?",
      a: "Yes, we specialize in milestone family gatherings (50th anniversaries, 60th birthdays, Diwali get-togethers). We arrange private villa clusters where families have their own private rooms while enjoying shared dining lawns, private pools, and child-safe grounds.",
    },
  ];

  return (
    <div style={{ backgroundColor: "var(--color-bg)", minHeight: "100vh" }}>
      {/* 1. HERO SECTION */}
      <section
        style={{
          position: "relative",
          minHeight: "75vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#FFFFFF",
          overflow: "hidden",
          backgroundColor: "#12313A",
        }}
      >
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Image
            src="/images/groups-hero.jpg"
            alt="Group celebrating at luxury cliffside resort infinity deck"
            fill
            priority
            style={{ objectFit: "cover", objectPosition: "center 30%" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(18, 49, 58, 0.88) 0%, rgba(18, 49, 58, 0.72) 50%, rgba(10, 28, 34, 0.96) 100%)",
            }}
          />
        </div>

        <div className="container" style={{ position: "relative", zIndex: 2, padding: "80px 20px", textAlign: "center" }}>
          {/* Eyebrow */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              backgroundColor: "rgba(224, 122, 43, 0.18)",
              border: "1px solid rgba(224, 122, 43, 0.4)",
              padding: "6px 16px",
              borderRadius: "var(--radius-full)",
              marginBottom: 20,
            }}
          >
            <Users2 size={15} style={{ color: "var(--color-accent)" }} />
            <span
              style={{
                fontSize: "0.82rem",
                fontWeight: 700,
                color: "#F7F6F0",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Group &amp; MICE Specialists
            </span>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(2.3rem, 5vw, 4rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              color: "#FFFFFF",
              maxWidth: 920,
              margin: "0 auto 20px auto",
            }}
          >
            Seamless Group Holidays &amp;{" "}
            <span style={{ color: "var(--color-accent)", fontStyle: "italic" }}>
              Corporate MICE Retreats
            </span>
          </h1>

          <p
            style={{
              fontSize: "clamp(1rem, 1.4vw, 1.2rem)",
              color: "#E2DFD2",
              maxWidth: 740,
              margin: "0 auto 36px auto",
              lineHeight: 1.65,
            }}
          >
            From milestone family reunions and friends getaways to executive retreats and 100+ pax corporate offsites.
            Dedicated tour managers, bulk rates, and GST-compliant invoicing.
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => openEnquiry({ travelType: "Corporate Group" })}
              className="btn btn-primary"
              style={{
                padding: "14px 32px",
                fontSize: "1.05rem",
                borderRadius: "var(--radius-full)",
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                boxShadow: "0 8px 24px rgba(224, 122, 43, 0.35)",
              }}
            >
              Request Group Proposal
              <ArrowRight size={18} />
            </button>

            <a
              href={`https://wa.me/${CLIENT_INFO.phoneRaw}?text=${encodeURIComponent(
                "Hi Voyastra, I am looking for a group package / corporate offsite quotation for our team."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.12)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                color: "#FFFFFF",
                padding: "14px 28px",
                fontSize: "1rem",
                borderRadius: "var(--radius-full)",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                backdropFilter: "blur(6px)",
              }}
            >
              <MessageSquare size={17} style={{ color: "#25D366" }} />
              Direct Group Desk WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* 2. DUAL GROUP TRACKS */}
      <section className="section" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow" style={{ color: "var(--color-secondary)" }}>
              <Briefcase size={16} />
              <span>Tailored Solutions</span>
            </div>
            <h2>Two Distinct Group Travel Streams</h2>
            <p>
              Whether you are organizing a corporate performance reward or a nostalgic college squad reunion.
            </p>
          </div>

          {/* Toggle Buttons */}
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 36 }}>
            <button
              onClick={() => setActiveTab("corporate")}
              style={{
                padding: "12px 28px",
                borderRadius: "var(--radius-full)",
                fontSize: "1rem",
                fontWeight: 700,
                cursor: "pointer",
                border: "none",
                backgroundColor: activeTab === "corporate" ? "var(--color-primary)" : "#F1F5F9",
                color: activeTab === "corporate" ? "#FFFFFF" : "var(--color-primary)",
                transition: "all 0.2s ease",
              }}
            >
              Corporate Offsites &amp; MICE
            </button>
            <button
              onClick={() => setActiveTab("leisure")}
              style={{
                padding: "12px 28px",
                borderRadius: "var(--radius-full)",
                fontSize: "1rem",
                fontWeight: 700,
                cursor: "pointer",
                border: "none",
                backgroundColor: activeTab === "leisure" ? "var(--color-primary)" : "#F1F5F9",
                color: activeTab === "leisure" ? "#FFFFFF" : "var(--color-primary)",
                transition: "all 0.2s ease",
              }}
            >
              Family Reunions &amp; Friends
            </button>
          </div>

          {/* Active Tab Content */}
          {activeTab === "corporate" ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 24,
              }}
            >
              {[
                {
                  icon: Receipt,
                  title: "100% GST Invoicing & ITC",
                  desc: "Itemized tax invoices with legitimate HSN codes for air tickets, hotel accommodation, and banqueting to ensure zero tax leakage.",
                },
                {
                  icon: Users2,
                  title: "On-Ground Tour Manager",
                  desc: "A dedicated Voyastra professional stays with your group throughout to manage room check-ins, coach transfers, and gala timelines.",
                },
                {
                  icon: Building2,
                  title: "AV & Banquet Production",
                  desc: "Conference hall booking with high-definition LED backdrops, cordless microphones, podium setups, and curated gala dinners.",
                },
                {
                  icon: Plane,
                  title: "Multi-City Flight Management",
                  desc: "Coordinated group airline ticketing from Delhi, Mumbai, Bengaluru, Chennai, and Kolkata ensuring synchronized arrival times.",
                },
              ].map((card, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: "#F8FAFC",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-md)",
                    padding: "30px 24px",
                  }}
                >
                  <div
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: "var(--radius-full)",
                      backgroundColor: "rgba(20, 107, 101, 0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 18,
                    }}
                  >
                    <card.icon size={24} style={{ color: "var(--color-secondary)" }} />
                  </div>
                  <h3 style={{ fontSize: "1.18rem", color: "var(--color-primary)", fontWeight: 700, marginBottom: 10 }}>
                    {card.title}
                  </h3>
                  <p style={{ color: "var(--color-text-muted)", fontSize: "0.92rem", lineHeight: 1.6 }}>
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 24,
              }}
            >
              {[
                {
                  icon: Building2,
                  title: "Private Villa Compounds",
                  desc: "Rent an entire 6-10 bedroom luxury villa cluster in Goa, Bali, or Kerala with private pool, lawn, and personal cook staff.",
                },
                {
                  icon: Users2,
                  title: "Multi-Age Entertainment",
                  desc: "Curated experiences that keep children entertained with watersports while grandparents enjoy tranquil gardens and private boat rides.",
                },
                {
                  icon: ShieldCheck,
                  title: "Custom Indian Catering",
                  desc: "Specialized chefs preparing wholesome home-style Indian meals, barbecue lawn setups, and high-tea snacks on demand.",
                },
                {
                  icon: Sparkles,
                  title: "Milestone Celebration Setup",
                  desc: "Custom cakes, live acoustic musicians, professional photo/videography, and starlit celebration dinners.",
                },
              ].map((card, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: "#F8FAFC",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-md)",
                    padding: "30px 24px",
                  }}
                >
                  <div
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: "var(--radius-full)",
                      backgroundColor: "rgba(224, 122, 43, 0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 18,
                    }}
                  >
                    <card.icon size={24} style={{ color: "var(--color-accent)" }} />
                  </div>
                  <h3 style={{ fontSize: "1.18rem", color: "var(--color-primary)", fontWeight: 700, marginBottom: 10 }}>
                    {card.title}
                  </h3>
                  <p style={{ color: "var(--color-text-muted)", fontSize: "0.92rem", lineHeight: 1.6 }}>
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. POPULAR GROUP DESTINATIONS */}
      <section className="section" style={{ backgroundColor: "#F7F6F0" }}>
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow" style={{ color: "var(--color-secondary)" }}>
              <Sparkles size={16} />
              <span>Proven Venues</span>
            </div>
            <h2>Preferred Group &amp; Offsite Destinations</h2>
            <p>
              Locations equipped with large-scale 5★ inventory, private conference venues, and thrilling group activities.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 26,
            }}
          >
            {groupDestinations.map((dest) => (
              <div
                key={dest.id}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden",
                  boxShadow: "0 6px 18px rgba(0, 0, 0, 0.05)",
                  border: "1px solid var(--color-border)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ position: "relative", height: 210 }}>
                  <Image
                    src={dest.image}
                    alt={`${dest.name} group travel package`}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 360px"
                    loading="lazy"
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 12,
                      left: 12,
                      backgroundColor: "rgba(18, 49, 58, 0.9)",
                      color: "#FFFFFF",
                      padding: "4px 12px",
                      borderRadius: "var(--radius-full)",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                    }}
                  >
                    Capacity: {dest.capacity}
                  </div>
                </div>

                <div style={{ padding: "22px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <h3 style={{ fontSize: "1.25rem", color: "var(--color-primary)", fontWeight: 700 }}>
                      {dest.name}
                    </h3>
                    <div style={{ textAlign: "right" }}>
                      <span style={{ fontSize: "0.72rem", color: "var(--color-text-muted)", display: "block" }}>From</span>
                      <span style={{ fontSize: "1.15rem", color: "var(--color-primary)", fontWeight: 800 }}>
                        {dest.price}
                      </span>
                      <span style={{ fontSize: "0.7rem", color: "var(--color-text-muted)", display: "block" }}>/ pax</span>
                    </div>
                  </div>

                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px 0", display: "flex", flexDirection: "column", gap: 7 }}>
                    {dest.highlights.map((h, idx) => (
                      <li key={idx} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: "0.85rem", color: "var(--color-text-dark)", lineHeight: 1.45 }}>
                        <CheckCircle2 size={14} style={{ color: "var(--color-secondary)", flexShrink: 0, marginTop: 3 }} />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() =>
                      openEnquiry({
                        destination: dest.name,
                        travelType: "Corporate Group",
                        customContext: `Group Booking: ${dest.name} (${dest.capacity})`,
                      })
                    }
                    className="btn btn-primary"
                    style={{
                      marginTop: "auto",
                      padding: "10px 18px",
                      fontSize: "0.9rem",
                      borderRadius: "var(--radius-sm)",
                      justifyContent: "center",
                    }}
                  >
                    Enquire For Group
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. GROUP TIER CALCULATOR & ENQUIRY ACCORDION */}
      <section className="section section-dark" style={{ backgroundColor: "#12313A", color: "#FFFFFF" }}>
        <div className="container" style={{ maxWidth: 880 }}>
          <div className="section-header">
            <div className="section-eyebrow" style={{ color: "var(--color-accent)" }}>
              <Award size={16} />
              <span>Bulk Privileges</span>
            </div>
            <h2 style={{ color: "#FFFFFF" }}>Volume Benefits Based On Your Pax Size</h2>
            <p style={{ color: "#A3B5BE" }}>
              Select your expected group count to see custom concessions and perks unlocked.
            </p>
          </div>

          {/* Pax Tabs */}
          <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 30, flexWrap: "wrap" }}>
            {[
              { id: "10-25", label: "10 - 25 Pax (Small Team / Reunion)" },
              { id: "25-50", label: "26 - 50 Pax (Mid-Size Offsite)" },
              { id: "50-100", label: "51 - 100+ Pax (Annual Convention)" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setPaxRange(tab.id)}
                style={{
                  padding: "10px 20px",
                  borderRadius: "var(--radius-full)",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  border: "none",
                  backgroundColor: paxRange === tab.id ? "var(--color-accent)" : "rgba(255, 255, 255, 0.1)",
                  color: "#FFFFFF",
                  transition: "all 0.2s ease",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active Pax Details */}
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.06)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "var(--radius-md)",
              padding: "28px 24px",
              marginBottom: 36,
            }}
          >
            {paxRange === "10-25" && (
              <div>
                <h3 style={{ color: "var(--color-accent)", fontSize: "1.25rem", marginBottom: 12 }}>
                  10 to 25 Travelers: Boutique Experience
                </h3>
                <p style={{ color: "#CBD5DA", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: 16 }}>
                  Perfect for senior leadership retreats, startup milestones, or extended family clan vacations.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#FFFFFF", fontSize: "0.9rem" }}>
                    <CheckCircle2 size={16} style={{ color: "var(--color-accent)" }} />
                    <span>Exclusive Private Coach (No shared travel)</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#FFFFFF", fontSize: "0.9rem" }}>
                    <CheckCircle2 size={16} style={{ color: "var(--color-accent)" }} />
                    <span>1 Complimentary Suite Upgrade for Leader</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#FFFFFF", fontSize: "0.9rem" }}>
                    <CheckCircle2 size={16} style={{ color: "var(--color-accent)" }} />
                    <span>Personalized Welcome Dinner Banner</span>
                  </div>
                </div>
              </div>
            )}

            {paxRange === "25-50" && (
              <div>
                <h3 style={{ color: "var(--color-accent)", fontSize: "1.25rem", marginBottom: 12 }}>
                  26 to 50 Travelers: Signature Company Retreat
                </h3>
                <p style={{ color: "#CBD5DA", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: 16 }}>
                  Our most frequent offsite size. Fully catered with dedicated tour manager and customized team activities.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#FFFFFF", fontSize: "0.9rem" }}>
                    <CheckCircle2 size={16} style={{ color: "var(--color-accent)" }} />
                    <span>Dedicated Voyastra On-Ground Tour Manager</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#FFFFFF", fontSize: "0.9rem" }}>
                    <CheckCircle2 size={16} style={{ color: "var(--color-accent)" }} />
                    <span>2 Complimentary Room Upgrades</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#FFFFFF", fontSize: "0.9rem" }}>
                    <CheckCircle2 size={16} style={{ color: "var(--color-accent)" }} />
                    <span>Curated Team Building Facilitator</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#FFFFFF", fontSize: "0.9rem" }}>
                    <CheckCircle2 size={16} style={{ color: "var(--color-accent)" }} />
                    <span>Full GST Tax Input Credit Invoicing</span>
                  </div>
                </div>
              </div>
            )}

            {paxRange === "50-100" && (
              <div>
                <h3 style={{ color: "var(--color-accent)", fontSize: "1.25rem", marginBottom: 12 }}>
                  51 to 100+ Travelers: Enterprise Convention &amp; Gala
                </h3>
                <p style={{ color: "#CBD5DA", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: 16 }}>
                  Full-scale corporate MICE with customized stage lighting, DJ, chartered transfers, and executive hospitality desks.
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#FFFFFF", fontSize: "0.9rem" }}>
                    <CheckCircle2 size={16} style={{ color: "var(--color-accent)" }} />
                    <span>Dual Tour Managers + Airport Helpdesk</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#FFFFFF", fontSize: "0.9rem" }}>
                    <CheckCircle2 size={16} style={{ color: "var(--color-accent)" }} />
                    <span>Custom AV Stage Setup &amp; Professional Sound</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#FFFFFF", fontSize: "0.9rem" }}>
                    <CheckCircle2 size={16} style={{ color: "var(--color-accent)" }} />
                    <span>Wholesale Airline Block Fares</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#FFFFFF", fontSize: "0.9rem" }}>
                    <CheckCircle2 size={16} style={{ color: "var(--color-accent)" }} />
                    <span>Customized Branded Lanyards &amp; Swag Kits</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div style={{ textAlign: "center" }}>
            <button
              onClick={() =>
                openEnquiry({
                  travelType: "Corporate Group",
                  customContext: `Group Booking enquiry for ${paxRange} pax`,
                })
              }
              className="btn btn-primary"
              style={{
                padding: "14px 34px",
                fontSize: "1rem",
                borderRadius: "var(--radius-full)",
              }}
            >
              Get Custom Proposal for {paxRange} Pax
            </button>
          </div>
        </div>
      </section>

      {/* 5. FAQS */}
      <section className="section" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="container" style={{ maxWidth: 840 }}>
          <div className="section-header">
            <h2>Frequently Asked Group &amp; Corporate Questions</h2>
            <p>Details regarding GST invoicing, multi-city flights, and cancellations.</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {groupFaqs.map((faq, idx) => {
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

      {/* 6. HIGH-IMPACT BOTTOM CTA */}
      <section
        style={{
          backgroundColor: "#12313A",
          color: "#FFFFFF",
          padding: "clamp(60px, 8vw, 84px) 0",
          textAlign: "center",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <div className="container" style={{ maxWidth: 760 }}>
          <h2
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "#FFFFFF",
              marginBottom: 16,
            }}
          >
            Planning a Group Event or Offsite?
          </h2>
          <p
            style={{
              fontSize: "1.05rem",
              color: "#CBD5DA",
              marginBottom: 32,
              lineHeight: 1.65,
            }}
          >
            Connect with our Corporate &amp; MICE Desk in Noida. We will prepare an itemized presentation,
            hotel comparison grid, and verified cost breakdown within 6 business hours.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <button
              onClick={() => openEnquiry({ travelType: "Corporate Group" })}
              className="btn btn-primary"
              style={{
                padding: "15px 36px",
                fontSize: "1.05rem",
                borderRadius: "var(--radius-full)",
              }}
            >
              Request Corporate RFP Proposal
            </button>
            <a
              href={`tel:${CLIENT_INFO.phoneRaw}`}
              className="btn"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: "#FFFFFF",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                padding: "15px 30px",
                fontSize: "1.02rem",
                borderRadius: "var(--radius-full)",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Phone size={17} style={{ color: "var(--color-accent)" }} />
              Call {CLIENT_INFO.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
