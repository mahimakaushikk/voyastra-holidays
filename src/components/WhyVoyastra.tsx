"use client";

import React from "react";
import { WHY_VOYASTRA } from "@/data/travelData";
import { Utensils, PhoneCall, FileCheck, BadgePercent, ShieldCheck } from "lucide-react";

export default function WhyVoyastra() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Utensils":
        return <Utensils size={26} style={{ color: "var(--color-accent)" }} />;
      case "PhoneCall":
        return <PhoneCall size={26} style={{ color: "var(--color-secondary)" }} />;
      case "FileCheck":
        return <FileCheck size={26} style={{ color: "var(--color-accent)" }} />;
      case "BadgePercent":
        return <BadgePercent size={26} style={{ color: "var(--color-secondary)" }} />;
      default:
        return <ShieldCheck size={26} style={{ color: "var(--color-secondary)" }} />;
    }
  };

  return (
    <section id="why-us" className="section" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <ShieldCheck size={16} />
            <span>The Voyastra Standard</span>
          </div>
          <h2>Why Travellers Choose Voyastra Holidays</h2>
          <p>
            We take pride in eliminating the stress from vacation planning. Here is how we ensure your
            family, honeymoon, or corporate trip is effortless from takeoff to touchdown.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="why-grid">
          {WHY_VOYASTRA.map((pillar, idx) => (
            <div
              key={idx}
              className="editorial-card"
              style={{
                backgroundColor: "var(--color-bg)",
                borderRadius: "var(--radius-md)",
                padding: "clamp(20px, 4vw, 32px) clamp(16px, 3vw, 26px)",
                border: "1px solid var(--color-border)",
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: 54,
                  height: 54,
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid var(--color-border-subtle)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20,
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                {getIcon(pillar.icon)}
              </div>

              <h3 style={{ fontSize: "1.25rem", color: "var(--color-primary)", marginBottom: 10 }}>
                {pillar.title}
              </h3>

              <p style={{ fontSize: "0.92rem", color: "var(--color-text-muted)", lineHeight: 1.6 }}>
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
