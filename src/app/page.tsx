"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import AudienceCurations from "@/components/AudienceCurations";
import DestinationsGrid from "@/components/DestinationsGrid";
import CostEstimator from "@/components/CostEstimator";
import WhyVoyastra from "@/components/WhyVoyastra";
import Testimonials from "@/components/Testimonials";
import EnquirySection from "@/components/EnquirySection";
import Footer from "@/components/Footer";
import QuickContactDock from "@/components/QuickContactDock";
import EnquiryModal from "@/components/EnquiryModal";
import { Destination } from "@/types";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [customContext, setCustomContext] = useState<string>("");
  const [selectedPersona, setSelectedPersona] = useState<string>("family");

  const handleOpenEnquiry = (destOrContext?: Destination | string) => {
    if (typeof destOrContext === "string") {
      setCustomContext(destOrContext);
      setSelectedDestination(null);
    } else if (destOrContext) {
      setSelectedDestination(destOrContext);
      setCustomContext("");
    } else {
      setSelectedDestination(null);
      setCustomContext("");
    }
    setIsModalOpen(true);
  };

  const handleSelectPersona = (personaId: string) => {
    setSelectedPersona(personaId);
  };

  return (
    <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* 1. Header Navigation */}
      <Navbar
        onOpenEnquiry={() => handleOpenEnquiry()}
        onSelectPersona={handleSelectPersona}
      />

      {/* 3. Cinematic Hero Section with Background Video & Trip Finder */}
      <Hero
        onOpenEnquiry={handleOpenEnquiry}
        onDestinationSelect={(dest) => setSelectedDestination(dest)}
      />

      {/* 4. Editorial Trust Statistics Bar */}
      <StatsBar />

      {/* 5. Audience-Specific Curations (Family, Honeymoon, Corporate MICE) */}
      <AudienceCurations
        onOpenEnquiry={(aud) => handleOpenEnquiry(`Special request for: ${aud}`)}
        activePersonaId={selectedPersona}
        onPersonaChange={setSelectedPersona}
      />

      {/* 6. Handcrafted Destinations Grid (All 8 Destinations) */}
      <DestinationsGrid
        onOpenEnquiry={(dest) => handleOpenEnquiry(dest)}
      />

      {/* 7. Interactive Trip Cost & Itinerary Estimator */}
      <CostEstimator onOpenEnquiry={(context) => handleOpenEnquiry(context)} />

      {/* 8. The Voyastra Standard & Core Pillars */}
      <WhyVoyastra />

      {/* 9. Verified Guest Experiences */}
      <Testimonials />

      {/* 10. High-Converting Priority Travel Desk & Enquiry Form */}
      <EnquirySection />

      {/* 11. Comprehensive Footer with FAQs and Accreditations */}
      <Footer />

      {/* 12. Floating Quick Contact Dock */}
      <QuickContactDock onOpenEnquiry={() => handleOpenEnquiry()} />

      {/* 13. Reusable Fast-Track Lead Modal */}
      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        preselectedDestination={selectedDestination}
        customContext={customContext}
      />
    </main>
  );
}
