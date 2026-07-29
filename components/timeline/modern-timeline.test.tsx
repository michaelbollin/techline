import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { makeTimelineEvent } from "@/test/fixtures/timeline-event";
import { ModernTimeline } from "./modern-timeline";

vi.mock("@/hooks/use-container-size", () => ({
  useContainerSize: () => ({ width: 1200, height: 800 }),
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
    expect(screen.getByRole("button", { name: "First event, January 15, 2000" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /open filters/i }));
    expect(screen.getByRole("dialog", { name: /filters/i })).toBeInTheDocument();
  });

  it("shows empty state when filters exclude all events", async () => {
    const user = userEvent.setup();
    const events = [makeTimelineEvent({ tags: ["ai"] })];

    render(<ModernTimeline events={events} filterPathKey="web" />);

    expect(screen.getByText("No events match the selected filters.")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /open filters/i }));
    expect(screen.getByRole("dialog", { name: /filters/i })).toBeInTheDocument();
  });
});
