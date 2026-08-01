"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";
import { TextWithAbbreviationTooltips } from "@/components/ui/text-with-abbreviation-tooltips";
import { TIMELINE_EDGE_MARGIN } from "@/lib/timeline/constants";
import type { PlottedEvent } from "@/lib/timeline/plot-data";

type TimelineEventDetailProps = {
  event: PlottedEvent;
  top: number;
  /** Max height in px — content taller than this is not shown. */
  maxHeight?: number;
  /** Parent-owned fit state; null while measuring. */
  fits: boolean | null;
  onFitsChange: (fits: boolean) => void;
};

export function TimelineEventDetail({
  event,
  top,
  maxHeight,
  fits,
  onFitsChange,
}: TimelineEventDetailProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const [textHeight, setTextHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const [revealedForId, setRevealedForId] = useState<string | null>(null);
  const revealed = revealedForId === event.id;
  const textMeasureKey = `${event.id}:${event.title}:${event.summary}`;

  useLayoutEffect(() => {
    const element = contentRef.current;
    if (!element) {
      return;
    }

    const updateMeasurements = () => {
      const textElement = textRef.current;
      if (textElement) {
        setTextHeight(textElement.offsetHeight);
      }

      if (maxHeight !== undefined) {
        const height = element.offsetHeight;
        const nextFits = height > 0 && height <= maxHeight;

        if (nextFits !== fits) {
          onFitsChange(nextFits);
        }
      }
    };

    updateMeasurements();

    const observer = new ResizeObserver(updateMeasurements);
    observer.observe(element);
    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => observer.disconnect();
  }, [event.id, event.imageUrl, event.summary, event.title, fits, maxHeight, onFitsChange, textMeasureKey]);

  if (maxHeight !== undefined && fits === false) {
    return null;
  }

  const isMeasuring = maxHeight !== undefined && fits === null;

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 z-10 text-left text-black",
        isMeasuring && "invisible",
      )}
      style={{
        top,
        maxHeight: isMeasuring ? undefined : maxHeight,
        paddingLeft: TIMELINE_EDGE_MARGIN,
        paddingRight: TIMELINE_EDGE_MARGIN,
      }}
      aria-hidden={isMeasuring}
      aria-live={isMeasuring ? undefined : "polite"}
    >
      <div
        ref={contentRef}
        key={event.id}
        className={cn(
          "max-w-2xl pl-4",
          revealed ? "timeline-detail-revealed" : "animate-timeline-detail-reveal",
        )}
        onAnimationEnd={() => setRevealedForId(event.id)}
      >
        <p className="m-0 text-xs font-medium tracking-widest uppercase">{event.dateLabel}</p>

        <div className="mt-1.5 flex items-start gap-4">
          {event.imageUrl && textHeight > 0 && (
            <Image
              src={event.imageUrl}
              alt=""
              width={320}
              height={240}
              className="max-w-[200px] w-auto object-contain"
              style={{ maxHeight: textHeight, height: "auto" }}
              unoptimized={event.imageUrl.endsWith(".svg")}
            />
          )}

          <div ref={textRef} className="min-w-0">
            <p className="text-xl leading-tight font-semibold tracking-tight">
              <TextWithAbbreviationTooltips text={event.title} interactive />
            </p>
            <p className="mt-2 max-w-xl text-base leading-normal">
              <TextWithAbbreviationTooltips text={event.summary} interactive />
            </p>
          </div>
        </div>

        {event.imageUrl && event.imageCaption && (
          <p className="mt-2 max-w-xl text-xs leading-snug opacity-30">{event.imageCaption}</p>
        )}
      </div>
    </div>
  );
}
