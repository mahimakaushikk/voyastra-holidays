import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corporate MICE Retreats & Group Holidays",
  description:
    "Seamless corporate offsites, reward trips, leadership summits, and family reunions. Tiered bulk discounts, dedicated on-ground tour manager, and GST-compliant invoicing.",
  alternates: {
    canonical: "/groups",
  },
  openGraph: {
    title: "Corporate MICE & Group Holiday Packages | Voyastra Holidays",
    description:
      "End-to-end management for group trips of 10 to 100+ travelers with wholesale airfares, gala banqueting, and GST input credit.",
    url: "https://voyastra.in/groups",
  },
};

export default function GroupsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
