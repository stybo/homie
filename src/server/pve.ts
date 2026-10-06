import { createServerFn } from "@tanstack/react-start";
import type { ProxmoxRrdRawDataPoint, ProxmoxRrdResponse, ProxmoxTimeframe } from "@/types/index.ts";

export async function fetchNodeData(timeframe: ProxmoxTimeframe = "hour"): Promise<ProxmoxRrdRawDataPoint[]> {
	const base = process.env.PROXMOX_BASE_URL ?? "https://proxmox.stybo.nl";
	const node = process.env.PROXMOX_NODE ?? "homelab";
	const endpoint = base.includes("/api2") ? base : `${base.replace(/\/+$/, "")}/api2/json/nodes/${node}/rrddata`;

	const response = await fetch(`${endpoint}?timeframe=${timeframe}`, {
		headers: {
			Authorization: process.env.PROXMOX_TOKEN ?? "",
		},
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch node data: ${response.statusText}`);
	}

	const payload: ProxmoxRrdResponse = await response.json();
	return payload.data;
}

export const fetchPveStatsServerFn = createServerFn({ method: "GET" })
	.validator((data?: { timeframe?: ProxmoxTimeframe }) => data?.timeframe ?? "hour")
	.handler(async ({ data: timeframe }) => fetchNodeData(timeframe));
