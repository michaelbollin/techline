import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto_Condensed } from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const robotoCondensed = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-timeline-label",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${robotoCondensed.variable} min-h-screen bg-white text-black`}
      >
        {children}
      </body>
    </html>
  );
}
