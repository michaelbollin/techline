import type { MetadataRoute } from "next";

import { buildSiteSitemap } from "@/lib/site-discovery";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return buildSiteSitemap();
}
