import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { LayoutWrapper } from "@/components/layout/LayoutWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chez Gaby | Restaurant de Luxe - Kinshasa",
  description: "Une expérience culinaire exceptionnelle au cœur de Kinshasa. Cuisine franco-portugaise, viandes grillées et fruits de mer frais.",
  keywords: ["Chez Gaby", "restaurant Kinshasa", "restaurant luxe Kinshasa", "cuisine franco-portugaise", "viandes grillées", "fruits de mer Kinshasa"],
  openGraph: {
    title: "Chez Gaby | Restaurant de Luxe - Kinshasa",
    description: "Une expérience culinaire exceptionnelle au cœur de Kinshasa",
    type: "website",
    locale: "fr_CD",
    siteName: "Chez Gaby",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chez Gaby | Restaurant de Luxe - Kinshasa",
    description: "Une expérience culinaire exceptionnelle au cœur de Kinshasa",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://chezgaby.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen antialiased">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
