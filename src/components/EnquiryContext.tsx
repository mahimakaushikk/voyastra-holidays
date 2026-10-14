"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Destination } from "@/types";

export interface EnquiryOptions {
  destination?: Destination | string | null;
  travelType?: string;
  travelMonth?: string;
  customContext?: string;
}

interface EnquiryContextType {
  isModalOpen: boolean;
  selectedDestination: Destination | null;
  initialTravelType: string;
  initialTravelMonth: string;
  customContext: string;
  openEnquiry: (options?: EnquiryOptions) => void;
  closeEnquiry: () => void;
}

const defaultEnquiryContext: EnquiryContextType = {
  isModalOpen: false,
  selectedDestination: null,
  initialTravelType: "Family Vacation",
  initialTravelMonth: "October 2026",
  customContext: "",
  openEnquiry: (options?: EnquiryOptions) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("voyastra-open-enquiry", { detail: options })
      );
    }
  },
  closeEnquiry: () => {},
};

const EnquiryContext = createContext<EnquiryContextType>(defaultEnquiryContext);

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [initialTravelType, setInitialTravelType] = useState("Family Vacation");
  const [initialTravelMonth, setInitialTravelMonth] = useState("October 2026");
  const [customContext, setCustomContext] = useState("");

  const handleOpen = (options?: EnquiryOptions) => {
    if (options?.destination) {
      if (typeof options.destination === "string") {
        setCustomContext(options.destination);
        setSelectedDestination(null);
      } else {
        setSelectedDestination(options.destination);
      }
    } else {
      setSelectedDestination(null);
    }

    if (options?.travelType) {
      setInitialTravelType(options.travelType);
    } else {
      setInitialTravelType("Family Vacation");
    }

    if (options?.travelMonth) {
      setInitialTravelMonth(options.travelMonth);
    }

    if (options?.customContext) {
      setCustomContext(options.customContext);
    } else if (!options?.destination || typeof options.destination !== "string") {
      setCustomContext("");
    }

    setIsModalOpen(true);
  };

  const closeEnquiry = () => {
    setIsModalOpen(false);
  };

  // Listen to global window event for cross-boundary resilience
  useEffect(() => {
    const handleEvent = (e: Event) => {
      const customEvent = e as CustomEvent<EnquiryOptions | undefined>;
      handleOpen(customEvent.detail);
    };

    window.addEventListener("voyastra-open-enquiry", handleEvent);
    return () => {
      window.removeEventListener("voyastra-open-enquiry", handleEvent);
    };
  }, []);

  return (
    <EnquiryContext.Provider
      value={{
        isModalOpen,
        selectedDestination,
        initialTravelType,
        initialTravelMonth,
        customContext,
        openEnquiry: handleOpen,
        closeEnquiry,
      }}
    >
      {children}
    </EnquiryContext.Provider>
  );
}

export function useEnquiry(): EnquiryContextType {
  const context = useContext(EnquiryContext);
  return context || defaultEnquiryContext;
}
