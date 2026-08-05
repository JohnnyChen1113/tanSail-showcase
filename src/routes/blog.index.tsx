import { createFileRoute } from "@tanstack/react-router";

import { ContentIndex } from "#/components/content/content-index";
import { blogEntries } from "#/content/content";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Journal — TanSail" },
      { name: "description", content: "Notes on design-first, composable web foundations." },
    ],
  }),
  component: BlogIndexPage,
});

function BlogIndexPage() {
  return (
    <ContentIndex
      title="TanSail journal"
      description="Notes on design systems, composable pages, and open-source product foundations."
      entries={blogEntries}
    />
  );
}
