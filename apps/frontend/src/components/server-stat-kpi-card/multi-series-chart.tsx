import { AreaChart } from "@heroui-pro/react/area-chart";
import { ChartTooltip } from "@heroui-pro/react/chart-tooltip";
import type { ProxmoxRrdRawDataPoint } from "@homie/types";
import type { MetricConfig } from "./types.ts";

export interface MultiSeriesChartProps {
	data: ProxmoxRrdRawDataPoint[];
	series: NonNullable<MetricConfig["series"]>;
	title: string;
	tooltipFormatter: MetricConfig["tooltipFormatter"];
}

export function MultiSeriesChart({ data, series, title, tooltipFormatter }: MultiSeriesChartProps) {
	return (
		<AreaChart data={data} height={70} margin={{ bottom: 0, left: 0, right: 0, top: 4 }}>
			{series.map((s) => (
				<AreaChart.Area
					key={s.dataKey}
					dataKey={s.dataKey}
					fill={s.color}
					fillOpacity={s.fillOpacity ?? 0.2}
					isAnimationActive={false}
					name={s.name ?? s.dataKey}
					stroke={s.color}
					strokeWidth={s.strokeWidth ?? 1.5}
					type="monotone"
				/>
			))}
			<AreaChart.Tooltip
				allowEscapeViewBox={{ x: true, y: true }}
				offset={0}
				content={({ active, payload }) => {
					if (!active || !payload || payload.length === 0) return null;

					return (
						<div style={{ transform: "translate(-50%, calc(-100% - 50px))" }}>
							<ChartTooltip>
								{payload.map((item, idx) => (
									<ChartTooltip.Item key={idx}>
										<ChartTooltip.Indicator color={item.stroke || item.color} />
										<ChartTooltip.Label>{item.name || title}</ChartTooltip.Label>
										<ChartTooltip.Value>{tooltipFormatter(Number(item.value ?? 0), String(item.dataKey))}</ChartTooltip.Value>
									</ChartTooltip.Item>
								))}
							</ChartTooltip>
						</div>
					);
				}}
			/>
		</AreaChart>
	);
}
