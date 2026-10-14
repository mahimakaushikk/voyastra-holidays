import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Voyastra Holidays | Duniya Dekho, Apne Andaaz Mein",
  description:
    "Premium boutique holiday advisory for Indian families, honeymoon couples, and corporate groups. Bali, Dubai, Maldives, Switzerland & more with authentic Indian dining, 24/7 on-tour concierge, and transparent pricing.",
  keywords: [
    "Voyastra Holidays",
    "3D Travel Website",
    "Holiday Packages",
    "Family Tour Packages",
    "Honeymoon Packages",
    "Corporate Offsite",
    "Bali Packages",
    "Dubai Tour",
    "Maldives Villa",
    "Switzerland Tour",
  ],
  openGraph: {
    title: "Voyastra Holidays | Duniya Dekho, Apne Andaaz Mein",
    description:
      "Explore handcrafted international & domestic travel packages with 3D interactive globe and instant WhatsApp booking.",
    url: "https://voyastra.in",
    siteName: "Voyastra Holidays",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body>{children}</body>
    </html>
  );
}
