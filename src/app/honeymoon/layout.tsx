import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luxury Honeymoon Packages & Romantic Escapes",
  description:
    "Romantic honeymoon packages for Indian couples with complimentary perks: private beach candlelight dinners, overwater villas, couples spa, and honeymoon cake.",
  alternates: {
    canonical: "/honeymoon",
  },
  openGraph: {
    title: "Luxury Honeymoon Packages & Romantic Escapes | Voyastra Holidays",
    description:
      "Begin your forever in unhurried romantic luxury. Maldives, Bali, Switzerland, and Kashmir with exclusive couple inclusions.",
    url: "https://voyastra.in/honeymoon",
  },
};

export default function HoneymoonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
