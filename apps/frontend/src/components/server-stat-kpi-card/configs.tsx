import { ArrowDown, ArrowUp, Cpu, Database, HardDrive, Layers, Pulse, Server } from "@gravity-ui/icons";
import type { MetricStatus } from "@homie/types";
import { formatByteRate, formatBytes, formatPercentValue } from "./formatters.ts";
import type { MetricConfig, ServerMetricKey } from "./types.ts";

/* -------------------------------------------------------------------------- */
/*                         SHARED COLOR PALETTE TOKENS                        */
/* -------------------------------------------------------------------------- */
const PRIMARY_COLOR = "#06b6d4"; // Vibrant Modern Cyan for all single metric charts
const USED_SERIES_COLOR = "#6366f1"; // Indigo for active used resource in paired charts
const TOTAL_SERIES_COLOR = "#c084fc"; // Soft Violet for ceiling/total capacity in paired charts
const WARNING_SERIES_COLOR = "#f43f5e"; // Rose for secondary stress metric (e.g. IO wait / IO full)

/* -------------------------------------------------------------------------- */
/*                               SHARED CONSTANTS                             */
/* -------------------------------------------------------------------------- */
const GIB = 1024 ** 3;
const MIB = 1024 ** 2;

const formatCapacitySubvalue = (used: number, total?: number) =>
	total ? `${formatPercentValue(used / total, 1)} of ${formatBytes(total)}` : null;

const getThresholdStatus = (value: number, danger: number, warning: number): MetricStatus =>
	value > danger ? "danger" : value > warning ? "warning" : "success";

export const METRIC_CONFIGS: Record<ServerMetricKey, MetricConfig> = {
	cpu: {
		title: "CPU & I/O Wait",
		icon: <Cpu />,
		dataKey: "cpu",
		style: "percent",
		chartColor: PRIMARY_COLOR,
		maximumFractionDigits: 2,
		series: [
			{ dataKey: "cpu", color: PRIMARY_COLOR, name: "CPU", fillOpacity: 0.2 },
			{ dataKey: "iowait", color: WARNING_SERIES_COLOR, name: "I/O Wait", fillOpacity: 0.15 },
		],
		getStatus: (raw) => getThresholdStatus(raw, 0.8, 0.5),
		tooltipFormatter: (raw) => formatPercentValue(raw),
	},
	loadavg: {
		title: "Load Average",
		icon: <Pulse />,
		dataKey: "loadavg",
		style: "percent",
		maximumFractionDigits: 2,
		chartColor: PRIMARY_COLOR,
		transformValue: (raw, point) => raw / (point?.maxcpu ?? 1),
		getStatus: (raw, point) => getThresholdStatus(raw / (point?.maxcpu ?? 4), 0.85, 0.7),
		tooltipFormatter: (raw) => formatPercentValue(raw),
	},
	netin: {
		title: "Network In",
		icon: <ArrowDown />,
		dataKey: "netin",
		chartColor: PRIMARY_COLOR,
		formatValue: (raw) => formatByteRate(raw),
		getStatus: (raw) => getThresholdStatus(raw, 100 * MIB, 25 * MIB),
		tooltipFormatter: (raw) => formatByteRate(raw),
	},
	netout: {
		title: "Network Out",
		icon: <ArrowUp />,
		dataKey: "netout",
		chartColor: PRIMARY_COLOR,
		formatValue: (raw) => formatByteRate(raw),
		getStatus: (raw) => getThresholdStatus(raw, 100 * MIB, 25 * MIB),
		tooltipFormatter: (raw) => formatByteRate(raw),
	},
	pressureiosome: {
		title: "IO Pressure",
		icon: <Server />,
		dataKey: "pressureiosome",
		style: "percent",
		maximumFractionDigits: 2,
		chartColor: PRIMARY_COLOR,
		series: [
			{ dataKey: "pressureiosome", color: PRIMARY_COLOR, name: "Some", fillOpacity: 0.25 },
			{ dataKey: "pressureiofull", color: WARNING_SERIES_COLOR, name: "Full", fillOpacity: 0.2 },
		],
		getStatus: (raw) => getThresholdStatus(raw, 0.2, 0.05),
		tooltipFormatter: (raw) => formatPercentValue(raw),
	},
	memused: {
		title: "Memory usage",
		icon: <Database />,
		dataKey: "memused",
		style: "unit",
		unit: "gigabyte",
		maximumFractionDigits: 2,
		chartColor: USED_SERIES_COLOR,
		series: [
			{ dataKey: "memtotal", color: TOTAL_SERIES_COLOR, name: "Total", fillOpacity: 0.15, strokeWidth: 1.5 },
			{ dataKey: "memused", color: USED_SERIES_COLOR, name: "Used", fillOpacity: 0.45, strokeWidth: 1.5 },
		],
		transformValue: (raw) => raw / GIB,
		subvalue: (raw, point) => formatCapacitySubvalue(raw, point?.memtotal),
		getStatus: (raw, point) => getThresholdStatus(raw / (point?.memtotal ?? Infinity), 0.9, 0.75),
		tooltipFormatter: (raw) => formatBytes(raw),
	},
	swapused: {
		title: "Swap Usage",
		icon: <Layers />,
		dataKey: "swapused",
		chartColor: USED_SERIES_COLOR,
		series: [
			{
				dataKey: "swaptotal",
				color: TOTAL_SERIES_COLOR,
				name: "Total Swap",
				fillOpacity: 0.08,
				strokeWidth: 1,
			},
			{ dataKey: "swapused", color: USED_SERIES_COLOR, name: "Used Swap", fillOpacity: 0.35, strokeWidth: 1.5 },
		],
		formatValue: (raw) => formatBytes(raw),
		subvalue: (raw, point) => formatCapacitySubvalue(raw, point?.swaptotal),
		getStatus: (raw, point) => getThresholdStatus(raw / (point?.swaptotal ?? Infinity), 0.5, 0.2),
		tooltipFormatter: (raw) => formatBytes(raw),
	},
	rootused: {
		title: "Root Storage",
		icon: <HardDrive />,
		dataKey: "rootused",
		style: "unit",
		unit: "gigabyte",
		maximumFractionDigits: 2,
		chartColor: USED_SERIES_COLOR,
		series: [
			{ dataKey: "roottotal", color: TOTAL_SERIES_COLOR, name: "Total", fillOpacity: 0.15, strokeWidth: 1.5 },
			{ dataKey: "rootused", color: USED_SERIES_COLOR, name: "Used", fillOpacity: 0.45, strokeWidth: 1.5 },
		],
		transformValue: (raw) => raw / GIB,
		subvalue: (raw, point) => formatCapacitySubvalue(raw, point?.roottotal),
		getStatus: (raw, point) => getThresholdStatus(raw / (point?.roottotal ?? Infinity), 0.9, 0.8),
		tooltipFormatter: (raw) => formatBytes(raw),
	},
};
