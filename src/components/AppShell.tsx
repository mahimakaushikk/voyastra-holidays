"use client";

import React, { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuickContactDock from "@/components/QuickContactDock";
import EnquiryModal from "@/components/EnquiryModal";
import { useEnquiry } from "@/components/EnquiryContext";

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

      {/* Shared Enquiry Modal */}
      <EnquiryModal
        isOpen={isModalOpen}
        onClose={closeEnquiry}
        preselectedDestination={selectedDestination}
        initialTravelType={initialTravelType}
        initialTravelMonth={initialTravelMonth}
        customContext={customContext}
      />
    </div>
  );
}
