import type { ProxmoxRrdRawDataPoint, ProxmoxTimeframe } from "@homie/types";

export interface FetchPveStatsOptions {
	signal?: AbortSignal;
	timeframe?: ProxmoxTimeframe;
}

export async function fetchPveStats({ signal, timeframe = "hour" }: FetchPveStatsOptions = {}): Promise<ProxmoxRrdRawDataPoint[]> {
	const response = await fetch(`/api/pve1?timeframe=${timeframe}`, { signal });
	if (!response.ok) {
		throw new Error(`Failed to load server stats: ${response.status} ${response.statusText}`);
	}
	return response.json();
}
