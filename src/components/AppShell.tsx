"use client";

import React, { ReactNode } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuickContactDock from "@/components/QuickContactDock";
import { useEnquiry } from "@/components/EnquiryContext";

// Lazy-load the heavy EnquiryModal so it never slows down page switching
const EnquiryModal = dynamic(() => import("@/components/EnquiryModal"), {
  ssr: false,
});

export default function AppShell({ children }: { children: ReactNode }) {
  const {
    isModalOpen,
    closeEnquiry,
    openEnquiry,
    selectedDestination,
    initialTravelType,
    initialTravelMonth,
    customContext,
  } = useEnquiry();

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Shared Navbar across all pages */}
      <Navbar onOpenEnquiry={() => openEnquiry()} />

      {/* Main Page View */}
      <main style={{ flex: "1 0 auto", display: "flex", flexDirection: "column" }}>
        {children}
      </main>

      {/* Shared Footer across all pages */}
      <Footer />

      {/* Floating Quick Contact Dock (Plan Trip + WhatsApp) */}
      <QuickContactDock onOpenEnquiry={() => openEnquiry()} />

      {/* Lazy-loaded Enquiry Modal (only rendered when active) */}
      {isModalOpen && (
        <EnquiryModal
          isOpen={isModalOpen}
          onClose={closeEnquiry}
          preselectedDestination={selectedDestination}
          initialTravelType={initialTravelType}
          initialTravelMonth={initialTravelMonth}
          customContext={customContext}
        />
      )}
    </div>
  );
}
