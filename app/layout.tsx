import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { SiteHeader } from "@/components/layout/site-header";

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
    default: "Techline",
    template: "%s · Techline",
  },
  description: "A timeline of IT history — inventions, protocols, culture, and the AI race.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen`}>
        <SiteHeader />
        <main>{children}</main>
      </body>
    </html>
  );
}
