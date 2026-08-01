import { createFileRoute } from "@tanstack/react-router";

import { ServerStats } from "../components/ServerStats.tsx";

export const Route = createFileRoute("/")({
	component: IndexRoute,
});

function IndexRoute() {
	return <ServerStats />;
}
