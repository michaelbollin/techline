/**
 * One-off: tag sources with role=date|overview and add overview links where missing.
 * Run: npx tsx scripts/tag-sources.ts
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const CONTENT_DIR = path.join(process.cwd(), "content/timeline");

const dateUpgradeByEventId: Record<string, { title: string; url: string }> = {
  "laravel-first-beta": {
    title: "Laravel News — first beta June 9, 2011",
    url: "https://laravel-news.com/laravel-is-10-years-old",
  },
};

const overviewByEventId: Record<string, { title: string; url: string }> = {
  "fortran-formally-published": {
    title: "Wikipedia — Fortran (overview)",
    url: "https://en.wikipedia.org/wiki/Fortran",
  },
  "fortran-first-delivery": {
    title: "Wikipedia — Fortran (overview)",
    url: "https://en.wikipedia.org/wiki/Fortran",
  },
  "lisp-first-interpreter": {
    title: "Wikipedia — Lisp (overview)",
    url: "https://en.wikipedia.org/wiki/Lisp_(programming_language)",
  },
  "cobol-specifications-submitted": {
    title: "Wikipedia — COBOL (overview)",
    url: "https://en.wikipedia.org/wiki/COBOL",
  },
  "cobol-first-program-run": {
    title: "Wikipedia — COBOL (overview)",
    url: "https://en.wikipedia.org/wiki/COBOL",
  },
  "c-language-created": {
    title: "Wikipedia — C (overview)",
    url: "https://en.wikipedia.org/wiki/C_(programming_language)",
  },
  "c-k-and-r-published": {
    title: "Wikipedia — C (overview)",
    url: "https://en.wikipedia.org/wiki/C_(programming_language)",
  },
  "cpp-cfront-1-0": {
    title: "Wikipedia — C++ (overview)",
    url: "https://en.wikipedia.org/wiki/C%2B%2B",
  },
  "cpp-templates-cfront-3": {
    title: "Wikipedia — C++ (overview)",
    url: "https://en.wikipedia.org/wiki/C%2B%2B",
  },
  "python-0-9-0-released": {
    title: "Wikipedia — Python (overview)",
    url: "https://en.wikipedia.org/wiki/Python_(programming_language)",
  },
  "visual-basic-1-0-released": {
    title: "Microsoft Learn — Visual Basic 6.0 documentation",
    url: "https://learn.microsoft.com/en-us/previous-versions/visualstudio/visual-basic-6/visual-basic-6.0-documentation",
  },
  "javascript-mocha-prototype": {
    title: "Wikipedia — JavaScript (overview)",
    url: "https://en.wikipedia.org/wiki/JavaScript",
  },
  "java-announced": {
    title: "Wikipedia — Java (overview)",
    url: "https://en.wikipedia.org/wiki/Java_(programming_language)",
  },
  "javascript-name-announced": {
    title: "Wikipedia — JavaScript (overview)",
    url: "https://en.wikipedia.org/wiki/JavaScript",
  },
  "ruby-0-95-released": {
    title: "ruby-lang.org — About Ruby",
    url: "https://www.ruby-lang.org/en/about/",
  },
  "java-1-0-shipped": {
    title: "Wikipedia — Java (overview)",
    url: "https://en.wikipedia.org/wiki/Java_(programming_language)",
  },
  "flash-4-scripting": {
    title: "Wikipedia — Adobe Flash (overview)",
    url: "https://en.wikipedia.org/wiki/Adobe_Flash",
  },
  "csharp-announced": {
    title: "Wikipedia — C# (overview)",
    url: "https://en.wikipedia.org/wiki/C_Sharp_(programming_language)",
  },
  "actionscript-1-0-flash-5": {
    title: "Wikipedia — ActionScript (overview)",
    url: "https://en.wikipedia.org/wiki/ActionScript",
  },
  "rails-open-sourced": {
    title: "Wikipedia — Ruby on Rails (overview)",
    url: "https://en.wikipedia.org/wiki/Ruby_on_Rails",
  },
  "symfony-released": {
    title: "symfony.com — What is Symfony?",
    url: "https://symfony.com/what-is-symfony",
  },
  "rails-1-0-released": {
    title: "Wikipedia — Ruby on Rails (overview)",
    url: "https://en.wikipedia.org/wiki/Ruby_on_Rails",
  },
  "python-3-0-released": {
    title: "Wikipedia — Python (overview)",
    url: "https://en.wikipedia.org/wiki/Python_(programming_language)",
  },
  "laravel-first-beta": {
    title: "laravel.com — About Laravel",
    url: "https://laravel.com/docs/11.x/readme",
  },
  "laravel-symfony-http-foundation": {
    title: "Symfony — HttpFoundation component",
    url: "https://symfony.com/doc/current/components/http_foundation.html",
  },
  "ecmascript-2015-adopted": {
    title: "Wikipedia — ECMAScript (overview)",
    url: "https://en.wikipedia.org/wiki/ECMAScript",
  },
  "nextjs-open-sourced": {
    title: "Wikipedia — Next.js (overview)",
    url: "https://en.wikipedia.org/wiki/Next.js",
  },
  "nestjs-announced": {
    title: "nestjs.com — Documentation",
    url: "https://docs.nestjs.com/",
  },
};

async function collectJsonFiles(dir: string, base = dir): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectJsonFiles(full, base)));
    } else if (entry.name.endsWith(".json")) {
      files.push(full);
    }
  }
  return files;
}

async function main() {
  const files = await collectJsonFiles(CONTENT_DIR);
  let updated = 0;

  for (const file of files) {
    const raw = await readFile(file, "utf8");
    const data = JSON.parse(raw) as {
      events: Array<{
        id: string;
        sources: Array<{ title: string; url: string; role?: string }>;
      }>;
    };

    let changed = false;

    for (const event of data.events) {
      for (const source of event.sources) {
        if (!source.role) {
          source.role = "date";
          changed = true;
        }
      }

      const dateUpgrade = dateUpgradeByEventId[event.id];
      if (dateUpgrade) {
        const wikiOnly = event.sources.length === 1 && event.sources[0]?.url.includes("wikipedia");
        if (wikiOnly) {
          event.sources[0]!.role = "overview";
          event.sources.unshift({ ...dateUpgrade, role: "date" });
          changed = true;
        }
      }

      const overview = overviewByEventId[event.id];
      if (overview && !event.sources.some((source) => source.role === "overview")) {
        event.sources.push({ ...overview, role: "overview" });
        changed = true;
      }
    }

    if (changed) {
      await writeFile(file, `${JSON.stringify(data, null, 2)}\n`, "utf8");
      updated++;
    }
  }

  console.log(`Updated ${updated} bucket files.`);
}

main();
