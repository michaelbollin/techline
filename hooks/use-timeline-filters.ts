import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { filterIdsToPath, parseFilterSegment } from "@/lib/timeline/filter-url";

export type FilterUpdater = Set<string> | ((prev: Set<string>) => Set<string>);

function filterIdsFromPathKey(filterPathKey: string): Set<string> {
  if (!filterPathKey) {
    return new Set();
  }

  return parseFilterSegment(filterPathKey);
}

function setsEqual(a: ReadonlySet<string>, b: ReadonlySet<string>): boolean {
  if (a.size !== b.size) {
    return false;
  }

  for (const id of a) {
    if (!b.has(id)) {
      return false;
    }
  }

  return true;
}

function resolveFilterUpdater(prev: Set<string>, updater: FilterUpdater): Set<string> {
  return typeof updater === "function" ? updater(prev) : updater;
}

export function useTimelineFilters(filterPathKey: string) {
  const router = useRouter();
  const deferUrlSyncRef = useRef(false);
  const pendingPathRef = useRef<string | null>(null);
  const [activeFilterIds, setActiveFilterIds] = useState<Set<string>>(() =>
    filterIdsFromPathKey(filterPathKey),
  );

  // Defer setState to avoid synchronous effect updates (react-hooks/set-state-in-effect).
  useEffect(() => {
    const fromUrl = filterIdsFromPathKey(filterPathKey);
    queueMicrotask(() => {
      setActiveFilterIds((prev) => (setsEqual(prev, fromUrl) ? prev : fromUrl));
    });
  }, [filterPathKey]);

  const flushPendingUrl = useCallback(() => {
    if (pendingPathRef.current !== null) {
      router.replace(pendingPathRef.current, { scroll: false });
      pendingPathRef.current = null;
    }
  }, [router]);

  const setDeferUrlSync = useCallback(
    (defer: boolean) => {
      deferUrlSyncRef.current = defer;
      if (!defer) {
        flushPendingUrl();
      }
    },
    [flushPendingUrl],
  );

  const updateFilters = useCallback(
    (updater: FilterUpdater) => {
      setActiveFilterIds((prev) => {
        const next = resolveFilterUpdater(prev, updater);
        const path = filterIdsToPath(next);
        if (deferUrlSyncRef.current) {
          pendingPathRef.current = path;
        } else {
          router.replace(path, { scroll: false });
        }
        return next;
      });
    },
    [router],
  );

  return { activeFilterIds, updateFilters, setDeferUrlSync };
}
