"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Compass, Lock, ArrowRight, ShieldCheck, AlertCircle, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setErrorMessage("Please enter your admin password.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/admin");
      } else {
        setErrorMessage(data.error || "Invalid administrator password.");
      }
    } catch {
      setErrorMessage("A network error occurred. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0A1C22",
        backgroundImage:
          "radial-gradient(circle at 50% 20%, rgba(20, 107, 101, 0.25) 0%, rgba(18, 49, 58, 0.8) 60%, #0A1C22 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        color: "#FFFFFF",
        fontFamily: "var(--font-inter), sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 440,
          backgroundColor: "rgba(18, 49, 58, 0.95)",
          backdropFilter: "blur(16px)",
          borderRadius: "var(--radius-lg)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.45)",
          padding: "clamp(24px, 5vw, 40px)",
        }}
      >
        {/* Brand Header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              backgroundColor: "var(--color-secondary)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 16,
              color: "#FFFFFF",
              boxShadow: "0 8px 24px rgba(20, 107, 101, 0.4)",
            }}
          >
            <Compass size={28} style={{ transform: "rotate(-15deg)" }} />
          </div>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "4px 12px",
              borderRadius: "var(--radius-full)",
              backgroundColor: "rgba(224, 122, 43, 0.15)",
              border: "1px solid rgba(224, 122, 43, 0.35)",
              color: "var(--color-accent)",
              fontSize: "0.74rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 12,
            }}
          >
            <ShieldCheck size={13} />
            <span>Voyastra Travel Desk</span>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "1.85rem",
              margin: "0 0 8px 0",
              color: "#FFFFFF",
              fontWeight: 700,
            }}
          >
            Inquiry Management
          </h1>
          <p style={{ color: "#A3B5BE", fontSize: "0.88rem", margin: 0 }}>
            Sign in to access traveler leads, manage quotations, and update booking statuses.
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div
            style={{
              backgroundColor: "rgba(239, 68, 68, 0.12)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              borderRadius: "var(--radius-md)",
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              color: "#FCA5A5",
              fontSize: "0.85rem",
              marginBottom: 20,
            }}
          >
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 24 }}>
            <label
              style={{
                display: "block",
                fontSize: "0.82rem",
                fontWeight: 600,
                color: "#CBD5DA",
                marginBottom: 8,
                letterSpacing: "0.02em",
              }}
            >
              Travel Desk Password
            </label>
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  left: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#A3B5BE",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Lock size={16} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                autoFocus
                placeholder="Enter password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "13px 44px 13px 40px",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid rgba(255, 255, 255, 0.16)",
                  backgroundColor: "rgba(10, 28, 34, 0.7)",
                  color: "#FFFFFF",
                  fontSize: "0.95rem",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "transparent",
                  border: "none",
                  color: "#A3B5BE",
                  cursor: "pointer",
                  padding: 4,
                  display: "flex",
                  alignItems: "center",
                }}
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <div style={{ fontSize: "0.75rem", color: "#8E9DA6", marginTop: 8 }}>
              Default development password: <code style={{ color: "var(--color-accent)" }}>voyastra@admin2026</code>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-accent"
            style={{
              width: "100%",
              padding: "14px",
              fontSize: "0.95rem",
              fontWeight: 700,
              justifyContent: "center",
              gap: 8,
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.75 : 1,
            }}
          >
            {isLoading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Enter Admin Portal</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: 24, borderTop: "1px solid rgba(255, 255, 255, 0.08)", paddingTop: 20 }}>
          <Link
            href="/"
            style={{
              color: "#A3B5BE",
              fontSize: "0.82rem",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              transition: "color 0.2s ease",
            }}
          >
            <span>← Return to Voyastra Public Site</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
