import { RouterProvider as TanstackRouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "../routeTree.gen.ts";
import { queryClient } from "./QueryClientProvider.tsx";

export const router = createRouter({ context: { queryClient }, routeTree });

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

export function RouterProvider() {
	return <TanstackRouterProvider router={router} />;
}
