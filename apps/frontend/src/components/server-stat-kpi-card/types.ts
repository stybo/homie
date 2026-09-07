import type { MetricStatus, MetricStyle, ProxmoxDataKey, ProxmoxRrdRawDataPoint } from "@homie/types";
import type { ReactNode } from "react";

export type ServerMetricKey = "cpu" | "loadavg" | "netin" | "netout" | "pressureiosome" | "memused" | "swapused" | "rootused";

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
	chartColor: string;
	style?: MetricStyle;
	unit?: string;
	maximumFractionDigits?: number;
	series?: MetricSeriesConfig[];
	transformValue?: (raw: number, point?: ProxmoxRrdRawDataPoint) => number;
	formatValue?: (raw: number, point?: ProxmoxRrdRawDataPoint) => string;
	subvalue?: (raw: number, point?: ProxmoxRrdRawDataPoint, data?: ProxmoxRrdRawDataPoint[]) => ReactNode;
	getStatus?: (raw: number, point?: ProxmoxRrdRawDataPoint) => MetricStatus;
	tooltipFormatter: (raw: number, dataKey?: string) => string;
}

export interface ServerStatKpiCardProps {
	/** History data points from route / query */
	data: ProxmoxRrdRawDataPoint[];
	/** Metric key preset */
	metric: ServerMetricKey;
	/** Optional outer CSS class name */
	className?: string;
}
