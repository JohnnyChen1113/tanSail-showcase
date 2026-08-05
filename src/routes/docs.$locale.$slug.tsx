import { createFileRoute, notFound } from "@tanstack/react-router";

import { DocsArticle } from "#/components/content/docs-pages";
import { siteConfig } from "#/config/site";
import { getContentEntry, getDocsEntries } from "#/content/content";
import { isLocale, type Locale } from "#/i18n";
import { createDocsSeoDescription, createDocsSeoTitle } from "#/lib/docs-seo";

function resolveDocsLocale(locale: string): Locale {
  if (!isLocale(locale)) throw notFound();
  return locale;
}

function docsArticlePath(locale: Locale, slug: string) {
  return `/docs/${locale}/${slug}`;
}

export const Route = createFileRoute("/docs/$locale/$slug")({
  head: ({ params }) => {
    const locale = resolveDocsLocale(params.locale);
    const entry = getContentEntry("docs", params.slug, locale);
    if (!entry) return { meta: [{ title: "Guide not found — TanSail" }] };

    const title = entry.metadata.seoTitle ?? createDocsSeoTitle(entry.metadata.title, locale);
    const description =
      entry.metadata.seoDescription ?? createDocsSeoDescription(entry.metadata.description, locale);
    const origin = siteConfig.metadata.siteUrl;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
      links: [
        { rel: "canonical", href: `${origin}${docsArticlePath(locale, entry.metadata.slug)}` },
        {
          rel: "alternate",
          hrefLang: "en",
          href: `${origin}${docsArticlePath("en", entry.metadata.slug)}`,
        },
        {
          rel: "alternate",
          hrefLang: "zh-CN",
          href: `${origin}${docsArticlePath("zh", entry.metadata.slug)}`,
        },
        {
          rel: "alternate",
          hrefLang: "x-default",
          href: `${origin}${docsArticlePath("en", entry.metadata.slug)}`,
        },
      ],
    };
  },
  component: DocsArticlePage,
});

function DocsArticlePage() {
  const { locale: localeParam, slug } = Route.useParams();
  const locale = resolveDocsLocale(localeParam);
  const entry = getContentEntry("docs", slug, locale);
  if (!entry) throw notFound();

  return <DocsArticle entries={getDocsEntries(locale)} entry={entry} locale={locale} />;
}
