import { Link } from "@tanstack/react-router";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

import { PresetToggle } from "#/components/preset-toggle";
import { ThemeToggle } from "#/components/theme-toggle";
import type { BlogEntry } from "#/content/content";

export function ContentIndex({
  description,
  entries,
  title,
}: {
  readonly description: string;
  readonly entries: Array<BlogEntry>;
  readonly title: string;
}) {
  return (
    <div className="content-index-page">
      <header className="content-index-header">
        <div>
          <Link to="/" className="gallery-back-link">
            <ArrowLeftIcon aria-hidden="true" /> Back to site
          </Link>
          <p className="block-eyebrow">Optional content module</p>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <div className="gallery-theme-controls">
          <PresetToggle />
          <ThemeToggle />
        </div>
      </header>
      <main className="content-entry-list">
        {entries.map((entry) => (
          <article key={entry.metadata.slug}>
            <div>
              <time dateTime={entry.metadata.publishedAt}>{entry.metadata.publishedAt}</time>
              <span>{entry.metadata.readingMinutes} min read</span>
            </div>
            <h2>{entry.metadata.title}</h2>
            <p>{entry.metadata.description}</p>
            <Link to="/blog/$slug/" params={{ slug: entry.metadata.slug }}>
              Read article <ArrowRightIcon aria-hidden="true" />
            </Link>
          </article>
        ))}
      </main>
    </div>
  );
}
