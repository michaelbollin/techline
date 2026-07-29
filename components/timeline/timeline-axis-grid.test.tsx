import * as d3 from "d3";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { axisYAt } from "@/lib/timeline/axis-path";
import { TIMELINE_EXTENT } from "@/lib/timeline/constants";
import { makeBaseScale, computeFitTransform } from "@/lib/timeline/zoom";
import { TimelineAxisGrid } from "./timeline-axis-grid";

describe("TimelineAxisGrid", () => {
  const width = 1200;
  const baseScale = makeBaseScale(width, TIMELINE_EXTENT);
  const transform = computeFitTransform(width, TIMELINE_EXTENT);
  const xScale = transform.rescaleX(baseScale);
  const getAxisY = (x: number) => axisYAt(x, 320);

  it("renders axis tick labels within the timeline extent", () => {
    render(
      <svg width={width} height={400}>
        <TimelineAxisGrid
          xScale={xScale}
          width={width}
          getAxisY={getAxisY}
          onYearClick={() => {}}
        />
      </svg>,
    );

    expect(screen.getAllByText(/\d{4}/).length).toBeGreaterThan(0);
  });

  it("calls onYearClick for zoomable year ticks", async () => {
    const user = userEvent.setup();
    const onYearClick = vi.fn();
    const focusedScale = d3
      .scaleTime()
      .domain([new Date("1998-01-01T00:00:00Z"), new Date("2002-01-01T00:00:00Z")])
      .range([0, width]);

    const { container } = render(
      <svg width={width} height={400}>
        <TimelineAxisGrid
          xScale={focusedScale}
          width={width}
          getAxisY={getAxisY}
          onYearClick={onYearClick}
        />
      </svg>,
    );

    const hitTarget = container.querySelector("rect.cursor-pointer");
    expect(hitTarget).toBeTruthy();
    await user.click(hitTarget!);

    expect(onYearClick).toHaveBeenCalledOnce();
    expect(onYearClick.mock.calls[0]?.[0]).toBeGreaterThanOrEqual(1998);
    expect(onYearClick.mock.calls[0]?.[0]).toBeLessThanOrEqual(2002);
  });
});
