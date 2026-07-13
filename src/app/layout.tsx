import type { Metadata } from "next";
import { Syne, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/lib/cart";

// Display face — brand.md §4. Syne is a variable geometric display grotesque;
// the display roles set it at weight 700 (the wordmark weight on the proof).
// (Replaces Bebas Neue as of Phase 1.02c — D-1.02c-2.)
const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
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
      className={`${syne.variable} ${hankenGrotesk.variable}`}
    >
      <body className="flex min-h-dvh flex-col">
        <CartProvider>
          <Header />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
