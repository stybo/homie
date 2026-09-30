import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";
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

function AutoTheme() {
	useAutoTheme();
	return null;
}

function RootComponent() {
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
				<ThemeProvider>
					<AutoTheme />
					{children}
					<DevtoolsProvider />
				</ThemeProvider>
				<Scripts />
			</body>
		</html>
	);
}
