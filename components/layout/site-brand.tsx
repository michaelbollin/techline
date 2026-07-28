import Link from "next/link";

import { SITE_TAGLINE, SITE_WORDMARK } from "@/lib/site";

type SiteBrandProps = {
  className?: string;
};

export function SiteBrand({ className }: SiteBrandProps) {
  return (
    <Link href="/" className={className ?? "site-brand"}>
      <span className="site-brand-wordmark">{SITE_WORDMARK}</span>
      <span className="site-brand-separator" aria-hidden="true">
        |
      </span>
      <span className="site-brand-subtitle">{SITE_TAGLINE}</span>
    </Link>
  );
}
