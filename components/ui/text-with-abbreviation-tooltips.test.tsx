import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { GLOSSARY_ENTRIES } from "@/lib/glossary";

import { TextWithAbbreviationTooltips } from "./text-with-abbreviation-tooltips";

describe("TextWithAbbreviationTooltips", () => {
  it("renders abbreviation with tooltip text", () => {
    render(<TextWithAbbreviationTooltips text="[MIT] thesis" />);

    expect(screen.getByText("MIT")).toBeInTheDocument();
    expect(screen.getByRole("tooltip", { hidden: true })).toHaveTextContent(
      GLOSSARY_ENTRIES.MIT,
    );
  });
});
