import { AreaChart, ChartTooltip } from "@heroui-pro/react";
import { Card } from "@heroui/react";

const revenueData = [
	{ month: "Jan", revenue: 4200 },
	{ month: "Feb", revenue: 5800 },
	{ month: "Mar", revenue: 4900 },
	{ month: "Apr", revenue: 7200 },
	{ month: "May", revenue: 6100 },
	{ month: "Jun", revenue: 8400 },
	{ month: "Jul", revenue: 7800 },
	{ month: "Aug", revenue: 9200 },
	{ month: "Sep", revenue: 8600 },
	{ month: "Oct", revenue: 10200 },
	{ month: "Nov", revenue: 9800 },
	{ month: "Dec", revenue: 11500 },
];

export function AreaChartComponent() {
	return (
		<Card className="max-w-130 min-w-100">
			<Card.Header>
				<Card.Title className="text-base">Monthly Revenue</Card.Title>
			</Card.Header>
			<Card.Content>
				<AreaChart data={revenueData} height={200}>
					<defs>
						<linearGradient id="revenue-fill" x1="0" x2="0" y1="0" y2="1">
							<stop offset="0%" stopColor="var(--chart-3)" stopOpacity={0.2} />
							<stop offset="100%" stopColor="var(--chart-3)" stopOpacity={0.02} />
						</linearGradient>
					</defs>
					<AreaChart.Grid vertical={false} />
					<AreaChart.XAxis dataKey="month" tickMargin={8} />
					<AreaChart.YAxis tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`} width={40} />
					<AreaChart.Area
						dataKey="revenue"
						dot={false}
						fill="url(#revenue-fill)"
						name="Revenue"
						stroke="var(--chart-3)"
						strokeWidth={2}
						type="monotone"
					/>
					<AreaChart.Tooltip
						content={({ active, label, payload }) => {
							if (!active || !payload?.length) return null;

							return (
								<ChartTooltip>
									<ChartTooltip.Header>{label}</ChartTooltip.Header>
									{payload.map((entry) => (
										<ChartTooltip.Item key={String(entry.dataKey)}>
											<ChartTooltip.Indicator color={entry.color ?? entry.stroke} />
											<ChartTooltip.Label>{entry.name}</ChartTooltip.Label>
											<ChartTooltip.Value>${Number(entry.value).toLocaleString()}</ChartTooltip.Value>
										</ChartTooltip.Item>
									))}
								</ChartTooltip>
							);
						}}
					/>
				</AreaChart>
			</Card.Content>
		</Card>
	);
}
