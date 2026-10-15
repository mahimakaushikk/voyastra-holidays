"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CLIENT_INFO, DESTINATIONS, FAQS } from "@/data/travelData";
import { Compass, Phone, Mail, MapPin, ChevronDown, ChevronUp, Heart, ArrowRight } from "lucide-react";

export default function Footer() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const navPages = [
    { label: "Destinations Discovery", href: "/destinations" },
    { label: "Family Vacations", href: "/family" },
    { label: "Honeymoon Escapes", href: "/honeymoon" },
    { label: "Group & MICE Holidays", href: "/groups" },
    { label: "Trip Cost Estimator", href: "/trip-cost" },
    { label: "About Voyastra", href: "/about" },
    { label: "Guest Reviews", href: "/reviews" },
  ];

  return (
    <footer style={{ backgroundColor: "#09191E", color: "#FFFFFF", paddingTop: 70, borderTop: "2px solid var(--color-accent)" }}>
      {/* FAQ Section */}
      <div className="container" style={{ marginBottom: 60 }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <span className="badge-tag" style={{ marginBottom: 8 }}>
              Got Questions?
            </span>
            <h3 style={{ color: "#FFFFFF", fontSize: "2rem", marginTop: 8 }}>
              Frequently Asked Questions
            </h3>
            <p style={{ color: "#A3B5BE", fontSize: "0.95rem" }}>
              Everything you need to know about booking your dream vacation with Voyastra.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.q}
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "var(--radius-md)",
                    overflow: "hidden",
                    transition: "all 0.2s ease",
                  }}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    style={{
                      width: "100%",
                      padding: "16px 20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 16,
                      background: "transparent",
                      border: "none",
                      color: "#FFFFFF",
                      textAlign: "left",
                      cursor: "pointer",
                      fontSize: "0.98rem",
                      fontWeight: 600,
                    }}
                  >
                    <span>{faq.q}</span>
                    <span style={{ color: "var(--color-accent)", flexShrink: 0 }}>
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      style={{
                        padding: "0 20px 18px 20px",
                        color: "#E2DFD2",
                        fontSize: "0.9rem",
                        lineHeight: 1.6,
                        borderTop: "1px solid rgba(255, 255, 255, 0.05)",
                        paddingTop: 12,
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
      </div>

      {/* Main Footer Links & Info */}
      <div
        style={{
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          paddingTop: 50,
          paddingBottom: 40,
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
              gap: 36,
              marginBottom: 48,
            }}
          >
            {/* Col 1: Brand & Bio */}
            <div>
              <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 14, textDecoration: "none" }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    backgroundColor: "var(--color-secondary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FFFFFF",
                  }}
                >
                  <Compass size={20} />
                </div>
                <span
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 800,
                    fontFamily: "var(--font-playfair)",
                    color: "#FFFFFF",
                  }}
                >
                  Voyastra
                </span>
                <span style={{ color: "var(--color-accent)", fontSize: "1.2rem" }}>✦</span>
              </Link>

              <p style={{ color: "var(--color-accent)", fontStyle: "italic", fontSize: "0.95rem", marginBottom: 12 }}>
                &ldquo;{CLIENT_INFO.tagline}&rdquo;
              </p>

              <p style={{ color: "#A3B5BE", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: 20 }}>
                India&rsquo;s boutique holiday advisory for families, honeymooners, and corporate teams.
                Crafting memorable international and domestic journeys with an authentic Indian touch.
              </p>

              {/* Social Media Links with SVG */}
              <div style={{ display: "flex", gap: 12 }}>
                <a
                  href={CLIENT_INFO.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Voyastra Instagram"
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FFFFFF",
                    transition: "all 0.2s ease",
                  }}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </a>

                <a
                  href={CLIENT_INFO.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Voyastra Facebook"
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FFFFFF",
                    transition: "all 0.2s ease",
                  }}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>

                <a
                  href={CLIENT_INFO.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Voyastra YouTube"
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FFFFFF",
                    transition: "all 0.2s ease",
                  }}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
                    <polygon points="10 15 15 12 10 9 10 15" fill="currentColor"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Col 2: Quick Links across 7 Pages */}
            <div>
              <h4 style={{ color: "#FFFFFF", fontSize: "1.05rem", marginBottom: 16 }}>
                Explore Voyastra
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {navPages.map((page) => (
                  <li key={page.href}>
                    <Link
                      href={page.href}
                      prefetch={true}
                      style={{
                        color: "#A3B5BE",
                        fontSize: "0.86rem",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#A3B5BE")}
                    >
                      <ArrowRight size={13} style={{ color: "var(--color-accent)" }} />
                      <span>{page.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Featured International & Domestic Packages */}
            <div>
              <h4 style={{ color: "#FFFFFF", fontSize: "1.05rem", marginBottom: 16 }}>
                Featured Packages
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {DESTINATIONS.slice(0, 5).map((d) => (
                  <li key={d.id}>
                    <Link
                      href="/destinations"
                      prefetch={true}
                      style={{
                        color: "#A3B5BE",
                        fontSize: "0.85rem",
                        display: "flex",
                        justifyContent: "space-between",
                        transition: "color 0.2s ease",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#A3B5BE")}
                    >
                      <span>{d.name} ({d.durationNights}N/{d.durationDays}D)</span>
                      <span style={{ color: "#E2DFD2" }}>₹{d.startingPrice.toLocaleString("en-IN")}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Contact & Office */}
            <div>
              <h4 style={{ color: "#FFFFFF", fontSize: "1.05rem", marginBottom: 16 }}>
                Contact &amp; Office
              </h4>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: "0.85rem", color: "#A3B5BE" }}>
                  <MapPin size={16} style={{ color: "var(--color-secondary)", flexShrink: 0, marginTop: 3 }} />
                  <span>{CLIENT_INFO.address}</span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "0.85rem", color: "#A3B5BE" }}>
                  <Phone size={16} style={{ color: "var(--color-accent)", flexShrink: 0 }} />
                  <a href={`tel:${CLIENT_INFO.phoneRaw}`} style={{ color: "#FFFFFF", fontWeight: 600 }}>
                    {CLIENT_INFO.phone}
                  </a>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "0.85rem", color: "#A3B5BE" }}>
                  <Mail size={16} style={{ color: "var(--color-secondary)", flexShrink: 0 }} />
                  <a href={`mailto:${CLIENT_INFO.email}`} style={{ color: "#A3B5BE" }}>
                    {CLIENT_INFO.email}
                  </a>
                </div>

                <div
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                    padding: "10px 12px",
                    borderRadius: "var(--radius-sm)",
                    border: "1px dashed rgba(224, 122, 43, 0.4)",
                    fontSize: "0.78rem",
                    color: "#F7F3E9",
                  }}
                >
                  Bespoke holiday advisory with 100% verified stays, dedicated on-tour coordination, and transparent pricing.
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div
            style={{
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
              paddingTop: 24,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 16,
              fontSize: "0.8rem",
              color: "#A3B5BE",
            }}
          >
            <div>
              © 2026 Voyastra Holidays. All rights reserved. &bull; Made with{" "}
              <Heart size={12} fill="#EF4444" color="#EF4444" style={{ display: "inline" }} /> for Indian
              Travellers.
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
              <span>Registered in Noida, Uttar Pradesh</span>
              <span>100% Verified Stays</span>
              <span>24/7 Dedicated On-Tour Concierge</span>
              <span style={{ opacity: 0.3 }}>&bull;</span>
              <Link
                href="/admin"
                style={{
                  color: "#A3B5BE",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  fontSize: "0.78rem",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#A3B5BE")}
                title="Voyastra Holidays Travel Desk Portal"
              >
                <span>Staff Portal</span>
                <span style={{ fontSize: "0.7rem", opacity: 0.8 }}>🔒</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
