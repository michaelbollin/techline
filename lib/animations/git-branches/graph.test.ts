import { describe, expect, it } from "vitest";

import { buildGitGraph, getOrderedLinks } from "./graph";

describe("git-branches graph", () => {
  it("has one long main trunk drawn first", () => {
    const graph = buildGitGraph(1200, 600);
    const ordered = getOrderedLinks(graph);

    expect(ordered[0]?.id).toBe("main-trunk");
    expect(ordered[0]?.kind).toBe("main");
    expect(ordered.filter((link) => link.kind === "main")).toHaveLength(1);
  });

  it("merges every branch back to master with bezier paths", () => {
    const graph = buildGitGraph(1200, 600);
    const branches = graph.links.filter((link) => link.kind === "branch");

    expect(branches.length).toBe(10);
    expect(branches.every((link) => link.source.lane === 0 && link.target.lane === 0)).toBe(true);
    expect(branches[0]?.d.match(/C/g)?.length).toBe(1);
    expect(graph.nodes.filter((node) => node.role === "merge").length).toBeGreaterThan(5);
  });
});
