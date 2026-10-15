"use client";

import React from "react";
import Link from "next/link";
import { CLIENT_INFO } from "@/data/travelData";
import { useEnquiry } from "@/components/EnquiryContext";
import {
  Compass,
  Users,
  Globe2,
  Award,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  Sparkles,
  Heart,
  MessageSquare,
} from "lucide-react";

export default function AboutPage() {
  const { openEnquiry } = useEnquiry();

  const milestones = [
    {
      year: "2012",
      title: "Founded in Noida, UP",
      desc: "Started as a boutique bespoke advisory with a single focus: crafting honest, zero-hidden-markup itineraries for Indian families.",
    },
    {
      year: "2016",
      title: "5,000 Travellers & Dubai Desk",
      desc: "Launched our dedicated on-ground concierge in Dubai, securing wholesale partnerships with top 5★ hotel chains.",
    },
    {
      year: "2019",
      title: "Southeast Asia & Bali Expansion",
      desc: "Introduced private villa compounds, verified pure vegetarian catering partners, and fast-track immigration services in Bali & Thailand.",
    },
    {
      year: "2023",
      title: "European Alpine & Swiss Pass Desk",
      desc: "Certified Swiss Travel System specialists enabling scenic train journeys and alpine chalets for over 1,200 Indian families annually.",
    },
    {
      year: "2026",
      title: "25,000+ Journeys Crafted",
      desc: "Celebrating 12 years of excellence with a 4.8★ verified satisfaction score across 60+ domestic and international destinations.",
    },
  ];

  const specialistDesks = [
    {
      name: "Middle East & Dubai Desk",
      highlights: "Direct inventory with Jumeirah, Atlantis, private luxury desert safari camps, and Marina yacht charters.",
      destinations: "Dubai, Abu Dhabi, Oman",
    },
    {
      name: "Southeast Asia & Island Desk",
      highlights: "Curated private pool villas in Ubud & Seminyak, certified Indian culinary kitchen tours, Nusa Penida speedboats.",
      destinations: "Bali, Thailand, Singapore, Vietnam",
    },
    {
      name: "European Alpine Desk",
      highlights: "Swiss Travel Passes, mountain excursions to Jungfraujoch & Titlis, luxury lakefront chalets, and 99% Schengen visa success.",
      destinations: "Switzerland, France, Italy, Austria",
    },
    {
      name: "Incredible India Heritage Desk",
      highlights: "Dal Lake luxury shikaravillas, Gulmarg gondola priority passes, Alleppey private houseboats, and South Goa private beach lawns.",
      destinations: "Kashmir, Kerala, Goa, Rajasthan, Ladakh",
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
              "radial-gradient(circle at 50% 20%, rgba(20, 107, 101, 0.35) 0%, rgba(18, 49, 58, 0.95) 70%, #0A1C22 100%)",
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
            <Compass size={14} style={{ color: "var(--color-accent)" }} />
            <span
              style={{
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "#F7F6F0",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Our Story &amp; Philosophy
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
            Crafting Soulful Journeys <br />
            <span style={{ color: "var(--color-accent)", fontStyle: "italic" }}>
              Since 2012
            </span>
          </h1>

          <p
            style={{
              fontSize: "clamp(1.05rem, 1.4vw, 1.2rem)",
              color: "var(--color-accent)",
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontStyle: "italic",
              marginBottom: 14,
            }}
          >
            &ldquo;{CLIENT_INFO.tagline}&rdquo;
          </p>

          <p
            style={{
              fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)",
              color: "#E2DFD2",
              maxWidth: 680,
              margin: "0 auto 0 auto",
              lineHeight: 1.6,
            }}
          >
            For twelve years, Voyastra Holidays has operated out of Noida, UP, reimagining how Indian families,
            newlyweds, and corporate teams discover the world — with zero tourist traps and honest care.
          </p>
        </div>
      </section>

      {/* 2. STATS BAR */}
      <section style={{ backgroundColor: "#FFFFFF", borderBottom: "1px solid var(--color-border)" }}>
        <div className="container" style={{ padding: "34px 20px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 20,
              textAlign: "center",
            }}
          >
            {CLIENT_INFO.stats.map((s) => (
              <div key={s.id}>
                <div
                  style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                    fontSize: "2.4rem",
                    fontWeight: 800,
                    color: "var(--color-primary)",
                    lineHeight: 1,
                    marginBottom: 6,
                  }}
                >
                  {s.value}
                </div>
                <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--color-secondary)", marginBottom: 2 }}>
                  {s.label}
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>{s.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. OUR STORY & PHILOSOPHY */}
      <section className="section" style={{ backgroundColor: "#F7F6F0" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 40,
              alignItems: "center",
            }}
          >
            <div>
              <div className="section-eyebrow" style={{ color: "var(--color-secondary)", marginBottom: 12 }}>
                <Heart size={16} />
                <span>Why Voyastra Exists</span>
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: "clamp(2rem, 3.5vw, 2.7rem)",
                  color: "var(--color-primary)",
                  marginBottom: 18,
                  lineHeight: 1.25,
                }}
              >
                Travel Should Never Feel Like a Rushed Transaction
              </h2>
              <p style={{ color: "var(--color-text-dark)", fontSize: "1rem", lineHeight: 1.7, marginBottom: 16 }}>
                Too many Indian travelers return from group tours exhausted: rushed through 6 tourist stops before lunch,
                forced into commissioned souvenir shops, and eating substandard food far from city centers.
              </p>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: 24 }}>
                At Voyastra Holidays, we set out to build an antidote. We believe your precious vacation days should be
                unhurried, luxurious, culturally enriching, and deeply personal. We personally vet every hotel, inspect
                kitchen sanitation, audit chauffeur courtesy, and design realistic schedules that give you time to breathe.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  "Zero hidden vendor kickbacks or forced souvenir stopovers",
                  "Dedicated 24/7 on-ground trip manager throughout your trip",
                  "Verified Indian pure veg, Jain & Swaminarayan dining arrangements",
                  "Direct contracts with international luxury resort chains",
                ].map((item, idx) => (
                  <div key={idx} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <CheckCircle2 size={18} style={{ color: "var(--color-secondary)", flexShrink: 0 }} />
                    <span style={{ fontSize: "0.92rem", fontWeight: 600, color: "var(--color-primary)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Card: Philosophy Highlights */}
            <div
              style={{
                backgroundColor: "#12313A",
                color: "#FFFFFF",
                borderRadius: "var(--radius-lg)",
                padding: "clamp(26px, 4vw, 40px)",
                boxShadow: "0 12px 36px rgba(0, 0, 0, 0.12)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: "1.5rem",
                  color: "#FFFFFF",
                  marginBottom: 20,
                  borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
                  paddingBottom: 12,
                }}
              >
                The Voyastra Touch
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div>
                  <h4 style={{ color: "var(--color-accent)", fontSize: "1.05rem", marginBottom: 6 }}>
                    1. Dedicated Destination Desks
                  </h4>
                  <p style={{ color: "#CBD5DA", fontSize: "0.88rem", lineHeight: 1.6 }}>
                    You never speak to a generic call center executive. You speak with a specialist who has personally traveled to the destination.
                  </p>
                </div>

                <div>
                  <h4 style={{ color: "var(--color-accent)", fontSize: "1.05rem", marginBottom: 6 }}>
                    2. Unhurried Pacing
                  </h4>
                  <p style={{ color: "#CBD5DA", fontSize: "0.88rem", lineHeight: 1.6 }}>
                    We refuse to cram 8 sights in 1 day. We curate 2-3 meaningful experiences each day with ample time to swim, shop, and relax.
                  </p>
                </div>

                <div>
                  <h4 style={{ color: "var(--color-accent)", fontSize: "1.05rem", marginBottom: 6 }}>
                    3. Transparent Quotations
                  </h4>
                  <p style={{ color: "#CBD5DA", fontSize: "0.88rem", lineHeight: 1.6 }}>
                    Every quotation breaks down your hotel taxes, private car allowances, guide fees, and 5% GST. No unexpected on-trip demands.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SPECIALIST DESTINATION DESKS */}
      <section className="section" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow" style={{ color: "var(--color-secondary)" }}>
              <Globe2 size={16} />
              <span>Deep Domain Expertise</span>
            </div>
            <h2>Our Specialized Destination Desks</h2>
            <p>
              Each desk is led by senior travel planners with years of boots-on-the-ground contracting experience.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
            }}
          >
            {specialistDesks.map((desk, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "#F8FAFC",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-md)",
                  padding: "28px 24px",
                }}
              >
                <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--color-accent)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
                  {desk.destinations}
                </div>
                <h3 style={{ fontSize: "1.2rem", color: "var(--color-primary)", fontWeight: 700, marginBottom: 12 }}>
                  {desk.name}
                </h3>
                <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: 16 }}>
                  {desk.highlights}
                </p>
                <button
                  onClick={() => openEnquiry({ travelType: "Family Vacation", customContext: `Enquiry for ${desk.name}` })}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    color: "var(--color-secondary)",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  Consult Specialist Desk
                  <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 12-YEAR COMPANY TIMELINE */}
      <section className="section section-dark" style={{ backgroundColor: "#12313A", color: "#FFFFFF" }}>
        <div className="container" style={{ maxWidth: 840 }}>
          <div className="section-header">
            <div className="section-eyebrow" style={{ color: "var(--color-accent)" }}>
              <Award size={16} />
              <span>12 Years in Motion</span>
            </div>
            <h2 style={{ color: "#FFFFFF" }}>Milestones on Our Journey</h2>
            <p style={{ color: "#A3B5BE" }}>
              From our first client in Noida to a nationwide community of 25,000+ discerning travelers.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {milestones.map((m, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  gap: 20,
                  alignItems: "flex-start",
                  backgroundColor: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "var(--radius-md)",
                  padding: "20px 24px",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: "var(--color-accent)",
                    minWidth: 70,
                  }}
                >
                  {m.year}
                </div>
                <div>
                  <h3 style={{ fontSize: "1.15rem", color: "#FFFFFF", fontWeight: 700, marginBottom: 6 }}>
                    {m.title}
                  </h3>
                  <p style={{ fontSize: "0.9rem", color: "#CBD5DA", lineHeight: 1.6 }}>
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. VERIFIED OFFICE LOCATION & REACH US */}
      <section className="section" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="container" style={{ maxWidth: 880 }}>
          <div className="section-header">
            <div className="section-eyebrow" style={{ color: "var(--color-secondary)" }}>
              <MapPin size={16} />
              <span>Genuine Corporate Presence</span>
            </div>
            <h2>Visit or Connect With Our Headquarters</h2>
            <p>
              We welcome clients for in-person holiday planning sessions over freshly brewed coffee at our Noida office.
            </p>
          </div>

          <div
            style={{
              backgroundColor: "#F8FAFC",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-lg)",
              padding: "clamp(24px, 4vw, 36px)",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 28,
            }}
          >
            <div>
              <h3 style={{ fontSize: "1.25rem", color: "var(--color-primary)", fontWeight: 700, marginBottom: 14 }}>
                {CLIENT_INFO.companyName}
              </h3>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12, fontSize: "0.92rem", color: "var(--color-text-dark)" }}>
                <MapPin size={18} style={{ color: "var(--color-accent)", flexShrink: 0, marginTop: 2 }} />
                <span>{CLIENT_INFO.address}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, fontSize: "0.92rem", color: "var(--color-text-dark)" }}>
                <Clock size={18} style={{ color: "var(--color-accent)", flexShrink: 0 }} />
                <span>Monday – Saturday: 9:30 AM – 7:30 PM IST</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, fontSize: "0.92rem", color: "var(--color-text-dark)" }}>
                <Phone size={18} style={{ color: "var(--color-accent)", flexShrink: 0 }} />
                <a href={`tel:${CLIENT_INFO.phoneRaw}`} style={{ color: "var(--color-primary)", fontWeight: 600 }}>
                  {CLIENT_INFO.phone}
                </a>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "0.92rem", color: "var(--color-text-dark)" }}>
                <Mail size={18} style={{ color: "var(--color-accent)", flexShrink: 0 }} />
                <a href={`mailto:${CLIENT_INFO.email}`} style={{ color: "var(--color-primary)", fontWeight: 600 }}>
                  {CLIENT_INFO.email}
                </a>
              </div>
            </div>

            <div
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <h4 style={{ fontSize: "1.1rem", color: "var(--color-primary)", fontWeight: 700, marginBottom: 8 }}>
                Schedule an In-Person Consultation
              </h4>
              <p style={{ fontSize: "0.88rem", color: "var(--color-text-muted)", marginBottom: 18 }}>
                Visiting us in Sector 62, Noida? Let us know in advance so our destination specialist can have itineraries and tea ready.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <button
                  onClick={() => openEnquiry({ travelType: "Family Vacation", customContext: "In-Person Office Visit Consultation" })}
                  className="btn btn-primary"
                  style={{
                    padding: "11px",
                    borderRadius: "var(--radius-full)",
                    justifyContent: "center",
                    fontSize: "0.92rem",
                  }}
                >
                  Book In-Person Appointment
                </button>
                <a
                  href={`https://wa.me/${CLIENT_INFO.phoneRaw}?text=${encodeURIComponent("Hi Voyastra, I would like to schedule an in-person meeting at your Noida office.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                  style={{
                    padding: "10px",
                    borderRadius: "var(--radius-full)",
                    backgroundColor: "#F1F5F9",
                    color: "var(--color-primary)",
                    justifyContent: "center",
                    fontSize: "0.9rem",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <MessageSquare size={15} style={{ color: "#25D366" }} />
                  WhatsApp Concierge
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. HIGH-IMPACT BOTTOM CTA */}
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
            Ready to Travel in Genuine Style?
          </h2>
          <p
            style={{
              fontSize: "1.05rem",
              color: "#CBD5DA",
              marginBottom: 32,
              lineHeight: 1.65,
            }}
          >
            Let our senior travel designers craft a bespoke vacation proposal with transparent rates and heartfelt care.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <button
              onClick={() => openEnquiry()}
              className="btn btn-primary"
              style={{
                padding: "15px 36px",
                fontSize: "1.05rem",
                borderRadius: "var(--radius-full)",
              }}
            >
              Start Planning Your Journey
            </button>
            <Link
              href="/destinations"
              className="btn"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: "#FFFFFF",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                padding: "15px 30px",
                fontSize: "1.02rem",
                borderRadius: "var(--radius-full)",
              }}
            >
              Browse Destinations
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
