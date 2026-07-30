"use client";

import type { AnimationId } from "@/lib/animations/registry";

import { CdRomAnimation } from "./cd-rom";
import { GitBranchesAnimation } from "./git-branches";
import { QuicksortAnimation } from "./quicksort";

type RenderAnimationProps = {
  animationId: AnimationId;
  className?: string;
};

export function RenderAnimation({ animationId, className }: RenderAnimationProps) {
  switch (animationId) {
    case "cd-rom":
      return <CdRomAnimation className={className} />;
    case "quicksort":
      return <QuicksortAnimation className={className} />;
    case "git-branches":
      return <GitBranchesAnimation className={className} />;
    default:
      return null;
  }
}
