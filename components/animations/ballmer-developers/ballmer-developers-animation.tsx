"use client";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  BALLMER_DEVELOPERS_POSTER_SRC,
  BALLMER_DEVELOPERS_VIDEO_SRC,
} from "@/lib/animations/ballmer-developers";
import { cn } from "@/lib/cn";

type BallmerDevelopersAnimationProps = {
  className?: string;
};

export function BallmerDevelopersAnimation({ className }: BallmerDevelopersAnimationProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className={cn("absolute inset-0 overflow-hidden", className)} aria-hidden>
        <img
          src={BALLMER_DEVELOPERS_POSTER_SRC}
          alt=""
          className="h-full w-full object-cover opacity-50"
        />
      </div>
    );
  }

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)} aria-hidden>
      <video
        src={BALLMER_DEVELOPERS_VIDEO_SRC}
        autoPlay
        loop
        muted
        playsInline
        poster={BALLMER_DEVELOPERS_POSTER_SRC}
        className="h-full w-full object-cover opacity-80"
      />
    </div>
  );
}
