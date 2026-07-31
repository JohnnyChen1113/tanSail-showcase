import type { SiteConfig } from "#/config/site";

export function createMetaTags(config: SiteConfig) {
  const { metadata } = config;

  return [
    { charSet: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { title: metadata.title },
    { name: "description", content: metadata.description },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: metadata.name },
    { property: "og:title", content: metadata.title },
    { property: "og:description", content: metadata.description },
    { property: "og:url", content: metadata.siteUrl },
    { property: "og:locale", content: metadata.locale },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: metadata.title },
    { name: "twitter:description", content: metadata.description },
    {
      name: "theme-color",
      content: metadata.themeColor.light,
      media: "(prefers-color-scheme: light)",
    },
    {
      name: "theme-color",
      content: metadata.themeColor.dark,
      media: "(prefers-color-scheme: dark)",
    },
  ];
}

export function createHeadLinks(config: SiteConfig) {
  return [
    { rel: "canonical", href: config.metadata.siteUrl },
    { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
  ];
}

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function createSitemap(config: SiteConfig) {
  const baseUrl = config.metadata.siteUrl.replace(/\/$/, "");
  const entries = config.seo.sitemap
    .map(
      (entry) => `  <url>
    <loc>${escapeXml(`${baseUrl}${entry.path}`)}</loc>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`;
}

export function createRobotsText(config: SiteConfig) {
  const baseUrl = config.metadata.siteUrl.replace(/\/$/, "");
  return `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`;
}
