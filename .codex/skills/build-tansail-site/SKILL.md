---
name: build-tansail-site
description: Turn a product, open-source, expert, or studio brief into a polished TanSail site using the repository's typed presets, page recipes, landing blocks, generated preview, and validation workflow. Use when a user asks to create, generate, scaffold, redesign, or adapt a site in a TanSail repository from a short natural-language request.
---

# Build a TanSail site

Translate the request into the stable site brief before changing page components. Preserve the browser-only core and reuse the existing visual system.

## Workflow

1. Read `AGENTS.md`, `docs/generation-workflow.md`, and relevant files under `src/config/`.
2. Inspect the worktree and preserve unrelated user changes.
3. Extract brand, audience, outcome, pages, tone, preset, recipe, and deployment details.
4. Choose supported options using [block-selection.md](references/block-selection.md). Ask only when a missing choice materially changes the site.
5. Create JSON matching [brief-schema.md](references/brief-schema.md), starting from `examples/generation/`.
6. Validate without writing: `vp run generate:site -- --brief <brief-path>`.
7. Review the output, then apply: `vp run generate:site -- --brief <brief-path> --apply`.
8. Inspect `/generated-preview`. Adapt copy through validated configuration and existing block variants.
9. Add appropriate tests. Run `vp check`, `vp test run`, and `vp build`.
10. Report selected options, files, checks, and every unresolved content or deployment requirement.

## Guardrails

- Keep the default site browser-only. Add no auth, database, billing, email, analytics, storage, or server function unless explicitly requested.
- Reuse `LandingBlock` and existing configurations before creating components.
- Use only schema-approved sections, recipes, tones, and presets.
- Keep generated JSON in `src/config/generated/`; never allow arbitrary write targets.
- Do not fabricate customers, metrics, testimonials, certifications, prices, or legal claims.
- Represent missing facts as unresolved requirements instead of guessing.
- Keep optional modules removable and the starter deployable without secrets.
- Follow repository instructions for routing, shadcn/ui, icons, formatting, tests, and deployment.
