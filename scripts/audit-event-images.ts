#!/usr/bin/env npx tsx
/**
 * Audit Wikimedia Commons image availability for a slice of timeline events.
 * Usage: npx tsx scripts/audit-event-images.ts [offset] [limit]
 */
import { loadTimeline } from "../lib/timeline/load";

const UA = "TechlineMediaAudit/1.0";
const DELAY_MS = 2000;

const REUSABLE_PREFIXES = ["Public domain", "CC0", "CC BY", "CC BY-SA", "Attribution"];

/** Wikipedia article title to query for lead image, plus optional Commons file override. */
const CURATED: Record<string, { wiki?: string; commons?: string; note?: string }> = {
  "edsac-first-programs": { wiki: "EDSAC" },
  "richard-hamming-error-correcting-codes": { wiki: "Richard Hamming" },
  "turing-computing-machinery-intelligence": { wiki: "Computing Machinery and Intelligence", commons: "Turing_test_diagram.png" },
  "turing-can-machines-think-quote": { wiki: "Alan Turing" },
  "univac-i-delivered": { wiki: "UNIVAC I" },
  "grace-hopper-a0-compiler": { wiki: "Grace Hopper" },
  "whirlwind-core-memory": { wiki: "Whirlwind (computer)" },
  "dartmouth-ai-proposal": { wiki: "Dartmouth workshop", commons: "Dartmouth College campus.jpg" },
  "dartmouth-ai-conjecture-quote": { wiki: "Dartmouth workshop", commons: "Dartmouth College campus.jpg" },
  "marvin-minsky-dartmouth-workshop": { wiki: "Marvin Minsky" },
  "ibm-ramac-305-announced": { wiki: "IBM 305 RAMAC" },
  "frank-rosenblatt-perceptron": { wiki: "Perceptron" },
  "fortran-formally-published": { wiki: "Fortran" },
  "fortran-first-delivery": { wiki: "Fortran" },
  "john-mccarthy-lisp-invented": { wiki: "John McCarthy (computer scientist)" },
  "jack-kilby-integrated-circuit": { wiki: "Integrated circuit", commons: "Kilby_solid_circuit.jpg" },
  "algol-58-published": { wiki: "ALGOL 58" },
  "robert-noyce-integrated-circuit": { wiki: "Robert Noyce" },
  "lisp-first-interpreter": { wiki: "Lisp (programming language)" },
  "cobol-specifications-submitted": { wiki: "COBOL" },
  "algol-60-published": { wiki: "ALGOL 60" },
  "cobol-first-program-run": { wiki: "COBOL" },
  "dec-pdp-1-introduced": { wiki: "PDP-1" },
  "tony-hoare-quicksort-published": { wiki: "Tony Hoare" },
  "jean-sammet-formac-published": { wiki: "Jean Sammet" },
  "ascii-standard-published": { wiki: "ASCII", commons: "ASCII-Table-wide.svg" },
  "sketchpad-created": { wiki: "Sketchpad" },
  "ibm-system-360-announced": { wiki: "IBM System/360" },
  "basic-first-run": { wiki: "BASIC" },
  "seymour-cray-cdc-6600": { wiki: "CDC 6600" },
  "dec-pdp-8-shipped": { wiki: "PDP-8" },
  "gordon-moore-moores-law": { wiki: "Gordon Moore" },
  "moore-components-doubling-quote": { wiki: "Gordon Moore" },
  "dec-pdp-10-released": { wiki: "PDP-10" },
  "eliza-created": { wiki: "ELIZA" },
  "simula-67-presented": { wiki: "Simula" },
  "bcpl-manual-published": { wiki: "BCPL" },
  "knuth-taocp-volume-1-published": { wiki: "Donald Knuth" },
  "dijkstra-go-to-considered-harmful": { wiki: "Edsger W. Dijkstra" },
  "dijkstra-goto-letter-quote": { wiki: "Edsger W. Dijkstra" },
  "moore-noyce-intel-founded": { wiki: "Intel", commons: "Intel logo (2020).svg" },
  "b-language-created": { wiki: "B (programming language)" },
  "unix-created": { wiki: "Unix" },
  "margaret-hamilton-apollo-software": { wiki: "Margaret Hamilton (software engineer)" },
  "arpanet-first-message": { wiki: "ARPANET" },
  "niklaus-wirth-pascal-published": { wiki: "Niklaus Wirth" },
  "pascal-report-published": { wiki: "Pascal (programming language)" },
  "stephen-cook-np-completeness": { wiki: "Stephen Cook" },
  "phone-phreaking-esquire-article": { wiki: "Phreaking", commons: "Blue_box_phone.jpg" },
  "intel-4004-introduced": { wiki: "Intel 4004" },
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function reusable(license: string) {
  return REUSABLE_PREFIXES.some((prefix) => license.startsWith(prefix));
}

async function wikiLeadImage(title: string) {
  const url = new URL("https://en.wikipedia.org/w/api.php");
  url.searchParams.set("action", "query");
  url.searchParams.set("format", "json");
  url.searchParams.set("titles", title);
  url.searchParams.set("prop", "pageimages");
  url.searchParams.set("piprop", "name");
  url.searchParams.set("origin", "*");

  const res = await fetch(url, { headers: { "User-Agent": UA } });
  const data = await res.json();
  const page = Object.values(data.query?.pages ?? {})[0] as {
    missing?: string;
    title?: string;
    pageimage?: string;
  };

  if (!page || page.missing !== undefined) return null;
  return page.pageimage ?? null;
}

async function commonsMeta(fileName: string) {
  const url = new URL("https://commons.wikimedia.org/w/api.php");
  url.searchParams.set("action", "query");
  url.searchParams.set("format", "json");
  url.searchParams.set("titles", `File:${fileName}`);
  url.searchParams.set("prop", "imageinfo");
  url.searchParams.set("iiprop", "url|extmetadata");
  url.searchParams.set("origin", "*");

  const res = await fetch(url, { headers: { "User-Agent": UA } });
  const data = await res.json();
  const page = Object.values(data.query?.pages ?? {})[0] as {
    imageinfo?: Array<{ url: string; extmetadata?: Record<string, { value: string }> }>;
  };
  const info = page?.imageinfo?.[0];
  if (!info) return null;

  const strip = (s?: string) => s?.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
  const m = info.extmetadata ?? {};

  return {
    fileName,
    url: info.url,
    license: strip(m.LicenseShortName?.value) ?? "?",
    artist: strip(m.Artist?.value) ?? "",
  };
}

const offset = Number(process.argv[2] ?? 20);
const limit = Number(process.argv[3] ?? 50);

const { events } = await loadTimeline();
const batch = events.slice(offset, offset + limit);

for (const event of batch) {
  const curated = CURATED[event.id];
  const wikiTitle = curated?.wiki ?? event.title;
  let fileName = curated?.commons ?? null;

  if (!fileName && curated?.wiki) {
    await sleep(DELAY_MS);
    fileName = (await wikiLeadImage(wikiTitle)) ?? null;
  } else if (!fileName) {
    await sleep(DELAY_MS);
    fileName = (await wikiLeadImage(wikiTitle)) ?? null;
  }

  if (!fileName) {
    console.log(
      JSON.stringify({
        id: event.id,
        date: event.date,
        verdict: "NO_IMAGE",
        wiki: wikiTitle,
        existingMedia: event.media.length,
        note: curated?.note ?? "No lead image on Wikipedia; needs manual Commons search",
      }),
    );
    continue;
  }

  await sleep(DELAY_MS);
  const meta = await commonsMeta(fileName);
  if (!meta) {
    console.log(
      JSON.stringify({
        id: event.id,
        date: event.date,
        verdict: "NO_COMMONS_META",
        file: fileName,
        existingMedia: event.media.length,
      }),
    );
    continue;
  }

  const verdict = reusable(meta.license) ? "OK" : "CHECK_LICENSE";
  console.log(
    JSON.stringify({
      id: event.id,
      date: event.date,
      title: event.title,
      verdict,
      file: meta.fileName,
      license: meta.license,
      artist: meta.artist.slice(0, 100),
      url: meta.url,
      existingMedia: event.media.length,
      note: curated?.note,
    }),
  );
}
