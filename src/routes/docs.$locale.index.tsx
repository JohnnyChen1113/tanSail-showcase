import { createFileRoute, notFound } from "@tanstack/react-router";

import { DocsIndex } from "#/components/content/docs-pages";
import { siteConfig } from "#/config/site";
import { getDocsEntries } from "#/content/content";
import { isLocale, type Locale } from "#/i18n";
import { createDocsSeoDescription } from "#/lib/docs-seo";

function resolveDocsLocale(locale: string): Locale {
  if (!isLocale(locale)) throw notFound();
  return locale;
}

export const Route = createFileRoute("/docs/$locale/")({
  head: ({ params }) => {
    const locale = resolveDocsLocale(params.locale);
    const title =
      locale === "zh"
        ? "TanSail 使用文档｜设计系统、Agent 工作流与 Cloudflare 部署指南"
        : "TanSail Documentation — Design, Build, and Deploy";
    const summary =
      locale === "zh"
        ? "学习如何使用 TanSail 的设计系统、页面配方、Agent 技能、质量检查与 Cloudflare Workers 部署流程，构建原创、双语且可维护的网站。"
        : "Learn TanSail's design system, page recipes, agent workflows, quality gates, and Cloudflare Workers deployment path for original bilingual websites.";
    const description = createDocsSeoDescription(summary, locale);
    const origin = siteConfig.metadata.siteUrl;

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
      links: [
        { rel: "canonical", href: `${origin}/docs/${locale}/` },
        { rel: "alternate", hrefLang: "en", href: `${origin}/docs/en/` },
        { rel: "alternate", hrefLang: "zh-CN", href: `${origin}/docs/zh/` },
        { rel: "alternate", hrefLang: "x-default", href: `${origin}/docs/` },
      ],
    };
  },
  component: DocsLocalizedIndexPage,
});

function DocsLocalizedIndexPage() {
  const locale = resolveDocsLocale(Route.useParams().locale);
  return <DocsIndex entries={getDocsEntries(locale)} locale={locale} />;
}
