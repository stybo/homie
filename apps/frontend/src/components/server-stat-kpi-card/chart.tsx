import { AreaChart } from "@heroui-pro/react/area-chart";
import { ChartTooltip } from "@heroui-pro/react/chart-tooltip";
import type { ProxmoxRrdRawDataPoint } from "@homie/types";
import { formatTime } from "./formatters.ts";
import type { MetricSeriesConfig } from "./types.ts";

export interface ChartProps {
	data: ProxmoxRrdRawDataPoint[];
	formatValue: (raw: number) => string;
	series: MetricSeriesConfig[];
	title: string;
}

export function Chart({ title, data, series, formatValue }: ChartProps) {
	return (
		<AreaChart
			className="kpi__chart w-full select-none **:outline-none"
			data={data}
			data-has-tooltip="true"
			height={60}
			margin={{ bottom: 3, left: 0, right: 0, top: 3 }}
			unselectable="on"
		>
			<AreaChart.YAxis hide domain={[0, (dataMax: number) => dataMax || 1] as const} />
			{series.map((s) => (
				<AreaChart.Area
					name={s.name ?? s.dataKey}
					dataKey={s.dataKey}
					key={s.dataKey}
					type="monotone"
					fill={s.color}
					fillOpacity={s.fillOpacity ?? 0.2}
					isAnimationActive={false}
					stroke={s.color}
					strokeWidth={s.strokeWidth ?? 1.5}
				/>
			))}
			<AreaChart.Tooltip
				allowEscapeViewBox={{ x: true, y: true }}
				offset={0}
				content={({ active, payload }) => {
					if (!active || !payload?.length) return null;
					const time = formatTime(Number(payload[0]?.payload?.time));

					return (
						<div className="w-max -translate-x-1/2 -translate-y-[calc(100%+50px)]">
							<ChartTooltip>
								{time ? <span className="text-[10px] text-zinc-500 dark:text-zinc-400">{time}</span> : null}
								{payload.map((item) => (
									<ChartTooltip.Item key={String(item.dataKey)}>
										<ChartTooltip.Indicator color={item.stroke ?? item.color} />
										<ChartTooltip.Label>{item.name ?? title}</ChartTooltip.Label>
										<ChartTooltip.Value>{formatValue(Number(item.value ?? 0))}</ChartTooltip.Value>
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
