import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-black bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-mono text-sm tracking-[0.2em] text-black uppercase">
          Techline
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link href="/" className="text-black underline-offset-4 hover:underline">
            Timeline
          </Link>
        </nav>
      </div>
    </header>
  );
}
