import type { Metadata } from "next";
import { Anton, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: "600",
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "thatskin — Skin that feels calm, clear and cared for",
  description: "Authentic skincare and simple routines, delivered to your door.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${cormorant.variable} ${inter.variable}`}
    >
      <body className="min-h-screen bg-bg text-ink font-body antialiased selection:bg-soft selection:text-ink overflow-x-hidden flex flex-col">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
