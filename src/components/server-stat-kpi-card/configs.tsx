import { ArrowDown, ArrowUp, Cpu, Database, HardDrive, Layers, Pulse, Server } from "@gravity-ui/icons";
import { formatByteRate, formatBytes, formatPercentValue } from "./formatters.ts";
import type { MetricConfig, ServerMetricKey } from "./types.ts";

const PRIMARY_COLOR = "var(--chart-primary)";
const USED_SERIES_COLOR = "var(--chart-used)";
const TOTAL_SERIES_COLOR = "var(--chart-total)";
const WARNING_SERIES_COLOR = "var(--chart-warning)";

const FILL_OPACITY_TOTAL = 0.1;
const FILL_OPACITY_USED = 0.4;

export const METRIC_CONFIGS: Record<ServerMetricKey, MetricConfig> = {
	cpu: {
		dataKey: "cpu",
		icon: <Cpu />,
		title: "CPU & I/O Wait",
		series: [
			{ dataKey: "cpu", name: "CPU", color: PRIMARY_COLOR },
			{ dataKey: "iowait", name: "I/O Wait", color: WARNING_SERIES_COLOR },
		],
		formatValue: (raw) => formatPercentValue(raw),
	},
	loadavg: {
		dataKey: "loadavg",
		icon: <Pulse />,
		title: "Load Average",
		series: [{ dataKey: "loadavg", name: "Load Average", color: PRIMARY_COLOR }],
		formatValue: (raw, point) => formatPercentValue(raw / (point?.maxcpu ?? 1)),
	},
	memused: {
		dataKey: "memused",
		icon: <Database />,
		title: "Memory usage",
		series: [
			{ dataKey: "memtotal", name: "Total", color: TOTAL_SERIES_COLOR, fillOpacity: FILL_OPACITY_TOTAL },
			{ dataKey: "memused", name: "Used", color: USED_SERIES_COLOR, fillOpacity: FILL_OPACITY_USED },
		],
		totalKey: "memtotal",
		formatValue: (raw) => formatBytes(raw),
	},
	netin: {
		dataKey: "netin",
		icon: <ArrowDown />,
		title: "Network In",
		series: [{ dataKey: "netin", name: "Network In", color: PRIMARY_COLOR }],
		formatValue: (raw) => formatByteRate(raw),
	},
	netout: {
		dataKey: "netout",
		icon: <ArrowUp />,
		title: "Network Out",
		series: [{ dataKey: "netout", name: "Network Out", color: PRIMARY_COLOR }],
		formatValue: (raw) => formatByteRate(raw),
	},
	pressureiosome: {
		dataKey: "pressureiosome",
		icon: <Server />,
		title: "IO Pressure",
		series: [
			{ dataKey: "pressureiosome", name: "Some", color: PRIMARY_COLOR },
			{ dataKey: "pressureiofull", name: "Full", color: WARNING_SERIES_COLOR },
		],
		formatValue: (raw) => formatPercentValue(raw),
	},
	rootused: {
		dataKey: "rootused",
		icon: <HardDrive />,
		title: "Root Storage",
		series: [
			{ dataKey: "roottotal", name: "Total", color: TOTAL_SERIES_COLOR, fillOpacity: FILL_OPACITY_TOTAL },
			{ dataKey: "rootused", name: "Used", color: USED_SERIES_COLOR, fillOpacity: FILL_OPACITY_USED },
		],
		totalKey: "roottotal",
		formatValue: (raw) => formatBytes(raw),
	},
	swapused: {
		dataKey: "swapused",
		icon: <Layers />,
		title: "Swap Usage",
		series: [
			{ dataKey: "swaptotal", name: "Total Swap", color: TOTAL_SERIES_COLOR, fillOpacity: FILL_OPACITY_TOTAL },
			{ dataKey: "swapused", name: "Used Swap", color: USED_SERIES_COLOR, fillOpacity: FILL_OPACITY_USED },
		],
		totalKey: "swaptotal",
		formatValue: (raw) => formatBytes(raw),
	},
};
