/** Parses newline-delimited id files (`#` comments and blank lines ignored). */
export function parseIdListFile(content: string): Set<string> {
  return new Set(
    content
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#")),
  );
}
