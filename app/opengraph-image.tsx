import { OG_IMAGE_CONTENT_TYPE, ogImageSize } from "@/lib/og-images/constants";
import { createSiteOgImageResponse } from "@/lib/og-images/site-og-image";
import { SITE_NAME } from "@/lib/site";

export const alt = SITE_NAME;
export const size = ogImageSize;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default function OpenGraphImage() {
  return createSiteOgImageResponse();
}
