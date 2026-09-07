import { KPI } from "@heroui-pro/react/kpi";
import { CardValue } from "./card-value.tsx";
import { METRIC_CONFIGS } from "./configs.tsx";
import { MultiSeriesChart } from "./multi-series-chart.tsx";
import { SingleSeriesChart } from "./single-series-chart.tsx";
import type { ServerStatKpiCardProps } from "./types.ts";

export default function ServerStatKpiCard({ data, metric, className }: ServerStatKpiCardProps) {
	// 1. Resolve Latest Data Point
	const latestPoint = data.length > 0 ? data[data.length - 1] : undefined;

	// 2. Resolve Metric Configuration directly
	const preset = METRIC_CONFIGS[metric];
	const {
		title,
		icon,
		style,
		unit,
		chartColor,
		series,
		maximumFractionDigits,
		dataKey,
		transformValue,
		formatValue,
		getStatus,
		tooltipFormatter,
	} = preset;

	// 3. Compute Value & Status via Config
	const rawValue = latestPoint?.[dataKey] ?? 0;
	const displayValue = transformValue ? transformValue(rawValue, latestPoint) : rawValue;
	const formattedCustomValue = formatValue ? formatValue(rawValue, latestPoint) : undefined;
	const status = getStatus ? getStatus(rawValue, latestPoint) : undefined;

	return (
		<KPI className={className}>
			<KPI.Header>
				<KPI.Icon status={status}>{icon}</KPI.Icon>
				<KPI.Title>{title}</KPI.Title>
			</KPI.Header>

			<KPI.Content className="grid-cols-[auto_1fr] items-center gap-2">
				<CardValue
					displayValue={displayValue}
					formattedCustomValue={formattedCustomValue}
					maximumFractionDigits={maximumFractionDigits}
					style={style}
					unit={unit}
				/>

				{series && series.length > 0 ? (
					<MultiSeriesChart data={data} series={series} title={title} tooltipFormatter={tooltipFormatter} />
				) : (
					<SingleSeriesChart chartColor={chartColor} data={data} dataKey={dataKey} title={title} tooltipFormatter={tooltipFormatter} />
				)}
			</KPI.Content>
		</KPI>
	);
}
