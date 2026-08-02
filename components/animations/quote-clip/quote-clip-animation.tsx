"use client";

import Image from "next/image";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import type { QuoteClipConfig } from "@/lib/animations/quote-clip";
import { cn } from "@/lib/cn";

type QuoteClipAnimationProps = {
  config: QuoteClipConfig;
  className?: string;
};

export function QuoteClipAnimation({ config, className }: QuoteClipAnimationProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className={cn("absolute inset-0 overflow-hidden", className)} aria-hidden>
        <Image
          src={config.posterSrc}
          alt=""
          fill
          className="object-cover opacity-50"
          sizes="100vw"
        />
      </div>
    );
  }

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)} aria-hidden>
      <video
        src={config.videoSrc}
        autoPlay
        loop
        muted
        playsInline
        poster={config.posterSrc}
        className="h-full w-full object-cover opacity-80"
      />
    </div>
  );
}
