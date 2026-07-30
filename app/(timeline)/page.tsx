import type { Metadata } from "next";

import { buildPageMetadata } from "@/lib/site-metadata";

export const metadata: Metadata = buildPageMetadata();

export default function HomePage() {
  return null;
}
