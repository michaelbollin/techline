import Link from "next/link";

import { cn } from "@/lib/cn";
import { SITE_TAGLINE, SITE_WORDMARK } from "@/lib/site";

type SiteBrandProps = {
  className?: string;
};

export function SiteBrand({ className }: SiteBrandProps) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-5 text-inherit no-underline sm:gap-6 md:gap-7",
        className,
      )}
    >
      <span className="font-mono text-base font-semibold tracking-widest leading-tight whitespace-nowrap text-black md:text-lg">
        {SITE_WORDMARK}
      </span>
      <span
        className="hidden font-mono text-base font-light leading-tight text-neutral-400 sm:inline"
        aria-hidden="true"
      >
        |
      </span>
      <span className="hidden text-base leading-tight tracking-normal text-muted sm:inline">
        {SITE_TAGLINE}
      </span>
    </Link>
  );
}
