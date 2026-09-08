import { createRouter } from "@tanstack/react-router";
import { routeTree } from "../routeTree.gen.ts";
import { queryClient } from "./QueryClient.ts";

export const router = createRouter({ context: { queryClient }, routeTree });

declare module "@tanstack/react-router" {
	// noinspection JSUnusedGlobalSymbols
	interface Register {
		router: typeof router;
	}
}
