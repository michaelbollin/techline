import type { Metadata } from "next";
import { Geist } from "next/font/google";

import { BuyMeACoffeeScript } from "@/components/layout/buy-me-a-coffee";
import { rootSiteMetadata } from "@/lib/site-metadata";

import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const metadata: Metadata = rootSiteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://cdnjs.buymeacoffee.com" />
        <link rel="preconnect" href="https://cdn.buymeacoffee.com" crossOrigin="anonymous" />
      </head>
      <body className={`${geistSans.variable} min-h-screen bg-white text-black`}>
        {children}
        <BuyMeACoffeeScript />
      </body>
    </html>
  );
}
