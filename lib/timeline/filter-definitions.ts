import type { TimelineEvent } from "./schema";

export type TimelineFilterDef = {
  id: string;
  label: string;
  matches: (event: TimelineEvent) => boolean;
};

export type TimelineFilterGroup = {
  id: string;
  label: string;
  filters: TimelineFilterDef[];
};

const WEB_TAGS = new Set([
  "web",
  "web-framework",
  "cms",
  "ecommerce",
  "saas",
  "crm",
  "frontend",
  "spa",
  "ssr",
  "cgi",
  "middleware",
  "aspnet",
  "nextjs",
  "virtual-dom",
  "api",
  "jamstack",
  "headless",
  "wiki",
]);

const DATA_TAGS = new Set([
  "database",
  "sql",
  "nosql",
  "orm",
  "sequel",
  "redis",
  "postgres",
  "postgresql",
  "mysql",
  "mongodb",
  "analytics",
  "rdbms",
  "document-store",
  "search",
]);

const INFRASTRUCTURE_TAGS = new Set([
  "devops",
  "linux",
  "unix",
  "cloud",
  "docker",
  "kubernetes",
  "k8s",
  "git",
  "ci",
  "continuous-integration",
  "container",
  "containers",
  "deployment",
  "nginx",
  "apache",
  "infrastructure",
  "iac",
  "orchestration",
  "package-manager",
  "ide",
  "operating-system",
]);

const NETWORKING_TAGS = new Set([
  "protocol",
  "internet",
  "tcp",
  "tcp-ip",
  "http",
  "https",
  "dns",
  "email",
  "ietf",
  "rfc",
  "networking",
  "websocket",
  "websockets",
  "tls",
  "ssl",
  "ftp",
  "ssh",
  "uri",
  "url",
  "distributed-systems",
  "concurrency",
]);

const HARDWARE_TAGS = new Set([
  "hardware",
  "semiconductor",
  "chip",
  "cpu",
  "gpu",
  "pc",
  "laptop",
  "embedded",
  "integrated-circuit",
  "mainframe",
  "minicomputer",
  "workstation",
  "microcomputer",
  "microprocessor",
  "smartphone",
  "server",
  "supercomputer",
  "computer-architecture",
  "stored-program",
  "error-correction",
]);

const SECURITY_TAGS = new Set([
  "security",
  "cryptography",
  "encryption",
  "privacy",
  "authentication",
  "authorization",
  "pgp",
  "public-key",
]);

const MOBILE_TAGS = new Set([
  "mobile",
  "smartphone",
  "ios",
  "android",
  "iphone",
  "app-store",
  "flutter",
  "react-native",
]);

const LANGUAGE_TAGS = new Set([
  "programming-language",
  "compiler",
  "runtime",
  "jvm",
  "llvm",
  "bytecode",
  "oop",
  "transpiler",
  "build-tool",
  "assembly",
  "cpp",
]);

const AI_TAGS = new Set([
  "ai",
  "machine-learning",
  "deep-learning",
  "llm",
  "neural-networks",
  "generative-ai",
  "logic-programming",
  "computer-vision",
]);

const STANDARDS_TAGS = new Set(["standard", "ansi", "iso", "w3c", "international-standard"]);

function hasTag(event: TimelineEvent, ...tags: string[]): boolean {
  return tags.some((tag) => event.tags.includes(tag));
}

function hasAnyTag(event: TimelineEvent, tags: Set<string>): boolean {
  return event.tags.some((tag) => tags.has(tag));
}

const TOPIC_FILTERS: TimelineFilterDef[] = [
  {
    id: "languages",
    label: "Languages",
    matches: (event) => hasAnyTag(event, LANGUAGE_TAGS),
  },
  {
    id: "web",
    label: "Web",
    matches: (event) =>
      hasAnyTag(event, WEB_TAGS) ||
      hasTag(
        event,
        "react",
        "vue",
        "angular",
        "angularjs",
        "graphql",
        "nodejs",
        "css",
        "html",
        "webpack",
        "npm",
        "jquery",
        "bootstrap",
        "wordpress",
        "drupal",
        "rails",
        "django",
        "laravel",
        "spring",
        "dotnet",
        "javascript",
        "ecmascript",
      ),
  },
  {
    id: "browser",
    label: "Browser",
    matches: (event) => hasTag(event, "browser"),
  },
  {
    id: "mobile",
    label: "Mobile",
    matches: (event) => hasAnyTag(event, MOBILE_TAGS),
  },
  {
    id: "ai",
    label: "AI",
    matches: (event) => event.category === "ai" || hasAnyTag(event, AI_TAGS),
  },
  {
    id: "database",
    label: "Data",
    matches: (event) => hasAnyTag(event, DATA_TAGS),
  },
  {
    id: "infrastructure",
    label: "Infrastructure",
    matches: (event) => hasAnyTag(event, INFRASTRUCTURE_TAGS),
  },
  {
    id: "networking",
    label: "Networking",
    matches: (event) => event.category === "protocol" || hasAnyTag(event, NETWORKING_TAGS),
  },
  {
    id: "hardware",
    label: "Hardware",
    matches: (event) => event.category === "hardware" || hasAnyTag(event, HARDWARE_TAGS),
  },
  {
    id: "security",
    label: "Security",
    matches: (event) => hasAnyTag(event, SECURITY_TAGS),
  },
  {
    id: "open-source",
    label: "Open Source",
    matches: (event) => hasTag(event, "open-source"),
  },
  {
    id: "standards",
    label: "Standards",
    matches: (event) => hasAnyTag(event, STANDARDS_TAGS),
  },
  {
    id: "companies",
    label: "Companies",
    matches: (event) =>
      event.category === "company" || hasTag(event, "founding", "ipo", "acquisition"),
  },
  {
    id: "culture",
    label: "Culture",
    matches: (event) =>
      event.category === "culture" ||
      hasTag(event, "computer-science", "algorithms", "typography", "information-theory", "complexity-theory"),
  },
  {
    id: "quotes",
    label: "Quotes",
    matches: (event) => event.category === "quote" || hasTag(event, "quote"),
  },
];

const LANGUAGE_FILTERS: TimelineFilterDef[] = [
  { id: "lang-c", label: "C", matches: (e) => hasTag(e, "c") && !hasTag(e, "cpp", "csharp", "objective-c", "zig") },
  { id: "lang-cpp", label: "C++", matches: (e) => hasTag(e, "cpp") },
  { id: "lang-csharp", label: "C#", matches: (e) => hasTag(e, "csharp") },
  { id: "lang-java", label: "Java", matches: (e) => hasTag(e, "java") },
  { id: "lang-javascript", label: "JavaScript", matches: (e) => hasTag(e, "javascript", "ecmascript") },
  { id: "lang-typescript", label: "TypeScript", matches: (e) => hasTag(e, "typescript") },
  { id: "lang-python", label: "Python", matches: (e) => hasTag(e, "python") },
  { id: "lang-ruby", label: "Ruby", matches: (e) => hasTag(e, "ruby") && !hasTag(e, "crystal") },
  { id: "lang-php", label: "PHP", matches: (e) => hasTag(e, "php") },
  { id: "lang-go", label: "Go", matches: (e) => hasTag(e, "go", "golang") },
  { id: "lang-rust", label: "Rust", matches: (e) => hasTag(e, "rust") },
  { id: "lang-swift", label: "Swift", matches: (e) => hasTag(e, "swift") },
  { id: "lang-kotlin", label: "Kotlin", matches: (e) => hasTag(e, "kotlin") },
  { id: "lang-fortran", label: "Fortran", matches: (e) => hasTag(e, "fortran") },
  { id: "lang-lisp", label: "Lisp", matches: (e) => hasTag(e, "lisp") },
  { id: "lang-cobol", label: "COBOL", matches: (e) => hasTag(e, "cobol") },
  { id: "lang-pascal", label: "Pascal", matches: (e) => hasTag(e, "pascal", "delphi") },
  { id: "lang-basic", label: "BASIC", matches: (e) => hasTag(e, "basic") },
  { id: "lang-ada", label: "Ada", matches: (e) => hasTag(e, "ada") },
  { id: "lang-haskell", label: "Haskell", matches: (e) => hasTag(e, "haskell") },
  { id: "lang-erlang", label: "Erlang", matches: (e) => hasTag(e, "erlang") },
  { id: "lang-elixir", label: "Elixir", matches: (e) => hasTag(e, "elixir") },
  { id: "lang-prolog", label: "Prolog", matches: (e) => hasTag(e, "prolog") },
  { id: "lang-perl", label: "Perl", matches: (e) => hasTag(e, "perl") },
  { id: "lang-lua", label: "Lua", matches: (e) => hasTag(e, "lua") },
  { id: "lang-r", label: "R", matches: (e) => hasTag(e, "r") },
  { id: "lang-scala", label: "Scala", matches: (e) => hasTag(e, "scala") },
  { id: "lang-fsharp", label: "F#", matches: (e) => hasTag(e, "fsharp") },
  { id: "lang-dart", label: "Dart", matches: (e) => hasTag(e, "dart") },
  { id: "lang-zig", label: "Zig", matches: (e) => hasTag(e, "zig") },
  { id: "lang-objective-c", label: "Objective-C", matches: (e) => hasTag(e, "objective-c") },
  { id: "lang-matlab", label: "MATLAB", matches: (e) => hasTag(e, "matlab") },
  { id: "lang-groovy", label: "Groovy", matches: (e) => hasTag(e, "groovy") },
  { id: "lang-ocaml", label: "OCaml", matches: (e) => hasTag(e, "ocaml") },
  { id: "lang-visual-basic", label: "Visual Basic", matches: (e) => hasTag(e, "visual-basic") },
  { id: "lang-awk", label: "AWK", matches: (e) => hasTag(e, "awk") },
  { id: "lang-bash", label: "Bash", matches: (e) => hasTag(e, "bash") },
  { id: "lang-tcl", label: "Tcl", matches: (e) => hasTag(e, "tcl") },
  { id: "lang-actionscript", label: "ActionScript", matches: (e) => hasTag(e, "actionscript") },
  { id: "lang-crystal", label: "Crystal", matches: (e) => hasTag(e, "crystal") },
  { id: "lang-algol", label: "ALGOL", matches: (e) => hasTag(e, "algol") },
  { id: "lang-simula", label: "Simula", matches: (e) => hasTag(e, "simula") },
];

const TECHNOLOGY_FILTERS: TimelineFilterDef[] = [
  { id: "tech-git", label: "Git", matches: (e) => hasTag(e, "git") },
  { id: "tech-docker", label: "Docker", matches: (e) => hasTag(e, "docker") },
  { id: "tech-kubernetes", label: "Kubernetes", matches: (e) => hasTag(e, "kubernetes", "k8s") },
  { id: "tech-linux", label: "Linux", matches: (e) => hasTag(e, "linux") },
  { id: "tech-nginx", label: "nginx", matches: (e) => hasTag(e, "nginx") },
  { id: "tech-apache", label: "Apache", matches: (e) => hasTag(e, "apache") },
  { id: "tech-npm", label: "npm", matches: (e) => hasTag(e, "npm") },
  { id: "tech-jenkins", label: "Jenkins", matches: (e) => hasTag(e, "jenkins") },
  { id: "tech-redis", label: "Redis", matches: (e) => hasTag(e, "redis") },
  { id: "tech-postgres", label: "PostgreSQL", matches: (e) => hasTag(e, "postgres", "postgresql") },
  { id: "tech-mysql", label: "MySQL", matches: (e) => hasTag(e, "mysql") },
  { id: "tech-graphql", label: "GraphQL", matches: (e) => hasTag(e, "graphql") },
];

export const TIMELINE_FILTER_GROUPS: TimelineFilterGroup[] = [
  { id: "theme", label: "Theme", filters: TOPIC_FILTERS },
  { id: "languages", label: "Language", filters: LANGUAGE_FILTERS },
  { id: "technologies", label: "Technology", filters: TECHNOLOGY_FILTERS },
];
