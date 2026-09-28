import { KPI } from "@heroui-pro/react/kpi";
import type { ReactNode } from "react";
import { Chart } from "./chart.tsx";
import { METRIC_CONFIGS } from "./configs.tsx";
import { ServerStatKpiCardContext, useServerStatKpiCardContext } from "./context.ts";
import { formatCapacitySubvalue } from "./formatters.ts";
import type { ServerStatKpiCardContextValue, ServerStatKpiCardProps } from "./types.ts";

export function ServerStatKpiCardHeader({ children }: { children: ReactNode }) {
	return <KPI.Header>{children}</KPI.Header>;
}

export function ServerStatKpiCardIcon() {
	const { config } = useServerStatKpiCardContext();
	return <KPI.Icon className="bg-zinc-200/80 text-zinc-700 dark:bg-emerald-500/15 dark:text-emerald-400">{config.icon}</KPI.Icon>;
}

export function ServerStatKpiCardTitle() {
	const { config } = useServerStatKpiCardContext();
	return <KPI.Title>{config.title}</KPI.Title>;
}

export function ServerStatKpiCardValue() {
	const { formattedValue, rawValue } = useServerStatKpiCardContext();

	return (
		<KPI.Value className="text-2xl font-bold" value={rawValue}>
			{() => formattedValue}
		</KPI.Value>
	);
}

export function ServerStatKpiCardFooter() {
	const { subvalue } = useServerStatKpiCardContext();
	return <KPI.Footer className="text-xs text-zinc-500 dark:text-zinc-400">{subvalue}</KPI.Footer>;
}

export function ServerStatKpiCardChart() {
	const { config, data, latestPoint } = useServerStatKpiCardContext();
	return <Chart title={config.title} data={data} series={config.series} formatValue={(raw) => config.formatValue(raw, latestPoint)} />;
}

export function ServerStatKpiCardContent({ children }: { children: ReactNode }) {
	return <KPI.Content className="flex flex-col gap-2">{children}</KPI.Content>;
}

export function ServerStatKpiCard({ data, metric }: ServerStatKpiCardProps) {
	const config = METRIC_CONFIGS[metric];

	// Derive values during render (rerender-derived-state-no-effect)
	const latestPoint = data.at(-1);
	const rawValue = latestPoint?.[config.dataKey] ?? 0;
	const formattedValue = config.formatValue(rawValue, latestPoint);
	const subvalue = config.totalKey ? formatCapacitySubvalue(rawValue, latestPoint?.[config.totalKey]) : null;

	const contextValue: ServerStatKpiCardContextValue = {
		config,
		data,
		formattedValue,
		latestPoint,
		metric,
		rawValue,
		subvalue,
	};

	return (
		<ServerStatKpiCardContext value={contextValue}>
			<KPI>
				<ServerStatKpiCardHeader>
					<ServerStatKpiCardIcon />
					<ServerStatKpiCardTitle />
				</ServerStatKpiCardHeader>
				<ServerStatKpiCardContent>
					<div className="flex w-full items-baseline justify-between">
						<ServerStatKpiCardValue />
						<ServerStatKpiCardFooter />
					</div>
					<ServerStatKpiCardChart />
				</ServerStatKpiCardContent>
			</KPI>
		</ServerStatKpiCardContext>
	);
}
