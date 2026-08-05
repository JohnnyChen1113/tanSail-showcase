import type { ComponentType } from "react";
import { z } from "zod";

import DesignFirstStarters, {
  metadata as designFirstStartersMetadata,
} from "#/content/blog/design-first-starters.mdx";
import FromBriefToPage, {
  metadata as fromBriefToPageMetadata,
} from "#/content/blog/from-brief-to-page.mdx";
import AgentWorkflows, {
  metadata as agentWorkflowsMetadata,
} from "#/content/docs/agent-workflows.mdx";
import AgentWorkflowsZh, {
  metadata as agentWorkflowsZhMetadata,
} from "#/content/docs/agent-workflows.zh.mdx";
import BlocksAndRecipes, {
  metadata as blocksAndRecipesMetadata,
} from "#/content/docs/blocks-and-recipes.mdx";
import BlocksAndRecipesZh, {
  metadata as blocksAndRecipesZhMetadata,
} from "#/content/docs/blocks-and-recipes.zh.mdx";
import CleanRoomReferences, {
  metadata as cleanRoomReferencesMetadata,
} from "#/content/docs/clean-room-references.mdx";
import CleanRoomReferencesZh, {
  metadata as cleanRoomReferencesZhMetadata,
} from "#/content/docs/clean-room-references.zh.mdx";
import CloudflareDeployment, {
  metadata as cloudflareDeploymentMetadata,
} from "#/content/docs/cloudflare-deployment.mdx";
import CloudflareDeploymentZh, {
  metadata as cloudflareDeploymentZhMetadata,
} from "#/content/docs/cloudflare-deployment.zh.mdx";
import ContentAndI18n, {
  metadata as contentAndI18nMetadata,
} from "#/content/docs/content-and-i18n.mdx";
import ContentAndI18nZh, {
  metadata as contentAndI18nZhMetadata,
} from "#/content/docs/content-and-i18n.zh.mdx";
import DesignContract, {
  metadata as designContractMetadata,
} from "#/content/docs/design-contract.mdx";
import DesignContractZh, {
  metadata as designContractZhMetadata,
} from "#/content/docs/design-contract.zh.mdx";
import GettingStarted, {
  metadata as gettingStartedMetadata,
} from "#/content/docs/getting-started.mdx";
import GettingStartedZh, {
  metadata as gettingStartedZhMetadata,
} from "#/content/docs/getting-started.zh.mdx";
import Introduction, { metadata as introductionMetadata } from "#/content/docs/introduction.mdx";
import IntroductionZh, {
  metadata as introductionZhMetadata,
} from "#/content/docs/introduction.zh.mdx";
import ProjectStructure, {
  metadata as projectStructureMetadata,
} from "#/content/docs/project-structure.mdx";
import ProjectStructureZh, {
  metadata as projectStructureZhMetadata,
} from "#/content/docs/project-structure.zh.mdx";
import QualityAndTesting, {
  metadata as qualityAndTestingMetadata,
} from "#/content/docs/quality-and-testing.mdx";
import QualityAndTestingZh, {
  metadata as qualityAndTestingZhMetadata,
} from "#/content/docs/quality-and-testing.zh.mdx";
import SiteConfiguration, {
  metadata as siteConfigurationMetadata,
} from "#/content/docs/site-configuration.mdx";
import SiteConfigurationZh, {
  metadata as siteConfigurationZhMetadata,
} from "#/content/docs/site-configuration.zh.mdx";
import Troubleshooting, {
  metadata as troubleshootingMetadata,
} from "#/content/docs/troubleshooting.mdx";
import TroubleshootingZh, {
  metadata as troubleshootingZhMetadata,
} from "#/content/docs/troubleshooting.zh.mdx";
import VisualPresets, {
  metadata as visualPresetsMetadata,
} from "#/content/docs/visual-presets.mdx";
import VisualPresetsZh, {
  metadata as visualPresetsZhMetadata,
} from "#/content/docs/visual-presets.zh.mdx";
import { defaultLocale, type Locale } from "#/i18n";

const contentMetadataBaseSchema = z.object({
  slug: z.string().regex(/^[a-z][a-z0-9-]*$/),
  title: z.string().min(1),
  description: z.string().min(1).max(180),
  readingMinutes: z.number().int().positive(),
});

const blogMetadataSchema = contentMetadataBaseSchema.extend({
  publishedAt: z.iso.date(),
  locale: z.enum(["en", "zh"]).default("en"),
});

const docsMetadataSchema = contentMetadataBaseSchema.extend({
  seoTitle: z.string().trim().min(40).max(60).optional(),
  seoDescription: z.string().trim().min(140).max(160).optional(),
  updatedAt: z.iso.date(),
  locale: z.enum(["en", "zh"]).default("en"),
  section: z.enum(["start", "design", "build", "ship", "reference"]).default("start"),
  order: z.number().int().nonnegative().default(0),
  keywords: z.array(z.string().min(1)).default([]),
  toc: z
    .array(
      z.object({
        id: z.string().regex(/^[a-z][a-z0-9-]*$/),
        label: z.string().min(1),
      }),
    )
    .default([]),
});

export type BlogEntry = {
  kind: "blog";
  metadata: z.infer<typeof blogMetadataSchema>;
  Component: ComponentType;
};

export type DocsEntry = {
  kind: "docs";
  metadata: z.infer<typeof docsMetadataSchema>;
  Component: ComponentType;
};

function defineBlogEntry(rawMetadata: unknown, Component: ComponentType): BlogEntry {
  return { kind: "blog", metadata: blogMetadataSchema.parse(rawMetadata), Component };
}

function defineDocsEntry(rawMetadata: unknown, Component: ComponentType): DocsEntry {
  return { kind: "docs", metadata: docsMetadataSchema.parse(rawMetadata), Component };
}

export type ContentEntry = BlogEntry | DocsEntry;

export const docsEntries = [
  defineDocsEntry(introductionMetadata, Introduction),
  defineDocsEntry(gettingStartedMetadata, GettingStarted),
  defineDocsEntry(projectStructureMetadata, ProjectStructure),
  defineDocsEntry(designContractMetadata, DesignContract),
  defineDocsEntry(visualPresetsMetadata, VisualPresets),
  defineDocsEntry(blocksAndRecipesMetadata, BlocksAndRecipes),
  defineDocsEntry(siteConfigurationMetadata, SiteConfiguration),
  defineDocsEntry(contentAndI18nMetadata, ContentAndI18n),
  defineDocsEntry(agentWorkflowsMetadata, AgentWorkflows),
  defineDocsEntry(cleanRoomReferencesMetadata, CleanRoomReferences),
  defineDocsEntry(qualityAndTestingMetadata, QualityAndTesting),
  defineDocsEntry(cloudflareDeploymentMetadata, CloudflareDeployment),
  defineDocsEntry(troubleshootingMetadata, Troubleshooting),
  defineDocsEntry(introductionZhMetadata, IntroductionZh),
  defineDocsEntry(gettingStartedZhMetadata, GettingStartedZh),
  defineDocsEntry(projectStructureZhMetadata, ProjectStructureZh),
  defineDocsEntry(designContractZhMetadata, DesignContractZh),
  defineDocsEntry(visualPresetsZhMetadata, VisualPresetsZh),
  defineDocsEntry(blocksAndRecipesZhMetadata, BlocksAndRecipesZh),
  defineDocsEntry(siteConfigurationZhMetadata, SiteConfigurationZh),
  defineDocsEntry(contentAndI18nZhMetadata, ContentAndI18nZh),
  defineDocsEntry(agentWorkflowsZhMetadata, AgentWorkflowsZh),
  defineDocsEntry(cleanRoomReferencesZhMetadata, CleanRoomReferencesZh),
  defineDocsEntry(qualityAndTestingZhMetadata, QualityAndTestingZh),
  defineDocsEntry(cloudflareDeploymentZhMetadata, CloudflareDeploymentZh),
  defineDocsEntry(troubleshootingZhMetadata, TroubleshootingZh),
];

export const blogEntries = [
  defineBlogEntry(designFirstStartersMetadata, DesignFirstStarters),
  defineBlogEntry(fromBriefToPageMetadata, FromBriefToPage),
];

export function getDocsEntries(locale: Locale) {
  return docsEntries
    .filter((entry) => entry.metadata.locale === locale)
    .sort((left, right) => left.metadata.order - right.metadata.order);
}

export function getContentEntry(kind: "blog", slug: string): BlogEntry | undefined;
export function getContentEntry(kind: "docs", slug: string, locale?: Locale): DocsEntry | undefined;
export function getContentEntry(
  kind: "blog" | "docs",
  slug: string,
  locale: Locale = defaultLocale,
) {
  if (kind === "blog") return blogEntries.find((entry) => entry.metadata.slug === slug);
  return docsEntries.find(
    (entry) => entry.metadata.slug === slug && entry.metadata.locale === locale,
  );
}
