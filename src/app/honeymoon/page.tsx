"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DESTINATIONS, CLIENT_INFO } from "@/data/travelData";
import { useEnquiry } from "@/components/EnquiryContext";
import {
  Heart,
  Sparkles,
  Wine,
  Camera,
  Sun,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Phone,
  MessageSquare,
  Plane,
  Compass,
} from "lucide-react";

export default function HoneymoonPage() {
  const { openEnquiry } = useEnquiry();
  const [selectedItinerary, setSelectedItinerary] = useState<"maldives" | "bali">("maldives");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Filter honeymoon destinations
  const honeymoonDestinations = DESTINATIONS.filter((d) =>
    d.audience.includes("honeymoon")
  );

  const romanticItineraries = {
    maldives: {
      title: "Maldives Overwater Bliss: 4-Day Ultra-Luxury Romance",
      duration: "3 Nights / 4 Days",
      accommodation: "Overwater Villa with Private Ocean Deck",
      days: [
        {
          day: "Day 1",
          title: "Scenic Seaplane Arrival & Overwater Villa Check-In",
          morning: "Private seaplane transfer flying over azure atolls to your 5★ private island resort.",
          afternoon: "Check-in to your glass-floor overwater villa with chilled champagne/sparkling cider and celebration cake.",
          evening: "Stroll along the bioluminescent beach followed by a relaxed oceanfront candlelight buffet.",
          highlight: "Complimentary honeymoon bed decoration with fresh orchid petals.",
        },
        {
          day: "Day 2",
          title: "Floating Breakfast & Coral Reef Snorkeling Safari",
          morning: "Signature floating tropical breakfast delivered directly to your overwater plunge pool.",
          afternoon: "Guided couple snorkeling excursion to see sea turtles, manta rays, and vibrant reef fish.",
          evening: "Private couple sunset catamaran cruise with mocktails and panoramic horizon views.",
          highlight: "Professional resort photographer session with 5 complimentary digital photos.",
        },
        {
          day: "Day 3",
          title: "Overwater Spa Ritual & Private Sandbank Candlelight Dinner",
          morning: "90-minute couples aromatic balneotherapy massage in an overwater glass-bottom spa pavilion.",
          afternoon: "Leisure paddleboarding, kayak exploration, or basking under shaded cabana daybeds.",
          evening: "Exclusive 5-course private dinner set up on a secluded private sandbank surrounded by lantern flames.",
          highlight: "Dedicated private butler catering exclusively to you two.",
        },
        {
          day: "Day 4",
          title: "Sunrise Lagoon Dip & Scenic Seaplane Return",
          morning: "Early sunrise swim in crystalline waters right from your villa's private ocean stairs.",
          afternoon: "Gourmet lunch at the underwater or ocean-view restaurant before checkout.",
          evening: "Seaplane return transfer to Velana International Airport (MLE) for flight to India.",
          highlight: "Luggage express check-in arranged by island concierge.",
        },
      ],
    },
    bali: {
      title: "Bali Eternal Romance: 5-Day Ubud Jungle & Seminyak Coast",
      duration: "4 Nights / 5 Days",
      accommodation: "2N Rainforest Pool Villa (Ubud) + 2N Oceanview Suite (Seminyak)",
      days: [
        {
          day: "Day 1",
          title: "Warm Frangipani Welcome & Ubud Jungle Villa Retreat",
          morning: "Arrive at Denpasar Airport with VIP fast-track assistance and private luxury chauffeur transfer.",
          afternoon: "Check in to a secluded private pool villa in Ubud surrounded by lush tropical rainforest valleys.",
          evening: "Welcome Balinese herbal tea, romantic rose-petal bathtub ritual, and quiet villa dinner.",
          highlight: "100% complete privacy with zero disturbance.",
        },
        {
          day: "Day 2",
          title: "Tegalalang Valley Couple Swings & Royal Spa Treatment",
          morning: "Early romantic photo session at the famous Bali jungle couple swing overlooking mist-covered rice terraces.",
          afternoon: "Authentic 2-hour Balinese couple massage with warm coconut oil and botanical flower bath.",
          evening: "Gourmet dining at a riverside candle-lit bamboo restaurant overlooking the Ayung River.",
          highlight: "Private air-conditioned car and photographer driver all day.",
        },
        {
          day: "Day 3",
          title: "Scenic Transfer to Seminyak Coast & Beach Club Sunset",
          morning: "Leisure breakfast in your villa garden before scenic transfer towards southern coastal beaches.",
          afternoon: "Check in to 5★ Seminyak beach resort. Relax by the infinity pool with ocean breeze.",
          evening: "VIP reserved sunset daybed at iconic beach club with music, craft cocktails, and sunset skies.",
          highlight: "Priority table reservation arranged by Voyastra.",
        },
        {
          day: "Day 4",
          title: "Nusa Penida Island Catamaran Cruise & Broken Beach",
          morning: "Private speedboat excursion to Nusa Penida island; visit iconic Kelingking 'T-Rex' cliff viewpoint.",
          afternoon: "Snorkel in Crystal Bay waters with colorful tropical marine life. Fresh seaside seafood/veg lunch.",
          evening: "Romantic beachside candlelit seafood or pure vegetarian barbeque dinner right on the sand.",
          highlight: "Heart-shaped candle setup and personalized message card.",
        },
        {
          day: "Day 5",
          title: "Spa Relaxation & Sweet Souvenir Shopping",
          morning: "Unhurried buffet breakfast and souvenir shopping for Balinese organic coffees and artisan silver.",
          afternoon: "Assisted airport transfer for comfortable evening flight back to India.",
          evening: "Cherish the start of a lifetime together.",
          highlight: "Honeymoon photo memories album gifted by Voyastra.",
        },
      ],
    },
  };

  const honeymoonFaqs = [
    {
      q: "Can newly married couples travel if the bride's passport still has her maiden name?",
      a: "Yes, 100%! You do not need to update your passport immediately after marriage. As long as the name on your flight ticket matches your passport exactly, you can travel seamlessly. We always advise newlywed couples to book tickets in the exact maiden name printed on the valid passport.",
    },
    {
      q: "Which international honeymoon destinations offer easy or Visa-on-Arrival for Indians?",
      a: "The Maldives offers free 30-day Visa-on-Arrival for Indian passport holders with zero visa fees. Bali (Indonesia) and Thailand both offer quick Visa-on-Arrival (or fast eVisa). For Switzerland and Europe, our visa desk handles complete Schengen appointment booking and documentation with a 99% approval track record.",
    },
    {
      q: "What complimentary honeymoon perks are included in Voyastra packages?",
      a: "Depending on your selected resort and destination, we arrange complimentary floral bed decoration, arrival celebration cake, a bottle of sparkling wine or cider, romantic candlelight dinner setups, and complimentary couple spa vouchers.",
    },
    {
      q: "Can we customize our itinerary with extra days or surprise romantic moments?",
      a: "Yes! Every Voyastra honeymoon package is completely bespoke. You can add private helicopter tours, yacht charters, photoshoot sessions, floating breakfasts, or upgrade to overwater sunset villas at exclusive negotiated rates.",
    },
    {
      q: "Do you cater to dietary preferences like Pure Vegetarian, Jain, or Halal during honeymoons?",
      a: "Absolutely. We personally coordinate with resort executive chefs in the Maldives, Bali, Switzerland, and Dubai to ensure verified vegetarian and Jain culinary arrangements are prioritized for every meal.",
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
            src="/images/honeymoon-hero.jpg"
            alt="Romantic Indian couple enjoying a sunset over luxury beach overwater villas"
            fill
            priority
            style={{ objectFit: "cover", objectPosition: "center 40%" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(18, 49, 58, 0.85) 0%, rgba(18, 49, 58, 0.65) 50%, rgba(10, 28, 34, 0.95) 100%)",
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
            <Heart size={15} style={{ color: "var(--color-accent)", fill: "var(--color-accent)" }} />
            <span
              style={{
                fontSize: "0.82rem",
                fontWeight: 700,
                color: "#F7F6F0",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Curated Luxury Honeymoons
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
            Begin Your Forever in{" "}
            <span style={{ color: "var(--color-accent)", fontStyle: "italic" }}>
              Unhurried Romantic Luxury
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
            Private pool villas, sunset beach candlelight dinners, couple spa rituals, and seamless
            flight &amp; visa coordination tailored for newlyweds across the world&apos;s most romantic havens.
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
              onClick={() => openEnquiry({ travelType: "Honeymoon Couple" })}
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
              Design Our Honeymoon
              <ArrowRight size={18} />
            </button>

            <a
              href={`https://wa.me/${CLIENT_INFO.phoneRaw}?text=${encodeURIComponent(
                "Hi Voyastra, we are planning our honeymoon and would love to see curated packages and romantic inclusions."
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
              Honeymoon Specialist on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* 2. SIGNATURE COMPLIMENTARY HONEYMOON PERKS */}
      <section className="section" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow" style={{ color: "var(--color-secondary)" }}>
              <Sparkles size={16} />
              <span>Complimentary Inclusions</span>
            </div>
            <h2>Signature Voyastra Honeymoon Perks</h2>
            <p>
              We celebrate your new chapter with handpicked romantic touches arranged directly
              with our luxury hospitality partners at no added surcharge.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 22,
            }}
          >
            {[
              {
                icon: Wine,
                color: "#E07A2B",
                title: "Private Candlelight Dinner",
                desc: "Secluded beachfront or private terrace table set with lanterns, floral arrangements, and personalized celebratory menu.",
              },
              {
                icon: Sun,
                color: "#146B65",
                title: "Overwater or Pool Villa Upgrade",
                desc: "Wake up to endless turquoise waters or secluded tropical rainforest pools with complete privacy.",
              },
              {
                icon: Heart,
                color: "#E11D48",
                title: "Couple Spa & Wellness Ritual",
                desc: "Aromatherapy couples massage and rejuvenating flower petal hydrotherapy baths designed for deep relaxation.",
              },
              {
                icon: Camera,
                color: "#8B5CF6",
                title: "Bed Turndown & Celebration Cake",
                desc: "Complimentary floral honeymoon bed decorations, celebration cake on arrival, and tropical fruit basket.",
              },
            ].map((perk, idx) => (
              <div
                key={idx}
                style={{
                  padding: "30px 22px",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "#F8FAFC",
                  border: "1px solid var(--color-border)",
                  boxShadow: "0 4px 14px rgba(0, 0, 0, 0.03)",
                }}
              >
                <div
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: "var(--radius-full)",
                    backgroundColor: `${perk.color}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 18,
                  }}
                >
                  <perk.icon size={24} style={{ color: perk.color }} />
                </div>
                <h3
                  style={{
                    fontSize: "1.15rem",
                    color: "var(--color-primary)",
                    marginBottom: 10,
                    fontWeight: 700,
                  }}
                >
                  {perk.title}
                </h3>
                <p style={{ color: "var(--color-text-muted)", fontSize: "0.92rem", lineHeight: 1.6 }}>
                  {perk.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CURATED ROMANTIC DESTINATIONS */}
      <section className="section" style={{ backgroundColor: "#F7F6F0" }}>
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow" style={{ color: "var(--color-secondary)" }}>
              <Compass size={16} />
              <span>Timeless Escapes</span>
            </div>
            <h2>Most Enchanting Honeymoon Destinations</h2>
            <p>
              From tropical private island atolls to snowy Swiss alpine peaks and Kashmir shikaravillas.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 28,
            }}
          >
            {honeymoonDestinations.map((dest) => (
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
                    alt={`${dest.name} romantic honeymoon package`}
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
                      backgroundColor: "#E07A2B",
                      color: "#FFFFFF",
                      padding: "4px 10px",
                      borderRadius: "var(--radius-sm)",
                      fontSize: "0.78rem",
                      fontWeight: 700,
                    }}
                  >
                    Honeymoon Choice ★ {dest.rating}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                    <div>
                      <h3 style={{ fontSize: "1.35rem", color: "var(--color-primary)", fontWeight: 700 }}>
                        {dest.name}
                      </h3>
                      <span style={{ fontSize: "0.82rem", color: "var(--color-text-muted)" }}>{dest.country}</span>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", display: "block" }}>From</span>
                      <span style={{ fontSize: "1.25rem", color: "var(--color-primary)", fontWeight: 800 }}>
                        ₹{dest.startingPrice.toLocaleString("en-IN")}
                      </span>
                      <span style={{ fontSize: "0.72rem", color: "var(--color-text-muted)", display: "block" }}>per couple base</span>
                    </div>
                  </div>

                  <p style={{ fontSize: "0.88rem", color: "var(--color-text-muted)", marginBottom: 16 }}>
                    {dest.tagline}
                  </p>

                  <div style={{ marginBottom: 18 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.82rem", color: "var(--color-secondary)", marginBottom: 10, fontWeight: 600 }}>
                      <Plane size={14} />
                      <span>Flight from Delhi: {dest.flightHoursFromDelhi}</span>
                    </div>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
                      {dest.highlights.slice(0, 3).map((item, idx) => (
                        <li key={idx} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.85rem", color: "var(--color-text-dark)" }}>
                          <CheckCircle2 size={14} style={{ color: "var(--color-accent)", flexShrink: 0 }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ marginTop: "auto", display: "flex", gap: 10, paddingTop: 16, borderTop: "1px solid var(--color-border)" }}>
                    <button
                      onClick={() => openEnquiry({ destination: dest, travelType: "Honeymoon Couple" })}
                      className="btn btn-primary"
                      style={{
                        flex: 1,
                        padding: "10px 16px",
                        fontSize: "0.88rem",
                        borderRadius: "var(--radius-sm)",
                        justifyContent: "center",
                      }}
                    >
                      Enquire For Couple
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

      {/* 4. SAMPLE ROMANTIC ITINERARY SHOWCASE */}
      <section className="section section-dark" style={{ backgroundColor: "#12313A", color: "#FFFFFF" }}>
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow" style={{ color: "var(--color-accent)" }}>
              <Calendar size={16} />
              <span>Romantic Masterpiece</span>
            </div>
            <h2 style={{ color: "#FFFFFF" }}>Sample Honeymoon Journey Day-by-Day</h2>
            <p style={{ color: "#A3B5BE" }}>
              Tailored with unhurried mornings, exclusive couple privacy, and romantic experiences.
            </p>
          </div>

          {/* Selector Tabs */}
          <div style={{ display: "flex", justifyContent: "center", gap: 14, marginBottom: 36, flexWrap: "wrap" }}>
            <button
              onClick={() => setSelectedItinerary("maldives")}
              style={{
                padding: "12px 24px",
                borderRadius: "var(--radius-full)",
                fontSize: "0.95rem",
                fontWeight: 600,
                cursor: "pointer",
                border: "none",
                backgroundColor: selectedItinerary === "maldives" ? "var(--color-accent)" : "rgba(255, 255, 255, 0.1)",
                color: "#FFFFFF",
                transition: "all 0.2s ease",
              }}
            >
              Maldives: 4-Day Lagoon Luxury
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
              Bali: 5-Day Jungle &amp; Ocean Romance
            </button>
          </div>

          {/* Active Box */}
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
                <div>
                  <h3 style={{ fontSize: "1.5rem", color: "#FFFFFF", fontWeight: 700, marginBottom: 4 }}>
                    {romanticItineraries[selectedItinerary].title}
                  </h3>
                  <span style={{ fontSize: "0.85rem", color: "var(--color-accent)" }}>
                    {romanticItineraries[selectedItinerary].accommodation}
                  </span>
                </div>
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
                  {romanticItineraries[selectedItinerary].duration}
                </span>
              </div>
            </div>

            {/* Days List */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {romanticItineraries[selectedItinerary].days.map((d, idx) => (
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
                        backgroundColor: "#E07A2B",
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
                      backgroundColor: "rgba(224, 122, 43, 0.15)",
                      borderLeft: "3px solid var(--color-accent)",
                      padding: "8px 14px",
                      borderRadius: "0 var(--radius-sm) var(--radius-sm) 0",
                      fontSize: "0.82rem",
                      color: "#FED7AA",
                    }}
                  >
                    <strong>Romantic Honeymoon Highlight:</strong> {d.highlight}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 32, textAlign: "center" }}>
              <button
                onClick={() =>
                  openEnquiry({
                    destination: selectedItinerary === "maldives" ? "Maldives Overwater Luxury" : "Bali Romance Escape",
                    travelType: "Honeymoon Couple",
                  })
                }
                className="btn btn-primary"
                style={{
                  padding: "14px 34px",
                  fontSize: "1rem",
                  borderRadius: "var(--radius-full)",
                }}
              >
                Customize This Honeymoon With Private Perks
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. NEWLYWED TRAVEL & VISA ADVISORY */}
      <section className="section" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow" style={{ color: "var(--color-secondary)" }}>
              <ShieldCheck size={16} />
              <span>Expert Advisory</span>
            </div>
            <h2>Newlywed Travel, Visa &amp; Documentation Advisory</h2>
            <p>
              Smooth travel tips to avoid common passport, surname, and visa hurdles right after your wedding.
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
                title: "Passport Surname Advice",
                desc: "You DO NOT need to alter maiden names immediately on passports or marriage certificates. Simply ensure the ticket name matches your current valid passport letter-for-letter.",
              },
              {
                title: "Instant Visa-Free Destinations",
                desc: "Maldives offers 30-day free Visa-on-Arrival. Bali offers instant online e-VoA or counter VoA. Thailand offers seamless entry without lengthy consulate queues.",
              },
              {
                title: "Bespoke Couple Surprises",
                desc: "Want to surprise your partner with private yacht dinners, seaplane photo tours, or hidden champagne celebrations? Our concierge coordinates surprise deliveries confidentially.",
              },
            ].map((card, idx) => (
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
                    marginBottom: 12,
                    paddingBottom: 8,
                    borderBottom: "2px solid var(--color-accent)",
                  }}
                >
                  {card.title}
                </h3>
                <p style={{ color: "var(--color-text-muted)", fontSize: "0.92rem", lineHeight: 1.65 }}>
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQS */}
      <section className="section" style={{ backgroundColor: "#F7F6F0" }}>
        <div className="container" style={{ maxWidth: 840 }}>
          <div className="section-header">
            <h2>Frequently Asked Honeymoon Questions</h2>
            <p>Clear, verified answers for newlywed Indian couples.</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {honeymoonFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  style={{
                    backgroundColor: "#FFFFFF",
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
            Let&apos;s Design Your Dream Honeymoon Together
          </h2>
          <p
            style={{
              fontSize: "1.05rem",
              color: "#CBD5DA",
              marginBottom: 32,
              lineHeight: 1.65,
            }}
          >
            Tell us your travel window and romantic vision. Our dedicated honeymoon desk in Noida
            will prepare a customized proposal with confirmed complimentary perks within 4 business hours.
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <button
              onClick={() => openEnquiry({ travelType: "Honeymoon Couple" })}
              className="btn btn-primary"
              style={{
                padding: "15px 36px",
                fontSize: "1.05rem",
                borderRadius: "var(--radius-full)",
              }}
            >
              Get Free Honeymoon Quote
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
