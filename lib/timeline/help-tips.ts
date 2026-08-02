export type TimelineHelpTip = {
  id: string;
  text: string;
};

export const DESKTOP_TIMELINE_HELP_TIPS: readonly TimelineHelpTip[] = [
  { id: "zoom", text: "Scroll to zoom in and out" },
  { id: "pan", text: "Drag to pan left and right" },
  { id: "details", text: "Click an event for details" },
  { id: "keys", text: "Arrow keys to pan and zoom" },
] as const;

export const MOBILE_TIMELINE_HELP_TIPS: readonly TimelineHelpTip[] = [
  { id: "zoom", text: "Pinch to zoom in and out" },
  { id: "pan", text: "Drag to move through time" },
  { id: "details", text: "Tap an event for details" },
] as const;

export function getTimelineHelpTips(isDesktop: boolean): readonly TimelineHelpTip[] {
  return isDesktop ? DESKTOP_TIMELINE_HELP_TIPS : MOBILE_TIMELINE_HELP_TIPS;
}
