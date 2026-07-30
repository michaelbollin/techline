"use client";

import { useEffect, useRef, useState } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  createY2kCanvasState,
  renderY2kCanvas,
  stepY2kCanvasState,
  type Y2kCanvasState,
} from "@/lib/animations/y2k-rollover";
import { cn } from "@/lib/cn";

type Y2kRolloverAnimationProps = {
  className?: string;
};

export function Y2kRolloverAnimation({ className }: Y2kRolloverAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<Y2kCanvasState | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const resize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || size.width <= 0 || size.height <= 0) {
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

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.floor(size.width * dpr));
      canvas.height = Math.max(1, Math.floor(size.height * dpr));
      canvas.style.width = `${size.width}px`;
      canvas.style.height = `${size.height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      stateRef.current = createY2kCanvasState();
    };

    resizeCanvas();

    const tick = (time: number) => {
      const state = stateRef.current;
      if (state) {
        const delta = time - lastTime;
        stepY2kCanvasState(state, delta, size.width, size.height);
        renderY2kCanvas(context, size.width, size.height, state);
      }

      lastTime = time;
      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [prefersReducedMotion, size.width, size.height]);

  if (prefersReducedMotion) {
    return (
      <div
        className={cn(
          "fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(248,113,113,0.08),transparent_55%)]",
          className,
        )}
        aria-hidden
      />
    );
  }

  return (
    <div className={cn("fixed inset-0", className)} aria-hidden>
      <canvas ref={canvasRef} className="h-full w-full" width={size.width} height={size.height} />
    </div>
  );
}
