import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ResponsiveTimeline } from "./responsive-timeline";

vi.mock("@/hooks/use-media-query", () => ({
  TIMELINE_DESKTOP_MEDIA_QUERY: "(min-width: 768px)",
  useMediaQuery: vi.fn(),
}));

vi.mock("./modern-timeline", () => ({
  ModernTimeline: () => <div>Desktop timeline</div>,
}));

vi.mock("./mobile-timeline", () => ({
  MobileTimeline: () => <div>Mobile timeline</div>,
}));

import { useMediaQuery } from "@/hooks/use-media-query";

describe("ResponsiveTimeline", () => {
  it("renders desktop timeline on large screens", () => {
    vi.mocked(useMediaQuery).mockReturnValue(true);
    render(<ResponsiveTimeline events={[]} />);
    expect(screen.getByText("Desktop timeline")).toBeInTheDocument();
  });

  it("renders mobile timeline on small screens", () => {
    vi.mocked(useMediaQuery).mockReturnValue(false);
    render(<ResponsiveTimeline events={[]} />);
    expect(screen.getByText("Mobile timeline")).toBeInTheDocument();
  });
});
