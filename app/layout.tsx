import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { BuyMeACoffeeScript } from "@/components/layout/buy-me-a-coffee";
import { rootSiteMetadata } from "@/lib/site-metadata";

import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = rootSiteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-white text-black`}
      >
        {children}
        <BuyMeACoffeeScript />
      </body>
    </html>
  );
}
