import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { makeTimelineEvent } from "@/test/fixtures/timeline-event";
import { MobileTimeline } from "./mobile-timeline";

vi.mock("@/hooks/use-container-size", () => ({
  useContainerSize: () => ({ width: 390, height: 800 }),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), back: vi.fn() }),
}));

describe("MobileTimeline", () => {
  it("renders mobile timeline with plotted events", async () => {
    const user = userEvent.setup();
    const events = [
      makeTimelineEvent({ id: "mobile-1", slug: "mobile-event", title: "Mobile event", importance: 0 }),
    ];

    render(<MobileTimeline events={events} />);

    expect(screen.getByRole("region", { name: "Interactive timeline" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Mobile event, January 15, 2000" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /open filters/i }));
    expect(screen.getByRole("dialog", { name: /filters/i })).toBeInTheDocument();
  });

  it("shows empty state when filters exclude all events", () => {
    const events = [makeTimelineEvent({ tags: ["ai"] })];

    render(<MobileTimeline events={events} filterPathKey="web" />);

    expect(screen.getByText("No events match the selected filters.")).toBeInTheDocument();
  });
});
