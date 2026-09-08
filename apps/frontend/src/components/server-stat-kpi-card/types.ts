import type { ProxmoxDataKey, ProxmoxRrdRawDataPoint } from "@homie/types";
import type { ReactNode } from "react";

export const METRIC_KEYS = ["cpu", "loadavg", "netin", "netout", "pressureiosome", "memused", "swapused", "rootused"] as const;

export type ServerMetricKey = (typeof METRIC_KEYS)[number];

export interface MetricSeriesConfig {
	color: string;
	dataKey: ProxmoxDataKey;
	fillOpacity?: number;
	name?: string;
	strokeWidth?: number;
}

export interface MetricConfig {
	dataKey: ProxmoxDataKey;
	formatValue: (raw: number, point?: ProxmoxRrdRawDataPoint) => string;
	icon: ReactNode;
	series: MetricSeriesConfig[];
	title: string;
	totalKey?: ProxmoxDataKey;
}

/** Context provided to all compound children within ServerStatKpiCard */
export interface ServerStatKpiCardContextValue {
	/** Metric configuration definition */
	config: MetricConfig;
	/** Historical data points */
	data: ProxmoxRrdRawDataPoint[];
	/** Formatted representation of the raw value */
	formattedValue: string;
	/** Most recent data point */
	latestPoint: ProxmoxRrdRawDataPoint | undefined;
	/** Current metric key */
	metric: ServerMetricKey;
	/** Latest raw numeric value */
	rawValue: number;
	/** Capacity subvalue string (e.g. "65.4% of 32 GB") or null */
	subvalue: string | null;
}

export interface ServerStatKpiCardProps {
	/** History data points from route / query */
	data: ProxmoxRrdRawDataPoint[];
	/** Metric key preset */
	metric: ServerMetricKey;
}
