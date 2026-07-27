import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="font-mono text-sm tracking-[0.2em] text-accent uppercase">
            Techline
          </span>
          <span className="hidden text-sm text-muted sm:inline">IT history, month by month</span>
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link
            href="/timeline"
            className="text-muted hover:text-foreground"
          >
            Timeline
          </Link>
        </nav>
      </div>
    </header>
  );
}
