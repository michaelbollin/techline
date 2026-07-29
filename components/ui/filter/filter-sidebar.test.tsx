import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  FilterSidebar,
  FilterSidebarBody,
  FilterSidebarFooter,
  FilterSidebarHeader,
  FilterSidebarTitle,
} from "./filter-sidebar";

describe("FilterSidebar", () => {
  it("composes sidebar regions with accessible labels", () => {
    render(
      <FilterSidebar id="filters">
        <FilterSidebarHeader>
          <FilterSidebarTitle>Filters</FilterSidebarTitle>
        </FilterSidebarHeader>
        <FilterSidebarBody>
          <p>Body</p>
        </FilterSidebarBody>
        <FilterSidebarFooter>
          <button type="button">Reset</button>
        </FilterSidebarFooter>
      </FilterSidebar>,
    );

    expect(screen.getByRole("region", { name: "Filter timeline events" })).toHaveAttribute(
      "id",
      "filters",
    );
    expect(screen.getByRole("heading", { name: "Filters" })).toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reset" })).toBeInTheDocument();
  });
});
