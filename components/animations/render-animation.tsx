"use client";

import type { AnimationId } from "@/lib/animations/registry";

import { CdRomAnimation } from "./cd-rom";

type RenderAnimationProps = {
  animationId: AnimationId;
  className?: string;
};

export function RenderAnimation({ animationId, className }: RenderAnimationProps) {
  switch (animationId) {
    case "cd-rom":
      return <CdRomAnimation className={className} />;
    default:
      return null;
  }
}
