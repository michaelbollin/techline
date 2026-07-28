export type SearchRankableOption = {
  id: string;
  label: string;
};

const MAX_RESULTS = 12;

function normalizeQuery(value: string): string {
  return value.trim().toLowerCase();
}

export function rankSearchOptions<T extends SearchRankableOption>(
  options: T[],
  query: string,
): T[] {
  const normalized = normalizeQuery(query);
  if (!normalized) {
    return [];
  }

  return options
    .filter((option) => option.label.toLowerCase().includes(normalized))
    .sort((a, b) => {
      const aLabel = a.label.toLowerCase();
      const bLabel = b.label.toLowerCase();
      const aExact = aLabel === normalized;
      const bExact = bLabel === normalized;
      if (aExact !== bExact) {
        return aExact ? -1 : 1;
      }

      const aStarts = aLabel.startsWith(normalized);
      const bStarts = bLabel.startsWith(normalized);
      if (aStarts !== bStarts) {
        return aStarts ? -1 : 1;
      }

      if (aLabel.length !== bLabel.length) {
        return aLabel.length - bLabel.length;
      }

      return a.label.localeCompare(b.label);
    })
    .slice(0, MAX_RESULTS);
}
