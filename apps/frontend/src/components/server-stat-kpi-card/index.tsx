import { KPI } from "@heroui-pro/react/kpi";
import { CardValue } from "./card-value.tsx";
import { METRIC_CONFIGS } from "./configs.tsx";
import { MultiSeriesChart } from "./multi-series-chart.tsx";
import { SingleSeriesChart } from "./single-series-chart.tsx";
import type { ServerStatKpiCardProps } from "./types.ts";

export default function ServerStatKpiCard({ data, metric, className }: ServerStatKpiCardProps) {
	// 1. Resolve Latest Data Point
	const latestPoint = data.at(-1);

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
		subvalue,
		tooltipFormatter,
	} = preset;

	// 3. Compute Value via Config
	const rawValue = latestPoint?.[dataKey] ?? 0;
	const displayValue = transformValue?.(rawValue, latestPoint) ?? rawValue;
	const formattedCustomValue = formatValue?.(rawValue, latestPoint);
	const subvalueContent = subvalue?.(rawValue, latestPoint, data);

	return (
		<KPI className={className}>
			<KPI.Header>
				<KPI.Icon className="bg-zinc-200/80 text-zinc-700 dark:bg-emerald-500/15 dark:text-emerald-400">{icon}</KPI.Icon>
				<KPI.Title>{title}</KPI.Title>
			</KPI.Header>

			<KPI.Content className="grid-cols-[auto_1fr] items-center gap-2">
				<div className="flex flex-col items-start">
					<CardValue
						displayValue={displayValue}
						formattedCustomValue={formattedCustomValue}
						maximumFractionDigits={maximumFractionDigits}
						style={style}
						unit={unit}
					/>
					{subvalueContent && <span className="text-xs font-normal text-zinc-500 dark:text-zinc-400">{subvalueContent}</span>}
				</div>

				{series?.length ? (
					<MultiSeriesChart data={data} series={series} title={title} tooltipFormatter={tooltipFormatter} />
				) : (
					<SingleSeriesChart chartColor={chartColor} data={data} dataKey={dataKey} title={title} tooltipFormatter={tooltipFormatter} />
				)}
			</KPI.Content>
		</KPI>
	);
}
