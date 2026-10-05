import { Skeleton } from "@heroui/react";
import { areaY, type ChartPoint, type ChartSvgRenderer, d3Curve, defineChart, lineY } from "@tanstack/charts";
import { crosshair } from "@tanstack/charts/crosshair";
import { focusGroupX } from "@tanstack/charts/focus";
import { decorative } from "@tanstack/charts/mark/decorative";
import { Chart as TanStackChart } from "@tanstack/charts/react/tooltip";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { renderChartSvg } from "@tanstack/charts/svg";
import { tooltip } from "@tanstack/charts/tooltip";
import { portal } from "@tanstack/charts/tooltip/portal";
import { curveMonotoneX } from "d3-shape";
import type { ProxmoxRrdRawDataPoint } from "@/types";
import { formatTime } from "./formatters.ts";
import { kpiChartStyles } from "./styles.ts";
import type { MetricSeriesConfig } from "./types.ts";

export interface ChartProps {
	data: ProxmoxRrdRawDataPoint[];
	formatValue: (raw: number) => string;
	series: MetricSeriesConfig[];
	title: string;
}

interface ChartTooltipProps {
	datum: ProxmoxRrdRawDataPoint;
	formatValue: (raw: number) => string;
	points: readonly ChartPoint<ProxmoxRrdRawDataPoint, number, number>[];
	series: MetricSeriesConfig[];
	title: string;
}

const chartSlots = kpiChartStyles();

function ChartTooltip({ title, datum, points, series, formatValue }: ChartTooltipProps) {
	return (
		<div className={chartSlots.tooltip()}>
			<span className={chartSlots.time()}>{formatTime(datum.time)}</span>
			{series.map((s) => {
				const point = points.find((p) => p.markId === s.dataKey);
				return (
					<div key={s.dataKey} className={chartSlots.item()}>
						<span className={chartSlots.swatch()} style={{ backgroundColor: s.color }} />
						<span className={chartSlots.label()}>{s.name ?? title}</span>
						<span className={chartSlots.value()}>{formatValue(point?.yValue ?? datum[s.dataKey])}</span>
					</div>
				);
			})}
		</div>
	);
}

/**
 * Custom SVG renderer hook for TanStack Charts.
 * Injects preserveAspectRatio="none" so the sparkline stretches to 100% of the card width
 * immediately during SSR, preventing letterboxing gaps before client measurement.
 */
const renderFullWidthSvg: ChartSvgRenderer = (scene, options) => {
	return renderChartSvg(scene, options).replace(/^<svg(?=[\s>])/, '<svg preserveAspectRatio="none"');
};

export function Chart({ title, data, series, formatValue }: ChartProps) {
	if (!data.length) {
		return <Skeleton className="h-15 w-full rounded-lg" />;
	}

	const chart = defineChart({
		focus: focusGroupX,
		focusRing: {
			fill: "var(--surface)",
			radius: 3.5,
			strokeWidth: 2,
		},
		guides: false,
		keyboard: false,
		margin: { bottom: 6, left: 0, right: 0, top: 6 },
		marks: [
			crosshair({
				marker: false,
				motion: false,
				x: {
					stroke: "var(--muted)",
					strokeDasharray: "4 3",
					strokeOpacity: 0.8,
					strokeWidth: 1.5,
				},
				y: false,
			}),
			...series.map((s) =>
				decorative(
					areaY(data, {
						id: `${s.dataKey}-area`,
						curve: d3Curve(curveMonotoneX),
						fill: s.color,
						fillOpacity: s.fillOpacity ?? 0.2,
						x: (d: ProxmoxRrdRawDataPoint) => d.time,
						y: (d: ProxmoxRrdRawDataPoint) => d[s.dataKey],
					}),
				),
			),
			...series.map((s) =>
				lineY(data, {
					id: s.dataKey,
					color: s.color,
					curve: d3Curve(curveMonotoneX),
					strokeWidth: s.strokeWidth ?? 1.5,
					x: (d: ProxmoxRrdRawDataPoint) => d.time,
					y: (d: ProxmoxRrdRawDataPoint) => d[s.dataKey],
				}),
			),
		],
		scales: {
			x: { scale: scaleLinear },
			y: { nice: true, scale: scaleLinear },
		},
		tooltip: {
			anchor: { x: "point", y: "plot-top" },
			motion: false,
			offset: 14,
			placement: "top",
			portal,
			use: tooltip,
		},
	});

	return (
		<div className={chartSlots.container()}>
			<TanStackChart
				ariaLabel={title}
				definition={chart}
				height={60}
				initialWidth={280}
				renderSvg={renderFullWidthSvg}
				renderTooltipBody={({ points }) => {
					if (!points?.length) return null;
					return <ChartTooltip title={title} datum={points[0].datum} points={points} series={series} formatValue={formatValue} />;
				}}
			/>
		</div>
	);
}
