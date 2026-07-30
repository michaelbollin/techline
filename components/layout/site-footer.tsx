import Link from "next/link";

import { BuyMeACoffeeButton } from "@/components/layout/buy-me-a-coffee";
import { cn } from "@/lib/cn";
import {
  SITE_AUTHOR_EMAIL,
  SITE_AUTHOR_NAME,
  SITE_AUTHOR_URL,
  SITE_FOOTER_RESERVED_HEIGHT,
} from "@/lib/site";

type SiteFooterProps = {
  /** Pin to the viewport bottom — for full-screen timeline views. */
  fixed?: boolean;
  className?: string;
};

export function SiteFooter({ fixed = false, className }: SiteFooterProps) {
  return (
    <footer
      className={cn(
        "text-xs leading-relaxed text-black/45",
        fixed &&
          "z-20 shrink-0 border-t border-black bg-white max-md:relative md:pointer-events-none md:fixed md:inset-x-0 md:bottom-0 md:border-t-0 md:bg-transparent",
        className,
      )}
    >
      <p
        className={cn(
          "flex flex-wrap items-center gap-x-1 px-6 py-3 sm:px-8",
          fixed &&
            "pointer-events-auto justify-center max-md:py-0 md:justify-end",
        )}
        style={fixed ? { minHeight: SITE_FOOTER_RESERVED_HEIGHT } : undefined}
      >
        <BuyMeACoffeeButton />
        <span aria-hidden="true"> · </span>
        <span className="inline-flex translate-y-[5px] items-center gap-x-1">
          <Link
            href={SITE_AUTHOR_URL}
            className="text-black/70 underline-offset-2 hover:text-black hover:underline"
          >
            {SITE_AUTHOR_NAME}
          </Link>
          <span aria-hidden="true"> · </span>
          <span>Missing event? Send it to: </span>
          <a
            href={`mailto:${SITE_AUTHOR_EMAIL}`}
            className="text-black/55 underline-offset-2 hover:text-black hover:underline"
          >
            {SITE_AUTHOR_EMAIL}
          </a>
        </span>
      </p>
    </footer>
  );
}
