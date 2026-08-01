import type { Metadata } from "next";
import { Geist } from "next/font/google";

import { BuyMeACoffeeScript } from "@/components/layout/buy-me-a-coffee";
import { GoogleAnalytics } from "@/components/layout/google-analytics";
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
        <link rel="preconnect" href="https://www.googletagmanager.com" />
      </head>
      <body className={`${geistSans.variable} min-h-screen bg-white text-black`}>
        <GoogleAnalytics />
        {children}
        <BuyMeACoffeeScript />
      </body>
    </html>
  );
}
