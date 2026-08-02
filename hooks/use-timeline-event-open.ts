"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { eventPath } from "@/lib/timeline/format";
import type { PlottedEvent } from "@/lib/timeline/plot-data";

function pathSegment(pathname: string): string | null {
  if (pathname === "/" || pathname === "") {
    return null;
  }

  const raw = pathname.replace(/^\//, "");

  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

export function useTimelineEventOpen(filterPathKey: string) {
  const router = useRouter();
  const pathname = usePathname();
  const [pendingSlug, setPendingSlug] = useState<string | null>(null);
  const currentSegment = pathSegment(pathname);
  const [trackedSegment, setTrackedSegment] = useState(currentSegment);

  if (currentSegment !== trackedSegment) {
    setTrackedSegment(currentSegment);
    if (pendingSlug !== null && currentSegment === pendingSlug) {
      setPendingSlug(null);
    }
  }

  const openEvent = useCallback(
    (event: PlottedEvent) => {
      setPendingSlug(event.slug);
      router.push(eventPath(event.slug, { filterPathKey }), { scroll: false });
    },
    [filterPathKey, router],
  );

  const isEventOpening = useCallback(
    (event: PlottedEvent) =>
      pendingSlug === event.slug && currentSegment !== event.slug,
    [pendingSlug, currentSegment],
  );

  return { openEvent, isEventOpening };
}
