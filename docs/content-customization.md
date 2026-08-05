# Content-only customization

Use this path when the layout and behavior already fit your site. No component changes are
required.

## 1. Edit the site contract

Update `src/config/site.ts` for structural site configuration and `src/i18n.ts` for visible
English and Chinese copy. Together they own:

- site name, title, description, canonical URL, locale, and light/dark browser colors;
- the optional announcement and its optional action;
- desktop and mobile navigation;
- primary and secondary calls to action;
- social links;
- footer groups, legal links, and copyright text;
- public routes included in the sitemap.

The exported `defineSiteConfig` function validates the configuration with Zod when the app
starts. Invalid URLs, empty labels, malformed anchors, and out-of-range sitemap priorities fail
early instead of producing broken navigation or metadata. SEO titles must contain 40–60
characters and descriptions 140–160 characters so generated sites start inside common search
display recommendations.

Announcements are opt-in. The default config omits `announcement`; add the optional object only
for a timely, site-wide message that deserves space above the primary navigation.

The starter deliberately uses `https://example.com`. Replace it with the final production origin
before deploying. Use the origin only, without a trailing slash.

## 2. Edit page copy

Update the typed dictionaries in `src/i18n.ts` for homepage headlines, descriptions, actions,
features, workflow, proof, FAQ, accessibility labels, and footer copy. Both locales satisfy the
same `Dictionary` type, so missing copy fails type checking.

## 3. Understand link kinds

- `route` uses a type-safe TanStack Router `Link`. Localized public links use explicit `/en` and
  `/zh` routes; extend the route-link schema when adding configured file routes.
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
