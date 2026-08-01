"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";
import {
  hasSeenTimelinePinchHint,
  markTimelinePinchHintSeen,
} from "@/lib/timeline/pinch-hint-storage";

type MobileTimelinePinchHintProps = {
  chartReady: boolean;
  zoomScale: number;
};

export function MobileTimelinePinchHint({ chartReady, zoomScale }: MobileTimelinePinchHintProps) {
  const [visible, setVisible] = useState(false);
  const initialScaleRef = useRef<number | null>(null);

  const dismiss = useCallback(() => {
    markTimelinePinchHintSeen();
    setVisible(false);
  }, []);

  useEffect(() => {
    if (!chartReady || hasSeenTimelinePinchHint()) {
      return;
    }

    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, [chartReady]);

  useEffect(() => {
    if (!visible) {
      initialScaleRef.current = null;
      return;
    }

    if (initialScaleRef.current === null) {
      initialScaleRef.current = zoomScale;
      return;
    }

    if (Math.abs(zoomScale - initialScaleRef.current) > 0.01) {
      dismiss();
    }
  }, [dismiss, visible, zoomScale]);

  if (!visible) {
    return null;
  }

  return (
    <div
      className={cn(
        "absolute top-[calc(3.75rem+20px)] right-6 z-20 flex max-w-[calc(100vw-3rem)] items-center gap-3",
        "rounded-2xl bg-neutral-100 py-2.5 pr-2 pl-3 shadow-[0_4px_14px_rgba(0,0,0,0.06)]",
        "animate-timeline-pinch-hint-enter",
      )}
      role="status"
      aria-live="polite"
    >
      <Image
        src="/icons/pinch-zoom.png"
        alt=""
        width={36}
        height={36}
        className="h-9 w-9 shrink-0"
        aria-hidden
      />
      <span className="text-sm leading-none font-medium tracking-tight text-black">Pinch to zoom</span>
      <button
        type="button"
        onClick={dismiss}
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-lg leading-none text-black/60 hover:bg-black/5 hover:text-black"
        aria-label="Close pinch hint"
      >
        ×
      </button>
    </div>
  );
}
