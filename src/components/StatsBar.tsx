"use client";

import React from "react";
import { CLIENT_INFO } from "@/data/travelData";
import { Users, Globe2, Award, Star, CheckCircle2 } from "lucide-react";

export default function StatsBar() {
  const getIcon = (name: string) => {
    switch (name) {
      case "Users":
        return <Users size={24} style={{ color: "var(--color-secondary)" }} />;
      case "Globe2":
        return <Globe2 size={24} style={{ color: "var(--color-accent)" }} />;
      case "Award":
        return <Award size={24} style={{ color: "var(--color-secondary)" }} />;
      case "Star":
        return <Star size={24} style={{ color: "var(--color-accent)" }} />;
      default:
        return <CheckCircle2 size={24} style={{ color: "var(--color-secondary)" }} />;
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderTop: "1px solid var(--color-border)",
        borderBottom: "1px solid var(--color-border)",
        boxShadow: "var(--shadow-sm)",
        position: "relative",
        zIndex: 20,
      }}
    >
      <div className="container" style={{ paddingTop: 24, paddingBottom: 24 }}>
        <div className="stats-grid">
          {CLIENT_INFO.stats.map((stat) => (
            <div
              key={stat.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "8px 4px",
              }}
            >
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "var(--color-bg)",
                  border: "1px solid var(--color-border-subtle)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {getIcon(stat.iconName)}
              </div>

              <div>
                <div
                  style={{
                    fontSize: "1.7rem",
                    fontWeight: 800,
                    color: "var(--color-primary)",
                    fontFamily: "var(--font-playfair)",
                    lineHeight: 1.1,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: "0.92rem",
                    fontWeight: 700,
                    color: "var(--color-text-main)",
                    marginTop: 2,
                  }}
                >
                  {stat.label}
                </div>
                <div style={{ fontSize: "0.78rem", color: "var(--color-text-muted)" }}>
                  {stat.sublabel}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
