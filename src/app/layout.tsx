import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/components/cart/CartProvider";
import { AgeVerification } from "@/components/AgeVerification";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Vinogang | Urban Wine Collective",
    template: "%s | Vinogang",
  },
  description:
    "Vinogang bringt Wein dahin, wo der Winzer nicht hinkommt. Urban. Jung. Laut. Gemeinschaft.",
  keywords: [
    "Vinogang",
    "Wein",
    "Wine",
    "Urban Wine",
    "Streetwear",
    "Wine Collective",
    "Events",
  ],
  authors: [{ name: "Vinogang GmbH" }],
  creator: "Vinogang GmbH",
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://vinogang.de",
    siteName: "Vinogang",
    title: "Vinogang | Urban Wine Collective",
    description:
      "Vinogang bringt Wein dahin, wo der Winzer nicht hinkommt. Urban. Jung. Laut. Gemeinschaft.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vinogang - Urban Wine Collective",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vinogang | Urban Wine Collective",
    description:
      "Vinogang bringt Wein dahin, wo der Winzer nicht hinkommt.",
    images: ["/og-image.jpg"],
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <AgeVerification />
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
