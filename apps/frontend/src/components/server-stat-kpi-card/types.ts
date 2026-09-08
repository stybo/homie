import type { ProxmoxDataKey, ProxmoxRrdRawDataPoint } from "@homie/types";
import type { ReactNode } from "react";

export const METRIC_KEYS = ["cpu", "loadavg", "netin", "netout", "pressureiosome", "memused", "swapused", "rootused"] as const;

export type ServerMetricKey = (typeof METRIC_KEYS)[number];

export interface MetricSeriesConfig {
	dataKey: string;
	color: string;
	name?: string;
	fillOpacity?: number;
	strokeWidth?: number;
}

export interface MetricConfig {
	title: string;
	icon: ReactNode;
	dataKey: ProxmoxDataKey;
	series: MetricSeriesConfig[];
	formatValue: (raw: number, point?: ProxmoxRrdRawDataPoint) => string;
	totalKey?: ProxmoxDataKey;
}

export interface ServerStatKpiCardProps {
	/** History data points from route / query */
	data: ProxmoxRrdRawDataPoint[];
	/** Metric key preset */
	metric: ServerMetricKey;
	/** Optional outer CSS class name */
	className?: string;
}
