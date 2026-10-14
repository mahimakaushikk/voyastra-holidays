"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { CLIENT_INFO, DESTINATIONS } from "@/data/travelData";
import { Phone, MessageSquare, Mail, MapPin, Send, CheckCircle2, Clock, ShieldCheck } from "lucide-react";

export default function EnquirySection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    destination: "Bali",
    travelType: "Family Vacation",
    travelers: "2 Adults",
    travelMonth: "October 2026",
    dietary: "Pure Vegetarian / Jain Food",
    notes: "",
    departureCity: "Delhi NCR",
  });

  const [submitted, setSubmitted] = useState(false);
  const [leadId, setLeadId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Please provide your Name and Phone Number.");
      return;
    }

    const randomLead = "VY-" + Math.floor(100000 + Math.random() * 900000);
    setLeadId(randomLead);
    setSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#146B65", "#C7A56B", "#12313A"],
      });
    } catch (err) {}
  };

  const whatsappLeadMessage = `Hi Voyastra Holidays! I just submitted an enquiry [Ref: ${leadId}]:
- Name: ${formData.name}
- Phone: ${formData.phone}
- Destination: ${formData.destination}
- Travel Type: ${formData.travelType}
- Month: ${formData.travelMonth}
- Pax: ${formData.travelers}
- Food Preference: ${formData.dietary}
- Departure City: ${formData.departureCity}
Please connect with me with the best price quote.`;

  return (
    <section id="enquiry" className="section" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="container">
        <div className="enquiry-grid">
          {/* Left Column: Direct Touchpoints & Office Information */}
          <div className="enquiry-card-dark">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <span className="badge-gold">Priority Travel Desk</span>
              </div>

              <h2 style={{ color: "#FFFFFF", fontSize: "2.2rem", lineHeight: 1.2, marginBottom: 14 }}>
                Let&rsquo;s Craft Your Next Journey.
              </h2>

              <p style={{ color: "#A3B5BE", fontSize: "1.02rem", lineHeight: 1.65, marginBottom: 32 }}>
                Speak directly with our senior destination specialists. We craft customized holiday
                experiences tailored to your exact requirements.
              </p>

              {/* Direct Channels */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {/* Phone Call */}
                <a
                  href={`tel:${CLIENT_INFO.phoneRaw}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    padding: "16px 20px",
                    borderRadius: "var(--radius-md)",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    textDecoration: "none",
                    color: "#FFFFFF",
                    transition: "all 0.2s ease",
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      backgroundColor: "rgba(199, 165, 107, 0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--color-accent)",
                      flexShrink: 0,
                    }}
                  >
                    <Phone size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "#A3B5BE", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                      Direct Travel Hotline
                    </div>
                    <div style={{ fontSize: "1.08rem", fontWeight: 700, color: "#FFFFFF" }}>
                      {CLIENT_INFO.phone}
                    </div>
                  </div>
                </a>

                {/* WhatsApp Chat */}
                <a
                  href={`https://wa.me/${CLIENT_INFO.phoneRaw}?text=Hi%20Voyastra%20Holidays%2C%20I%20want%20to%20plan%20a%20holiday.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    padding: "16px 20px",
                    borderRadius: "var(--radius-md)",
                    backgroundColor: "rgba(37, 211, 102, 0.12)",
                    border: "1px solid rgba(37, 211, 102, 0.35)",
                    textDecoration: "none",
                    color: "#FFFFFF",
                    transition: "all 0.2s ease",
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      backgroundColor: "var(--color-whatsapp)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#FFFFFF",
                      flexShrink: 0,
                    }}
                  >
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "#86EFAC", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                      Instant WhatsApp Chat (Avg 3 mins)
                    </div>
                    <div style={{ fontSize: "1.08rem", fontWeight: 700, color: "#FFFFFF" }}>
                      +91 98765 43210
                    </div>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${CLIENT_INFO.email}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    padding: "16px 20px",
                    borderRadius: "var(--radius-md)",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    textDecoration: "none",
                    color: "#FFFFFF",
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      backgroundColor: "rgba(20, 107, 101, 0.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#E2DFD2",
                      flexShrink: 0,
                    }}
                  >
                    <Mail size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "#A3B5BE", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                      Email Inquiries
                    </div>
                    <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "#FFFFFF" }}>
                      {CLIENT_INFO.email}
                    </div>
                  </div>
                </a>

                {/* Office Address */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 16,
                    padding: "16px 20px",
                    borderRadius: "var(--radius-md)",
                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#C7A56B",
                      flexShrink: 0,
                    }}
                  >
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "#A3B5BE", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                      Headquarters
                    </div>
                    <div style={{ fontSize: "0.95rem", color: "#E2DFD2", marginTop: 2, lineHeight: 1.45 }}>
                      {CLIENT_INFO.address}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Hours */}
            <div
              style={{
                borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                paddingTop: 20,
                marginTop: 32,
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <Clock size={17} style={{ color: "var(--color-accent)" }} />
              <div style={{ fontSize: "0.82rem", color: "#A3B5BE" }}>
                Travel Desk Active: <strong style={{ color: "#FFFFFF" }}>9:00 AM – 9:30 PM IST (Mon–Sun)</strong>
              </div>
            </div>
          </div>

          {/* Right Column: Custom Lead Form */}
          <div className="enquiry-card-light">
            {submitted ? (
              <div style={{ textAlign: "center", padding: "28px 10px" }}>
                <div
                  style={{
                    width: 68,
                    height: 68,
                    borderRadius: "50%",
                    backgroundColor: "var(--color-secondary-light)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--color-secondary)",
                    margin: "0 auto 20px auto",
                  }}
                >
                  <CheckCircle2 size={38} />
                </div>

                <span className="badge-tag" style={{ marginBottom: 12 }}>
                  Lead Ref: {leadId}
                </span>

                <h3 style={{ fontSize: "1.9rem", color: "var(--color-primary)", marginBottom: 10 }}>
                  Enquiry Successfully Received
                </h3>

                <p style={{ color: "var(--color-text-muted)", fontSize: "1.02rem", lineHeight: 1.6, maxWidth: 460, margin: "0 auto 28px auto" }}>
                  Thank you, <strong>{formData.name}</strong>! A Voyastra destination manager has been
                  assigned to your request for <strong>{formData.destination}</strong>. We will reach out
                  within 15–30 minutes.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 380, margin: "0 auto" }}>
                  <a
                    href={`https://wa.me/${CLIENT_INFO.phoneRaw}?text=${encodeURIComponent(whatsappLeadMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp"
                    style={{ padding: "13px 20px" }}
                  >
                    <MessageSquare size={18} />
                    <span>Send Directly On WhatsApp</span>
                  </a>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn btn-outline-ocean"
                    style={{ padding: "10px 18px", fontSize: "0.85rem" }}
                  >
                    Submit Another Query
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h3 style={{ fontSize: "1.85rem", color: "var(--color-primary)", marginBottom: 8 }}>
                  Request A Custom Itinerary &amp; Quote
                </h3>
                <p style={{ color: "var(--color-text-muted)", fontSize: "0.92rem", marginBottom: 26 }}>
                  Tell us about your upcoming plans. We will curate the day-wise itinerary with flights, luxury stays, and meal options.
                </p>

                <form onSubmit={handleSubmit}>
                  {/* Name & Phone */}
                  <div className="form-double-col">
                    <div>
                      <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--color-text-main)", marginBottom: 6 }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Kaushal Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "11px 14px",
                          borderRadius: "var(--radius-sm)",
                          border: "1px solid var(--color-border)",
                          fontSize: "0.92rem",
                          outline: "none",
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--color-text-main)", marginBottom: 6 }}>
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "11px 14px",
                          borderRadius: "var(--radius-sm)",
                          border: "1px solid var(--color-border)",
                          fontSize: "0.92rem",
                          outline: "none",
                        }}
                      />
                    </div>
                  </div>

                  {/* Email & Destination */}
                  <div className="form-double-col">
                    <div>
                      <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--color-text-main)", marginBottom: 6 }}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "11px 14px",
                          borderRadius: "var(--radius-sm)",
                          border: "1px solid var(--color-border)",
                          fontSize: "0.92rem",
                          outline: "none",
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--color-text-main)", marginBottom: 6 }}>
                        Destination
                      </label>
                      <select
                        value={formData.destination}
                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "11px 14px",
                          borderRadius: "var(--radius-sm)",
                          border: "1px solid var(--color-border)",
                          fontSize: "0.92rem",
                          outline: "none",
                          backgroundColor: "#FFFFFF",
                        }}
                      >
                        {DESTINATIONS.map((d) => (
                          <option key={d.id} value={d.name}>
                            {d.name} (from ₹{d.startingPrice.toLocaleString("en-IN")})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Group Type & Number of Travelers */}
                  <div className="form-double-col">
                    <div>
                      <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--color-text-main)", marginBottom: 6 }}>
                        Travel Group Type
                      </label>
                      <select
                        value={formData.travelType}
                        onChange={(e) => setFormData({ ...formData, travelType: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "11px 14px",
                          borderRadius: "var(--radius-sm)",
                          border: "1px solid var(--color-border)",
                          fontSize: "0.92rem",
                          outline: "none",
                          backgroundColor: "#FFFFFF",
                        }}
                      >
                        <option value="Family Vacation">Indian Family Vacation</option>
                        <option value="Honeymoon Couple">Honeymoon Couple</option>
                        <option value="Corporate Offsite">Corporate Offsite / MICE</option>
                        <option value="Friends Group">Friends Group</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--color-text-main)", marginBottom: 6 }}>
                        Approx Travelers
                      </label>
                      <select
                        value={formData.travelers}
                        onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "11px 14px",
                          borderRadius: "var(--radius-sm)",
                          border: "1px solid var(--color-border)",
                          fontSize: "0.92rem",
                          outline: "none",
                          backgroundColor: "#FFFFFF",
                        }}
                      >
                        <option value="2 Adults (Couple)">2 Adults (Couple)</option>
                        <option value="Family (3-4 Pax)">Family (3–4 Pax)</option>
                        <option value="Large Family (5+ Pax)">Large Family (5+ Pax)</option>
                        <option value="Corporate Group (15-50 Pax)">Corporate Group (15-50 Pax)</option>
                        <option value="Large Corporate (50+ Pax)">Large Corporate (50+ Pax)</option>
                      </select>
                    </div>
                  </div>

                  {/* Meal Preference & Coupon */}
                  <div className="form-double-col">
                    <div>
                      <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--color-text-main)", marginBottom: 6 }}>
                        Dietary Preference
                      </label>
                      <select
                        value={formData.dietary}
                        onChange={(e) => setFormData({ ...formData, dietary: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "11px 14px",
                          borderRadius: "var(--radius-sm)",
                          border: "1px solid var(--color-border)",
                          fontSize: "0.92rem",
                          outline: "none",
                          backgroundColor: "#FFFFFF",
                        }}
                      >
                        <option value="Pure Vegetarian / Jain Food">100% Pure Veg / Jain Food</option>
                        <option value="Indian Continental Mix">Indian Continental Mix</option>
                        <option value="Halal Certified">Halal Certified</option>
                        <option value="No Dietary Restriction">No Dietary Restriction</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--color-text-main)", marginBottom: 6 }}>
                        Departure City / Airport
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Delhi NCR, Mumbai, Bengaluru"
                        value={formData.departureCity}
                        onChange={(e) => setFormData({ ...formData, departureCity: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "11px 14px",
                          borderRadius: "var(--radius-sm)",
                          border: "1px solid var(--color-border)",
                          fontSize: "0.92rem",
                          outline: "none",
                        }}
                      />
                    </div>
                  </div>

                  {/* Notes */}
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--color-text-main)", marginBottom: 6 }}>
                      Special Requests / Preferred Dates (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Private pool villa in Bali or wheelchair assistance in Switzerland..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--color-border)",
                        fontSize: "0.9rem",
                        outline: "none",
                        resize: "vertical",
                      }}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: "100%", justifyContent: "center", padding: "14px", fontSize: "1.05rem" }}
                  >
                    <Send size={18} />
                    <span>Get Custom Itinerary &amp; Quote</span>
                  </button>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 12, fontSize: "0.78rem", color: "var(--color-text-muted)" }}>
                    <ShieldCheck size={14} style={{ color: "var(--color-secondary)" }} />
                    <span>Your contact details are strictly confidential. No spam guarantee.</span>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

    </section>
  );
}
