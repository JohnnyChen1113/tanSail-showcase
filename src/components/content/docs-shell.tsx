import { Link } from "@tanstack/react-router";
import {
  ArrowLeftIcon,
  BookOpenIcon,
  CodeXmlIcon,
  LanguagesIcon,
  MenuIcon,
  SearchIcon,
} from "lucide-react";
import { useState } from "react";

import { TanSailMark } from "#/components/site/tansail-mark";
import { ThemeToggle } from "#/components/theme-toggle";
import { getContentEntry, type DocsEntry } from "#/content/content";
import { getAlternateLocale, getDictionary, type Locale } from "#/i18n";

export type DocsSection = "start" | "design" | "build" | "ship" | "reference";

export const docsSections: ReadonlyArray<DocsSection> = [
  "start",
  "design",
  "build",
  "ship",
  "reference",
];

type DocsCopy = {
  backToSite: string;
  chapters: string;
  github: string;
  language: string;
  onThisPage: string;
  search: string;
  sections: Record<DocsSection, string>;
};

export const docsCopy: Record<Locale, DocsCopy> = {
  en: {
    backToSite: "Back to site",
    chapters: "Browse documentation",
    github: "GitHub",
    language: "阅读中文",
    onThisPage: "On this page",
    search: "Search documentation",
    sections: {
      start: "Get started",
      design: "Design system",
      build: "Build your site",
      ship: "Quality & delivery",
      reference: "Reference",
    },
  },
  zh: {
    backToSite: "返回官网",
    chapters: "浏览文档",
    github: "GitHub",
    language: "Read in English",
    onThisPage: "本页目录",
    search: "搜索文档",
    sections: {
      start: "入门",
      design: "设计系统",
      build: "构建网站",
      ship: "质量与交付",
      reference: "参考",
    },
  },
};

function DocsEntryLink({
  activeSlug,
  entry,
  locale,
}: {
  readonly activeSlug?: string;
  readonly entry: DocsEntry;
  readonly locale: Locale;
}) {
  return (
    <Link
      activeOptions={{ exact: true }}
      className="docs-nav-link"
      data-active={entry.metadata.slug === activeSlug ? "true" : undefined}
      params={{ locale, slug: entry.metadata.slug }}
      preload="intent"
      to="/docs/$locale/$slug/"
    >
      {entry.metadata.title}
    </Link>
  );
}

function DocsNavigation({
  activeSlug,
  entries,
  locale,
}: {
  readonly activeSlug?: string;
  readonly entries: Array<DocsEntry>;
  readonly locale: Locale;
}) {
  const copy = docsCopy[locale];

  return (
    <nav className="docs-chapter-nav" aria-label={copy.chapters}>
      {docsSections.map((section) => {
        const sectionEntries = entries.filter((entry) => entry.metadata.section === section);
        if (!sectionEntries.length) return null;

        return (
          <div className="docs-nav-group" key={section}>
            <p>{copy.sections[section]}</p>
            {sectionEntries.map((entry) => (
              <DocsEntryLink
                activeSlug={activeSlug}
                entry={entry}
                key={entry.metadata.slug}
                locale={locale}
              />
            ))}
          </div>
        );
      })}
    </nav>
  );
}

function DocsSearch({ entries, locale }: { entries: Array<DocsEntry>; locale: Locale }) {
  const [query, setQuery] = useState("");
  const copy = docsCopy[locale];
  const normalizedQuery = query.trim().toLocaleLowerCase(locale);
  const results = normalizedQuery
    ? entries.filter((entry) => {
        const searchableText = [
          entry.metadata.title,
          entry.metadata.description,
          ...entry.metadata.keywords,
          ...entry.metadata.toc.map((item) => item.label),
        ].join(" ");
        return searchableText.toLocaleLowerCase(locale).includes(normalizedQuery);
      })
    : [];

  return (
    <div className="docs-search">
      <SearchIcon aria-hidden="true" />
      <input
        aria-label={copy.search}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={copy.search}
        type="search"
        value={query}
      />
      {query ? (
        <div className="docs-search-results">
          {results.length ? (
            results.map((entry) => (
              <Link
                key={entry.metadata.slug}
                onClick={() => setQuery("")}
                params={{ locale, slug: entry.metadata.slug }}
                preload="intent"
                to="/docs/$locale/$slug/"
              >
                <span>{copy.sections[entry.metadata.section]}</span>
                <strong>{entry.metadata.title}</strong>
              </Link>
            ))
          ) : (
            <p>{locale === "zh" ? "没有匹配的文档" : "No matching documentation"}</p>
          )}
        </div>
      ) : null}
    </div>
  );
}

export function DocsShell({
  activeEntry,
  children,
  entries,
  locale,
}: {
  readonly activeEntry?: DocsEntry;
  readonly children: React.ReactNode;
  readonly entries: Array<DocsEntry>;
  readonly locale: Locale;
}) {
  const copy = docsCopy[locale];
  const dictionary = getDictionary(locale);
  const alternateLocale = getAlternateLocale(locale);
  const alternateEntry = activeEntry
    ? getContentEntry("docs", activeEntry.metadata.slug, alternateLocale)
    : undefined;

  return (
    <div className="docs-page">
      <header className="docs-topbar">
        <div className="docs-brand-lockup">
          <Link aria-label={`TanSail ${copy.backToSite}`} to={locale === "zh" ? "/zh/" : "/en/"}>
            <TanSailMark />
            <strong>TanSail</strong>
          </Link>
          <span>/</span>
          <Link params={{ locale }} to="/docs/$locale/">
            <BookOpenIcon aria-hidden="true" /> Docs
          </Link>
        </div>

        <DocsSearch entries={entries} locale={locale} />

        <div className="docs-topbar-actions">
          {alternateEntry ? (
            <Link
              aria-label={copy.language}
              className="docs-language-link"
              params={{ locale: alternateLocale, slug: alternateEntry.metadata.slug }}
              to="/docs/$locale/$slug/"
            >
              <LanguagesIcon aria-hidden="true" />
              <span>{copy.language}</span>
            </Link>
          ) : (
            <Link
              aria-label={copy.language}
              className="docs-language-link"
              params={{ locale: alternateLocale }}
              to="/docs/$locale/"
            >
              <LanguagesIcon aria-hidden="true" />
              <span>{copy.language}</span>
            </Link>
          )}
          <ThemeToggle dictionary={dictionary} />
          <a
            aria-label={copy.github}
            className="docs-source-link"
            href="https://github.com/JohnnyChen1113/tanSail"
            rel="noopener noreferrer"
            target="_blank"
          >
            <CodeXmlIcon aria-hidden="true" /> <span>{copy.github}</span>
          </a>
        </div>
      </header>

      <details className="docs-mobile-nav">
        <summary>
          <MenuIcon aria-hidden="true" /> {copy.chapters}
        </summary>
        <DocsNavigation activeSlug={activeEntry?.metadata.slug} entries={entries} locale={locale} />
      </details>

      <div className="docs-layout">
        <aside className="docs-sidebar">
          <Link className="docs-back-link" to={locale === "zh" ? "/zh/" : "/en/"}>
            <ArrowLeftIcon aria-hidden="true" /> {copy.backToSite}
          </Link>
          <DocsNavigation
            activeSlug={activeEntry?.metadata.slug}
            entries={entries}
            locale={locale}
          />
        </aside>

        <main className="docs-main" id="main-content">
          {children}
        </main>

        <aside className="docs-toc">
          {activeEntry?.metadata.toc.length ? (
            <nav aria-label={copy.onThisPage}>
              <p>{copy.onThisPage}</p>
              {activeEntry.metadata.toc.map((item) => (
                <a href={`#${item.id}`} key={item.id}>
                  {item.label}
                </a>
              ))}
            </nav>
          ) : (
            <div className="docs-index-note">
              <span>TanSail Docs</span>
              <p>
                {locale === "zh"
                  ? "从首次运行到 Cloudflare 上线，逐项解释 TanSail 的真实能力。"
                  : "A practical reference from first run to Cloudflare release."}
              </p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
