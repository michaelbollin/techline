import type { TimelineEvent } from "./schema";
import { isEventSlug } from "./routing";

export type TimelineRoute = {
  filterPathKey: string;
  eventSlug: string | null;
};

export function parseTimelineRoute(
  pathname: string,
  fromQuery: string | null | undefined,
  events: readonly TimelineEvent[],
): TimelineRoute {
  const segment =
    pathname === "/" || pathname === ""
      ? null
      : decodeURIComponent(pathname.replace(/^\//, ""));

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
