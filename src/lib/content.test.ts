import { describe, expect, it } from "vite-plus/test";

import { changelogEntries, contactPage, legalPage } from "#/config/marketing";
import { blogEntries, docsEntries, getContentEntry } from "#/content/content";
import {
  createArticleJsonLd,
  createOrganizationJsonLd,
  serializeJsonLd,
} from "#/lib/structured-data";

describe("optional content modules", () => {
  it("registers unique MDX slugs and renderable components", () => {
    const entries = [...docsEntries, ...blogEntries];
    const slugs = entries.map((entry) => entry.metadata.slug);

    expect(new Set(slugs).size).toBe(entries.length);
    expect(entries.every((entry) => typeof entry.Component === "function")).toBe(true);
    expect(getContentEntry("blog", "design-first-starters")?.kind).toBe("blog");
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
