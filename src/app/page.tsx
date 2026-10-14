"use client";

import React, { useState } from "react";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import AudienceCurations from "@/components/AudienceCurations";
import DestinationsGrid from "@/components/DestinationsGrid";
import CostEstimator from "@/components/CostEstimator";
import WhyVoyastra from "@/components/WhyVoyastra";
import Testimonials from "@/components/Testimonials";
import EnquirySection from "@/components/EnquirySection";
import { useEnquiry } from "@/components/EnquiryContext";
import { Destination } from "@/types";

export default function Home() {
  const { openEnquiry } = useEnquiry();
  const [selectedPersona, setSelectedPersona] = useState<string>("family");

  const handleOpenEnquiry = (destOrContext?: Destination | string) => {
    if (typeof destOrContext === "string") {
      openEnquiry({ customContext: destOrContext });
    } else if (destOrContext) {
      openEnquiry({ destination: destOrContext });
    } else {
      openEnquiry();
    }
  };

  return (
    <>
      {/* 1. Cinematic Hero Section with Background Video & Trip Finder */}
      <Hero
        onOpenEnquiry={handleOpenEnquiry}
        onDestinationSelect={(dest) => openEnquiry({ destination: dest })}
      />

      {/* 2. Editorial Trust Statistics Bar */}
      <StatsBar />

      {/* 3. Audience-Specific Curations (Family, Honeymoon, Corporate MICE) */}
      <AudienceCurations
        onOpenEnquiry={(aud) => openEnquiry({ travelType: aud, customContext: `Special request for: ${aud}` })}
        activePersonaId={selectedPersona}
        onPersonaChange={setSelectedPersona}
      />

      {/* 4. Handcrafted Destinations Grid (All 8 Destinations) */}
      <DestinationsGrid
        onOpenEnquiry={(dest) => openEnquiry({ destination: dest })}
      />

      {/* 5. Interactive Trip Cost & Itinerary Estimator */}
      <CostEstimator
        onOpenEnquiry={(context) => openEnquiry({ customContext: context })}
      />

      {/* 6. The Voyastra Standard & Core Pillars */}
      <WhyVoyastra />

      {/* 7. Verified Guest Experiences */}
      <Testimonials />

      {/* 8. Priority Travel Desk & Enquiry Form */}
      <EnquirySection />
    </>
  );
}
