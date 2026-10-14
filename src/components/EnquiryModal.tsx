"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { CLIENT_INFO, DESTINATIONS } from "@/data/travelData";
import { Destination } from "@/types";
import { X, MessageSquare, Phone, Send, CheckCircle2, ShieldCheck } from "lucide-react";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedDestination?: Destination | null;
  initialCoupon?: string;
  initialTravelType?: string;
  initialTravelMonth?: string;
  customContext?: string;
}

export default function EnquiryModal({
  isOpen,
  onClose,
  preselectedDestination,
  initialCoupon,
  initialTravelType,
  initialTravelMonth,
  customContext,
}: EnquiryModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [destination, setDestination] = useState(
    preselectedDestination ? preselectedDestination.name : "Bali"
  );
  const [travelType, setTravelType] = useState(initialTravelType || "Family Vacation");
  const [travelers, setTravelers] = useState("2 Adults");
  const [notes, setNotes] = useState("");
  const [travelMonth, setTravelMonth] = useState(initialTravelMonth || "October 2026");
  const [submitted, setSubmitted] = useState(false);
  const [leadRef, setLeadRef] = useState("");

  useEffect(() => {
    if (preselectedDestination) {
      setDestination(preselectedDestination.name);
    }
  }, [preselectedDestination]);

  useEffect(() => {
    if (initialTravelType) {
      setTravelType(initialTravelType);
    }
  }, [initialTravelType]);

  useEffect(() => {
    if (initialTravelMonth) {
      setTravelMonth(initialTravelMonth);
    }
  }, [initialTravelMonth]);

  useEffect(() => {
    if (customContext) {
      setNotes((prev) => (prev ? `${prev} | ${customContext}` : customContext));
    }
  }, [customContext]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert("Please provide your name and phone number.");
      return;
    }

    const ref = "VY-" + Math.floor(100000 + Math.random() * 900000);
    setLeadRef(ref);
    setSubmitted(true);

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.5 },
        colors: ["#146B65", "#C7A56B", "#12313A"],
      });
    } catch (err) {}
  };

  const whatsappMessage = `Hi Voyastra Holidays! Quick enquiry [Ref: ${leadRef}]:
- Name: ${name}
- Phone: ${phone}
- Destination: ${destination}
- Travel Type: ${travelType}
- Month: ${travelMonth}
- Pax: ${travelers}
${notes ? `- Note: ${notes}` : ""}
Please send itinerary and price quote!`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Top Header */}
        <div className="modal-header-box">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <span className="badge-gold">Fast Track Enquiry</span>
            </div>
            <h3 style={{ color: "#FFFFFF", fontSize: "1.35rem", margin: 0 }}>
              Plan Your Holiday With Voyastra
            </h3>
            <p style={{ color: "#A3B5BE", fontSize: "0.82rem", margin: 0, marginTop: 4 }}>
              Connect with our Noida travel specialists for a customized quote.
            </p>
          </div>

          <button
            onClick={onClose}
            style={{
              background: "rgba(255, 255, 255, 0.12)",
              border: "none",
              color: "#FFFFFF",
              width: 36,
              height: 36,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body-box">
          {submitted ? (
            <div style={{ textAlign: "center", padding: "24px 10px" }}>
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  backgroundColor: "var(--color-secondary-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--color-secondary)",
                  margin: "0 auto 16px auto",
                }}
              >
                <CheckCircle2 size={34} />
              </div>

              <span className="badge-tag" style={{ marginBottom: 10 }}>
                Lead Reference: {leadRef}
              </span>

              <h4 style={{ fontSize: "1.55rem", color: "var(--color-primary)", marginBottom: 10 }}>
                We Have Received Your Request
              </h4>

              <p style={{ color: "var(--color-text-muted)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: 24 }}>
                A personal trip curator is reviewing flight availability and luxury resort options for{" "}
                <strong>{destination}</strong>.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 360, margin: "0 auto" }}>
                <a
                  href={`https://wa.me/${CLIENT_INFO.phoneRaw}?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  <MessageSquare size={16} />
                  <span>Connect Instantly on WhatsApp</span>
                </a>

                <button onClick={onClose} className="btn btn-outline-ocean" style={{ width: "100%" }}>
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="modal-form-grid">
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--color-text-main)", marginBottom: 5 }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--color-border)",
                      fontSize: "0.9rem",
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--color-text-main)", marginBottom: 5 }}>
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--color-border)",
                      fontSize: "0.9rem",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              <div className="modal-form-grid">
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--color-text-main)", marginBottom: 5 }}>
                    Destination
                  </label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--color-border)",
                      fontSize: "0.9rem",
                      backgroundColor: "#FFF",
                    }}
                  >
                    {DESTINATIONS.map((d) => (
                      <option key={d.id} value={d.name}>
                        {d.name} (from ₹{d.startingPrice.toLocaleString("en-IN")})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--color-text-main)", marginBottom: 5 }}>
                    Trip Type
                  </label>
                  <select
                    value={travelType}
                    onChange={(e) => setTravelType(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--color-border)",
                      fontSize: "0.9rem",
                      backgroundColor: "#FFF",
                    }}
                  >
                    <option value="Family Vacation">Indian Family Vacation</option>
                    <option value="Honeymoon Couple">Honeymoon Couple</option>
                    <option value="Corporate Offsite">Corporate Offsite / MICE</option>
                    <option value="Friends Trip">Friends Trip</option>
                  </select>
                </div>
              </div>

              <div className="modal-form-grid">
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--color-text-main)", marginBottom: 5 }}>
                    Number of Travellers
                  </label>
                  <select
                    value={travelers}
                    onChange={(e) => setTravelers(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--color-border)",
                      fontSize: "0.9rem",
                      backgroundColor: "#FFF",
                    }}
                  >
                    <option value="2 Adults (Couple)">2 Adults (Couple)</option>
                    <option value="Family (3-4 Pax)">Family (3–4 Pax)</option>
                    <option value="Large Family (5+ Pax)">Large Family (5+ Pax)</option>
                    <option value="Corporate Group (10+ Pax)">Corporate Group (10+ Pax)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--color-text-main)", marginBottom: 5 }}>
                    Departure Month
                  </label>
                  <select
                    value={travelMonth}
                    onChange={(e) => setTravelMonth(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--color-border)",
                      fontSize: "0.9rem",
                      backgroundColor: "#FFF",
                    }}
                  >
                    <option value="October 2026">October 2026 (Festive)</option>
                    <option value="November 2026">November 2026</option>
                    <option value="December 2026">December 2026</option>
                    <option value="Jan-March 2027">Jan - March 2027</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: 18 }}>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--color-text-main)", marginBottom: 5 }}>
                  Preferences / Specific Dates (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Pure Veg food required, private villa, 4-star beach resort..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--color-border)",
                    fontSize: "0.88rem",
                    resize: "none",
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "100%", justifyContent: "center", padding: "13px" }}
              >
                <Send size={16} />
                <span>Submit Enquiry For Free Custom Quote</span>
              </button>

              <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 14 }}>
                <a
                  href={`tel:${CLIENT_INFO.phoneRaw}`}
                  style={{ fontSize: "0.82rem", color: "var(--color-primary)", display: "flex", alignItems: "center", gap: 4, fontWeight: 600 }}
                >
                  <Phone size={13} style={{ color: "var(--color-accent)" }} />
                  <span>Call: {CLIENT_INFO.phone}</span>
                </a>

                <a
                  href={`https://wa.me/${CLIENT_INFO.phoneRaw}?text=Hi%20Voyastra%2C%20I%20want%20to%20plan%20a%20trip.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: "0.82rem", color: "var(--color-secondary)", display: "flex", alignItems: "center", gap: 4, fontWeight: 600 }}
                >
                  <MessageSquare size={13} />
                  <span>WhatsApp Chat</span>
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
