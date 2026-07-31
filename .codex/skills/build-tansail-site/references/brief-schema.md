# Brief schema

The canonical runtime schema is `src/config/brief.ts`.

- `version`: currently `1`.
- `brand`: name, tagline, and concise description.
- `audience`: primary audience, problem, and desired outcome.
- `pages`: one or more page plans with path, goal, and ordered sections.
- `tone`: one to three of `warm`, `direct`, `playful`, `technical`, or `editorial`.
- `preset`: `harbor`, `horizon`, or `nightwatch`.
- `recipe`: one of the six IDs in `docs/page-recipes.md`.
- `deployment`: Cloudflare Workers target and optional domain.

Supported sections are `hero`, `logo-cloud`, `features`, `use-cases`, `stats`, `testimonials`, `pricing`, `faq`, and `cta`. Keep claims factual. Omit an unknown domain so the workflow reports it as unresolved.
