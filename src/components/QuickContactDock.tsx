"use client";

import React, { useState, useEffect } from "react";
import { CLIENT_INFO } from "@/data/travelData";
import { MessageSquare, ArrowUp, Calendar } from "lucide-react";

interface QuickContactDockProps {
  onOpenEnquiry?: () => void;
}

export default function QuickContactDock({ onOpenEnquiry }: QuickContactDockProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="quick-dock-container">
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          title="Scroll to Top"
          className="quick-dock-scroll-top"
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            backgroundColor: "var(--color-primary)",
            color: "#FFFFFF",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            backdropFilter: "blur(8px)",
            boxShadow: "var(--shadow-md)",
            transition: "all 0.2s ease",
            marginBottom: 8,
          }}
        >
          <ArrowUp size={16} />
        </button>
      )}

      {/* Action Dock */}
      <div className="quick-dock-pill">
        {/* Enquiry Trigger - Primary Prominent CTA */}
        <button
          onClick={onOpenEnquiry}
          title="Plan Your Custom Holiday"
          className="btn btn-accent"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            padding: "8px 16px",
            fontSize: "0.86rem",
            fontWeight: 700,
          }}
        >
          <Calendar size={14} />
          <span>Plan Trip</span>
        </button>

        {/* Smaller, Subtler WhatsApp Action */}
        <a
          href={`https://wa.me/${CLIENT_INFO.phoneRaw}?text=Hi%20Voyastra%20Holidays%2C%20I%20want%20to%20plan%20a%20holiday.`}
          target="_blank"
          rel="noopener noreferrer"
          title="Chat with holiday specialist on WhatsApp"
          style={{
            backgroundColor: "rgba(37, 211, 102, 0.12)",
            color: "#E2FBE8",
            border: "1px solid rgba(37, 211, 102, 0.35)",
            padding: "7px 12px",
            borderRadius: "var(--radius-full)",
            fontSize: "0.8rem",
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            textDecoration: "none",
            whiteSpace: "nowrap",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(37, 211, 102, 0.22)";
            e.currentTarget.style.borderColor = "rgba(37, 211, 102, 0.6)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(37, 211, 102, 0.12)";
            e.currentTarget.style.borderColor = "rgba(37, 211, 102, 0.35)";
          }}
        >
          <MessageSquare size={13} style={{ color: "#25D366" }} />
          <span>WhatsApp</span>
        </a>

      </div>
    </div>
  );
}
