import type { Metadata } from "next";

import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "./site";

export const DEFAULT_OG_IMAGE_PATH = "/opengraph-image";

type BuildPageMetadataOptions = {
  title?: string;
  description?: string;
  /** Path only, e.g. `/` or `/javascript`. */
  path?: string;
  /** Absolute or site-relative image URL for Open Graph / Twitter. */
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
};

export function absoluteSiteUrl(path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalized, SITE_URL).href;
}

export function buildPageMetadata(options: BuildPageMetadataOptions = {}): Metadata {
  const title = options.title ?? SITE_NAME;
  const description = options.description ?? SITE_DESCRIPTION;
  const path = options.path ?? "/";
  const url = absoluteSiteUrl(path);
  const imagePath = options.image ?? DEFAULT_OG_IMAGE_PATH;
  const imageUrl = imagePath.startsWith("http") ? imagePath : absoluteSiteUrl(imagePath);

  const metadata: Metadata = {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: options.type ?? "website",
      locale: "en_US",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };

  if (options.noIndex) {
    metadata.robots = { index: false, follow: false };
  }

  return metadata;
}

const defaultOpenGraph = buildPageMetadata();

export const rootSiteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: defaultOpenGraph.alternates,
  openGraph: defaultOpenGraph.openGraph,
  twitter: defaultOpenGraph.twitter,
};
