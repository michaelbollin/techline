import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FilterSection } from "./filter-section";

describe("FilterSection", () => {
  it("renders heading and children", () => {
    render(
      <FilterSection label="Theme">
        <p>Options</p>
      </FilterSection>,
    );

    expect(screen.getByText("Theme")).toBeInTheDocument();
    expect(screen.getByText("Options")).toBeInTheDocument();
  });
});
