import { createFileRoute } from "@tanstack/react-router";

import { ContentIndex } from "#/components/content/content-index";
import { docsEntries } from "#/content/content";

export const Route = createFileRoute("/docs/")({
  head: () => ({
    meta: [
      { title: "Documentation — TanSail" },
      { name: "description", content: "Practical guides for building and customizing TanSail." },
    ],
  }),
  component: DocsIndexPage,
});

function DocsIndexPage() {
  return (
    <ContentIndex
      kind="docs"
      title="TanSail documentation"
      description="Practical guides for choosing a direction, composing blocks, and shipping safely."
      entries={docsEntries}
    />
  );
}
