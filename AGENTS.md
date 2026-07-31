# Agent guidelines

## Essentials

- Stack: TypeScript, React 19, TanStack Start and Router, Tailwind CSS, and shadcn/ui.
- Target: Cloudflare Workers through the official Cloudflare Vite plugin.
- Keep authentication, databases, billing, email, analytics, and CMS integrations optional.
- Never add project-specific domains, credentials, or application content to the starter core.
- Use the shadcn CLI (`vpr ui add <component>`) when adding UI primitives.
- Use `lucide-react` icons with the `Icon` suffix.
- Prefer typed configuration and semantic design tokens over hard-coded page variants.
- For scripts use `vpr`, the Vite+ shorthand for `vp run`.

## Before substantial changes

- Run `vpx @tanstack/intent@latest list` from the repository root.
- Load any matching TanStack skill before editing.
- Read relevant guidance under `.agents/`.

## Validation

- Run `vp install` after dependency changes.
- Run `vp check`, `vp test run`, and `vp build` before publishing a completed phase.
- Keep `DEVELOPMENT_PLAN.md` checkboxes synchronized with completed work.

## Independence

TanSail is a clean-room community project. Do not copy closed-source ShipAny implementation,
assets, or content. Do not migrate domain content from unrelated applications into this repo.
