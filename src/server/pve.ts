import { createServerFn } from "@tanstack/react-start";
import type { ProxmoxRrdRawDataPoint, ProxmoxRrdResponse, ProxmoxTimeframe } from "@/types/index.ts";

export function parseTimeframe(value?: string | null): ProxmoxTimeframe {
	if (value === "day" || value === "week" || value === "month" || value === "year") {
		return value;
	}
	return "hour";
}

export async function fetchNodeData(timeframe: ProxmoxTimeframe): Promise<ProxmoxRrdRawDataPoint[]> {
	const token = process.env.PROXMOX_TOKEN;
	if (!token) {
		throw new Error("PROXMOX_TOKEN is not configured");
	}

	const baseUrl = process.env.PROXMOX_BASE_URL;
	if (!baseUrl) {
		throw new Error("PROXMOX_BASE_URL is not configured");
	}

	const response = await fetch(`${baseUrl}?timeframe=${timeframe}`, {
		headers: {
			Authorization: token,
		},
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch node data: ${response.statusText}`);
	}

	const payload: ProxmoxRrdResponse = await response.json();
	return payload.data;
}

export const fetchPveStatsServerFn = createServerFn({ method: "GET" })
	.validator((data?: { timeframe?: ProxmoxTimeframe }) => data)
	.handler(async ({ data }) => {
		const timeframe = parseTimeframe(data?.timeframe);
		return fetchNodeData(timeframe);
	});
