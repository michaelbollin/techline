import * as d3 from "d3";

import { TIMELINE_EXTENT, TIMELINE_YEAR_MAX, TIMELINE_YEAR_MIN } from "@/lib/timeline/constants";
import type { PlottedEvent } from "@/lib/timeline/plot-data";

import { MOBILE_TIMELINE_EDGE_MARGIN } from "./constants";

export function makeBaseScaleVertical(height: number, extent: [number, number]) {
  const margin = MOBILE_TIMELINE_EDGE_MARGIN;
  const innerHeight = Math.max(height - margin * 2, 1);
  return d3.scaleTime().domain(extent).range([margin, margin + innerHeight]);
}

export function computeTransformForTimeRangeVertical(
  height: number,
  extent: [number, number],
  visibleRange: [number, number],
): d3.ZoomTransform {
  const margin = MOBILE_TIMELINE_EDGE_MARGIN;
  const innerHeight = Math.max(height - margin * 2, 1);
  const base = makeBaseScaleVertical(height, extent);
  const [t0, t1] = visibleRange;
  const y0 = base(t0);
  const y1 = base(t1);
  const scale = innerHeight / Math.max(y1 - y0, 1);
  return d3.zoomIdentity.translate(0, margin - scale * y0).scale(scale);
}

export function computeFitTransformVertical(
  height: number,
  extent: [number, number],
): d3.ZoomTransform {
  return computeTransformForTimeRangeVertical(height, extent, extent);
}

export function yearTimeRange(year: number): [number, number] {
  const clampedYear = Math.min(Math.max(year, TIMELINE_YEAR_MIN), TIMELINE_YEAR_MAX);
  const start = Date.parse(`${clampedYear}-01-01T00:00:00Z`);
  const end = Date.parse(`${clampedYear}-12-31T23:59:59.999Z`);
  const [tMin, tMax] = TIMELINE_EXTENT;

  return [Math.max(start, tMin), Math.min(end, tMax)];
}

export function computeZoomToYearVertical(
  height: number,
  extent: [number, number],
  year: number,
): d3.ZoomTransform {
  return clampZoomTransformVertical(
    computeTransformForTimeRangeVertical(height, extent, yearTimeRange(year)),
    height,
    extent,
  );
}

export function visibleInnerTimeRangeVertical(
  transform: d3.ZoomTransform,
  height: number,
  extent: [number, number],
): [number, number] {
  const margin = MOBILE_TIMELINE_EDGE_MARGIN;
  const innerHeight = Math.max(height - margin * 2, 1);
  const yScale = transform.rescaleY(makeBaseScaleVertical(height, extent));
  return [yScale.invert(margin).getTime(), yScale.invert(margin + innerHeight).getTime()];
}

const PAN_EDGE_EPSILON_RATIO = 0.001;
const PAN_STEP_FRACTION = 0.8;

function panEdgeEpsilon(extent: [number, number]): number {
  return (extent[1] - extent[0]) * PAN_EDGE_EPSILON_RATIO;
}

export function canPanEarlierVertical(
  transform: d3.ZoomTransform,
  height: number,
  extent: [number, number],
): boolean {
  if (height <= 0) {
    return false;
  }

  const [t0] = visibleInnerTimeRangeVertical(transform, height, extent);
  return t0 > extent[0] + panEdgeEpsilon(extent);
}

export function canPanLaterVertical(
  transform: d3.ZoomTransform,
  height: number,
  extent: [number, number],
): boolean {
  if (height <= 0) {
    return false;
  }

  const [, t1] = visibleInnerTimeRangeVertical(transform, height, extent);
  return t1 < extent[1] - panEdgeEpsilon(extent);
}

export function computePanTransformVertical(
  transform: d3.ZoomTransform,
  height: number,
  extent: [number, number],
  direction: "earlier" | "later",
  fraction = PAN_STEP_FRACTION,
): d3.ZoomTransform {
  const [t0, t1] = visibleInnerTimeRangeVertical(transform, height, extent);
  const span = t1 - t0;
  const delta = span * fraction * (direction === "later" ? 1 : -1);

  return clampZoomTransformVertical(
    computeTransformForTimeRangeVertical(height, extent, [t0 + delta, t1 + delta]),
    height,
    extent,
  );
}

export function clampZoomTransformVertical(
  transform: d3.ZoomTransform,
  height: number,
  extent: [number, number],
): d3.ZoomTransform {
  if (height <= 0) {
    return transform;
  }

  const [tMin, tMax] = extent;
  const maxSpan = tMax - tMin;
  let [t0, t1] = visibleInnerTimeRangeVertical(transform, height, extent);
  const span = t1 - t0;

  if (span > maxSpan) {
    return computeFitTransformVertical(height, extent);
  }

  if (t0 >= tMin && t1 <= tMax) {
    return transform;
  }

  if (t0 < tMin) {
    t0 = tMin;
    t1 = tMin + span;
  }
  if (t1 > tMax) {
    t1 = tMax;
    t0 = tMax - span;
  }

  return computeTransformForTimeRangeVertical(height, extent, [t0, t1]);
}

export function computeZoomToEventsVertical(
  height: number,
  extent: [number, number],
  targets: PlottedEvent[],
  options?: { tight?: boolean },
): d3.ZoomTransform {
  if (targets.length === 0) {
    return computeFitTransformVertical(height, extent);
  }

  const times = targets.map((event) => event.timestamp);
  const t0 = Math.min(...times);
  const t1 = Math.max(...times);
  const msPerYear = 365.25 * 86_400_000;
  const span = Math.max(t1 - t0, 1);
  const minSpan = options?.tight ? msPerYear * 2 : msPerYear * 4;
  const edgePad = options?.tight
    ? Math.max(span * 0.08, msPerYear * 0.5)
    : Math.max(span * 0.15, msPerYear);

  let visibleT0 = t0 - edgePad;
  let visibleT1 = t1 + edgePad;

  if (span < msPerYear * 0.1) {
    const mid = (t0 + t1) / 2;
    visibleT0 = mid - minSpan / 2;
    visibleT1 = mid + minSpan / 2;
  } else if (visibleT1 - visibleT0 < minSpan) {
    const mid = (visibleT0 + visibleT1) / 2;
    visibleT0 = mid - minSpan / 2;
    visibleT1 = mid + minSpan / 2;
  }

  return clampZoomTransformVertical(
    computeTransformForTimeRangeVertical(height, extent, [
      Math.max(visibleT0, extent[0]),
      Math.min(visibleT1, extent[1]),
    ]),
    height,
    extent,
  );
}

/** Keep zoom panning/scaling on the vertical axis only. */
export function verticalZoomTransform(transform: d3.ZoomTransform): d3.ZoomTransform {
  return d3.zoomIdentity.translate(0, transform.y).scale(transform.k);
}
