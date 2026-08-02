"use client";

import { PacketNetworkAnimation } from "@/components/animations/packet-network";
import { TCP_IP_SCENE } from "@/lib/animations/packet-network";
import { cn } from "@/lib/cn";

type TcpIpAnimationProps = {
  className?: string;
};

export function TcpIpAnimation({ className }: TcpIpAnimationProps) {
  return <PacketNetworkAnimation scene={TCP_IP_SCENE} className={className} />;
}
