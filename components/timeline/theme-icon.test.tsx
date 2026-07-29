import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ThemeIcon } from "./theme-icon";

const themeIds = [
  "languages",
  "web",
  "browser",
  "mobile",
  "ai",
  "database",
  "infrastructure",
  "networking",
  "hardware",
  "security",
  "open-source",
  "standards",
  "companies",
  "culture",
  "quotes",
  "software",
  "invention",
] as const;

describe("ThemeIcon", () => {
  it.each(themeIds)("renders svg for %s", (themeId) => {
    const { container } = render(<ThemeIcon themeId={themeId} size={16} />);
    expect(container.querySelector("svg")).toBeTruthy();
  });
});
