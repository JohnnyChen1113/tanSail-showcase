import type { SiteConfig } from "#/config/site";
import { getLocalizedPath, type Dictionary, type Locale } from "#/i18n";

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

export function createBaseMetaTags(config: SiteConfig) {
  return createMetaTags(config).filter(
    (tag) =>
      "charSet" in tag ||
      tag.name === "viewport" ||
      tag.name === "theme-color" ||
      tag.property === "og:type" ||
      tag.property === "og:site_name",
  );
}

export function createHeadLinks(config: SiteConfig) {
  return [
    { rel: "canonical", href: config.metadata.siteUrl },
    { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
  ];
}

export function createBaseHeadLinks() {
  return [{ rel: "icon", href: "/favicon.svg", type: "image/svg+xml" }];
}

export function createLocalizedMetaTags(
  config: SiteConfig,
  locale: Locale,
  dictionary: Dictionary,
) {
  const url = `${config.metadata.siteUrl}${getLocalizedPath(locale)}`;

  return [
    { title: dictionary.meta.title },
    { name: "description", content: dictionary.meta.description },
    { property: "og:title", content: dictionary.meta.title },
    { property: "og:description", content: dictionary.meta.description },
    { property: "og:url", content: url },
    { property: "og:locale", content: locale === "zh" ? "zh_CN" : "en_US" },
    { property: "og:image", content: `${config.metadata.siteUrl}/og-centered.png` },
    {
      property: "og:image:alt",
      content: "TanSail — Design the direction. Ship the whole site.",
    },
    { name: "twitter:title", content: dictionary.meta.title },
    { name: "twitter:description", content: dictionary.meta.description },
    { name: "twitter:image", content: `${config.metadata.siteUrl}/og-centered.png` },
  ];
}

export function createLocalizedHeadLinks(config: SiteConfig, locale: Locale) {
  const origin = config.metadata.siteUrl;

  return [
    { rel: "canonical", href: `${origin}${getLocalizedPath(locale)}` },
    { rel: "alternate", hrefLang: "en", href: `${origin}${getLocalizedPath("en")}` },
    { rel: "alternate", hrefLang: "zh-CN", href: `${origin}${getLocalizedPath("zh")}` },
    { rel: "alternate", hrefLang: "x-default", href: `${origin}${getLocalizedPath("en")}` },
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
