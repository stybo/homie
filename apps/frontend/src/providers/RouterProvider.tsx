import { RouterProvider as TanstackRouterProvider } from "@tanstack/react-router";
import { router } from "./Router.ts";

export function RouterProvider() {
	return <TanstackRouterProvider router={router} />;
}
