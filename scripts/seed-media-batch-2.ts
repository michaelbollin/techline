#!/usr/bin/env npx tsx
/**
 * Download Wikimedia Commons images for timeline events 21–70 (ready assets only).
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
    eventId: "edsac-first-programs",
    bucketFile: "content/timeline/1949/05.json",
    fileName: "edsac-first-programs.jpg",
    downloadUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/EDSAC_%2819%29.jpg/1280px-EDSAC_%2819%29.jpg",
    title: "EDSAC at Cambridge (1948)",
    caption:
      "Computer Laboratory, University of Cambridge. Reproduced by permission. CC BY 2.0, via Wikimedia Commons",
  },
  {
    eventId: "turing-computing-machinery-intelligence",
    bucketFile: "content/timeline/1950/10.json",
    fileName: "turing-computing-machinery-intelligence.png",
    downloadUrl: "https://upload.wikimedia.org/wikipedia/commons/5/55/Turing_test_diagram.png",
    title: "Turing test diagram",
    caption: "Juan Alberto Sánchez Margallo, CC BY 2.5, via Wikimedia Commons",
  },
  {
    eventId: "turing-can-machines-think-quote",
    bucketFile: "content/timeline/1950/10.json",
    fileName: "alan-turing.jpg",
    downloadUrl: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Alan_turing_header.jpg",
    title: "Alan Turing",
    caption: "Elliott & Fry, public domain, via Wikimedia Commons",
  },
  {
    eventId: "univac-i-delivered",
    bucketFile: "content/timeline/1951/06.json",
    fileName: "univac-i-delivered.jpg",
    downloadUrl:
      "https://upload.wikimedia.org/wikipedia/commons/2/2f/Univac_I_Census_dedication.jpg",
    title: "UNIVAC I at the U.S. Census Bureau",
    caption: "U.S. Census Bureau, public domain, via Wikimedia Commons",
  },
  {
    eventId: "grace-hopper-a0-compiler",
    bucketFile: "content/timeline/1952/year.json",
    fileName: "grace-hopper-a0-compiler.jpg",
    downloadUrl:
      "https://upload.wikimedia.org/wikipedia/commons/9/98/Commodore_Grace_M._Hopper%2C_USN_%28covered%29_head_and_shoulders_crop.jpg",
    title: "Grace Hopper",
    caption: "James S. Davis, public domain, via Wikimedia Commons",
  },
  {
    eventId: "whirlwind-core-memory",
    bucketFile: "content/timeline/1953/year.json",
    fileName: "whirlwind-core-memory.jpg",
    downloadUrl:
      "https://upload.wikimedia.org/wikipedia/commons/0/08/Whirlwind_1_%282103090140%29.jpg",
    title: "Whirlwind computer",
    caption: "vonguard, CC BY-SA 2.0, via Wikimedia Commons",
  },
  {
    eventId: "marvin-minsky-dartmouth-workshop",
    bucketFile: "content/timeline/1956/08.json",
    fileName: "marvin-minsky-dartmouth-workshop.jpg",
    downloadUrl:
      "https://upload.wikimedia.org/wikipedia/commons/f/f9/Marvin_Minsky_at_OLPCb_%283x4_cropped%29.jpg",
    title: "Marvin Minsky",
    caption: "Sethwoodworth, CC BY 3.0, via Wikimedia Commons",
  },
  {
    eventId: "ibm-ramac-305-announced",
    bucketFile: "content/timeline/1956/09.json",
    fileName: "ibm-ramac-305-announced.jpg",
    downloadUrl:
      "https://upload.wikimedia.org/wikipedia/commons/2/25/IBM_305_RAMAC_system_%281%29.jpg",
    title: "IBM 305 RAMAC",
    caption: "Norsk Teknisk Museum, CC BY-SA 4.0, via Wikimedia Commons",
  },
  {
    eventId: "frank-rosenblatt-perceptron",
    bucketFile: "content/timeline/1957/year.json",
    fileName: "frank-rosenblatt-perceptron.jpg",
    downloadUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Frank_Rosenblatt.jpg",
    title: "Frank Rosenblatt",
    caption: "Heinz Nixdorf MuseumsForum, CC BY-SA 4.0, via Wikimedia Commons",
  },
  {
    eventId: "fortran-formally-published",
    bucketFile: "content/timeline/1957/02.json",
    fileName: "fortran-logo.svg",
    downloadUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Fortran_logo.svg",
    title: "FORTRAN logo",
    caption: "Fortran-lang community, public domain, via Wikimedia Commons",
  },
  {
    eventId: "fortran-first-delivery",
    bucketFile: "content/timeline/1957/04.json",
    fileName: "fortran-logo.svg",
    downloadUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Fortran_logo.svg",
    title: "FORTRAN logo",
    caption: "Fortran-lang community, public domain, via Wikimedia Commons",
  },
  {
    eventId: "john-mccarthy-lisp-invented",
    bucketFile: "content/timeline/1958/year.json",
    fileName: "john-mccarthy-lisp-invented.jpg",
    downloadUrl: "https://upload.wikimedia.org/wikipedia/commons/4/49/John_McCarthy_Stanford.jpg",
    title: "John McCarthy",
    caption: "null0, CC BY-SA 2.0, via Wikimedia Commons",
  },
  {
    eventId: "jack-kilby-integrated-circuit",
    bucketFile: "content/timeline/1958/09.json",
    fileName: "jack-kilby-integrated-circuit.png",
    downloadUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ea/Replica_IC.png",
    title: "Replica of Kilby's first integrated circuit",
    caption: "Florian Schäffer, CC BY-SA 4.0, via Wikimedia Commons",
  },
  {
    eventId: "robert-noyce-integrated-circuit",
    bucketFile: "content/timeline/1959/year.json",
    fileName: "robert-noyce-integrated-circuit.png",
    downloadUrl:
      "https://upload.wikimedia.org/wikipedia/commons/8/82/Robert_Noyce_with_Motherboard_1959.png",
    title: "Robert Noyce with motherboard (1959)",
    caption: "Intel Free Press, CC BY-SA 2.0, via Wikimedia Commons",
  },
  {
    eventId: "dec-pdp-1-introduced",
    bucketFile: "content/timeline/1960/11.json",
    fileName: "dec-pdp-1-introduced.jpg",
    downloadUrl:
      "https://upload.wikimedia.org/wikipedia/commons/f/f0/DEC_PDP-1_Demo_Lab_at_Mountain_View%27s_Computer_History_Museum.jpg",
    title: "DEC PDP-1 at the Computer History Museum",
    caption: "Alexey Komarov, CC BY-SA 4.0, via Wikimedia Commons",
  },
  {
    eventId: "tony-hoare-quicksort-published",
    bucketFile: "content/timeline/1961/07.json",
    fileName: "tony-hoare-quicksort-published.jpg",
    downloadUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Sir_Tony_Hoare_IMG_5125.jpg",
    title: "Tony Hoare",
    caption: "Rama, CC BY-SA 2.0, via Wikimedia Commons",
  },
  {
    eventId: "jean-sammet-formac-published",
    bucketFile: "content/timeline/1962/year.json",
    fileName: "jean-sammet-formac-published.jpg",
    downloadUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Jean_Sammet_UMD_1979.jpg",
    title: "Jean Sammet (1979)",
    caption: "Ben Shneiderman, CC BY-SA 4.0, via Wikimedia Commons",
  },
  {
    eventId: "ascii-standard-published",
    bucketFile: "content/timeline/1963/year.json",
    fileName: "ascii-standard-published.svg",
    downloadUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1b/ASCII-Table-wide.svg",
    title: "ASCII character table",
    caption: "ZZT32 / Yufeng Huang, public domain, via Wikimedia Commons",
  },
  {
    eventId: "sketchpad-created",
    bucketFile: "content/timeline/1963/year.json",
    fileName: "sketchpad-created.jpg",
    downloadUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/SketchpadDissertation-Fig1-2.tif/1280px-SketchpadDissertation-Fig1-2.tif.jpg",
    title: "Ivan Sutherland operating Sketchpad",
    caption: "Ivan Sutherland / Kerry Rodden scan, CC BY-SA 3.0, via Wikimedia Commons",
  },
  {
    eventId: "ibm-system-360-announced",
    bucketFile: "content/timeline/1964/04.json",
    fileName: "ibm-system-360-announced.jpg",
    downloadUrl:
      "https://upload.wikimedia.org/wikipedia/commons/b/b5/IBM_System_360_model_30_profile.agr.jpg",
    title: "IBM System/360 Model 30",
    caption: "ArnoldReinhold, CC BY-SA 3.0, via Wikimedia Commons",
  },
  {
    eventId: "basic-first-run",
    bucketFile: "content/timeline/1964/05.json",
    fileName: "basic-first-run.png",
    downloadUrl: "https://upload.wikimedia.org/wikipedia/commons/1/19/Green_bottles_BASIC.png",
    title: "BASIC program listing",
    caption: "Belbury, public domain, via Wikimedia Commons",
  },
  {
    eventId: "seymour-cray-cdc-6600",
    bucketFile: "content/timeline/1964/09.json",
    fileName: "seymour-cray-cdc-6600.png",
    downloadUrl: "https://upload.wikimedia.org/wikipedia/commons/b/be/CDC_6600_Overview.png",
    title: "CDC 6600 overview",
    caption: "FlyAkwa, CC BY-SA 4.0, via Wikimedia Commons",
  },
  {
    eventId: "dec-pdp-8-shipped",
    bucketFile: "content/timeline/1965/03.json",
    fileName: "dec-pdp-8-shipped.jpg",
    downloadUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6b/PDP-8_%281%29.jpg",
    title: "DEC PDP-8",
    caption: "Kris Arnold, CC BY-SA 2.0, via Wikimedia Commons",
  },
  {
    eventId: "gordon-moore-moores-law",
    bucketFile: "content/timeline/1965/04.json",
    fileName: "gordon-moore.jpg",
    downloadUrl:
      "https://upload.wikimedia.org/wikipedia/commons/1/1d/Former_Intel_CEO_Gordon_Moore_in_his_cubicle.jpg",
    title: "Gordon Moore",
    caption: "Intel Free Press, CC BY-SA 2.0, via Wikimedia Commons",
  },
  {
    eventId: "moore-components-doubling-quote",
    bucketFile: "content/timeline/1965/04.json",
    fileName: "gordon-moore.jpg",
    downloadUrl:
      "https://upload.wikimedia.org/wikipedia/commons/1/1d/Former_Intel_CEO_Gordon_Moore_in_his_cubicle.jpg",
    title: "Gordon Moore",
    caption: "Intel Free Press, CC BY-SA 2.0, via Wikimedia Commons",
  },
  {
    eventId: "dec-pdp-10-released",
    bucketFile: "content/timeline/1966/year.json",
    fileName: "dec-pdp-10-released.jpg",
    downloadUrl:
      "https://upload.wikimedia.org/wikipedia/commons/1/17/DEC_PDP-10_%28from_ca._1970_named_decsystem-10%29_mainframe_computer_system%2C_1970s_%28edited%2C_white_background%29.jpg",
    title: "DEC PDP-10",
    caption: "Gah4, CC BY-SA 4.0, via Wikimedia Commons",
  },
  {
    eventId: "eliza-created",
    bucketFile: "content/timeline/1966/year.json",
    fileName: "eliza-created.jpg",
    downloadUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4e/ELIZA_conversation.jpg",
    title: "ELIZA conversation",
    caption: "Public domain, via Wikimedia Commons",
  },
  {
    eventId: "simula-67-presented",
    bucketFile: "content/timeline/1967/05.json",
    fileName: "simula-67-presented.svg",
    downloadUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Simula_-_logo.svg",
    title: "Simula logo",
    caption: "Norwegian Computing Center, public domain, via Wikimedia Commons",
  },
  {
    eventId: "knuth-taocp-volume-1-published",
    bucketFile: "content/timeline/1968/year.json",
    fileName: "knuth-taocp-volume-1-published.jpg",
    downloadUrl:
      "https://upload.wikimedia.org/wikipedia/commons/a/a5/Donald_Ervin_Knuth_%28cropped%29.jpg",
    title: "Donald Knuth",
    caption: "Alex Handy, CC BY-SA 2.0, via Wikimedia Commons",
  },
  {
    eventId: "dijkstra-go-to-considered-harmful",
    bucketFile: "content/timeline/1968/03.json",
    fileName: "edsger-dijkstra.jpg",
    downloadUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Edsger_Wybe_Dijkstra.jpg",
    title: "Edsger W. Dijkstra",
    caption: "Hamilton Richards, CC BY-SA 3.0, via Wikimedia Commons",
  },
  {
    eventId: "dijkstra-goto-letter-quote",
    bucketFile: "content/timeline/1968/03.json",
    fileName: "edsger-dijkstra.jpg",
    downloadUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Edsger_Wybe_Dijkstra.jpg",
    title: "Edsger W. Dijkstra",
    caption: "Hamilton Richards, CC BY-SA 3.0, via Wikimedia Commons",
  },
  {
    eventId: "moore-noyce-intel-founded",
    bucketFile: "content/timeline/1968/07.json",
    fileName: "moore-noyce-intel-founded.png",
    downloadUrl:
      "https://upload.wikimedia.org/wikipedia/commons/6/60/Gordon_Moore_and_Robert_Noyce_at_Intel_in_1970.png",
    title: "Gordon Moore and Robert Noyce at Intel (1970)",
    caption: "Intel Free Press, CC BY-SA 2.0, via Wikimedia Commons",
  },
  {
    eventId: "unix-created",
    bucketFile: "content/timeline/1969/year.json",
    fileName: "unix-created.svg",
    downloadUrl: "https://upload.wikimedia.org/wikipedia/commons/7/77/Unix_history-simple.svg",
    title: "Unix family tree",
    caption: "Eraserhead1 et al., CC BY-SA 3.0, via Wikimedia Commons",
  },
  {
    eventId: "margaret-hamilton-apollo-software",
    bucketFile: "content/timeline/1969/07.json",
    fileName: "margaret-hamilton-apollo-software.jpg",
    downloadUrl:
      "https://upload.wikimedia.org/wikipedia/commons/d/db/Margaret_Hamilton_-_restoration.jpg",
    title: "Margaret Hamilton with Apollo guidance software",
    caption: "Adam Cuerden (restoration), public domain, via Wikimedia Commons",
  },
  {
    eventId: "arpanet-first-message",
    bucketFile: "content/timeline/1969/10.json",
    fileName: "arpanet-first-message.png",
    downloadUrl:
      "https://upload.wikimedia.org/wikipedia/commons/b/bf/Arpanet_logical_map%2C_march_1977.png",
    title: "ARPANET logical map (1977)",
    caption: "ARPANET / Computer History Museum, public domain, via Wikimedia Commons",
  },
  {
    eventId: "niklaus-wirth-pascal-published",
    bucketFile: "content/timeline/1970/year.json",
    fileName: "niklaus-wirth.jpg",
    downloadUrl: "https://upload.wikimedia.org/wikipedia/commons/4/49/Niklaus_Wirth%2C_UrGU.jpg",
    title: "Niklaus Wirth",
    caption: "Tyomitch, copyrighted free use, via Wikimedia Commons",
  },
  {
    eventId: "pascal-report-published",
    bucketFile: "content/timeline/1970/11.json",
    fileName: "niklaus-wirth.jpg",
    downloadUrl: "https://upload.wikimedia.org/wikipedia/commons/4/49/Niklaus_Wirth%2C_UrGU.jpg",
    title: "Niklaus Wirth",
    caption: "Tyomitch, copyrighted free use, via Wikimedia Commons",
  },
  {
    eventId: "stephen-cook-np-completeness",
    bucketFile: "content/timeline/1971/year.json",
    fileName: "stephen-cook-np-completeness.jpg",
    downloadUrl: "https://upload.wikimedia.org/wikipedia/commons/6/68/Prof.Cook.jpg",
    title: "Stephen Cook",
    caption: "Jiří Janíček, CC BY-SA 3.0, via Wikimedia Commons",
  },
  {
    eventId: "phone-phreaking-esquire-article",
    bucketFile: "content/timeline/1971/10.json",
    fileName: "phone-phreaking-esquire-article.jpg",
    downloadUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Blue_Box_in_museum.jpg",
    title: "Blue box at the Computer History Museum",
    caption: "RaD man / David Remahl, CC BY-SA 3.0, via Wikimedia Commons",
  },
  {
    eventId: "intel-4004-introduced",
    bucketFile: "content/timeline/1971/11.json",
    fileName: "intel-4004-introduced.jpg",
    downloadUrl: "https://upload.wikimedia.org/wikipedia/commons/5/52/Intel_4004.jpg",
    title: "Intel 4004 microprocessor",
    caption: "LucaDetomi, CC BY-SA 3.0, via Wikimedia Commons",
  },
];

async function download(url: string, dest: string): Promise<boolean> {
  if (existsSync(dest)) {
    return true;
  }

  for (let attempt = 0; attempt < 8; attempt++) {
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (res.ok) {
      const buffer = Buffer.from(await res.arrayBuffer());
      writeFileSync(dest, buffer);
      return true;
    }

    if (res.status === 429 && attempt < 7) {
      const waitMs = 5000 * (attempt + 1);
      console.log(`Rate limited on ${dest}, waiting ${waitMs}ms...`);
      await new Promise((resolve) => setTimeout(resolve, waitMs));
      continue;
    }

    console.error(`Failed to download ${url}: ${res.status} ${res.statusText}`);
    return false;
  }

  return false;
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
      const ok = await download(seed.downloadUrl, dest);
      if (ok) {
        console.log(`Downloaded ${seed.fileName}`);
      } else {
        console.log(`Skipped download for ${seed.fileName} (will retry later)`);
      }
    }
    downloaded.add(seed.fileName);
  }

  if (existsSync(dest)) {
    updateBucket(seed.bucketFile, seed.eventId, [mediaEntry(seed)]);
    console.log(`Updated ${seed.eventId}`);
  } else {
    console.log(`Skipped JSON for ${seed.eventId} (missing ${seed.fileName})`);
  }
}

console.log("Done.");
