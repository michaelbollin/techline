type FilterToggleIconProps = {
  isOpen: boolean;
  className?: string;
};

export function FilterToggleIcon({ isOpen, className }: FilterToggleIconProps) {
  return (
    <svg
      className={`filter-toggle-icon ${isOpen ? "is-open" : ""} ${className ?? ""}`}
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
      <g className="filter-toggle-state filter-toggle-state--menu">
        <line x1="6" y1="7" x2="18" y2="7" />
        <line x1="9" y1="12" x2="15" y2="12" />
        <line x1="6" y1="17" x2="18" y2="17" />
      </g>
      <g className="filter-toggle-state filter-toggle-state--close">
        <line x1="7" y1="7" x2="17" y2="17" />
        <line x1="17" y1="7" x2="7" y2="17" />
      </g>
    </svg>
  );
}
