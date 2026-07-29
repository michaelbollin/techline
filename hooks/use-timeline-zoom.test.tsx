import * as d3 from "d3";
import { act, renderHook, waitFor } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it } from "vitest";

import { TIMELINE_EXTENT } from "@/lib/timeline/constants";
import { computeFitTransform } from "@/lib/timeline/zoom";
import { useTimelineZoom } from "./use-timeline-zoom";

function attachSvgRef(width: number, height: number) {
  const svgRef = createRef<SVGSVGElement>();
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", String(width));
  svg.setAttribute("height", String(height));
  (svgRef as { current: SVGSVGElement }).current = svg;
  document.body.appendChild(svg);
  return { svgRef, svg };
}

describe("useTimelineZoom", () => {
  it("initializes d3 zoom on the svg element", async () => {
    const { svgRef, svg } = attachSvgRef(1200, 800);

    const { result } = renderHook(() =>
      useTimelineZoom({ width: 1200, height: 800, svgRef }),
    );

    await waitFor(() => {
      expect(result.current.transform.k).toBeGreaterThan(0);
    });

    document.body.removeChild(svg);
  });

  it("sets transform directly when animateTo is called without zoom behavior", () => {
    const svgRef = createRef<SVGSVGElement>();
    const next = computeFitTransform(900, TIMELINE_EXTENT);

    const { result } = renderHook(() =>
      useTimelineZoom({ width: 900, height: 600, svgRef }),
    );

    act(() => {
      result.current.animateTo(next);
    });

    expect(result.current.transform.k).toBeCloseTo(next.k, 4);
  });

  it("does not attach zoom when width is zero", () => {
    const { svgRef, svg } = attachSvgRef(1200, 800);

    const { result } = renderHook(() =>
      useTimelineZoom({ width: 0, height: 800, svgRef }),
    );

    expect(d3.select(svg).on("zoom")).toBeNull();
    expect(result.current.transform).toBeDefined();

    document.body.removeChild(svg);
  });
});
