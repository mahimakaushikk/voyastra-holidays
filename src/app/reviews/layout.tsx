import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verified Customer Reviews & Ratings (4.8★)",
  description:
    "Read 8,400+ genuine customer reviews of Voyastra Holidays. Authentic feedback from Indian families, honeymoon couples, and corporate teams with 4.8 out of 5 stars.",
  alternates: {
    canonical: "/reviews",
  },
  openGraph: {
    title: "Customer Reviews & Guest Experiences | Voyastra Holidays",
    description:
      "4.8★ aggregate traveler rating across 8,400+ reviews. Verified testimonials and authentic traveler feedback.",
    url: "https://voyastra.in/reviews",
  },
};

export default function ReviewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
