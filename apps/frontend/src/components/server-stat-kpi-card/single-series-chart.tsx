import { AreaChart } from "@heroui-pro/react/area-chart";
import { ChartTooltip } from "@heroui-pro/react/chart-tooltip";
import { KPI } from "@heroui-pro/react/kpi";
import type { ProxmoxRrdRawDataPoint } from "@homie/types";
import type { MetricConfig } from "./types.ts";

export interface SingleSeriesChartProps {
	data: ProxmoxRrdRawDataPoint[];
	dataKey: string;
	chartColor: string;
	title: string;
	tooltipFormatter: MetricConfig["tooltipFormatter"];
}

export function SingleSeriesChart({ data, dataKey, chartColor, title, tooltipFormatter }: SingleSeriesChartProps) {
	return (
		<KPI.Chart
			color={chartColor}
			data={data}
			dataKey={dataKey}
			height={70}
			tooltip={
				<AreaChart.Tooltip
					allowEscapeViewBox={{ x: true, y: true }}
					offset={0}
					content={({ active, payload }) => {
						const point = payload?.[0];
						if (!active || !point) {
							return null;
						}
						return (
							<div style={{ transform: "translate(-50%, calc(-100% - 50px))" }}>
								<ChartTooltip>
									<ChartTooltip.Item>
										<ChartTooltip.Indicator color={point.stroke} />
										<ChartTooltip.Label>{title}</ChartTooltip.Label>
										<ChartTooltip.Value>{tooltipFormatter(Number(point.value ?? 0), String(point.dataKey))}</ChartTooltip.Value>
									</ChartTooltip.Item>
								</ChartTooltip>
							</div>
						);
					}}
				/>
			}
		/>
	);
}
