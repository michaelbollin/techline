import { createElement, useEffect, useState, type ComponentType } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/dynamic", () => ({
  default: (
    importFn: () => Promise<{ default: ComponentType<Record<string, unknown>> }>,
    options?: { loading?: () => React.ReactNode },
  ) => {
    function DynamicComponent(props: Record<string, unknown>) {
      const [Component, setComponent] = useState<ComponentType<Record<string, unknown>> | null>(null);

      useEffect(() => {
        let active = true;
        importFn().then((mod) => {
          if (active) {
            setComponent(() => mod.default);
          }
        });
        return () => {
          active = false;
        };
      }, []);

      if (!Component) {
        return options?.loading?.() ?? null;
      }

      return createElement(Component, props);
    }

    return DynamicComponent;
  },
}));

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
import { ResponsiveTimeline } from "./responsive-timeline";

describe("ResponsiveTimeline", () => {
  it("renders desktop timeline on large screens", async () => {
    vi.mocked(useMediaQuery).mockReturnValue(true);
    render(<ResponsiveTimeline events={[]} />);
    expect(await screen.findByText("Desktop timeline")).toBeInTheDocument();
  });

  it("renders mobile timeline on small screens", async () => {
    vi.mocked(useMediaQuery).mockReturnValue(false);
    render(<ResponsiveTimeline events={[]} />);
    expect(await screen.findByText("Mobile timeline")).toBeInTheDocument();
  });
});
