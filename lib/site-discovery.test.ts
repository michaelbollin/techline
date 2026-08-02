import { describe, expect, it } from "vitest";

import {
  buildAgenticGuidance,
  buildAgentsJson,
  buildAgentsTxt,
  buildLlmsTxt,
  buildSiteRobots,
  DISALLOWED_DISCOVERY_PATHS,
} from "./site-discovery";
import { SITE_NAME, SITE_URL } from "./site";

describe("buildSiteRobots", () => {
  it("points crawlers at the sitemap and blocks internal paths", () => {
    const robots = buildSiteRobots();

    expect(robots.sitemap).toBe(`${SITE_URL}/sitemap.xml`);
    expect(robots.host).toBe(SITE_URL);
    expect(robots.rules).toMatchObject({
      userAgent: "*",
      allow: "/",
      disallow: [...DISALLOWED_DISCOVERY_PATHS],
    });
  });
});

describe("buildLlmsTxt", () => {
  it("follows the llms.txt shape with an H1 and blockquote", () => {
    const llms = buildLlmsTxt();

    expect(llms.startsWith(`# ${SITE_NAME}\n\n>`)).toBe(true);
    expect(llms).toContain("## Start here");
    expect(llms).toContain(`${SITE_URL}/sitemap.xml`);
    expect(llms).toContain(`${SITE_URL}/.well-known/agentic-guidance.json`);
  });
});

describe("buildAgentsTxt", () => {
  it("references the agents.json companion", () => {
    const agents = buildAgentsTxt();

    expect(agents).toContain("# agents.txt");
    expect(agents).toContain(`${SITE_URL}/agents.json`);
    expect(agents).toContain("read-only");
  });
});

describe("buildAgenticGuidance", () => {
  it("declares read-only capabilities and usage guidelines", () => {
    const guidance = buildAgenticGuidance();

    expect(guidance.capabilities).toEqual({
      read: true,
      write: false,
      authenticate: false,
      payment: false,
    });
    expect(guidance.guidelines.length).toBeGreaterThan(3);
    expect(guidance.discovery.sitemap).toBe(`${SITE_URL}/sitemap.xml`);
  });
});

describe("buildAgentsJson", () => {
  it("links to structured agent guidance", () => {
    const agents = buildAgentsJson();

    expect(agents.guidance).toBe(`${SITE_URL}/.well-known/agentic-guidance.json`);
    expect(agents.llmsTxt).toBe(`${SITE_URL}/llms.txt`);
  });
});
