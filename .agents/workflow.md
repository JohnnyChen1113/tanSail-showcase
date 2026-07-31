# Workflow

## Commands

- `vpr dev`: run the local development server.
- `vpr check`: format, lint, and type-check.
- `vpr test run`: execute the test suite once.
- `vpr build`: build and prerender the Cloudflare Worker bundle.
- `vpr deploy`: build and publish with Wrangler.
- `vpr ui add <component>`: add a shadcn/ui primitive.

## Change discipline

- Keep dependency versions exact.
- Add optional capabilities as removable recipes rather than core dependencies.
- Run checks once a coherent change is ready, then run the production build before publishing.
- Update the roadmap checklist when a task becomes demonstrably complete.
