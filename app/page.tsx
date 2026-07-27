import Link from "next/link";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <section className="space-y-6">
        <p className="font-mono text-sm tracking-[0.25em] text-accent uppercase">
          Static timeline · SEO-ready
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          The story of computing, wired to primary sources.
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-muted">
          Inventions, protocols, quotes, memes, and the modern AI race — curated as
          monthly buckets of JSON, rendered as shareable pages.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/timeline"
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-background hover:bg-accent/90"
          >
            Explore timeline
          </Link>
          <a
            href="https://github.com"
            className="rounded-full border border-border px-5 py-2.5 text-sm text-muted hover:border-foreground/30 hover:text-foreground"
          >
            Data in <code className="font-mono text-xs">content/timeline</code>
          </a>
        </div>
      </section>

      <section className="mt-20 grid gap-4 sm:grid-cols-3">
        {[
          {
            title: "Monthly buckets",
            body: "One JSON file per month (or year/decade when dates are fuzzy).",
          },
          {
            title: "Rich entries",
            body: "YouTube, links, memes, and a short narrative on why each moment matters.",
          },
          {
            title: "Shareable URLs",
            body: "Every event gets its own page for SEO and deep links.",
          },
        ].map((item) => (
          <article
            key={item.title}
            className="rounded-2xl border border-border bg-surface p-5"
          >
            <h2 className="font-medium text-foreground">{item.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
