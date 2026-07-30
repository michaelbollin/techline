"use client";

import { useEffect, useRef } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import {
  createGitBranchesCanvasState,
  renderGitBranchesCanvas,
  stepGitBranchesCanvasState,
  type GitBranchesCanvasState,
} from "@/lib/animations/git-branches";
import { cn } from "@/lib/cn";

type GitBranchesAnimationProps = {
  className?: string;
};

export function GitBranchesAnimation({ className }: GitBranchesAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<GitBranchesCanvasState | null>(null);
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

      stateRef.current = createGitBranchesCanvasState(width, height);
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
        state.width = width;
        state.height = height;
        stepGitBranchesCanvasState(state, time - lastTime);
        renderGitBranchesCanvas(context, width, height, state);
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
          "absolute inset-0 bg-[linear-gradient(90deg,rgba(63,185,80,0.05)_1px,transparent_1px)] bg-size-[12%_100%]",
          className,
        )}
        aria-hidden
      />
    );
  }

  return <canvas ref={canvasRef} className={cn("absolute inset-0 h-full w-full", className)} aria-hidden />;
}
