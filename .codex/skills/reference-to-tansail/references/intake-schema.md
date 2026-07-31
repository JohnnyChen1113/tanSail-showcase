# Reference intake schema

Create one JSON document matching `src/config/reference-brief.ts`.

```json
{
  "version": 1,
  "project": {
    "name": "Product name",
    "audience": "Who must understand or act",
    "outcome": "The observable result the page should create",
    "locales": ["en", "zh"]
  },
  "sources": [
    {
      "type": "url",
      "locator": "https://reference.example",
      "usage": "inspiration-only",
      "observations": {
        "hierarchy": ["High-level composition observation"],
        "typography": ["Type rhythm observation"],
        "color": ["Palette or material observation"],
        "interaction": ["Behavior observation"],
        "avoid": ["Reference-specific element that must not transfer"]
      }
    }
  ],
  "direction": {
    "name": "Original direction name",
    "principles": ["Original principle"],
    "materials": ["Original material rule"],
    "proof": ["Real product evidence to create"]
  },
  "originality": {
    "copySourceCode": false,
    "copyAssets": false,
    "exactReproduction": false,
    "transformations": [
      "Use a different grid",
      "Create an original palette",
      "Replace every product visual"
    ]
  }
}
```

Every observation group needs at least one concrete item. Use `type: "screenshot"` and a
repository-relative locator for screenshots. Inputs are accepted only from `examples/reference/`
or `src/config/generated/`. The renderer writes only `SITE-BRIEF.md` and `DESIGN.proposed.md` in
the repository root, and only when `--apply` is present.
