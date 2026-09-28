import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { RouteNotFound } from "./components/route-not-found.tsx";
import { routeTree } from "./routeTree.gen.ts";

export function getRouter() {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 30_000,
			},
		},
	});

	const router = createRouter({
		context: { queryClient },
		defaultNotFoundComponent: RouteNotFound,
		defaultPreload: "intent",
		routeTree,
		scrollRestoration: true,
	});

	setupRouterSsrQueryIntegration({
		queryClient,
		router,
	});

	return router;
}

declare module "@tanstack/react-router" {
	// noinspection JSUnusedGlobalSymbols
	interface Register {
		router: ReturnType<typeof getRouter>;
	}
}
