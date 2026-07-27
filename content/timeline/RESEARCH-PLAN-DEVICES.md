# Techline research plan — devices & hardware

Companion to [RESEARCH-PLAN.md](./RESEARCH-PLAN.md) (languages & frameworks), [RESEARCH-PLAN-INFRA.md](./RESEARCH-PLAN-INFRA.md) (protocols, tooling, cloud *services*), and [RESEARCH-PLAN-PEOPLE.md](./RESEARCH-PLAN-PEOPLE.md) (leadership milestones).

Computers, servers, smartphones, tablets, workstations, and embedded boards that changed how developers write, deploy, or consume software — especially web and mobile.

All dates must be verified from primary or authoritative sources before adding to `content/timeline/`.
Status: `[ ]` pending · `[~]` in progress · `[x]` verified & added · `[-]` skip (not notable enough)

Suggested tags: `hardware`, `pc`, `server`, `mobile`, `smartphone`, `tablet`, `workstation`, `mainframe`, `embedded`, `laptop`, `chip`, `arm`, `x86`

---

## Rules for inclusion

1. **First public release / invention** — always include for tier-1 items (ship date preferred over announce when both matter; use separate events if gap is significant, e.g. iPhone intro vs sale).
2. **Developer & web relevance** — hardware that created or shifted a dev platform (PC compatibles, smartphones, Pi, NeXT where WWW was built).
3. **Termination as separate events** — EOL, discontinuation (BlackBerry OS, IBM PC line) paired via `relatedIds`.
4. **Skip** minor revisions, regional SKUs, color variants, unless they changed the dev story (Retina → mobile web/CSS is borderline tier-2).
5. **Never guess** — cite primary source; use `year.json` + `datePrecision: "year"` when month/day unknown.
6. **Two sources minimum** for tier-1 before marking `[x]` — one for date (`role: date`), one for overview (`role: overview`). Never date from Wikipedia alone.

### Categories (`lib/timeline/schema.ts`)

| Category | Use for |
|----------|---------|
| `hardware` | Shipped products — PC, phone, server, SBC |
| `invention` | Pre-product breakthroughs — ENIAC, System/360 announcement, Xerox Alto |
| `company` | Only when no distinct device event exists |

### Importance

| Level | Meaning | Examples |
|-------|---------|----------|
| `1` | Platform shift | IBM PC, iPhone sale, Android OHA, Raspberry Pi, System/360 |
| `2` | Significant, narrower | BlackBerry, Palm Pilot, ThinkPad, SPARCstation, VMware Workstation |
| `3` | Dense history | TRS-80, PET 2001, early portables, Sidekick |

### Scope — include

| Track | Examples |
|-------|----------|
| **Platforms** | PCs, workstations, minis, mainframes that hosted dev tools |
| **Servers** | Physical server lineage backend devs ran on |
| **Mobile** | Smartphones/tablets that created native + mobile-web dev |
| **Embedded / maker** | Arduino, Raspberry Pi, ESP8266 |
| **Architecture** | CPU milestones when they unlocked new dev models (x86-64, Apple silicon for local dev) |

### Scope — exclude (or `[-]`)

- Pure consumer gadgets (game consoles, TVs) unless a dev SDK mattered
- Component-level parts (RAM, displays) unless paradigm-shifting — OLPC display covered via `mary-lou-jepsen-olpc-displays`
- **Cloud services** (EC2, S3, Lambda) — [RESEARCH-PLAN-INFRA.md](./RESEARCH-PLAN-INFRA.md) Batch Q
- **OS/kernel births** (Unix, Linux, Minix, Windows NT as OS) — INFRA Batch Q
- Company founding without a device — `steve-wozniak-apple-founded` exists; still add **Apple II**, **Macintosh** products

---

## Overlap with other plans

| Topic | Where it lives |
|-------|----------------|
| Unix, Linux, Minix, POSIX, WSL | INFRA Batch Q |
| Amazon EC2, S3, Lambda, GAE, Heroku | INFRA Batch Q (PaaS & cloud) |
| Browsers, HTTP, mobile browser releases | INFRA / languages plan |
| `steve-jobs-iphone-introduced` | People/hardware — pair with iPhone **sale**, App Store |
| `microsoft-founded` | People/company — pair with **Altair 8800**, **IBM PC** |
| MS-DOS, Windows releases | Languages or INFRA (software), not device unless tied to a machine launch |

---

## Already covered — do not duplicate

| Existing event | Notes |
|----------------|-------|
| `steve-jobs-iphone-introduced` (2007-01-09) | Announcement — `iphone-goes-on-sale` added for retail launch |
| `apple-ii-introduced` (1977-04-16) | West Coast Computer Faire intro — covers Apple II hardware milestone |
| `mary-lou-jepsen-olpc-displays` (2007) | OLPC hardware via people milestone |
| `susan-kare-macintosh-icons` (1984) | UI design — link from Macintosh product event |
| `steve-wozniak-apple-founded` (1976-04-01) | Company — add Apple II, Macintosh products |
| `microsoft-founded` (1975-04-04) | References Altair — add Altair 8800 hardware event |
| `edsac-initial-orders` (1949) | Stored-program computer — ENIAC/UNIVAC are separate |
| `worldwideweb-browser` (1990) | Software on NeXT — link NeXT Computer via `relatedIds` |
| `chrome-for-android-released`, `kotlin-android-official`, `samsung-internet-released` | Mobile software — pair with Android/G1 device events |

---

## Where to search

| Resource | Use for |
|----------|---------|
| [IBM History](https://www.ibm.com/history/) | System/360, PC, ThinkPad |
| [Computer History Museum](https://www.computerhistory.org/) | ENIAC, minis, PCs, timelines |
| [Old-Computers.com](https://www.old-computers.com/) | Release dates, specs |
| Official newsrooms (Apple, Google, Samsung, Raspberry Pi Foundation) | Product launches |
| [Internet Archive](https://archive.org/) | Popular Electronics Jan 1975 (Altair), BYTE |
| [IEEE Annals of the History of Computing](https://www.computer.org/csdl/magazine/an) | Academic verification |
| GitHub first commit / release tags | Arduino, Raspberry Pi |
| [The Register](https://www.theregister.com/), contemporary news | Server/workstation launches |
| [Vintage Computer Federation](https://www.vcfed.org/), [TRS-80.org](https://www.trs-80.org/) | Hobbyist PC dates |

---

## Batch A — Origins & mainframes (1940s–1960s)

| Item | Proposed ID | Date | Imp | Date source | Overview source | Status |
|------|-------------|------|-----|-------------|-----------------|--------|
| ENIAC dedicated | `eniac-dedicated` | 1946-02-14 | 1 | [UPenn ENIAC](https://www.eniac.upenn.edu/) | [CHM ENIAC](https://www.computerhistory.org/revolution/birth-of-the-computer/4/78) | `[x]` |
| UNIVAC I delivered to Census | `univac-i-delivered` | 1951-06-14 | 1 | [Census Bureau](https://www.census.gov/history/www/innovations/technology/univac_i.html) | [Wikipedia UNIVAC I](https://en.wikipedia.org/wiki/UNIVAC_I) | `[x]` |
| IBM System/360 announced | `ibm-system-360-announced` | 1964-04-07 | 1 | [IBM System/360](https://www.ibm.com/history/system-360) | [Wikipedia System/360](https://en.wikipedia.org/wiki/IBM_System/360) | `[x]` |
| DEC PDP-8 shipped | `dec-pdp-8-shipped` | 1965-03 | 1 | [CHM PDP-8](https://www.computerhistory.org/collections/catalog/X284.82) | [Wikipedia PDP-8](https://en.wikipedia.org/wiki/PDP-8) | `[x]` |

---

## Batch B — Minicomputers & timesharing (1970s)

| Item | Proposed ID | Date | Imp | Date source | Overview source | Status |
|------|-------------|------|-----|-------------|-----------------|--------|
| Xerox Alto operational | `xerox-alto-operational` | 1973 | 1 | [CHM Alto](https://www.computerhistory.org/revolution/personal-computers/17/319) | [Wikipedia Xerox Alto](https://en.wikipedia.org/wiki/Xerox_Alto) | `[x]` |
| Altair 8800 (Popular Electronics cover) | `altair-8800-released` | 1975-01 | 1 | [Popular Electronics Jan 1975](https://archive.org/details/popularelectronics-1975-01) | [HNF PC birth](https://www.hnf.de/en/permanent-exhibition/exhibition-areas/computers-for-everyone-1980-to-2000/the-birth-of-the-pc-from-the-garage-to-the-big-wide-world.html) | `[x]` |
| Cray-1 delivered | `cray-1-delivered` | 1976 | 1 | [CHM Cray-1](https://www.computerhistory.org/collections/catalog/102660577) | [Wikipedia Cray-1](https://en.wikipedia.org/wiki/Cray-1) | `[x]` |
| Apple II goes on sale | `apple-ii-released` | 1977-06-10 | 1 | — | Covered by `apple-ii-introduced` (1977-04-16) | `[x]` |
| Commodore PET 2001 | `commodore-pet-2001-released` | 1977-01 | 2 | [Commodore.ca PET](https://www.commodore.ca/gallery/museum/pet2001.htm) | [Wikipedia Commodore PET](https://en.wikipedia.org/wiki/Commodore_PET) | `[x]` |
| TRS-80 Model I | `trs-80-model-i-released` | 1977-08 | 2 | [TRS-80.org](https://www.trs-80.org/) | [Wikipedia TRS-80](https://en.wikipedia.org/wiki/TRS-80) | `[x]` |
| DEC VAX-11/780 | `dec-vax-11-780-released` | 1977-10 | 2 | [VAX history](https://www.vaxdungeon.com/) | [Wikipedia VAX](https://en.wikipedia.org/wiki/VAX) | `[x]` |

---

## Batch C — PC revolution & GUI (1981–1988)

| Item | Proposed ID | Date | Imp | Date source | Overview source | Status |
|------|-------------|------|-----|-------------|-----------------|--------|
| IBM PC 5150 announced | `ibm-pc-5150-released` | 1981-08-12 | 1 | [IBM PC history](https://www.ibm.com/history/personal-computer) | [Wikipedia IBM PC](https://en.wikipedia.org/wiki/IBM_Personal_Computer) | `[x]` |
| Commodore 64 released | `commodore-64-released` | 1982-08 | 1 | [Commodore.ca C64](https://www.commodore.ca/products/cbm/64/commodore_64.htm) | [Wikipedia C64](https://en.wikipedia.org/wiki/Commodore_64) | `[x]` |
| Sun-1 workstation | `sun-1-released` | 1982-05 | 2 | Sun corporate archives | [Wikipedia Sun-1](https://en.wikipedia.org/wiki/Sun-1) | `[x]` |
| IBM PC XT (internal HDD standard) | `ibm-pc-xt-released` | 1983-03 | 2 | [IBM PC family](https://en.wikipedia.org/wiki/IBM_Personal_Computer) | [IBM history](https://www.ibm.com/history/personal-computer) | `[x]` |
| Apple Lisa | `apple-lisa-released` | 1983-01-19 | 2 | [Apple newsroom](https://www.apple.com/newsroom/) | [Wikipedia Lisa](https://en.wikipedia.org/wiki/Apple_Lisa) | `[x]` |
| Macintosh introduced & shipped | `macintosh-128k-released` | 1984-01-24 | 1 | [Apple Macintosh intro](https://www.apple.com/newsroom/1984/01/24Apple-Introduces-Macintosh-Advanced-Personal-Computer/) | [Wikipedia Macintosh 128K](https://en.wikipedia.org/wiki/Macintosh_128K) | `[x]` |
| Intel 80386 introduced | `intel-80386-introduced` | 1985-10 | 2 | [Intel 386 history](https://www.intel.com/content/www/us/en/history/virtual-vault/articles/intel-386.html) | [Wikipedia i386](https://en.wikipedia.org/wiki/Intel_80386) | `[x]` |
| NeXT Computer | `next-computer-released` | 1988-10-12 | 1 | [Wikipedia NeXT Computer](https://en.wikipedia.org/wiki/NeXT_Computer) | [CERN WWW on NeXT](https://www.w3.org/History/1989/proposal.html) | `[x]` |

> Link `macintosh-128k-released` → `susan-kare-macintosh-icons`, `steve-wozniak-apple-founded`. Link `next-computer-released` → `worldwideweb-browser`.

---

## Batch D — Laptops, RISC & Windows era (1989–1999)

| Item | Proposed ID | Date | Imp | Date source | Overview source | Status |
|------|-------------|------|-----|-------------|-----------------|--------|
| Apple Macintosh Portable | `macintosh-portable-released` | 1989-09 | 3 | Apple newsroom | [Wikipedia Mac Portable](https://en.wikipedia.org/wiki/Macintosh_Portable) | `[x]` |
| SPARCstation 1 | `sparcstation-1-released` | 1989-05 | 2 | Sun archives | [Wikipedia SPARCstation](https://en.wikipedia.org/wiki/SPARCstation) | `[x]` |
| IBM ThinkPad 700C | `ibm-thinkpad-700c-released` | 1992-10 | 2 | [IBM ThinkPad history](https://www.ibm.com/history/thinkpad) | [Wikipedia ThinkPad](https://en.wikipedia.org/wiki/ThinkPad) | `[x]` |
| Apple PowerBook | `apple-powerbook-released` | 1991-10 | 2 | Apple newsroom | [Wikipedia PowerBook](https://en.wikipedia.org/wiki/PowerBook) | `[x]` |
| Apple iMac G3 | `imac-g3-released` | 1998-08-15 | 2 | Apple newsroom | [Wikipedia iMac G3](https://en.wikipedia.org/wiki/IMac_G3) | `[x]` |
| VMware Workstation 1.0 | `vmware-workstation-released` | 1999-05-15 | 2 | [VMware history](https://www.vmware.com/company/history.html) | [Wikipedia VMware](https://en.wikipedia.org/wiki/VMware) | `[x]` |

---

## Batch E — Mobile pre-iPhone (1994–2006)

| Item | Proposed ID | Date | Imp | Date source | Overview source | Status |
|------|-------------|------|-----|-------------|-----------------|--------|
| IBM Simon Personal Communicator | `ibm-simon-released` | 1994-08 | 2 | BellSouth / IBM archives | [CHM timeline](https://www.computerhistory.org/timeline/computers/) | `[x]` |
| Palm Pilot 1000 | `palm-pilot-1000-released` | 1996-03 | 2 | Palm archives | [Wikipedia PalmPilot](https://en.wikipedia.org/wiki/PalmPilot) | `[x]` |
| Nokia 9000 Communicator | `nokia-9000-communicator-released` | 1996-08 | 2 | Nokia press | [Wikipedia 9000](https://en.wikipedia.org/wiki/Nokia_9000) | `[x]` |
| BlackBerry 5810 (phone + email) | `blackberry-5810-released` | 2002-03 | 2 | RIM press | [Wikipedia BlackBerry](https://en.wikipedia.org/wiki/BlackBerry) | `[x]` |
| Danger Hiptop / T-Mobile Sidekick | `sidekick-released` | 2002-10 | 3 | T-Mobile / Danger | [Wikipedia Sidekick](https://en.wikipedia.org/wiki/Sidekick) | `[x]` |

---

## Batch F — Smartphone & tablet era (2007–2012)

| Item | Proposed ID | Date | Imp | Date source | Overview source | Status |
|------|-------------|------|-----|-------------|-----------------|--------|
| iPhone goes on sale (US) | `iphone-goes-on-sale` | 2007-06-29 | 1 | [Apple iPhone availability](https://www.apple.com/newsroom/2007/06/28iPhone-Available-Coming-to-Additional-Countries-on-September-28/) | `steve-jobs-iphone-introduced` | `[x]` |
| Android announced (Open Handset Alliance) | `android-announced` | 2007-11-05 | 1 | [Google Blog Android](https://googleblog.blogspot.com/2007/11/introducing-android.html) | [Wikipedia Android](https://en.wikipedia.org/wiki/Android_(operating_system)) | `[x]` |
| iPhone App Store opens | `iphone-app-store-opens` | 2008-07-10 | 1 | [Apple App Store](https://www.apple.com/newsroom/2008/07/10App-Store-Downloads-Top-10-Million-in-First-Weekend/) | [Wikipedia App Store](https://en.wikipedia.org/wiki/App_Store_(Apple)) | `[x]` |
| T-Mobile G1 (first Android phone) | `t-mobile-g1-released` | 2008-10-22 | 1 | [Google Android blog](https://blog.google/products/android/android-market-first-phone/) | [Wikipedia HTC Dream](https://en.wikipedia.org/wiki/HTC_Dream) | `[x]` |
| iPad introduced | `ipad-introduced` | 2010-01-27 | 1 | [Apple iPad](https://www.apple.com/newsroom/2010/01/27Apple-Launches-iPad/) | [Wikipedia iPad](https://en.wikipedia.org/wiki/IPad) | `[x]` |
| Raspberry Pi Model B | `raspberry-pi-model-b-released` | 2012-02-29 | 1 | [Raspberry Pi news](https://www.raspberrypi.com/news/) | [Wikipedia Raspberry Pi](https://en.wikipedia.org/wiki/Raspberry_Pi) | `[x]` |

> Link mobile events to `chrome-for-android-released`, `kotlin-android-official`, `samsung-internet-released` where appropriate.

---

## Batch G — Embedded, ARM & post-PC dev (2005–2020)

| Item | Proposed ID | Date | Imp | Date source | Overview source | Status |
|------|-------------|------|-----|-------------|-----------------|--------|
| Arduino first boards shipped | `arduino-released` | 2005-10 | 1 | [Arduino Guide](https://www.arduino.cc/en/Guide/Introduction) | [Wikipedia Arduino](https://en.wikipedia.org/wiki/Arduino) | `[x]` |
| Intel Atom (netbook class) | `intel-atom-announced` | 2008-04 | 2 | Intel press | [Wikipedia Atom](https://en.wikipedia.org/wiki/Atom_(system_on_chip)) | `[x]` |
| Apple iPhone 4 (Retina display) | `iphone-4-released` | 2010-06-24 | 2 | Apple newsroom | [Wikipedia iPhone 4](https://en.wikipedia.org/wiki/IPhone_4) — mobile web/CSS | `[x]` |
| Google Chromebook (CR-48 pilot) | `chromebook-cr-48-pilot` | 2010-12 | 2 | Google blog | [Wikipedia Chromebook](https://en.wikipedia.org/wiki/Chromebook) | `[x]` |
| Apple M1 announced | `apple-m1-announced` | 2020-11-10 | 2 | Apple newsroom | [Wikipedia Apple silicon](https://en.wikipedia.org/wiki/Apple_silicon) | `[x]` |
| ESP8266 module popularized | `esp8266-released` | 2014-08 | 3 | Espressif / community docs | [Wikipedia ESP8266](https://en.wikipedia.org/wiki/ESP8266) | `[x]` |

---

## Batch H — Server & datacenter hardware (dev-relevant)

Physical lineage only — cloud VM products stay in INFRA.

| Item | Proposed ID | Date | Imp | Date source | Overview source | Status |
|------|-------------|------|-----|-------------|-----------------|--------|
| DEC PDP-10 | `dec-pdp-10-released` | 1966 | 2 | CHM | [Wikipedia PDP-10](https://en.wikipedia.org/wiki/PDP-10) | `[x]` |
| Sun Enterprise 10000 ("Starfire") | `sun-enterprise-10000-released` | 1996 | 2 | Sun press | [Wikipedia Starfire](https://en.wikipedia.org/wiki/Sun_Enterprise) | `[x]` |
| HP ProLiant era (Compaq) | `hp-proliant-era` | 1993 | 3 | HP archives | [Wikipedia ProLiant](https://en.wikipedia.org/wiki/ProLiant) | `[x]` |
| AMD64 / x86-64 (Opteron launch) | `amd64-x86-64-announced` | 2003-04-22 | 1 | [AMD Opteron press](https://www.amd.com/en/press-releases/2003-04-22-amd-announces-the-worlds-first-64-bit-processor-for-servers-and-workstations) | [Wikipedia x86-64](https://en.wikipedia.org/wiki/X86-64) | `[x]` |
| Apple Silicon Macs ship (M1 MacBook) | `apple-m1-mac-shipped` | 2020-11-17 | 2 | Apple newsroom | [Wikipedia Apple silicon](https://en.wikipedia.org/wiki/Apple_silicon) | `[x]` |

---

## Batch I — Termination / EOL (separate events)

| Item | Proposed ID | Date | Pair with | Status |
|------|-------------|------|-----------|--------|
| IBM PC 5150 discontinued | `ibm-pc-5150-discontinued` | 1987-04-02 | `ibm-pc-5150-released` | `[x]` |
| BlackBerry OS EOL | `blackberry-os-eol` | 2022-01-04 | `blackberry-5810-released` | `[x]` |
| Windows Phone support ended | `windows-phone-eol` | 2017-07 | (add Lumia device if covered) | `[x]` |

---

## Tier 2 / 3 backlog (verify before promoting)

Promote to a batch table above once dual-sourced. Do not add to JSON until verified.

### Personal computers & home dev (1970s–1990s)

| Item | Notes | Status |
|------|-------|--------|
| Apple I kit | 1976 — link `steve-wozniak-apple-founded` | `[x]` |
| Osborne 1 portable | 1981 — first mass-market portable | `[x]` |
| Amiga 1000 | 1985 — multimedia / demo scene dev | `[x]` |
| Atari ST | 1985 — MIDI + dev tools | `[x]` |
| IBM PC AT | 1984 — 80286, 16-bit ISA | `[x]` |
| Compaq Portable | 1983 — first IBM PC compatible portable | `[x]` |
| Acorn Archimedes / ARM1 | 1987 — ARM architecture origins | `[x]` |
| NeXTstation | 1990 — cheaper NeXT line | `[x]` |
| SGI Indigo / Iris | 1991 — 3D workstation dev | `[x]` |
| BeBox | 1995 — dual-CPU hobbyist machine | `[x]` |

### Laptops & portables

| Item | Notes | Status |
|------|-------|--------|
| Grid Compass | 1982 — early laptop form factor | `[x]` |
| Toshiba T1100 | 1985 — IBM PC compatible laptop | `[x]` |
| Apple MacBook Air | 2008 — ultraportable dev machine | `[x]` |
| Microsoft Surface Pro | 2013 — tablet/laptop hybrid for dev | `[x]` |

### Mobile & wearables

| Item | Notes | Status |
|------|-------|--------|
| Windows Mobile / Pocket PC | 2000s enterprise mobile dev | `[x]` |
| iPhone 3G | 2008 — App Store + 3G mobile web | `[x]` |
| Amazon Kindle | 2007 — e-ink; limited dev angle | `[-]` |
| Apple Watch | 2015 — watchOS dev platform | `[x]` |
| Meta Quest / VR dev kits | 2010s — niche | `[-]` |

### Servers & infrastructure hardware

| Item | Notes | Status |
|------|-------|--------|
| IBM AS/400 | 1988 — business systems | `[x]` |
| Blade server era (RLX, HP c-Class) | ~2000s density shift | `[x]` |
| Raspberry Pi Zero | 2015 — $5 embedded | `[x]` |
| NVIDIA Jetson | 2015 — edge AI boards | `[x]` |

### Chips & architecture (selective)

| Item | Notes | Status |
|------|-------|--------|
| Intel 8086 / 8088 | 1978/79 — PC CPU lineage | `[x]` |
| MIPS R2000 | 1985 — workstation CPUs | `[x]` |
| ARM6 in Apple Newton | 1993 — early ARM product | `[x]` |
| Apple A4 (first in-house SoC) | 2010 — iPhone 4 | `[x]` |

### Skip / low priority

| Item | Reason | Status |
|------|--------|--------|
| Game consoles (PlayStation, Xbox) | Dev SDK existed but consumer-first | `[-]` |
| Smart TVs | Unless web TV dev platform | `[-]` |
| Individual phone models post-G1 | Too granular unless paradigm shift | `[-]` |

---

## Cross-linking cheat sheet

| New event | Link to existing |
|-----------|------------------|
| `altair-8800-released` | `microsoft-founded`, `basic-created` |
| `ibm-pc-5150-released` | `microsoft-founded`, MS-DOS when added |
| `apple-ii-released` | `steve-wozniak-apple-founded`, `basic-created`, `commodore-64-released` |
| `macintosh-128k-released` | `susan-kare-macintosh-icons`, `steve-jobs-returns-to-apple` |
| `next-computer-released` | `worldwideweb-browser`, `objective-c-created` |
| `iphone-goes-on-sale` | `steve-jobs-iphone-introduced` |
| `iphone-app-store-opens` | `iphone-goes-on-sale` |
| `android-announced` | `t-mobile-g1-released`, `kotlin-android-official`, `chrome-for-android-released` |
| `raspberry-pi-model-b-released` | Linux kernel when in INFRA, `python-0-9-0-released` |
| `sun-1-released` | `nfs-released`, `java-1-0-shipped` |

---

## Suggested research order (JSON implementation)

1. **Batch C** — IBM PC, Apple II, Macintosh, NeXT, C64, Altair (biggest dev-platform gap)
2. **Batch F** — iPhone sale, Android, App Store, G1, iPad, Raspberry Pi
3. **Batch A** — ENIAC, System/360 (deep history anchor)
4. **Batch B** — Alto, Altair neighbors, VAX
5. **Batch E + G** — mobile prehistory, Arduino, Pi ecosystem
6. **Batch D + H** — laptops, servers, x86-64
7. **Batch I** — EOL pairs after origin events exist
8. Promote tier-2 backlog items as batches thin out

Work in **batches of 10** like INFRA: write JSON → bidirectional `relatedIds` → `npm run validate` → mark `[x]`.

---

## Event framing tips

- **Announce vs ship**: separate events when the gap matters (iPhone Jan 2007 intro vs Jun 2007 sale; App Store Jul 2008).
- **One product generation per event** — iMac G3 vs iMac Intel are separate if both matter; skip color refreshes.
- **Invention vs product**: System/360 *announcement* is the milestone; ENIAC *dedication* not "first power-on" unless sourced.
- **Workstations**: tie narrative to what devs built (WWW on NeXT, Java on SPARCstation).
- **Mobile web**: pair device events with browser releases (`chrome-for-android-released`).
- **Termination**: template from Flash Player / Python 2 — `relatedIds` back to origin.

---

## JSON conventions

- **Path:** `content/timeline/YYYY/MM.json` or `YYYY/year.json`
- **Category:** usually `hardware`; `invention` for ENIAC, Alto, System/360 announce
- **Bucket rules:** monthly buckets require `datePrecision: "day"` or `"month"`; yearly buckets use `"year"` — see `lib/timeline/load.ts`
- **Fields:** same as other events — `id`, `slug`, `date`, `title`, `summary`, `about`, `narrative`, `tags`, `importance`, `sources` (with `date`/`overview` roles), `relatedIds`
- **People:** prefer `people` attribution on device events for creators (Wozniak, Jobs) only when no duplicate people milestone; do not duplicate `steve-jobs-iphone-introduced`

---

## Sources to prefer

- Manufacturer press releases and official history pages (date)
- Computer History Museum, Smithsonian, university archives (date + overview)
- Contemporary news (NYT, BYTE, InfoWorld) via Internet Archive
- Wikipedia, Britannica (overview only — never sole date source)
- Second primary source to corroborate dates when possible
