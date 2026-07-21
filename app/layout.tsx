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
    default: "Connect Club — Estúdio de treino personalizado no Porto",
    template: "%s · Connect Club",
  },
  description:
    "Estúdio de treino personalizado no Porto. Personal training, hybrid, aulas de grupo, nutrição e massagem, com acompanhamento próximo e plano à tua medida. Avaliação física gratuita.",
  keywords: [
    "personal trainer Porto",
    "estúdio de treino Porto",
    "treino personalizado",
    "hybrid training",
    "nutrição",
    "avaliação física gratuita",
    "Connect Club",
  ],
  openGraph: {
    title: "Connect Club — Estúdio de treino personalizado no Porto",
    description:
      "5 pilares, 1 propósito: personal training, hybrid, aulas de grupo, nutrição e massagem. Acompanhamento próximo e avaliação física gratuita.",
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
