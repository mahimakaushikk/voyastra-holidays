"use client";

import React, { useState, useEffect } from "react";
import { AUDIENCE_CURATIONS, CLIENT_INFO } from "@/data/travelData";
import { HeartHandshake, Sparkles, Briefcase, CheckCircle, ArrowRight, MessageSquare, Utensils, ShieldCheck } from "lucide-react";

interface AudienceCurationsProps {
  onOpenEnquiry?: (audienceType: string) => void;
  activePersonaId?: string;
  onPersonaChange?: (personaId: string) => void;
}

export default function AudienceCurations({
  onOpenEnquiry,
  activePersonaId,
  onPersonaChange,
}: AudienceCurationsProps) {
  const [activeTab, setActiveTab] = useState<string>(activePersonaId || "family");

  // Sync with prop if passed
  useEffect(() => {
    if (activePersonaId) {
      setActiveTab(activePersonaId);
    }
  }, [activePersonaId]);

  // Listen to hash change from browser URL
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === "#groups" || hash === "#corporate-mice" || hash === "#corporate") {
        setActiveTab("corporate");
        if (onPersonaChange) onPersonaChange("corporate");
      } else if (hash === "#honeymoon") {
        setActiveTab("honeymoon");
        if (onPersonaChange) onPersonaChange("honeymoon");
      } else if (hash === "#families" || hash === "#family") {
        setActiveTab("family");
        if (onPersonaChange) onPersonaChange("family");
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, [onPersonaChange]);

  const handleTabClick = (id: string, anchorId: string) => {
    setActiveTab(id);
    if (onPersonaChange) onPersonaChange(id);
    window.history.replaceState(null, "", `#${anchorId}`);
  };

  const getIcon = (id: string) => {
    switch (id) {
      case "family":
        return <HeartHandshake size={22} style={{ color: "var(--color-secondary)" }} />;
      case "honeymoon":
        return <Sparkles size={22} style={{ color: "var(--color-accent)" }} />;
      case "corporate":
        return <Briefcase size={22} style={{ color: "var(--color-secondary)" }} />;
      default:
        return <Sparkles size={22} />;
    }
  };

  const selectedCuration =
    AUDIENCE_CURATIONS.find((c) => c.id === activeTab) || AUDIENCE_CURATIONS[0];

  return (
    <section
      id="curations"
      className="section"
      style={{
        backgroundColor: "var(--color-bg)",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      {/* Invisible anchor target points so external and internal links resolve correctly */}
      <span id="families" style={{ position: "relative", top: -90 }} />
      <span id="family" style={{ position: "relative", top: -90 }} />
      <span id="honeymoon" style={{ position: "relative", top: -90 }} />
      <span id="groups" style={{ position: "relative", top: -90 }} />
      <span id="corporate-mice" style={{ position: "relative", top: -90 }} />
      <span id="corporate" style={{ position: "relative", top: -90 }} />

      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <span>Specialized Travel Divisions</span>
          </div>
          <h2>Crafted For Your Exact Travel Persona</h2>
          <p>
            Whether planning a multigenerational family retreat, an intimate honeymoon sanctuary, or a
            corporate leadership offsite, Voyastra delivers personalized comfort without compromises.
          </p>
        </div>

        {/* Tab Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 12,
            marginBottom: 36,
            flexWrap: "wrap",
          }}
        >
          {AUDIENCE_CURATIONS.map((curation) => {
            const isActive = curation.id === activeTab;
            return (
              <button
                key={curation.id}
                onClick={() => handleTabClick(curation.id, curation.anchorId)}
                className="curation-tab-btn"
                style={{
                  border: isActive ? "2px solid var(--color-secondary)" : "1px solid var(--color-border)",
                  backgroundColor: isActive ? "var(--color-primary)" : "#FFFFFF",
                  color: isActive ? "#FFFFFF" : "var(--color-primary)",
                  boxShadow: isActive ? "var(--shadow-md)" : "none",
                }}
              >
                <span>{getIcon(curation.id)}</span>
                <span>{curation.title}</span>
                <span
                  style={{
                    fontSize: "0.72rem",
                    padding: "2px 8px",
                    borderRadius: "var(--radius-full)",
                    backgroundColor: isActive ? "rgba(20, 107, 101, 0.25)" : "var(--color-bg)",
                    color: isActive ? "#F7F6F0" : "var(--color-text-muted)",
                    fontWeight: 600,
                  }}
                >
                  {curation.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Tab Content Card */}
        <div className="curation-card">
          <div className="curation-inner-grid">
            {/* Left Column: Description & Feature Checklist */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <span className="badge-tag">{selectedCuration.badge}</span>
              </div>

              <h3
                style={{
                  fontSize: "1.85rem",
                  color: "var(--color-primary)",
                  marginBottom: 12,
                }}
              >
                {selectedCuration.subtitle}
              </h3>

              <p
                style={{
                  fontSize: "1.05rem",
                  color: "var(--color-text-muted)",
                  lineHeight: 1.7,
                  marginBottom: 28,
                }}
              >
                {selectedCuration.description}
              </p>

              {/* Feature Points */}
              <div className="curation-features-grid">
                {selectedCuration.features.map((feature, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                      backgroundColor: "var(--color-bg)",
                      padding: "13px 16px",
                      borderRadius: "var(--radius-md)",
                      border: "1px solid var(--color-border-subtle)",
                    }}
                  >
                    <CheckCircle
                      size={18}
                      style={{ color: "var(--color-secondary)", flexShrink: 0, marginTop: 2 }}
                    />
                    <span style={{ fontSize: "0.92rem", color: "var(--color-text-main)", fontWeight: 500 }}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="curation-actions-row">
                <button
                  onClick={() => onOpenEnquiry && onOpenEnquiry(selectedCuration.title)}
                  className="btn btn-primary curation-action-btn"
                >
                  <span>Request {selectedCuration.id === "corporate" ? "Corporate" : selectedCuration.title} Itinerary</span>
                  <ArrowRight size={16} />
                </button>

                <a
                  href={`https://wa.me/${CLIENT_INFO.phoneRaw}?text=Hi%20Voyastra%20Holidays%2C%20I%20want%20to%20plan%20a%20trip%20for%20${encodeURIComponent(
                    selectedCuration.title
                  )}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp curation-action-btn"
                >
                  <MessageSquare size={16} />
                  <span>WhatsApp Consultant</span>
                </a>
              </div>
            </div>

            {/* Right Column: Recommended Destinations & Highlights */}
            <div className="curation-sidebar">
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <Utensils size={18} style={{ color: "var(--color-accent)" }} />
                <h4 style={{ color: "#FFFFFF", fontSize: "1.2rem", margin: 0 }}>
                  Recommended For {selectedCuration.title}
                </h4>
              </div>

              <p style={{ color: "#A3B5BE", fontSize: "0.88rem", marginBottom: 20 }}>
                Handpicked boutique properties with verified Indian kitchens, accessible transfers &amp; priority scheduling.
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 24 }}>
                {selectedCuration.recommendedDestinations.map((dest) => (
                  <span
                    key={dest}
                    style={{
                      background: "rgba(255, 255, 255, 0.08)",
                      border: "1px solid rgba(255, 255, 255, 0.18)",
                      padding: "8px 16px",
                      borderRadius: "var(--radius-full)",
                      fontSize: "0.88rem",
                      fontWeight: 600,
                      color: "var(--color-accent)",
                    }}
                  >
                    📍 {dest}
                  </span>
                ))}
              </div>

              <div
                style={{
                  borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                  paddingTop: 16,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    backgroundColor: "rgba(20, 107, 101, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FFFFFF",
                    flexShrink: 0,
                  }}
                >
                  <ShieldCheck size={20} />
                </div>
                <div style={{ fontSize: "0.82rem", color: "#D0DCD9", lineHeight: 1.4 }}>
                  <strong>Dedicated Concierge:</strong> Direct emergency phone &amp; WhatsApp coordination throughout your journey.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
