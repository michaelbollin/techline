import * as d3 from "d3";
import { useCallback, useEffect, useRef, useState } from "react";

import { TIMELINE_EXTENT, TIMELINE_TRANSITION_MS, TIMELINE_ZOOM_MAX_SCALE } from "@/lib/timeline/constants";
import {
  clampZoomTransform,
  computeFitTransform,
} from "@/lib/timeline/zoom";

type UseTimelineZoomOptions = {
  width: number;
  height: number;
  svgRef: React.RefObject<SVGSVGElement | null>;
};

export function useTimelineZoom({ width, height, svgRef }: UseTimelineZoomOptions) {
  const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);
  const hasInitialized = useRef(false);

  const [transform, setTransform] = useState<d3.ZoomTransform>(() =>
    computeFitTransform(1200, TIMELINE_EXTENT),
  );

  const transformRef = useRef(transform);
  transformRef.current = transform;

  const animateTo = useCallback(
    (next: d3.ZoomTransform, source = "unknown") => {
      const clamped = clampZoomTransform(next, width, TIMELINE_EXTENT);
      const minScale = computeFitTransform(width, TIMELINE_EXTENT).k;
      const scaleClampedByMin = clamped.k <= minScale + 1e-6 && next.k < minScale - 1e-6;
      const scaleClampedByMax = clamped.k >= TIMELINE_ZOOM_MAX_SCALE - 1e-6 && next.k > TIMELINE_ZOOM_MAX_SCALE + 1e-6;
      const current = transformRef.current;

      // #region agent log
      fetch("http://127.0.0.1:7352/ingest/5bfcc10a-fce2-49b9-8546-76ee58c2e162", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "db8903" },
        body: JSON.stringify({
          sessionId: "db8903",
          runId: "post-fix-4",
          hypothesisId: "F-G",
          location: "use-timeline-zoom.ts:animateTo",
          message: "animateTo called",
          data: {
            source,
            nextK: next.k,
            nextX: next.x,
            clampedK: clamped.k,
            clampedX: clamped.x,
            minScale,
            maxScale: TIMELINE_ZOOM_MAX_SCALE,
            scaleClampedByMin,
            scaleClampedByMax,
            kDelta: clamped.k - current.k,
            xDelta: clamped.x - current.x,
            hasZoomBehavior: Boolean(svgRef.current && zoomRef.current),
          },
          timestamp: Date.now(),
        }),
      }).catch(() => {});
      // #endregion

      const svg = svgRef.current;
      const zoom = zoomRef.current;
      if (!svg || !zoom) {
        setTransform(clamped);
        return;
      }

      d3.select(svg)
        .interrupt()
        .transition()
        .duration(TIMELINE_TRANSITION_MS)
        .ease(d3.easeCubicOut)
        .call(zoom.transform, clamped)
        .on("end", () => {
          const node = svgRef.current;
          const activeZoom = zoomRef.current;
          if (!node || !activeZoom) {
            return;
          }

          const final = clampZoomTransform(d3.zoomTransform(node), width, TIMELINE_EXTENT);
          setTransform(final);
          if (
            Math.abs(final.k - d3.zoomTransform(node).k) > 1e-6 ||
            Math.abs(final.x - d3.zoomTransform(node).x) > 0.5
          ) {
            d3.select(node).call(activeZoom.transform, final);
          }
        });
    },
    [svgRef, width],
  );

  useEffect(() => {
    if (width <= 0 || !svgRef.current) {
      return;
    }

    const svg = d3.select(svgRef.current);
    const minScale = computeFitTransform(width, TIMELINE_EXTENT).k;
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([minScale, TIMELINE_ZOOM_MAX_SCALE])
      .translateExtent([
        [-width * 3, 0],
        [width * 4, height],
      ])
      .wheelDelta((event) => -event.deltaY * (event.deltaMode === 1 ? 0.05 : 0.002))
      .on("zoom", (event) => {
        if (!event.sourceEvent) {
          setTransform(event.transform);
          return;
        }

        const clamped = clampZoomTransform(event.transform, width, TIMELINE_EXTENT);
        const needsRedirect =
          Math.abs(clamped.x - event.transform.x) > 0.5 ||
          Math.abs(clamped.k - event.transform.k) > 1e-6;

        if (needsRedirect) {
          svg.call(zoom.transform, clamped);
          return;
        }

        setTransform(clamped);
      });

    zoomRef.current = zoom;
    svg.call(zoom);

    const preserved = hasInitialized.current;
    const target = preserved
      ? transformRef.current
      : computeFitTransform(width, TIMELINE_EXTENT);
    const applied = clampZoomTransform(target, width, TIMELINE_EXTENT);
    svg.call(zoom.transform, applied);
    setTransform(applied);
    hasInitialized.current = true;

    // #region agent log
    fetch("http://127.0.0.1:7352/ingest/5bfcc10a-fce2-49b9-8546-76ee58c2e162", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "db8903" },
      body: JSON.stringify({
        sessionId: "db8903",
        runId: "post-fix-4",
        hypothesisId: "F",
        location: "use-timeline-zoom.ts:bindZoom",
        message: "zoom behavior rebound",
        data: {
          width,
          height,
          appliedK: applied.k,
          appliedX: applied.x,
          preserved,
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion

    return () => {
      svg.on(".zoom", null);
      zoomRef.current = null;
    };
  }, [height, svgRef, width]);

  return { transform, animateTo };
}
