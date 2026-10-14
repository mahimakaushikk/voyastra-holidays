import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Voyastra Holidays | Crafting Soulful Journeys Since 2012",
  description:
    "Learn about Voyastra Holidays' 12-year journey, travel philosophy, specialized destination desks, and verified office in Sector 62, Noida. 25,000+ satisfied travelers.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Voyastra Holidays | Our Story & Philosophy",
    description:
      "Boutique Indian travel advisory crafting tailor-made holidays with unhurried pacing, authentic cuisine, and 24/7 concierge support.",
    url: "https://voyastra.in/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
