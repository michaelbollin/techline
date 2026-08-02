"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

import { FULLTEXT_QUERY_PARAM, parseFulltextQuery } from "@/lib/timeline/filter-url";

export function useTimelineFulltext() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const fulltextQuery = useMemo(() => parseFulltextQuery(searchParams), [searchParams]);

  const setFulltextQuery = useCallback(
    (query: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const trimmed = query.trim();

      if (trimmed) {
        params.set(FULLTEXT_QUERY_PARAM, trimmed);
      } else {
        params.delete(FULLTEXT_QUERY_PARAM);
      }

      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const clearFulltext = useCallback(() => {
    setFulltextQuery("");
  }, [setFulltextQuery]);

  return { fulltextQuery, setFulltextQuery, clearFulltext };
}
