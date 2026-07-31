import { createFileRoute } from "@tanstack/react-router";

import { siteConfig } from "#/config/site";
import { createRobotsText } from "#/lib/seo";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(createRobotsText(siteConfig), {
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        }),
    },
  },
});
