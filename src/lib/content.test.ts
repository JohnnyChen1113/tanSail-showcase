import { describe, expect, it } from "vite-plus/test";

import { changelogEntries, contactPage, legalPage } from "#/config/marketing";
import { blogEntries, docsEntries, getContentEntry, getDocsEntries } from "#/content/content";
import { createDocsSeoDescription, createDocsSeoTitle } from "#/lib/docs-seo";
import {
  createArticleJsonLd,
  createOrganizationJsonLd,
  serializeJsonLd,
} from "#/lib/structured-data";

describe("optional content modules", () => {
  it("registers unique MDX slugs and renderable components", () => {
    const entries = [...docsEntries, ...blogEntries];
    const slugs = entries.map(
      (entry) => `${entry.kind}:${entry.metadata.locale}:${entry.metadata.slug}`,
    );

    expect(new Set(slugs).size).toBe(entries.length);
    expect(entries.every((entry) => typeof entry.Component === "function")).toBe(true);
    expect(getContentEntry("blog", "design-first-starters")?.kind).toBe("blog");
  });

  it("keeps English and Chinese documentation in matching chapter order", () => {
    const english = getDocsEntries("en");
    const chinese = getDocsEntries("zh");

    expect(english).toHaveLength(13);
    expect(chinese).toHaveLength(13);
    expect(chinese.map((entry) => entry.metadata.slug)).toEqual(
      english.map((entry) => entry.metadata.slug),
    );
    expect([...english, ...chinese].every((entry) => entry.metadata.toc.length >= 3)).toBe(true);
    expect(
      [...english, ...chinese].every(
        (entry) => entry.metadata.keywords.length >= 3 && entry.metadata.updatedAt,
      ),
    ).toBe(true);
    expect(getContentEntry("docs", "getting-started", "zh")?.metadata.locale).toBe("zh");
  });

  it("keeps documentation SEO copy inside the configured display ranges", () => {
    for (const entry of docsEntries) {
      const title =
        entry.metadata.seoTitle ?? createDocsSeoTitle(entry.metadata.title, entry.metadata.locale);
      const description =
        entry.metadata.seoDescription ??
        createDocsSeoDescription(entry.metadata.description, entry.metadata.locale);

      expect(title.length).toBeGreaterThanOrEqual(40);
      expect(title.length).toBeLessThanOrEqual(60);
      expect(description.length).toBeGreaterThanOrEqual(140);
      expect(description.length).toBeLessThanOrEqual(160);
    }
  });

  it("ships validated changelog, legal, and contact recipes", () => {
    expect(changelogEntries.length).toBeGreaterThanOrEqual(3);
    expect(legalPage.sections.length).toBeGreaterThanOrEqual(4);
    expect(contactPage.channels.every((channel) => channel.href.startsWith("mailto:"))).toBe(true);
  });
});

describe("structured data", () => {
  it("creates organization and article schemas", () => {
    expect(
      createOrganizationJsonLd({ name: "TanSail", siteUrl: "https://example.com" }),
    ).toMatchObject({ "@type": "Organization", name: "TanSail" });
    expect(
      createArticleJsonLd({
        title: "A title",
        description: "A description",
        publishedAt: "2026-07-27",
        slug: "a-title",
        siteName: "TanSail",
        siteUrl: "https://example.com",
      }),
    ).toMatchObject({ "@type": "Article", headline: "A title" });
  });

  it("escapes markup-significant characters before embedding JSON-LD", () => {
    const serialized = serializeJsonLd({ value: "</script>" });

    expect(serialized).not.toContain("</script>");
    expect(serialized).toContain("\\u003c/script>");
  });
});
