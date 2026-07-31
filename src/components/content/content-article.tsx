import { Link } from "@tanstack/react-router";
import { ArrowLeftIcon } from "lucide-react";

import { StructuredData } from "#/components/content/structured-data";
import { PresetToggle } from "#/components/preset-toggle";
import { ThemeToggle } from "#/components/theme-toggle";
import { siteConfig } from "#/config/site";
import type { ContentEntry } from "#/content/content";
import { createArticleJsonLd } from "#/lib/structured-data";

export function ContentArticle({ entry }: { readonly entry: ContentEntry }) {
  const { Component, metadata } = entry;
  const jsonLd = createArticleJsonLd({
    title: metadata.title,
    description: metadata.description,
    publishedAt: metadata.publishedAt,
    slug: metadata.slug,
    siteName: siteConfig.metadata.name,
    siteUrl: siteConfig.metadata.siteUrl,
  });

  return (
    <div className="content-article-page">
      <StructuredData data={jsonLd} />
      <header className="content-article-toolbar">
        <Link to={entry.kind === "blog" ? "/blog" : "/docs"}>
          <ArrowLeftIcon aria-hidden="true" /> Back to {entry.kind}
        </Link>
        <div>
          <PresetToggle />
          <ThemeToggle />
        </div>
      </header>
      <article className="mdx-article">
        <div className="mdx-meta">
          <time dateTime={metadata.publishedAt}>{metadata.publishedAt}</time>
          <span>{metadata.readingMinutes} min read</span>
        </div>
        <Component />
      </article>
    </div>
  );
}
