import { MOBILE_LABEL_LANE_STEP, MOBILE_LABEL_OFFSET, MOBILE_TIMELINE_AXIS_X, MOBILE_TIMELINE_EDGE_MARGIN } from "./constants";

export {
  maxImportanceForZoom,
  maxLanesForZoom,
} from "@/lib/timeline/zoom-lod";

/** Never stack more lanes than fit to the right of the axis. */
export function maxLanesForViewportVertical(viewportWidth: number): number {
  const available =
    viewportWidth - MOBILE_TIMELINE_AXIS_X - MOBILE_LABEL_OFFSET - MOBILE_TIMELINE_EDGE_MARGIN;

  if (available <= MOBILE_LABEL_LANE_STEP) {
    return 1;
  }

  return Math.max(1, Math.floor(available / MOBILE_LABEL_LANE_STEP) + 1);
}
