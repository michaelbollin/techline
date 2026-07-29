"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";
import { TIMELINE_EDGE_MARGIN } from "@/lib/timeline/constants";
import type { PlottedEvent } from "@/lib/timeline/plot-data";

type TimelineEventDetailProps = {
  event: PlottedEvent;
  top: number;
};

function useMeasuredHeight<T extends HTMLElement>(dependencyKey: string) {
  const ref = useRef<T>(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const updateHeight = () => {
      setHeight(element.offsetHeight);
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(element);

    return () => observer.disconnect();
  }, [dependencyKey]);

  return { ref, height };
}

export function TimelineEventDetail({ event, top }: TimelineEventDetailProps) {
  const textBlock = useMeasuredHeight<HTMLDivElement>(`${event.id}:${event.title}:${event.summary}`);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    setRevealed(false);
  }, [event.id]);

  return (
    <div
      className="pointer-events-none absolute inset-x-0 z-10 text-left text-black"
      style={{ top, paddingLeft: TIMELINE_EDGE_MARGIN, paddingRight: TIMELINE_EDGE_MARGIN }}
      aria-live="polite"
    >
      <div
        key={event.id}
        className={cn(
          "max-w-2xl pl-4",
          revealed ? "timeline-detail-revealed" : "animate-timeline-detail-reveal",
        )}
        onAnimationEnd={() => setRevealed(true)}
      >
        <p className="m-0 text-xs font-medium tracking-widest uppercase">{event.dateLabel}</p>

        <div className="mt-1.5 flex items-start gap-4">
          {event.imageUrl && textBlock.height > 0 && (
            <Image
              src={event.imageUrl}
              alt=""
              width={320}
              height={240}
              className="max-w-[200px] w-auto object-contain"
              style={{ maxHeight: textBlock.height, height: "auto" }}
              unoptimized={event.imageUrl.endsWith(".svg")}
            />
          )}

          <div ref={textBlock.ref} className="min-w-0">
            <p className="text-xl leading-tight font-semibold tracking-tight">{event.title}</p>
            <p className="mt-2 max-w-xl text-base leading-normal">{event.summary}</p>
          </div>
        </div>

        {event.imageUrl && event.imageCaption && (
          <p className="mt-2 max-w-xl text-xs leading-snug opacity-30">{event.imageCaption}</p>
        )}
      </div>
    </div>
  );
}
