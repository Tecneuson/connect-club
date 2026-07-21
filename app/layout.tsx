import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://connectclub.pt";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Connect Club — Estúdio de treino 100% acompanhado por personal",
    template: "%s · Connect Club",
  },
  description:
    "No Connect Club nunca treinas sozinho. Cada sessão é conduzida por um personal trainer, com plano à tua medida, avaliação física e resultados que ficam. Inscreve-te online.",
  keywords: [
    "personal trainer",
    "estúdio de treino",
    "treino assistido",
    "treino individual",
    "avaliação física",
    "Connect Club",
  ],
  openGraph: {
    title: "Connect Club — Treino sempre com um personal ao teu lado",
    description:
      "Estúdio de treino assistido. Cada sessão conduzida por um personal trainer. Plano à tua medida e acompanhamento real.",
    url: siteUrl,
    siteName: "Connect Club",
    locale: "pt_PT",
    type: "website",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-PT" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-screen overflow-x-hidden">{children}</body>
    </html>
  );
}
