import type { TimelineEvent } from "./schema";
import { isEventSlug } from "./routing";

export type TimelineRoute = {
  filterPathKey: string;
  eventSlug: string | null;
};

function decodePathSegment(pathname: string): string | null {
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

export function parseTimelineRoute(
  pathname: string,
  fromQuery: string | null | undefined,
  events: readonly TimelineEvent[],
): TimelineRoute {
  const segment = decodePathSegment(pathname);

  if (segment && isEventSlug(segment, events)) {
    return {
      filterPathKey: fromQuery?.trim() ?? "",
      eventSlug: segment,
    };
  }

  return {
    filterPathKey: segment ?? "",
    eventSlug: null,
  };
}
