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

  // Additional terms for timeline coverage
  "artificial intelligence":
    "Software that performs tasks associated with human intelligence — perception, reasoning, and learning.",
  automation: "Using machines or software to perform tasks with minimal human intervention.",
  backdoor: "A hidden way to access a system bypassing normal security — often installed by attackers or left by developers.",
  BIOS: "Basic Input/Output System — firmware that initializes hardware when a PC boots, before the OS loads.",
  bootloader: "Software that loads the operating system into memory when a computer starts.",
  cryptocurrency: "Digital money secured by cryptography — transactions recorded on distributed ledgers such as blockchains.",
  "computer vision": "Software that interprets images and video — object detection, OCR, and scene understanding.",
  cybernetics: "The study of control and communication in animals and machines — influenced AI and systems thinking.",
  debugger: "A tool that lets developers pause, inspect, and step through running programs to find bugs.",
  DevOps: "Practices combining software development and IT operations — automation, CI/CD, and faster releases.",
  "expert system": "Software that encodes specialist knowledge as rules — early commercial AI before modern machine learning.",
  firewall: "Security software or hardware that filters network traffic — blocks unauthorized access between networks.",
  GCC: "GNU Compiler Collection — the dominant open-source compiler toolchain for C, C++, and other languages.",
  GPU: "Graphics processing unit — a chip optimized for parallel math; now used for graphics, ML, and scientific computing.",
  IDE: "Integrated development environment — an editor with debugging, build tools, and project management built in.",
  "information theory": "Mathematics of data compression and reliable communication — Shannon's framework for bits and entropy.",
  IoT: "Internet of Things — networked sensors and devices embedded in appliances, factories, and cities.",
  JIT: "Just-in-time compilation — translating code to machine instructions at runtime instead of ahead of time.",
  JSON: "JavaScript Object Notation — a lightweight text format for structured data exchange on the web.",
  LLVM: "Low Level Virtual Machine — a compiler infrastructure reused by Clang, Rust, Swift, and many language toolchains.",
  malware: "Malicious software — viruses, worms, trojans, and ransomware designed to harm systems or steal data.",
  metadata: "Data that describes other data — file dates, authorship, schema fields, and API response headers.",
  "machine learning": "Systems that learn patterns from data rather than following only explicit programmed rules.",
  "neural network": "A model of connected layers that learns from examples — the core of modern deep learning.",
  "deep learning": "Neural networks with many layers that learn hierarchical representations from data.",
  NLP: "Natural language processing — software that understands, generates, or translates human language.",
  "NP-complete": "A class of problems at least as hard as any in NP — if one has a fast solution, all NP problems do.",
  "NP-completeness": "The property of being among the hardest problems in NP — central to computational complexity theory.",
  Nyquist: "Harry Nyquist — his sampling theorem sets how finely you must sample a signal to reconstruct it digitally.",
  perceptron: "An early neural network model — a single-layer learner that inspired modern machine learning research.",
  phishing: "Fraudulent messages that trick users into revealing passwords or installing malware.",
  ransomware: "Malware that encrypts files and demands payment — a major threat to businesses and hospitals.",
  REST: "Representational State Transfer — a style for web APIs using HTTP methods and resource URLs.",
  robotics: "Machines that sense, plan, and act in the physical world — from factory arms to Mars rovers.",
  RSS: "Really Simple Syndication — a feed format for subscribing to website and blog updates.",
  SaaS: "Software as a Service — applications delivered over the internet on a subscription basis.",
  spyware: "Software that secretly monitors user activity — keystrokes, browsing, or camera access.",
  "smart contract": "Programs on a blockchain that run automatically when conditions are met — used in DeFi and NFTs.",
  telegraph: "A long-distance messaging system using electrical signals — the Victorian internet before telephones.",
  telephone: "Voice communication over wired or wireless networks — the dominant real-time medium before the internet.",
  "Turing test": "Alan Turing's criterion for machine intelligence — can a computer convincingly imitate a human in conversation?",
  "lambda calculus": "A formal system of functions and application — Church's 1930s model of computation alongside Turing machines.",
  Unicode: "A standard mapping characters from all writing systems to code points — the basis of UTF-8 on the web.",
  "UTF-8": "A variable-width Unicode encoding — the default text format for the web, JSON, and most modern software.",
  Unix: "An influential multitasking OS from the 1970s — files, pipes, and C shaped Linux, macOS, and BSD.",
  Wikipedia: "A free, collaboratively edited encyclopedia on the web — one of the largest reference works ever built.",
  wiki: "A website anyone can edit — quick collaborative publishing; Wikipedia is the most famous example.",
  worm: "Self-replicating malware that spreads across networks without needing a host file.",
  x86: "Intel's dominant CPU architecture family — the instruction set behind most PCs and servers for decades.",
  "zero-day": "A vulnerability unknown to defenders before exploitation — no patch exists on day zero of discovery.",

  // Batch expansion — languages, AI, infra, business
  acquisition: "One company buying another — a common path for tech giants to absorb products and talent.",
  antitrust: "Laws limiting monopolies and unfair competition — shaped landmark cases against Microsoft, Google, and Apple.",
  bankruptcy: "Legal process when a company cannot pay debts — often follows rapid collapse in crypto or dot-com busts.",
  BEAM: "Bogdan/Björn's Erlang Abstract Machine — the Erlang/Elixir runtime known for lightweight processes.",
  benchmark: "A standardized test suite for comparing systems — ImageNet, MLPerf, and SPEC define industry scoreboards.",
  blockchain: "A distributed ledger where records are chained cryptographically — designed for tamper-resistant shared state.",
  CCPA: "California Consumer Privacy Act — a state law giving residents rights over personal data held by businesses.",
  compliance: "Following laws and industry rules — privacy, security, and financial regulations for software companies.",
  container: "An isolated runtime environment packaging an app and its dependencies — lighter than full virtual machines.",
  dataset: "A curated collection of examples for training or evaluation — the fuel for machine learning research.",
  DeFi: "Decentralized finance — lending, trading, and derivatives on blockchains without traditional banks.",
  "diffusion model": "A generative AI approach that learns to denoise data — powers many image and video generators.",
  Docker: "Software that packages applications into containers — became the default way to ship and deploy services.",
  Entscheidungsproblem: "Hilbert's decision problem — whether every mathematical statement can be proved or disproved algorithmically.",
  Erlang: "A language for fault-tolerant concurrent systems — designed for telecom switches and now messaging backends.",
  Elixir: "A language on the Erlang VM with Ruby-like syntax — popular for Phoenix web apps and real-time systems.",
  "fine-tuning": "Adapting a pre-trained model to a specific task with additional training on a smaller dataset.",
  GDPR: "General Data Protection Regulation — EU law governing how organizations collect and process personal data.",
  GHC: "Glasgow Haskell Compiler — the main compiler and runtime for the Haskell programming language.",
  Gödel: "Kurt Gödel — his incompleteness theorems showed limits on what formal mathematics can prove.",
  Haskell: "A purely functional language with lazy evaluation — influential in type systems and compiler research.",
  Hilbert: "David Hilbert — posed foundational questions for mathematics, including the Entscheidungsproblem.",
  inference: "Running a trained model to produce predictions — as opposed to the training phase that learns weights.",
  IPO: "Initial public offering — when a private company first sells shares on a stock exchange.",
  Kubernetes: "An orchestration system for containers — schedules, scales, and manages fleets of services in production.",
  LLM: "Large language model — a neural network trained on vast text to generate and reason about language.",
  metaverse: "A vision of persistent 3D virtual spaces for work and play — VR headsets and online worlds.",
  microservices: "An architecture splitting applications into small independent services — each deployed and scaled separately.",
  MongoDB: "A document-oriented NoSQL database — stores JSON-like records instead of rigid relational tables.",
  NFT: "Non-fungible token — a blockchain record proving ownership of a unique digital asset.",
  NoSQL: "Database designs beyond traditional tables — documents, key-value, graph, and wide-column stores.",
  OTP: "Open Telecom Platform — Erlang's libraries and patterns for building reliable distributed systems.",
  Perl: "Practical Extraction and Report Language — a scripting language that dominated early web CGI and sysadmin.",
  Prolog: "A logic programming language — programs are sets of rules queried by an inference engine.",
  Python: "A high-level language known for readability — dominant in data science, scripting, and web backends.",
  Ruby: "A dynamic language emphasizing developer happiness — Rails made it the default for web startups in the 2000s.",
  Go: "A language from Google — simple syntax, fast compilation, and built-in concurrency via goroutines.",
  refactoring: "Restructuring code without changing behavior — improving design while keeping tests green.",
  regulation: "Government rules governing technology — privacy, competition, safety, and export controls.",
  "reinforcement learning": "Training agents by reward and penalty signals — used in games, robotics, and recommendation systems.",
  stablecoin: "A cryptocurrency pegged to fiat currency — intended to reduce volatility for payments and DeFi.",
  "technical debt": "The future cost of quick shortcuts in code — shortcuts that slow development until refactored.",
  transformer: "A neural network architecture using attention — the foundation of modern large language models.",
  VR: "Virtual reality — immersive 3D environments viewed through headsets with motion tracking.",
  "generative AI": "Models that create new content — text, images, audio, or code — from learned patterns.",
  "foundation model": "A large pre-trained model adapted to many downstream tasks — GPT, Claude, and Llama are examples.",

  // Batch 18 — mobile, web frameworks, AI products
  AOSP: "Android Open Source Project — the open codebase Google publishes for the Android operating system.",
  Anthropic: "An AI safety company — creators of the Claude family of language models.",
  Android: "Google's open mobile operating system — the dominant platform for smartphones worldwide.",
  Blink: "Google's rendering engine forked from WebKit — powers Chrome and many Chromium-based browsers.",
  Brexit: "The United Kingdom's withdrawal from the European Union — reshaped tech regulation and data-transfer rules.",
  Chromium: "Google's open-source browser project — the foundation for Chrome, Edge, and other modern browsers.",
  CMS: "Content management system — software for building and publishing websites without hand-writing every page.",
  Drupal: "A PHP-based CMS known for flexibility — popular for large government and enterprise sites.",
  Flash: "Adobe Flash — a browser plugin for animations and video — deprecated as the web moved to HTML5.",
  Gemini: "Google's family of multimodal AI models — successors to PaLM and competitors to GPT and Claude.",
  Helm: "A package manager for Kubernetes — installs and upgrades applications as versioned chart releases.",
  Joomla: "A PHP CMS with a strong extension ecosystem — widely used for community and small-business sites.",
  Kafka: "Apache Kafka — a distributed event streaming platform for high-throughput real-time data pipelines.",
  Kotlin: "A modern language from JetBrains — officially supported for Android and interoperable with Java.",
  Llama: "Meta's open family of large language models — released weights that sparked an open-source AI wave.",
  Log4Shell: "A critical 2021 vulnerability in Log4j — remote code execution via crafted log messages.",
  LTS: "Long-term support — a release branch maintained with security fixes for years, common in Linux and Node.",
  Nexus: "Google's earlier line of reference Android phones — showcased new OS versions before the Pixel era.",
  OEM: "Original equipment manufacturer — a company that builds devices sold under another brand's name.",
  Pixel: "Google's flagship smartphone line — showcases Android features and camera software each year.",
  Rust: "A systems language emphasizing memory safety without garbage collection — fast adoption in infrastructure.",
  Sass: "Syntactically Awesome StyleSheets — a CSS preprocessor adding variables, nesting, and mixins.",
  "Spring Boot": "A Java framework for production-ready apps — auto-configuration and embedded servers for microservices.",
  Swift: "Apple's language for iOS, macOS, and server apps — designed for safety and performance.",
  Symfony: "A PHP framework and component library — enterprise web apps and APIs across Europe.",
  Symbian: "A mobile OS that dominated pre-iPhone smartphones — Nokia's primary platform before Android.",
  TypeScript: "JavaScript with static types — compiles to JS and powers large front-end and Node codebases.",
  Uniswap: "A decentralized exchange protocol on Ethereum — automated market makers for token swaps.",
  WebKit: "Apple's open-source browser engine — powers Safari and historically influenced Chrome's fork.",
  Zig: "A systems programming language — explicit control, no hidden allocations, and a focus on simplicity.",

  // Batch 21 — web stack, languages, legal
  ACID: "Atomicity, consistency, isolation, durability — properties guaranteeing reliable database transactions.",
  ALGOL: "Algorithmic Language — an influential family of languages that introduced structured programming and block syntax.",
  agile: "An iterative software development style — short cycles, continuous feedback, and adaptive planning.",
  Autoprefixer: "A PostCSS tool that adds vendor prefixes to CSS — keeps stylesheets working across browsers automatically.",
  AWS: "Amazon Web Services — the dominant cloud platform for compute, storage, and managed infrastructure.",
  Bitbucket: "Atlassian's Git hosting service — repos, pull requests, and CI pipelines for development teams.",
  "C#": "A modern language from Microsoft — runs on the CLR and powers enterprise Windows and cross-platform apps.",
  CLR: "Common Language Runtime — the virtual machine that executes .NET assemblies and manages memory.",
  CSS: "Cascading Style Sheets — the language for layout, color, and typography on web pages.",
  Cypress: "An end-to-end testing framework for web apps — runs tests in a real browser with time-travel debugging.",
  DMCA: "Digital Millennium Copyright Act — U.S. law on DRM circumvention and online copyright safe harbors.",
  DRM: "Digital rights management — technology restricting how users copy or play media and software.",
  ECMAScript: "The standardized specification for JavaScript — ES3, ES6, and later editions define the language.",
  FFmpeg: "A multimedia toolkit — encodes, decodes, and streams audio and video in hundreds of formats.",
  Firefox: "Mozilla's open-source browser — championed web standards and challenged Internet Explorer's dominance.",
  FTP: "File Transfer Protocol — a classic protocol for uploading and downloading files over networks.",
  generics: "Type parameters in languages — write one class or function that works with many types safely.",
  Grok: "xAI's conversational AI model — positioned as a real-time, less filtered alternative to ChatGPT.",
  Hudson: "An early Java continuous-integration server — forked into Jenkins after a trademark dispute.",
  IE: "Internet Explorer — Microsoft's browser that dominated the web in the 1990s and 2000s.",
  "Internet Explorer": "Microsoft's long-running web browser — bundled with Windows for decades before Edge replaced it.",
  iTunes: "Apple's media storefront and library — defined how users bought music and synced iPods.",
  Jamstack: "JavaScript, APIs, and markup — sites built as static front ends with serverless backends.",
  Java: "A portable language running on the JVM — dominant in enterprise servers, Android, and big data.",
  Jira: "Atlassian's issue tracker — workflows, boards, and JQL queries for software team project management.",
  LINQ: "Language Integrated Query — C# syntax for querying collections, databases, and XML in one style.",
  Lua: "A lightweight embeddable scripting language — used in game engines, nginx, and Redis scripting.",
  Magento: "An open-source e-commerce platform — storefronts, catalogs, and checkout for online retailers.",
  Maven: "A Java build and dependency tool — standardized project structure and artifact repositories.",
  Mono: "An open-source implementation of .NET — ran C# on Linux and macOS before .NET Core.",
  Mozilla: "The organization behind Firefox — advocates open web standards and internet privacy.",
  Netlify: "A platform for deploying static sites and serverless functions — Git push to production.",
  nginx: "A high-performance web server and reverse proxy — event-driven design for massive concurrency.",
  Node: "Node.js — JavaScript on the server via an event-driven runtime built on V8.",
  "Node.js": "A JavaScript runtime built on V8 — event-driven I/O for servers, CLIs, and tooling.",
  OpenOffice: "An open-source office suite — word processor, spreadsheet, and presentation apps.",
  PrestaShop: "An open-source e-commerce platform — PHP-based online store builder popular in Europe.",
  Qwen: "Alibaba's family of open large language models — multilingual text and code generation.",
  React: "A JavaScript library for building UIs — component trees and declarative rendering for the web.",
  Redis: "An in-memory data store — used for caching, queues, pub/sub, and real-time features.",
  Rollup: "A JavaScript module bundler — tree-shaking and efficient production builds for libraries.",
  Slack: "A team messaging app — channels, integrations, and the default chat layer for many companies.",
  Sora: "OpenAI's text-to-video model — generates short clips from natural language descriptions.",
  SSR: "Server-side rendering — HTML generated on the server for faster first paint and SEO.",
  Subversion: "SVN — a centralized version control system predating Git's distributed model.",
  Tailwind: "A utility-first CSS framework — compose designs from small classes instead of custom stylesheets.",
  Teams: "Microsoft Teams — chat, video calls, and Office integration for workplace collaboration.",
  "Turing Award": "The ACM's highest honor in computing — often called the Nobel Prize of computer science.",
  Vercel: "A platform for front-end deployment — hosts Next.js and static sites with edge functions.",
  Vite: "A fast front-end build tool — instant dev server and optimized production bundling.",
  XMLHttpRequest: "The browser API for async HTTP requests — enabled AJAX and dynamic web apps before fetch.",
  Yarn: "A JavaScript package manager — alternative to npm with lockfiles and workspace monorepo support.",
  ".NET Framework": "Microsoft's original managed runtime for Windows — CLR, BCL, and WinForms/ASP.NET stacks.",

  // Batch 22 — remaining long tail
  Bitcoin: "The first decentralized cryptocurrency — a proof-of-work blockchain without a central issuer.",
  Copilot: "An AI coding assistant — suggests completions and edits inside the editor as you type.",
  "C++": "An extension of C with classes, templates, and RAII — dominant for games, browsers, and systems code.",
  "DEF CON": "The world's largest hacker convention — security research, talks, and contests in Las Vegas.",
  DRY: "Don't Repeat Yourself — avoid duplicating logic; one authoritative source for each piece of knowledge.",
  FORMAC: "FORmula MANipulation Compiler — an early language for symbolic mathematics on computers.",
  GitHub: "A platform for Git hosting, pull requests, and CI — the center of open-source collaboration.",
  IDF: "Inverse document frequency — a search ranking signal that weights rare terms more heavily.",
  OAuth: "An authorization framework — lets apps access user data without sharing passwords.",
  "OpenID Connect": "An identity layer on OAuth 2.0 — standardized login with ID tokens and user profiles.",
  "proof-of-work": "A consensus mechanism — miners compete to solve puzzles to validate blocks and earn rewards.",
  Quicksort: "A divide-and-conquer sorting algorithm — average O(n log n) and still taught in every algorithms course.",
  "Stack Overflow": "A Q&A site for programmers — voting, accepted answers, and the default search result for error messages.",
  WordPress: "A PHP CMS powering millions of sites — themes, plugins, and the block editor for publishing.",
  "Visual Studio": "Microsoft's IDE — editing, debugging, and profiling for .NET, C++, and web projects.",

  // Batch 23 — tail: Apple, AI, standards
  "App Store": "Apple's marketplace for iOS apps — centralized distribution and in-app purchases on iPhone.",
  "Apple Pay": "Apple's contactless payment system — tokenized card data on iPhone and the web.",
  agentic: "AI systems that plan and execute multi-step tasks autonomously — tools, browsing, and sub-agents.",
  ChatGPT: "OpenAI's conversational chat product — brought large language models to hundreds of millions of users.",
  ES3: "ECMAScript 3 — the 1999 JavaScript standard adding regex, try/catch, and widely deployed language features.",
  "Face ID": "Apple's facial recognition unlock — depth-sensing cameras map the face for secure authentication.",
  GeOS: "Graphic Environment Operating System — a GUI OS for PDAs and early smartphones like the Nokia Communicator.",
  GPT: "Generative Pre-trained Transformer — OpenAI's family of large language models from GPT-1 through GPT-5.",
  "imitation game": "Turing's conversational test for machine intelligence — if replies match a human, capability matters more than definition.",
  LTE: "Long-Term Evolution — 4G cellular data standard delivering mobile broadband speeds.",
  Lightning: "Apple's reversible connector — replaced the 30-pin dock on iPhone and powered MagSafe accessories.",
  MagSafe: "Apple's magnetic wireless charging and accessory system — snap-on alignment for power and cases.",
  multimodal: "AI models that process multiple input types — text, images, audio, and video in one system.",
  OLED: "Organic light-emitting diode display — self-lit pixels enable thin screens and deep blacks on phones.",
  OLPC: "One Laptop per Child — a project to build low-cost education laptops for developing regions.",
  OpenAI: "An AI research company — created GPT, ChatGPT, DALL-E, and the o-series reasoning models.",
  PDA: "Personal digital assistant — a pocket device for calendar, contacts, and email before smartphones.",
  patent: "A legal grant of exclusive rights to an invention — central to tech litigation and cross-licensing deals.",
  phreaking: "Exploring telephone networks illegally — early hackers used tone boxes to route free long-distance calls.",
  ProMotion: "Apple's adaptive 120Hz display technology — smooth scrolling and lower power when content is static.",
  reasoning: "Step-by-step logical thinking in AI models — chain-of-thought before answering hard problems.",
  Shopware: "A German e-commerce platform — open-source and commercial editions for online retail.",
  "Silicon Valley Bank": "A bank serving startups and venture capital — its 2023 collapse shocked the tech funding ecosystem.",
  Turing: "Alan Turing — mathematician who defined computability, broke Enigma, and posed the imitation game.",
  WebRTC: "Web Real-Time Communication — browser APIs for peer-to-peer video, audio, and data without plugins.",
  "data breach": "Unauthorized exposure of private records — customer data, credentials, or internal files leaked or stolen.",
  "machine intelligence": "The capability of machines to perform tasks requiring human-like cognition — Turing's framing of AI.",
  "open source": "Software whose source code is freely available to use, modify, and redistribute.",
  AR: "Augmented reality — overlaying digital graphics on the real world through a camera view.",
  bcrypt: "A password hashing function — slow by design to resist brute-force attacks on stolen databases.",
  Facebook: "The social network founded by Mark Zuckerberg — grew into Meta and reshaped online advertising.",
  iOS: "Apple's mobile operating system — runs iPhone and iPad with a sandboxed app ecosystem.",
  ".NET 6": "A cross-platform .NET release — unified runtime for Linux, macOS, and Windows in 2021.",
  Sun: "Sun Microsystems — maker of Java, Solaris, and SPARC; acquired by Oracle in 2010.",
  "computational photography": "Using software and multiple exposures to improve photos — Night mode and HDR on modern phones.",
  Microsoft: "The software giant behind Windows, Office, Azure, and Xbox — founded by Bill Gates and Paul Allen.",
  "statistical computing": "Analyzing data with software — distributions, regression, and visualization in tools like R and Python.",
  "civic hacking": "Volunteer technologists building open tools for government transparency and public services.",
  "open data": "Government and institutional datasets published for public reuse — APIs, portals, and transparency dashboards.",

  // Batch 24 — conferences, crypto hashes, platforms, browsers
  WWDC: "Apple Worldwide Developers Conference — annual June keynote and sessions for iOS, macOS, and Apple platform developers.",
  SHA: "Secure Hash Algorithm — a family of cryptographic hash functions used for integrity checks and content addressing.",
  "SHA-1": "Secure Hash Algorithm 1 — a 160-bit hash used in Git object IDs and legacy web certificates.",
  "SHA-256": "Secure Hash Algorithm 256-bit — a SHA-2 hash used in Bitcoin, TLS, and modern digital signatures.",
  "Google I/O": "Google's annual developer conference — Android, cloud, AI, and web platform announcements.",
  "re:Invent": "Amazon Web Services' annual conference — launches services like Lambda and major cloud infrastructure news.",
  HOPL: "History of Programming Languages — an ACM conference series documenting how major languages were designed.",
  Git: "A distributed version control system — commits, branches, and merges for tracking source code history.",
  Clang: "LLVM's C, C++, and Objective-C compiler front end — fast diagnostics and an embeddable parser for tools.",
  Xcode: "Apple's integrated development environment for iOS, macOS, watchOS, and visionOS applications.",
  ARM: "A CPU architecture family known for energy efficiency — dominates smartphones and growing in servers and laptops.",
  npm: "Node Package Manager — the default registry and CLI for installing JavaScript and TypeScript libraries.",
  SSH: "Secure Shell — encrypted remote login, command execution, and file transfer over networks.",
  Safari: "Apple's web browser — built on WebKit for macOS, iOS, and iPadOS.",
  Chrome: "Google's web browser — built on Chromium and the most widely used browser worldwide.",
  HTML5: "The fifth major HTML revision — native audio, video, canvas, and APIs without browser plugins.",
  ISO: "International Organization for Standardization — publishes specs including C, C++, and Fortran standards.",
  IETF: "Internet Engineering Task Force — develops RFC standards for TCP/IP, HTTP, DNS, and other internet protocols.",
  ECMA: "Ecma International — the standards body that maintains ECMAScript, the specification behind JavaScript.",
  Azure: "Microsoft's cloud platform — virtual machines, storage, databases, and managed application services.",
  JVM: "Java Virtual Machine — executes Java bytecode and hosts Kotlin, Scala, Clojure, and other JVM languages.",
  "ASP.NET": "Microsoft's framework for building web applications and APIs on the .NET platform.",
  V8: "Google's open-source JavaScript engine — powers Chrome, Node.js, and many embedded runtimes.",
  Gradle: "A build automation tool for Java, Kotlin, and Android projects using a flexible task model.",
  OpenSSL: "Open-source library implementing TLS, SSL, and general-purpose cryptography — ubiquitous in HTTPS servers.",
  CVE: "Common Vulnerabilities and Exposures — a public dictionary of known security flaw identifiers.",
  CUDA: "NVIDIA's parallel computing platform — lets developers run general code on GPUs for ML and simulation.",
  Edge: "Microsoft's Chromium-based web browser — the default on Windows, replacing Internet Explorer.",
  macOS: "Apple's desktop operating system — runs on Mac hardware with Unix foundations and the Cocoa UI framework.",
  "App Engine": "Google Cloud's managed platform for deploying web apps without provisioning servers manually.",
  Heroku: "A platform-as-a-service for deploying web applications — popular for Ruby, Node, and early cloud apps.",
  GCP: "Google Cloud Platform — Google's suite of cloud infrastructure and managed developer services.",
  "AWS Lambda": "Amazon's serverless compute service — runs functions on demand without managing virtual machines.",
  PNG: "Portable Network Graphics — a lossless raster image format with transparency support on the web.",
  iPhone: "Apple's smartphone line — touch-first mobile computing and the App Store ecosystem since 2007.",
  iPad: "Apple's tablet computer line — larger touch screens between phones and laptops.",
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
