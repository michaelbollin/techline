import type { Selection } from "d3";

import type { IcComponent } from "./scene";

export type SvgGroupSelection = Selection<SVGGElement, unknown, null, undefined>;
export type ComponentGroupSelection = Selection<SVGGElement, IcComponent, SVGGElement, unknown>;
export type WirePathSelection = Selection<SVGPathElement, unknown, null, undefined>;

export function wireGroupClass(wireId: string): string {
  return `wire-${wireId}`;
}

export function parseWireGroupId(className: string | null): string | null {
  if (!className?.startsWith("wire-")) {
    return null;
  }

  return className.slice("wire-".length) || null;
}
