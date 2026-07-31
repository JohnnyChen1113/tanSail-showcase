# TanSail development plan

TanSail is an independent, open-source, design-first starter for shipping polished
TanStack Start websites. It is not affiliated with TanStack, ShipAny, or the reference
projects that informed the product research.

## Phase 0 — project foundation

- [x] Create the public `JohnnyChen1113/tanSail` GitHub repository.
- [x] Start from the public TanStarter baseline with preserved attribution in Git history.
- [x] Establish the TanSail name, scope, clean-room rule, and MIT license.
- [x] Document the roadmap as a maintained checklist.
- [x] Keep application-specific content from the Ten Gods project out of this repository.

## Phase 1 — minimal reliable starter

- [x] Remove bundled authentication, database, and demo application code.
- [x] Keep a focused React 19 + TanStack Start + Router + Tailwind CSS + shadcn/ui core.
- [x] Provide a neutral responsive starter page with light, dark, and system themes.
- [x] Preserve useful error and not-found boundaries.
- [x] Add Cloudflare Workers development, preview, build, and deploy configuration.
- [x] Add a smoke test and unified format, lint, type-check, test, and build commands.
- [x] Document local setup, customization boundaries, and Cloudflare deployment.
- [x] Verify install, check, test, and production build from a clean dependency graph.
- [x] Commit and publish the completed phase to GitHub.

## Phase 2 — configurable site shell

- [x] Add a typed site configuration contract for metadata, navigation, calls to action,
      social links, and footer groups.
- [x] Build reusable header, mobile navigation, footer, announcement, and section primitives.
- [x] Add accessible navigation states, skip links, focus styles, and reduced-motion behavior.
- [x] Add SEO defaults, social metadata, sitemap, robots, and favicon replacement guidance.
- [x] Document content-only customization and component-level customization separately.

## Phase 3 — visual preset system

- [x] Define semantic design tokens independent of section components.
- [x] Ship the editorial `Harbor` preset.
- [x] Ship the product-led `Horizon` preset.
- [x] Ship the high-contrast `Nightwatch` preset.
- [x] Allow presets to change typography, density, geometry, color, and visual composition.
- [x] Add responsive visual regression coverage for every preset.

## Phase 4 — landing-page block library

- [x] Add multiple hero, logo-cloud, feature, use-case, testimonial, pricing, FAQ, and CTA blocks.
- [x] Keep block content data-driven and composable without a page builder runtime.
- [x] Add tasteful motion primitives with reduced-motion fallbacks.
- [x] Add a local gallery route for comparing block and preset combinations.
- [x] Add six typed page recipes for product, open-source, knowledge, and service sites.

## Phase 5 — content and marketing

- [x] Add optional MDX documentation and blog modules.
- [x] Add changelog, legal-page, and contact-page recipes.
- [x] Add structured data helpers and share-image guidance.
- [x] Keep content modules removable without changing the site shell.

## Phase 6 — optional product modules

- [ ] Publish authentication as an opt-in recipe or package.
- [ ] Publish database and ORM integration as an opt-in recipe or package.
- [ ] Publish email, analytics, storage, and billing integrations as independent recipes.
- [x] Ensure the default starter remains deployable without secrets or external services.

## Phase 7 — one-prompt generation workflow

- [x] Define a stable brief schema for brand, audience, pages, sections, tone, and preset.
- [x] Create a TanSail Codex skill that translates a brief into typed site configuration.
- [x] Add guarded component selection and content-generation steps.
- [x] Make the workflow run checks and report unresolved content or deployment requirements.
- [x] Provide example prompts and generated-site fixtures.

## Phase 8 — community release

- [x] Add contribution, code-of-conduct, security, and release documentation.
- [x] Add issue and pull-request templates.
- [x] Set up CI for checks, browser behavior tests, builds, and dependency review.
- [ ] Standardize Linux screenshot baselines with the planned Apple Container workflow and restore
      pixel comparisons in CI.
- [x] Publish the tagged `v0.1.0` release with migration notes.
- [x] Publish a public TanSail showcase deployment.
- [x] Review all bundled assets, fonts, examples, and dependencies for redistribution rights.

## Phase 9 — design governance and bilingual release

- [x] Add a machine-readable and human-readable `DESIGN.md` contract with CI enforcement.
- [x] Introduce language-aware English and Simplified Chinese routes, dictionaries, SEO, and type.
- [x] Replace abstract homepage decoration with original product interface compositions.
- [x] Keep preset geometry stable while refining Luminous and Signal visual atmospheres.
- [x] Add a clean-room Reference-to-TanSail skill and deterministic brief renderer.
- [x] Add responsive browser coverage for locale, metadata, overflow, and mobile navigation.
- [ ] Publish the independent showcase and the tagged `v0.2.0` release.
