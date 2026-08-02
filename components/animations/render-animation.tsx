"use client";

import type { AnimationId } from "@/lib/animations/registry";

import { BallmerDevelopersAnimation } from "./ballmer-developers";
import { CdRomAnimation } from "./cd-rom";
import { GitBranchesAnimation } from "./git-branches";
import { IntegratedCircuitAnimation } from "./integrated-circuit";
import { InternetTidalWaveAnimation } from "./internet-tidal-wave";
import { IbmPc5150Animation } from "./ibm-pc-5150";
import { LinuxKernelAnimation } from "./linux-kernel";
import { QuicksortAnimation } from "./quicksort";
import { TransistorAnimation } from "./transistor";
import { WorldWideWebAnimation } from "./world-wide-web";
import { Y2kRolloverAnimation } from "./y2k-rollover";

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
    case "y2k-rollover":
      return <Y2kRolloverAnimation className={className} />;
    case "world-wide-web":
      return <WorldWideWebAnimation className={className} />;
    case "linux-kernel":
      return <LinuxKernelAnimation className={className} />;
    case "ibm-pc-5150":
      return <IbmPc5150Animation className={className} />;
    case "integrated-circuit":
      return <IntegratedCircuitAnimation className={className} />;
    default: {
      const unhandledAnimationId: never = animationId;
      throw new Error(`Unhandled animation id: ${unhandledAnimationId}`);
    }
  }
}
