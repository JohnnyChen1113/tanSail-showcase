import { createRouter } from "@tanstack/react-router";

import { DefaultCatchBoundary } from "#/components/default-catch-boundary";
import { DefaultNotFound } from "#/components/default-not-found";

import { routeTree } from "./routeTree.gen";

export function getRouter() {
  const router = createRouter({
    routeTree,
    trailingSlash: "always",
    defaultPreload: "intent",
    defaultErrorComponent: DefaultCatchBoundary,
    defaultNotFoundComponent: DefaultNotFound,
    scrollRestoration: true,
    defaultStructuralSharing: true,
  });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
