import type { PlottedEvent } from "./plot-data";
import type { LabelLayout } from "./label-layout";

export function sortVisibleLabelNodes(
  plotted: PlottedEvent[],
  labelLayout: Map<string, LabelLayout>,
  xPosition: (timestamp: number) => number,
): PlottedEvent[] {
  const visible = plotted.filter((event) => labelLayout.get(event.id)?.showLabel);

  return [...visible].sort((a, b) => {
    const laneA = labelLayout.get(a.id)?.lane ?? 0;
    const laneB = labelLayout.get(b.id)?.lane ?? 0;
    if (laneA !== laneB) {
      return laneA - laneB;
    }

    return xPosition(a.timestamp) - xPosition(b.timestamp);
  });
}

export function reorderLabelsForHover(
  sorted: PlottedEvent[],
  hovered: PlottedEvent | null,
): PlottedEvent[] {
  if (!hovered) {
    return sorted;
  }

  const hoveredIndex = sorted.findIndex((event) => event.id === hovered.id);
  if (hoveredIndex === -1) {
    return sorted;
  }

  const hoveredEvent = sorted[hoveredIndex]!;
  return [...sorted.slice(0, hoveredIndex), ...sorted.slice(hoveredIndex + 1), hoveredEvent];
}
