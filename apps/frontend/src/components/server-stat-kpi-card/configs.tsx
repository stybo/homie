import { ArrowDown, ArrowUp, Cpu, Database, HardDrive, Layers, Pulse, Server } from "@gravity-ui/icons";
import type { ProxmoxDataKey } from "@homie/types";
import { formatByteRate, formatBytes } from "./formatters.ts";
import type { MetricConfig } from "./types.ts";

/* -------------------------------------------------------------------------- */
/*                         SHARED COLOR PALETTE TOKENS                        */
/* -------------------------------------------------------------------------- */
const PRIMARY_COLOR = "#06b6d4"; // Vibrant Modern Cyan for all single metric charts
const USED_SERIES_COLOR = "#6366f1"; // Indigo for active used resource in paired charts
const TOTAL_SERIES_COLOR = "#c084fc"; // Soft Violet for ceiling/total capacity in paired charts
const WARNING_SERIES_COLOR = "#f43f5e"; // Rose for secondary stress metric (e.g. IO wait / IO full)

export const METRIC_CONFIGS: Record<ProxmoxDataKey, MetricConfig> = {
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
		getStatus: (raw) => (raw > 0.8 ? "danger" : raw > 0.5 ? "warning" : "success"),
		tooltipFormatter: (raw, key) => (key === "iowait" ? `${(raw * 100).toFixed(2)}%` : `${(raw * 100).toFixed(2)}%`),
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
		transformValue: (raw) => raw / (1024 * 1024 * 1024),
		getStatus: (raw, point) => {
			if (!point?.memtotal) return "success";
			const ratio = raw / point.memtotal;
			return ratio > 0.9 ? "danger" : ratio > 0.75 ? "warning" : "success";
		},
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
		getStatus: (raw, point) => {
			if (!point?.swaptotal || point.swaptotal === 0) return "success";
			const ratio = raw / point.swaptotal;
			return ratio > 0.5 ? "danger" : ratio > 0.2 ? "warning" : "success";
		},
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
		transformValue: (raw) => raw / (1024 * 1024 * 1024),
		getStatus: (raw, point) => {
			if (!point?.roottotal) return "success";
			const ratio = raw / point.roottotal;
			return ratio > 0.9 ? "danger" : ratio > 0.8 ? "warning" : "success";
		},
		tooltipFormatter: (raw) => formatBytes(raw),
	},
	netin: {
		title: "Network In",
		icon: <ArrowDown />,
		dataKey: "netin",
		chartColor: PRIMARY_COLOR,
		formatValue: (raw) => formatByteRate(raw),
		getStatus: (raw) => (raw > 100 * 1024 * 1024 ? "danger" : raw > 25 * 1024 * 1024 ? "warning" : "success"),
		tooltipFormatter: (raw) => formatByteRate(raw),
	},
	netout: {
		title: "Network Out",
		icon: <ArrowUp />,
		dataKey: "netout",
		chartColor: PRIMARY_COLOR,
		formatValue: (raw) => formatByteRate(raw),
		getStatus: (raw) => (raw > 100 * 1024 * 1024 ? "danger" : raw > 25 * 1024 * 1024 ? "warning" : "success"),
		tooltipFormatter: (raw) => formatByteRate(raw),
	},
	loadavg: {
		title: "Load Average",
		icon: <Pulse />,
		dataKey: "loadavg",
		style: "percent",
		maximumFractionDigits: 2,
		chartColor: PRIMARY_COLOR,
		transformValue: (raw, point) => (point?.maxcpu ? raw / point.maxcpu : raw),
		getStatus: (raw, point) => {
			const ratio = point?.maxcpu ? raw / point.maxcpu : raw / 4;
			return ratio > 0.85 ? "danger" : ratio > 0.7 ? "warning" : "success";
		},
		tooltipFormatter: (raw) => `${(raw * 100).toFixed(2)}%`,
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
		getStatus: (raw) => (raw > 0.2 ? "danger" : raw > 0.05 ? "warning" : "success"),
		tooltipFormatter: (raw, key) => (key === "pressureiofull" ? `${(raw * 100).toFixed(2)}%` : (raw * 100).toFixed(2)),
	},
	iowait: {
		title: "IO Wait",
		icon: <Server />,
		dataKey: "iowait",
		style: "percent",
		maximumFractionDigits: 2,
		chartColor: WARNING_SERIES_COLOR,
		getStatus: (raw) => (raw > 0.2 ? "danger" : raw > 0.1 ? "warning" : "success"),
		tooltipFormatter: (raw) => `${(raw * 100).toFixed(2)}%`,
	},
	arcsize: {
		title: "ZFS ARC Cache",
		icon: <Database />,
		dataKey: "arcsize",
		chartColor: PRIMARY_COLOR,
		formatValue: (raw) => formatBytes(raw),
		getStatus: () => "success",
		tooltipFormatter: (raw) => formatBytes(raw),
	},
	pressurecpusome: {
		title: "Pressure Stall",
		icon: <Pulse />,
		dataKey: "pressurecpusome",
		style: "percent",
		maximumFractionDigits: 2,
		chartColor: PRIMARY_COLOR,
		series: [
			{ dataKey: "pressurecpusome", color: PRIMARY_COLOR, name: "CPU", fillOpacity: 0.2 },
			{ dataKey: "pressureiosome", color: WARNING_SERIES_COLOR, name: "I/O", fillOpacity: 0.15 },
			{ dataKey: "pressurememorysome", color: USED_SERIES_COLOR, name: "Memory", fillOpacity: 0.15 },
		],
		getStatus: (raw) => (raw > 0.3 ? "danger" : raw > 0.1 ? "warning" : "success"),
		tooltipFormatter: (raw, key) => {
			const label = key === "pressureiosome" ? "I/O" : key === "pressurememorysome" ? "Memory" : "CPU";
			return `${label}: ${(raw * 100).toFixed(2)}%`;
		},
	},
	time: {
		title: "Time",
		icon: <Pulse />,
		dataKey: "time",
		chartColor: "#94a3b8",
		tooltipFormatter: (raw) => String(raw),
	},
	maxcpu: {
		title: "CPU Cores",
		icon: <Cpu />,
		dataKey: "maxcpu",
		chartColor: PRIMARY_COLOR,
		tooltipFormatter: (raw) => `${raw} Cores`,
	},
	memtotal: {
		title: "Total Memory",
		icon: <Database />,
		dataKey: "memtotal",
		chartColor: TOTAL_SERIES_COLOR,
		formatValue: (raw) => formatBytes(raw),
		tooltipFormatter: (raw) => formatBytes(raw),
	},
	memavailable: {
		title: "Available Memory",
		icon: <Database />,
		dataKey: "memavailable",
		chartColor: PRIMARY_COLOR,
		formatValue: (raw) => formatBytes(raw),
		tooltipFormatter: (raw) => formatBytes(raw),
	},
	swaptotal: {
		title: "Total Swap",
		icon: <Layers />,
		dataKey: "swaptotal",
		chartColor: TOTAL_SERIES_COLOR,
		formatValue: (raw) => formatBytes(raw),
		tooltipFormatter: (raw) => formatBytes(raw),
	},
	roottotal: {
		title: "Total Storage",
		icon: <HardDrive />,
		dataKey: "roottotal",
		chartColor: TOTAL_SERIES_COLOR,
		formatValue: (raw) => formatBytes(raw),
		tooltipFormatter: (raw) => formatBytes(raw),
	},
	pressureiofull: {
		title: "IO Pressure (Full)",
		icon: <Server />,
		dataKey: "pressureiofull",
		chartColor: WARNING_SERIES_COLOR,
		tooltipFormatter: (raw) => `${(raw * 100).toFixed(2)}%`,
	},
	pressurememorysome: {
		title: "Memory Pressure",
		icon: <Pulse />,
		dataKey: "pressurememorysome",
		chartColor: PRIMARY_COLOR,
		tooltipFormatter: (raw) => `${(raw * 100).toFixed(2)}%`,
	},
	pressurememoryfull: {
		title: "Memory Pressure (Full)",
		icon: <Pulse />,
		dataKey: "pressurememoryfull",
		chartColor: WARNING_SERIES_COLOR,
		tooltipFormatter: (raw) => `${(raw * 100).toFixed(2)}%`,
	},
};
