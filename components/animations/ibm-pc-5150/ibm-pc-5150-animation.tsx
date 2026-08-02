"use client";

import Image from "next/image";

import { VideoLoop } from "@/components/animations/video-loop";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  IBM_PC_5150_POSTER_SRC,
  IBM_PC_5150_VIDEO_SRC,
} from "@/lib/animations/ibm-pc-5150";
import { cn } from "@/lib/cn";

type IbmPc5150AnimationProps = {
  className?: string;
};

export function IbmPc5150Animation({ className }: IbmPc5150AnimationProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className={cn("absolute inset-0 overflow-hidden", className)} aria-hidden>
        <Image
          src={IBM_PC_5150_POSTER_SRC}
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
      <VideoLoop src={IBM_PC_5150_VIDEO_SRC} poster={IBM_PC_5150_POSTER_SRC} />
    </div>
  );
}
