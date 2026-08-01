"use client";

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
        <img
          src={IBM_PC_5150_POSTER_SRC}
          alt=""
          className="h-full w-full object-cover opacity-50"
        />
      </div>
    );
  }

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)} aria-hidden>
      <video
        src={IBM_PC_5150_VIDEO_SRC}
        autoPlay
        loop
        muted
        playsInline
        poster={IBM_PC_5150_POSTER_SRC}
        className="h-full w-full object-cover opacity-80"
      />
    </div>
  );
}
