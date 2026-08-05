import { Link } from "@tanstack/react-router";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useEffect, useRef } from "react";

import type { DocsEntry } from "#/content/content";
import type { Locale } from "#/i18n";

import { docsCopy, docsSections, DocsShell } from "./docs-shell";

const indexCopy = {
  en: {
    eyebrow: "TanSail documentation",
    title: "Build, customize, and ship with TanSail",
    description:
      "Learn the project structure, design contract, presets, page recipes, agent workflows, quality gates, and Cloudflare delivery path.",
    read: "Read guide",
    stats: ["13 guides", "2 locales", "0 required secrets"],
  },
  zh: {
    eyebrow: "TanSail 官方文档",
    title: "从第一次运行，到完成网站交付",
    description:
      "系统了解 TanSail 的项目结构、设计契约、视觉预设、页面配方、Agent 工作流、质量检查与 Cloudflare 部署。",
    read: "阅读指南",
    stats: ["13 篇指南", "2 种语言", "0 个必需密钥"],
  },
};

export function DocsIndex({
  entries,
  locale,
}: {
  readonly entries: Array<DocsEntry>;
  readonly locale: Locale;
}) {
  const copy = indexCopy[locale];

  return (
    <DocsShell entries={entries} locale={locale}>
      <section className="docs-index-hero">
        <p>{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <p>{copy.description}</p>
        <ul>
          {copy.stats.map((stat) => (
            <li key={stat}>{stat}</li>
          ))}
        </ul>
      </section>

      <div className="docs-index-sections">
        {docsSections.map((section) => {
          const sectionEntries = entries.filter((entry) => entry.metadata.section === section);
          if (!sectionEntries.length) return null;

          return (
            <section className="docs-index-section" key={section}>
              <h2>{docsCopy[locale].sections[section]}</h2>
              <div className="docs-index-grid">
                {sectionEntries.map((entry) => (
                  <article key={entry.metadata.slug}>
                    <h3>{entry.metadata.title}</h3>
                    <p>{entry.metadata.description}</p>
                    <Link
                      params={{ locale, slug: entry.metadata.slug }}
                      preload="intent"
                      to="/docs/$locale/$slug/"
                    >
                      {copy.read} <ArrowRightIcon aria-hidden="true" />
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </DocsShell>
  );
}

function useCodeCopyButtons(
  articleRef: React.RefObject<HTMLElement | null>,
  locale: Locale,
  slug: string,
) {
  useEffect(() => {
    const article = articleRef.current;
    if (!article) return;

    const buttons = Array.from(article.querySelectorAll("pre")).map((block) => {
      const button = document.createElement("button");
      const idleLabel = locale === "zh" ? "复制" : "Copy";
      const copiedLabel = locale === "zh" ? "已复制" : "Copied";
      button.className = "docs-code-copy";
      button.type = "button";
      button.setAttribute("aria-label", locale === "zh" ? "复制代码" : "Copy code");
      button.textContent = idleLabel;
      button.addEventListener("click", async () => {
        const code = block.querySelector("code")?.textContent ?? block.textContent ?? "";
        await navigator.clipboard.writeText(code);
        button.dataset.copied = "true";
        button.textContent = copiedLabel;
        window.setTimeout(() => {
          button.dataset.copied = "false";
          button.textContent = idleLabel;
        }, 1600);
      });
      block.append(button);
      return button;
    });

    return () => buttons.forEach((button) => button.remove());
  }, [articleRef, locale, slug]);
}

export function DocsArticle({
  entries,
  entry,
  locale,
}: {
  readonly entries: Array<DocsEntry>;
  readonly entry: DocsEntry;
  readonly locale: Locale;
}) {
  const { Component, metadata } = entry;
  const articleRef = useRef<HTMLElement>(null);
  const currentIndex = entries.findIndex((candidate) => candidate.metadata.slug === metadata.slug);
  const previous = currentIndex > 0 ? entries[currentIndex - 1] : undefined;
  const next = currentIndex < entries.length - 1 ? entries[currentIndex + 1] : undefined;
  const documentDate = metadata.updatedAt;
  useCodeCopyButtons(articleRef, locale, metadata.slug);

  return (
    <DocsShell activeEntry={entry} entries={entries} locale={locale}>
      <article className="docs-article mdx-article" ref={articleRef}>
        <div className="docs-article-meta">
          <span>
            {locale === "zh"
              ? `${metadata.readingMinutes} 分钟阅读`
              : `${metadata.readingMinutes} min read`}
          </span>
          {documentDate ? (
            <time dateTime={documentDate}>
              {locale === "zh" ? "更新于 " : "Updated "}
              {documentDate}
            </time>
          ) : null}
        </div>
        <Component />
      </article>

      <nav
        className="docs-pagination"
        aria-label={locale === "zh" ? "相邻文档" : "Adjacent documentation"}
      >
        {previous ? (
          <Link params={{ locale, slug: previous.metadata.slug }} to="/docs/$locale/$slug/">
            <ArrowLeftIcon aria-hidden="true" />
            <span>
              <small>{locale === "zh" ? "上一篇" : "Previous"}</small>
              {previous.metadata.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link params={{ locale, slug: next.metadata.slug }} to="/docs/$locale/$slug/">
            <span>
              <small>{locale === "zh" ? "下一篇" : "Next"}</small>
              {next.metadata.title}
            </span>
            <ArrowRightIcon aria-hidden="true" />
          </Link>
        ) : null}
      </nav>
    </DocsShell>
  );
}
