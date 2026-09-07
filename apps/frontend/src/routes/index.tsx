import { KPI } from "@heroui-pro/react/kpi";
import { Skeleton } from "@heroui/react";
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
	);
}

function IndexPending() {
	return (
		<div className="grid h-full grid-cols-4 place-content-center justify-between gap-x-3 gap-y-7 rounded-2xl p-3">
			{Array.from({ length: 8 }).map((_, index) => (
				<KPI key={index} className="justify-between">
					<KPI.Header>
						<Skeleton className="h-8 w-8 rounded-lg" />
						<Skeleton className="h-4 w-24 rounded-md" />
					</KPI.Header>
					<KPI.Content className="grid-cols-[auto_1fr] items-center gap-2">
						<Skeleton className="h-8 w-20 rounded-md" />
						<Skeleton className="h-17.5 w-full rounded-xl" />
					</KPI.Content>
				</KPI>
			))}
		</div>
	);
}

function IndexError({ error }: ErrorComponentProps) {
	return (
		<div className="flex h-full flex-col items-center justify-center p-8 text-rose-400">
			<h2 className="text-lg font-semibold">Failed to load server statistics</h2>
			<p className="mt-1">{error?.message ?? "Unknown error"}</p>
		</div>
	);
}
