import { createFileRoute } from "@tanstack/react-router";

import { DocsIndex } from "#/components/content/docs-pages";
import { siteConfig } from "#/config/site";
import { getDocsEntries } from "#/content/content";
import { createDocsSeoDescription } from "#/lib/docs-seo";

export const Route = createFileRoute("/docs/")({
  head: () => ({
    meta: [
      { title: "TanSail Documentation — Design, Build, and Deploy" },
      {
        name: "description",
        content: createDocsSeoDescription(
          "Learn TanSail's design system, page recipes, agent workflows, quality gates, and Cloudflare Workers deployment path for original bilingual websites.",
          "en",
        ),
      },
    ],
    links: [
      { rel: "canonical", href: `${siteConfig.metadata.siteUrl}/docs/` },
      { rel: "alternate", hrefLang: "en", href: `${siteConfig.metadata.siteUrl}/docs/en/` },
      { rel: "alternate", hrefLang: "zh-CN", href: `${siteConfig.metadata.siteUrl}/docs/zh/` },
      { rel: "alternate", hrefLang: "x-default", href: `${siteConfig.metadata.siteUrl}/docs/` },
    ],
  }),
  component: DocsDefaultIndexPage,
});

function DocsDefaultIndexPage() {
  return <DocsIndex entries={getDocsEntries("en")} locale="en" />;
}
