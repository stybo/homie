import { getLocalTimeZone, now } from "@internationalized/date";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { fetchPveStats } from "../api/pve.ts";
import { RouteError } from "../components/route-error.tsx";
import { ServerStatKpiGrid, ServerStatKpiGridSkeleton } from "../components/server-stat-kpi-card/grid.tsx";
import ServerStatKpiCard from "../components/server-stat-kpi-card/index.tsx";
import { METRIC_KEYS } from "../components/server-stat-kpi-card/types.ts";

export function getTimeBasedTimeframe(): "hour" | "day" {
	const { minute } = now(getLocalTimeZone());
	return Math.floor(minute / 2) % 2 === 0 ? "hour" : "day";
}

export const pveDataQueryOptions = queryOptions({
	queryKey: ["pve-data"],
	queryFn: ({ signal }) => fetchPveStats({ signal, timeframe: getTimeBasedTimeframe() }),
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
