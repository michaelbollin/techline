import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

type MobileTimelinePanArrowsProps = {
  canPanEarlier: boolean;
  canPanLater: boolean;
  onPanEarlier: () => void;
  onPanLater: () => void;
};

function ChevronUp() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 10L8 5L13 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 6L8 11L13 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MobileTimelinePanArrows({
  canPanEarlier,
  canPanLater,
  onPanEarlier,
  onPanLater,
}: MobileTimelinePanArrowsProps) {
  if (!canPanEarlier && !canPanLater) {
    return null;
  }

  return (
    <>
      {canPanEarlier && (
        <Button
          variant="control"
          onClick={onPanEarlier}
          className={cn("pointer-events-auto absolute top-12 left-1/2 z-10 -translate-x-1/2")}
          aria-label="Show earlier events"
        >
          <ChevronUp />
        </Button>
      )}
      {canPanLater && (
        <Button
          variant="control"
          onClick={onPanLater}
          className={cn("pointer-events-auto absolute bottom-6 left-1/2 z-10 -translate-x-1/2")}
          aria-label="Show later events"
        >
          <ChevronDown />
        </Button>
      )}
    </>
  );
}
