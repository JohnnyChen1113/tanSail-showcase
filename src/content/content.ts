import type { ComponentType } from "react";
import { z } from "zod";

import DesignFirstStarters, {
  metadata as designFirstStartersMetadata,
} from "#/content/blog/design-first-starters.mdx";
import FromBriefToPage, {
  metadata as fromBriefToPageMetadata,
} from "#/content/blog/from-brief-to-page.mdx";
import CustomizingBlocks, {
  metadata as customizingBlocksMetadata,
} from "#/content/docs/customizing-blocks.mdx";
import GettingStarted, {
  metadata as gettingStartedMetadata,
} from "#/content/docs/getting-started.mdx";

const contentMetadataSchema = z.object({
  slug: z.string().regex(/^[a-z][a-z0-9-]*$/),
  title: z.string().min(1),
  description: z.string().min(1).max(180),
  publishedAt: z.iso.date(),
  readingMinutes: z.number().int().positive(),
});

function defineContentEntry(kind: "blog" | "docs", rawMetadata: unknown, Component: ComponentType) {
  return { kind, metadata: contentMetadataSchema.parse(rawMetadata), Component };
}

export type ContentEntry = ReturnType<typeof defineContentEntry>;

export const docsEntries = [
  defineContentEntry("docs", gettingStartedMetadata, GettingStarted),
  defineContentEntry("docs", customizingBlocksMetadata, CustomizingBlocks),
];

export const blogEntries = [
  defineContentEntry("blog", designFirstStartersMetadata, DesignFirstStarters),
  defineContentEntry("blog", fromBriefToPageMetadata, FromBriefToPage),
];

export function getContentEntry(kind: "blog" | "docs", slug: string) {
  const entries = kind === "blog" ? blogEntries : docsEntries;
  return entries.find((entry) => entry.metadata.slug === slug);
}
