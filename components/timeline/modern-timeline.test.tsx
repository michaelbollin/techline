import * as d3 from "d3";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { makeTimelineEvent } from "@/test/fixtures/timeline-event";
import { ModernTimeline } from "./modern-timeline";

vi.mock("@/hooks/use-container-size", () => ({
  useContainerSize: () => ({ width: 1200, height: 800 }),
}));

vi.mock("@/hooks/use-timeline-zoom", () => ({
  useTimelineZoom: () => ({
    transform: d3.zoomIdentity,
    animateTo: vi.fn(),
  }),
}));

const push = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push, replace: vi.fn(), back: vi.fn() }),
}));

describe("ModernTimeline", () => {
  it("renders timeline chrome and plotted events", async () => {
    const user = userEvent.setup();
    const events = [
      makeTimelineEvent({ id: "evt-1", slug: "first-event", title: "First event", importance: 0 }),
    ];

    render(<ModernTimeline events={events} />);

    expect(screen.getByRole("region", { name: "Interactive timeline" })).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: "First event, January 15, 2000" }).length).toBeGreaterThan(0);

    await user.click(screen.getByRole("button", { name: "Filters" }));
    expect(screen.getByRole("region", { name: "Filter timeline events" })).toBeInTheDocument();
  });

  it("shows empty state when filters exclude all events", async () => {
    const user = userEvent.setup();
    const events = [makeTimelineEvent({ tags: ["ai"] })];

    render(<ModernTimeline events={events} filterPathKey="web" />);

    expect(screen.getByText("No events match the selected filters.")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Filters, 1 active" }));
    expect(screen.getByRole("region", { name: "Filter timeline events" })).toBeInTheDocument();
  });
});
