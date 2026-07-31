import { createFileRoute, notFound } from "@tanstack/react-router";

import { ContentArticle } from "#/components/content/content-article";
import { getContentEntry } from "#/content/content";

export const Route = createFileRoute("/docs/$slug")({
  head: ({ params }) => {
    const entry = getContentEntry("docs", params.slug);
    if (!entry) return { meta: [{ title: "Guide not found — TanSail" }] };
    return {
      meta: [
        { title: `${entry.metadata.title} — TanSail` },
        { name: "description", content: entry.metadata.description },
      ],
    };
  },
  component: DocsArticlePage,
});

function DocsArticlePage() {
  const { slug } = Route.useParams();
  const entry = getContentEntry("docs", slug);
  if (!entry) throw notFound();
  return <ContentArticle entry={entry} />;
}
