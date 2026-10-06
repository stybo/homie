import { Card } from "@heroui/react";
import type { ReactNode } from "react";
import { Chart } from "./chart.tsx";
import { METRIC_CONFIGS } from "./configs.tsx";
import { ServerStatKpiCardContext, useServerStatKpiCardContext } from "./context.ts";
import { formatCapacitySubvalue } from "./formatters.ts";
import { kpiCardStyles } from "./styles.ts";
import type { ServerStatKpiCardContextValue, ServerStatKpiCardProps } from "./types.ts";

const cardSlots = kpiCardStyles();

export function ServerStatKpiCardHeader({ children }: { children: ReactNode }) {
	return <Card.Header className={cardSlots.header()}>{children}</Card.Header>;
}

export function ServerStatKpiCardIcon() {
	const { config } = useServerStatKpiCardContext();
	return <div className={cardSlots.icon()}>{config.icon}</div>;
}

export function ServerStatKpiCardTitle() {
	const { config } = useServerStatKpiCardContext();
	return <Card.Title className={cardSlots.title()}>{config.title}</Card.Title>;
}

export function ServerStatKpiCardValue() {
	const { formattedValue } = useServerStatKpiCardContext();
	return <div className={cardSlots.value()}>{formattedValue}</div>;
}

export function ServerStatKpiCardFooter() {
	const { subvalue } = useServerStatKpiCardContext();
	return <div className={cardSlots.footer()}>{subvalue}</div>;
}

export function ServerStatKpiCardChart() {
	const { config, data, latestPoint } = useServerStatKpiCardContext();
	return <Chart title={config.title} data={data} series={config.series} formatValue={(raw) => config.formatValue(raw, latestPoint)} />;
}

export function ServerStatKpiCardContent({ children }: { children: ReactNode }) {
	return <Card.Content className={cardSlots.content()}>{children}</Card.Content>;
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
			<Card className={cardSlots.base()}>
				<ServerStatKpiCardHeader>
					<ServerStatKpiCardIcon />
					<ServerStatKpiCardTitle />
				</ServerStatKpiCardHeader>
				<ServerStatKpiCardContent>
					<div className={cardSlots.valueRow()}>
						<ServerStatKpiCardValue />
						<ServerStatKpiCardFooter />
					</div>
					<ServerStatKpiCardChart />
				</ServerStatKpiCardContent>
			</Card>
		</ServerStatKpiCardContext>
	);
}
