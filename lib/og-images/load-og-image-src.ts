import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { absoluteSiteUrl } from "@/lib/site-metadata";

function mimeForExtension(extension: string): string {
  switch (extension) {
    case "svg":
      return "image/svg+xml";
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "webp":
      return "image/webp";
    case "gif":
      return "image/gif";
    default:
      return "image/png";
  }
}

/** Local `/public` paths as data URIs; remote URLs unchanged. */
export async function loadOgImageSrc(url: string | null | undefined): Promise<string | undefined> {
  if (!url) {
    return undefined;
  }

  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:")) {
    return url;
  }

  if (!url.startsWith("/")) {
    return undefined;
  }

  const filePath = join(process.cwd(), "public", url.slice(1));

  try {
    const data = await readFile(filePath);
    const extension = url.split(".").pop()?.toLowerCase() ?? "png";
    const mime = mimeForExtension(extension);
    return `data:${mime};base64,${data.toString("base64")}`;
  } catch {
    return absoluteSiteUrl(url);
  }
}
