import { createFileRoute, notFound } from "@tanstack/react-router";

import { ContentArticle } from "#/components/content/content-article";
import { getContentEntry } from "#/content/content";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const entry = getContentEntry("blog", params.slug);
    if (!entry) return { meta: [{ title: "Article not found — TanSail" }] };
    return {
      meta: [
        { title: `${entry.metadata.title} — TanSail` },
        { name: "description", content: entry.metadata.description },
      ],
    };
  },
  component: BlogArticlePage,
});

function BlogArticlePage() {
  const { slug } = Route.useParams();
  const entry = getContentEntry("blog", slug);
  if (!entry) throw notFound();
  return <ContentArticle entry={entry} />;
}
