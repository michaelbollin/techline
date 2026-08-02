"use client";

import { PacketNetworkAnimation } from "@/components/animations/packet-network";
import { ARPANET_SCENE } from "@/lib/animations/packet-network";

type ArpanetAnimationProps = {
  className?: string;
};

export function ArpanetAnimation({ className }: ArpanetAnimationProps) {
  return <PacketNetworkAnimation scene={ARPANET_SCENE} className={className} />;
}
