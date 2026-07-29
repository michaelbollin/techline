import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { axisYAt } from "@/lib/timeline/axis-path";
import { makePlottedEvent } from "@/test/fixtures/plotted-event";
import { TimelineNodeStem } from "./timeline-node-stem";

describe("TimelineNodeStem", () => {
  it("renders a stem line between axis and label lane", () => {
    const event = makePlottedEvent();
    const xScale = () => 300;
    const getAxisY = (x: number) => axisYAt(x, 320);
    const layout = { showLabel: true, lane: 1, width: 120 };

    const { container } = render(
      <svg>
        <TimelineNodeStem
          event={event}
          xScale={xScale}
          getAxisY={getAxisY}
          layout={layout}
          stemStartY={-8}
        />
      </svg>,
    );

    const line = container.querySelector("line");
    expect(line).toBeTruthy();
    expect(line?.getAttribute("x1")).toBe("300");
    expect(line?.getAttribute("x2")).toBe("300");
  });
});
