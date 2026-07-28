import type { ThemeId } from "@/lib/timeline/event-theme";

type ThemeIconProps = {
  themeId: ThemeId;
  size: number;
  className?: string;
};

const iconProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function ThemeIconPaths({ themeId }: { themeId: ThemeId }) {
  switch (themeId) {
    case "languages":
      return (
        <>
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </>
      );
    case "web":
      return (
        <>
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </>
      );
    case "browser":
      return (
        <>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <circle cx="7" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
          <circle cx="10" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
        </>
      );
    case "mobile":
      return (
        <>
          <rect x="7" y="2" width="10" height="20" rx="2" />
          <line x1="11" y1="18" x2="13" y2="18" />
        </>
      );
    case "ai":
      return (
        <>
          <path d="M12 3v3" />
          <path d="M12 18v3" />
          <path d="M3 12h3" />
          <path d="M18 12h3" />
          <path d="m5.6 5.6 2.1 2.1" />
          <path d="m16.3 16.3 2.1 2.1" />
          <path d="m5.6 18.4 2.1-2.1" />
          <path d="m16.3 7.7 2.1-2.1" />
          <circle cx="12" cy="12" r="3.5" />
        </>
      );
    case "database":
      return (
        <>
          <ellipse cx="12" cy="5" rx="8" ry="3" />
          <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
          <path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
        </>
      );
    case "infrastructure":
      return (
        <>
          <rect x="3" y="4" width="18" height="6" rx="1" />
          <rect x="3" y="14" width="18" height="6" rx="1" />
          <line x1="7" y1="7" x2="7.01" y2="7" />
          <line x1="11" y1="7" x2="11.01" y2="7" />
          <line x1="7" y1="17" x2="7.01" y2="17" />
          <line x1="11" y1="17" x2="11.01" y2="17" />
        </>
      );
    case "networking":
      return (
        <>
          <circle cx="12" cy="12" r="2" />
          <circle cx="5" cy="7" r="2" />
          <circle cx="19" cy="7" r="2" />
          <circle cx="5" cy="17" r="2" />
          <circle cx="19" cy="17" r="2" />
          <line x1="10.5" y1="10.5" x2="6.8" y2="8.5" />
          <line x1="13.5" y1="10.5" x2="17.2" y2="8.5" />
          <line x1="10.5" y1="13.5" x2="6.8" y2="15.5" />
          <line x1="13.5" y1="13.5" x2="17.2" y2="15.5" />
        </>
      );
    case "hardware":
      return (
        <>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <rect x="9" y="9" width="6" height="6" />
          <line x1="9" y1="2" x2="9" y2="4" />
          <line x1="15" y1="2" x2="15" y2="4" />
          <line x1="9" y1="20" x2="9" y2="22" />
          <line x1="15" y1="20" x2="15" y2="22" />
          <line x1="2" y1="9" x2="4" y2="9" />
          <line x1="2" y1="15" x2="4" y2="15" />
          <line x1="20" y1="9" x2="22" y2="9" />
          <line x1="20" y1="15" x2="22" y2="15" />
        </>
      );
    case "security":
      return (
        <>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </>
      );
    case "open-source":
      return (
        <>
          <circle cx="6" cy="6" r="3" />
          <circle cx="18" cy="6" r="3" />
          <circle cx="12" cy="18" r="3" />
          <line x1="8.5" y1="7.5" x2="10.5" y2="15.5" />
          <line x1="15.5" y1="7.5" x2="13.5" y2="15.5" />
        </>
      );
    case "standards":
      return (
        <>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="8" y1="13" x2="16" y2="13" />
          <line x1="8" y1="17" x2="13" y2="17" />
        </>
      );
    case "companies":
      return (
        <>
          <rect x="4" y="3" width="16" height="18" rx="1" />
          <line x1="9" y1="21" x2="9" y2="9" />
          <line x1="15" y1="21" x2="15" y2="9" />
          <line x1="4" y1="9" x2="20" y2="9" />
        </>
      );
    case "culture":
      return (
        <>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </>
      );
    case "quotes":
      return (
        <>
          <path d="M7 10h3a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H7V10z" />
          <path d="M14 10h3a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-3V10z" />
        </>
      );
    case "software":
      return (
        <>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <polyline points="9 9 9 15 15 12 9 9" />
        </>
      );
    case "invention":
      return (
        <>
          <path d="M9 18h6" />
          <path d="M10 22h4" />
          <path d="M12 2a7 7 0 0 0-4 12.5V17h8v-2.5A7 7 0 0 0 12 2z" />
        </>
      );
  }
}

export function ThemeIconGraphic({ themeId, className }: { themeId: ThemeId; className?: string }) {
  return (
    <g className={className} {...iconProps}>
      <ThemeIconPaths themeId={themeId} />
    </g>
  );
}

export function ThemeIcon({ themeId, size, className }: ThemeIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
      <ThemeIconGraphic themeId={themeId} />
    </svg>
  );
}
