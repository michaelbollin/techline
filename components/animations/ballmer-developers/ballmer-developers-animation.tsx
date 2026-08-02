"use client";

import Image from "next/image";

import { VideoLoop } from "@/components/animations/video-loop";
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
        <Image
          src={BALLMER_DEVELOPERS_POSTER_SRC}
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
      <VideoLoop src={BALLMER_DEVELOPERS_VIDEO_SRC} poster={BALLMER_DEVELOPERS_POSTER_SRC} />
    </div>
  );
}
