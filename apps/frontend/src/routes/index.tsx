import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { pveDataQueryOptions } from "../api/pve.ts";
import { RouteError } from "../components/route-error.tsx";
import { ServerStatKpiCard } from "../components/server-stat-kpi-card";
import { ServerStatKpiGrid, ServerStatKpiGridSkeleton } from "../components/server-stat-kpi-card/grid.tsx";
import { METRIC_KEYS } from "../components/server-stat-kpi-card/types.ts";

export const Route = createFileRoute("/")({
	loader: ({ context }) => {
		return context.queryClient.ensureQueryData(pveDataQueryOptions);
	},
	component: IndexRoute,
	errorComponent: RouteError,
	pendingComponent: ServerStatKpiGridSkeleton,
});

function IndexRoute() {
	const { data } = useSuspenseQuery(pveDataQueryOptions);

	return (
		<ServerStatKpiGrid>
			{METRIC_KEYS.map((metric) => (
				<ServerStatKpiCard key={metric} data={data} metric={metric} />
			))}
		</ServerStatKpiGrid>
	);
}
