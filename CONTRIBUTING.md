# Contributing to TanSail

Thanks for helping TanSail become a more useful design-first TanStack Start starter.

## Before opening a change

- Search existing issues and pull requests.
- For substantial features, open a proposal that explains the problem, the intended audience, and
  whether the capability belongs in the starter core or an optional recipe.
- Keep project-specific domains, credentials, customer content, and paid-service assumptions out of
  the core.
- Do not copy closed-source implementation, assets, or content. Contributions must be original or
  compatible with the repository's MIT license, with required attribution documented.

## Local setup

TanSail requires Node.js 24 or newer, pnpm 11, and Vite+.

```bash
pnpm install
pnpm dev
```

Use a focused branch and Conventional Commit messages such as `feat:`, `fix:`, `docs:`, or
`chore:`. Keep unrelated changes in separate pull requests.

## Design and implementation expectations

- Prefer typed configuration and semantic tokens over hard-coded page variants.
- Keep authentication, databases, billing, email, analytics, storage, and CMS integrations
  optional and removable.
- Preserve Cloudflare Workers compatibility and use Web APIs where practical.
- Add UI primitives through the shadcn CLI and use Lucide icons with the `Icon` suffix.
- Include documentation and tests for new public behavior.
- Update `DEVELOPMENT_PLAN.md` only when an item is demonstrably complete.

## Validation

Run the complete local gate before requesting review:

```bash
vp check
vp test run
vp build
TANSAIL_BROWSER_CHANNEL=chrome pnpm test:browser
```

UI changes should be checked at desktop and mobile widths, in light and dark themes, with reduced
motion enabled. The platform-sensitive screenshot suite remains available through
`pnpm test:visual`; update its baselines only after inspecting the visual differences.

## Pull requests

A useful pull request explains what changed, why it changed, the impact on starter users, any
migration requirements, and the exact checks that passed. Reviewers may ask for a feature to move
from core into a recipe when it introduces secrets, stateful infrastructure, or a narrow product
assumption.

By contributing, you agree that your contribution is licensed under the repository's MIT License
and that you will follow the [Code of Conduct](./CODE_OF_CONDUCT.md).
