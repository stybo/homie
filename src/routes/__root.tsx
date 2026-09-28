import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { RouteNotFound } from "../components/route-not-found.tsx";
import { useAutoTheme } from "../components/theme-switcher.ts";
import { DevtoolsProvider } from "../providers/DevtoolsProvider.tsx";
import "../styles/globals.css";

interface RouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
	component: RootComponent,
	notFoundComponent: RouteNotFound,
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
			{ title: "Homie" },
		],
	}),
});

function RootComponent() {
	useAutoTheme();

	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	);
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html suppressHydrationWarning lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<DevtoolsProvider />
				<Scripts />
			</body>
		</html>
	);
}
