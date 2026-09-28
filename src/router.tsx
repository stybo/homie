import { QueryClient } from "@tanstack/react-query";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { routeTree } from "./routeTree.gen.ts";

export function createRouter() {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 30_000,
			},
		},
	});

	const router = createTanStackRouter({
		context: { queryClient },
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

export const getRouter = createRouter;

declare module "@tanstack/react-router" {
	// noinspection JSUnusedGlobalSymbols
	interface Register {
		router: ReturnType<typeof createRouter>;
	}
}
