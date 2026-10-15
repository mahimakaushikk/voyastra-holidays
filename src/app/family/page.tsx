"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DESTINATIONS, CLIENT_INFO } from "@/data/travelData";
import { useEnquiry } from "@/components/EnquiryContext";
import {
  Users,
  ShieldCheck,
  Utensils,
  Clock,
  Car,
  Heart,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Phone,
  MessageSquare,
  Sparkles,
  Luggage,
} from "lucide-react";

export default function FamilyPage() {
  const { openEnquiry } = useEnquiry();
  const [selectedItinerary, setSelectedItinerary] = useState<"dubai" | "bali">("dubai");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Filter destinations that welcome families
  const familyDestinations = DESTINATIONS.filter((d) =>
    d.audience.includes("family")
  );

  const sampleItineraries = {
    dubai: {
      title: "Dubai Magic: 5-Day Grand Family Explorer",
      duration: "4 Nights / 5 Days",
      pax: "2 Adults + 2 Kids / Grandparents",
      days: [
        {
          day: "Day 1",
          title: "Arrival, Dhow Cruise Dinner & Marina Skyline",
          morning: "Private chauffeur airport pickup and check-in to your 4★/5★ family suite near Downtown Dubai.",
          afternoon: "Rest & relaxation. Unhurried unpacking, pool time, and welcome Indian masala tea service.",
          evening: "Luxury 5★ Marina Dhow Cruise with international and 100% pure Indian vegetarian buffet dinner.",
          familyTip: "Ideal for seniors: smooth boarding with zero walking fatigue.",
        },
        {
          day: "Day 2",
          title: "Dubai City Tour, Dubai Frame & Burj Khalifa 124th Floor",
          morning: "Guided panoramic city tour visiting Jumeirah Mosque, Burj Al Arab photo stop, and Dubai Frame.",
          afternoon: "Lunch at Saravanaa Bhavan / Rasoi Ghar (pure vegetarian thali).",
          evening: "Sunset visit to Burj Khalifa 124th floor observation deck followed by the Musical Fountain spectacle.",
          familyTip: "Fast-track elevator tickets included so kids and elderly don't wait in queue.",
        },
        {
          day: "Day 3",
          title: "Family Desert Safari or Atlantis Aquaventure Day",
          morning: "Choice between relaxed morning at Dubai Miracle Garden or splash time at Atlantis Aquaventure waterpark.",
          afternoon: "Return to hotel for a restful siesta before the afternoon desert adventure.",
          evening: "Gentle dune drive in private 4x4, camel riding, henna art, Tanoura dance show, and BBQ dinner.",
          familyTip: "For infants & seniors: gentle dune-bypass route available directly to camp.",
        },
        {
          day: "Day 4",
          title: "Museum of the Future & Gold & Spice Souk Shopping",
          morning: "Interactive exhibits at the world-renowned Museum of the Future — huge hit with children and teens.",
          afternoon: "Traditional Abra boat ride across Dubai Creek to explore Gold Souk and Spice Souk.",
          evening: "Leisure shopping at Dubai Mall with kid-friendly dining and ice rink visit.",
          familyTip: "Chauffeur on call throughout the evening for stress-free mall drop-offs.",
        },
        {
          day: "Day 5",
          title: "Souvenir Shopping & Assisted Airport Departure",
          morning: "Buffet breakfast at hotel, late check-out assistance, and last-minute Meena Bazaar shopping.",
          afternoon: "Private transfer to Dubai International Airport (DXB) with luggage trolley assistance.",
          evening: "Departure flight home with unforgettable family memories.",
          familyTip: "GST tax refund claim guidance provided by our airport representative.",
        },
      ],
    },
    bali: {
      title: "Bali Tropics: 6-Day Cultural & Island Adventure",
      duration: "5 Nights / 6 Days",
      pax: "Multi-Generational Family",
      days: [
        {
          day: "Day 1",
          title: "Warm Balinese Welcome & Private Pool Villa Check-In",
          morning: "Chauffeur arrival pickup with fragrant frangipani flower garlands at Ngurah Rai Airport (DPS).",
          afternoon: "Settle into your interconnected luxury family pool villa in Seminyak or Sanur.",
          evening: "Welcome dinner at Indian restaurant Queen's Tandoor with freshly prepared rotis & daal.",
          familyTip: "Baby cot and adjoining bedroom arranged in advance.",
        },
        {
          day: "Day 2",
          title: "Bali Safari & Marine Park + Gianyar Cultural Shows",
          morning: "Private air-conditioned tram safari through wildlife habitats with lions, zebras, and elephants.",
          afternoon: "Animal show, water play zone for kids, and wholesome lunch inside the safari pavilion.",
          evening: "Scenic sunset drive along Sanur beach promenade with fresh coconut water.",
          familyTip: "Strollers and wheelchairs readily available at the safari park.",
        },
        {
          day: "Day 3",
          title: "Ubud Scenic Landscapes: Rice Terraces, Coffee & Swings",
          morning: "Tegalalang Rice Terraces panoramic viewpoints and family-safe photography spots.",
          afternoon: "Visit Sacred Monkey Forest Sanctuary with private guide ensuring safe distance from monkeys.",
          evening: "Ubud Royal Palace dance performance and authentic Indian dinner in central Ubud.",
          familyTip: "Paved walking pathways chosen specifically for ease of walking.",
        },
        {
          day: "Day 4",
          title: "Kintamani Volcano View & Tirta Empul Holy Springs",
          morning: "Panoramic breakfast overlooking Mount Batur active volcano and tranquil Lake Batur.",
          afternoon: "Tirta Empul water temple cultural blessing experience and local artisan wood carving village.",
          evening: "Relaxed family poolside evening at villa with tropical fruit platter.",
          familyTip: "Cool mountain temperatures at Kintamani — light jacket recommended for seniors.",
        },
        {
          day: "Day 5",
          title: "Water Sports at Nusa Dua & Sunset at Tanah Lot Temple",
          morning: "Glass-bottom boat ride to Turtle Island and gentle banana boat rides for older children.",
          afternoon: "Lunch at Indian Dhaba Nusa Dua with North & South Indian options.",
          evening: "Spectacular ocean sunset at Tanah Lot rock temple with photo opportunities.",
          familyTip: "High-tide safety monitored by private driver.",
        },
        {
          day: "Day 6",
          title: "Handicrafts Souvenir Market & Homeward Departure",
          morning: "Krisna Oleh Oleh handicraft center for authentic Balinese souvenirs and aromatics.",
          afternoon: "Private transfer to airport for scheduled flight to India.",
          evening: "Safe arrival home.",
          familyTip: "Luggage handling support provided by Voyastra team.",
        },
      ],
    },
  };

  const familyFaqs = [
    {
      q: "Can you guarantee 100% Pure Vegetarian and Jain meals during our holiday?",
      a: "Yes, absolutely! As an Indian-founded travel boutique, we inspect and curate partner restaurants at every destination. We guarantee Pure Vegetarian, Jain (no onion, no garlic), and Swaminarayan dining options throughout your itinerary. On day trips, we select Indian restaurants with certified clean kitchens.",
    },
    {
      q: "How do you accommodate senior citizens and grandparents who cannot walk fast?",
      a: "We pace family itineraries with unhurried mornings (starts at 9:30 AM instead of 7:30 AM), include ground-floor or elevator-accessible rooms, provide dedicated private air-conditioned transport, and arrange airport and sightseeing wheelchair assistance whenever requested.",
    },
    {
      q: "Can our family stay together in interconnected or adjoining rooms?",
      a: "Yes. When reserving hotel rooms or private villas, we specifically request adjoining or interconnected rooms so parents can stay right next to children or elderly grandparents without being separated across different floors.",
    },
    {
      q: "Are child car seats and baby cots provided in private vehicles?",
      a: "Yes, infant and child car seats can be added to your private vehicle in Dubai, Switzerland, Bali, and other destinations upon advance request. We also confirm complimentary baby cots at our partner hotels.",
    },
    {
      q: "What happens if a child or elderly traveler falls sick during the trip?",
      a: "Every Voyastra family package comes with 24/7 on-ground concierge support and comprehensive travel medical insurance guidance. Your dedicated trip coordinator can immediately dispatch an English/Hindi speaking doctor to your hotel room or guide you to the nearest accredited medical center.",
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
        {/* Background Image */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Image
            src="/images/family-hero.jpg"
            alt="Multi-generational Indian family enjoying a scenic luxury vacation together"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center 35%" }}
          />
          {/* Dark Overlay for readability */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(18, 49, 58, 0.85) 0%, rgba(18, 49, 58, 0.7) 45%, rgba(10, 28, 34, 0.95) 100%)",
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
            <Users size={15} style={{ color: "var(--color-accent)" }} />
            <span
              style={{
                fontSize: "0.82rem",
                fontWeight: 700,
                color: "#F7F6F0",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Multi-Generational Travel Specialists
            </span>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(2.3rem, 5vw, 4rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              color: "#FFFFFF",
              maxWidth: 900,
              margin: "0 auto 20px auto",
            }}
          >
            Family Vacations Designed for{" "}
            <span style={{ color: "var(--color-accent)", fontStyle: "italic" }}>
              Kids, Parents &amp; Grandparents
            </span>
          </h1>

          <p
            style={{
              fontSize: "clamp(1rem, 1.4vw, 1.2rem)",
              color: "#E2DFD2",
              maxWidth: 720,
              margin: "0 auto 36px auto",
              lineHeight: 1.65,
            }}
          >
            Unhurried itineraries, verified 100% pure vegetarian dining, adjoining luxury family suites,
            and private chauffeur vehicles for the smoothest holiday experience across 60+ destinations.
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
              onClick={() => openEnquiry({ travelType: "Family Vacation" })}
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
              Plan Our Family Holiday
              <ArrowRight size={18} />
            </button>

            <a
              href={`https://wa.me/${CLIENT_INFO.phoneRaw}?text=${encodeURIComponent(
                "Hi Voyastra, I want to discuss a customized family vacation package for our family."
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
              Quick WhatsApp Chat
            </a>
          </div>
        </div>
      </section>

      {/* 2. THE 4 VOYASTRA FAMILY TRAVEL GUARANTEES */}
      <section className="section" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow" style={{ color: "var(--color-secondary)" }}>
              <ShieldCheck size={16} />
              <span>Zero-Stress Travel</span>
            </div>
            <h2>The Four Voyastra Family Guarantees</h2>
            <p>
              We understand the unique dynamics of traveling with children and elderly parents.
              Every family package is crafted with these four non-negotiable promises.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 24,
            }}
          >
            {[
              {
                icon: Utensils,
                color: "#E07A2B",
                title: "100% Pure Veg & Jain Food",
                desc: "Verified Indian restaurants and pre-arranged daily breakfast & dinner options with Jain and vegetarian dietary requirements guaranteed.",
              },
              {
                icon: Clock,
                color: "#146B65",
                title: "Gentle, Unhurried Pacing",
                desc: "No crack-of-dawn alarms or back-to-back 12-hour schedules. Ample afternoon rest time and flexible morning departures for seniors.",
              },
              {
                icon: Heart,
                color: "#D946EF",
                title: "Adjoining Family Suites",
                desc: "Guaranteed interconnected rooms or spacious 2-bedroom private villas so your entire family stays safely together under one roof.",
              },
              {
                icon: Car,
                color: "#0284C7",
                title: "Private Dedicated Transport",
                desc: "Clean, air-conditioned private minivan and dedicated chauffeur exclusively for your family. Zero waiting for shared tour coaches.",
              },
            ].map((guarantee, idx) => (
              <div
                key={idx}
                style={{
                  padding: "32px 24px",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "#F8FAFC",
                  border: "1px solid var(--color-border)",
                  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.04)",
                  transition: "transform 0.25s ease, box-shadow 0.25s ease",
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "var(--radius-full)",
                    backgroundColor: `${guarantee.color}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20,
                  }}
                >
                  <guarantee.icon size={26} style={{ color: guarantee.color }} />
                </div>
                <h3
                  style={{
                    fontSize: "1.2rem",
                    color: "var(--color-primary)",
                    marginBottom: 10,
                    fontWeight: 700,
                  }}
                >
                  {guarantee.title}
                </h3>
                <p style={{ color: "var(--color-text-muted)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                  {guarantee.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CURATED FAMILY HOLIDAY PACKAGES */}
      <section className="section" style={{ backgroundColor: "#F7F6F0" }}>
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow" style={{ color: "var(--color-secondary)" }}>
              <Sparkles size={16} />
              <span>Handpicked Destinations</span>
            </div>
            <h2>Most Loved Family Packages</h2>
            <p>
              Tried and tested itineraries with child-friendly attractions, comfortable flying times,
              and seamless airport assistance from India.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 28,
            }}
          >
            {familyDestinations.map((dest) => (
              <div
                key={dest.id}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden",
                  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.06)",
                  border: "1px solid var(--color-border)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Image */}
                <div style={{ position: "relative", height: 220 }}>
                  <Image
                    src={dest.image}
                    alt={`${dest.name} family holiday package`}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 360px"
                    loading="lazy"
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 14,
                      left: 14,
                      backgroundColor: "rgba(18, 49, 58, 0.85)",
                      color: "#FFFFFF",
                      padding: "4px 12px",
                      borderRadius: "var(--radius-full)",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    {dest.durationNights}N / {dest.durationDays}D
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: 14,
                      right: 14,
                      backgroundColor: "var(--color-accent)",
                      color: "#FFFFFF",
                      padding: "4px 10px",
                      borderRadius: "var(--radius-sm)",
                      fontSize: "0.78rem",
                      fontWeight: 700,
                    }}
                  >
                    Family Rated {dest.rating} ★
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                    <h3 style={{ fontSize: "1.35rem", color: "var(--color-primary)", fontWeight: 700 }}>
                      {dest.name}
                    </h3>
                    <div style={{ textAlign: "right" }}>
                      <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", display: "block" }}>From</span>
                      <span style={{ fontSize: "1.25rem", color: "var(--color-primary)", fontWeight: 800 }}>
                        ₹{dest.startingPrice.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  <p style={{ fontSize: "0.88rem", color: "var(--color-text-muted)", marginBottom: 16 }}>
                    {dest.tagline}
                  </p>

                  <div style={{ marginBottom: 20 }}>
                    <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--color-secondary)", textTransform: "uppercase", display: "block", marginBottom: 8 }}>
                      Family Highlights:
                    </span>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
                      {dest.highlights.slice(0, 3).map((item, idx) => (
                        <li key={idx} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem", color: "var(--color-text-dark)" }}>
                          <CheckCircle2 size={14} style={{ color: "var(--color-secondary)", flexShrink: 0 }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ marginTop: "auto", display: "flex", gap: 10, paddingTop: 16, borderTop: "1px solid var(--color-border)" }}>
                    <button
                      onClick={() => openEnquiry({ destination: dest, travelType: "Family Vacation" })}
                      className="btn btn-primary"
                      style={{
                        flex: 1,
                        padding: "10px 16px",
                        fontSize: "0.88rem",
                        borderRadius: "var(--radius-sm)",
                        justifyContent: "center",
                      }}
                    >
                      Enquire For Family
                    </button>
                    <Link
                      href="/destinations"
                      className="btn"
                      style={{
                        padding: "10px 14px",
                        fontSize: "0.88rem",
                        backgroundColor: "#F1F5F9",
                        color: "var(--color-primary)",
                        borderRadius: "var(--radius-sm)",
                      }}
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE SAMPLE FAMILY ITINERARY */}
      <section className="section section-dark" style={{ backgroundColor: "#12313A", color: "#FFFFFF" }}>
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow" style={{ color: "var(--color-accent)" }}>
              <Calendar size={16} />
              <span>Day-By-Day Blueprint</span>
            </div>
            <h2 style={{ color: "#FFFFFF" }}>Explore Our Balanced Family Itinerary</h2>
            <p style={{ color: "#A3B5BE" }}>
              See how we structure each day so young children stay entertained without tiring out grandparents.
            </p>
          </div>

          {/* Selector Tabs */}
          <div style={{ display: "flex", justifyContent: "center", gap: 14, marginBottom: 36, flexWrap: "wrap" }}>
            <button
              onClick={() => setSelectedItinerary("dubai")}
              style={{
                padding: "12px 24px",
                borderRadius: "var(--radius-full)",
                fontSize: "0.95rem",
                fontWeight: 600,
                cursor: "pointer",
                border: "none",
                backgroundColor: selectedItinerary === "dubai" ? "var(--color-accent)" : "rgba(255, 255, 255, 0.1)",
                color: "#FFFFFF",
                transition: "all 0.2s ease",
              }}
            >
              Dubai: 5-Day Explorer
            </button>
            <button
              onClick={() => setSelectedItinerary("bali")}
              style={{
                padding: "12px 24px",
                borderRadius: "var(--radius-full)",
                fontSize: "0.95rem",
                fontWeight: 600,
                cursor: "pointer",
                border: "none",
                backgroundColor: selectedItinerary === "bali" ? "var(--color-accent)" : "rgba(255, 255, 255, 0.1)",
                color: "#FFFFFF",
                transition: "all 0.2s ease",
              }}
            >
              Bali: 6-Day Cultural Escape
            </button>
          </div>

          {/* Active Itinerary Box */}
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "var(--radius-lg)",
              padding: "clamp(20px, 4vw, 36px)",
              maxWidth: 900,
              margin: "0 auto",
            }}
          >
            <div style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.12)", paddingBottom: 20, marginBottom: 28 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
                <h3 style={{ fontSize: "1.5rem", color: "#FFFFFF", fontWeight: 700 }}>
                  {sampleItineraries[selectedItinerary].title}
                </h3>
                <span
                  style={{
                    backgroundColor: "rgba(224, 122, 43, 0.2)",
                    color: "var(--color-accent)",
                    border: "1px solid rgba(224, 122, 43, 0.4)",
                    padding: "4px 12px",
                    borderRadius: "var(--radius-full)",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                  }}
                >
                  {sampleItineraries[selectedItinerary].duration}
                </span>
              </div>
            </div>

            {/* Days List */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {sampleItineraries[selectedItinerary].days.map((d, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.25)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "var(--radius-md)",
                    padding: "20px 24px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                    <span
                      style={{
                        backgroundColor: "var(--color-secondary)",
                        color: "#FFFFFF",
                        fontSize: "0.8rem",
                        fontWeight: 700,
                        padding: "3px 10px",
                        borderRadius: "var(--radius-sm)",
                      }}
                    >
                      {d.day}
                    </span>
                    <h4 style={{ fontSize: "1.15rem", color: "#FFFFFF", fontWeight: 600 }}>{d.title}</h4>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14, marginBottom: 14, fontSize: "0.88rem" }}>
                    <div>
                      <strong style={{ color: "var(--color-accent)", display: "block", marginBottom: 3 }}>Morning:</strong>
                      <span style={{ color: "#CBD5DA" }}>{d.morning}</span>
                    </div>
                    <div>
                      <strong style={{ color: "var(--color-accent)", display: "block", marginBottom: 3 }}>Afternoon:</strong>
                      <span style={{ color: "#CBD5DA" }}>{d.afternoon}</span>
                    </div>
                    <div>
                      <strong style={{ color: "var(--color-accent)", display: "block", marginBottom: 3 }}>Evening:</strong>
                      <span style={{ color: "#CBD5DA" }}>{d.evening}</span>
                    </div>
                  </div>

                  <div
                    style={{
                      backgroundColor: "rgba(20, 107, 101, 0.2)",
                      borderLeft: "3px solid var(--color-secondary)",
                      padding: "8px 14px",
                      borderRadius: "0 var(--radius-sm) var(--radius-sm) 0",
                      fontSize: "0.82rem",
                      color: "#A3E5DE",
                    }}
                  >
                    <strong>Voyastra Family Tip:</strong> {d.familyTip}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 32, textAlign: "center" }}>
              <button
                onClick={() =>
                  openEnquiry({
                    destination: selectedItinerary === "dubai" ? "Dubai Family Explorer" : "Bali Cultural Family",
                    travelType: "Family Vacation",
                  })
                }
                className="btn btn-primary"
                style={{
                  padding: "14px 34px",
                  fontSize: "1rem",
                  borderRadius: "var(--radius-full)",
                }}
              >
                Customize This Itinerary For Our Family
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. MULTI-GENERATIONAL PACKING & TRAVEL CHECKLIST */}
      <section className="section" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow" style={{ color: "var(--color-secondary)" }}>
              <Luggage size={16} />
              <span>Smart Travel Preparation</span>
            </div>
            <h2>Essential Family Travel Checklist</h2>
            <p>
              Tips from our 12 years of experience organizing vacations for over 25,000 Indian travelers.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
            }}
          >
            {[
              {
                title: "For Seniors & Grandparents",
                items: [
                  "Carry original prescription slips + 3 extra days of regular medicines.",
                  "Request airport wheelchair assistance at time of booking.",
                  "Wear slip-on walking shoes with orthopedic insoles.",
                  "Keep a printed emergency card with blood group and allergies.",
                ],
              },
              {
                title: "For Toddlers & Children",
                items: [
                  "Compact foldable umbrella stroller for airport & theme parks.",
                  "Favorite dry Indian snacks (khakhra, thepla, makhana, biscuits).",
                  "Pediatrician-prescribed fever, cough, and motion sickness syrups.",
                  "Downloaded offline cartoons and quiet activity coloring books.",
                ],
              },
              {
                title: "General Family Documentation",
                items: [
                  "Passports with minimum 6 months validity from return date.",
                  "Soft copies of flight tickets, visas & hotel vouchers saved offline.",
                  "Universal power strip adapter with multiple Indian plug points.",
                  "Active international roaming pack or local eSIM activated on arrival.",
                ],
              },
            ].map((col, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "#F8FAFC",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-md)",
                  padding: "28px 24px",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.15rem",
                    color: "var(--color-primary)",
                    fontWeight: 700,
                    marginBottom: 16,
                    paddingBottom: 10,
                    borderBottom: "2px solid var(--color-accent)",
                  }}
                >
                  {col.title}
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                  {col.items.map((item, itemIdx) => (
                    <li key={itemIdx} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: "0.88rem", color: "var(--color-text-dark)", lineHeight: 1.5 }}>
                      <CheckCircle2 size={16} style={{ color: "var(--color-secondary)", flexShrink: 0, marginTop: 2 }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQS */}
      <section className="section" style={{ backgroundColor: "#F7F6F0" }}>
        <div className="container" style={{ maxWidth: 840 }}>
          <div className="section-header">
            <h2>Frequently Asked Family Travel Questions</h2>
            <p>Honest answers regarding vegetarian food, pacing, and medical safety.</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {familyFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-sm)",
                    overflow: "hidden",
                    transition: "border-color 0.2s ease",
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
            Ready to Gift Your Family an Unforgettable Holiday?
          </h2>
          <p
            style={{
              fontSize: "1.05rem",
              color: "#CBD5DA",
              marginBottom: 32,
              lineHeight: 1.65,
            }}
          >
            Tell us your travel month and traveler count. Our family travel advisory desk in Noida will
            craft a customized proposal with genuine transparent rates in under 4 business hours.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <button
              onClick={() => openEnquiry({ travelType: "Family Vacation" })}
              className="btn btn-primary"
              style={{
                padding: "15px 36px",
                fontSize: "1.05rem",
                borderRadius: "var(--radius-full)",
              }}
            >
              Get Free Family Proposal
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
