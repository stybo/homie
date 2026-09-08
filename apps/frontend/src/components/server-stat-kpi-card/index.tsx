import { KPI } from "@heroui-pro/react/kpi";
import { Chart } from "./chart.tsx";
import { METRIC_CONFIGS } from "./configs.tsx";
import { formatCapacitySubvalue } from "./formatters.ts";
import type { ServerStatKpiCardProps } from "./types.ts";

export default function ServerStatKpiCard({ data, metric }: ServerStatKpiCardProps) {
	const { dataKey, icon, title, series, totalKey, formatValue } = METRIC_CONFIGS[metric];

	const latestPoint = data.at(-1);
	const rawValue = latestPoint?.[dataKey] ?? 0;
	const subvalue = totalKey ? formatCapacitySubvalue(rawValue, latestPoint?.[totalKey]) : null;

	return (
		<KPI>
			<KPI.Header>
				<KPI.Icon className="bg-zinc-200/80 text-zinc-700 dark:bg-emerald-500/15 dark:text-emerald-400">{icon}</KPI.Icon>
				<KPI.Title>{title}</KPI.Title>
			</KPI.Header>

			<KPI.Content className="grid-cols-[auto_1fr]">
				<div className="pt-3">
					<KPI.Value className="pr-2 text-2xl font-bold" value={rawValue}>
						{() => formatValue(rawValue, latestPoint)}
					</KPI.Value>
					<KPI.Footer className="min-h-3 text-xs text-zinc-500 dark:text-zinc-400">{subvalue}</KPI.Footer>
				</div>

				<Chart title={title} data={data} series={series} formatValue={(raw) => formatValue(raw, latestPoint)} />
			</KPI.Content>
		</KPI>
	);
}
