import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Curated Destinations & Holiday Packages",
  description:
    "Explore 60+ domestic and international holiday destinations with Voyastra Holidays. Bali, Dubai, Maldives, Switzerland, Kashmir, Kerala, Goa with verified stays and transparent pricing.",
  alternates: {
    canonical: "/destinations",
  },
  openGraph: {
    title: "Curated Destinations | Voyastra Holidays",
    description:
      "Handcrafted international and domestic holiday packages with transparent pricing, verified stays, and 24/7 dedicated concierge.",
    url: "https://voyastra.in/destinations",
  },
};

export default function DestinationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
