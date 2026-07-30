"use client";

import type { AnimationId } from "@/lib/animations/registry";

import { BallmerDevelopersAnimation } from "./ballmer-developers";
import { CdRomAnimation } from "./cd-rom";
import { GitBranchesAnimation } from "./git-branches";
import { InternetTidalWaveAnimation } from "./internet-tidal-wave";
import { QuicksortAnimation } from "./quicksort";
import { TransistorAnimation } from "./transistor";

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
    case "transistor":
      return <TransistorAnimation className={className} />;
    case "ballmer-developers":
      return <BallmerDevelopersAnimation className={className} />;
    case "internet-tidal-wave":
      return <InternetTidalWaveAnimation className={className} />;
    default:
      return null;
  }
}
