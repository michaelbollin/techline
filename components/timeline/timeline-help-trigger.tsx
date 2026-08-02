"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { TIMELINE_DESKTOP_MEDIA_QUERY, useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/cn";
import { getTimelineHelpTips } from "@/lib/timeline/help-tips";

function HelpIcon() {
  return (
    <span className="font-mono text-base leading-none font-semibold" aria-hidden>
      ?
    </span>
  );
}

type TimelineHelpTriggerProps = {
  /** When true, closes the popover and stacks below filter chrome (e.g. open filter sidebar). */
  suppressed?: boolean;
};

export function TimelineHelpTrigger({ suppressed = false }: TimelineHelpTriggerProps) {
  const isDesktop = useMediaQuery(TIMELINE_DESKTOP_MEDIA_QUERY);
  const tips = getTimelineHelpTips(isDesktop);
  const [open, setOpen] = useState(false);
  const [prevSuppressed, setPrevSuppressed] = useState(suppressed);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  if (suppressed !== prevSuppressed) {
    setPrevSuppressed(suppressed);
    if (suppressed) {
      setOpen(false);
    }
  }

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (document.querySelector('[role="dialog"][aria-modal="true"]')) {
          return;
        }

        event.preventDefault();
        close();
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      const root = rootRef.current;
      if (!root || root.contains(event.target as Node)) {
        return;
      }

      close();
    };

    document.addEventListener("keydown", onKeyDown, true);
    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [close, open]);

  return (
    <div ref={rootRef} className="relative">
      <Button
        variant="icon"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label="How to use the timeline"
        onClick={() => {
          if (!suppressed) {
            setOpen((value) => !value);
          }
        }}
      >
        <HelpIcon />
      </Button>

      {open && (
        <div
          id={panelId}
          role="region"
          aria-label="Timeline controls"
          className={cn(
            "absolute top-full right-0 z-50 mt-2 w-[min(16rem,calc(100vw-3rem))]",
            "rounded-xl border border-black bg-white px-3 py-2.5",
            "shadow-[0_6px_20px_rgba(0,0,0,0.1)]",
          )}
        >
          <p className="mb-2 font-mono text-[0.65rem] font-semibold tracking-wide text-muted uppercase">
            How to explore
          </p>
          <ul className="space-y-1.5 text-sm leading-snug text-black">
            {tips.map((tip) => (
              <li key={tip.id} className="flex gap-2">
                <span className="text-muted" aria-hidden>
                  ·
                </span>
                <span>{tip.text}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
