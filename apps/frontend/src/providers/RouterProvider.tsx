import { createRouter, RouterProvider as TanstackRouterProvider } from "@tanstack/react-router";

import { routeTree } from "../routeTree.gen.ts";
import { queryClient } from "./QueryClientProvider.tsx";

export const router = createRouter({ routeTree, context: { queryClient } });

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

export function RouterProvider() {
	return <TanstackRouterProvider router={router}></TanstackRouterProvider>;
}
