# TanSail

Set a better course for your next website.

[![CI](https://github.com/JohnnyChen1113/tanSail/actions/workflows/ci.yml/badge.svg)](https://github.com/JohnnyChen1113/tanSail/actions/workflows/ci.yml)
[![Release](https://img.shields.io/github/v/release/JohnnyChen1113/tanSail)](https://github.com/JohnnyChen1113/tanSail/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

TanSail is an independent, design-first [TanStack Start](https://tanstack.com/start/latest)
starter for [Cloudflare Workers](https://developers.cloudflare.com/workers/). The default
project is intentionally small: it has no database, authentication provider, payment service,
or required secrets.

Official website: [tansail-official.bioinfoark.workers.dev](https://tansail-official.bioinfoark.workers.dev)

> TanSail is a community project and is not affiliated with or endorsed by TanStack, ShipAny,
> or the reference projects used during its design research.

## Foundation

- React 19 and the React Compiler
- TanStack Start and TanStack Router
- Tailwind CSS 4, shadcn/ui, Base UI, and Lucide icons
- Light, dark, and system themes without a flash of the wrong theme
- Zod-validated site identity, navigation, calls to action, social links, and footer config
- Reusable accessible announcement, header, mobile navigation, section, and footer components
- Harbor, Horizon, and Nightwatch visual presets with a flash-free persisted selector
- Typed hero, proof, feature, pricing, FAQ, and CTA blocks with a local design Gallery
- Optional MDX docs/blog plus Changelog, Legal, Contact, JSON-LD, and share-image recipes
- A guarded one-prompt workflow with a repository-owned Codex skill
- Central SEO metadata with config-driven `sitemap.xml` and `robots.txt`
- Cloudflare Workers through the official Vite plugin and Wrangler
- Vite+ for formatting, linting, type checking, testing, and builds
- Prerendering enabled for public pages

Authentication, databases, billing, analytics, email, and content systems will be offered as
optional recipes. They are not coupled to the starter core.

## Requirements

- Node.js 24 or newer
- pnpm 11 or newer
- [Vite+](https://viteplus.dev/guide/#install-vp), which provides `vp`, `vpr`, and `vpx`

## Local development

```bash
pnpm install
pnpm dev
```

The site is available at `http://localhost:3000`. No `.env` file is needed by default.

## Quality checks

```bash
pnpm check
pnpm test
pnpm test:visual
pnpm build
```

`pnpm check` formats, lints, and type-checks the project. The production build also prerenders
public routes and creates the Cloudflare Worker bundle. Visual tests compare every preset at
desktop and mobile sizes; see the visual preset guide for browser setup and baseline updates.

## Deploy to Cloudflare

1. Authenticate Wrangler once with `pnpm wrangler login`.
2. Change the worker name in `wrangler.jsonc` if needed.
3. Run `pnpm deploy`.

Custom domains, bindings, environment variables, and secrets belong in your own Wrangler
configuration; TanSail does not ship a project-specific domain.

## Customize

- Start with the [content-only guide](./docs/content-customization.md) to change identity,
  metadata, navigation, calls to action, footer content, and homepage copy without editing shell
  components.
- Use the [component-level guide](./docs/component-customization.md) when changing structure,
  navigation behavior, section composition, or design tokens.
- Follow the [visual preset guide](./docs/visual-presets.md) to select, extend, and regression-test
  the appearance system.
- Use the [landing-page block guide](./docs/landing-blocks.md) to compose sections and compare them
  in the local Gallery.
- Start from one of the [page recipes](./docs/page-recipes.md) for SaaS, AI, open-source, indie,
  knowledge, or consulting sites.
- Follow the [content and marketing guide](./docs/content-and-marketing.md) to add or remove MDX,
  structured data, and supporting marketing pages.
- Use the [one-prompt generation workflow](./docs/generation-workflow.md) to turn a brief into a
  checked generated preview.
- Add shadcn/ui primitives with `vpr ui add <component>`.
- Follow [DEVELOPMENT_PLAN.md](./DEVELOPMENT_PLAN.md) for the public roadmap.

## Community and releases

- Read [CONTRIBUTING.md](./CONTRIBUTING.md) before proposing or implementing a change.
- Follow the [Code of Conduct](./CODE_OF_CONDUCT.md) in project spaces.
- Report vulnerabilities through the private process in [SECURITY.md](./SECURITY.md).
- Review notable changes in [CHANGELOG.md](./CHANGELOG.md) and the published
  [GitHub Releases](https://github.com/JohnnyChen1113/tanSail/releases).
- Maintainers can follow [RELEASING.md](./RELEASING.md) for the version and tag workflow.

Keep credentials out of Git. If a future module needs environment variables, document safe
example names in `.env.example` without adding real values.

## Clean-room commitment

TanSail may learn from public interfaces and general product patterns, but it does not copy
closed-source ShipAny code, assets, or proprietary content. The project is also independent
from the Ten Gods application that preceded it.

The initial repository history retains the public TanStarter baseline it was created from.
Subsequent TanSail work is released under the [MIT License](./LICENSE).
