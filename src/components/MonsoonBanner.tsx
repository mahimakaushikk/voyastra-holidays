"use client";

import React, { useState, useEffect } from "react";
import { CLIENT_INFO } from "@/data/travelData";
import { Sparkles, Copy, Check, ArrowRight, Clock } from "lucide-react";

interface MonsoonBannerProps {
  onClaimOffer?: (code: string) => void;
}

export default function MonsoonBanner({ onClaimOffer }: MonsoonBannerProps) {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 36,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(CLIENT_INFO.offer.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      style={{
        backgroundColor: "#0A1C22",
        borderBottom: "1px solid rgba(199, 165, 107, 0.3)",
        color: "#FFFFFF",
        padding: "6px 12px",
        fontSize: "0.85rem",
        position: "relative",
        zIndex: 50,
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        {/* Left Side: Offer Announcement */}
        <div className="banner-left" style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span
            style={{
              backgroundColor: "rgba(199, 165, 107, 0.2)",
              color: "#C7A56B",
              border: "1px solid rgba(199, 165, 107, 0.4)",
              fontSize: "0.7rem",
              fontWeight: 700,
              padding: "2px 7px",
              borderRadius: "var(--radius-sm)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              whiteSpace: "nowrap",
            }}
          >
            {CLIENT_INFO.offer.tag}
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              color: "#F7F6F0",
              fontWeight: 600,
              fontSize: "0.84rem",
            }}
          >
            <Sparkles size={13} style={{ color: "#C7A56B", flexShrink: 0 }} />
            <span className="banner-title-full">{CLIENT_INFO.offer.title}</span>
            <span className="banner-title-short">Monsoon Sale: Flat 15% Off</span>
          </span>
          <span className="banner-details-text" style={{ color: "rgba(255, 255, 255, 0.3)", margin: "0 2px" }}>|</span>
          <span className="banner-details-text" style={{ color: "#A3B5BE", fontSize: "0.8rem" }}>
            Valid on Bali, Dubai, Maldives &amp; Switzerland
          </span>
        </div>

        {/* Right Side: Countdown + Code Button */}
        <div className="banner-right" style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              fontSize: "0.76rem",
              background: "rgba(255, 255, 255, 0.08)",
              padding: "3px 8px",
              borderRadius: "var(--radius-full)",
              color: "#F7F3E9",
              whiteSpace: "nowrap",
            }}
          >
            <Clock size={11} style={{ color: "#C7A56B", flexShrink: 0 }} />
            <span className="timer-full">
              Ends in: <strong>{String(timeLeft.days).padStart(2, "0")}d</strong> :{" "}
              <strong>{String(timeLeft.hours).padStart(2, "0")}h</strong> :{" "}
              <strong>{String(timeLeft.minutes).padStart(2, "0")}m</strong> :{" "}
              <strong>{String(timeLeft.seconds).padStart(2, "0")}s</strong>
            </span>
            <span className="timer-short">
              Ends: <strong>{timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m</strong>
            </span>
          </div>

          <button
            onClick={handleCopy}
            title="Click to copy coupon code"
            style={{
              background: "rgba(199, 165, 107, 0.15)",
              color: "#C7A56B",
              border: "1px dashed rgba(199, 165, 107, 0.7)",
              borderRadius: 6,
              padding: "3px 8px",
              fontSize: "0.74rem",
              fontWeight: 700,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              whiteSpace: "nowrap",
              transition: "all 0.2s ease",
            }}
          >
            <span>CODE: {CLIENT_INFO.offer.code}</span>
            {copied ? <Check size={11} style={{ color: "var(--color-secondary)" }} /> : <Copy size={11} />}
          </button>

          <button
            onClick={() => onClaimOffer && onClaimOffer(CLIENT_INFO.offer.code)}
            className="btn btn-accent btn-sm"
            style={{ padding: "4px 10px", fontSize: "0.74rem", whiteSpace: "nowrap" }}
          >
            <span>Claim 15% Off</span>
            <ArrowRight size={11} />
          </button>
        </div>
      </div>
    </div>
  );
}
