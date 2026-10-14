import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { EnquiryProvider } from "@/components/EnquiryContext";
import AppShell from "@/components/AppShell";

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
  metadataBase: new URL("https://voyastra.in"),
  title: {
    default: "Voyastra Holidays | Duniya Dekho, Apne Andaaz Mein",
    template: "%s | Voyastra Holidays",
  },
  description:
    "Premium boutique holiday advisory for Indian families, honeymoon couples, and corporate groups. Bali, Dubai, Maldives, Switzerland & more with verified stays, pure veg/Jain dining coordination, and transparent pricing.",
  keywords: [
    "Voyastra Holidays",
    "Holiday Packages",
    "Family Tour Packages",
    "Honeymoon Packages",
    "Corporate Offsite MICE",
    "Bali Holiday Packages",
    "Dubai Tour Packages",
    "Maldives Water Villa",
    "Switzerland Tour",
    "Indian Vegetarian Travel",
  ],
  authors: [{ name: "Voyastra Holidays" }],
  creator: "Voyastra Holidays",
  publisher: "Voyastra Holidays",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Voyastra Holidays | Duniya Dekho, Apne Andaaz Mein",
    description:
      "Thoughtfully planned holidays for families, couples and groups, with personalised itineraries and support at every step.",
    url: "https://voyastra.in",
    siteName: "Voyastra Holidays",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/destinations/maldives.jpg",
        width: 1200,
        height: 630,
        alt: "Voyastra Holidays Luxury Travel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Voyastra Holidays | Duniya Dekho, Apne Andaaz Mein",
    description:
      "Thoughtfully planned holidays for families, couples and groups, with personalised itineraries and support at every step.",
    images: ["/images/destinations/maldives.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <EnquiryProvider>
          <AppShell>{children}</AppShell>
        </EnquiryProvider>
      </body>
    </html>
  );
}
