import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { axisYAt } from "@/lib/timeline/axis-path";
import { makePlottedEvent } from "@/test/fixtures/plotted-event";
import { TimelineNodeLabel } from "./timeline-node-label";

describe("TimelineNodeLabel", () => {
  const event = makePlottedEvent({ title: "Python 2.0", dateLabel: "October 16, 2000" });
  const xScale = () => 400;
  const getAxisY = (x: number) => axisYAt(x, 320);
  const layout = { showLabel: true, lane: 0, width: 140 };

  it("renders label content and handles click", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <svg>
        <TimelineNodeLabel
          event={event}
          xScale={xScale}
          getAxisY={getAxisY}
          layout={layout}
          viewportWidth={1200}
          isHovered={false}
          onHover={() => {}}
          onClick={onClick}
        />
      </svg>,
    );

    await user.click(screen.getByRole("button", { name: "Python 2.0, October 16, 2000" }));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByText("Python 2.0")).toBeInTheDocument();
  });

  it("shows underline decoration when hovered without expanded content", () => {
    const { container } = render(
      <svg>
        <TimelineNodeLabel
          event={event}
          xScale={xScale}
          getAxisY={getAxisY}
          layout={layout}
          viewportWidth={1200}
          isHovered
          onHover={() => {}}
          onClick={() => {}}
        />
      </svg>,
    );

    expect(container.querySelector("line")).toBeTruthy();
  });

  it("grows the pill in place when expanded on hover", () => {
    const { container } = render(
      <svg>
        <TimelineNodeLabel
          event={event}
          xScale={xScale}
          getAxisY={getAxisY}
          layout={layout}
          viewportWidth={1200}
          isHovered
          expanded
          onHover={() => {}}
          onClick={() => {}}
        />
      </svg>,
    );

    expect(container.querySelector("foreignObject")).toBeTruthy();
    expect(container.querySelector("line")).toBeNull();
    expect(screen.getByRole("button", { name: "Read more" })).toBeInTheDocument();
  });

  it("opens the event when Read more is clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <svg>
        <TimelineNodeLabel
          event={event}
          xScale={xScale}
          getAxisY={getAxisY}
          layout={layout}
          viewportWidth={1200}
          isHovered
          expanded
          onHover={() => {}}
          onClick={onClick}
        />
      </svg>,
    );

    await user.click(screen.getByRole("button", { name: "Read more" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("clears hover when pointer leaves expanded bubble", async () => {
    const user = userEvent.setup();
    const onHover = vi.fn();

    render(
      <svg>
        <TimelineNodeLabel
          event={event}
          xScale={xScale}
          getAxisY={getAxisY}
          layout={layout}
          viewportWidth={1200}
          isHovered
          expanded
          onHover={onHover}
          onClick={() => {}}
        />
      </svg>,
    );

    const label = screen.getByRole("button", { name: "Python 2.0, October 16, 2000" });
    await user.hover(label);
    expect(onHover).toHaveBeenCalledWith(event);

    await user.unhover(label);
    expect(onHover).toHaveBeenCalledWith(null);
  });
});
