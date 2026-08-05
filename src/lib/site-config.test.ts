import { describe, expect, it } from "vite-plus/test";

import { siteConfig, siteConfigSchema } from "#/config/site";
import { createHeadLinks, createMetaTags, createRobotsText, createSitemap } from "#/lib/seo";

describe("site configuration", () => {
  it("keeps the default configuration valid and link labels unique", () => {
    expect(siteConfigSchema.safeParse(siteConfig).success).toBe(true);
    expect(siteConfig.metadata.title.length).toBeGreaterThanOrEqual(40);
    expect(siteConfig.metadata.title.length).toBeLessThanOrEqual(60);
    expect(siteConfig.metadata.description.length).toBeGreaterThanOrEqual(140);
    expect(siteConfig.metadata.description.length).toBeLessThanOrEqual(160);

    const labels = siteConfig.navigation.map((link) => link.label);
    expect(new Set(labels).size).toBe(labels.length);
  });

  it("rejects invalid metadata and sitemap priorities", () => {
    const result = siteConfigSchema.safeParse({
      ...siteConfig,
      metadata: { ...siteConfig.metadata, siteUrl: "not-a-url" },
      seo: { sitemap: [{ path: "/", changeFrequency: "monthly", priority: 2 }] },
    });

    expect(result.success).toBe(false);
  });

  it("rejects SEO copy outside the recommended display ranges", () => {
    expect(
      siteConfigSchema.safeParse({
        ...siteConfig,
        metadata: { ...siteConfig.metadata, title: "Too short", description: "Too short" },
      }).success,
    ).toBe(false);
  });
});

describe("SEO output", () => {
  it("creates canonical and social metadata from the same config", () => {
    const meta = createMetaTags(siteConfig);
    const links = createHeadLinks(siteConfig);

    expect(meta).toContainEqual({ property: "og:title", content: siteConfig.metadata.title });
    expect(meta).toContainEqual({ name: "twitter:card", content: "summary" });
    expect(links).toContainEqual({ rel: "canonical", href: siteConfig.metadata.siteUrl });
    expect(links).toContainEqual({ rel: "icon", href: "/favicon.svg", type: "image/svg+xml" });
  });

  it("creates discoverable sitemap and robots responses", () => {
    const sitemap = createSitemap(siteConfig);
    const robots = createRobotsText(siteConfig);

    expect(sitemap).toContain(`<loc>${siteConfig.metadata.siteUrl}/en/</loc>`);
    expect(sitemap).toContain(`<loc>${siteConfig.metadata.siteUrl}/zh/</loc>`);
    expect(sitemap).toContain(`<loc>${siteConfig.metadata.siteUrl}/docs/zh/troubleshooting</loc>`);
    expect(sitemap).toContain("<priority>1.0</priority>");
    expect(robots).toContain(`Sitemap: ${siteConfig.metadata.siteUrl}/sitemap.xml`);
  });
});
