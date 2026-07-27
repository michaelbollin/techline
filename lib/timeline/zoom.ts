import * as d3 from "d3";

import { TIMELINE_EDGE_MARGIN, TIMELINE_EXTENT, TIMELINE_YEAR_MAX, TIMELINE_YEAR_MIN } from "./constants";
import type { PlottedEvent } from "./plot-data";

export function makeBaseScale(width: number, extent: [number, number]) {
  const margin = TIMELINE_EDGE_MARGIN;
  const innerWidth = Math.max(width - margin * 2, 1);
  return d3.scaleTime().domain(extent).range([margin, margin + innerWidth]);
}

export function computeTransformForTimeRange(
  width: number,
  extent: [number, number],
  visibleRange: [number, number],
): d3.ZoomTransform {
  const margin = TIMELINE_EDGE_MARGIN;
  const innerWidth = Math.max(width - margin * 2, 1);
  const base = makeBaseScale(width, extent);
  const [t0, t1] = visibleRange;
  const x0 = base(t0);
  const x1 = base(t1);
  const scale = innerWidth / Math.max(x1 - x0, 1);
  return d3.zoomIdentity.translate(margin - scale * x0, 0).scale(scale);
}

export function computeFitTransform(
  width: number,
  extent: [number, number],
): d3.ZoomTransform {
  return computeTransformForTimeRange(width, extent, extent);
}

export function yearTimeRange(year: number): [number, number] {
  const clampedYear = Math.min(Math.max(year, TIMELINE_YEAR_MIN), TIMELINE_YEAR_MAX);
  const start = Date.parse(`${clampedYear}-01-01T00:00:00Z`);
  const end = Date.parse(`${clampedYear}-12-31T23:59:59.999Z`);
  const [tMin, tMax] = TIMELINE_EXTENT;

  return [Math.max(start, tMin), Math.min(end, tMax)];
}

export function computeZoomToYear(
  width: number,
  extent: [number, number],
  year: number,
): d3.ZoomTransform {
  return clampZoomTransform(
    computeTransformForTimeRange(width, extent, yearTimeRange(year)),
    width,
    extent,
  );
}

export function visibleInnerTimeRange(
  transform: d3.ZoomTransform,
  width: number,
  extent: [number, number],
): [number, number] {
  const margin = TIMELINE_EDGE_MARGIN;
  const innerWidth = Math.max(width - margin * 2, 1);
  const xScale = transform.rescaleX(makeBaseScale(width, extent));
  return [xScale.invert(margin).getTime(), xScale.invert(margin + innerWidth).getTime()];
}

const PAN_EDGE_EPSILON_RATIO = 0.001;
const PAN_STEP_FRACTION = 0.8;

function panEdgeEpsilon(extent: [number, number]): number {
  return (extent[1] - extent[0]) * PAN_EDGE_EPSILON_RATIO;
}

export function canPanEarlier(
  transform: d3.ZoomTransform,
  width: number,
  extent: [number, number],
): boolean {
  if (width <= 0) {
    return false;
  }

  const [t0] = visibleInnerTimeRange(transform, width, extent);
  return t0 > extent[0] + panEdgeEpsilon(extent);
}

export function canPanLater(
  transform: d3.ZoomTransform,
  width: number,
  extent: [number, number],
): boolean {
  if (width <= 0) {
    return false;
  }

  const [, t1] = visibleInnerTimeRange(transform, width, extent);
  return t1 < extent[1] - panEdgeEpsilon(extent);
}

export function computePanTransform(
  transform: d3.ZoomTransform,
  width: number,
  extent: [number, number],
  direction: "earlier" | "later",
  fraction = PAN_STEP_FRACTION,
): d3.ZoomTransform {
  const [t0, t1] = visibleInnerTimeRange(transform, width, extent);
  const span = t1 - t0;
  const delta = span * fraction * (direction === "later" ? 1 : -1);

  return clampZoomTransform(
    computeTransformForTimeRange(width, extent, [t0 + delta, t1 + delta]),
    width,
    extent,
  );
}

export function clampZoomTransform(
  transform: d3.ZoomTransform,
  width: number,
  extent: [number, number],
): d3.ZoomTransform {
  if (width <= 0) {
    return transform;
  }

  const [tMin, tMax] = extent;
  const maxSpan = tMax - tMin;
  let [t0, t1] = visibleInnerTimeRange(transform, width, extent);
  const span = t1 - t0;

  if (span > maxSpan) {
    return computeFitTransform(width, extent);
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

  return computeTransformForTimeRange(width, extent, [t0, t1]);
}

export function computeZoomToEvents(
  width: number,
  extent: [number, number],
  targets: PlottedEvent[],
  options?: { tight?: boolean },
): d3.ZoomTransform {
  if (targets.length === 0) {
    return computeFitTransform(width, extent);
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

  return clampZoomTransform(
    computeTransformForTimeRange(width, extent, [
      Math.max(visibleT0, extent[0]),
      Math.min(visibleT1, extent[1]),
    ]),
    width,
    extent,
  );
}
