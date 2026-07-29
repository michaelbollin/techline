import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { FilterHeading, FilterLabel } from "./filter-label";

describe("FilterLabel", () => {
  it("renders a label element", () => {
    render(<FilterLabel htmlFor="category">Category</FilterLabel>);
    expect(screen.getByText("Category")).toHaveAttribute("for", "category");
  });
});

describe("FilterHeading", () => {
  it("renders as h3 by default", () => {
    render(<FilterHeading>Filters</FilterHeading>);
    expect(screen.getByRole("heading", { level: 3, name: "Filters" })).toBeInTheDocument();
  });

  it("supports custom heading level", () => {
    render(<FilterHeading as="h2">Sections</FilterHeading>);
    expect(screen.getByRole("heading", { level: 2, name: "Sections" })).toBeInTheDocument();
  });
});
