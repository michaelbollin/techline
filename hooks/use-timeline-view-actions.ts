import { useCallback } from "react";
import type * as d3 from "d3";

import { TIMELINE_EXTENT } from "@/lib/timeline/constants";
import type { FilterUpdater } from "@/hooks/use-timeline-filters";
import {
  canPanEarlier,
  canPanLater,
  computeFitTransform,
  computePanTransform,
  computeZoomToDecade,
  computeZoomToYear,
  decadeTimeRange,
  visibleInnerTimeRange,
} from "@/lib/timeline/zoom";

type UseTimelineViewActionsOptions = {
  width: number;
  transform: d3.ZoomTransform;
  plottedCount: number;
  animateTo: (transform: d3.ZoomTransform) => void;
  updateFilters: (updater: FilterUpdater) => void;
  onResetFilters: () => void;
};

export function useTimelineViewActions({
  width,
  transform,
  plottedCount,
  animateTo,
  updateFilters,
  onResetFilters,
}: UseTimelineViewActionsOptions) {
  const resetView = useCallback(() => {
    // #region agent log
    fetch("http://127.0.0.1:7352/ingest/5bfcc10a-fce2-49b9-8546-76ee58c2e162", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "db8903" },
      body: JSON.stringify({
        sessionId: "db8903",
        runId: "post-fix-4",
        hypothesisId: "H",
        location: "use-timeline-view-actions.ts:resetView",
        message: "resetView called",
        data: { stack: new Error().stack?.split("\n").slice(1, 5).join(" | ") },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion

    updateFilters(new Set());
    onResetFilters();

    if (width <= 0) {
      return;
    }

    animateTo(computeFitTransform(width, TIMELINE_EXTENT), "reset-view");
  }, [animateTo, onResetFilters, updateFilters, width]);

  const zoomToYear = useCallback(
    (year: number) => {
      if (width <= 0) {
        return;
      }

      animateTo(computeZoomToYear(width, TIMELINE_EXTENT, year));
    },
    [animateTo, width],
  );

  const zoomToDecade = useCallback(
    (decadeStart: number) => {
      if (width <= 0) {
        return;
      }

      const range = decadeTimeRange(decadeStart);
      const target = computeZoomToDecade(width, TIMELINE_EXTENT, decadeStart);
      const beforeRange = visibleInnerTimeRange(transform, width, TIMELINE_EXTENT);
      const afterRange = visibleInnerTimeRange(target, width, TIMELINE_EXTENT);
      const beforeSpanYears = (beforeRange[1] - beforeRange[0]) / (365.25 * 86_400_000);
      const afterSpanYears = (afterRange[1] - afterRange[0]) / (365.25 * 86_400_000);
      const scaleDeltaRatio = target.k / Math.max(transform.k, 1e-9);

      // #region agent log
      fetch("http://127.0.0.1:7352/ingest/5bfcc10a-fce2-49b9-8546-76ee58c2e162", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "db8903" },
        body: JSON.stringify({
          sessionId: "db8903",
          runId: "post-fix",
          hypothesisId: "A-B-E",
          location: "use-timeline-view-actions.ts:zoomToDecade",
          message: "decade zoom requested",
          data: {
            decadeStart,
            decadeRange: range,
            width,
            currentK: transform.k,
            currentX: transform.x,
            targetK: target.k,
            targetX: target.x,
            scaleDeltaRatio,
            beforeSpanYears,
            afterSpanYears,
            spanYearsDelta: beforeSpanYears - afterSpanYears,
          },
          timestamp: Date.now(),
        }),
      }).catch(() => {});
      // #endregion

      animateTo(target, "zoom-to-decade");
    },
    [animateTo, transform, width],
  );

  const panEarlier = useCallback(() => {
    if (width <= 0) {
      return;
    }

    animateTo(computePanTransform(transform, width, TIMELINE_EXTENT, "earlier"));
  }, [animateTo, transform, width]);

  const panLater = useCallback(() => {
    if (width <= 0) {
      return;
    }

    animateTo(computePanTransform(transform, width, TIMELINE_EXTENT, "later"));
  }, [animateTo, transform, width]);

  const showPanEarlier =
    width > 0 && plottedCount > 0 && canPanEarlier(transform, width, TIMELINE_EXTENT);
  const showPanLater =
    width > 0 && plottedCount > 0 && canPanLater(transform, width, TIMELINE_EXTENT);

  return {
    resetView,
    zoomToYear,
    zoomToDecade,
    panEarlier,
    panLater,
    showPanEarlier,
    showPanLater,
  };
}
