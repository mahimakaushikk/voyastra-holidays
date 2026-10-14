import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trip Cost Estimator & Transparent Holiday Pricing",
  description:
    "Calculate instant indicative travel estimates for Bali, Dubai, Maldives, Switzerland, Thailand, Kashmir, Goa, and Kerala. Transparent itemized breakdown with zero hidden fees.",
  alternates: {
    canonical: "/trip-cost",
  },
  openGraph: {
    title: "Holiday Cost Estimator & Budget Planner | Voyastra Holidays",
    description:
      "Interactive travel budget calculator with hotel tiers, flights, and meals with instant WhatsApp export.",
    url: "https://voyastra.in/trip-cost",
  },
};

export default function TripCostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
