# TanStack patterns

## Routes and data

- Use file-based routes under `src/routes`.
- Prefer route loaders for route data and `createServerFn` for server-only work.
- Route loaders are isomorphic; never access server-only APIs directly from a loader.
- Keep server-only modules in `*.server.ts` files and import them only from server functions.
- Prefix server functions with `$` to make their boundary visible.
- Do not add TanStack Query until the project has client caching needs Router loaders do not cover.

## Environment shaking

TanStack Start strips code not referenced by a `createServerFn` handler from the client build.
Code outside a server handler can be included in both client and server bundles, so keep secrets
and private service clients behind explicit server boundaries.

## Platform

- Treat Cloudflare Workers as the default runtime.
- Prefer Web APIs over Node-only APIs.
- Add Wrangler bindings only for the module that needs them; the core must remain secret-free.
