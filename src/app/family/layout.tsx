import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Family Holiday Packages & Multi-Generational Vacations",
  description:
    "Curated family holiday packages with 100% pure veg & Jain meal guarantees, unhurried pacing for seniors and kids, adjoining family suites, and dedicated private transport.",
  alternates: {
    canonical: "/family",
  },
  openGraph: {
    title: "Family Holidays & Multi-Generational Vacations | Voyastra Holidays",
    description:
      "Stress-free family vacations with guaranteed Indian vegetarian meals, kid-friendly itineraries, and senior comfort.",
    url: "https://voyastra.in/family",
  },
};

export default function FamilyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
