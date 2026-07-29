#!/usr/bin/env npx tsx
/**
 * Download Wikimedia Commons images for the first 20 timeline events
 * and attach them as local /media/timeline/* assets in event JSON.
 */
import { mkdirSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const MEDIA_DIR = join(ROOT, "public/media/timeline");
const UA = "TechlineMediaSeed/1.0";

type ImageSeed = {
  eventId: string;
  bucketFile: string;
  fileName: string;
  downloadUrl: string;
  title: string;
  caption: string;
};

const IMAGES: ImageSeed[] = [
  {
    eventId: "ada-lovelace-analytical-engine-notes",
    bucketFile: "content/timeline/1843/year.json",
    fileName: "ada-lovelace-analytical-engine-notes.png",
    downloadUrl:
      "https://upload.wikimedia.org/wikipedia/commons/4/4c/Ada_Lovelace_daguerreotype_by_Antoine_Claudet_1843_-_cropped.png",
    title: "Ada Lovelace daguerreotype (1843)",
    caption: "Antoine Claudet, public domain, via Wikimedia Commons",
  },
  {
    eventId: "hilbert-entscheidungsproblem",
    bucketFile: "content/timeline/1928/year.json",
    fileName: "hilbert-entscheidungsproblem.jpg",
    downloadUrl: "https://upload.wikimedia.org/wikipedia/commons/7/79/Hilbert.jpg",
    title: "David Hilbert",
    caption: "Public domain, via Wikimedia Commons",
  },
  {
    eventId: "nyquist-sampling-theory",
    bucketFile: "content/timeline/1928/04.json",
    fileName: "nyquist-sampling-theory.gif",
    downloadUrl: "https://upload.wikimedia.org/wikipedia/commons/4/43/Nyquist_sampling.gif",
    title: "Nyquist sampling illustration",
    caption: "Jacopo Bertolotti, CC0, via Wikimedia Commons",
  },
  {
    eventId: "godel-incompleteness-theorems",
    bucketFile: "content/timeline/1931/year.json",
    fileName: "godel-incompleteness-theorems.jpg",
    downloadUrl: "https://upload.wikimedia.org/wikipedia/commons/4/42/Kurt_g%C3%B6del.jpg",
    title: "Kurt Gödel",
    caption: "Public domain, via Wikimedia Commons",
  },
  {
    eventId: "alan-turing-computable-numbers",
    bucketFile: "content/timeline/1936/year.json",
    fileName: "alan-turing-computable-numbers.jpg",
    downloadUrl: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Alan_turing_header.jpg",
    title: "Alan Turing",
    caption: "Elliott & Fry, public domain, via Wikimedia Commons",
  },
  {
    eventId: "church-lambda-calculus-unsolvable",
    bucketFile: "content/timeline/1936/04.json",
    fileName: "church-lambda-calculus-unsolvable.png",
    downloadUrl:
      "https://upload.wikimedia.org/wikipedia/commons/f/f5/Church_numeral_links.png",
    title: "Church numerals and related concepts",
    caption: "Physis, CC BY-SA 4.0, via Wikimedia Commons",
  },
  {
    eventId: "shannon-boolean-circuit-thesis",
    bucketFile: "content/timeline/1937/08.json",
    fileName: "claude-shannon.jpg",
    downloadUrl:
      "https://upload.wikimedia.org/wikipedia/commons/c/c1/C.E._Shannon._Tekniska_museet_43069_%282x3_crop%29.jpg",
    title: "Claude Shannon",
    caption: "Tekniska museet, CC BY 2.0, via Wikimedia Commons",
  },
  {
    eventId: "z3-completed",
    bucketFile: "content/timeline/1941/05.json",
    fileName: "z3-completed.jpg",
    downloadUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a3/Z3_Deutsches_Museum_b.jpg",
    title: "Z3 at Deutsches Museum",
    caption: "Georgfotoart (derivative of Venusianer), CC BY-SA 3.0, via Wikimedia Commons",
  },
  {
    eventId: "mcculloch-pitts-neurons",
    bucketFile: "content/timeline/1943/12.json",
    fileName: "mcculloch-pitts-neurons.png",
    downloadUrl:
      "https://upload.wikimedia.org/wikipedia/commons/d/d6/Mcculloch-pitts-neuron-model.png",
    title: "McCulloch–Pitts neuron model",
    caption: "McCulloch, public domain, via Wikimedia Commons",
  },
  {
    eventId: "colossus-operational",
    bucketFile: "content/timeline/1944/02.json",
    fileName: "colossus-operational.jpg",
    downloadUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Colossus.jpg",
    title: "Colossus at Bletchley Park",
    caption: "Public domain, via Wikimedia Commons",
  },
  {
    eventId: "harvard-mark-1-completed",
    bucketFile: "content/timeline/1944/08.json",
    fileName: "harvard-mark-1-completed.jpg",
    downloadUrl:
      "https://upload.wikimedia.org/wikipedia/commons/0/07/Harvard_Mark_I_Computer_-_Input-Output_Details.jpg",
    title: "Harvard Mark I input/output",
    caption: "Daderot, CC BY-SA 3.0, via Wikimedia Commons",
  },
  {
    eventId: "john-von-neumann-architecture",
    bucketFile: "content/timeline/1945/06.json",
    fileName: "john-von-neumann-architecture.gif",
    downloadUrl:
      "https://upload.wikimedia.org/wikipedia/commons/5/5e/JohnvonNeumann-LosAlamos.gif",
    title: "John von Neumann at Los Alamos",
    caption: "Los Alamos National Laboratory, attribution required, via Wikimedia Commons",
  },
  {
    eventId: "bush-as-we-may-think-memex",
    bucketFile: "content/timeline/1945/07.json",
    fileName: "bush-as-we-may-think-memex.jpg",
    downloadUrl:
      "https://upload.wikimedia.org/wikipedia/commons/f/f6/Vannevar_Bush%2C_1938%2C_Harris_%26_Ewing_%28cropped%29.jpg",
    title: "Vannevar Bush (1938)",
    caption: "Harris & Ewing, public domain, via Wikimedia Commons",
  },
  {
    eventId: "eniac-dedicated",
    bucketFile: "content/timeline/1946/02.json",
    fileName: "eniac-dedicated.jpg",
    downloadUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6c/ENIAC_Penn1.jpg",
    title: "ENIAC at the University of Pennsylvania",
    caption: "TexasDex / Paul W. Shaffer, CC BY-SA 3.0, via Wikimedia Commons",
  },
  {
    eventId: "moore-school-lectures-1946",
    bucketFile: "content/timeline/1946/07.json",
    fileName: "moore-school-lectures-1946.jpg",
    downloadUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3d/MooreSchool001.jpg",
    title: "Moore School of Electrical Engineering",
    caption: "Swordsman1, public domain, via Wikimedia Commons",
  },
  {
    eventId: "bell-labs-transistor-invented",
    bucketFile: "content/timeline/1947/12.json",
    fileName: "bell-labs-transistor-invented.jpg",
    downloadUrl:
      "https://upload.wikimedia.org/wikipedia/commons/e/e5/The_First_Transistor_ever_made%2C_built_in_1947_-_Bell_Labs.jpg",
    title: "First transistor (1947)",
    caption: "Windell Oskay, CC BY 2.0, via Wikimedia Commons",
  },
  {
    eventId: "wiener-cybernetics-published",
    bucketFile: "content/timeline/1948/year.json",
    fileName: "wiener-cybernetics-published.png",
    downloadUrl: "https://upload.wikimedia.org/wikipedia/commons/5/56/Norbert_Wiener.png",
    title: "Norbert Wiener (1963)",
    caption: "Garry Olsh, CC0, via Wikimedia Commons",
  },
  {
    eventId: "manchester-baby-first-program",
    bucketFile: "content/timeline/1948/06.json",
    fileName: "manchester-baby-first-program.jpg",
    downloadUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Manchester_Baby_Replica.webp/1280px-Manchester_Baby_Replica.webp.jpg",
    title: "Manchester Baby replica",
    caption: "Logg Tandy, CC BY 4.0, via Wikimedia Commons",
  },
  {
    eventId: "claude-shannon-information-theory",
    bucketFile: "content/timeline/1948/10.json",
    fileName: "claude-shannon.jpg",
    downloadUrl:
      "https://upload.wikimedia.org/wikipedia/commons/c/c1/C.E._Shannon._Tekniska_museet_43069_%282x3_crop%29.jpg",
    title: "Claude Shannon",
    caption: "Tekniska museet, CC BY 2.0, via Wikimedia Commons",
  },
  {
    eventId: "edsac-initial-orders",
    bucketFile: "content/timeline/1949/05.json",
    fileName: "edsac-initial-orders.jpg",
    downloadUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/EDSAC_%2819%29.jpg/1280px-EDSAC_%2819%29.jpg",
    title: "EDSAC at Cambridge (1948)",
    caption:
      "Computer Laboratory, University of Cambridge. Reproduced by permission. CC BY 2.0, via Wikimedia Commons",
  },
];

async function download(url: string, dest: string): Promise<void> {
  if (existsSync(dest)) {
    return;
  }

  for (let attempt = 0; attempt < 5; attempt++) {
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (res.ok) {
      const buffer = Buffer.from(await res.arrayBuffer());
      writeFileSync(dest, buffer);
      return;
    }

    if (res.status === 429 && attempt < 4) {
      await new Promise((resolve) => setTimeout(resolve, 3000 * (attempt + 1)));
      continue;
    }

    throw new Error(`Failed to download ${url}: ${res.status} ${res.statusText}`);
  }
}

function mediaEntry(seed: ImageSeed) {
  return {
    type: "image" as const,
    url: `/media/timeline/${seed.fileName}`,
    title: seed.title,
    caption: seed.caption,
  };
}

function updateBucket(bucketPath: string, eventId: string, media: ReturnType<typeof mediaEntry>[]) {
  const fullPath = join(ROOT, bucketPath);
  const bucket = JSON.parse(readFileSync(fullPath, "utf8")) as {
    events: Array<{ id: string; media: unknown[] }>;
  };

  const event = bucket.events.find((entry) => entry.id === eventId);
  if (!event) {
    throw new Error(`Event ${eventId} not found in ${bucketPath}`);
  }

  event.media = media;
  writeFileSync(fullPath, `${JSON.stringify(bucket, null, 2)}\n`);
}

mkdirSync(MEDIA_DIR, { recursive: true });

const skipDownload = process.argv.includes("--json-only");
const downloaded = new Set<string>();

for (const seed of IMAGES) {
  const dest = join(MEDIA_DIR, seed.fileName);
  if (!skipDownload && !downloaded.has(seed.fileName)) {
    if (existsSync(dest)) {
      console.log(`Skipped ${seed.fileName} (exists)`);
    } else {
      await download(seed.downloadUrl, dest);
      console.log(`Downloaded ${seed.fileName}`);
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }
    downloaded.add(seed.fileName);
  }

  updateBucket(seed.bucketFile, seed.eventId, [mediaEntry(seed)]);
  console.log(`Updated ${seed.eventId}`);
}

console.log("Done.");
