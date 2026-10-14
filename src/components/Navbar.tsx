"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CLIENT_INFO } from "@/data/travelData";
import { useEnquiry } from "@/components/EnquiryContext";
import { Phone, Compass, Menu, X, ArrowRight } from "lucide-react";

interface NavbarProps {
  onOpenEnquiry?: () => void;
  onSelectPersona?: (personaId: string) => void;
}

export default function Navbar({ onOpenEnquiry, onSelectPersona }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Try using EnquiryContext fallback if direct prop is omitted
  let contextEnquiry: (() => void) | undefined;
  try {
    const { openEnquiry } = useEnquiry();
    contextEnquiry = () => openEnquiry();
  } catch (e) {
    // Context might not be available during isolated unit tests
  }

  const handleEnquiryClick = () => {
    if (onOpenEnquiry) {
      onOpenEnquiry();
    } else if (contextEnquiry) {
      contextEnquiry();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Destinations", href: "/destinations" },
    { label: "Family", href: "/family", personaId: "family" },
    { label: "Honeymoon", href: "/honeymoon", personaId: "honeymoon" },
    { label: "Groups", href: "/groups", personaId: "corporate" },
    { label: "Trip Cost", href: "/trip-cost" },
    { label: "About Us", href: "/about" },
    { label: "Reviews", href: "/reviews" },
  ];

  const handleLinkClick = (link: { href: string; personaId?: string }) => {
    setIsMobileMenuOpen(false);
    if (link.personaId && onSelectPersona) {
      onSelectPersona(link.personaId);
    }
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        backgroundColor: isScrolled ? "rgba(18, 49, 58, 0.98)" : "rgba(18, 49, 58, 0.92)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        transition: "all var(--transition-normal)",
        boxShadow: isScrolled ? "0 8px 24px rgba(0, 0, 0, 0.25)" : "none",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 66,
        }}
      >
        {/* Brand Logo - Links to Homepage */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            flexShrink: 0,
          }}
          onClick={() => setIsMobileMenuOpen(false)}
        >
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
              flexShrink: 0,
            }}
          >
            <Compass size={20} style={{ transform: "rotate(-15deg)" }} />
          </div>

          <div>
            <div
              style={{
                fontSize: "1.45rem",
                fontWeight: 800,
                color: "#FFFFFF",
                fontFamily: "var(--font-playfair)",
                letterSpacing: "0.01em",
                lineHeight: 1,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <span>Voyastra</span>
              <span style={{ color: "var(--color-accent)", fontSize: "1.1rem" }}>✦</span>
            </div>
            <div
              style={{
                fontSize: "0.64rem",
                color: "var(--color-accent)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginTop: 2,
                fontWeight: 600,
              }}
            >
              Holidays
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: "none",
            alignItems: "center",
            gap: 18,
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                prefetch={true}
                onClick={() => handleLinkClick(link)}
                style={{
                  color: isActive ? "var(--color-accent)" : "#F7F6F0",
                  fontSize: "0.88rem",
                  fontWeight: isActive ? 700 : 500,
                  whiteSpace: "nowrap",
                  transition: "all 0.2s ease",
                  position: "relative",
                  padding: "4px 0",
                  borderBottom: isActive ? "2px solid var(--color-accent)" : "2px solid transparent",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.color = "var(--color-accent)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = "#F7F6F0";
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Section: Primary Plan Trip Button -> Phone at Far Right -> Mobile Hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          {/* Primary High-Contrast Plan My Trip Button */}
          <button
            onClick={handleEnquiryClick}
            className="btn btn-accent btn-sm navbar-cta-btn"
            style={{ fontWeight: 700, padding: "8px 18px", fontSize: "0.88rem" }}
          >
            <span className="navbar-cta-text-full">Plan My Trip</span>
            <span className="navbar-cta-text-short">Plan</span>
          </button>

          {/* Direct Phone Link (Placed immediately after Plan My Trip on desktop) */}
          <a
            href={`tel:${CLIENT_INFO.phoneRaw}`}
            title="Call Voyastra Travel Desk"
            style={{
              display: "none",
              alignItems: "center",
              gap: 6,
              color: "#F7F6F0",
              fontSize: "0.85rem",
              fontWeight: 600,
              textDecoration: "none",
              whiteSpace: "nowrap",
              padding: "7px 14px",
              borderRadius: "var(--radius-full)",
              border: "1px solid rgba(255, 255, 255, 0.16)",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              transition: "all 0.2s ease",
            }}
            className="desktop-phone-link"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.12)";
              e.currentTarget.style.borderColor = "var(--color-accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.16)";
            }}
          >
            <Phone size={13} style={{ color: "var(--color-accent)", flexShrink: 0 }} />
            <span style={{ whiteSpace: "nowrap" }}>{CLIENT_INFO.phone}</span>
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="mobile-hamburger"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Collapsible Navigation Menu */}
      {isMobileMenuOpen && (
        <div
          style={{
            backgroundColor: "#12313A",
            borderBottom: "2px solid var(--color-accent)",
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 14,
            animation: "fadeIn 0.2s ease",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  prefetch={true}
                  onClick={() => handleLinkClick(link)}
                  style={{
                    color: isActive ? "var(--color-accent)" : "#FFFFFF",
                    fontSize: "1rem",
                    fontWeight: isActive ? 700 : 600,
                    padding: "8px 0",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>{link.label}</span>
                  {isActive && <span style={{ color: "var(--color-accent)", fontSize: "0.8rem" }}>●</span>}
                </Link>
              );
            })}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 10 }}>
            <a
              href={`tel:${CLIENT_INFO.phoneRaw}`}
              className="btn btn-outline-white"
              style={{ width: "100%", justifyContent: "center", whiteSpace: "nowrap" }}
            >
              <Phone size={15} style={{ color: "var(--color-accent)" }} />
              <span>Call Us: {CLIENT_INFO.phone}</span>
            </a>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleEnquiryClick();
              }}
              className="btn btn-accent"
              style={{ width: "100%", justifyContent: "center" }}
            >
              <span>Request Custom Itinerary</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
