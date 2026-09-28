import { a11yDevtoolsPlugin } from "@tanstack/devtools-a11y/react";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { useQueryClient } from "@tanstack/react-query";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { useRouter } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

export function DevtoolsProvider() {
	const queryClient = useQueryClient();
	const router = useRouter();

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
