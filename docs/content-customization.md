# Content-only customization

Use this path when the layout and behavior already fit your site. No component changes are
required.

## 1. Edit the site contract

Update `src/config/site.ts`. It is the source of truth for:

- site name, title, description, canonical URL, locale, and light/dark browser colors;
- the announcement and its optional action;
- desktop and mobile navigation;
- primary and secondary calls to action;
- social links;
- footer groups, legal links, and copyright text;
- public routes included in the sitemap.

The exported `defineSiteConfig` function validates the configuration with Zod when the app
starts. Invalid URLs, empty labels, malformed anchors, and out-of-range sitemap priorities fail
early instead of producing broken navigation or metadata.

The starter deliberately uses `https://example.com`. Replace it with the final production origin
before deploying. Use the origin only, without a trailing slash.

## 2. Edit page copy

Update `src/config/home.ts` for the starter homepage headline, description, command, features, and
principles. Page content is separate from the global shell so it can later move into MDX or a CMS
without changing navigation components.

## 3. Understand link kinds

- `route` uses a type-safe TanStack Router `Link`. The phase-two starter supports the `/` route;
  extend the route-link schema when adding new file routes.
- `anchor` points to a section ID on the current page, such as `#foundation`.
- `external` requires an absolute URL and can control whether it opens a new tab.

Every link needs a visible label. External links opened in a new tab automatically receive a safe
`rel` value.

## 4. Replace the favicon

Replace `public/favicon.svg` while keeping the filename, or change the icon link returned by
`createHeadLinks` in `src/lib/seo.ts`. Keep the artwork legible at 16×16 pixels and avoid embedding
external fonts or remote assets.

If you add PNG or Apple touch icons, place them in `public/` and add explicit link entries in
`createHeadLinks`.

## 5. Verify metadata and discovery files

Metadata, the canonical link, `/sitemap.xml`, and `/robots.txt` all read from the same site config.
After changing the production URL or sitemap entries, run:

```bash
vpr test run
vpr build
```

The build prerenders public pages and fails if a crawled page cannot render.
