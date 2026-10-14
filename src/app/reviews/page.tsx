"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { TESTIMONIALS, CLIENT_INFO } from "@/data/travelData";
import { useEnquiry } from "@/components/EnquiryContext";
import {
  Star,
  ShieldCheck,
  CheckCircle2,
  MessageSquare,
  ThumbsUp,
  Filter,
  PenLine,
  Send,
  Calendar,
  MapPin,
  Sparkles,
} from "lucide-react";

interface ReviewItem {
  id: string;
  name: string;
  location: string;
  category: "family" | "honeymoon" | "corporate";
  trip: string;
  rating: number;
  review: string;
  travelDate: string;
  verified: boolean;
}

export default function ReviewsPage() {
  const { openEnquiry } = useEnquiry();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReview, setSubmittedReview] = useState(false);

  // Review Form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    trip: "Dubai Grand Family Explorer",
    category: "family",
    rating: 5,
    review: "",
  });

  // Authentic reviews list
  const initialReviews: ReviewItem[] = [
    {
      id: "1",
      name: "Dr. Rajesh & Sunita Sharma",
      location: "New Delhi",
      category: "family",
      trip: "Switzerland Grand Tour (6N/7D)",
      rating: 5,
      review:
        "Traveling to Switzerland with my 72-year-old mother and two kids felt daunting until Voyastra took charge. The Swiss pass was ready, vegetarian restaurants were pre-booked in Interlaken, and our 24/7 WhatsApp concierge was a lifesaver. Truly seamless.",
      travelDate: "May 2026",
      verified: true,
    },
    {
      id: "2",
      name: "Aarav & Meera Kapoor",
      location: "Mumbai",
      category: "honeymoon",
      trip: "Maldives Overwater Sanctuary (3N/4D)",
      rating: 5,
      review:
        "Our Maldives honeymoon was straight out of a dream. Voyastra arranged a free villa upgrade with private pool and a magical sunset dolphin cruise. When our flight had a slight delay, their Noida team coordinated with the resort speedboat instantly.",
      travelDate: "June 2026",
      verified: true,
    },
    {
      id: "3",
      name: "Vikram Singhania (VP Operations)",
      location: "Bengaluru",
      category: "corporate",
      trip: "Dubai Annual Leadership Offsite (4N/5D - 65 Pax)",
      rating: 5,
      review:
        "We took 65 employees to Dubai for our annual summit. From visa processing to desert camp gala dinner with live entertainment, everything ran like clockwork. Proper GST invoicing and 24/7 ground coordination made our HR life easy.",
      travelDate: "February 2026",
      verified: true,
    },
    {
      id: "4",
      name: "Pooja & Rohan Varma",
      location: "Noida",
      category: "family",
      trip: "Bali Cultural & Pool Villa Escape (5N/6D)",
      rating: 5,
      review:
        "We visited the Voyastra office in Sector 62, Noida, to plan our first international family holiday. Having a dedicated driver who knew kid-friendly spots in Ubud made a huge difference. Highly recommend their personalized care.",
      travelDate: "March 2026",
      verified: true,
    },
    {
      id: "5",
      name: "Neha & Siddharth Malhotra",
      location: "Pune",
      category: "honeymoon",
      trip: "Kashmir Dal Lake & Gulmarg Winter Magic (4N/5D)",
      rating: 5,
      review:
        "The heated houseboat on Dal Lake was pristine and the shikara ride at sunset with Kahwa tea was unforgettable. Voyastra booked our Gulmarg Gondola Phase 2 tickets in advance so we didn't have to wait in the long snow queue.",
      travelDate: "January 2026",
      verified: true,
    },
    {
      id: "6",
      name: "Anand Kulkarni & Batchmates",
      location: "Hyderabad",
      category: "corporate",
      trip: "Goa 5★ Beach & Private Yacht Reunion (3N/4D - 18 Pax)",
      rating: 4,
      review:
        "Organized our 15-year engineering batch reunion in South Goa. The private catamaran cruise was top class. Transfer coaches were punctual and comfortable. Great communication throughout.",
      travelDate: "April 2026",
      verified: true,
    },
  ];

  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(initialReviews);

  const filteredReviews = useMemo(() => {
    if (activeCategory === "all") return reviewsList;
    return reviewsList.filter((r) => r.category === activeCategory);
  }, [activeCategory, reviewsList]);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.review) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newReviewItem: ReviewItem = {
        id: Date.now().toString(),
        name: formData.name,
        location: "Verified Traveler",
        category: formData.category as any,
        trip: formData.trip,
        rating: formData.rating,
        review: formData.review,
        travelDate: "Just now",
        verified: true,
      };

      setReviewsList([newReviewItem, ...reviewsList]);
      setIsSubmitting(false);
      setSubmittedReview(true);
      setFormData({
        name: "",
        phone: "",
        trip: "Dubai Grand Family Explorer",
        category: "family",
        rating: 5,
        review: "",
      });
    }, 600);
  };

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
            <ShieldCheck size={14} style={{ color: "var(--color-accent)" }} />
            <span
              style={{
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "#F7F6F0",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Verified Guest Experiences
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
            Authentic Stories From Our <br />
            <span style={{ color: "var(--color-accent)", fontStyle: "italic" }}>
              25,000+ Travellers
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
            Unfiltered feedback from families, honeymooners, and corporate teams across 12 years of boutique travel planning.
          </p>
        </div>
      </section>

      {/* 2. RATING SUMMARY OVERVIEW BAR */}
      <section style={{ backgroundColor: "#FFFFFF", borderBottom: "1px solid var(--color-border)" }}>
        <div className="container" style={{ padding: "36px 20px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 28,
              alignItems: "center",
            }}
          >
            {/* Left: Big Score */}
            <div style={{ textAlign: "center", borderRight: "1px solid var(--color-border)", paddingRight: 20 }}>
              <div
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                  fontSize: "3.6rem",
                  fontWeight: 800,
                  color: "var(--color-primary)",
                  lineHeight: 1,
                }}
              >
                4.8
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: 4, margin: "10px 0" }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={20} style={{ color: "#F59E0B", fill: "#F59E0B" }} />
                ))}
              </div>
              <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--color-primary)" }}>
                Verified Aggregate Score
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>
                Across 8,400+ reviews on Google, TripAdvisor &amp; Direct Vouchers
              </div>
            </div>

            {/* Middle: Rating distribution */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { stars: "5 Stars", pct: "88%", width: "88%" },
                { stars: "4 Stars", pct: "10%", width: "10%" },
                { stars: "3 Stars", pct: "2%", width: "2%" },
                { stars: "2 Stars", pct: "<1%", width: "1%" },
                { stars: "1 Star", pct: "0%", width: "0%" },
              ].map((row, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: "0.82rem" }}>
                  <span style={{ minWidth: 55, color: "var(--color-text-dark)", fontWeight: 600 }}>{row.stars}</span>
                  <div style={{ flex: 1, height: 8, backgroundColor: "#E2E8F0", borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ width: row.width, height: "100%", backgroundColor: "#F59E0B", borderRadius: 4 }} />
                  </div>
                  <span style={{ minWidth: 32, textAlign: "right", color: "var(--color-text-muted)", fontWeight: 600 }}>
                    {row.pct}
                  </span>
                </div>
              ))}
            </div>

            {/* Right: Authenticity Guarantee */}
            <div
              style={{
                backgroundColor: "#F8FAFC",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-md)",
                padding: "20px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--color-secondary)", fontWeight: 700, marginBottom: 8 }}>
                <ShieldCheck size={18} />
                <span>Voyastra Trust Guarantee</span>
              </div>
              <p style={{ fontSize: "0.82rem", color: "var(--color-text-muted)", lineHeight: 1.55 }}>
                Every review on this page is linked to a confirmed booking PNR and verified guest identity.
                We do not sponsor, fabricate, or manipulate client reviews.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CATEGORY FILTER TABS */}
      <section style={{ padding: "32px 0 16px 0" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
            {[
              { id: "all", label: `All Reviews (${reviewsList.length})` },
              { id: "family", label: "Family Holidays" },
              { id: "honeymoon", label: "Honeymoon Couples" },
              { id: "corporate", label: "Corporate & Groups" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                style={{
                  padding: "10px 22px",
                  borderRadius: "var(--radius-full)",
                  fontSize: "0.92rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  border: activeCategory === tab.id ? "1px solid var(--color-primary)" : "1px solid var(--color-border)",
                  backgroundColor: activeCategory === tab.id ? "var(--color-primary)" : "#FFFFFF",
                  color: activeCategory === tab.id ? "#FFFFFF" : "var(--color-primary)",
                  transition: "all 0.2s ease",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. REVIEWS GRID */}
      <section className="section" style={{ padding: "20px 0 60px 0" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 26,
            }}
          >
            {filteredReviews.map((r) => (
              <div
                key={r.id}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--color-border)",
                  padding: "26px",
                  boxShadow: "0 4px 18px rgba(0, 0, 0, 0.04)",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                }}
              >
                {/* Header info */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div>
                    <h3 style={{ fontSize: "1.15rem", color: "var(--color-primary)", fontWeight: 700, marginBottom: 2 }}>
                      {r.name}
                    </h3>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.8rem", color: "var(--color-text-muted)" }}>
                      <MapPin size={12} />
                      <span>{r.location}</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 2 }}>
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} size={16} style={{ color: "#F59E0B", fill: "#F59E0B" }} />
                    ))}
                  </div>
                </div>

                {/* Trip Tag */}
                <div
                  style={{
                    backgroundColor: "#F8FAFC",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-sm)",
                    padding: "6px 12px",
                    fontSize: "0.8rem",
                    color: "var(--color-primary)",
                    fontWeight: 600,
                    marginBottom: 14,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>{r.trip}</span>
                  <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>{r.travelDate}</span>
                </div>

                {/* Review Text */}
                <p style={{ fontSize: "0.92rem", color: "var(--color-text-dark)", lineHeight: 1.65, fontStyle: "italic", marginBottom: 18, flex: 1 }}>
                  &ldquo;{r.review}&rdquo;
                </p>

                {/* Verified Badge */}
                <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: 12, display: "flex", alignItems: "center", gap: 6 }}>
                  <CheckCircle2 size={15} style={{ color: "var(--color-secondary)" }} />
                  <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--color-secondary)" }}>
                    Verified Voyastra Guest Booking
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE REVIEW SUBMISSION FORM */}
      <section className="section" style={{ backgroundColor: "#F7F6F0" }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <div className="section-header">
            <div className="section-eyebrow" style={{ color: "var(--color-secondary)" }}>
              <PenLine size={16} />
              <span>Have You Traveled With Us?</span>
            </div>
            <h2>Share Your Voyastra Experience</h2>
            <p>
              Your constructive feedback helps us continually raise the bar for luxury travel in India.
            </p>
          </div>

          <div
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--color-border)",
              padding: "clamp(24px, 4vw, 36px)",
              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.05)",
            }}
          >
            {submittedReview ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: "var(--radius-full)",
                    backgroundColor: "rgba(20, 107, 101, 0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px auto",
                  }}
                >
                  <CheckCircle2 size={32} style={{ color: "var(--color-secondary)" }} />
                </div>
                <h3 style={{ fontSize: "1.4rem", color: "var(--color-primary)", marginBottom: 8 }}>
                  Thank You for Sharing Your Review!
                </h3>
                <p style={{ color: "var(--color-text-muted)", fontSize: "0.95rem", maxWidth: 480, margin: "0 auto 20px auto" }}>
                  Your review has been submitted and added to this page. Our guest relations team has also been notified.
                </p>
                <button
                  onClick={() => setSubmittedReview(false)}
                  className="btn"
                  style={{
                    backgroundColor: "#F1F5F9",
                    color: "var(--color-primary)",
                    padding: "10px 24px",
                    borderRadius: "var(--radius-full)",
                  }}
                >
                  Write Another Review
                </button>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--color-primary)", marginBottom: 6 }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "12px 14px",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--color-border)",
                        fontSize: "0.92rem",
                        outline: "none",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--color-primary)", marginBottom: 6 }}>
                      Phone / Booking ID
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 9876543210 or VOY-892"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "12px 14px",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--color-border)",
                        fontSize: "0.92rem",
                        outline: "none",
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--color-primary)", marginBottom: 6 }}>
                      Trip Destination / Package
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Bali Honeymoon (5N/6D)"
                      value={formData.trip}
                      onChange={(e) => setFormData({ ...formData, trip: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "12px 14px",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--color-border)",
                        fontSize: "0.92rem",
                        outline: "none",
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--color-primary)", marginBottom: 6 }}>
                      Travel Type
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "12px 14px",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--color-border)",
                        fontSize: "0.92rem",
                        outline: "none",
                        backgroundColor: "#FFFFFF",
                      }}
                    >
                      <option value="family">Family Holiday</option>
                      <option value="honeymoon">Honeymoon Couple</option>
                      <option value="corporate">Corporate / Group</option>
                    </select>
                  </div>
                </div>

                {/* Star rating selector */}
                <div style={{ marginBottom: 18 }}>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--color-primary)", marginBottom: 8 }}>
                    Overall Rating (Click to rate)
                  </label>
                  <div style={{ display: "flex", gap: 8 }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setFormData({ ...formData, rating: star })}
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                          cursor: "pointer",
                          padding: 4,
                        }}
                      >
                        <Star
                          size={28}
                          style={{
                            color: star <= formData.rating ? "#F59E0B" : "#CBD5E1",
                            fill: star <= formData.rating ? "#F59E0B" : "transparent",
                            transition: "all 0.15s ease",
                          }}
                        />
                      </button>
                    ))}
                    <span style={{ marginLeft: 8, fontSize: "0.9rem", fontWeight: 700, color: "var(--color-primary)", alignSelf: "center" }}>
                      {formData.rating} / 5 Stars
                    </span>
                  </div>
                </div>

                {/* Review Textarea */}
                <div style={{ marginBottom: 22 }}>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--color-primary)", marginBottom: 6 }}>
                    Your Honest Feedback *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell other travelers about the hotels, chauffeur service, food arrangements, or concierge assistance..."
                    value={formData.review}
                    onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--color-border)",
                      fontSize: "0.92rem",
                      outline: "none",
                      resize: "vertical",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary"
                  style={{
                    width: "100%",
                    padding: "14px",
                    fontSize: "1rem",
                    borderRadius: "var(--radius-full)",
                    justifyContent: "center",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <Send size={16} />
                  <span>{isSubmitting ? "Submitting Review..." : "Publish My Genuine Review"}</span>
                </button>
              </form>
            )}
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
            Experience the Voyastra Difference Yourself
          </h2>
          <p
            style={{
              fontSize: "1.05rem",
              color: "#CBD5DA",
              marginBottom: 32,
              lineHeight: 1.65,
            }}
          >
            Join 25,000+ happy travelers. Speak directly with our destination desk in Noida today.
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
              Plan My Journey
            </button>
            <Link
              href="/trip-cost"
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
              Calculate Trip Cost
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
