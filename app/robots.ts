import type { MetadataRoute } from "next";

import { buildSiteRobots } from "@/lib/site-discovery";

export default function robots(): MetadataRoute.Robots {
  return buildSiteRobots();
}
