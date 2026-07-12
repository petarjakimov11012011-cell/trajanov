import type { Metadata } from "next";
import { Bebas_Neue, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

// Display face — brand.md §4. Bebas Neue ships a single weight (400).
const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

// Body face — brand.md §4. Hanken Grotesk is variable (covers 400/500/700).
const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Trajanov",
  description: "Trajanov clothing store.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${hankenGrotesk.variable}`}
    >
      <body className="flex min-h-dvh flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
