import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { filterIdsToPath, parseFilterSegment } from "@/lib/timeline/filter-url";

function filterIdsFromPathKey(filterPathKey: string): Set<string> {
  if (!filterPathKey) {
    return new Set();
  }

  return parseFilterSegment(filterPathKey);
}

export function useTimelineFilters(filterPathKey: string) {
  const router = useRouter();
  const [activeFilterIds, setActiveFilterIds] = useState<Set<string>>(() =>
    filterIdsFromPathKey(filterPathKey),
  );

  useEffect(() => {
    setActiveFilterIds(filterIdsFromPathKey(filterPathKey));
  }, [filterPathKey]);

  const updateFilters = useCallback(
    (next: Set<string>) => {
      setActiveFilterIds(next);
      router.replace(filterIdsToPath(next), { scroll: false });
    },
    [router],
  );

  return { activeFilterIds, updateFilters };
}
