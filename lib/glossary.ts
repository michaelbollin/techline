export type GlossaryTextPart =
  | { type: "text"; value: string }
  | { type: "term"; value: string; explanation: string };

/**
 * Abbreviations and difficult terms with short explanations for hover tooltips.
 * In article JSON, wrap terms that should underline: `[Smalltalk]`, `[MIT]`, etc.
 * Only bracketed terms are glossed; unmarked text is never auto-matched.
 */
export const GLOSSARY_ENTRIES: Record<string, string> = {
  // Abbreviations & acronyms
  API: "Application programming interface — a defined way for programs to talk to each other or to a service.",
  ARPANET:
    "Advanced Research Projects Agency Network — the U.S. research network that pioneered packet switching and became a precursor to the internet.",
  ASCII: "American Standard Code for Information Interchange — a character encoding mapping letters and symbols to numbers.",
  BASIC: "Beginner's All-purpose Symbolic Instruction Code — an early programming language designed for ease of learning.",
  BSD: "Berkeley Software Distribution — a family of Unix-like operating systems originating from UC Berkeley.",
  CD: "Compact disc — an optical storage format for digital audio and data.",
  "CD-ROM": "Compact disc read-only memory — a CD used as a non-writable data storage medium.",
  CLI: "Command-line interface — interacting with software by typing text commands.",
  CPU: "Central processing unit — the primary chip that executes program instructions.",
  CRT: "Cathode-ray tube — a display technology using electron beams; the classic bulky monitor.",
  DNS: "Domain Name System — translates human-readable domain names into IP addresses.",
  DOS: "Disk Operating System — an OS centered on disk storage; often refers to MS-DOS on PCs.",
  DVD: "Digital versatile disc — optical media with higher capacity than CDs for video and data.",
  GUI: "Graphical user interface — windows, icons, and pointers instead of typed commands.",
  HTML: "HyperText Markup Language — the standard markup for structuring web pages.",
  HTTP: "HyperText Transfer Protocol — the protocol browsers use to request and receive web pages.",
  HTTPS: "HTTP Secure — HTTP encrypted with TLS so data cannot be read in transit.",
  IBM: "International Business Machines — a major computer and enterprise technology company since the early 20th century.",
  IEEE: "Institute of Electrical and Electronics Engineers — a professional body that publishes many technical standards.",
  IP: "Internet Protocol — the addressing and routing layer that moves packets across networks.",
  IPv4: "Internet Protocol version 4 — the 32-bit address scheme still widely used on the internet.",
  IPv6: "Internet Protocol version 6 — the newer 128-bit address scheme designed to replace IPv4.",
  ISP: "Internet service provider — a company that sells internet access to homes and businesses.",
  IT: "Information technology — the use of computers, networks, and software in organizations.",
  JPEG: "Joint Photographic Experts Group — a common lossy image compression format.",
  LAN: "Local area network — a network covering a building or campus, as opposed to wide-area links.",
  LISP: "LISt Processing — a programming language oriented around lists and symbolic expressions.",
  MIT: "Massachusetts Institute of Technology — a research university central to many computing breakthroughs.",
  MS: "Microsoft — the software company behind Windows, Office, and many developer tools.",
  NASA: "National Aeronautics and Space Administration — the U.S. agency for space and aeronautics research.",
  OCR: "Optical character recognition — software that reads text from images or scanned documents.",
  OS: "Operating system — software that manages hardware and provides services to applications.",
  PC: "Personal computer — a computer designed for individual use, especially desktop or laptop machines.",
  PDF: "Portable Document Format — a file format for fixed-layout documents across platforms.",
  RAM: "Random access memory — fast volatile memory used while programs run.",
  ROM: "Read-only memory — non-volatile memory whose contents are fixed or rarely changed.",
  RSA: "Rivest–Shamir–Adleman — a widely used public-key encryption algorithm named after its inventors.",
  SDK: "Software development kit — tools and libraries for building software on a platform.",
  SQL: "Structured Query Language — the standard language for querying relational databases.",
  TCP: "Transmission Control Protocol — a reliable, connection-oriented protocol used on the internet.",
  TLS: "Transport Layer Security — encryption that protects data in transit on the web and networks.",
  UI: "User interface — the parts of software people see and interact with.",
  URL: "Uniform Resource Locator — the address that identifies a resource on the web.",
  USB: "Universal Serial Bus — a standard connector and protocol for peripherals and devices.",
  VPN: "Virtual private network — an encrypted tunnel over a public network.",
  W3C: "World Wide Web Consortium — the international body that maintains core web standards.",
  WWW: "World Wide Web — the linked hypertext system accessed over the internet.",
  XML: "Extensible Markup Language — a markup format for structured documents and data exchange.",
  GPL: "GNU General Public License — a widely used open-source license that requires derivatives to stay open.",
  POSIX: "Portable Operating System Interface — a family of standards for Unix-like operating systems.",
  RISC: "Reduced instruction set computer — a CPU design using simple, fast instructions.",
  CISC: "Complex instruction set computer — a CPU design with richer, multi-step instructions.",
  OOP: "Object-oriented programming — organizing code around objects that combine data and behavior.",
  REPL: "Read-eval-print loop — an interactive shell that runs code as you type it.",
  WYSIWYG: "What You See Is What You Get — editing where the screen closely matches printed output.",

  // Software, languages, and products
  Ada: "A language commissioned by the U.S. Department of Defense — designed for safety-critical systems.",
  Bravo:
    "Early WYSIWYG word processor developed at Xerox PARC for the Alto — influenced later document editors.",
  COBOL: "Common Business-Oriented Language — a language designed for business data processing on mainframes.",
  "CP/M": "Control Program for Microcomputers — an early OS that ran on many pre-IBM PC microcomputers.",
  Fortran: "Formula Translation — one of the first high-level languages, dominant in science and engineering.",
  HyperCard:
    "Apple software for building interactive stacks of cards — an early hypermedia and scripting tool.",
  Lotus: "Lotus Development Corporation — maker of 1-2-3 and Notes; a major PC software company.",
  "Lotus 1-2-3":
    "An early spreadsheet that dominated IBM PC business software in the 1980s.",
  "MS-DOS": "Microsoft Disk Operating System — the OS bundled with early IBM PCs and PC compatibles.",
  Mosaic: "An early graphical web browser — helped popularize the World Wide Web beyond researchers.",
  Multics: "A pioneering time-sharing OS project — influenced Unix design and many security ideas.",
  Netscape: "A commercial web browser company — Navigator defined the early consumer web.",
  "Objective-C":
    "A language combining C with Smalltalk-style object messaging — used for macOS and iOS before Swift.",
  PostScript:
    "A page description language from Adobe — enabled reliable printing of text and graphics at high quality.",
  Simula:
    "An early language that introduced objects and classes — a direct ancestor of object-oriented programming.",
  Smalltalk:
    "An object-oriented language and environment from Xerox PARC — pioneered GUIs and live programming.",
  TeX: "Donald Knuth's typesetting system — precise mathematical and technical document layout.",
  "Turbo Pascal":
    "A fast Pascal compiler and IDE from Borland — popularized integrated development environments on PCs.",
  VisiCalc: "The first spreadsheet for personal computers — turned PCs into business tools.",
  WordStar:
    "A dominant word processor for early PCs — defined keyboard shortcuts many editors still use.",

  // Difficult technical terms
  "assembly language":
    "A low-level human-readable form of machine instructions — one step above raw binary code.",
  "boolean algebra":
    "Mathematics using true/false values and AND, OR, NOT — the symbolic basis of digital logic design.",
  bytecode:
    "Intermediate instructions produced by compilers — often executed by a virtual machine rather than the CPU directly.",
  "client-server":
    "A network model where clients request services from centralized servers — the pattern behind most web applications.",
  "distributed computing":
    "Running programs across multiple networked machines — coordinates work to solve larger problems.",
  firmware:
    "Software stored in hardware that controls a device — persists across reboots and updates infrequently.",
  "free software":
    "Software users can run, study, modify, and share — emphasizes user freedom, not just zero price.",
  "garbage collection":
    "Automatic memory management that frees unused objects — programmers need not track every allocation manually.",
  homebrew:
    "Amateur or self-built hardware or software — the Homebrew Computer Club helped spark the personal computer era.",
  hypertext:
    "Text with links to other documents — clicking links instead of linear reading was the core idea behind the web.",
  hypervisor:
    "Software that creates and runs virtual machines — the layer between physical hardware and guest operating systems.",
  "integrated circuit":
    "A chip miniaturizing many electronic components on one semiconductor — the building block of modern electronics.",
  isomorphic:
    "A structural correspondence between two domains — Shannon showed Boolean algebra and switching circuits map one-to-one.",
  kernel:
    "The core of an operating system that manages hardware, memory, and processes — everything else depends on it.",
  "machine code":
    "Binary instructions a CPU executes directly — what compilers and assemblers ultimately produce.",
  mainframe:
    "A large, powerful computer for centralized organizational workloads — dominated enterprise computing before PCs.",
  microcomputer:
    "A small computer built around a microprocessor — the category that became personal computers.",
  microkernel:
    "An OS design where only minimal core services run in kernel mode — most services run as user processes.",
  microprocessor:
    "A CPU on a single integrated circuit — the heart of personal computers and countless embedded devices.",
  middleware:
    "Software between applications and lower-level systems — handles integration, messaging, or shared services.",
  minicomputer:
    "A smaller multi-user computer from the 1960s–80s — affordable to departments rather than whole corporations.",
  "open standard":
    "A specification anyone can implement without proprietary restrictions — encourages interoperability and competition.",
  "packet switching":
    "Breaking data into small packets that travel independently across a network — the foundation of internet routing.",
  "peer-to-peer":
    "A network where participants connect directly as equals — no single central server is required.",
  relay:
    "An electrically operated switch using a magnet to open or close contacts — early digital circuits used thousands of relays.",
  "relational database":
    "A database structured as tables with rows and columns, queried with SQL — the dominant model for business data.",
  semiconductor:
    "A material whose conductivity can be controlled — silicon semiconductors are the basis of almost all computer chips.",
  "stored program":
    "A design where instructions and data share memory — programs can be loaded and changed without rewiring hardware.",
  "stored-program":
    "A design where instructions and data share memory — programs can be loaded and changed without rewiring hardware.",
  "switching circuits":
    "Circuits that route signals through switches such as relays or transistors — the physical layer Shannon modeled with logic.",
  timesharing:
    "Running multiple programs on one CPU by switching quickly between them — made interactive computing economical.",
  "time-sharing":
    "Running multiple programs on one CPU by switching quickly between them — made interactive computing economical.",
  transistor:
    "A tiny semiconductor switch that can amplify or gate signals — replaced relays and enabled compact computers.",
  "Turing machine":
    "A theoretical model of computation with a tape and states — defines what a computer can compute in principle.",
  "virtual machine":
    "Software that emulates a computer — often runs one OS inside another for isolation or portability.",
  "von Neumann":
    "A computer architecture where programs and data share memory — the template for most modern computers.",

  "arm architecture":
    "A family of CPU designs known for energy efficiency — dominates smartphones and increasingly servers and laptops.",
  "batch processing":
    "Running many jobs sequentially without interactive input — how early mainframes processed work overnight.",
  copyleft:
    "A license approach requiring derivative works to remain open — the GPL is the classic example.",
  "digital signature":
    "A cryptographic proof that data came from a specific key holder — used for authenticity, not secrecy.",
  "embedded system":
    "A computer built into a device for a dedicated task — from car brakes to router firmware.",
  ethernet:
    "A wired local networking standard — the dominant way offices and homes connect devices to a LAN.",
  "floppy disk":
    "Removable magnetic storage on a flexible disk — the main way PCs exchanged files before USB and the web.",
  "functional programming":
    "A style emphasizing functions and immutable data over step-by-step state changes — influences Haskell, Lisp, and modern languages.",
  "hard disk":
    "Magnetic storage with spinning platters — the primary bulk storage for PCs and servers for decades.",
  "high-level language":
    "A programming language closer to human logic than machine code — compiled or interpreted into lower-level instructions.",
  "home computer":
    "An affordable personal computer marketed for households — the 1980s wave that followed hobbyist kits.",
  "magnetic tape":
    "Sequential storage on coated tape — used for backups and archives when disks were too costly.",
  "moore's law":
    "The observation that transistor counts on chips roughly double every two years — drove expectations for computing growth.",
  "portable computer":
    "A computer designed to be moved and used in different places — from luggable machines to modern laptops.",
  "private key":
    "A secret cryptographic key kept by one party — used to decrypt or sign data; must never be shared.",
  "public key":
    "A cryptographic key that can be published — others use it to encrypt messages or verify signatures.",
  "punch card":
    "A stiff card with punched holes encoding data or instructions — an early program and data input medium.",
  "punched card":
    "A stiff card with punched holes encoding data or instructions — an early program and data input medium.",
  "single-board computer":
    "A complete computer on one circuit board — hobbyist boards like the Raspberry Pi popularized the form.",
  supercomputer:
    "A machine at the extreme high end of performance — built for weather, physics, and large-scale simulation.",
  teletype:
    "A keyboard-printer terminal that sent and received text over wires — early way to interact with distant computers.",
  "telephone exchange":
    "A facility routing phone calls through switches — early electromechanical exchanges inspired digital switching research.",
  "vacuum tube":
    "An electronic component using evacuated glass tubes — predated transistors in radios, TVs, and early computers.",
  "venture capital":
    "Funding for high-risk startups in exchange for equity — financed many software and hardware companies before profitability.",
  webassembly:
    "A compact binary instruction format for running code in browsers at near-native speed — extends the web beyond JavaScript.",
  workstation:
    "A powerful desktop machine for technical work — between personal computers and minicomputers in price and capability.",
};

/** Wrap tooltip text when the explanation is more than a short expansion. */
export const GLOSSARY_TOOLTIP_WRAP_MIN_LENGTH = 48;

export function glossaryTooltipWraps(explanation: string): boolean {
  return explanation.length >= GLOSSARY_TOOLTIP_WRAP_MIN_LENGTH;
}

/** Editorial markup in article text: `[term]` marks a glossary tooltip. */
export const GLOSSARY_MARKUP_PATTERN = /\[([^\]]+)\]/g;

const glossaryKeyByLower = new Map(
  Object.keys(GLOSSARY_ENTRIES).map((key) => [key.toLowerCase(), key]),
);

export function resolveGlossaryKey(term: string): string | undefined {
  if (GLOSSARY_ENTRIES[term]) {
    return term;
  }

  return glossaryKeyByLower.get(term.toLowerCase());
}

export function stripGlossaryMarkup(text: string): string {
  return text.replace(GLOSSARY_MARKUP_PATTERN, "$1");
}

export function splitTextWithGlossary(text: string): GlossaryTextPart[] {
  if (!text) {
    return [{ type: "text", value: "" }];
  }

  const parts: GlossaryTextPart[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(GLOSSARY_MARKUP_PATTERN)) {
    const index = match.index ?? 0;
    const term = match[1];

    if (index > lastIndex) {
      parts.push({ type: "text", value: text.slice(lastIndex, index) });
    }

    const canonicalKey = resolveGlossaryKey(term);
    if (canonicalKey) {
      parts.push({
        type: "term",
        value: term,
        explanation: GLOSSARY_ENTRIES[canonicalKey],
      });
    } else {
      parts.push({ type: "text", value: term });
    }

    lastIndex = index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push({ type: "text", value: text.slice(lastIndex) });
  }

  return parts.length > 0 ? parts : [{ type: "text", value: text }];
}

export function textHasGlossaryTerms(text: string): boolean {
  for (const match of text.matchAll(GLOSSARY_MARKUP_PATTERN)) {
    if (resolveGlossaryKey(match[1])) {
      return true;
    }
  }

  return false;
}
