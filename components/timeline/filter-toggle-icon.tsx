import { cn } from "@/lib/cn";

type FilterToggleIconProps = {
  isOpen: boolean;
  className?: string;
};

const stateTransition =
  "origin-[12px_12px] [transform-box:view-box] transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]";

export function FilterToggleIcon({ isOpen, className }: FilterToggleIconProps) {
  return (
    <svg
      data-open={isOpen ? "" : undefined}
      className={cn("group block size-6 overflow-visible", className)}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden
      overflow="visible"
    >
      <g
        className={cn(
          stateTransition,
          "scale-100 rotate-0 opacity-100 group-data-[open]:scale-[0.7] group-data-[open]:rotate-45 group-data-[open]:opacity-0",
        )}
      >
        <line x1="6" y1="7" x2="18" y2="7" />
        <line x1="9" y1="12" x2="15" y2="12" />
        <line x1="6" y1="17" x2="18" y2="17" />
      </g>
      <g
        className={cn(
          stateTransition,
          "scale-[0.7] -rotate-45 opacity-0 group-data-[open]:scale-100 group-data-[open]:rotate-0 group-data-[open]:opacity-100",
        )}
      >
        <line x1="7" y1="7" x2="17" y2="17" />
        <line x1="17" y1="7" x2="7" y2="17" />
      </g>
    </svg>
  );
}
