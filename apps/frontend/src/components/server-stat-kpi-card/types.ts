import type { MetricStatus, MetricStyle, ProxmoxDataKey, ProxmoxRrdRawDataPoint } from "@homie/types";
import type { ReactNode } from "react";

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
	getStatus?: (raw: number, point?: ProxmoxRrdRawDataPoint) => MetricStatus;
	tooltipFormatter: (raw: number, dataKey?: string) => string;
}

export interface ServerStatKpiCardProps {
	/** History data points from route / query */
	data: ProxmoxRrdRawDataPoint[];
	/** Metric key preset (e.g. 'cpu', 'memused', 'netin', etc.) */
	metric: ProxmoxDataKey;
	/** Optional outer CSS class name */
	className?: string;
}
