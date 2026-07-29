import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { makeTimelineEvent } from "@/test/fixtures/timeline-event";
import { NarrativeBlock } from "./narrative-block";

describe("NarrativeBlock", () => {
  const narrative = {
    whyChosen: "Chosen",
    whyImportant: "Important",
    problemSolved: "Solved",
  };

  it("renders page sections", () => {
    render(<NarrativeBlock narrative={narrative} />);
    expect(screen.getByRole("heading", { name: "Why it's here" })).toBeInTheDocument();
    expect(screen.getByText("Solved")).toBeInTheDocument();
  });

  it("renders modal sections", () => {
    render(<NarrativeBlock narrative={narrative} variant="modal" />);
    expect(screen.getByRole("heading", { name: "What it solved" })).toBeInTheDocument();
  });
});

describe("NarrativeBlock with quote event context", () => {
  it("shows all narrative fields", () => {
    render(<NarrativeBlock narrative={makeTimelineEvent().narrative} />);
    expect(screen.getByText(makeTimelineEvent().narrative.whyChosen)).toBeInTheDocument();
  });
});
