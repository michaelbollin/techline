import { useEffect, useMemo, useRef, useState } from "react";

import { rankSearchOptions, type SearchRankableOption } from "@/lib/timeline/search-ranking";

type UseSearchFilterInputOptions<T extends SearchRankableOption> = {
  options: T[];
  fulltextQuery: string;
  resetNonce: number;
  onFulltextChange: (query: string) => void;
};

export function useSearchFilterInput<T extends SearchRankableOption>({
  options,
  fulltextQuery,
  resetNonce,
  onFulltextChange,
}: UseSearchFilterInputOptions<T>) {
  const [query, setQuery] = useState("");
  const previousFulltextQuery = useRef(fulltextQuery);
  const results = useMemo(() => rankSearchOptions(options, query), [options, query]) as T[];

  useEffect(() => {
    setQuery("");
  }, [resetNonce]);

  useEffect(() => {
    if (previousFulltextQuery.current && !fulltextQuery) {
      setQuery("");
    }

    previousFulltextQuery.current = fulltextQuery;
  }, [fulltextQuery]);

  useEffect(() => {
    const trimmed = query.trim();

    if (!trimmed) {
      onFulltextChange("");
      return;
    }

    if (results.length === 0) {
      onFulltextChange(trimmed);
      return;
    }

    onFulltextChange("");
  }, [onFulltextChange, query, results.length]);

  const clearQuery = () => setQuery("");

  return { query, setQuery, clearQuery, results };
}
