import type { QueryClient } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { useAutoTheme } from "../components/theme-switcher.ts";

interface RouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
	component: RootComponent,
});

function RootComponent() {
	useAutoTheme();

	return (
		<div className="bg-default h-screen w-screen">
			<Outlet />
		</div>
	);
}
