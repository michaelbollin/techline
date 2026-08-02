"use client";

import { useEffect, useRef } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  createPacketNetworkCanvasState,
  renderPacketNetworkCanvas,
  stepPacketNetworkCanvasState,
  type PacketNetworkCanvasState,
  type PacketNetworkScene,
} from "@/lib/animations/packet-network";
import { cn } from "@/lib/cn";

type PacketNetworkAnimationProps = {
  scene: PacketNetworkScene;
  className?: string;
};

export function PacketNetworkAnimation({ scene, className }: PacketNetworkAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<PacketNetworkCanvasState | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    stateRef.current = createPacketNetworkCanvasState(scene);
  }, [scene]);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    let frameId = 0;
    let lastTime = performance.now();

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) {
        return;
      }

      const { width, height } = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const observer = new ResizeObserver(resize);
    if (canvas.parentElement) {
      observer.observe(canvas.parentElement);
    }

    const tick = (time: number) => {
      const state = stateRef.current;
      const parent = canvas.parentElement;

      if (state && parent) {
        const { width, height } = parent.getBoundingClientRect();
        stepPacketNetworkCanvasState(state, time - lastTime);
        renderPacketNetworkCanvas(context, width, height, state);
      }

      lastTime = time;
      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, [prefersReducedMotion, scene]);

  if (prefersReducedMotion) {
    return (
      <div
        className={cn(
          "absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(56,189,248,0.1),transparent_58%),radial-gradient(circle_at_70%_72%,rgba(99,102,241,0.08),transparent_52%)]",
          className,
        )}
        aria-hidden
      />
    );
  }

  return (
    <div className={cn("absolute inset-0", className)} aria-hidden>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
