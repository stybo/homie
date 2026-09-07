import type { ProxmoxRrdRawDataPoint } from "@homie/types";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import ServerStatKpiCard from "../components/server-stat-kpi-card/index.tsx";

export const pveDataQueryOptions = queryOptions({
	queryKey: ["pve-data"],
	queryFn: async (): Promise<ProxmoxRrdRawDataPoint[]> => {
		const response = await fetch(`/api/pve1`);
		if (!response.ok) {
			throw new Error("Network response was not ok");
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
	pendingComponent: IndexPending,
	errorComponent: IndexError,
});

function IndexRoute() {
	const { data } = useSuspenseQuery(pveDataQueryOptions);

	return (
		<>
			<div className="grid h-full grid-cols-4 place-content-center justify-between gap-x-3 gap-y-7 rounded-2xl p-3">
				<ServerStatKpiCard data={data} metric="cpu" />
				<ServerStatKpiCard data={data} metric="loadavg" />
				<ServerStatKpiCard data={data} metric="netin" />
				<ServerStatKpiCard data={data} metric="netout" />
				<ServerStatKpiCard data={data} metric="pressureiosome" />
				<ServerStatKpiCard data={data} metric="memused" />
				<ServerStatKpiCard data={data} metric="swapused" />
				<ServerStatKpiCard data={data} metric="rootused" />
			</div>
		</>
	);
}

function IndexPending() {
	return (
		<div className="flex h-full items-center justify-center p-8 text-zinc-400">
			<p>Loading server statistics...</p>
		</div>
	);
}

function IndexError({ error }: ErrorComponentProps) {
	return (
		<div className="flex h-full flex-col items-center justify-center p-8 text-rose-400">
			<h2 className="text-lg font-semibold">Failed to load server statistics</h2>
			<p className="mt-1 text-white">{error?.message ?? "Unknown error"}</p>
		</div>
	);
}
