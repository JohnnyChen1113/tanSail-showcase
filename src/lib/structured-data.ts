export function createOrganizationJsonLd({ name, siteUrl }: { name: string; siteUrl: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url: siteUrl,
  };
}

export function createArticleJsonLd({
  description,
  publishedAt,
  siteName,
  siteUrl,
  slug,
  title,
}: {
  description: string;
  publishedAt: string;
  siteName: string;
  siteUrl: string;
  slug: string;
  title: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: publishedAt,
    mainEntityOfPage: `${siteUrl}/blog/${slug}`,
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
    },
  };
}

export function serializeJsonLd(data: Record<string, unknown>) {
  return JSON.stringify(data).replaceAll("<", "\\u003c");
}
