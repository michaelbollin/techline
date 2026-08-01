import { describe, expect, it } from "vitest";

import { buildWebGraph, getOrderedLinks } from "./graph";

describe("world-wide-web graph", () => {
  it("models info.cern.ch hub with sections from TheProject.html", () => {
    const graph = buildWebGraph(1200, 800);
    const ordered = getOrderedLinks(graph);

    expect(graph.nodes.find((node) => node.role === "hub")?.id).toBe("info-cern");
    expect(graph.nodes.filter((node) => node.role === "page").map((node) => node.id)).toEqual([
      "whats-out-there",
      "help",
      "software",
      "technical",
      "people",
      "getting-code",
    ]);
    expect(ordered.map((link) => link.id)).toEqual([
      "link-whats-out-there",
      "link-help",
      "link-software",
      "link-technical",
      "link-people",
      "link-getting-code",
    ]);
    expect(ordered.every((link) => link.sourceId === "info-cern")).toBe(true);
  });

  it("uses thick cartoon strokes", () => {
    const graph = buildWebGraph(900, 600);

    expect(graph.links[0]?.strokeWidth).toBeGreaterThanOrEqual(4);
    expect(graph.nodes[0]?.size).toBeGreaterThan(60);
  });
});
