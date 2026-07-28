import type { TimelineEvent } from "../../lib/timeline/schema";

type M = Omit<TimelineEvent, "slug" | "media" | "relatedIds" | "companies"> &
  Partial<Pick<TimelineEvent, "slug" | "media" | "relatedIds" | "companies">>;

function m(event: M): TimelineEvent {
  return {
    ...event,
    slug: event.slug ?? event.id,
    media: event.media ?? [],
    relatedIds: event.relatedIds ?? [],
    people: event.people ?? [],
    companies: event.companies ?? [],
  };
}

/** P1–P8: person & leadership milestones (not duplicating tech events covered by `people` attributions). */
export const PEOPLE_MILESTONES: TimelineEvent[] = [
  // —— P1: Founders & systems pioneers ——
  m({
    id: "microsoft-founded",
    date: "1975-04-04",
    datePrecision: "day",
    title: "Bill Gates and Paul Allen found Microsoft",
    summary:
      "Bill Gates and Paul Allen founded Microsoft on April 4, 1975 to sell a BASIC interpreter for the Altair 8800.",
    about:
      "Microsoft began as a language vendor for hobbyist microcomputers, then became the dominant PC software company — DOS, Windows, Office, and later Azure and GitHub. Gates and Allen's Altair BASIC deal set the template for commercial software on personal hardware.",
    narrative: {
      whyChosen: "Microsoft became the defining software company of the PC era.",
      whyImportant: "It proved microcomputer software could be a standalone industry.",
      problemSolved: "Early PC buyers had hardware but almost no usable programming tools.",
    },
    category: "company",
    tags: ["people", "microsoft", "founding"],
    people: [
      { id: "bill-gates", name: "Bill Gates", role: "co-founder" },
      { id: "paul-allen", name: "Paul Allen", role: "co-founder" },
    ],
    importance: 3,
    sources: [
      {
        title: "Microsoft — Our history (founded April 4, 1975)",
        url: "https://www.microsoft.com/en-us/about",
        role: "date",
      },
      {
        title: "Wikipedia — Microsoft (overview)",
        url: "https://en.wikipedia.org/wiki/Microsoft",
        role: "overview",
      },
    ],
    relatedIds: ["csharp-announced", "dotnet-framework-1-0-rtm"],
  }),
  m({
    id: "linux-kernel-announced",
    date: "1991-08-25",
    datePrecision: "day",
    title: "Linus Torvalds announces Linux",
    summary:
      "Linus Torvalds posted to comp.os.minix on August 25, 1991 announcing a free operating system kernel — the birth of Linux.",
    about:
      "Linux started as a hobby kernel for 386 PCs and grew into the OS behind Android, cloud servers, and supercomputers. Torvalds' open development model on Usenet and later Git became the template for community-driven systems software.",
    narrative: {
      whyChosen: "Linux is the most widely deployed operating system kernel in history.",
      whyImportant: "It proved open-source OS development could outpace proprietary Unix.",
      problemSolved: "MINIX and commercial Unix were limited for hackers who wanted a freely modifiable OS.",
    },
    category: "software",
    tags: ["people", "linux", "open-source", "operating-system"],
    people: [{ id: "linus-torvalds", name: "Linus Torvalds", role: "creator" }],
    importance: 3,
    sources: [
      {
        title: "LKML archive — Linux 0.01 announcement (August 25, 1991)",
        url: "https://www.kernel.org/",
        role: "date",
      },
      {
        title: "Wikipedia — Linux (overview)",
        url: "https://en.wikipedia.org/wiki/Linux",
        role: "overview",
      },
    ],
    relatedIds: ["git-created"],
  }),
  m({
    id: "google-founded",
    date: "1998-09-04",
    datePrecision: "day",
    title: "Larry Page and Sergey Brin incorporate Google",
    summary:
      "Larry Page and Sergey Brin incorporated Google on September 4, 1998 — turning their PageRank research into a company.",
    about:
      "Google began as a search engine and became the organizing layer of the web — ads, Gmail, Maps, Android, Chrome, and cloud infrastructure. Page and Brin's focus on ranking and scale influenced how every later internet company thought about data and algorithms.",
    narrative: {
      whyChosen: "Google defined the search-and-ads economy that funds much of the modern web.",
      whyImportant: "PageRank changed information retrieval from directories to algorithmic relevance.",
      problemSolved: "Early web directories could not keep pace with exponential page growth.",
    },
    category: "company",
    tags: ["people", "google", "founding"],
    people: [
      { id: "larry-page", name: "Larry Page", role: "co-founder" },
      { id: "sergey-brin", name: "Sergey Brin", role: "co-founder" },
    ],
    importance: 3,
    sources: [
      {
        title: "Google — Our story (founded September 1998)",
        url: "https://about.google/company-info/",
        role: "date",
      },
      {
        title: "Wikipedia — Google (overview)",
        url: "https://en.wikipedia.org/wiki/Google",
        role: "overview",
      },
    ],
    relatedIds: ["google-gemini-released", "google-chrome-released"],
  }),
  m({
    id: "knuth-taocp-volume-1-published",
    date: "1968",
    datePrecision: "year",
    title: "Donald Knuth publishes TAOCP Volume 1",
    summary:
      "Donald Knuth published Volume 1 of The Art of Computer Programming in 1968 — foundational algorithms text still cited today.",
    about:
      "TAOCP systematized algorithm analysis for generations of computer scientists. Knuth also created TeX and literate programming — tools that shaped how papers and books are typeset in CS.",
    narrative: {
      whyChosen: "TAOCP remains the benchmark reference for algorithms and rigorous CS writing.",
      whyImportant: "It established Big-O analysis and structured algorithm exposition as standard practice.",
      problemSolved: "Computer science lacked a comprehensive, quality-controlled algorithms canon.",
    },
    category: "culture",
    tags: ["people", "algorithms", "computer-science", "author"],
    people: [{ id: "donald-knuth", name: "Donald Knuth", role: "author" }],
    importance: 3,
    sources: [
      {
        title: "Stanford — Donald E. Knuth (TAOCP bibliography)",
        url: "https://www-cs-faculty.stanford.edu/~knuth/taocp.html",
        role: "date",
      },
      {
        title: "Wikipedia — The Art of Computer Programming (overview)",
        url: "https://en.wikipedia.org/wiki/The_Art_of_Computer_Programming",
        role: "overview",
      },
    ],
    relatedIds: [],
  }),
  m({
    id: "ritchie-thompson-turing-award",
    date: "1983-11",
    datePrecision: "month",
    title: "Ritchie and Thompson receive Turing Award",
    summary:
      "Dennis Ritchie and Ken Thompson received the 1983 ACM Turing Award for developing Unix and the C language.",
    about:
      "Their Bell Labs work underpins every smartphone, server, and embedded device: Unix ideas (pipes, files, processes) and C's portability. The award recognized that systems software deserved the same academic honor as theory.",
    narrative: {
      whyChosen: "The Turing Award formalized Unix and C as CS's most influential systems work.",
      whyImportant: "It validated operating systems and languages as first-class computer science.",
      problemSolved: "Industry systems breakthroughs often went unrecognized by academic CS awards.",
    },
    category: "culture",
    tags: ["people", "unix", "c", "award"],
    people: [
      { id: "dennis-ritchie", name: "Dennis Ritchie", role: "creator" },
      { id: "ken-thompson", name: "Ken Thompson", role: "co-creator" },
    ],
    importance: 6,
    sources: [
      {
        title: "ACM — 1983 Turing Award (Ritchie & Thompson)",
        url: "https://amturing.acm.org/award_winners/ritchie_4611031.cfm",
        role: "date",
      },
      {
        title: "Wikipedia — Unix (overview)",
        url: "https://en.wikipedia.org/wiki/Unix",
        role: "overview",
      },
    ],
    relatedIds: [],
  }),
  m({
    id: "claude-shannon-information-theory",
    date: "1948-10",
    datePrecision: "month",
    title: "Claude Shannon publishes information theory",
    summary:
      "Claude Shannon's 'A Mathematical Theory of Communication' appeared in October 1948 — defining entropy, channels, and digital information.",
    about:
      "Shannon's work underlies compression, error correction, cryptography, and every digital network. Programmers encounter his ideas in hashing, coding theory, and the bit as the atomic unit of data.",
    narrative: {
      whyChosen: "Information theory is the mathematical foundation of digital computing and networking.",
      whyImportant: "It quantified information and set limits on reliable communication.",
      problemSolved: "Engineers lacked a unified theory for noise, compression, and channel capacity.",
    },
    category: "invention",
    tags: ["people", "information-theory", "research"],
    people: [{ id: "claude-shannon", name: "Claude Shannon", role: "researcher" }],
    importance: 3,
    sources: [
      {
        title: "Bell System Technical Journal — Shannon 1948 paper",
        url: "https://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf",
        role: "date",
      },
      {
        title: "Wikipedia — Information theory (overview)",
        url: "https://en.wikipedia.org/wiki/Information_theory",
        role: "overview",
      },
    ],
    relatedIds: [],
  }),
  m({
    id: "alan-turing-computable-numbers",
    date: "1936",
    datePrecision: "year",
    title: "Alan Turing defines the Turing machine",
    summary:
      "Alan Turing's 1936 paper 'On Computable Numbers' introduced the Turing machine — the theoretical model behind all modern computers.",
    about:
      "Turing formalized what it means to compute, defined decidability limits, and influenced von Neumann architecture. Every programming language and CPU is an approximation of his abstract machine.",
    narrative: {
      whyChosen: "The Turing machine is the conceptual root of computer science.",
      whyImportant: "It linked logic, mathematics, and mechanical computation.",
      problemSolved: "Mathematicians needed a precise definition of effective calculability.",
    },
    category: "invention",
    tags: ["people", "computer-science", "research"],
    people: [{ id: "alan-turing", name: "Alan Turing", role: "researcher" }],
    importance: 3,
    sources: [
      {
        title: "Proceedings of the London Mathematical Society — Turing 1936",
        url: "https://www.cs.virginia.edu/~robins/Turing_Paper_1936.pdf",
        role: "date",
      },
      {
        title: "Wikipedia — Turing machine (overview)",
        url: "https://en.wikipedia.org/wiki/Turing_machine",
        role: "overview",
      },
    ],
    relatedIds: [],
  }),
  m({
    id: "margaret-hamilton-apollo-software",
    date: "1969-07",
    datePrecision: "month",
    title: "Margaret Hamilton leads Apollo flight software",
    summary:
      "Margaret Hamilton's MIT team shipped the Apollo Guidance Computer software used in the July 1969 Moon landing.",
    about:
      "Hamilton pioneered software engineering as a discipline — priority scheduling, error recovery, and rigorous testing for life-critical code. Her team's work proved large, reliable software could run in embedded real-time systems.",
    narrative: {
      whyChosen: "Hamilton coined 'software engineering' and led mission-critical code to the Moon.",
      whyImportant: "She established practices now standard in aerospace and safety-critical systems.",
      problemSolved: "Nobody knew how to build and verify large programs for hardware with tiny memory.",
    },
    category: "culture",
    tags: ["people", "software-engineering", "aerospace"],
    people: [{ id: "margaret-hamilton", name: "Margaret Hamilton", role: "researcher" }],
    importance: 3,
    sources: [
      {
        title: "NASA — Apollo 11 mission (July 1969)",
        url: "https://www.nasa.gov/mission_pages/apollo/apollo-11.html",
        role: "date",
      },
      {
        title: "Wikipedia — Margaret Hamilton (overview)",
        url: "https://en.wikipedia.org/wiki/Margaret_Hamilton_(software_engineer)",
        role: "overview",
      },
    ],
    relatedIds: [],
  }),
  m({
    id: "ada-lovelace-analytical-engine-notes",
    date: "1843",
    datePrecision: "year",
    title: "Ada Lovelace Analytical Engine notes",
    summary:
      "Ada Lovelace's 1843 notes described how Babbage's Analytical Engine could compute Bernoulli numbers — often cited as the first algorithm meant for a machine.",
    about:
      "Lovelace envisioned programs beyond pure calculation — music and symbols — foreshadowing general-purpose computing. Her notes are a cultural milestone for women in computing and the idea of software distinct from hardware.",
    narrative: {
      whyChosen: "Lovelace articulated the concept of machine programs before computers existed.",
      whyImportant: "She separated 'operations' from the engine that executes them — the seed of software.",
      problemSolved: "Babbage's designs lacked a clear account of how instructions could drive general computation.",
    },
    category: "culture",
    tags: ["people", "history", "programming"],
    people: [{ id: "ada-lovelace", name: "Ada Lovelace", role: "author" }],
    importance: 6,
    sources: [
      {
        title: "Scientific Memoirs — Lovelace's Notes (1843)",
        url: "https://en.wikipedia.org/wiki/Ada_Lovelace",
        role: "date",
      },
      {
        title: "Wikipedia — Ada Lovelace (overview)",
        url: "https://en.wikipedia.org/wiki/Ada_Lovelace",
        role: "overview",
      },
    ],
    relatedIds: ["ada-95-standard"],
  }),

  // —— P2: Platform & business leadership ——
  m({
    id: "bill-gates-steps-down-microsoft-ceo",
    date: "2000-01-13",
    datePrecision: "day",
    title: "Bill Gates steps down as Microsoft CEO",
    summary:
      "Bill Gates handed the Microsoft CEO role to Steve Ballmer on January 13, 2000, remaining chief software architect.",
    about:
      "The transition ended Gates's day-to-day operational control during the dot-com era and Windows XP cycle. It marked Microsoft's shift from founder-led startup culture to enterprise-scale corporation.",
    narrative: {
      whyChosen: "Gates's CEO exit was a generational handoff at the world's largest software company.",
      whyImportant: "It separated founder vision from professional management at scale.",
      problemSolved: "Microsoft needed dedicated leadership as antitrust scrutiny and product complexity grew.",
    },
    category: "culture",
    tags: ["people", "microsoft", "ceo"],
    people: [{ id: "bill-gates", name: "Bill Gates", role: "ceo" }],
    importance: 3,
    sources: [
      {
        title: "Microsoft — Gates steps down as CEO (January 13, 2000)",
        url: "https://news.microsoft.com/2000/01/13/bill-gates-promotes-steve-ballmer-to-chief-executive-officer/",
        role: "date",
      },
      {
        title: "Wikipedia — Bill Gates (overview)",
        url: "https://en.wikipedia.org/wiki/Bill_Gates",
        role: "overview",
      },
    ],
    relatedIds: ["microsoft-founded", "satya-nadella-microsoft-ceo"],
  }),
  m({
    id: "steve-ballmer-named-microsoft-ceo",
    date: "2000-01-13",
    datePrecision: "day",
    title: "Steve Ballmer named Microsoft CEO",
    summary:
      "Steve Ballmer became Microsoft CEO on January 13, 2000, leading the company through the Windows and enterprise server boom.",
    about:
      "Ballmer's tenure emphasized Windows, Office, and datacenter licensing — and famously clashed with open source before Nadella's pivot. Developers remember the 'developers, developers, developers' era and the Longhorn/Vista cycle.",
    narrative: {
      whyChosen: "Ballmer led Microsoft through its peak PC licensing years and early cloud transition.",
      whyImportant: "His era defined Microsoft's enterprise dominance and mobile missteps.",
      problemSolved: "Microsoft needed operational leadership as Gates focused on architecture and philanthropy.",
    },
    category: "culture",
    tags: ["people", "microsoft", "ceo"],
    people: [{ id: "steve-ballmer", name: "Steve Ballmer", role: "ceo" }],
    importance: 6,
    sources: [
      {
        title: "Microsoft — Ballmer promoted to CEO (January 13, 2000)",
        url: "https://news.microsoft.com/2000/01/13/bill-gates-promotes-steve-ballmer-to-chief-executive-officer/",
        role: "date",
      },
      {
        title: "Wikipedia — Steve Ballmer (overview)",
        url: "https://en.wikipedia.org/wiki/Steve_Ballmer",
        role: "overview",
      },
    ],
    relatedIds: ["satya-nadella-microsoft-ceo"],
  }),
  m({
    id: "satya-nadella-microsoft-ceo",
    date: "2014-02-04",
    datePrecision: "day",
    title: "Satya Nadella named Microsoft CEO",
    summary:
      "Microsoft's board appointed Satya Nadella CEO on February 4, 2014 — starting the cloud-first, open-source era.",
    about:
      "Nadella accelerated Azure, open-sourced .NET, acquired GitHub, and championed VS Code and TypeScript. For developers, Microsoft transformed from Windows-only vendor to cross-platform tools company.",
    narrative: {
      whyChosen: "Nadella's appointment reversed Microsoft's developer reputation.",
      whyImportant: "It legitimized open source inside the company that once fought Linux.",
      problemSolved: "Microsoft was losing cloud and mobile developers to open, cross-platform stacks.",
    },
    category: "culture",
    tags: ["people", "microsoft", "ceo", "open-source"],
    people: [{ id: "satya-nadella", name: "Satya Nadella", role: "ceo" }],
    importance: 3,
    sources: [
      {
        title: "Microsoft — Satya Nadella CEO announcement (February 4, 2014)",
        url: "https://news.microsoft.com/2014/02/04/satya-nadella-email-to-employees-on-taking-role-as-ceo/",
        role: "date",
      },
      {
        title: "Wikipedia — Satya Nadella (overview)",
        url: "https://en.wikipedia.org/wiki/Satya_Nadella",
        role: "overview",
      },
    ],
    relatedIds: ["dotnet-6-released", "github-launched", "typescript-preview-released"],
  }),
  m({
    id: "sundar-pichai-google-ceo",
    date: "2015-08-10",
    datePrecision: "day",
    title: "Sundar Pichai named Google CEO",
    summary:
      "Google appointed Sundar Pichai CEO on August 10, 2015 as Alphabet reorganized — putting him in charge of search, Chrome, and Android.",
    about:
      "Pichai steered Google through the mobile-to-AI transition — scaling Android, Chrome, and later Gemini. He represents the product-engineer path to leading the world's largest internet software stack.",
    narrative: {
      whyChosen: "Pichai leads the company whose platforms most developers build on or compete with.",
      whyImportant: "His tenure spans mobile dominance and the generative AI race.",
      problemSolved: "Google needed focused product leadership after the Alphabet split from experimental bets.",
    },
    category: "culture",
    tags: ["people", "google", "ceo"],
    people: [{ id: "sundar-pichai", name: "Sundar Pichai", role: "ceo" }],
    importance: 6,
    sources: [
      {
        title: "Google — Sundar Pichai CEO (August 10, 2015)",
        url: "https://blog.google/inside-google/company-announcements/growing-our-company/",
        role: "date",
      },
      {
        title: "Wikipedia — Sundar Pichai (overview)",
        url: "https://en.wikipedia.org/wiki/Sundar_Pichai",
        role: "overview",
      },
    ],
    relatedIds: ["google-founded", "google-gemini-released"],
  }),
  m({
    id: "eric-schmidt-google-ceo",
    date: "2001-08",
    datePrecision: "month",
    title: "Eric Schmidt named Google CEO",
    summary:
      "Google hired Eric Schmidt as CEO in August 2001, pairing adult supervision with founders Page and Brin during hypergrowth.",
    about:
      "Schmidt's era scaled Google's ad business, IPO, and Android acquisition — turning a search startup into a diversified platform company. The 'adult supervision' model influenced how VC-backed startups structure founder/CEO roles.",
    narrative: {
      whyChosen: "Schmidt guided Google from startup to public platform giant.",
      whyImportant: "He professionalized operations while founders kept product vision.",
      problemSolved: "Young technical founders needed experienced leadership for scaling and IPO readiness.",
    },
    category: "culture",
    tags: ["people", "google", "ceo"],
    people: [{ id: "eric-schmidt", name: "Eric Schmidt", role: "ceo" }],
    importance: 6,
    sources: [
      {
        title: "Google — Eric Schmidt CEO era (August 2001)",
        url: "https://en.wikipedia.org/wiki/Eric_Schmidt",
        role: "date",
      },
      {
        title: "Wikipedia — Eric Schmidt (overview)",
        url: "https://en.wikipedia.org/wiki/Eric_Schmidt",
        role: "overview",
      },
    ],
    relatedIds: ["google-founded", "sundar-pichai-google-ceo"],
  }),
  m({
    id: "sam-altman-openai-founded",
    date: "2015-12",
    datePrecision: "month",
    title: "Sam Altman co-founds OpenAI",
    summary:
      "OpenAI launched in December 2015 with Sam Altman as president — a research lab aimed at safe artificial general intelligence.",
    about:
      "OpenAI pivoted from nonprofit research to the API and ChatGPT products that triggered the generative AI boom. Altman became the public face of frontier model deployment and developer-facing LLM APIs.",
    narrative: {
      whyChosen: "OpenAI under Altman defined the consumer and API LLM era.",
      whyImportant: "It moved frontier models from labs into everyday software products.",
      problemSolved: "Powerful AI was locked in research without safe, accessible deployment paths.",
    },
    category: "company",
    tags: ["people", "openai", "ai", "founding"],
    people: [{ id: "sam-altman", name: "Sam Altman", role: "co-founder" }],
    importance: 3,
    sources: [
      {
        title: "OpenAI — Introducing OpenAI (December 11, 2015)",
        url: "https://openai.com/index/introducing-openai-and-openai/",
        role: "date",
      },
      {
        title: "Wikipedia — OpenAI (overview)",
        url: "https://en.wikipedia.org/wiki/OpenAI",
        role: "overview",
      },
    ],
    relatedIds: ["chatgpt-released", "gpt-4-released"],
  }),
  m({
    id: "dario-amodei-anthropic-founded",
    date: "2021-01",
    datePrecision: "month",
    title: "Dario Amodei co-founds Anthropic",
    summary:
      "Dario Amodei co-founded Anthropic in early 2021 after leaving OpenAI — building the Claude model family with a safety focus.",
    about:
      "Anthropic became OpenAI's primary rival in frontier chat and API models — Claude 2, 3, and 3.5. Amodei's team emphasized constitutional AI and long-context products for enterprise developers.",
    narrative: {
      whyChosen: "Anthropic diversified the frontier LLM market beyond OpenAI.",
      whyImportant: "Competition accelerated safety research and developer choice.",
      problemSolved: "Enterprises wanted alternative LLM vendors with strong safety positioning.",
    },
    category: "company",
    tags: ["people", "anthropic", "ai", "founding"],
    people: [{ id: "dario-amodei", name: "Dario Amodei", role: "co-founder" }],
    importance: 6,
    sources: [
      {
        title: "Anthropic — Company (founded 2021)",
        url: "https://www.anthropic.com/company",
        role: "date",
      },
      {
        title: "Wikipedia — Anthropic (overview)",
        url: "https://en.wikipedia.org/wiki/Anthropic",
        role: "overview",
      },
    ],
    relatedIds: ["claude-3-released", "claude-3-5-sonnet-released"],
  }),

  // —— P3: Language & maintainer milestones ——
  m({
    id: "guido-van-rossum-bdfl-step-down",
    date: "2018-07-12",
    datePrecision: "day",
    title: "Guido van Rossum steps down as Python BDFL",
    summary:
      "Guido van Rossum stepped down as Python's Benevolent Dictator For Life on July 12, 2018 — ending his central governance role.",
    about:
      "Van Rossum created Python in 1991 and guided it through 2/3 migration and community growth. His resignation pushed Python toward a formal steering council governance model.",
    narrative: {
      whyChosen: "The BDFL step-down changed how one of the world's largest languages is governed.",
      whyImportant: "It forced Python to institutionalize decision-making beyond a single founder.",
      problemSolved: "Burnout and mailing-list conflicts showed BDFL model does not scale forever.",
    },
    category: "culture",
    tags: ["people", "python", "maintainer"],
    people: [{ id: "guido-van-rossum", name: "Guido van Rossum", role: "maintainer" }],
    importance: 6,
    sources: [
      {
        title: "Python.org — Transfer of power (July 12, 2018)",
        url: "https://mail.python.org/pipermail/python-committers/2018-July/005664.html",
        role: "date",
      },
      {
        title: "Wikipedia — Guido van Rossum (overview)",
        url: "https://en.wikipedia.org/wiki/Guido_van_Rossum",
        role: "overview",
      },
    ],
    relatedIds: ["python-0-9-0-released", "python-3-0-released"],
  }),
  m({
    id: "sanfilippo-redis-maintainer-steps-down",
    date: "2020-06-30",
    datePrecision: "day",
    title: "Sanfilippo steps down from Redis",
    summary:
      "Salvatore Sanfilippo (antirez) stepped down as Redis maintainer on June 30, 2020, handing the project to a community team.",
    about:
      "Sanfilippo built Redis alone from 2009 into infrastructure powering caches, queues, and real-time systems worldwide. His departure sparked discussion about maintainer burnout and corporate sponsorship of open source.",
    narrative: {
      whyChosen: "antirez stepping down was a landmark maintainer transition in open source.",
      whyImportant: "It highlighted sustainability issues for solo-authored critical infrastructure.",
      problemSolved: "Redis needed governance beyond one developer as adoption reached hyperscale.",
    },
    category: "culture",
    tags: ["people", "redis", "maintainer", "open-source"],
    people: [{ id: "salvatore-sanfilippo", name: "Salvatore Sanfilippo", role: "maintainer" }],
    importance: 6,
    sources: [
      {
        title: "antirez — Stepping down (June 30, 2020)",
        url: "http://antirez.com/news/133",
        role: "date",
      },
      {
        title: "Wikipedia — Redis (overview)",
        url: "https://en.wikipedia.org/wiki/Redis",
        role: "overview",
      },
    ],
    relatedIds: ["redis-first-released"],
  }),
  m({
    id: "brendan-eich-mozilla-ceo-resigns",
    date: "2014-04-03",
    datePrecision: "day",
    title: "Brendan Eich resigns as Mozilla CEO",
    summary:
      "Brendan Eich resigned as Mozilla CEO on April 3, 2014 after only days in the role — controversy over a political donation.",
    about:
      "Eich created JavaScript in ten days in 1995 and later co-founded Brave. His brief Mozilla tenure and exit showed how founder-legends intersect with modern corporate governance and community politics.",
    narrative: {
      whyChosen: "Eich embodies JavaScript's creation and a dramatic open-source leadership moment.",
      whyImportant: "It raised questions about separating creators' personal views from their technical legacy.",
      problemSolved: "Mozilla faced community trust crisis immediately after appointing a co-founder as CEO.",
    },
    category: "culture",
    tags: ["people", "mozilla", "javascript", "ceo"],
    people: [{ id: "brendan-eich", name: "Brendan Eich", role: "ceo" }],
    importance: 6,
    sources: [
      {
        title: "Mozilla — Brendan Eich steps down (April 3, 2014)",
        url: "https://blog.mozilla.org/press/2014/04/mozilla-announces-plans-for-new-ceo/",
        role: "date",
      },
      {
        title: "Wikipedia — Brendan Eich (overview)",
        url: "https://en.wikipedia.org/wiki/Brendan_Eich",
        role: "overview",
      },
    ],
    relatedIds: ["javascript-name-announced"],
  }),
  m({
    id: "ryan-dahl-deno-announced",
    date: "2018-05-30",
    datePrecision: "day",
    title: "Ryan Dahl announces Deno",
    summary:
      "Ryan Dahl unveiled Deno on May 30, 2018 — a secure TypeScript/JavaScript runtime addressing Node.js design regrets.",
    about:
      "Dahl's '10 things I regret about Node.js' talk reframed server JS around permissions, native TypeScript, and explicit security. Deno influenced conversations about runtime design even for teams staying on Node.",
    narrative: {
      whyChosen: "Dahl's Deno talk was a rare public redesign of one's own massively successful project.",
      whyImportant: "It pushed secure-by-default and TypeScript-first runtimes into mainstream discussion.",
      problemSolved: "Node's module and security model created footguns Dahl wanted to fix from scratch.",
    },
    category: "software",
    tags: ["people", "deno", "nodejs", "typescript"],
    people: [{ id: "ryan-dahl", name: "Ryan Dahl", role: "creator" }],
    importance: 6,
    sources: [
      {
        title: "JSConf EU — Ryan Dahl: Deno (May 30, 2018)",
        url: "https://www.youtube.com/watch?v=M3BM9TB-8yA",
        role: "date",
      },
      {
        title: "Wikipedia — Deno (overview)",
        url: "https://en.wikipedia.org/wiki/Deno_(software)",
        role: "overview",
      },
    ],
    relatedIds: ["nodejs-first-released"],
  }),
  m({
    id: "rich-hickey-clojure-released",
    date: "2007-10-16",
    datePrecision: "day",
    title: "Rich Hickey releases Clojure",
    summary:
      "Rich Hickey released Clojure 1.0 on October 16, 2007 — a Lisp on the JVM with immutable data and software transactional memory.",
    about:
      "Clojure brought functional programming to Java shops without giving up the JVM ecosystem. Hickey's 'Simple Made Easy' talks influenced how developers think about state, complexity, and design.",
    narrative: {
      whyChosen: "Clojure proved Lisp could thrive on the JVM for production services.",
      whyImportant: "Immutable data and STM offered a distinct concurrency model from mainstream OOP.",
      problemSolved: "Java developers wanted functional tools without leaving existing libraries and deployment.",
    },
    category: "software",
    tags: ["people", "clojure", "lisp", "jvm", "programming-language"],
    people: [{ id: "rich-hickey", name: "Rich Hickey", role: "creator" }],
    importance: 6,
    sources: [
      {
        title: "Clojure — Clojure 1.0 release (October 16, 2007)",
        url: "https://clojure.org/about/history",
        role: "date",
      },
      {
        title: "Wikipedia — Clojure (overview)",
        url: "https://en.wikipedia.org/wiki/Clojure",
        role: "overview",
      },
    ],
    relatedIds: [],
  }),
  m({
    id: "bjarne-stroustrup-cpp-released",
    date: "1985-10",
    datePrecision: "month",
    title: "Bjarne Stroustrup releases C++",
    summary:
      "Bjarne Stroustrup released C++ 1.0 in October 1985 — adding object-oriented features to C for systems programming.",
    about:
      "C++ powers game engines, browsers, databases, and embedded systems — the default when C needs abstraction without garbage collection. Stroustrup's 'C with classes' became one of the most influential language designs ever.",
    narrative: {
      whyChosen: "C++ defined systems programming with OOP for decades before Rust's rise.",
      whyImportant: "It showed zero-cost abstractions could compile to efficient machine code.",
      problemSolved: "C lacked abstraction mechanisms for large simulation and systems codebases at Bell Labs.",
    },
    category: "software",
    tags: ["people", "cpp", "programming-language"],
    people: [{ id: "bjarne-stroustrup", name: "Bjarne Stroustrup", role: "creator" }],
    importance: 3,
    sources: [
      {
        title: "Stroustrup — A History of C++ (first commercial release 1985)",
        url: "https://www.stroustrup.com/hopl2.pdf",
        role: "date",
      },
      {
        title: "Wikipedia — C++ (overview)",
        url: "https://en.wikipedia.org/wiki/C%2B%2B",
        role: "overview",
      },
    ],
    relatedIds: ["cpp11-standard"],
  }),
  m({
    id: "james-gosling-leaves-oracle",
    date: "2010-04-09",
    datePrecision: "day",
    title: "James Gosling leaves Oracle",
    summary:
      "James Gosling left Oracle on April 9, 2010 — months after Oracle acquired Sun — symbolizing unease over Java's new stewardship.",
    about:
      "Gosling created Java at Sun in 1995 and the JVM that powers Android, Hadoop, and enterprise backends. His exit foreshadowed years of community tension over Oracle's Java governance and OpenJDK.",
    narrative: {
      whyChosen: "Gosling's departure marked a turning point for Java under corporate ownership.",
      whyImportant: "It signaled maintainer-founder distrust after a major acquisition.",
      problemSolved: "Java community needed clarity on stewardship after Sun's sale to Oracle.",
    },
    category: "culture",
    tags: ["people", "java", "oracle"],
    people: [{ id: "james-gosling", name: "James Gosling", role: "creator" }],
    importance: 6,
    sources: [
      {
        title: "Gosling — blog on leaving Oracle (April 2010)",
        url: "https://nighthacks.com/roller/jag/entry/last_day_at_sun",
        role: "date",
      },
      {
        title: "Wikipedia — James Gosling (overview)",
        url: "https://en.wikipedia.org/wiki/James_Gosling",
        role: "overview",
      },
    ],
    relatedIds: ["java-announced"],
  }),
  m({
    id: "larry-wall-perl-1-released",
    date: "1987-12",
    datePrecision: "month",
    title: "Larry Wall releases Perl 1.0",
    summary:
      "Larry Wall released Perl 1.0 in December 1987 — a practical text-processing language that became the glue of early web and sysadmin stacks.",
    about:
      "Perl's regex and CPAN ecosystem powered CGI scripts, log parsing, and bioinformatics. Wall's 'TIMTOWTDI' philosophy influenced how dynamic languages approached flexibility versus readability.",
    narrative: {
      whyChosen: "Perl was the duct tape of the 1990s internet and Unix automation.",
      whyImportant: "CPAN pioneered language-specific package ecosystems before npm and PyPI.",
      problemSolved: "Shell, awk, and sed were awkward for complex text and report tasks.",
    },
    category: "software",
    tags: ["people", "perl", "programming-language"],
    people: [{ id: "larry-wall", name: "Larry Wall", role: "creator" }],
    importance: 6,
    sources: [
      {
        title: "Perl.org — Perl history (Perl 1.0, December 1987)",
        url: "https://www.perl.org/about/history.html",
        role: "date",
      },
      {
        title: "Wikipedia — Perl (overview)",
        url: "https://en.wikipedia.org/wiki/Perl",
        role: "overview",
      },
    ],
    relatedIds: ["perl-5-0-released", "perl-6-christmas-released"],
  }),
  m({
    id: "anders-hejlsberg-turbo-pascal-shipped",
    date: "1983-11",
    datePrecision: "month",
    title: "Anders Hejlsberg ships Turbo Pascal",
    summary:
      "Anders Hejlsberg's Turbo Pascal shipped in November 1983 — a fast, cheap Pascal compiler that sold millions of copies.",
    about:
      "Hejlsberg later created Delphi, C#, and TypeScript — one of the most impactful language designer careers in computing. Turbo Pascal proved developer tools could be products, not just language specs.",
    narrative: {
      whyChosen: "Hejlsberg's career spans Pascal, Delphi, C#, and TypeScript.",
      whyImportant: "Turbo Pascal was many programmers' first compiled language experience.",
      problemSolved: "Pascal compilers were slow and expensive for hobbyists and students.",
    },
    category: "software",
    tags: ["people", "pascal", "programming-language"],
    people: [{ id: "anders-hejlsberg", name: "Anders Hejlsberg", role: "creator" }],
    importance: 6,
    sources: [
      {
        title: "Borland — Turbo Pascal history (1983)",
        url: "https://en.wikipedia.org/wiki/Turbo_Pascal",
        role: "date",
      },
      {
        title: "Wikipedia — Anders Hejlsberg (overview)",
        url: "https://en.wikipedia.org/wiki/Anders_Hejlsberg",
        role: "overview",
      },
    ],
    relatedIds: ["csharp-announced", "typescript-preview-released"],
  }),
  m({
    id: "graydon-hoare-rust-started",
    date: "2006-07",
    datePrecision: "month",
    title: "Graydon Hoare begins Rust",
    summary:
      "Graydon Hoare started the Rust language project in July 2006 as a Mozilla research effort for safe systems programming.",
    about:
      "Hoare designed Rust's ownership model to eliminate memory bugs without garbage collection. Mozilla sponsored Rust until community foundations took over — now used in Linux, browsers, and infrastructure.",
    narrative: {
      whyChosen: "Rust's ownership model is the most influential memory-safety idea since garbage collection.",
      whyImportant: "It offered a third path between manual C and GC languages.",
      problemSolved: "Systems programmers needed safety without runtime overhead or GC pauses.",
    },
    category: "software",
    tags: ["people", "rust", "programming-language"],
    people: [{ id: "graydon-hoare", name: "Graydon Hoare", role: "creator" }],
    importance: 6,
    sources: [
      {
        title: "Rust — Project history (started 2006)",
        url: "https://www.rust-lang.org/",
        role: "date",
      },
      {
        title: "Wikipedia — Rust (programming language) (overview)",
        url: "https://en.wikipedia.org/wiki/Rust_(programming_language)",
        role: "overview",
      },
    ],
    relatedIds: ["rust-1-0-released"],
  }),

  // —— P4: Researchers & theory ——
  m({
    id: "dijkstra-go-to-considered-harmful",
    date: "1968-03",
    datePrecision: "month",
    title: "Dijkstra publishes 'Go To Considered Harmful'",
    summary:
      "Edsger Dijkstra's March 1968 letter argued against unrestricted goto statements — shaping structured programming.",
    about:
      "Dijkstra's note influenced how generations learned control flow with if/while/for instead of spaghetti jumps. He also invented shortest-path algorithms and semaphores fundamental to OS design.",
    narrative: {
      whyChosen: "The letter is one of the most cited opinion pieces in programming history.",
      whyImportant: "It advanced structured programming and readable control flow.",
      problemSolved: "Unrestricted goto made large programs impossible to reason about or maintain.",
    },
    category: "culture",
    tags: ["people", "computer-science", "research"],
    people: [{ id: "edsger-dijkstra", name: "Edsger Dijkstra", role: "researcher" }],
    importance: 6,
    sources: [
      {
        title: "Communications of the ACM — Dijkstra letter (March 1968)",
        url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
        role: "date",
      },
      {
        title: "Wikipedia — Edsger W. Dijkstra (overview)",
        url: "https://en.wikipedia.org/wiki/Edsger_W._Dijkstra",
        role: "overview",
      },
    ],
    relatedIds: [],
  }),
  m({
    id: "leslie-lamport-paxos-published",
    date: "1998-05",
    datePrecision: "month",
    title: "Leslie Lamport publishes Paxos",
    summary:
      "Leslie Lamport's May 1998 paper 'The Part-Time Parliament' described the Paxos consensus algorithm — foundational for distributed systems.",
    about:
      "Paxos and Lamport's later work on logical clocks underpin Kafka, etcd, ZooKeeper, and every system that must agree across failures. Programmers encounter his ideas whenever they design replicated state machines.",
    narrative: {
      whyChosen: "Paxos is the theoretical backbone of practical distributed consensus.",
      whyImportant: "It formalized how unreliable nodes can agree on a single value.",
      problemSolved: "Distributed services needed provable agreement despite crashes and partitions.",
    },
    category: "invention",
    tags: ["people", "distributed-systems", "research"],
    people: [{ id: "leslie-lamport", name: "Leslie Lamport", role: "researcher" }],
    importance: 6,
    sources: [
      {
        title: "ACM TOCS — Lamport, The Part-Time Parliament (1998)",
        url: "https://lamport.azurewebsites.net/pubs/lamport-paxos.pdf",
        role: "date",
      },
      {
        title: "Wikipedia — Paxos (overview)",
        url: "https://en.wikipedia.org/wiki/Paxos_(computer_science)",
        role: "overview",
      },
    ],
    relatedIds: [],
  }),
  m({
    id: "barbara-liskov-turing-award",
    date: "2008",
    datePrecision: "year",
    title: "Barbara Liskov receives Turing Award",
    summary:
      "Barbara Liskov won the 2008 ACM Turing Award for contributions to practical and theoretical foundations of programming languages and systems.",
    about:
      "Liskov substitution principle, CLU, and Byzantine fault tolerance shaped OOP theory and distributed databases. She is among the most cited women in core computer science.",
    narrative: {
      whyChosen: "Liskov defined substitutability — the 'L' in SOLID — and fault-tolerant replication.",
      whyImportant: "Her work bridges language design and distributed system reliability.",
      problemSolved: "OOP and distributed systems lacked rigorous behavioral contracts.",
    },
    category: "culture",
    tags: ["people", "computer-science", "award"],
    people: [{ id: "barbara-liskov", name: "Barbara Liskov", role: "researcher" }],
    importance: 6,
    sources: [
      {
        title: "ACM — 2008 Turing Award (Barbara Liskov)",
        url: "https://amturing.acm.org/award_winners/Liskov_1108679.cfm",
        role: "date",
      },
      {
        title: "Wikipedia — Barbara Liskov (overview)",
        url: "https://en.wikipedia.org/wiki/Barbara_Liskov",
        role: "overview",
      },
    ],
    relatedIds: [],
  }),
  m({
    id: "john-mccarthy-lisp-invented",
    date: "1958",
    datePrecision: "year",
    title: "John McCarthy invents Lisp",
    summary:
      "John McCarthy invented Lisp in 1958 at MIT — the second-oldest high-level programming language still in use.",
    about:
      "Lisp introduced garbage collection, symbolic expressions, and macros — ideas that influenced Python, JavaScript, and Clojure. McCarthy also coined the term 'artificial intelligence' and organized the Dartmouth workshop.",
    narrative: {
      whyChosen: "Lisp is the ancestor of functional programming and AI research languages.",
      whyImportant: "It treated code as data — enabling macros and metaprogramming decades early.",
      problemSolved: "Researchers needed a flexible symbolic language for AI experiments on early computers.",
    },
    category: "software",
    tags: ["people", "lisp", "ai", "programming-language"],
    people: [{ id: "john-mccarthy", name: "John McCarthy", role: "creator" }],
    importance: 3,
    sources: [
      {
        title: "Stanford — McCarthy, Recursive Functions of Symbolic Expressions (1960; Lisp 1958)",
        url: "https://www-formal.stanford.edu/jmc/recursive.html",
        role: "date",
      },
      {
        title: "Wikipedia — Lisp (overview)",
        url: "https://en.wikipedia.org/wiki/Lisp_(programming_language)",
        role: "overview",
      },
    ],
    relatedIds: [],
  }),
  m({
    id: "niklaus-wirth-pascal-published",
    date: "1970",
    datePrecision: "year",
    title: "Niklaus Wirth publishes Pascal",
    summary:
      "Niklaus Wirth designed Pascal in 1970 as a teaching language emphasizing structured programming and clarity.",
    about:
      "Pascal trained generations through Turbo Pascal and Delphi before yielding to C++ and Java. Wirth also created Modula-2 and Oberon — advocating simplicity with his quote 'Pascal is my favorite language after Pascal.'",
    narrative: {
      whyChosen: "Pascal was the default intro language for a decade of CS education.",
      whyImportant: "It spread structured programming discipline to millions of students.",
      problemSolved: "FORTRAN and BASIC taught bad habits; Wirth wanted a small, clear teaching language.",
    },
    category: "software",
    tags: ["people", "pascal", "programming-language"],
    people: [{ id: "niklaus-wirth", name: "Niklaus Wirth", role: "creator" }],
    importance: 6,
    sources: [
      {
        title: "ETH Zurich — Wirth, The Programming Language Pascal (1970)",
        url: "https://en.wikipedia.org/wiki/Pascal_(programming_language)",
        role: "date",
      },
      {
        title: "Wikipedia — Pascal (programming language) (overview)",
        url: "https://en.wikipedia.org/wiki/Pascal_(programming_language)",
        role: "overview",
      },
    ],
    relatedIds: ["pascal-report-published"],
  }),
  m({
    id: "fred-brooks-mythical-man-month",
    date: "1975",
    datePrecision: "year",
    title: "Fred Brooks publishes The Mythical Man-Month",
    summary:
      "Fred Brooks published The Mythical Man-Month in 1975 — essays on software project management including 'adding manpower to a late project makes it later.'",
    about:
      "Brooks managed IBM's OS/360 and distilled lessons every engineering manager still cites. The book shaped how the industry talks about estimation, communication overhead, and the tar pit of large systems.",
    narrative: {
      whyChosen: "Brooks's law is still quoted in sprint planning and postmortems.",
      whyImportant: "It connected human organization to software schedule failure modes.",
      problemSolved: "Managers assumed staffing linearly sped delivery without coordination costs.",
    },
    category: "culture",
    tags: ["people", "software-engineering", "author"],
    people: [{ id: "fred-brooks", name: "Fred Brooks", role: "author" }],
    importance: 6,
    sources: [
      {
        title: "University of North Carolina — Brooks bibliography (1975)",
        url: "https://en.wikipedia.org/wiki/The_Mythical_Man-Month",
        role: "date",
      },
      {
        title: "Wikipedia — The Mythical Man-Month (overview)",
        url: "https://en.wikipedia.org/wiki/The_Mythical_Man-Month",
        role: "overview",
      },
    ],
    relatedIds: [],
  }),
  m({
    id: "john-von-neumann-architecture",
    date: "1945-06",
    datePrecision: "month",
    title: "von Neumann stored-program architecture",
    summary:
      "John von Neumann's 1945 'First Draft' report described stored-program computers — program and data in shared memory.",
    about:
      "The von Neumann architecture still defines how CPUs fetch instructions from RAM. Every C program, Python interpreter, and JavaScript engine runs on this model unless explicitly heterogeneous (GPUs, TPUs).",
    narrative: {
      whyChosen: "Stored-program architecture is the blueprint of all general-purpose computers.",
      whyImportant: "It unified programs and data in addressable memory.",
      problemSolved: "Early computers rewired hardware to change programs; storage needed to be electronic and mutable.",
    },
    category: "invention",
    tags: ["people", "computer-architecture", "research"],
    people: [{ id: "john-von-neumann", name: "John von Neumann", role: "researcher" }],
    importance: 3,
    sources: [
      {
        title: "IAS — First Draft of a Report on the EDVAC (June 1945)",
        url: "https://en.wikipedia.org/wiki/First_Draft_of_a_Report_on_the_EDVAC",
        role: "date",
      },
      {
        title: "Wikipedia — Von Neumann architecture (overview)",
        url: "https://en.wikipedia.org/wiki/Von_Neumann_architecture",
        role: "overview",
      },
    ],
    relatedIds: [],
  }),
  m({
    id: "frances-allen-turing-award",
    date: "2006",
    datePrecision: "year",
    title: "Frances Allen receives Turing Award",
    summary:
      "Frances Allen became the first woman to win the ACM Turing Award in 2006 for pioneering compiler optimization techniques.",
    about:
      "Allen's work at IBM on automatic parallelization and optimization underpins every modern compiler. She proved deep systems research could come from industry labs, not only academia.",
    narrative: {
      whyChosen: "Allen broke the Turing Award gender barrier for compiler pioneers.",
      whyImportant: "Her optimizations made high-level languages practical for performance-critical code.",
      problemSolved: "Early compilers generated naive code; optimization required manual assembly expertise.",
    },
    category: "culture",
    tags: ["people", "compiler", "award"],
    people: [{ id: "frances-allen", name: "Frances Allen", role: "researcher" }],
    importance: 6,
    sources: [
      {
        title: "ACM — 2006 Turing Award (Frances Allen)",
        url: "https://amturing.acm.org/award_winners/allen_8024041.cfm",
        role: "date",
      },
      {
        title: "Wikipedia — Frances Allen (overview)",
        url: "https://en.wikipedia.org/wiki/Frances_E._Allen",
        role: "overview",
      },
    ],
    relatedIds: [],
  }),
  m({
    id: "shafi-goldwasser-turing-award",
    date: "2012",
    datePrecision: "year",
    title: "Shafi Goldwasser receives Turing Award",
    summary:
      "Shafi Goldwasser won the 2012 ACM Turing Award with Silvio Micali for transformative work in cryptography and complexity theory.",
    about:
      "Goldwasser's zero-knowledge proofs and probabilistic encryption underpin blockchain, TLS, and modern security protocols. Her career advanced rigorous foundations for practical cryptography.",
    narrative: {
      whyChosen: "Goldwasser linked theoretical crypto to protocols developers deploy daily.",
      whyImportant: "Zero-knowledge proofs enable privacy-preserving verification.",
      problemSolved: "Cryptographic systems needed provable security definitions, not ad hoc designs.",
    },
    category: "culture",
    tags: ["people", "cryptography", "award"],
    people: [{ id: "shafi-goldwasser", name: "Shafi Goldwasser", role: "researcher" }],
    importance: 6,
    sources: [
      {
        title: "ACM — 2012 Turing Award (Goldwasser & Micali)",
        url: "https://amturing.acm.org/award_winners/goldwasser_8627889.cfm",
        role: "date",
      },
      {
        title: "Wikipedia — Shafi Goldwasser (overview)",
        url: "https://en.wikipedia.org/wiki/Shafi_Goldwasser",
        role: "overview",
      },
    ],
    relatedIds: [],
  }),
  m({
    id: "karen-sparck-jones-idf",
    date: "1972",
    datePrecision: "year",
    title: "Karen Spärck Jones publishes IDF",
    summary:
      "Karen Spärck Jones introduced inverse document frequency (IDF) in 1972 — a cornerstone of search ranking and information retrieval.",
    about:
      "IDF weights rare terms higher in search — the 'idf' in tf-idf used by Elasticsearch, Lucene, and early Google. Her work predates the web but powers every search engine developers integrate with.",
    narrative: {
      whyChosen: "IDF is foundational math behind modern search ranking.",
      whyImportant: "It quantified term importance across document collections.",
      problemSolved: "Keyword matching alone ranked common words as important as distinctive ones.",
    },
    category: "invention",
    tags: ["people", "search", "research"],
    people: [{ id: "karen-sparck-jones", name: "Karen Spärck Jones", role: "researcher" }],
    importance: 6,
    sources: [
      {
        title: "Journal of Documentation — Spärck Jones, 1972",
        url: "https://en.wikipedia.org/wiki/Karen_Sp%C3%A4rck_Jones",
        role: "date",
      },
      {
        title: "Wikipedia — Karen Spärck Jones (overview)",
        url: "https://en.wikipedia.org/wiki/Karen_Sp%C3%A4rck_Jones",
        role: "overview",
      },
    ],
    relatedIds: [],
  }),

  // —— P5: Web, open source & culture ——
  m({
    id: "berners-lee-web-public-domain",
    date: "1993-04-30",
    datePrecision: "day",
    title: "CERN releases the web into the public domain",
    summary:
      "CERN released the World Wide Web technology into the public domain on April 30, 1993 — no royalties, no licensing fees.",
    about:
      "Berners-Lee and CERN's decision let anyone build browsers and servers without permission — enabling Mosaic, Netscape, Apache, and the commercial internet. It is one of the most consequential open releases in computing history.",
    narrative: {
      whyChosen: "Public-domain release unlocked the web's exponential growth.",
      whyImportant: "It prevented proprietary lock-in on hypertext protocols.",
      problemSolved: "Companies could have patented or licensed core web technology.",
    },
    category: "culture",
    tags: ["people", "web", "open-source", "cern"],
    people: [{ id: "tim-berners-lee", name: "Tim Berners-Lee", role: "creator" }],
    importance: 3,
    sources: [
      {
        title: "CERN — Web release into public domain (April 30, 1993)",
        url: "https://home.cern/science/computing/birth-web",
        role: "date",
      },
      {
        title: "Wikipedia — World Wide Web (overview)",
        url: "https://en.wikipedia.org/wiki/World_Wide_Web",
        role: "overview",
      },
    ],
    relatedIds: ["worldwideweb-browser"],
  }),
  m({
    id: "stallman-gnu-manifesto",
    date: "1985-03",
    datePrecision: "month",
    title: "Richard Stallman publishes the GNU Manifesto",
    summary:
      "Richard Stallman published the GNU Manifesto in March 1985 — launching the free software movement and GNU project.",
    about:
      "Stallman's GNU tools (GCC, Emacs, glibc) and GPL license shaped Linux distributions and open-source legal frameworks. Developers still navigate copyleft because of choices Stallman articulated in the 1980s.",
    narrative: {
      whyChosen: "The GNU Manifesto defined ideological and legal foundations of free software.",
      whyImportant: "It established user freedom as a goal distinct from mere source availability.",
      problemSolved: "Proprietary Unix vendors blocked sharing and modifying system software.",
    },
    category: "culture",
    tags: ["people", "gnu", "open-source", "free-software"],
    people: [{ id: "richard-stallman", name: "Richard Stallman", role: "founder" }],
    importance: 3,
    sources: [
      {
        title: "GNU — The GNU Manifesto (March 1985)",
        url: "https://www.gnu.org/gnu/manifesto.html",
        role: "date",
      },
      {
        title: "Wikipedia — GNU Manifesto (overview)",
        url: "https://en.wikipedia.org/wiki/GNU_Manifesto",
        role: "overview",
      },
    ],
    relatedIds: [],
  }),
  m({
    id: "gpl-version-1-released",
    date: "1989-02",
    datePrecision: "month",
    title: "GPL version 1 published",
    summary:
      "The Free Software Foundation published GPL v1 in February 1989 — the copyleft license behind Linux, GCC, and thousands of projects.",
    about:
      "GPL requires derivatives to stay open — influencing corporate open-source policies and dual-licensing business models. Every developer who ships GPL code inherits Stallman's legal framework.",
    narrative: {
      whyChosen: "GPL is the legal backbone of the free software ecosystem.",
      whyImportant: "Copyleft ensured improvements returned to the community.",
      problemSolved: "Permissive licenses let companies take open code proprietary without contributing back.",
    },
    category: "culture",
    tags: ["people", "open-source", "license", "free-software"],
    people: [{ id: "richard-stallman", name: "Richard Stallman", role: "author" }],
    importance: 6,
    sources: [
      {
        title: "GNU — GPL version 1 (February 1989)",
        url: "https://www.gnu.org/licenses/old-licenses/gpl-1.0.html",
        role: "date",
      },
      {
        title: "Wikipedia — GNU General Public License (overview)",
        url: "https://en.wikipedia.org/wiki/GNU_General_Public_License",
        role: "overview",
      },
    ],
    relatedIds: ["stallman-gnu-manifesto"],
  }),
  m({
    id: "open-source-initiative-founded",
    date: "1998-02",
    datePrecision: "month",
    title: "Open Source Initiative founded",
    summary:
      "Eric Raymond and Bruce Perens co-founded the Open Source Initiative in February 1998 — coining 'open source' as a business-friendly term.",
    about:
      "OSI certified licenses and promoted open source to enterprises skeptical of Stallman's 'free software' framing. The term enabled Netscape's Mozilla release and the dot-com open-source wave.",
    narrative: {
      whyChosen: "OSI rebranded free software for corporate adoption.",
      whyImportant: "It separated pragmatic open collaboration from ideological free software debates.",
      problemSolved: "Businesses avoided 'free software' language that sounded anti-commercial.",
    },
    category: "culture",
    tags: ["people", "open-source"],
    people: [
      { id: "eric-raymond", name: "Eric S. Raymond", role: "co-founder" },
      { id: "bruce-perens", name: "Bruce Perens", role: "co-founder" },
    ],
    importance: 6,
    sources: [
      {
        title: "OSI — History (founded February 1998)",
        url: "https://opensource.org/about",
        role: "date",
      },
      {
        title: "Wikipedia — Open Source Initiative (overview)",
        url: "https://en.wikipedia.org/wiki/Open_Source_Initiative",
        role: "overview",
      },
    ],
    relatedIds: ["mozilla-source-released"],
  }),
  m({
    id: "mozilla-foundation-created",
    date: "2003-07-15",
    datePrecision: "day",
    title: "Mozilla Foundation created",
    summary:
      "The Mozilla Foundation launched on July 15, 2003 to steward Firefox, Thunderbird, and open web standards after AOL scaled back Netscape.",
    about:
      "Mozilla kept a nonprofit home for browser engine development independent of any single vendor — influencing WebKit, Chromium competition, and MDN documentation developers rely on.",
    narrative: {
      whyChosen: "Mozilla Foundation preserved an independent browser voice post-Netscape.",
      whyImportant: "It sustained open web advocacy when commercial browsers consolidated.",
      problemSolved: "Browser innovation risked collapsing into IE monopoly without nonprofit stewardship.",
    },
    category: "culture",
    tags: ["people", "mozilla", "browser", "open-source"],
    people: [{ id: "mitchell-baker", name: "Mitchell Baker", role: "founder" }],
    importance: 6,
    sources: [
      {
        title: "Mozilla — Mozilla Foundation established (July 15, 2003)",
        url: "https://blog.mozilla.org/press/2003/07/mozilla-foundation-established/",
        role: "date",
      },
      {
        title: "Wikipedia — Mozilla Foundation (overview)",
        url: "https://en.wikipedia.org/wiki/Mozilla_Foundation",
        role: "overview",
      },
    ],
    relatedIds: ["firefox-1-0-released", "mozilla-source-released"],
  }),
  m({
    id: "wikipedia-launched",
    date: "2001-01-15",
    datePrecision: "day",
    title: "Wikipedia launched",
    summary:
      "Jimmy Wales and Larry Sanger launched Wikipedia on January 15, 2001 — a collaboratively edited encyclopedia that became developers' default reference.",
    about:
      "Wikipedia is the overview source cited across Techline events — and the daily starting point for programmers researching APIs, history, and standards. Its wiki model influenced internal company wikis and Ward Cunningham's original wiki concept.",
    narrative: {
      whyChosen: "Wikipedia became the universal free reference for technical and historical facts.",
      whyImportant: "It proved large-scale collaborative knowledge curation could work.",
      problemSolved: "Authoritative encyclopedias were expensive, slow to update, and incomplete on tech topics.",
    },
    category: "culture",
    tags: ["people", "wiki", "open-source"],
    people: [
      { id: "jimmy-wales", name: "Jimmy Wales", role: "co-founder" },
      { id: "larry-sanger", name: "Larry Sanger", role: "co-founder" },
    ],
    importance: 6,
    sources: [
      {
        title: "Wikipedia — Wikipedia launched (January 15, 2001)",
        url: "https://en.wikipedia.org/wiki/Wikipedia",
        role: "date",
      },
      {
        title: "Wikimedia Foundation — About Wikipedia (overview)",
        url: "https://www.wikimedia.org/",
        role: "overview",
      },
    ],
    relatedIds: [],
  }),
  m({
    id: "ward-cunningham-wiki-invented",
    date: "1995-03",
    datePrecision: "month",
    title: "Ward Cunningham creates the wiki",
    summary:
      "Ward Cunningham launched the first wiki in March 1995 — quick collaborative editing that inspired Wikipedia and countless internal dev docs.",
    about:
      "Wiki syntax and culture ('edit this page') shaped how engineering teams document runbooks, RFCs, and postmortems. Cunningham's pattern language work also influenced agile and software design thinking.",
    narrative: {
      whyChosen: "The wiki invented lightweight collaborative documentation.",
      whyImportant: "It lowered the barrier to contributing knowledge compared to formal CMS tools.",
      problemSolved: "Team knowledge was trapped in email and individual files without shared editing.",
    },
    category: "invention",
    tags: ["people", "wiki", "collaboration"],
    people: [{ id: "ward-cunningham", name: "Ward Cunningham", role: "creator" }],
    importance: 6,
    sources: [
      {
        title: "Cunningham & Cunningham — Wiki history (March 1995)",
        url: "https://wiki.c2.com/",
        role: "date",
      },
      {
        title: "Wikipedia — Wiki (overview)",
        url: "https://en.wikipedia.org/wiki/Wiki",
        role: "overview",
      },
    ],
    relatedIds: ["wikipedia-launched"],
  }),
  m({
    id: "martin-fowler-refactoring-published",
    date: "1999",
    datePrecision: "year",
    title: "Martin Fowler publishes Refactoring",
    summary:
      "Martin Fowler published Refactoring in 1999 — cataloging code improvement patterns and popularizing incremental design in OO systems.",
    about:
      "Fowler's catalog gave names to extract-method, move-field, and dozens of safe transformations IDEs now automate. He shaped agile, microservices, and enterprise patterns discourse for Java and beyond.",
    narrative: {
      whyChosen: "Refactoring vocabulary became standard in IDEs and code review culture.",
      whyImportant: "It legitimized changing structure without changing behavior as professional practice.",
      problemSolved: "Teams feared improving messy code without a shared pattern language.",
    },
    category: "culture",
    tags: ["people", "software-engineering", "author"],
    people: [{ id: "martin-fowler", name: "Martin Fowler", role: "author" }],
    importance: 6,
    sources: [
      {
        title: "martinfowler.com — Refactoring book (1999)",
        url: "https://martinfowler.com/books/refactoring.html",
        role: "date",
      },
      {
        title: "Wikipedia — Refactoring (overview)",
        url: "https://en.wikipedia.org/wiki/Code_refactoring",
        role: "overview",
      },
    ],
    relatedIds: [],
  }),
  m({
    id: "kent-beck-extreme-programming",
    date: "1999",
    datePrecision: "year",
    title: "Extreme Programming Explained",
    summary:
      "Kent Beck published Extreme Programming Explained in 1999 — popularizing pair programming, TDD, and iterative delivery.",
    about:
      "XP influenced Agile Manifesto authors and every modern CI/CD pipeline. Beck also created JUnit — the ancestor of xUnit frameworks in every language.",
    narrative: {
      whyChosen: "Beck connected testing, pairing, and iteration into a named methodology.",
      whyImportant: "TDD and continuous integration became industry defaults.",
      problemSolved: "Waterfall planning failed for fast-changing software products.",
    },
    category: "culture",
    tags: ["people", "agile", "testing", "author"],
    people: [{ id: "kent-beck", name: "Kent Beck", role: "author" }],
    importance: 6,
    sources: [
      {
        title: "Kent Beck — Extreme Programming Explained (1999)",
        url: "https://en.wikipedia.org/wiki/Extreme_programming",
        role: "date",
      },
      {
        title: "Wikipedia — Extreme programming (overview)",
        url: "https://en.wikipedia.org/wiki/Extreme_programming",
        role: "overview",
      },
    ],
    relatedIds: [],
  }),
  m({
    id: "eric-raymond-cathedral-bazaar",
    date: "1997",
    datePrecision: "year",
    title: "The Cathedral and the Bazaar",
    summary:
      "Eric Raymond's essay The Cathedral and the Bazaar (1997) argued open, distributed development beats closed planning — influencing Netscape's Mozilla release.",
    about:
      "Raymond's 'given enough eyeballs, all bugs are shallow' became open-source folklore. The essay gave executives a narrative for releasing proprietary code — directly preceding the 1998 Mozilla source dump.",
    narrative: {
      whyChosen: "The essay bridged hacker culture and corporate open-source strategy.",
      whyImportant: "It gave language for why Netscape and others should open their codebases.",
      problemSolved: "Executives lacked a business case for releasing source code.",
    },
    category: "culture",
    tags: ["people", "open-source", "essay"],
    people: [{ id: "eric-raymond", name: "Eric S. Raymond", role: "author" }],
    importance: 6,
    sources: [
      {
        title: "Eric Raymond — The Cathedral and the Bazaar (1997)",
        url: "http://www.catb.org/~esr/writings/cathedral-bazaar/",
        role: "date",
      },
      {
        title: "Wikipedia — The Cathedral and the Bazaar (overview)",
        url: "https://en.wikipedia.org/wiki/The_Cathedral_and_the_Bazaar",
        role: "overview",
      },
    ],
    relatedIds: ["mozilla-source-released", "open-source-initiative-founded"],
  }),

  // —— P6: Women pioneers & networking ——
  m({
    id: "radia-perlman-spanning-tree",
    date: "1985-05",
    datePrecision: "month",
    title: "Radia Perlman publishes spanning tree protocol",
    summary:
      "Radia Perlman invented the spanning tree protocol (STP), published in May 1985 — keeping Ethernet networks loop-free.",
    about:
      "STP runs in virtually every enterprise switch and datacenter — invisible infrastructure developers depend on when deploying services. Perlman is often called the 'mother of the internet' for bridging and routing contributions.",
    narrative: {
      whyChosen: "Spanning tree is foundational networking math behind every LAN.",
      whyImportant: "It prevented broadcast storms in redundant Ethernet topologies.",
      problemSolved: "Redundant network links caused loops without an automatic disabling algorithm.",
    },
    category: "invention",
    tags: ["people", "networking", "protocol"],
    people: [{ id: "radia-perlman", name: "Radia Perlman", role: "researcher" }],
    importance: 6,
    sources: [
      {
        title: "IEEE — Perlman, An Algorithm for Distributed Computation of a Spanning Tree (1985)",
        url: "https://en.wikipedia.org/wiki/Spanning_Tree_Protocol",
        role: "date",
      },
      {
        title: "Wikipedia — Radia Perlman (overview)",
        url: "https://en.wikipedia.org/wiki/Radia_Perlman",
        role: "overview",
      },
    ],
    relatedIds: [],
  }),
  m({
    id: "adele-goldberg-smalltalk-80",
    date: "1980",
    datePrecision: "year",
    title: "Adele Goldberg co-releases Smalltalk-80",
    summary:
      "Adele Goldberg and the Xerox PARC team released Smalltalk-80 in 1980 — pioneering GUIs, OOP, and live programming environments.",
    about:
      "Smalltalk influenced Objective-C, Java, Ruby, and every IDE with a REPL or object browser. Goldberg famously showed Steve Jobs the Xerox GUI concepts that shaped the Macintosh.",
    narrative: {
      whyChosen: "Smalltalk-80 defined modern OOP and interactive development environments.",
      whyImportant: "It proved objects and GUIs belonged together on personal computers.",
      problemSolved: "Programming was batch-oriented without visual feedback or object metaphors.",
    },
    category: "software",
    tags: ["people", "smalltalk", "oop", "gui"],
    people: [{ id: "adele-goldberg", name: "Adele Goldberg", role: "co-creator" }],
    importance: 6,
    sources: [
      {
        title: "Xerox PARC — Smalltalk-80 (1980)",
        url: "https://en.wikipedia.org/wiki/Smalltalk",
        role: "date",
      },
      {
        title: "Wikipedia — Adele Goldberg (overview)",
        url: "https://en.wikipedia.org/wiki/Adele_Goldberg_(computer_scientist)",
        role: "overview",
      },
    ],
    relatedIds: ["simula-67-presented"],
  }),
  m({
    id: "grace-hopper-nanoseconds-lecture",
    date: "1986",
    datePrecision: "year",
    title: "Grace Hopper nanosecond lecture",
    summary:
      "Rear Admiral Grace Hopper toured the 1980s explaining nanoseconds with physical wire — evangelizing why short programs and fast hardware matter.",
    about:
      "Hopper helped standardize COBOL and pushed high-level languages on the military and industry. Her teaching made latency tangible for generations of managers and programmers beyond the 1959 COBOL specification event.",
    narrative: {
      whyChosen: "Hopper was the most visible advocate for programmer-friendly languages in industry.",
      whyImportant: "She bridged military procurement and commercial software standardization.",
      problemSolved: "Hardware buyers underestimated how physical distance limits computer speed.",
    },
    category: "culture",
    tags: ["people", "cobol", "advocacy"],
    people: [{ id: "grace-hopper", name: "Grace Hopper", role: "researcher" }],
    importance: 6,
    sources: [
      {
        title: "Yale — Grace Murray Hopper archives",
        url: "https://en.wikipedia.org/wiki/Grace_Hopper",
        role: "date",
      },
      {
        title: "Wikipedia — Grace Hopper (overview)",
        url: "https://en.wikipedia.org/wiki/Grace_Hopper",
        role: "overview",
      },
    ],
    relatedIds: ["cobol-specifications-submitted"],
  }),
  m({
    id: "anita-borg-grace-hopper-conference",
    date: "1994",
    datePrecision: "year",
    title: "Anita Borg founds Grace Hopper Celebration",
    summary:
      "Anita Borg co-founded the Grace Hopper Celebration in 1994 — the largest gathering of women technologists.",
    about:
      "GHC became the flagship conference for women in computing — influencing hiring pipelines and community building across industry and academia. Borg also created Systers, an early online forum for women in tech.",
    narrative: {
      whyChosen: "GHC shaped diversity efforts in software engineering hiring and retention.",
      whyImportant: "It created visible community for underrepresented developers at scale.",
      problemSolved: "Women in computing lacked institutional networks and conference representation.",
    },
    category: "culture",
    tags: ["people", "diversity", "community"],
    people: [{ id: "anita-borg", name: "Anita Borg", role: "founder" }],
    importance: 6,
    sources: [
      {
        title: "AnitaB.org — Grace Hopper Celebration history (1994)",
        url: "https://www.anitab.org/",
        role: "date",
      },
      {
        title: "Wikipedia — Anita Borg (overview)",
        url: "https://en.wikipedia.org/wiki/Anita_Borg",
        role: "overview",
      },
    ],
    relatedIds: [],
  }),
  m({
    id: "elizabeth-feinler-nic-director",
    date: "1974-05",
    datePrecision: "month",
    title: "Elizabeth Feinler leads the ARPANET NIC",
    summary:
      "Elizabeth Feinler became principal investigator of the ARPANET Network Information Center in 1974 — maintaining the hosts file and directory services that preceded DNS.",
    about:
      "Feinler's team published the directory of every machine on the early internet — precursor to DNS and WHOIS. Her work made the growing network navigable for researchers and operators.",
    narrative: {
      whyChosen: "Feinler operated the human-powered 'search engine' of the pre-DNS internet.",
      whyImportant: "She scaled directory services as ARPANET grew beyond memorized host lists.",
      problemSolved: "There was no automated naming when thousands of hosts joined the network.",
    },
    category: "culture",
    tags: ["people", "internet", "networking"],
    people: [{ id: "elizabeth-feinler", name: "Elizabeth Feinler", role: "researcher" }],
    importance: 9,
    sources: [
      {
        title: "Stanford — Feinler NIC history (1972–1989)",
        url: "https://en.wikipedia.org/wiki/Elizabeth_J._Feinler",
        role: "date",
      },
      {
        title: "Wikipedia — Elizabeth J. Feinler (overview)",
        url: "https://en.wikipedia.org/wiki/Elizabeth_J._Feinler",
        role: "overview",
      },
    ],
    relatedIds: [],
  }),
  m({
    id: "mary-lou-jepsen-olpc-displays",
    date: "2007",
    datePrecision: "year",
    title: "Mary Lou Jepsen leads OLPC display engineering",
    summary:
      "Mary Lou Jepsen engineered the low-power display for One Laptop per Child (2007) — cutting cost and power for education laptops.",
    about:
      "OLPC's $100 laptop mission pushed developers to target constrained hardware. Jepsen's display work made sunlight-readable, low-watt screens viable for mass education deployments.",
    narrative: {
      whyChosen: "OLPC displays proved affordable laptops could reach developing-world classrooms.",
      whyImportant: "Hardware cost barriers shape which populations learn to program.",
      problemSolved: "Laptop displays consumed too much power and cost for education markets.",
    },
    category: "hardware",
    tags: ["people", "hardware", "accessibility"],
    people: [{ id: "mary-lou-jepsen", name: "Mary Lou Jepsen", role: "researcher" }],
    importance: 9,
    sources: [
      {
        title: "OLPC — One Laptop per Child project (2007)",
        url: "https://en.wikipedia.org/wiki/One_Laptop_per_Child",
        role: "date",
      },
      {
        title: "Wikipedia — Mary Lou Jepsen (overview)",
        url: "https://en.wikipedia.org/wiki/Mary_Lou_Jepsen",
        role: "overview",
      },
    ],
    relatedIds: [],
  }),
  m({
    id: "susan-kare-macintosh-icons",
    date: "1984",
    datePrecision: "year",
    title: "Susan Kare designs Macintosh icons",
    summary:
      "Susan Kare designed the original Macintosh icons, fonts, and UI elements in 1983–1984 — defining visual language for GUI computing.",
    about:
      "Kare's Chicago font, trash can, and happy Mac icon made graphical interfaces legible to non-programmers. Her work influenced every desktop and mobile icon system developers design for today.",
    narrative: {
      whyChosen: "Kare's icons made GUIs approachable for mainstream users.",
      whyImportant: "Visual metaphors became as important as code in human-computer interaction.",
      problemSolved: "Early GUIs lacked consistent, memorable iconography.",
    },
    category: "culture",
    tags: ["people", "design", "gui", "apple"],
    people: [{ id: "susan-kare", name: "Susan Kare", role: "creator" }],
    importance: 6,
    sources: [
      {
        title: "Apple — Macintosh introduction (1984; Kare iconography 1983–84)",
        url: "https://en.wikipedia.org/wiki/Susan_Kare",
        role: "date",
      },
      {
        title: "Wikipedia — Susan Kare (overview)",
        url: "https://en.wikipedia.org/wiki/Susan_Kare",
        role: "overview",
      },
    ],
    relatedIds: [],
  }),
  m({
    id: "lynn-conway-vlsi-course",
    date: "1979",
    datePrecision: "year",
    title: "Mead–Conway VLSI methodology",
    summary:
      "Lynn Conway co-authored the 1979 Mead–Conway VLSI course — democratizing chip design with scalable design rules.",
    about:
      "The Mead–Conway revolution let universities fabricate student-designed chips via MOSIS — training a generation of hardware engineers. Conway's advocacy also advanced transgender visibility in tech.",
    narrative: {
      whyChosen: "Mead–Conway made custom silicon accessible beyond a few chip companies.",
      whyImportant: "It accelerated VLSI education and startup semiconductor design.",
      problemSolved: "Chip layout knowledge was locked inside proprietary vendor design manuals.",
    },
    category: "invention",
    tags: ["people", "hardware", "vlsi"],
    people: [{ id: "lynn-conway", name: "Lynn Conway", role: "author" }],
    importance: 6,
    sources: [
      {
        title: "Mead & Conway — Introduction to VLSI Systems (1979)",
        url: "https://en.wikipedia.org/wiki/Mead%E2%80%93Conway_VLSI_chip_design_revolution",
        role: "date",
      },
      {
        title: "Wikipedia — Lynn Conway (overview)",
        url: "https://en.wikipedia.org/wiki/Lynn_Conway",
        role: "overview",
      },
    ],
    relatedIds: [],
  }),
  m({
    id: "jean-sammet-formac-published",
    date: "1962",
    datePrecision: "year",
    title: "Jean Sammet develops FORMAC",
    summary:
      "Jean Sammet created FORMAC in 1962 — one of the first languages for symbolic mathematics on computers.",
    about:
      "Sammet also edited Programming Languages: History and Fundamentals — the standard reference for language historians. Her FORMAC work showed computers could manipulate algebra, not just arithmetic.",
    narrative: {
      whyChosen: "Sammet bridged symbolic math and programming language design.",
      whyImportant: "She documented the entire early language landscape for later researchers.",
      problemSolved: "Scientists needed automated symbolic manipulation beyond numeric FORTRAN.",
    },
    category: "software",
    tags: ["people", "programming-language", "symbolic-computing"],
    people: [{ id: "jean-sammet", name: "Jean Sammet", role: "creator" }],
    importance: 9,
    sources: [
      {
        title: "IBM — FORMAC development (1962)",
        url: "https://en.wikipedia.org/wiki/FORMAC",
        role: "date",
      },
      {
        title: "Wikipedia — Jean Sammet (overview)",
        url: "https://en.wikipedia.org/wiki/Jean_Sammet",
        role: "overview",
      },
    ],
    relatedIds: ["fortran-formally-published"],
  }),
  m({
    id: "lynx-browser-created",
    date: "1992",
    datePrecision: "year",
    title: "University of Kansas team creates Lynx",
    summary:
      "Lou Montulli, Michael Grobe, and Charles Rezac at the University of Kansas built Lynx in 1992 — a text-based hypertext browser that later gained web support.",
    about:
      "Before graphical browsers dominated, Lynx let developers and universities browse HTML from shell accounts. It remained essential for accessibility and low-bandwidth access for decades.",
    narrative: {
      whyChosen: "Lynx proved the web worked without graphics — critical for universities on Unix.",
      whyImportant: "It kept the web accessible on text-only and low-resource systems.",
      problemSolved: "Many users had no GUI but still needed to read hypertext documents.",
    },
    category: "software",
    tags: ["people", "browser", "web", "accessibility"],
    people: [
      { id: "lou-montulli", name: "Lou Montulli", role: "creator" },
      { id: "michael-grobe", name: "Michael Grobe", role: "co-creator" },
      { id: "charles-rezac", name: "Charles Rezac", role: "co-creator" },
    ],
    importance: 9,
    sources: [
      {
        title: "University of Kansas — Lynx browser history (1992)",
        url: "https://en.wikipedia.org/wiki/Lynx_(web_browser)",
        role: "date",
      },
      {
        title: "Wikipedia — Lynx (overview)",
        url: "https://en.wikipedia.org/wiki/Lynx_(web_browser)",
        role: "overview",
      },
    ],
    relatedIds: ["worldwideweb-browser"],
  }),

  // —— P7: Tooling & infrastructure creators ——
  m({
    id: "fabrice-bellard-ffmpeg-created",
    date: "2000",
    datePrecision: "year",
    title: "Fabrice Bellard creates FFmpeg",
    summary:
      "Fabrice Bellard started FFmpeg in 2000 — the multimedia toolkit behind YouTube transcoding, VLC, and countless video pipelines.",
    about:
      "FFmpeg's libavcodec/libavformat power video on the web — every streaming service transcodes with it or derivatives. Bellard also created QEMU and co-authored AV1-related research.",
    narrative: {
      whyChosen: "FFmpeg is the invisible engine behind web video encoding.",
      whyImportant: "It standardized open multimedia processing across platforms.",
      problemSolved: "Proprietary codecs and tools made video processing expensive and fragmented.",
    },
    category: "software",
    tags: ["people", "multimedia", "open-source"],
    people: [{ id: "fabrice-bellard", name: "Fabrice Bellard", role: "creator" }],
    importance: 6,
    sources: [
      {
        title: "FFmpeg — Project history (2000)",
        url: "https://ffmpeg.org/about.html",
        role: "date",
      },
      {
        title: "Wikipedia — FFmpeg (overview)",
        url: "https://en.wikipedia.org/wiki/FFmpeg",
        role: "overview",
      },
    ],
    relatedIds: [],
  }),
  m({
    id: "miguel-de-icaza-mono-announced",
    date: "2001-06",
    datePrecision: "month",
    title: "Miguel de Icaza announces Mono",
    summary:
      "Miguel de Icaza announced Mono in June 2001 — an open-source .NET implementation that brought C# beyond Windows.",
    about:
      "Mono enabled Xamarin mobile development and Unity's C# scripting on macOS and Linux. de Icaza also co-founded GNOME and Ximian — shaping open desktop and cross-platform .NET.",
    narrative: {
      whyChosen: "Mono made Microsoft's managed runtime portable before .NET Core existed.",
      whyImportant: "It kept C# viable for cross-platform mobile and game development.",
      problemSolved: ".NET was Windows-only, blocking open-source and mobile adoption.",
    },
    category: "software",
    tags: ["people", "dotnet", "open-source", "mono"],
    people: [{ id: "miguel-de-icaza", name: "Miguel de Icaza", role: "creator" }],
    importance: 6,
    sources: [
      {
        title: "Mono project — Announcement (June 2001)",
        url: "https://en.wikipedia.org/wiki/Mono_(software)",
        role: "date",
      },
      {
        title: "Wikipedia — Mono (overview)",
        url: "https://en.wikipedia.org/wiki/Mono_(software)",
        role: "overview",
      },
    ],
    relatedIds: ["csharp-announced", "dotnet-framework-1-0-rtm"],
  }),
  m({
    id: "bram-moolenaar-vim-released",
    date: "1991",
    datePrecision: "year",
    title: "Bram Moolenaar releases Vim",
    summary:
      "Bram Moolenaar released Vim in 1991 — the modal editor that became the default for terminal-centric developers.",
    about:
      "Vim's modal editing, macros, and plugin ecosystem shaped how sysadmins and programmers edit remote servers. It remains among the most installed developer tools worldwide.",
    narrative: {
      whyChosen: "Vim defined modal text editing for a generation of terminal users.",
      whyImportant: "It kept powerful keyboard-driven editing viable on constrained systems.",
      problemSolved: "vi was inconsistent across Unix variants and lacked extensibility.",
    },
    category: "software",
    tags: ["people", "editor", "open-source"],
    people: [{ id: "bram-moolenaar", name: "Bram Moolenaar", role: "creator" }],
    importance: 6,
    sources: [
      {
        title: "Vim — History (1991)",
        url: "https://www.vim.org/",
        role: "date",
      },
      {
        title: "Wikipedia — Vim (overview)",
        url: "https://en.wikipedia.org/wiki/Vim_(text_editor)",
        role: "overview",
      },
    ],
    relatedIds: [],
  }),
  m({
    id: "daniel-stenberg-curl-released",
    date: "1998-03",
    datePrecision: "month",
    title: "Daniel Stenberg releases curl",
    summary:
      "Daniel Stenberg released curl in March 1998 — the command-line HTTP client embedded in phones, cars, and CI pipelines.",
    about:
      "libcurl ships in billions of devices — every API test script and embedded firmware update likely uses it. Stenberg's single-maintainer stewardship model is a case study in critical infrastructure.",
    narrative: {
      whyChosen: "curl/libcurl became the universal HTTP transfer library.",
      whyImportant: "It standardized how programs speak HTTP across platforms.",
      problemSolved: "Each platform had incompatible HTTP client APIs.",
    },
    category: "software",
    tags: ["people", "http", "open-source", "tooling"],
    people: [{ id: "daniel-stenberg", name: "Daniel Stenberg", role: "creator" }],
    importance: 6,
    sources: [
      {
        title: "curl — Project history (March 1998)",
        url: "https://curl.se/docs/history.html",
        role: "date",
      },
      {
        title: "Wikipedia — cURL (overview)",
        url: "https://en.wikipedia.org/wiki/CURL",
        role: "overview",
      },
    ],
    relatedIds: [],
  }),
  m({
    id: "theo-de-raadt-openbsd-forked",
    date: "1995-10",
    datePrecision: "month",
    title: "Theo de Raadt forks OpenBSD",
    summary:
      "Theo de Raadt forked OpenBSD from NetBSD in October 1995 — pioneering proactive security auditing and code correctness.",
    about:
      "OpenBSD's 'only two remote holes in the default install' slogan and innovations like OpenSSH, LibreSSL, and W^X memory protection influenced secure systems design across the industry.",
    narrative: {
      whyChosen: "OpenBSD set the standard for security-first Unix development.",
      whyImportant: "OpenSSH alone secured remote administration for the entire internet.",
      problemSolved: "General-purpose BSDs did not prioritize continuous security review.",
    },
    category: "software",
    tags: ["people", "security", "open-source", "operating-system"],
    people: [{ id: "theo-de-raadt", name: "Theo de Raadt", role: "founder" }],
    importance: 6,
    sources: [
      {
        title: "OpenBSD — Project history (October 1995)",
        url: "https://www.openbsd.org/history.html",
        role: "date",
      },
      {
        title: "Wikipedia — OpenBSD (overview)",
        url: "https://en.wikipedia.org/wiki/OpenBSD",
        role: "overview",
      },
    ],
    relatedIds: [],
  }),
  m({
    id: "rob-pike-utf8-paper",
    date: "1992-09",
    datePrecision: "month",
    title: "Rob Pike and Ken Thompson publish UTF-8 design",
    summary:
      "Rob Pike and Ken Thompson published the UTF-8 encoding plan in September 1992 — the text encoding underlying the modern web and JSON.",
    about:
      "UTF-8 let ASCII-compatible systems handle Unicode without breaking existing software. Every API, database, and browser today assumes UTF-8 as the default string encoding.",
    narrative: {
      whyChosen: "UTF-8 is the universal text encoding of the internet.",
      whyImportant: "It enabled global software without abandoning ASCII infrastructure.",
      problemSolved: "Fixed-width Unicode encodings wasted space and broke Unix text tools.",
    },
    category: "protocol",
    tags: ["people", "unicode", "encoding", "text"],
    people: [
      { id: "rob-pike", name: "Rob Pike", role: "co-creator" },
      { id: "ken-thompson", name: "Ken Thompson", role: "co-creator" },
    ],
    importance: 6,
    sources: [
      {
        title: "Plan 9 — UTF-8 proposal (September 1992)",
        url: "https://en.wikipedia.org/wiki/UTF-8",
        role: "date",
      },
      {
        title: "Wikipedia — UTF-8 (overview)",
        url: "https://en.wikipedia.org/wiki/UTF-8",
        role: "overview",
      },
    ],
    relatedIds: ["go-open-sourced"],
  }),
  m({
    id: "douglas-crockford-json-spec",
    date: "2006",
    datePrecision: "year",
    title: "Douglas Crockford popularizes JSON",
    summary:
      "Douglas Crockford specified JSON in 2006 — the data interchange format behind REST APIs and config files.",
    about:
      "JSON replaced XML for most web APIs — simpler for JavaScript clients and human-readable in logs. Crockford's RFC 4627 and json.org made a subset of JavaScript literals the lingua franca of web services.",
    narrative: {
      whyChosen: "JSON became the default API payload format for web and mobile.",
      whyImportant: "It aligned data exchange with JavaScript object literals.",
      problemSolved: "XML was verbose and expensive to parse in browsers and mobile clients.",
    },
    category: "protocol",
    tags: ["people", "json", "web", "api"],
    people: [{ id: "douglas-crockford", name: "Douglas Crockford", role: "author" }],
    importance: 6,
    sources: [
      {
        title: "JSON.org — Douglas Crockford specification (2006)",
        url: "https://www.json.org/",
        role: "date",
      },
      {
        title: "Wikipedia — JSON (overview)",
        url: "https://en.wikipedia.org/wiki/JSON",
        role: "overview",
      },
    ],
    relatedIds: [],
  }),
  m({
    id: "andy-tanenbaum-minix-created",
    date: "1987",
    datePrecision: "year",
    title: "Andrew Tanenbaum creates MINIX",
    summary:
      "Andrew Tanenbaum created MINIX in 1987 — a teaching microkernel OS that inspired Linus Torvalds to build Linux.",
    about:
      "Tanenbaum's textbooks and MINIX shaped OS education worldwide. The famous Tanenbaum–Torvalds microkernel debate defined architectural trade-offs developers still argue about.",
    narrative: {
      whyChosen: "MINIX was the direct inspiration for Linux's initial design.",
      whyImportant: "It made operating system source code accessible to students.",
      problemSolved: "Unix source was proprietary and unavailable for classroom study.",
    },
    category: "software",
    tags: ["people", "operating-system", "education"],
    people: [{ id: "andrew-tanenbaum", name: "Andrew Tanenbaum", role: "creator" }],
    importance: 6,
    sources: [
      {
        title: "MINIX — First release (1987)",
        url: "https://en.wikipedia.org/wiki/MINIX",
        role: "date",
      },
      {
        title: "Wikipedia — MINIX (overview)",
        url: "https://en.wikipedia.org/wiki/MINIX",
        role: "overview",
      },
    ],
    relatedIds: ["linux-kernel-announced"],
  }),
  m({
    id: "brian-kernighan-awk-coauthored",
    date: "1977",
    datePrecision: "year",
    title: "Brian Kernighan co-creates AWK",
    summary:
      "Brian Kernighan co-designed AWK in 1977 with Aho and Weinberger — the pattern-action language for text processing.",
    about:
      "AWK's columnar field model and regex patterns influenced Perl, Ruby, and every log-parsing one-liner. Kernighan's 'The C Programming Language' and 'Software Tools' shaped how programmers learn Unix.",
    narrative: {
      whyChosen: "AWK made structured text processing a first-class scripting task.",
      whyImportant: "It influenced a generation of scripting languages and CLI culture.",
      problemSolved: "Ad-hoc shell pipelines could not easily handle columnar report data.",
    },
    category: "software",
    tags: ["people", "unix", "programming-language", "tooling"],
    people: [{ id: "brian-kernighan", name: "Brian Kernighan", role: "co-creator" }],
    importance: 6,
    sources: [
      {
        title: "Bell Labs — AWK (1977)",
        url: "https://en.wikipedia.org/wiki/AWK",
        role: "date",
      },
      {
        title: "Wikipedia — AWK (overview)",
        url: "https://en.wikipedia.org/wiki/AWK",
        role: "overview",
      },
    ],
    relatedIds: [],
  }),
  m({
    id: "alexander-stepanov-stl-published",
    date: "1994",
    datePrecision: "year",
    title: "Alexander Stepanov publishes the STL",
    summary:
      "Alexander Stepanov and Meng Lee published the Standard Template Library in 1994 — generic algorithms that became core C++.",
    about:
      "The STL introduced iterators, containers, and algorithms as reusable abstractions — influencing Java collections, C# LINQ, and Rust iterators. Stepanov's generic programming philosophy shaped modern systems languages.",
    narrative: {
      whyChosen: "The STL defined generic programming for industrial C++.",
      whyImportant: "It separated algorithms from data structures via iterators.",
      problemSolved: "C++ lacked reusable container and algorithm libraries without copy-paste.",
    },
    category: "software",
    tags: ["people", "cpp", "generic-programming", "library"],
    people: [{ id: "alexander-stepanov", name: "Alexander Stepanov", role: "creator" }],
    importance: 6,
    sources: [
      {
        title: "HP Labs — STL first release (1994)",
        url: "https://en.wikipedia.org/wiki/Standard_Template_Library",
        role: "date",
      },
      {
        title: "Wikipedia — Standard Template Library (overview)",
        url: "https://en.wikipedia.org/wiki/Standard_Template_Library",
        role: "overview",
      },
    ],
    relatedIds: ["bjarne-stroustrup-cpp-released"],
  }),

  // —— P8: AI pioneers ——
  m({
    id: "hinton-alexnet-imagenet-breakthrough",
    date: "2012-09",
    datePrecision: "month",
    title: "AlexNet wins ImageNet",
    summary:
      "Geoffrey Hinton's students Krizhevsky, Sutskever, and Hinton won ImageNet 2012 with AlexNet — triggering the deep learning revolution.",
    about:
      "AlexNet's GPU-trained convolutional network crushed traditional computer vision pipelines — convincing Google, Facebook, and industry to bet on neural networks. Hinton had pursued backprop for decades before this breakthrough.",
    narrative: {
      whyChosen: "AlexNet was the inflection point for modern deep learning adoption.",
      whyImportant: "It proved neural networks could beat hand-engineered vision features at scale.",
      problemSolved: "Computer vision relied on brittle handcrafted features that did not generalize.",
    },
    category: "ai",
    tags: ["people", "deep-learning", "computer-vision", "imagenet"],
    people: [{ id: "geoffrey-hinton", name: "Geoffrey Hinton", role: "researcher" }],
    importance: 3,
    sources: [
      {
        title: "ImageNet 2012 — AlexNet results (September 2012)",
        url: "https://en.wikipedia.org/wiki/AlexNet",
        role: "date",
      },
      {
        title: "Wikipedia — AlexNet (overview)",
        url: "https://en.wikipedia.org/wiki/AlexNet",
        role: "overview",
      },
    ],
    relatedIds: ["fei-fei-li-imagenet-dataset-launched"],
  }),
  m({
    id: "demis-hassabis-deepmind-founded",
    date: "2010-09",
    datePrecision: "month",
    title: "Demis Hassabis co-founds DeepMind",
    summary:
      "Demis Hassabis co-founded DeepMind in September 2010 — the lab behind AlphaGo, AlphaFold, and large-scale reinforcement learning research.",
    about:
      "DeepMind's AlphaFold transformed protein structure prediction; AlphaGo demonstrated RL beating world champions. Hassabis bridged neuroscience and AI engineering at industrial scale.",
    narrative: {
      whyChosen: "DeepMind proved AI research labs could solve grand scientific challenges.",
      whyImportant: "It set the template for corporate frontier AI research with open publication.",
      problemSolved: "Pure research labs lacked compute and engineering to deploy breakthrough models.",
    },
    category: "company",
    tags: ["people", "ai", "deep-learning", "deepmind"],
    people: [{ id: "demis-hassabis", name: "Demis Hassabis", role: "co-founder" }],
    importance: 3,
    sources: [
      {
        title: "DeepMind — Company founded (September 2010)",
        url: "https://deepmind.google/",
        role: "date",
      },
      {
        title: "Wikipedia — DeepMind (overview)",
        url: "https://en.wikipedia.org/wiki/Google_DeepMind",
        role: "overview",
      },
    ],
    relatedIds: [],
  }),
  m({
    id: "fei-fei-li-imagenet-dataset-launched",
    date: "2009",
    datePrecision: "year",
    title: "Fei-Fei Li launches ImageNet dataset",
    summary:
      "Fei-Fei Li and collaborators launched ImageNet in 2009 — millions of labeled images that enabled supervised deep learning benchmarks.",
    about:
      "ImageNet's annual classification challenge became the scoreboard that AlexNet conquered. Li's dataset work turned data scale into a first-class ingredient alongside algorithms and compute.",
    narrative: {
      whyChosen: "ImageNet provided the labeled data deep learning needed to prove itself.",
      whyImportant: "It standardized computer vision benchmarks for a decade.",
      problemSolved: "Vision researchers lacked large, consistent labeled datasets for fair comparison.",
    },
    category: "ai",
    tags: ["people", "dataset", "computer-vision", "imagenet"],
    people: [{ id: "fei-fei-li", name: "Fei-Fei Li", role: "researcher" }],
    importance: 3,
    sources: [
      {
        title: "ImageNet — Dataset introduced (2009)",
        url: "https://image-net.org/",
        role: "date",
      },
      {
        title: "Wikipedia — ImageNet (overview)",
        url: "https://en.wikipedia.org/wiki/ImageNet",
        role: "overview",
      },
    ],
    relatedIds: ["hinton-alexnet-imagenet-breakthrough"],
  }),
  m({
    id: "deep-learning-turing-trio-2018",
    date: "2018",
    datePrecision: "year",
    title: "Hinton, Bengio, and LeCun share Turing Award",
    summary:
      "Yoshua Bengio, Geoffrey Hinton, and Yann LeCun won the 2018 ACM Turing Award for deep learning breakthroughs.",
    about:
      "The trio spent decades on backpropagation, CNNs, and representation learning before industry adoption. Their award recognized neural networks as foundational computer science, not a abandoned fad.",
    narrative: {
      whyChosen: "The 2018 Turing Award canonized deep learning's founding researchers.",
      whyImportant: "It validated decades of neural network research after multiple AI winters.",
      problemSolved: "Neural network research lacked mainstream recognition despite practical success.",
    },
    category: "ai",
    tags: ["people", "deep-learning", "turing-award"],
    people: [
      { id: "yoshua-bengio", name: "Yoshua Bengio", role: "researcher" },
      { id: "geoffrey-hinton", name: "Geoffrey Hinton", role: "researcher" },
      { id: "yann-lecun", name: "Yann LeCun", role: "researcher" },
    ],
    importance: 3,
    sources: [
      {
        title: "ACM — 2018 Turing Award (Bengio, Hinton, LeCun)",
        url: "https://amturing.acm.org/award_winners/bengio_hinton_lecun_4746316.cfm",
        role: "date",
      },
      {
        title: "Wikipedia — Turing Award (overview)",
        url: "https://en.wikipedia.org/wiki/Turing_Award",
        role: "overview",
      },
    ],
    relatedIds: ["hinton-alexnet-imagenet-breakthrough", "yann-lecun-lenet-published"],
  }),
  m({
    id: "ian-goodfellow-gan-invented",
    date: "2014-06",
    datePrecision: "month",
    title: "Ian Goodfellow invents GANs",
    summary:
      "Ian Goodfellow proposed Generative Adversarial Networks in June 2014 — two-network training that revolutionized synthetic media.",
    about:
      "GANs enabled photorealistic face generation, style transfer, and data augmentation — spawning StyleGAN, deepfakes discourse, and generative model research that preceded diffusion models.",
    narrative: {
      whyChosen: "GANs opened practical generative modeling for images and beyond.",
      whyImportant: "They introduced adversarial training as a core ML technique.",
      problemSolved: "Generative models struggled to produce sharp, realistic high-dimensional outputs.",
    },
    category: "ai",
    tags: ["people", "generative-ai", "deep-learning"],
    people: [{ id: "ian-goodfellow", name: "Ian Goodfellow", role: "researcher" }],
    importance: 6,
    sources: [
      {
        title: "arXiv — Generative Adversarial Networks (June 2014)",
        url: "https://arxiv.org/abs/1406.2661",
        role: "date",
      },
      {
        title: "Wikipedia — Generative adversarial network (overview)",
        url: "https://en.wikipedia.org/wiki/Generative_adversarial_network",
        role: "overview",
      },
    ],
    relatedIds: [],
  }),
  m({
    id: "marvin-minsky-dartmouth-workshop",
    date: "1956-08",
    datePrecision: "month",
    title: "Marvin Minsky co-organizes Dartmouth AI workshop",
    summary:
      "Marvin Minsky, John McCarthy, and others organized the Dartmouth Summer Research Project on Artificial Intelligence in August 1956 — coining the field's name.",
    about:
      "The six-week workshop proposed that learning and intelligence could be precisely described and simulated — launching AI as an academic discipline. Minsky later co-founded the MIT AI Lab.",
    narrative: {
      whyChosen: "Dartmouth 1956 named and launched artificial intelligence as a field.",
      whyImportant: "It framed intelligence as a engineering problem solvable by programs.",
      problemSolved: "There was no shared research agenda connecting logic, learning, and robotics.",
    },
    category: "ai",
    tags: ["people", "ai-history", "research"],
    people: [
      { id: "marvin-minsky", name: "Marvin Minsky", role: "co-founder" },
      { id: "john-mccarthy", name: "John McCarthy", role: "co-founder" },
    ],
    importance: 3,
    sources: [
      {
        title: "Dartmouth workshop proposal (August 1956)",
        url: "https://en.wikipedia.org/wiki/Dartmouth_workshop",
        role: "date",
      },
      {
        title: "Wikipedia — Dartmouth workshop (overview)",
        url: "https://en.wikipedia.org/wiki/Dartmouth_workshop",
        role: "overview",
      },
    ],
    relatedIds: ["john-mccarthy-lisp-invented"],
  }),
  m({
    id: "judea-pearl-turing-award",
    date: "2011",
    datePrecision: "year",
    title: "Judea Pearl receives Turing Award",
    summary:
      "Judea Pearl won the 2011 ACM Turing Award for probabilistic and causal reasoning in AI.",
    about:
      "Pearl's Bayesian networks and do-calculus gave AI a rigorous framework for uncertainty and causation — underpinning modern recommendation systems, diagnostics, and the current 'causal AI' movement.",
    narrative: {
      whyChosen: "Pearl formalized reasoning under uncertainty for practical AI systems.",
      whyImportant: "Bayesian networks became standard in probabilistic graphical models.",
      problemSolved: "Expert systems could not represent or update beliefs under noisy evidence.",
    },
    category: "ai",
    tags: ["people", "ai", "turing-award", "causality"],
    people: [{ id: "judea-pearl", name: "Judea Pearl", role: "researcher" }],
    importance: 6,
    sources: [
      {
        title: "ACM — 2011 Turing Award (Judea Pearl)",
        url: "https://amturing.acm.org/award_winners/pearl_7387489.cfm",
        role: "date",
      },
      {
        title: "Wikipedia — Judea Pearl (overview)",
        url: "https://en.wikipedia.org/wiki/Judea_Pearl",
        role: "overview",
      },
    ],
    relatedIds: [],
  }),
  m({
    id: "andrew-ng-stanford-ml-course",
    date: "2011",
    datePrecision: "year",
    title: "Andrew Ng launches Stanford ML course online",
    summary:
      "Andrew Ng's Stanford Machine Learning course (2011) and later Coursera brought neural networks and ML to millions of developers.",
    about:
      "Ng's MOOCs democratized ML education before ChatGPT — training practitioners who later built recommendation, vision, and NLP products. He also led Google Brain and Baidu AI Lab.",
    narrative: {
      whyChosen: "Ng's courses created the first mass audience of practicing ML engineers.",
      whyImportant: "MOOCs bridged academia and industry hiring pipelines for data science.",
      problemSolved: "ML knowledge was locked in PhD programs and elite research labs.",
    },
    category: "ai",
    tags: ["people", "education", "machine-learning"],
    people: [{ id: "andrew-ng", name: "Andrew Ng", role: "author" }],
    importance: 6,
    sources: [
      {
        title: "Coursera — Machine Learning course (2011)",
        url: "https://www.coursera.org/learn/machine-learning",
        role: "date",
      },
      {
        title: "Wikipedia — Andrew Ng (overview)",
        url: "https://en.wikipedia.org/wiki/Andrew_Ng",
        role: "overview",
      },
    ],
    relatedIds: [],
  }),
  m({
    id: "yann-lecun-lenet-published",
    date: "1989",
    datePrecision: "year",
    title: "LeNet convolutional networks",
    summary:
      "Yann LeCun applied convolutional neural networks to handwritten digit recognition in 1989 — the LeNet architecture that foreshadowed AlexNet.",
    about:
      "LeNet ran on bank check readers for years before GPUs made deep CNNs mainstream. LeCun's work at AT&T Bell Labs proved convnets worked in production — not just theory.",
    narrative: {
      whyChosen: "LeNet was the first widely deployed convolutional neural network.",
      whyImportant: "It established CNNs as the architecture for spatial pattern recognition.",
      problemSolved: "Handwritten character recognition needed shift-invariant feature learning.",
    },
    category: "ai",
    tags: ["people", "deep-learning", "computer-vision", "cnn"],
    people: [{ id: "yann-lecun", name: "Yann LeCun", role: "researcher" }],
    importance: 6,
    sources: [
      {
        title: "LeCun et al. — Backpropagation Applied to Handwritten Zip Code Recognition (1989)",
        url: "https://en.wikipedia.org/wiki/LeNet",
        role: "date",
      },
      {
        title: "Wikipedia — LeNet (overview)",
        url: "https://en.wikipedia.org/wiki/LeNet",
        role: "overview",
      },
    ],
    relatedIds: ["deep-learning-turing-trio-2018"],
  }),
  m({
    id: "frank-rosenblatt-perceptron",
    date: "1957",
    datePrecision: "year",
    title: "Frank Rosenblatt builds the Perceptron",
    summary:
      "Frank Rosenblatt built the Perceptron in 1957 — an early trainable neural network that launched the first wave of connectionist AI.",
    about:
      "The Perceptron could learn linearly separable patterns from examples — inspiring decades of neural network research and the famous Minsky–Papert critique that sparked AI winters and revivals.",
    narrative: {
      whyChosen: "The Perceptron was the first hardware neural learning machine.",
      whyImportant: "It introduced trainable weights as an approach to pattern recognition.",
      problemSolved: "Pattern recognition required hand-coded rules instead of learning from data.",
    },
    category: "ai",
    tags: ["people", "neural-networks", "ai-history"],
    people: [{ id: "frank-rosenblatt", name: "Frank Rosenblatt", role: "researcher" }],
    importance: 6,
    sources: [
      {
        title: "Cornell — Perceptron (1957)",
        url: "https://en.wikipedia.org/wiki/Perceptron",
        role: "date",
      },
      {
        title: "Wikipedia — Perceptron (overview)",
        url: "https://en.wikipedia.org/wiki/Perceptron",
        role: "overview",
      },
    ],
    relatedIds: ["marvin-minsky-dartmouth-workshop"],
  }),

  // —— P9: Browser & web pioneers ——
  m({
    id: "marc-andreessen-netscape-founded",
    date: "1994-04-04",
    datePrecision: "day",
    title: "Marc Andreessen and Jim Clark found Netscape",
    summary:
      "Marc Andreessen and Jim Clark founded Mosaic Communications Corporation on April 4, 1994 — later renamed Netscape Communications.",
    about:
      "Netscape Navigator became the dominant browser of the mid-1990s and drove the first dot-com wave. Andreessen brought Mosaic experience from NCSA; Clark brought Silicon Graphics credibility and venture backing.",
    narrative: {
      whyChosen: "Netscape turned the web from research curiosity into a commercial platform.",
      whyImportant: "It proved browsers could be venture-backed products and set the first browser wars.",
      problemSolved: "The web needed a polished, fast browser company to scale beyond academia.",
    },
    category: "company",
    tags: ["people", "browser", "web", "netscape"],
    people: [
      { id: "marc-andreessen", name: "Marc Andreessen", role: "co-founder" },
      { id: "jim-clark", name: "Jim Clark", role: "co-founder" },
    ],
    importance: 6,
    sources: [
      {
        title: "Computer History Museum — Andreessen founds Netscape (April 4, 1994)",
        url: "https://www.computerhistory.org/tdih/april/4/",
        role: "date",
      },
      {
        title: "Wikipedia — Netscape (overview)",
        url: "https://en.wikipedia.org/wiki/Netscape",
        role: "overview",
      },
    ],
    relatedIds: ["mosaic-1-0-released", "netscape-navigator-1-0"],
  }),
  m({
    id: "haakon-lie-css-proposed",
    date: "1994-10-10",
    datePrecision: "day",
    title: "Håkon Wium Lie proposes CSS",
    summary:
      "Håkon Wium Lie published Cascading HTML Style Sheets — a proposal on October 10, 1994 while at CERN.",
    about:
      "CSS separated presentation from HTML structure — letting authors suggest fonts and layout while users could override styles. Every modern website still depends on the cascading model Lie proposed at CERN.",
    narrative: {
      whyChosen: "CSS is the presentation layer of the open web.",
      whyImportant: "It ended the era of presentational HTML tags and font tags in markup.",
      problemSolved: "Authors could not style pages consistently without polluting HTML with layout tags.",
    },
    category: "protocol",
    tags: ["people", "css", "web", "w3c"],
    people: [{ id: "haakon-wium-lie", name: "Håkon Wium Lie", role: "author" }],
    importance: 6,
    sources: [
      {
        title: "W3C www-talk — Cascading HTML style sheets proposal (October 10, 1994)",
        url: "https://www.w3.org/Style/History/www.eit.com/www.lists/www-talk.1994q4/0153.html",
        role: "date",
      },
      {
        title: "Wikipedia — Cascading Style Sheets (overview)",
        url: "https://en.wikipedia.org/wiki/CSS",
        role: "overview",
      },
    ],
    relatedIds: ["worldwideweb-browser", "html-invented"],
  }),
  m({
    id: "steve-wozniak-apple-founded",
    date: "1976-04-01",
    datePrecision: "day",
    title: "Steve Jobs and Steve Wozniak found Apple",
    summary:
      "Steve Jobs and Steve Wozniak formed Apple Computer Company on April 1, 1976 to sell the Apple I kit.",
    about:
      "Apple brought personal computers to consumers with the Apple II and Macintosh — shaping GUI software, developer tools, and the idea that computers belong on every desk.",
    narrative: {
      whyChosen: "Apple became one of the defining personal computing companies.",
      whyImportant: "It proved hobbyist kits could become mass-market consumer products.",
      problemSolved: "Early microcomputers were sold as kits without a polished consumer brand.",
    },
    category: "company",
    tags: ["people", "apple", "founding", "hardware"],
    people: [
      { id: "steve-jobs", name: "Steve Jobs", role: "co-founder" },
      { id: "steve-wozniak", name: "Steve Wozniak", role: "co-founder" },
    ],
    importance: 3,
    sources: [
      {
        title: "Apple — Company history (founded April 1, 1976)",
        url: "https://www.apple.com/",
        role: "date",
      },
      {
        title: "Wikipedia — Apple Inc. (overview)",
        url: "https://en.wikipedia.org/wiki/Apple_Inc.",
        role: "overview",
      },
    ],
    relatedIds: ["apple-ii-introduced", "susan-kare-macintosh-icons"],
  }),
  m({
    id: "cerf-kahn-tcp-ip-paper-published",
    date: "1974-05",
    datePrecision: "month",
    title: "Vint Cerf and Bob Kahn publish TCP/IP design",
    summary:
      "Vint Cerf and Bob Kahn published A Protocol for Packet Network Intercommunication in May 1974 — defining the TCP design that became the internet's foundation.",
    about:
      "The paper described how heterogeneous packet networks could interconnect with reliable end-to-end communication — later split into TCP and IP. Every HTTP request still rides protocols descended from this work.",
    narrative: {
      whyChosen: "The Cerf–Kahn paper is the architectural birth certificate of the internet protocol suite.",
      whyImportant: "It enabled internetworking beyond any single vendor or network technology.",
      problemSolved: "Packet networks could not share resources or route across incompatible systems.",
    },
    category: "protocol",
    tags: ["people", "tcp-ip", "internet", "research"],
    people: [
      { id: "vint-cerf", name: "Vint Cerf", role: "researcher" },
      { id: "bob-kahn", name: "Bob Kahn", role: "researcher" },
    ],
    importance: 3,
    sources: [
      {
        title: "IEEE — A Protocol for Packet Network Intercommunication (May 1974)",
        url: "https://doi.org/10.1109/tcom.1974.1092259",
        role: "date",
      },
      {
        title: "Wikipedia — Vint Cerf (overview)",
        url: "https://en.wikipedia.org/wiki/Vint_Cerf",
        role: "overview",
      },
    ],
    relatedIds: ["tcp-ip-flag-day"],
  }),
  m({
    id: "jon-postel-iana-stewardship",
    date: "1972",
    datePrecision: "year",
    title: "Jon Postel begins IANA stewardship",
    summary:
      "Jon Postel took on Internet Assigned Numbers Authority (IANA) functions in the early 1970s — editing RFCs and assigning protocol numbers for decades.",
    about:
      "Postel's stewardship kept the internet's naming and numbering coherent as it grew from ARPANET research to a global network. He was the RFC Editor and IANA administrator until his death in 1998.",
    narrative: {
      whyChosen: "Postel's quiet governance made decentralized internet growth possible.",
      whyImportant: "IANA assignments let independent networks interoperate without a central authority.",
      problemSolved: "Growing packet networks needed consistent protocol numbers and document editing.",
    },
    category: "culture",
    tags: ["people", "internet", "iana", "rfc"],
    people: [{ id: "jon-postel", name: "Jon Postel", role: "maintainer" }],
    importance: 6,
    sources: [
      {
        title: "ISI/USC — Postel IANA history (1970s)",
        url: "https://en.wikipedia.org/wiki/Jon_Postel",
        role: "date",
      },
      {
        title: "Wikipedia — Jon Postel (overview)",
        url: "https://en.wikipedia.org/wiki/Jon_Postel",
        role: "overview",
      },
    ],
    relatedIds: ["tcp-ip-flag-day", "dns-standardized"],
  }),

  // —— P10: Security & cryptography ——
  m({
    id: "phil-zimmermann-pgp-released",
    date: "1991-06-05",
    datePrecision: "day",
    title: "Phil Zimmermann releases PGP",
    summary:
      "Phil Zimmermann released Pretty Good Privacy (PGP) 1.0 on June 5, 1991 — bringing public-key email encryption to activists and developers.",
    about:
      "PGP let anyone encrypt email and files without a central authority — using RSA and IDEA in the first release. Zimmermann's export investigation made encryption policy a mainstream developer issue and paved the way for OpenPGP standards.",
    narrative: {
      whyChosen: "PGP democratized strong cryptography for ordinary computer users.",
      whyImportant: "It proved end-to-end encryption could spread via grassroots distribution, not only government or corporate channels.",
      problemSolved: "Email traveled in plaintext and proprietary crypto tools were unavailable to the public.",
    },
    category: "software",
    tags: ["people", "cryptography", "privacy", "pgp"],
    people: [{ id: "phil-zimmermann", name: "Phil Zimmermann", role: "creator" }],
    importance: 6,
    sources: [
      {
        title: "Phil Zimmermann — PGP 10th anniversary (released June 5, 1991)",
        url: "https://philzimmermann.com/EN/essays/PGP_10thAnniversary.html",
        role: "date",
      },
      {
        title: "Wikipedia — Pretty Good Privacy (overview)",
        url: "https://en.wikipedia.org/wiki/Pretty_Good_Privacy",
        role: "overview",
      },
    ],
    relatedIds: [],
  }),
  m({
    id: "diffie-hellman-paper-published",
    date: "1976-11",
    datePrecision: "month",
    title: "Diffie–Hellman cryptography paper",
    summary:
      "Whitfield Diffie and Martin Hellman published New Directions in Cryptography in November 1976 — introducing public-key exchange and the foundations of modern cryptography.",
    about:
      "The Diffie–Hellman key exchange let two parties agree on a shared secret over an insecure channel — enabling TLS, SSH, and VPN handshakes today. The paper also articulated the vision of public-key cryptography that RSA would fulfill a year later.",
    narrative: {
      whyChosen: "Diffie–Hellman introduced the public-key paradigm to academic cryptography.",
      whyImportant: "Key exchange without pre-shared secrets became the basis of secure internet protocols.",
      problemSolved: "Symmetric-only crypto required costly secure channels to distribute keys at scale.",
    },
    category: "invention",
    tags: ["people", "cryptography", "research", "public-key"],
    people: [
      { id: "whitfield-diffie", name: "Whitfield Diffie", role: "researcher" },
      { id: "martin-hellman", name: "Martin Hellman", role: "researcher" },
    ],
    importance: 3,
    sources: [
      {
        title: "IEEE — New Directions in Cryptography (November 1976)",
        url: "https://en.wikipedia.org/wiki/New_Directions_in_Cryptography",
        role: "date",
      },
      {
        title: "Wikipedia — Diffie–Hellman key exchange (overview)",
        url: "https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange",
        role: "overview",
      },
    ],
    relatedIds: [],
  }),
  m({
    id: "rsa-algorithm-published",
    date: "1977",
    datePrecision: "year",
    title: "Rivest, Shamir, and Adleman invent RSA",
    summary:
      "Ron Rivest, Adi Shamir, and Leonard Adleman invented the RSA public-key algorithm at MIT in 1977 — enabling encryption and digital signatures at scale.",
    about:
      "RSA turned public-key theory into a practical algorithm used in TLS certificates, SSH host keys, and code signing for decades. Their 1978 Communications of the ACM paper spread RSA beyond academia into commercial security products.",
    narrative: {
      whyChosen: "RSA became the most widely deployed public-key algorithm of the pre-quantum era.",
      whyImportant: "It made digital signatures and encrypted key transport practical for software systems.",
      problemSolved: "Public-key cryptography needed a concrete algorithm implementable on 1970s hardware.",
    },
    category: "invention",
    tags: ["people", "cryptography", "research", "rsa"],
    people: [
      { id: "ron-rivest", name: "Ron Rivest", role: "researcher" },
      { id: "adi-shamir", name: "Adi Shamir", role: "researcher" },
      { id: "leonard-adleman", name: "Leonard Adleman", role: "researcher" },
    ],
    importance: 3,
    sources: [
      {
        title: "MIT — RSA algorithm invented (1977)",
        url: "https://en.wikipedia.org/wiki/RSA_(cryptosystem)",
        role: "date",
      },
      {
        title: "Wikipedia — RSA cryptosystem (overview)",
        url: "https://en.wikipedia.org/wiki/RSA_(cryptosystem)",
        role: "overview",
      },
    ],
    relatedIds: ["diffie-hellman-paper-published", "clifford-cocks-public-key"],
  }),
  m({
    id: "bruce-schneier-applied-cryptography",
    date: "1994",
    datePrecision: "year",
    title: "Bruce Schneier publishes Applied Cryptography",
    summary:
      "Bruce Schneier published Applied Cryptography in 1994 — the practical handbook that taught a generation of developers how crypto works.",
    about:
      "Schneier's book explained block ciphers, hashes, protocols, and implementation pitfalls in plain language — before crypto was baked into every web framework. It shaped how engineers reason about TLS, passwords, and threat models.",
    narrative: {
      whyChosen: "Applied Cryptography became the standard developer introduction to real-world crypto.",
      whyImportant: "It bridged academic cryptography and software engineering practice.",
      problemSolved: "Programmers lacked accessible guidance on using crypto libraries safely.",
    },
    category: "culture",
    tags: ["people", "cryptography", "author", "security"],
    people: [{ id: "bruce-schneier", name: "Bruce Schneier", role: "author" }],
    importance: 6,
    sources: [
      {
        title: "Schneier on Security — Applied Cryptography (1994)",
        url: "https://www.schneier.com/books/applied-cryptography/",
        role: "date",
      },
      {
        title: "Wikipedia — Applied Cryptography (overview)",
        url: "https://en.wikipedia.org/wiki/Applied_Cryptography",
        role: "overview",
      },
    ],
    relatedIds: [],
  }),
  m({
    id: "goldwasser-micali-zero-knowledge-published",
    date: "1985",
    datePrecision: "year",
    title: "Zero-knowledge proofs published",
    summary:
      "Shafi Goldwasser and Silvio Micali published zero-knowledge interactive proof systems in 1985 — foundational work for modern cryptographic protocols.",
    about:
      "Zero-knowledge proofs let one party prove a statement is true without revealing why — underpinning zk-SNARKs, blockchain privacy, and authentication protocols. Goldwasser and Micali won the Turing Award partly for this line of research.",
    narrative: {
      whyChosen: "Zero-knowledge proofs became a core primitive in modern cryptography and blockchains.",
      whyImportant: "They formalized how to prove knowledge without leaking secrets.",
      problemSolved: "Authentication and verification protocols lacked rigorous privacy guarantees.",
    },
    category: "invention",
    tags: ["people", "cryptography", "research", "zero-knowledge"],
    people: [
      { id: "shafi-goldwasser", name: "Shafi Goldwasser", role: "researcher" },
      { id: "silvio-micali", name: "Silvio Micali", role: "researcher" },
    ],
    importance: 6,
    sources: [
      {
        title: "STOC 1985 — The Knowledge Complexity of Interactive Proof Systems",
        url: "https://en.wikipedia.org/wiki/Zero-knowledge_proof",
        role: "date",
      },
      {
        title: "Wikipedia — Zero-knowledge proof (overview)",
        url: "https://en.wikipedia.org/wiki/Zero-knowledge_proof",
        role: "overview",
      },
    ],
    relatedIds: ["shafi-goldwasser-turing-award"],
  }),
  m({
    id: "clifford-cocks-public-key",
    date: "1973",
    datePrecision: "year",
    title: "Cocks invents RSA at GCHQ",
    summary:
      "Clifford Cocks invented a public-key encryption scheme equivalent to RSA at GCHQ in 1973 — years before the public RSA announcement.",
    about:
      "Cocks' classified work remained secret until 1997 — revealing that British intelligence had discovered public-key cryptography independently. His story illustrates how security research often happened in parallel inside government labs.",
    narrative: {
      whyChosen: "Cocks' work proved public-key encryption was discoverable before the academic breakthrough.",
      whyImportant: "It showed the ideas behind RSA were not a single-lab accident but a natural next step.",
      problemSolved: "Secure government communications needed key distribution without exposing secrets.",
    },
    category: "invention",
    tags: ["people", "cryptography", "research", "gchq"],
    people: [{ id: "clifford-cocks", name: "Clifford Cocks", role: "researcher" }],
    importance: 9,
    sources: [
      {
        title: "GCHQ — Public-key cryptography declassified (1973 work)",
        url: "https://en.wikipedia.org/wiki/Clifford_Cocks",
        role: "date",
      },
      {
        title: "Wikipedia — Clifford Cocks (overview)",
        url: "https://en.wikipedia.org/wiki/Clifford_Cocks",
        role: "overview",
      },
    ],
    relatedIds: ["rsa-algorithm-published"],
  }),
  m({
    id: "moxie-marlinspike-textsecure-released",
    date: "2010-05",
    datePrecision: "month",
    title: "Moxie Marlinspike releases TextSecure",
    summary:
      "Moxie Marlinspike co-founded Whisper Systems and released TextSecure in May 2010 — bringing end-to-end encrypted SMS to Android.",
    about:
      "TextSecure evolved into the Signal Protocol and Signal messenger — setting the standard for forward secrecy and encrypted messaging that WhatsApp and others later adopted. Marlinspike's open protocols influenced how developers think about E2E chat.",
    narrative: {
      whyChosen: "TextSecure started the modern era of consumer end-to-end encrypted messaging.",
      whyImportant: "It proved usable E2E encryption could ship on mainstream mobile platforms.",
      problemSolved: "SMS and early chat apps transmitted messages in plaintext readable by carriers and attackers.",
    },
    category: "software",
    tags: ["people", "cryptography", "privacy", "messaging", "signal"],
    people: [{ id: "moxie-marlinspike", name: "Moxie Marlinspike", role: "creator" }],
    importance: 6,
    sources: [
      {
        title: "Whisper Systems — TextSecure for Android (May 2010)",
        url: "https://en.wikipedia.org/wiki/Signal_(software)",
        role: "date",
      },
      {
        title: "Wikipedia — Signal (software) (overview)",
        url: "https://en.wikipedia.org/wiki/Signal_(software)",
        role: "overview",
      },
    ],
    relatedIds: [],
  }),
  m({
    id: "openssh-first-released",
    date: "1999-12-01",
    datePrecision: "day",
    title: "OpenBSD team releases OpenSSH",
    summary:
      "The OpenBSD team led by Theo de Raadt shipped OpenSSH 1.2.2 on December 1, 1999 — a free replacement for proprietary SSH.",
    about:
      "OpenSSH secured remote server administration for the entire internet — `ssh` on every Linux and macOS machine traces to this fork. It replaced a commercial SSH license with audited BSD-licensed code bundled with OpenBSD 2.6.",
    narrative: {
      whyChosen: "OpenSSH became the universal secure shell implementation.",
      whyImportant: "It kept encrypted remote access free and auditable after SSH went proprietary.",
      problemSolved: "Proprietary SSH licensing threatened to tax every Unix administrator and vendor.",
    },
    category: "software",
    tags: ["people", "security", "open-source", "ssh"],
    people: [{ id: "theo-de-raadt", name: "Theo de Raadt", role: "founder" }],
    importance: 6,
    sources: [
      {
        title: "OpenSSH — Project history (December 1, 1999)",
        url: "https://www.openssh.org/history.html",
        role: "date",
      },
      {
        title: "Wikipedia — OpenSSH (overview)",
        url: "https://en.wikipedia.org/wiki/OpenSSH",
        role: "overview",
      },
    ],
    relatedIds: ["theo-de-raadt-openbsd-forked"],
  }),

  // —— P11: CEOs & company transitions ——
  m({
    id: "jensen-huang-nvidia-founded",
    date: "1993-04-05",
    datePrecision: "day",
    title: "Jensen Huang co-founds NVIDIA",
    summary:
      "Jensen Huang, Chris Malachowsky, and Curtis Priem founded NVIDIA on April 5, 1993 — starting as a graphics chip company that later powered AI.",
    about:
      "NVIDIA's GPUs went from PC gaming to CUDA parallel computing to training virtually every large language model. Huang has been CEO since founding — one of the longest and most consequential runs in semiconductor history.",
    narrative: {
      whyChosen: "NVIDIA became the dominant AI compute platform of the 2020s.",
      whyImportant: "GPUs shifted from graphics cards to the engine of deep learning and HPC.",
      problemSolved: "3D graphics needed dedicated parallel hardware beyond general-purpose CPUs.",
    },
    category: "company",
    tags: ["people", "nvidia", "gpu", "founding", "semiconductor"],
    people: [
      { id: "jensen-huang", name: "Jensen Huang", role: "co-founder" },
      { id: "chris-malachowsky", name: "Chris Malachowsky", role: "co-founder" },
      { id: "curtis-priem", name: "Curtis Priem", role: "co-founder" },
    ],
    importance: 3,
    sources: [
      {
        title: "NVIDIA — Company founded (April 5, 1993)",
        url: "https://www.nvidia.com/en-us/about-nvidia/corporate-timeline/",
        role: "date",
      },
      {
        title: "Wikipedia — Nvidia (overview)",
        url: "https://en.wikipedia.org/wiki/Nvidia",
        role: "overview",
      },
    ],
    relatedIds: [],
  }),
  m({
    id: "lisa-su-amd-ceo",
    date: "2014-10-08",
    datePrecision: "day",
    title: "Lisa Su named AMD CEO",
    summary:
      "AMD appointed Lisa Su president and CEO on October 8, 2014 — tasking her with turning around the struggling chipmaker.",
    about:
      "Su's Zen architecture and Epyc server CPUs restored AMD as a credible Intel competitor and made the company a key alternative in data centers and gaming. She later became one of the most visible semiconductor executives in the AI era.",
    narrative: {
      whyChosen: "Su's leadership revived AMD from near-irrelevance to a major Intel and NVIDIA rival.",
      whyImportant: "Competition in CPUs and GPUs matters for cloud pricing and AI hardware diversity.",
      problemSolved: "AMD had lost server and desktop share and needed a product-led turnaround.",
    },
    category: "company",
    tags: ["people", "amd", "ceo", "semiconductor"],
    people: [{ id: "lisa-su", name: "Lisa Su", role: "ceo" }],
    importance: 6,
    sources: [
      {
        title: "AMD — Lisa Su appointed CEO (October 8, 2014)",
        url: "https://www.amd.com/en/corporate/lisa-su",
        role: "date",
      },
      {
        title: "Wikipedia — Lisa Su (overview)",
        url: "https://en.wikipedia.org/wiki/Lisa_Su",
        role: "overview",
      },
    ],
    relatedIds: ["jensen-huang-nvidia-founded"],
  }),
  m({
    id: "andy-jassy-aws-ceo",
    date: "2016-04",
    datePrecision: "month",
    title: "Andy Jassy named AWS CEO",
    summary:
      "Amazon named Andy Jassy CEO of Amazon Web Services in April 2016 — formalizing his leadership of the cloud division he built since 2003.",
    about:
      "Jassy grew AWS from an internal infrastructure experiment into the template for modern cloud computing — EC2, S3, and managed services changed how startups and enterprises deploy software.",
    narrative: {
      whyChosen: "Jassy led the business that defined public cloud infrastructure.",
      whyImportant: "AWS made on-demand compute and storage the default deployment model for new software.",
      problemSolved: "Teams bought servers months in advance instead of scaling elastically with demand.",
    },
    category: "company",
    tags: ["people", "aws", "amazon", "ceo", "cloud"],
    people: [{ id: "andy-jassy", name: "Andy Jassy", role: "ceo" }],
    importance: 6,
    sources: [
      {
        title: "Amazon — Andy Jassy named AWS CEO (April 2016)",
        url: "https://www.aboutamazon.com/news/company-news/andy-jassy-to-become-ceo-of-amazon-web-services",
        role: "date",
      },
      {
        title: "Wikipedia — Andy Jassy (overview)",
        url: "https://en.wikipedia.org/wiki/Andy_Jassy",
        role: "overview",
      },
    ],
    relatedIds: ["werner-vogels-amazon-cto"],
  }),
  m({
    id: "pat-gelsinger-intel-ceo",
    date: "2021-02-15",
    datePrecision: "day",
    title: "Pat Gelsinger returns as Intel CEO",
    summary:
      "Intel named Pat Gelsinger CEO on February 15, 2021 — bringing back a longtime Intel engineer to lead a manufacturing turnaround.",
    about:
      "Gelsinger pledged to restore Intel's process leadership and expand foundry services — betting the company could compete with TSMC while supplying x86 CPUs to the data center. His tenure marked Intel's most public strategy reset in decades.",
    narrative: {
      whyChosen: "Gelsinger's return signaled Intel's attempt to recover lost semiconductor manufacturing ground.",
      whyImportant: "Intel's fab strategy affects global CPU supply and US chip sovereignty debates.",
      problemSolved: "Intel had fallen behind TSMC on leading-edge process nodes.",
    },
    category: "company",
    tags: ["people", "intel", "ceo", "semiconductor"],
    people: [{ id: "pat-gelsinger", name: "Pat Gelsinger", role: "ceo" }],
    importance: 6,
    sources: [
      {
        title: "Intel — Pat Gelsinger appointed CEO (February 15, 2021)",
        url: "https://www.intel.com/content/www/us/en/newsroom/news/intel-announces-leadership-transition.html",
        role: "date",
      },
      {
        title: "Wikipedia — Pat Gelsinger (overview)",
        url: "https://en.wikipedia.org/wiki/Pat_Gelsinger",
        role: "overview",
      },
    ],
    relatedIds: [],
  }),
  m({
    id: "larry-ellison-oracle-founded",
    date: "1977-06-16",
    datePrecision: "day",
    title: "Larry Ellison co-founds Oracle",
    summary:
      "Larry Ellison, Bob Miner, and Ed Oates founded Software Development Laboratories on June 16, 1977 — later Oracle Corporation.",
    about:
      "Oracle commercialized SQL relational databases before IBM's DB2 shipped — growing into enterprise software spanning databases, ERP, and cloud. Ellison's decades as CEO made Oracle a fixture of corporate IT stacks.",
    narrative: {
      whyChosen: "Oracle became the defining enterprise database vendor of the client-server era.",
      whyImportant: "It proved relational databases could be sold as commercial products at scale.",
      problemSolved: "Organizations needed packaged SQL database software independent of IBM mainframes.",
    },
    category: "company",
    tags: ["people", "oracle", "database", "founding"],
    people: [
      { id: "larry-ellison", name: "Larry Ellison", role: "co-founder" },
      { id: "bob-miner", name: "Bob Miner", role: "co-founder" },
      { id: "ed-oates", name: "Ed Oates", role: "co-founder" },
    ],
    importance: 6,
    sources: [
      {
        title: "Oracle — Company founded (June 16, 1977)",
        url: "https://www.oracle.com/corporate/",
        role: "date",
      },
      {
        title: "Wikipedia — Oracle Corporation (overview)",
        url: "https://en.wikipedia.org/wiki/Oracle_Corporation",
        role: "overview",
      },
    ],
    relatedIds: ["oracle-2-released"],
  }),

  // —— P12: CI/CD, cloud & DevOps creators ——
  m({
    id: "kohsuke-kawaguchi-jenkins-renamed",
    date: "2011-01-11",
    datePrecision: "day",
    title: "Kohsuke Kawaguchi renames Hudson to Jenkins",
    summary:
      "Kohsuke Kawaguchi led the Hudson community to rename the project Jenkins on January 11, 2011 — breaking from Oracle's trademark control after the Sun acquisition.",
    about:
      "The Hudson→Jenkins fork preserved the world's most widely used CI server as community-governed software. Jenkins became the default build automation tool in Java shops and later across polyglot pipelines.",
    narrative: {
      whyChosen: "The Jenkins rename was a landmark open-source governance fight with Oracle.",
      whyImportant: "It kept continuous integration tooling under community control when trademark disputes threatened the project.",
      problemSolved: "Oracle's Hudson trademark claims put the project's name and infrastructure at corporate risk.",
    },
    category: "culture",
    tags: ["people", "jenkins", "ci", "open-source", "maintainer"],
    people: [{ id: "kohsuke-kawaguchi", name: "Kohsuke Kawaguchi", role: "maintainer" }],
    importance: 6,
    sources: [
      {
        title: "Kohsuke Kawaguchi — Bye bye Hudson, Hello Jenkins (January 11, 2011)",
        url: "https://kohsuke.org/2011/01/11/bye-bye-hudson-hello-jenkins/",
        role: "date",
      },
      {
        title: "Jenkins — Hudson's future (overview)",
        url: "https://www.jenkins.io/blog/2011/01/11/hudsons-future/",
        role: "overview",
      },
    ],
    relatedIds: ["hudson-ci-released"],
  }),
  m({
    id: "werner-vogels-amazon-cto",
    date: "2005-09",
    datePrecision: "month",
    title: "Werner Vogels named Amazon CTO",
    summary:
      "Amazon appointed Werner Vogels chief technology officer in September 2005 — evangelizing the distributed systems behind AWS.",
    about:
      "Vogels coined 'everything fails all the time' and championed eventual consistency, service-oriented architecture, and cloud primitives. His blog and talks shaped how developers design for failure at scale.",
    narrative: {
      whyChosen: "Vogels became the public technical voice of Amazon's infrastructure revolution.",
      whyImportant: "He translated AWS's distributed systems lessons into mainstream engineering practice.",
      problemSolved: "Enterprises lacked accessible guidance on building reliable large-scale web services.",
    },
    category: "company",
    tags: ["people", "amazon", "aws", "cto", "distributed-systems"],
    people: [{ id: "werner-vogels", name: "Werner Vogels", role: "cto" }],
    importance: 6,
    sources: [
      {
        title: "Amazon — Werner Vogels appointed CTO (September 2005)",
        url: "https://www.allthingsdistributed.com/",
        role: "date",
      },
      {
        title: "Wikipedia — Werner Vogels (overview)",
        url: "https://en.wikipedia.org/wiki/Werner_Vogels",
        role: "overview",
      },
    ],
    relatedIds: ["andy-jassy-aws-ceo"],
  }),
  m({
    id: "tom-preston-werner-github-resigns",
    date: "2014-04-21",
    datePrecision: "day",
    title: "Tom Preston-Werner resigns from GitHub",
    summary:
      "GitHub co-founder Tom Preston-Werner resigned on April 21, 2014 after an internal investigation into workplace conduct.",
    about:
      "Preston-Werner co-created GitHub, Jekyll, and Semantic Versioning — but his departure forced GitHub to add formal management after years of a flat structure. The episode marked a turning point in Silicon Valley workplace culture discourse.",
    narrative: {
      whyChosen: "Preston-Werner's exit ended GitHub's founder-led flat organization era.",
      whyImportant: "It prompted GitHub to institutionalize management and HR processes at scale.",
      problemSolved: "A bossless culture lacked accountability mechanisms when internal conflicts escalated.",
    },
    category: "company",
    tags: ["people", "github", "founding"],
    people: [{ id: "tom-preston-werner", name: "Tom Preston-Werner", role: "co-founder" }],
    importance: 9,
    sources: [
      {
        title: "The Verge — Preston-Werner resigns (April 21, 2014)",
        url: "https://www.theverge.com/2014/4/21/5637282/co-founder-is-out-at-github-after-investigation-into-harassment-claims-horvath-tom-preston-warner",
        role: "date",
      },
      {
        title: "Wikipedia — Tom Preston-Werner (overview)",
        url: "https://en.wikipedia.org/wiki/Tom_Preston-Werner",
        role: "overview",
      },
    ],
    relatedIds: ["github-launched"],
  }),
  m({
    id: "chris-wanstrath-github-ceo-steps-down",
    date: "2017-08-17",
    datePrecision: "day",
    title: "Chris Wanstrath steps down as CEO",
    summary:
      "Chris Wanstrath announced on August 17, 2017 that he would step down as GitHub CEO — paving the way for Microsoft's acquisition and Nat Friedman's leadership.",
    about:
      "Wanstrath had returned as CEO after Preston-Werner's 2014 resignation and grew GitHub past 20 million developers. His planned departure preceded Microsoft's $7.5B acquisition and GitHub's next chapter under Microsoft.",
    narrative: {
      whyChosen: "Wanstrath's succession plan set up GitHub's Microsoft acquisition transition.",
      whyImportant: "It marked leadership change at the central hub of open-source collaboration.",
      problemSolved: "GitHub needed a succession path as it scaled beyond founder-led management.",
    },
    category: "company",
    tags: ["people", "github", "ceo"],
    people: [{ id: "chris-wanstrath", name: "Chris Wanstrath", role: "ceo" }],
    importance: 9,
    sources: [
      {
        title: "CNBC — Wanstrath stepping down as CEO (August 17, 2017)",
        url: "https://www.cnbc.com/2017/08/17/github-ceo-chris-wanstrath-is-stepping-down.html",
        role: "date",
      },
      {
        title: "Wikipedia — Chris Wanstrath (overview)",
        url: "https://en.wikipedia.org/wiki/Chris_Wanstrath",
        role: "overview",
      },
    ],
    relatedIds: ["github-launched", "tom-preston-werner-github-resigns"],
  }),

  // —— P13: Researchers & CS theory ——
  m({
    id: "tony-hoare-quicksort-published",
    date: "1961-07",
    datePrecision: "month",
    title: "Tony Hoare publishes Quicksort",
    summary:
      "Tony Hoare published the Quicksort algorithm in July 1961 — a divide-and-conquer sorting method still taught in every algorithms course.",
    about:
      "Quicksort became the default in-memory sort in standard libraries and a interview staple — average O(n log n) with elegant recursion. Hoare conceived it while working on machine translation sorting at Moscow State University.",
    narrative: {
      whyChosen: "Quicksort is among the most influential algorithms in computer science education and practice.",
      whyImportant: "It demonstrated divide-and-conquer sorting with in-place performance.",
      problemSolved: "Sorting large datasets on tape and memory required faster than O(n²) methods.",
    },
    category: "invention",
    tags: ["people", "algorithms", "research", "sorting"],
    people: [{ id: "tony-hoare", name: "Tony Hoare", role: "researcher" }],
    importance: 6,
    sources: [
      {
        title: "CACM — Algorithm 64: Quicksort (July 1961)",
        url: "https://doi.org/10.1145/366622.366644",
        role: "date",
      },
      {
        title: "Wikipedia — Quicksort (overview)",
        url: "https://en.wikipedia.org/wiki/Quicksort",
        role: "overview",
      },
    ],
    relatedIds: [],
  }),
  m({
    id: "tony-hoare-csp-published",
    date: "1978-08",
    datePrecision: "month",
    title: "Hoare publishes CSP",
    summary:
      "Tony Hoare published Communicating Sequential Processes in August 1978 — a model for concurrent programs communicating through channels.",
    about:
      "CSP influenced Go's goroutines, occam, and formal reasoning about concurrency. Hoare's earlier Hoare logic (1969) and CSP together shaped how programmers verify and structure parallel systems.",
    narrative: {
      whyChosen: "CSP gave a foundational model for message-passing concurrency.",
      whyImportant: "It influenced language design and verification for parallel and distributed systems.",
      problemSolved: "Shared-memory concurrency was error-prone without structured communication primitives.",
    },
    category: "invention",
    tags: ["people", "concurrency", "research", "formal-methods"],
    people: [{ id: "tony-hoare", name: "Tony Hoare", role: "researcher" }],
    importance: 6,
    sources: [
      {
        title: "CACM — Communicating Sequential Processes (August 1978)",
        url: "https://doi.org/10.1145/359576.359585",
        role: "date",
      },
      {
        title: "Wikipedia — Communicating sequential processes (overview)",
        url: "https://en.wikipedia.org/wiki/Communicating_sequential_processes",
        role: "overview",
      },
    ],
    relatedIds: ["tony-hoare-quicksort-published"],
  }),
  m({
    id: "donald-knuth-tex-development",
    date: "1978",
    datePrecision: "year",
    title: "Donald Knuth begins developing TeX",
    summary:
      "Donald Knuth began developing TeX in 1978 after dissatisfaction with typesetting for The Art of Computer Programming.",
    about:
      "TeX and METAFONT became the standard for mathematical and scientific publishing — still used by arXiv, academia, and Knuth's own books. TeX influenced modern typesetting pipelines and the idea of literate programming.",
    narrative: {
      whyChosen: "TeX is the dominant open typesetting system for technical documents.",
      whyImportant: "It proved programmers could build publication-quality typography from scratch.",
      problemSolved: "Commercial typesetting could not handle complex mathematics to Knuth's standards.",
    },
    category: "software",
    tags: ["people", "typography", "research", "author"],
    people: [{ id: "donald-knuth", name: "Donald Knuth", role: "creator" }],
    importance: 6,
    sources: [
      {
        title: "Knuth — TeX development began (1978)",
        url: "https://www.ctan.org/pkg/tex",
        role: "date",
      },
      {
        title: "Wikipedia — TeX (overview)",
        url: "https://en.wikipedia.org/wiki/TeX",
        role: "overview",
      },
    ],
    relatedIds: ["knuth-taocp-volume-1-published"],
  }),
  m({
    id: "john-backus-turing-award",
    date: "1977",
    datePrecision: "year",
    title: "John Backus receives Turing Award",
    summary:
      "John Backus won the 1977 ACM Turing Award for contributions to Fortran and functional programming — including the Backus–Naur Form.",
    about:
      "Backus led the IBM team that created Fortran and later argued for functional programming in his Turing lecture. BNF became the standard notation for describing programming language syntax.",
    narrative: {
      whyChosen: "Backus shaped both practical compilers and formal language specification.",
      whyImportant: "Fortran proved high-level languages could match hand-coded assembly performance.",
      problemSolved: "Scientists needed faster ways to program computers than machine code.",
    },
    category: "culture",
    tags: ["people", "fortran", "turing-award", "research"],
    people: [{ id: "john-backus", name: "John Backus", role: "researcher" }],
    importance: 6,
    sources: [
      {
        title: "ACM — 1977 Turing Award (John Backus)",
        url: "https://amturing.acm.org/award_winners/backus_9624209.cfm",
        role: "date",
      },
      {
        title: "Wikipedia — John Backus (overview)",
        url: "https://en.wikipedia.org/wiki/John_Backus",
        role: "overview",
      },
    ],
    relatedIds: ["fortran-formally-published"],
  }),
  m({
    id: "richard-hamming-error-correcting-codes",
    date: "1950",
    datePrecision: "year",
    title: "Richard Hamming publishes error-correcting codes",
    summary:
      "Richard Hamming published error-detecting and error-correcting codes in 1950 — including the Hamming code used in memory and storage.",
    about:
      "Hamming codes let systems detect and fix single-bit errors — foundational for reliable RAM, CDs, and telecommunications. The story goes Hamming invented them out of frustration when a computer dropped his weekend runs.",
    narrative: {
      whyChosen: "Hamming codes are the entry point to error correction in computing curricula.",
      whyImportant: "They made unreliable hardware usable for critical computation.",
      problemSolved: "Early computers could not trust stored bits without detection and recovery.",
    },
    category: "invention",
    tags: ["people", "error-correction", "research", "theory"],
    people: [{ id: "richard-hamming", name: "Richard Hamming", role: "researcher" }],
    importance: 6,
    sources: [
      {
        title: "Bell System Technical Journal — Error detecting and error correcting codes (1950)",
        url: "https://en.wikipedia.org/wiki/Hamming_code",
        role: "date",
      },
      {
        title: "Wikipedia — Hamming code (overview)",
        url: "https://en.wikipedia.org/wiki/Hamming_code",
        role: "overview",
      },
    ],
    relatedIds: [],
  }),
  m({
    id: "stephen-cook-np-completeness",
    date: "1971",
    datePrecision: "year",
    title: "Stephen Cook proves NP-completeness",
    summary:
      "Stephen Cook published his theorem on NP-completeness in 1971 — defining the hardness class behind thousands of optimization problems.",
    about:
      "Cook's work (and Karp's reductions) explained why many problems seem equally hard — shaping cryptography, scheduling, and complexity theory. P vs NP remains the field's defining open question.",
    narrative: {
      whyChosen: "NP-completeness is the central concept in computational complexity theory.",
      whyImportant: "It gave a framework for identifying intractable problems in software and research.",
      problemSolved: "There was no rigorous way to classify which problems were feasibly solvable.",
    },
    category: "invention",
    tags: ["people", "complexity-theory", "research", "np-complete"],
    people: [{ id: "stephen-cook", name: "Stephen Cook", role: "researcher" }],
    importance: 6,
    sources: [
      {
        title: "STOC 1971 — The complexity of theorem-proving procedures",
        url: "https://en.wikipedia.org/wiki/Cook%E2%80%93Levin_theorem",
        role: "date",
      },
      {
        title: "Wikipedia — NP-completeness (overview)",
        url: "https://en.wikipedia.org/wiki/NP-completeness",
        role: "overview",
      },
    ],
    relatedIds: [],
  }),
  m({
    id: "michael-stonebraker-postgres-research",
    date: "1986",
    datePrecision: "year",
    title: "Michael Stonebraker leads the Postgres project",
    summary:
      "Michael Stonebraker led the Postgres database project at UC Berkeley in 1986 — extending Ingres with object-relational ideas that became PostgreSQL.",
    about:
      "Stonebraker's Ingres (1970s) and Postgres pioneered relational databases in academia before commercial Oracle and DB2 dominated. PostgreSQL is now the default open-source RDBMS for startups and enterprises.",
    narrative: {
      whyChosen: "Stonebraker's Berkeley projects spawned PostgreSQL and modern open-source SQL.",
      whyImportant: "Postgres extended relational databases with extensibility and advanced types.",
      problemSolved: "Relational systems needed richer data models without abandoning SQL.",
    },
    category: "software",
    tags: ["people", "database", "postgres", "research"],
    people: [{ id: "michael-stonebraker", name: "Michael Stonebraker", role: "researcher" }],
    importance: 6,
    sources: [
      {
        title: "UC Berkeley — Postgres project (1986)",
        url: "https://en.wikipedia.org/wiki/PostgreSQL",
        role: "date",
      },
      {
        title: "Wikipedia — Michael Stonebraker (overview)",
        url: "https://en.wikipedia.org/wiki/Michael_Stonebraker",
        role: "overview",
      },
    ],
    relatedIds: ["postgresql-6-released", "oracle-2-released"],
  }),
  m({
    id: "jim-gray-turing-award",
    date: "1998",
    datePrecision: "year",
    title: "Jim Gray receives Turing Award",
    summary:
      "Jim Gray won the 1998 ACM Turing Award for contributions to database and transaction processing — foundational work on ACID reliability.",
    about:
      "Gray's transaction processing research underpins every bank transfer and e-commerce checkout. He also championed data-intensive science and disappeared at sea in 2007 during a sailing trip.",
    narrative: {
      whyChosen: "Gray defined how reliable databases handle concurrent transactions.",
      whyImportant: "ACID transactions became the guarantee behind financial and enterprise software.",
      problemSolved: "Concurrent database access risked inconsistent state without formal transaction models.",
    },
    category: "culture",
    tags: ["people", "database", "turing-award", "research"],
    people: [{ id: "jim-gray", name: "Jim Gray", role: "researcher" }],
    importance: 6,
    sources: [
      {
        title: "ACM — 1998 Turing Award (Jim Gray)",
        url: "https://amturing.acm.org/award_winners/gray_3649294.cfm",
        role: "date",
      },
      {
        title: "Wikipedia — Jim Gray (computer scientist) (overview)",
        url: "https://en.wikipedia.org/wiki/Jim_Gray_(computer_scientist)",
        role: "overview",
      },
    ],
    relatedIds: ["michael-stonebraker-postgres-research"],
  }),

  // —— P14: Hardware & semiconductor pioneers ——
  m({
    id: "gordon-moore-moores-law",
    date: "1965-04-19",
    datePrecision: "day",
    title: "Gordon Moore publishes Moore's Law",
    summary:
      "Gordon Moore published 'Cramming More Components onto Integrated Circuits' on April 19, 1965 — projecting exponential growth in transistor density.",
    about:
      "Moore's observation became the industry's planning roadmap for decades — driving R&D investment in smaller, cheaper chips. It later paired with Dennard scaling to explain why computers kept getting faster and cheaper.",
    narrative: {
      whyChosen: "Moore's Law named the exponential trend that defined the semiconductor era.",
      whyImportant: "It coordinated industry expectations for chip progress across fabs, tools, and design.",
      problemSolved: "There was no shared forecast for how fast integrated circuits could improve.",
    },
    category: "invention",
    tags: ["people", "semiconductor", "moores-law", "research"],
    people: [{ id: "gordon-moore", name: "Gordon Moore", role: "researcher" }],
    importance: 3,
    sources: [
      {
        title: "Electronics — Cramming more components onto integrated circuits (April 19, 1965)",
        url: "https://www.nano.gov/sites/default/files/mooreslaw.pdf",
        role: "date",
      },
      {
        title: "Wikipedia — Moore's law (overview)",
        url: "https://en.wikipedia.org/wiki/Moore%27s_law",
        role: "overview",
      },
    ],
    relatedIds: ["moore-noyce-intel-founded"],
  }),
  m({
    id: "jack-kilby-integrated-circuit",
    date: "1958-09-12",
    datePrecision: "day",
    title: "Kilby demonstrates first IC",
    summary:
      "Jack Kilby demonstrated the first integrated circuit at Texas Instruments on September 12, 1958 — building an oscillator on a germanium chip.",
    about:
      "Kilby's hybrid IC proved multiple components could share one semiconductor substrate — the foundation of modern microchips. He shared the 2000 Nobel Prize in Physics for the invention.",
    narrative: {
      whyChosen: "Kilby's demo was the first working integrated circuit.",
      whyImportant: "It launched the path from discrete transistors to single-chip systems.",
      problemSolved: "Wiring individual components was too large, slow, and unreliable for advanced electronics.",
    },
    category: "invention",
    tags: ["people", "semiconductor", "integrated-circuit", "hardware"],
    people: [{ id: "jack-kilby", name: "Jack Kilby", role: "researcher" }],
    importance: 3,
    sources: [
      {
        title: "Texas Instruments — First integrated circuit (September 12, 1958)",
        url: "https://en.wikipedia.org/wiki/Jack_Kilby",
        role: "date",
      },
      {
        title: "Wikipedia — Integrated circuit (overview)",
        url: "https://en.wikipedia.org/wiki/Integrated_circuit",
        role: "overview",
      },
    ],
    relatedIds: ["robert-noyce-integrated-circuit"],
  }),
  m({
    id: "robert-noyce-integrated-circuit",
    date: "1959",
    datePrecision: "year",
    title: "Noyce invents planar IC",
    summary:
      "Robert Noyce developed the planar integrated circuit at Fairchild Semiconductor in 1959 — enabling mass production of monolithic silicon chips.",
    about:
      "Noyce's planar process let manufacturers etch and interconnect transistors on silicon wafers — the approach still used in fabs today. His IC work led directly to co-founding Intel with Gordon Moore.",
    narrative: {
      whyChosen: "The planar IC made integrated circuits manufacturable at scale.",
      whyImportant: "It established silicon monolithic chips as the industry standard.",
      problemSolved: "Kilby's hybrid approach was hard to mass-produce compared to planar silicon.",
    },
    category: "invention",
    tags: ["people", "semiconductor", "integrated-circuit", "hardware"],
    people: [{ id: "robert-noyce", name: "Robert Noyce", role: "researcher" }],
    importance: 3,
    sources: [
      {
        title: "Fairchild — Planar integrated circuit (1959)",
        url: "https://en.wikipedia.org/wiki/Robert_Noyce",
        role: "date",
      },
      {
        title: "Wikipedia — Robert Noyce (overview)",
        url: "https://en.wikipedia.org/wiki/Robert_Noyce",
        role: "overview",
      },
    ],
    relatedIds: ["jack-kilby-integrated-circuit", "moore-noyce-intel-founded"],
  }),
  m({
    id: "moore-noyce-intel-founded",
    date: "1968-07-18",
    datePrecision: "day",
    title: "Gordon Moore and Robert Noyce found Intel",
    summary:
      "Gordon Moore and Robert Noyce founded Intel Corporation on July 18, 1968 — focused on semiconductor memory before dominating CPUs.",
    about:
      "Intel's 4004 microprocessor and x86 architecture became the backbone of personal computing and data centers. Moore and Noyce's Fairchild alumni network seeded much of Silicon Valley's chip industry.",
    narrative: {
      whyChosen: "Intel became the defining microprocessor company of the PC era.",
      whyImportant: "It commercialized Moore's Law through memory and CPU products at scale.",
      problemSolved: "The industry needed a focused company to push MOS memory and logic chips forward.",
    },
    category: "company",
    tags: ["people", "intel", "semiconductor", "founding"],
    people: [
      { id: "gordon-moore", name: "Gordon Moore", role: "co-founder" },
      { id: "robert-noyce", name: "Robert Noyce", role: "co-founder" },
    ],
    importance: 3,
    sources: [
      {
        title: "Intel — Company founded (July 18, 1968)",
        url: "https://www.intel.com/content/www/us/en/history/virtual-museum.html",
        role: "date",
      },
      {
        title: "Wikipedia — Intel (overview)",
        url: "https://en.wikipedia.org/wiki/Intel",
        role: "overview",
      },
    ],
    relatedIds: ["gordon-moore-moores-law", "pat-gelsinger-intel-ceo"],
  }),
  m({
    id: "seymour-cray-cdc-6600",
    date: "1964",
    datePrecision: "year",
    title: "Seymour Cray designs the CDC 6600",
    summary:
      "Seymour Cray led design of the CDC 6600 in 1964 — the fastest computer of its era and a template for supercomputing.",
    about:
      "The 6600 used parallelism and elegant packaging to outperform IBM mainframes — earning Cray the title 'father of supercomputing.' Cray Research later built machines that defined HPC for decades.",
    narrative: {
      whyChosen: "The CDC 6600 proved specialized architecture could beat bigger vendors.",
      whyImportant: "It established the supercomputer as a distinct engineering discipline.",
      problemSolved: "Scientific workloads needed far more performance than general-purpose mainframes delivered.",
    },
    category: "hardware",
    tags: ["people", "supercomputing", "hardware"],
    people: [{ id: "seymour-cray", name: "Seymour Cray", role: "researcher" }],
    importance: 6,
    sources: [
      {
        title: "CDC — 6600 supercomputer (1964)",
        url: "https://en.wikipedia.org/wiki/CDC_6600",
        role: "date",
      },
      {
        title: "Wikipedia — Seymour Cray (overview)",
        url: "https://en.wikipedia.org/wiki/Seymour_Cray",
        role: "overview",
      },
    ],
    relatedIds: [],
  }),
  m({
    id: "apple-ii-introduced",
    date: "1977-04-16",
    datePrecision: "day",
    title: "Apple II introduced",
    summary:
      "Apple introduced the Apple II at the West Coast Computer Faire on April 16, 1977 — one of the first successful mass-market personal computers.",
    about:
      "The Apple II's color graphics, expansion slots, and VisiCalc spreadsheet made PCs useful for businesses and schools — not just hobbyists. It validated the personal computer as a product category.",
    narrative: {
      whyChosen: "The Apple II was the first blockbuster personal computer.",
      whyImportant: "It proved home and small-business users would buy complete computer systems.",
      problemSolved: "Early PCs were kits for hobbyists without software ecosystems or polish.",
    },
    category: "hardware",
    tags: ["people", "apple", "personal-computer", "hardware"],
    people: [
      { id: "steve-jobs", name: "Steve Jobs", role: "co-founder" },
      { id: "steve-wozniak", name: "Steve Wozniak", role: "co-founder" },
    ],
    importance: 6,
    sources: [
      {
        title: "Apple — Apple II introduced (April 16–17, 1977)",
        url: "https://en.wikipedia.org/wiki/Apple_II",
        role: "date",
      },
      {
        title: "Wikipedia — Apple II (overview)",
        url: "https://en.wikipedia.org/wiki/Apple_II",
        role: "overview",
      },
    ],
    relatedIds: ["steve-wozniak-apple-founded"],
  }),
  m({
    id: "jensen-huang-cuda-announced",
    date: "2006-11-08",
    datePrecision: "day",
    title: "Jensen Huang announces CUDA",
    summary:
      "NVIDIA CEO Jensen Huang announced CUDA on November 8, 2006 — opening GPUs to general-purpose parallel computing.",
    about:
      "CUDA let researchers run matrix math on graphics cards — enabling the deep learning boom years before AlexNet. It turned NVIDIA from a gaming GPU vendor into an AI infrastructure company.",
    narrative: {
      whyChosen: "CUDA unlocked GPU computing for science and machine learning.",
      whyImportant: "It made massively parallel hardware accessible through C extensions developers could adopt.",
      problemSolved: "GPUs were locked to graphics APIs unsuitable for numerical computing.",
    },
    category: "software",
    tags: ["people", "nvidia", "gpu", "cuda", "parallel-computing"],
    people: [{ id: "jensen-huang", name: "Jensen Huang", role: "ceo" }],
    importance: 6,
    sources: [
      {
        title: "NVIDIA — CUDA announced (November 8, 2006)",
        url: "https://en.wikipedia.org/wiki/CUDA",
        role: "date",
      },
      {
        title: "Wikipedia — CUDA (overview)",
        url: "https://en.wikipedia.org/wiki/CUDA",
        role: "overview",
      },
    ],
    relatedIds: ["jensen-huang-nvidia-founded", "hinton-alexnet-imagenet-breakthrough"],
  }),
  m({
    id: "lisa-su-amd-zen-launched",
    date: "2017-03-02",
    datePrecision: "day",
    title: "Lisa Su launches AMD Ryzen on Zen architecture",
    summary:
      "AMD launched Ryzen processors on the Zen architecture on March 2, 2017 — ending years of Intel CPU dominance in desktop performance.",
    about:
      "Under Lisa Su's leadership, Zen delivered competitive IPC and core counts at aggressive prices — reviving AMD in servers with EPYC and in gaming with Ryzen. It reshaped the x86 duopoly.",
    narrative: {
      whyChosen: "Zen was AMD's comeback architecture after the Bulldozer era.",
      whyImportant: "Competitive CPUs lowered cloud and PC costs and accelerated innovation.",
      problemSolved: "AMD had fallen behind Intel on performance per watt and market share.",
    },
    category: "hardware",
    tags: ["people", "amd", "cpu", "zen", "semiconductor"],
    people: [{ id: "lisa-su", name: "Lisa Su", role: "ceo" }],
    importance: 6,
    sources: [
      {
        title: "AMD — Ryzen launch on Zen (March 2, 2017)",
        url: "https://en.wikipedia.org/wiki/Zen_(microarchitecture)",
        role: "date",
      },
      {
        title: "Wikipedia — Ryzen (overview)",
        url: "https://en.wikipedia.org/wiki/Ryzen",
        role: "overview",
      },
    ],
    relatedIds: ["lisa-su-amd-ceo", "jensen-huang-nvidia-founded"],
  }),
  m({
    id: "andy-grove-intel-ceo",
    date: "1987-10-18",
    datePrecision: "day",
    title: "Andy Grove named Intel CEO",
    summary:
      "Andy Grove became Intel CEO on October 18, 1987 when Gordon Moore stepped down — leading Intel through the PC boom.",
    about:
      "Grove's 'Only the Paranoid Survive' culture pushed Intel's x86 dominance and manufacturing discipline. He turned Intel into the world's largest chipmaker during the Windows/PC era.",
    narrative: {
      whyChosen: "Grove defined Intel's operational excellence during the microprocessor wars.",
      whyImportant: "His leadership secured x86 as the standard PC and server architecture.",
      problemSolved: "Intel needed aggressive execution to win the 386/486 battles against AMD and Cyrix.",
    },
    category: "company",
    tags: ["people", "intel", "ceo", "semiconductor"],
    people: [{ id: "andy-grove", name: "Andy Grove", role: "ceo" }],
    importance: 6,
    sources: [
      {
        title: "Intel — Andy Grove becomes CEO (October 18, 1987)",
        url: "https://en.wikipedia.org/wiki/Andrew_Grove",
        role: "date",
      },
      {
        title: "Wikipedia — Andrew Grove (overview)",
        url: "https://en.wikipedia.org/wiki/Andrew_Grove",
        role: "overview",
      },
    ],
    relatedIds: ["moore-noyce-intel-founded", "pat-gelsinger-intel-ceo"],
  }),
  m({
    id: "morris-chang-tsmc-founded",
    date: "1987-02-21",
    datePrecision: "day",
    title: "Morris Chang founds TSMC",
    summary:
      "Morris Chang founded Taiwan Semiconductor Manufacturing Company on February 21, 1987 — pioneering the pure-play foundry model.",
    about:
      "TSMC manufactures chips for Apple, NVIDIA, AMD, and Qualcomm without designing its own products — enabling fabless chip companies worldwide. It became the world's most advanced semiconductor fab operator.",
    narrative: {
      whyChosen: "TSMC's foundry model reshaped how the entire chip industry is structured.",
      whyImportant: "It let startups design chips without building billion-dollar fabs.",
      problemSolved: "Integrated device manufacturers hoarded fab capacity and IP.",
    },
    category: "company",
    tags: ["people", "tsmc", "semiconductor", "founding", "foundry"],
    people: [{ id: "morris-chang", name: "Morris Chang", role: "founder" }],
    importance: 3,
    sources: [
      {
        title: "TSMC — Company founded (February 21, 1987)",
        url: "https://en.wikipedia.org/wiki/TSMC",
        role: "date",
      },
      {
        title: "Wikipedia — TSMC (overview)",
        url: "https://en.wikipedia.org/wiki/TSMC",
        role: "overview",
      },
    ],
    relatedIds: ["jensen-huang-nvidia-founded", "lisa-su-amd-zen-launched"],
  }),

  // —— P15: International & open-source pioneers ——
  m({
    id: "yukihiro-matsumoto-ruby-1-released",
    date: "1996-12-21",
    datePrecision: "day",
    title: "Yukihiro Matsumoto releases Ruby 1.0",
    summary:
      "Yukihiro 'Matz' Matsumoto released Ruby 1.0 on December 21, 1996 — crystallizing a language designed for programmer happiness.",
    about:
      "Ruby's expressiveness influenced Rails, Elixir, and modern scripting language design. Matz built a global community from Japan that proved language innovation need not come from Silicon Valley.",
    narrative: {
      whyChosen: "Ruby 1.0 marked Matz's language graduating from personal project to production use.",
      whyImportant: "It brought an object-oriented scripting alternative to Perl and Python with a distinct philosophy.",
      problemSolved: "Developers wanted a more human-readable language without sacrificing object-oriented power.",
    },
    category: "software",
    tags: ["people", "ruby", "programming-language", "japan"],
    people: [{ id: "yukihiro-matsumoto", name: "Yukihiro Matsumoto", role: "creator" }],
    importance: 6,
    sources: [
      {
        title: "Ruby — Ruby 1.0 released (December 21, 1996)",
        url: "https://en.wikipedia.org/wiki/Ruby_(programming_language)",
        role: "date",
      },
      {
        title: "Wikipedia — Ruby (overview)",
        url: "https://en.wikipedia.org/wiki/Ruby_(programming_language)",
        role: "overview",
      },
    ],
    relatedIds: ["ruby-0-95-released"],
  }),
  m({
    id: "audrey-tang-g0v-launched",
    date: "2012-12",
    datePrecision: "month",
    title: "Audrey Tang co-launches g0v civic hacking movement",
    summary:
      "Audrey Tang helped launch Taiwan's g0v (gov-zero) civic hacking movement in December 2012 — open-source tools for government transparency.",
    about:
      "g0v produced open data dashboards, petition systems, and disaster-response apps — a model for civic tech worldwide. Tang's work bridged hacker culture and public-sector reform in Taiwan.",
    narrative: {
      whyChosen: "g0v became one of the most influential civic hacking communities globally.",
      whyImportant: "It showed how volunteer developers could improve democratic institutions with open data.",
      problemSolved: "Government data and services were opaque and hard for citizens to reuse.",
    },
    category: "culture",
    tags: ["people", "civic-tech", "open-source", "taiwan"],
    people: [{ id: "audrey-tang", name: "Audrey Tang", role: "co-founder" }],
    importance: 6,
    sources: [
      {
        title: "g0v — Civic hacking movement launched (December 2012)",
        url: "https://en.wikipedia.org/wiki/G0v",
        role: "date",
      },
      {
        title: "Wikipedia — Audrey Tang (overview)",
        url: "https://en.wikipedia.org/wiki/Audrey_Tang",
        role: "overview",
      },
    ],
    relatedIds: ["audrey-tang-digital-minister"],
  }),
  m({
    id: "audrey-tang-digital-minister",
    date: "2016-10-01",
    datePrecision: "day",
    title: "Audrey Tang appointed Taiwan digital minister",
    summary:
      "Audrey Tang was appointed minister without portfolio for digital affairs in Taiwan on October 1, 2016 — the youngest and first transgender cabinet minister.",
    about:
      "Tang promoted radical government transparency, open data, and participatory budgeting — exporting Taiwan's civic tech model during COVID contact tracing and beyond.",
    narrative: {
      whyChosen: "Tang brought open-source values into national government at cabinet level.",
      whyImportant: "It demonstrated hackers could reform public institutions from inside government.",
      problemSolved: "Governments lacked technical leadership that understood open collaboration.",
    },
    category: "culture",
    tags: ["people", "civic-tech", "government", "taiwan"],
    people: [{ id: "audrey-tang", name: "Audrey Tang", role: "researcher" }],
    importance: 6,
    sources: [
      {
        title: "Taiwan Executive Yuan — Digital minister appointment (October 2016)",
        url: "https://en.wikipedia.org/wiki/Audrey_Tang",
        role: "date",
      },
      {
        title: "Britannica — Audrey Tang (overview)",
        url: "https://www.britannica.com/biography/Audrey-Tang",
        role: "overview",
      },
    ],
    relatedIds: ["audrey-tang-g0v-launched"],
  }),
  m({
    id: "tim-berners-lee-w3c-founded",
    date: "1994-10-01",
    datePrecision: "day",
    title: "Tim Berners-Lee founds the W3C",
    summary:
      "Tim Berners-Lee founded the World Wide Web Consortium on October 1, 1994 at MIT — stewarding web standards globally.",
    about:
      "W3C standardized HTML, CSS, HTTP, and accessibility guidelines — keeping the web interoperable across browsers and devices. Berners-Lee led it without commercializing his invention.",
    narrative: {
      whyChosen: "W3C became the neutral forum for web standardization.",
      whyImportant: "It prevented proprietary fragmentation of the open web.",
      problemSolved: "Competing vendors needed a shared process to evolve web technologies.",
    },
    category: "culture",
    tags: ["people", "web", "w3c", "standards"],
    people: [{ id: "tim-berners-lee", name: "Tim Berners-Lee", role: "founder" }],
    importance: 6,
    sources: [
      {
        title: "W3C — Consortium founded (October 1, 1994)",
        url: "https://www.w3.org/about/history/",
        role: "date",
      },
      {
        title: "Wikipedia — World Wide Web Consortium (overview)",
        url: "https://en.wikipedia.org/wiki/World_Wide_Web_Consortium",
        role: "overview",
      },
    ],
    relatedIds: ["worldwideweb-browser", "berners-lee-web-public-domain"],
  }),
  m({
    id: "richard-stallman-fsf-founded",
    date: "1985-10-04",
    datePrecision: "day",
    title: "Richard Stallman founds FSF",
    summary:
      "Richard Stallman founded the Free Software Foundation on October 4, 1985 — the nonprofit behind GNU and the GPL.",
    about:
      "The FSF funded GNU tool development and defended copyleft licenses — anchoring the free software movement legally and institutionally beyond Stallman's manifesto.",
    narrative: {
      whyChosen: "The FSF gave the free software movement durable organizational backing.",
      whyImportant: "It sustained GNU development and GPL enforcement for decades.",
      problemSolved: "Individual activists could not maintain large free software projects alone.",
    },
    category: "culture",
    tags: ["people", "gnu", "free-software", "fsf"],
    people: [{ id: "richard-stallman", name: "Richard Stallman", role: "founder" }],
    importance: 6,
    sources: [
      {
        title: "FSF — Founded October 4, 1985",
        url: "https://en.wikipedia.org/wiki/Free_Software_Foundation",
        role: "date",
      },
      {
        title: "Wikipedia — Free Software Foundation (overview)",
        url: "https://en.wikipedia.org/wiki/Free_Software_Foundation",
        role: "overview",
      },
    ],
    relatedIds: ["stallman-gnu-manifesto", "gpl-version-1-released"],
  }),
  m({
    id: "rasmus-lerdorf-php-3-released",
    date: "1998-06",
    datePrecision: "month",
    title: "Rasmus Lerdorf releases PHP 3",
    summary:
      "Rasmus Lerdorf released PHP 3 in June 1998 — the first version called PHP (Hypertext Preprocessor) that powered the early web.",
    about:
      "PHP ran on millions of shared-hosting sites — WordPress, Drupal, and early Facebook all built on Lerdorf's Danish-born project. It made dynamic web pages accessible to hobbyist developers worldwide.",
    narrative: {
      whyChosen: "PHP 3 was the breakout version that defined server-side web scripting for a decade.",
      whyImportant: "It democratized dynamic websites before frameworks and cloud platforms.",
      problemSolved: "Static HTML could not personalize pages without complex CGI scripts.",
    },
    category: "software",
    tags: ["people", "php", "web", "denmark"],
    people: [{ id: "rasmus-lerdorf", name: "Rasmus Lerdorf", role: "creator" }],
    importance: 6,
    sources: [
      {
        title: "PHP — PHP 3 release (June 1998)",
        url: "https://en.wikipedia.org/wiki/PHP",
        role: "date",
      },
      {
        title: "Wikipedia — PHP (overview)",
        url: "https://en.wikipedia.org/wiki/PHP",
        role: "overview",
      },
    ],
    relatedIds: ["php-tools-1-0-released"],
  }),
  m({
    id: "guido-van-rossum-psf-founded",
    date: "2001-03-06",
    datePrecision: "day",
    title: "Python Software Foundation founded",
    summary:
      "The Python Software Foundation was incorporated on March 6, 2001 with Guido van Rossum as chairman — stewarding Python's open governance.",
    about:
      "The PSF holds Python's intellectual property, runs PyCon, and funds development — letting a Dutch-created language scale globally with nonprofit governance.",
    narrative: {
      whyChosen: "The PSF institutionalized Python beyond its BDFL founder.",
      whyImportant: "It provided legal and community infrastructure for one of the world's most-used languages.",
      problemSolved: "Python needed a neutral body to hold trademarks and organize conferences.",
    },
    category: "culture",
    tags: ["people", "python", "open-source", "netherlands"],
    people: [{ id: "guido-van-rossum", name: "Guido van Rossum", role: "founder" }],
    importance: 6,
    sources: [
      {
        title: "Python Software Foundation — Incorporated (March 6, 2001)",
        url: "https://www.python.org/psf-landing/",
        role: "date",
      },
      {
        title: "Wikipedia — Python Software Foundation (overview)",
        url: "https://en.wikipedia.org/wiki/Python_Software_Foundation",
        role: "overview",
      },
    ],
    relatedIds: ["python-0-9-0-released", "guido-van-rossum-bdfl-step-down"],
  }),
  m({
    id: "patrick-volkerding-slackware-released",
    date: "1993-07-17",
    datePrecision: "day",
    title: "Patrick Volkerding releases Slackware Linux",
    summary:
      "Patrick Volkerding released Slackware 1.0 on July 17, 1993 — one of the earliest maintained Linux distributions.",
    about:
      "Slackware prioritized simplicity and Unix-like purity — influencing how early Linux users installed servers and desktops. Volkerding has maintained it for decades as one of the longest-running distro projects.",
    narrative: {
      whyChosen: "Slackware is the oldest surviving Linux distribution still maintained by its founder.",
      whyImportant: "It helped standardize early Linux packaging and installation practices.",
      problemSolved: "Early Linux required manually assembling filesystems from kernel and GNU tools.",
    },
    category: "software",
    tags: ["people", "linux", "open-source", "operating-system"],
    people: [{ id: "patrick-volkerding", name: "Patrick Volkerding", role: "creator" }],
    importance: 6,
    sources: [
      {
        title: "Slackware — Version 1.0 release (July 17, 1993)",
        url: "https://en.wikipedia.org/wiki/Slackware",
        role: "date",
      },
      {
        title: "Wikipedia — Slackware (overview)",
        url: "https://en.wikipedia.org/wiki/Slackware",
        role: "overview",
      },
    ],
    relatedIds: ["linux-kernel-announced"],
  }),

  // —— P16: Modern AI & ML ——
  m({
    id: "ilya-sutskever-openai-research",
    date: "2015-12-11",
    datePrecision: "day",
    title: "Ilya Sutskever named OpenAI research director",
    summary:
      "OpenAI launched on December 11, 2015 with Ilya Sutskever as research director — the AlexNet co-author who would lead GPT and reasoning-model breakthroughs.",
    about:
      "Sutskever left Google Brain to co-found OpenAI's research program. He oversaw the scaling laws work behind GPT-3, ChatGPT, and later o1-style reasoning models before leaving to start Safe Superintelligence.",
    narrative: {
      whyChosen: "Sutskever defined OpenAI's research direction from inception through the LLM era.",
      whyImportant: "His leadership turned transformer scaling into consumer products.",
      problemSolved: "Frontier AI needed a research chief who could bridge academic breakthroughs and product deployment.",
    },
    category: "ai",
    tags: ["people", "openai", "deep-learning", "llm"],
    people: [{ id: "ilya-sutskever", name: "Ilya Sutskever", role: "researcher" }],
    importance: 6,
    sources: [
      {
        title: "OpenAI — Introducing OpenAI (December 11, 2015)",
        url: "https://openai.com/index/introducing-openai/",
        role: "date",
      },
      {
        title: "Wikipedia — Ilya Sutskever (overview)",
        url: "https://en.wikipedia.org/wiki/Ilya_Sutskever",
        role: "overview",
      },
    ],
    relatedIds: ["sam-altman-openai-founded", "hinton-alexnet-imagenet-breakthrough"],
  }),
  m({
    id: "andrej-karpathy-cs231n",
    date: "2015-01",
    datePrecision: "month",
    title: "Andrej Karpathy launches Stanford CS231n course",
    summary:
      "Andrej Karpathy co-taught CS231n: Convolutional Neural Networks for Visual Recognition at Stanford in winter 2015 — one of the first university deep-learning courses.",
    about:
      "Karpathy's lectures and assignments became a global on-ramp for computer vision practitioners. Enrollment grew from ~150 to 750 students as deep learning went mainstream — the course notes still anchor self-taught ML education.",
    narrative: {
      whyChosen: "CS231n democratized deep learning pedagogy beyond research labs.",
      whyImportant: "It trained a generation of engineers who built production vision systems.",
      problemSolved: "Universities lacked a hands-on curriculum bridging AlexNet-era research and practice.",
    },
    category: "ai",
    tags: ["people", "deep-learning", "education", "computer-vision"],
    people: [{ id: "andrej-karpathy", name: "Andrej Karpathy", role: "researcher" }],
    importance: 6,
    sources: [
      {
        title: "Stanford CS231n — Course history (winter 2015)",
        url: "http://cs231n.stanford.edu/",
        role: "date",
      },
      {
        title: "Wikipedia — Andrej Karpathy (overview)",
        url: "https://en.wikipedia.org/wiki/Andrej_Karpathy",
        role: "overview",
      },
    ],
    relatedIds: ["fei-fei-li-imagenet-dataset-launched", "hinton-alexnet-imagenet-breakthrough"],
  }),
  m({
    id: "demis-hassabis-alphago-victory",
    date: "2016-03-15",
    datePrecision: "day",
    title: "Demis Hassabis's AlphaGo defeats Lee Sedol 4–1",
    summary:
      "DeepMind's AlphaGo beat Go champion Lee Sedol four games to one in Seoul on March 15, 2016 — a watershed moment for reinforcement learning watched by 200 million people.",
    about:
      "Hassabis's team proved neural networks plus Monte Carlo tree search could master a game experts thought was a decade away from machine mastery. The victory reframed AI ambition from chess-scale search to intuition-like pattern recognition.",
    narrative: {
      whyChosen: "AlphaGo was the first AI victory that shocked both experts and the general public.",
      whyImportant: "It proved deep RL could exceed human intuition in complex domains.",
      problemSolved: "Go's combinatorial explosion had resisted brute-force and handcrafted AI for decades.",
    },
    category: "ai",
    tags: ["people", "deep-learning", "reinforcement-learning", "deepmind"],
    people: [{ id: "demis-hassabis", name: "Demis Hassabis", role: "researcher" }],
    importance: 3,
    sources: [
      {
        title: "Wikipedia — AlphaGo versus Lee Sedol (March 9–15, 2016)",
        url: "https://en.wikipedia.org/wiki/AlphaGo_versus_Lee_Sedol",
        role: "date",
      },
      {
        title: "DeepMind — AlphaGo (overview)",
        url: "https://deepmind.google/research/alphago/",
        role: "overview",
      },
    ],
    relatedIds: ["demis-hassabis-deepmind-founded"],
  }),
  m({
    id: "geoffrey-hinton-google-departure",
    date: "2023-05-01",
    datePrecision: "day",
    title: "Hinton leaves Google over AI risk",
    summary:
      "Geoffrey Hinton resigned from Google on May 1, 2023 to speak freely about existential risks from rapidly advancing AI — the godfather of deep learning sounding an alarm.",
    about:
      "Hinton had spent a decade at Google after AlexNet, but said he regretted his life's work as models scaled. His departure amplified global debate on AI safety, regulation, and the pace of deployment beyond academic circles.",
    narrative: {
      whyChosen: "Hinton's exit turned a research pioneer into the public face of AI-risk concern.",
      whyImportant: "It lent credibility to safety advocacy from inside the deep learning establishment.",
      problemSolved: "Researchers inside Big Tech lacked freedom to warn about harms without leaving.",
    },
    category: "ai",
    tags: ["people", "deep-learning", "ai-safety", "google"],
    people: [{ id: "geoffrey-hinton", name: "Geoffrey Hinton", role: "researcher" }],
    importance: 6,
    sources: [
      {
        title: "The New York Times — Geoffrey Hinton leaves Google (May 1, 2023)",
        url: "https://www.nytimes.com/2023/05/01/technology/ai-google-chatbot-engineer-quits-hinton.html",
        role: "date",
      },
      {
        title: "Wikipedia — Geoffrey Hinton (overview)",
        url: "https://en.wikipedia.org/wiki/Geoffrey_Hinton",
        role: "overview",
      },
    ],
    relatedIds: ["hinton-alexnet-imagenet-breakthrough", "deep-learning-turing-trio-2018"],
  }),
  m({
    id: "fei-fei-li-stanford-hai",
    date: "2019-03-18",
    datePrecision: "day",
    title: "Fei-Fei Li co-directs Stanford HAI launch",
    summary:
      "Stanford launched the Institute for Human-Centered Artificial Intelligence on March 18, 2019 with Fei-Fei Li as co-director — bridging CS, humanities, and policy.",
    about:
      "HAI united ~200 faculty across disciplines to study AI's societal impact, not just algorithms. Li's leadership positioned human-centered design and ethics alongside technical breakthroughs at a top research university.",
    narrative: {
      whyChosen: "HAI institutionalized interdisciplinary AI governance at Stanford scale.",
      whyImportant: "It modeled how universities could study AI's human impact, not just capabilities.",
      problemSolved: "AI research silos lacked forums connecting engineering, ethics, and public policy.",
    },
    category: "ai",
    tags: ["people", "ai-policy", "education", "stanford"],
    people: [{ id: "fei-fei-li", name: "Fei-Fei Li", role: "researcher" }],
    importance: 6,
    sources: [
      {
        title: "Stanford Report — HAI launch (March 18, 2019)",
        url: "https://news.stanford.edu/stories/2019/03/stanford_university_launches_human-centered_ai",
        role: "date",
      },
      {
        title: "Stanford HAI — About (overview)",
        url: "https://hai.stanford.edu/",
        role: "overview",
      },
    ],
    relatedIds: ["fei-fei-li-imagenet-dataset-launched"],
  }),
  m({
    id: "yann-lecun-meta-chief-ai",
    date: "2018-01-23",
    datePrecision: "day",
    title: "Yann LeCun named Facebook chief AI scientist",
    summary:
      "Yann LeCun stepped down as FAIR director on January 23, 2018 to become Facebook's chief AI scientist — focusing on long-range research while Jérôme Pesenti took operational oversight.",
    about:
      "LeCun kept shaping convolutional networks and self-supervised learning at industrial scale. The role let him advocate publicly for open research while Facebook integrated AI across News Feed, moderation, and AR products.",
    narrative: {
      whyChosen: "LeCun defined how a Turing laureate could steer corporate AI research strategy.",
      whyImportant: "It separated FAIR's exploratory research from product-integrated machine learning.",
      problemSolved: "Fast-growing social platforms needed both product ML leadership and fundamental research.",
    },
    category: "ai",
    tags: ["people", "deep-learning", "facebook", "meta"],
    people: [{ id: "yann-lecun", name: "Yann LeCun", role: "researcher" }],
    importance: 6,
    sources: [
      {
        title: "The Verge — LeCun becomes chief AI scientist (January 23, 2018)",
        url: "https://www.theverge.com/2018/1/23/16924460/facebook-ai-chief-yann-lecun-stepping-down-jerome-pesenti",
        role: "date",
      },
      {
        title: "Wikipedia — Yann LeCun (overview)",
        url: "https://en.wikipedia.org/wiki/Yann_LeCun",
        role: "overview",
      },
    ],
    relatedIds: ["deep-learning-turing-trio-2018", "yann-lecun-lenet-published"],
  }),
  m({
    id: "yoshua-bengio-mila-founded",
    date: "2017-01",
    datePrecision: "month",
    title: "Yoshua Bengio leads founding of Mila AI institute",
    summary:
      "Yoshua Bengio helped establish Mila — Quebec's Artificial Intelligence Institute — in January 2017, growing it into the world's largest academic deep-learning research center.",
    about:
      "Mila consolidated Montreal's AI ecosystem under Bengio's scientific direction — attracting Element AI, corporate labs, and hundreds of researchers. It became the institutional anchor behind Bengio's Turing Award recognition.",
    narrative: {
      whyChosen: "Mila turned Montreal into a global deep-learning hub rivaling Silicon Valley labs.",
      whyImportant: "It proved regional AI clusters could scale through nonprofit academic institutes.",
      problemSolved: "Scattered university labs lacked shared compute, talent pipelines, and industry partnerships.",
    },
    category: "ai",
    tags: ["people", "deep-learning", "canada", "research"],
    people: [{ id: "yoshua-bengio", name: "Yoshua Bengio", role: "researcher" }],
    importance: 6,
    sources: [
      {
        title: "Mila — About (founded 2017)",
        url: "https://mila.quebec/en/about/",
        role: "date",
      },
      {
        title: "Wikipedia — Mila (Quebec AI institute) (overview)",
        url: "https://en.wikipedia.org/wiki/Mila_(research_institute)",
        role: "overview",
      },
    ],
    relatedIds: ["deep-learning-turing-trio-2018"],
  }),
  m({
    id: "rich-sutton-rl-textbook",
    date: "1998",
    datePrecision: "year",
    title: "Sutton RL textbook published",
    summary:
      "Richard Sutton and Andrew Barto published Reinforcement Learning: An Introduction in 1998 — the foundational textbook for RL theory and practice.",
    about:
      "Sutton's temporal-difference learning and policy-gradient frameworks became the vocabulary for game-playing agents, robotics, and later DeepMind's AlphaGo. The book's second edition in 2018 updated decades of RL progress.",
    narrative: {
      whyChosen: "Sutton's textbook codified reinforcement learning as a teachable discipline.",
      whyImportant: "It trained researchers who built modern game-playing and robotics AI.",
      problemSolved: "RL ideas were scattered across papers without a unified pedagogical framework.",
    },
    category: "ai",
    tags: ["people", "reinforcement-learning", "textbook", "research"],
    people: [{ id: "rich-sutton", name: "Rich Sutton", role: "author" }],
    importance: 6,
    sources: [
      {
        title: "MIT Press — Reinforcement Learning: An Introduction (first edition, 1998)",
        url: "http://incompleteideas.net/book/the-book.html",
        role: "date",
      },
      {
        title: "Wikipedia — Richard S. Sutton (overview)",
        url: "https://en.wikipedia.org/wiki/Richard_S._Sutton",
        role: "overview",
      },
    ],
    relatedIds: ["demis-hassabis-alphago-victory"],
  }),
];
