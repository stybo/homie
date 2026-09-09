import { a11yDevtoolsPlugin } from "@tanstack/devtools-a11y/react";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { queryClient } from "./QueryClient.ts";
import { router } from "./Router.ts";

export function DevtoolsProvider() {
	return (
		<TanStackDevtools
			plugins={[
				{ name: "TanStack Query", render: <ReactQueryDevtoolsPanel client={queryClient} /> },
				{ name: "TanStack Router", render: <TanStackRouterDevtoolsPanel router={router} /> },
				a11yDevtoolsPlugin(),
			]}
		/>
	);
}
