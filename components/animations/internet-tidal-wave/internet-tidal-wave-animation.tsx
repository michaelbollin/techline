"use client";

import { useEffect, useRef } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  createTidalWaveCanvasState,
  renderTidalWaveCanvas,
  stepTidalWaveCanvasState,
  type TidalWaveCanvasState,
} from "@/lib/animations/internet-tidal-wave";
import { cn } from "@/lib/cn";

type InternetTidalWaveAnimationProps = {
  className?: string;
};

export function InternetTidalWaveAnimation({ className }: InternetTidalWaveAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<TidalWaveCanvasState | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

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

      stateRef.current = createTidalWaveCanvasState();
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
        stepTidalWaveCanvasState(state, time - lastTime);
        renderTidalWaveCanvas(context, width, height, state);
      }

      lastTime = time;
      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <div
        className={cn(
          "absolute inset-0 bg-[linear-gradient(180deg,rgba(56,189,248,0.08),transparent_45%)]",
          className,
        )}
        aria-hidden
      />
    );
  }

  return <canvas ref={canvasRef} className={cn("absolute inset-0 h-full w-full", className)} aria-hidden />;
}
