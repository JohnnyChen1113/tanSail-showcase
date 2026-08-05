# Page recipes

Page recipes turn the block library into complete starting narratives. A recipe stores metadata,
a suggested visual preset, and an ordered list of stable block IDs. It does not introduce a page
builder or copy the block data into a second format.

## Included recipes

- **SaaS product** — product-led promise, capabilities, proof, pricing, objections, and CTA.
- **AI tool** — capability-first launch with workflow examples, metrics, plans, and trust.
- **Open-source project** — compact introduction, ecosystem, technical proof, and adoption path.
- **Indie product** — personal editorial story, focused use cases, proof, and simple pricing.
- **Knowledge business** — authority, outcomes, curriculum-style capabilities, and testimonials.
- **Consulting studio** — point of view, method, case framing, measurable proof, and inquiry CTA.

Run the project and open `/recipes` to compare them. Each detail route uses a typed path parameter:

Product-led and knowledge recipes use the compact ecosystem rail, filterable scenario catalog,
and masonry testimonial composition. Their bundled testimonial copy remains visibly marked as
sample content until a project replaces it with verified evidence.

```tsx
<Link to="/recipes/$recipeId" params={{ recipeId: recipe.id }}>
  Preview recipe
</Link>
```

Never interpolate `recipe.id` into the `to` string. TanStack Router validates the route and safely
encodes the parameter when it is passed through `params`.

## Add a recipe

1. Add an ID to `recipeIdSchema` in `src/config/recipes.ts`.
2. Add one validated recipe entry whose first block is a hero and final block is a CTA.
3. Reference only IDs present in `src/config/blocks.ts`.
4. Add or update the recipe tests.
5. Check the result in all four presets at desktop and mobile widths.

The suggested preset is guidance, not an enforced page setting. Visitors can still choose another
preset, and their persisted preference remains authoritative.
