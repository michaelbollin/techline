import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { BuyMeACoffeeScript } from "@/components/layout/buy-me-a-coffee";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
};

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
