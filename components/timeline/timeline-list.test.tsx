import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { makeTimelineEvent } from "@/test/fixtures/timeline-event";
import { TimelineList } from "./timeline-list";

describe("TimelineList", () => {
  it("groups events by date label", () => {
    render(
      <TimelineList
        events={[
          makeTimelineEvent({ id: "a", slug: "a", title: "Alpha", date: "2000-01-15" }),
          makeTimelineEvent({ id: "b", slug: "b", title: "Beta", date: "2000-02-01" }),
        ]}
      />,
    );

    expect(screen.getByRole("heading", { name: "January 2000" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "February 2000" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Alpha" })).toBeInTheDocument();
  });
});
