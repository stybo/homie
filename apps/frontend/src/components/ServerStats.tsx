import { Cpu, SquareChartBar, SquareDashedCircle } from "@gravity-ui/icons";
import { ChartTooltip } from "@heroui-pro/react";
import { AreaChart } from "@heroui-pro/react/area-chart";
import { KPI } from "@heroui-pro/react/kpi";
import { useQuery } from "@tanstack/react-query";

// Function transformPveData(data: PveData[]) {
// 	Const cpuHistory: number[] = [];
// 	Const memoryHistory: number[] = [];
//
// 	For (const point of data) {
// 		CpuHistory.push(point.cpu * 100);
// 		MemoryHistory.push(point.memory / 1024 ** 3);
// 	}
//
// 	Const latestCpu = cpuHistory.at(-1) ?? 0;
// 	Const latestMem = memoryHistory.at(-1) ?? 0;
//
// 	Return {
// 		Cpu: {
// 			Value: latestCpu.toFixed(2),
// 			History: cpuHistory,
// 			Raw: latestCpu,
// 		},
// 		Memory: {
// 			Value: latestMem.toFixed(2),
// 			History: memoryHistory,
// 			Raw: latestMem,
// 		},
// 	};
// }

export function ServerStats() {
	const { data } = useQuery({
		queryFn: async () => {
			const response = await fetch(`/api/pve1`);
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response.json();
		},
		queryKey: ["pve-data"],
		refetchInterval: 10_000,
	});

	if (data == undefined) {
		return;
	}

	return (
		<div className="grid h-full grid-cols-4 place-content-center justify-between gap-x-3 gap-y-7 rounded-2xl p-3">
			<KPI>
				<KPI.Header>
					<KPI.Icon status="success">
						<Cpu />
					</KPI.Icon>
					<KPI.Title>CPU Usage</KPI.Title>
				</KPI.Header>
				<KPI.Content className="grid-cols-[0.45fr_1fr]">
					<KPI.Value className="text-3xl" style="percent" value={data[data?.length - 1].value} />
					<KPI.Chart
						color="var(--color-success)"
						data={data ?? []}
						height={70}
						tooltip={
							<AreaChart.Tooltip
								allowEscapeViewBox={{ x: true, y: true }}
								offset={0}
								content={({ active, payload }) => {
									const point = payload?.[0];
									if (!active || !point) {
										return;
									}
									return (
										<div style={{ transform: "translate(-50%, calc(-100% - 50px))" }}>
											<ChartTooltip>
												<ChartTooltip.Item>
													<ChartTooltip.Indicator color={point.stroke} />
													<ChartTooltip.Label>Usage</ChartTooltip.Label>
													<ChartTooltip.Value>{(Number(point.value ?? 0) * 100).toFixed(2)}%</ChartTooltip.Value>{" "}
												</ChartTooltip.Item>
											</ChartTooltip>
										</div>
									);
								}}
							/>
						}
					/>
				</KPI.Content>
			</KPI>

			{/*<KpiComponent data={data.cpu} label="Usage" title="CPU Usage" value={data.cpu[data.cpu?.length - 1].value} />*/}

			<KPI>
				<KPI.Header>
					<KPI.Icon status="warning">
						<SquareDashedCircle />
					</KPI.Icon>
					<KPI.Title>Average Memory Used</KPI.Title>
				</KPI.Header>
				<KPI.Content>
					<KPI.Value maximumFractionDigits={0} style="percent" value={0.64} />
					<KPI.Progress status="warning" value={64} />
				</KPI.Content>
			</KPI>

			<KPI>
				<KPI.Header>
					<KPI.Icon status="success">
						<Cpu />
					</KPI.Icon>
					<KPI.Title>CPU Usage</KPI.Title>
				</KPI.Header>
				<KPI.Content className="grid-cols-[0.5fr_1fr]">
					<KPI.Value className="text-3xl" style="percent" value={1} />
					<KPI.Chart color="var(--color-success)" data={data ?? []} height={70} />
				</KPI.Content>
			</KPI>
			<KPI>
				<KPI.Header>
					<KPI.Icon status="success">
						<Cpu />
					</KPI.Icon>
					<KPI.Title>CPU Usage</KPI.Title>
				</KPI.Header>
				<KPI.Content className="grid-cols-[0.5fr_1fr]">
					<KPI.Value className="text-3xl" style="percent" value={data[data?.length - 1].value} />
					<KPI.Chart color="var(--color-success)" data={data ?? []} height={70} />
				</KPI.Content>
			</KPI>

			<KPI>
				<KPI.Header>
					<KPI.Icon status="danger">
						<SquareChartBar />
					</KPI.Icon>
					<KPI.Title>Server Load</KPI.Title>
				</KPI.Header>
				<KPI.Content>
					<KPI.Value maximumFractionDigits={0} style="percent" value={0.98} />
					<KPI.Progress status="danger" value={98} />
				</KPI.Content>
			</KPI>

			<KPI>
				<KPI.Header>
					<KPI.Icon status="warning">
						<SquareDashedCircle />
					</KPI.Icon>
					<KPI.Title>Average Memory Used</KPI.Title>
				</KPI.Header>
				<KPI.Content>
					<KPI.Value maximumFractionDigits={0} style="percent" value={0.64} />
					<KPI.Progress status="warning" value={64} />
				</KPI.Content>
			</KPI>
			<KPI>
				<KPI.Header>
					<KPI.Icon status="success">
						<Cpu />
					</KPI.Icon>
					<KPI.Title>CPU Usage</KPI.Title>
				</KPI.Header>
				<KPI.Content className="grid-cols-[0.5fr_1fr]">
					<KPI.Value className="text-3xl" style="percent" value={1} />
					<KPI.Chart color="var(--color-success)" data={data ?? []} height={70} />
				</KPI.Content>
			</KPI>
		</div>
	);
}

// Interface KpiComponentProps {
// 	Title: string;
// 	Value: number;
// 	Data: number[];
// 	Label: string;
// 	Unit?: string;
// }
//
// Function KpiComponent({ title, value, data, label, unit }: KpiComponentProps) {
// 	Return (
// 		<KPI>
// 			<KPI.Header>
// 				<KPI.Icon status="success">
// 					<Cpu />
// 				</KPI.Icon>
// 				<KPI.Title>{title}</KPI.Title>
// 			</KPI.Header>
// 			<KPI.Content className="grid-cols-[0.45fr_1fr]">
// 				<KPI.Value className="text-3xl" style="percent" value={value} />
// 				<KPI.Chart
// 					Color="var(--color-success)"
// 					Data={data ?? []}
// 					Height={70}
// 					Tooltip={
// 						<AreaChart.Tooltip
// 							AllowEscapeViewBox={{ x: true, y: true }}
// 							Offset={0}
// 							Content={({ active, payload }) => {
// 								Const point = payload?.[0];
// 								If (!active || !point) return null;
// 								Return (
// 									<div style={{ transform: "translate(-50%, calc(-100% - 50px))" }}>
// 										<ChartTooltip>
// 											<ChartTooltip.Item>
// 												<ChartTooltip.Indicator color={point.stroke} />
// 												<ChartTooltip.Label>{label}</ChartTooltip.Label>
// 												<ChartTooltip.Value>
// 													{(Number(point.value ?? 0) * 100).toFixed(2)}
// 													{unit}
// 												</ChartTooltip.Value>
// 											</ChartTooltip.Item>
// 										</ChartTooltip>
// 									</div>
// 								);
// 							}}
// 						/>
// 					}
// 				/>
// 			</KPI.Content>
// 		</KPI>
// 	);
// }
