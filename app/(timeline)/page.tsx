import type { Metadata } from "next";

import { HomeSeoDocument } from "@/components/timeline/home-seo-document";
import { buildPageMetadata } from "@/lib/site-metadata";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  ...buildPageMetadata({ omitImage: false }),
  title: { absolute: SITE_NAME },
};

export default function HomePage() {
  return <HomeSeoDocument />;
}
