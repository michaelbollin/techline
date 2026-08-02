"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type TimelineChromeContextValue = {
  filtersOpen: boolean;
  setFiltersOpen: (open: boolean) => void;
};

const TimelineChromeContext = createContext<TimelineChromeContextValue | null>(null);

export function TimelineChromeProvider({ children }: { children: ReactNode }) {
  const [filtersOpen, setFiltersOpen] = useState(false);

  const value = useMemo(
    () => ({
      filtersOpen,
      setFiltersOpen,
    }),
    [filtersOpen],
  );

  return <TimelineChromeContext.Provider value={value}>{children}</TimelineChromeContext.Provider>;
}

export function useTimelineChrome() {
  const context = useContext(TimelineChromeContext);

  if (!context) {
    throw new Error("useTimelineChrome must be used within TimelineChromeProvider");
  }

  return context;
}

export function useTimelineChromeOptional() {
  return useContext(TimelineChromeContext);
}
