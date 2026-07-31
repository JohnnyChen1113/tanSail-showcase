# Content and marketing modules

TanSail includes optional MDX documentation and blog examples plus typed Changelog, Legal, and
Contact recipes. They are isolated from `SiteShell`; removing their routes and content folders does
not change the homepage, visual presets, or block library.

## MDX content

The Vite configuration compiles `.mdx` files with `@mdx-js/rollup` and React's default JSX runtime.
Each document exports explicit metadata that is validated by Zod in `src/content/content.ts`.

To add an entry:

1. Add an `.mdx` file below `src/content/blog` or `src/content/docs`.
2. Export `slug`, `title`, `description`, `publishedAt`, and `readingMinutes` metadata.
3. Import the component and metadata into the matching registry.
4. Open the generated dynamic route and run the tests.

To remove MDX entirely, delete the blog/docs routes, content components and entries, remove the MDX
plugin from `vite.config.ts`, then remove `@mdx-js/rollup`.

## Marketing-page recipes

- `/changelog` renders reader-friendly releases from validated configuration.
- `/legal` is a clearly marked implementation starter and must receive jurisdiction-specific legal
  review before launch.
- `/contact` uses monitored `mailto:` channels and intentionally adds no server form or vendor.

Replace every `example.com` address before deploying a real project.

## Structured data

`src/lib/structured-data.ts` generates Organization and Article JSON-LD. The serializer escapes `<`
before the JSON is inserted into a script element. Extend the helpers with schema.org types that
match visible page content; do not add ratings, prices, authors, or claims that the page does not
show.

## Share images

`public/share-image-template.svg` is a 1200 × 630 editable starting point. Before launch:

1. Replace the title, subtitle, colors, and mark.
2. Export a 1200 × 630 PNG or JPEG for broad social-platform compatibility.
3. Add the exported file to `public/`.
4. Add its absolute URL to the Open Graph and Twitter metadata in the site configuration helpers.
5. Test the deployed URL with the platform preview tools you care about.

Do not point production social metadata at the SVG template unless the target platforms have been
verified to support it.
