import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EventDetailSection } from "./event-detail-section";

describe("EventDetailSection", () => {
  it("renders title and children", () => {
    render(
      <EventDetailSection title="What it is">
        <p>Detail copy</p>
      </EventDetailSection>,
    );

    expect(screen.getByRole("heading", { name: "What it is" })).toBeInTheDocument();
    expect(screen.getByText("Detail copy")).toBeInTheDocument();
  });
});
