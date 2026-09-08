import type { ProxmoxRrdRawDataPoint } from "@homie/types";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { RouteError } from "../components/route-error.tsx";
import { ServerStatKpiGrid, ServerStatKpiGridSkeleton } from "../components/server-stat-kpi-card/grid.tsx";
import ServerStatKpiCard from "../components/server-stat-kpi-card/index.tsx";
import { METRIC_KEYS } from "../components/server-stat-kpi-card/types.ts";

export const pveDataQueryOptions = queryOptions({
	queryKey: ["pve-data"],
	queryFn: async ({ signal }): Promise<ProxmoxRrdRawDataPoint[]> => {
		const response = await fetch("/api/pve1", { signal });
		if (!response.ok) {
			throw new Error(`Failed to load server stats: ${response.status} ${response.statusText}`);
		}
		return response.json();
	},
	refetchInterval: 10_000,
});

export const Route = createFileRoute("/")({
	loader: ({ context }) => {
		return context.queryClient.query(pveDataQueryOptions);
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
