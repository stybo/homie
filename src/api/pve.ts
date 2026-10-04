import { getLocalTimeZone, now } from "@internationalized/date";
import { queryOptions } from "@tanstack/react-query";
import { fetchPveStatsServerFn } from "@/server/pve.ts";
import type { ProxmoxRrdRawDataPoint, ProxmoxTimeframe } from "@/types/index.ts";

export interface FetchPveStatsOptions {
	signal?: AbortSignal;
	timeframe?: ProxmoxTimeframe;
}

export function getTimeBasedTimeframe(): "hour" | "day" {
	const { minute } = now(getLocalTimeZone());
	return Math.floor(minute / 2) % 2 === 0 ? "hour" : "day";
}

export async function fetchPveStats({ timeframe = "hour" }: FetchPveStatsOptions = {}): Promise<ProxmoxRrdRawDataPoint[]> {
	return fetchPveStatsServerFn({ data: { timeframe } });
}

export const pveDataQueryOptions = queryOptions({
	queryKey: ["pve-data"],
	queryFn: () => fetchPveStats({ timeframe: getTimeBasedTimeframe() }),
	refetchInterval: 60_000,
});
