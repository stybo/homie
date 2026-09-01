import { TanStackDevtools } from "@tanstack/react-devtools";
import { FormDevtoolsPanel } from "@tanstack/react-form-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TableDevtoolsPanel } from "@tanstack/react-table-devtools";
import { queryClient } from "./QueryClientProvider.tsx";
import { router } from "./RouterProvider.tsx";

export function DevtoolsProvider() {
	return (
		<TanStackDevtools
			plugins={[
				{ name: "TanStack Query", render: <ReactQueryDevtoolsPanel client={queryClient} /> },
				{ name: "TanStack Router", render: <TanStackRouterDevtoolsPanel router={router} /> },
				{ name: "TanStack Form", render: <FormDevtoolsPanel /> },
				{ name: "TanStack Table", render: <TableDevtoolsPanel /> },
			]}
		/>
	);
}
