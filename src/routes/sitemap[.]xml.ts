import { createFileRoute } from "@tanstack/react-router";

import { siteConfig } from "#/config/site";
import { createSitemap } from "#/lib/seo";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(createSitemap(siteConfig), {
          headers: { "Content-Type": "application/xml; charset=utf-8" },
        }),
    },
  },
});
