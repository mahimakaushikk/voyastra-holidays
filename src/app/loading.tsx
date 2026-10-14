import React from "react";

export default function Loading() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--color-bg)",
        position: "relative",
      }}
    >
      {/* Top Instant Lightning Progress Bar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "linear-gradient(90deg, #146B65, #E07A2B, #F59E0B, #146B65)",
          backgroundSize: "200% 100%",
          animation: "voyastraProgress 0.8s ease-in-out infinite",
          zIndex: 99999,
        }}
      />

      {/* Subtle pulsing brand badge */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          opacity: 0.85,
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            border: "2.5px solid rgba(224, 122, 43, 0.2)",
            borderTopColor: "var(--color-accent)",
            animation: "voyastraSpin 0.6s linear infinite",
          }}
        />
        <span
          style={{
            fontSize: "0.82rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--color-text-muted)",
          }}
        >
          Loading Voyastra...
        </span>
      </div>

      <style>{`
        @keyframes voyastraProgress {
          0% { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
        @keyframes voyastraSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
