import type { ProxmoxRrdRawDataPoint, ProxmoxTimeframe } from "@homie/types";
import { getLocalTimeZone, now } from "@internationalized/date";
import { queryOptions } from "@tanstack/react-query";

export interface FetchPveStatsOptions {
	signal?: AbortSignal;
	timeframe?: ProxmoxTimeframe;
}

export function getTimeBasedTimeframe(): "hour" | "day" {
	const { minute } = now(getLocalTimeZone());
	return Math.floor(minute / 2) % 2 === 0 ? "hour" : "day";
}

export async function fetchPveStats({ signal, timeframe = "hour" }: FetchPveStatsOptions = {}): Promise<ProxmoxRrdRawDataPoint[]> {
	const response = await fetch(`/api/pve1?timeframe=${timeframe}`, { signal });
	if (!response.ok) {
		throw new Error(`Failed to load server stats: ${response.status} ${response.statusText}`);
	}
	return response.json();
}

export const pveDataQueryOptions = queryOptions({
	queryKey: ["pve-data"],
	queryFn: ({ signal }) => fetchPveStats({ signal, timeframe: getTimeBasedTimeframe() }),
	refetchInterval: 60_000,
});
