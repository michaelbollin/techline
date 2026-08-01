"use client";

import { useCallback, useEffect, useState, type RefObject } from "react";

import { cn } from "@/lib/cn";
import {
  hasSeenTimelinePinchHint,
  markTimelinePinchHintSeen,
} from "@/lib/timeline/pinch-hint-storage";

const AUTO_DISMISS_MS = 5000;

type MobileTimelinePinchHintProps = {
  svgRef: RefObject<SVGSVGElement | null>;
  chartReady: boolean;
};

function PinchIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden className="mx-auto">
      <circle cx="20" cy="28" r="5" fill="currentColor" className="origin-center animate-timeline-pinch-left" />
      <circle cx="36" cy="28" r="5" fill="currentColor" className="origin-center animate-timeline-pinch-right" />
      <path
        d="M12 20c2-4 6-6 8-6M44 20c-2-4-6-6-8-6M12 36c2 4 6 6 8 6M44 36c-2 4-6 6-8 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="opacity-40"
      />
    </svg>
  );
}

export function MobileTimelinePinchHint({ svgRef, chartReady }: MobileTimelinePinchHintProps) {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);

  const dismiss = useCallback(() => {
    markTimelinePinchHintSeen();
    setFading(true);
    window.setTimeout(() => setVisible(false), 220);
  }, []);

  useEffect(() => {
    if (!chartReady || hasSeenTimelinePinchHint()) {
      return;
    }

    const frame = requestAnimationFrame(() => setVisible(true));
    const timeout = window.setTimeout(dismiss, AUTO_DISMISS_MS);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, [chartReady, dismiss]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || !visible) {
      return;
    }

    const onPinchStart = (event: TouchEvent) => {
      if (event.touches.length >= 2) {
        dismiss();
      }
    };

    svg.addEventListener("touchstart", onPinchStart, { passive: true });

    return () => svg.removeEventListener("touchstart", onPinchStart);
  }, [dismiss, svgRef, visible]);

  if (!visible) {
    return null;
  }

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-6",
        fading && "opacity-0 transition-opacity duration-200",
      )}
      aria-live="polite"
    >
      <button
        type="button"
        onClick={dismiss}
        className={cn(
          "pointer-events-auto flex max-w-xs flex-col items-center gap-3 rounded-2xl border border-black",
          "bg-white/95 px-6 py-5 text-center shadow-[0_10px_30px_rgba(0,0,0,0.12)]",
          "animate-timeline-pinch-hint-enter",
        )}
        aria-label="Dismiss pinch to zoom hint"
      >
        <PinchIcon />
        <p className="m-0 text-sm font-medium tracking-tight text-black">Pinch to zoom the timeline</p>
      </button>
    </div>
  );
}
