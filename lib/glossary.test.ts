import { describe, expect, it } from "vitest";

import {
  GLOSSARY_ENTRIES,
  glossaryTooltipWraps,
  splitTextWithGlossary,
  stripGlossaryMarkup,
  textHasGlossaryTerms,
} from "./glossary";

describe("splitTextWithGlossary", () => {
  it("only tooltips bracketed terms with glossary entries", () => {
    const parts = splitTextWithGlossary("Steve Jobs saw it and pushed [GUI] computing");

    expect(parts).toEqual([
      { type: "text", value: "Steve Jobs saw it and pushed " },
      {
        type: "term",
        value: "GUI",
        explanation: GLOSSARY_ENTRIES.GUI,
      },
      { type: "text", value: " computing" },
    ]);
  });

  it("supports multi-word bracketed terms", () => {
    const parts = splitTextWithGlossary("Shannon applies [Boolean algebra] to [switching circuits]");

    expect(parts).toEqual([
      { type: "text", value: "Shannon applies " },
      {
        type: "term",
        value: "Boolean algebra",
        explanation: GLOSSARY_ENTRIES["boolean algebra"],
      },
      { type: "text", value: " to " },
      {
        type: "term",
        value: "switching circuits",
        explanation: GLOSSARY_ENTRIES["switching circuits"],
      },
    ]);
  });

  it("strips brackets when the term is not in the glossary", () => {
    expect(splitTextWithGlossary("The [Alto] ran [Bravo]")).toEqual([
      { type: "text", value: "The " },
      { type: "text", value: "Alto" },
      { type: "text", value: " ran " },
      {
        type: "term",
        value: "Bravo",
        explanation: GLOSSARY_ENTRIES.Bravo,
      },
    ]);
  });

  it("leaves plain text without brackets unchanged", () => {
    expect(splitTextWithGlossary("Bell Labs demonstrates the transistor")).toEqual([
      { type: "text", value: "Bell Labs demonstrates the transistor" },
    ]);
  });
});

describe("stripGlossaryMarkup", () => {
  it("removes editorial brackets for display elsewhere", () => {
    expect(stripGlossaryMarkup("designed around a [GUI] and [Ethernet]")).toBe(
      "designed around a GUI and Ethernet",
    );
  });
});

describe("glossaryTooltipWraps", () => {
  it("wraps longer explanations", () => {
    expect(glossaryTooltipWraps("Hypertext Transfer Protocol")).toBe(false);
    expect(glossaryTooltipWraps(GLOSSARY_ENTRIES.MIT)).toBe(true);
  });
});

describe("textHasGlossaryTerms", () => {
  it("detects bracketed glossary terms", () => {
    expect(textHasGlossaryTerms("IBM [PC] 5150")).toBe(true);
    expect(textHasGlossaryTerms("Bell Labs")).toBe(false);
  });
});
