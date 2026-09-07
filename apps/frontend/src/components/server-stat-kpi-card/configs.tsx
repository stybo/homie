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
		dataKey: "cpu",
		icon: <Cpu />,
		title: "CPU & I/O Wait",
		chartColor: PRIMARY_COLOR,
		getStatus: (raw) => getThresholdStatus(raw, 0.8, 0.5),
		maximumFractionDigits: 2,
		series: [
			{ dataKey: "cpu", name: "CPU", color: PRIMARY_COLOR, fillOpacity: 0.2 },
			{ dataKey: "iowait", name: "I/O Wait", color: WARNING_SERIES_COLOR, fillOpacity: 0.15 },
		],
		style: "percent",
		tooltipFormatter: (raw) => formatPercentValue(raw),
	},
	loadavg: {
		dataKey: "loadavg",
		icon: <Pulse />,
		title: "Load Average",
		chartColor: PRIMARY_COLOR,
		getStatus: (raw, point) => getThresholdStatus(raw / (point?.maxcpu ?? 4), 0.85, 0.7),
		maximumFractionDigits: 2,
		style: "percent",
		tooltipFormatter: (raw) => formatPercentValue(raw),
		transformValue: (raw, point) => raw / (point?.maxcpu ?? 1),
	},
	memused: {
		dataKey: "memused",
		icon: <Database />,
		title: "Memory usage",
		chartColor: USED_SERIES_COLOR,
		getStatus: (raw, point) => getThresholdStatus(raw / (point?.memtotal ?? Infinity), 0.9, 0.75),
		maximumFractionDigits: 2,
		series: [
			{ dataKey: "memtotal", name: "Total", color: TOTAL_SERIES_COLOR, fillOpacity: 0.15, strokeWidth: 1.5 },
			{ dataKey: "memused", name: "Used", color: USED_SERIES_COLOR, fillOpacity: 0.45, strokeWidth: 1.5 },
		],
		style: "unit",
		subvalue: (raw, point) => formatCapacitySubvalue(raw, point?.memtotal),
		tooltipFormatter: (raw) => formatBytes(raw),
		transformValue: (raw) => raw / GIB,
		unit: "gigabyte",
	},
	netin: {
		dataKey: "netin",
		icon: <ArrowDown />,
		title: "Network In",
		chartColor: PRIMARY_COLOR,
		formatValue: (raw) => formatByteRate(raw),
		getStatus: (raw) => getThresholdStatus(raw, 100 * MIB, 25 * MIB),
		tooltipFormatter: (raw) => formatByteRate(raw),
	},
	netout: {
		dataKey: "netout",
		icon: <ArrowUp />,
		title: "Network Out",
		chartColor: PRIMARY_COLOR,
		formatValue: (raw) => formatByteRate(raw),
		getStatus: (raw) => getThresholdStatus(raw, 100 * MIB, 25 * MIB),
		tooltipFormatter: (raw) => formatByteRate(raw),
	},
	pressureiosome: {
		dataKey: "pressureiosome",
		icon: <Server />,
		title: "IO Pressure",
		chartColor: PRIMARY_COLOR,
		getStatus: (raw) => getThresholdStatus(raw, 0.2, 0.05),
		maximumFractionDigits: 2,
		series: [
			{ dataKey: "pressureiosome", name: "Some", color: PRIMARY_COLOR, fillOpacity: 0.25 },
			{ dataKey: "pressureiofull", name: "Full", color: WARNING_SERIES_COLOR, fillOpacity: 0.2 },
		],
		style: "percent",
		tooltipFormatter: (raw) => formatPercentValue(raw),
	},
	rootused: {
		dataKey: "rootused",
		icon: <HardDrive />,
		title: "Root Storage",
		chartColor: USED_SERIES_COLOR,
		getStatus: (raw, point) => getThresholdStatus(raw / (point?.roottotal ?? Infinity), 0.9, 0.8),
		maximumFractionDigits: 2,
		series: [
			{ dataKey: "roottotal", name: "Total", color: TOTAL_SERIES_COLOR, fillOpacity: 0.15, strokeWidth: 1.5 },
			{ dataKey: "rootused", name: "Used", color: USED_SERIES_COLOR, fillOpacity: 0.45, strokeWidth: 1.5 },
		],
		style: "unit",
		subvalue: (raw, point) => formatCapacitySubvalue(raw, point?.roottotal),
		tooltipFormatter: (raw) => formatBytes(raw),
		transformValue: (raw) => raw / GIB,
		unit: "gigabyte",
	},
	swapused: {
		dataKey: "swapused",
		icon: <Layers />,
		title: "Swap Usage",
		chartColor: USED_SERIES_COLOR,
		formatValue: (raw) => formatBytes(raw),
		getStatus: (raw, point) => getThresholdStatus(raw / (point?.swaptotal ?? Infinity), 0.5, 0.2),
		series: [
			{
				dataKey: "swaptotal",
				name: "Total Swap",
				color: TOTAL_SERIES_COLOR,
				fillOpacity: 0.08,
				strokeWidth: 1,
			},
			{ dataKey: "swapused", name: "Used Swap", color: USED_SERIES_COLOR, fillOpacity: 0.35, strokeWidth: 1.5 },
		],
		subvalue: (raw, point) => formatCapacitySubvalue(raw, point?.swaptotal),
		tooltipFormatter: (raw) => formatBytes(raw),
	},
};
