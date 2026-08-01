import { Cpu, SquareChartBar, SquareDashedCircle } from "@gravity-ui/icons";
import { KPI } from "@heroui-pro/react";
import { useQuery } from "@tanstack/react-query";

export function ServerStats() {
	const { data } = useQuery({
		queryKey: ["cpu-data"],
		queryFn: async () => {
			const response = await fetch(`/api/cpu`);
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			return response.json();
		},
		refetchInterval: 10_000,
	});

	if (data == null) {
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
					<KPI.Chart color="var(--color-success)" data={data ?? []} height={70}></KPI.Chart>
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
					<KPI.Chart color="var(--color-success)" data={data ?? []} height={70}></KPI.Chart>
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
					<KPI.Chart color="var(--color-success)" data={data ?? []} height={70}></KPI.Chart>
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
					<KPI.Chart color="var(--color-success)" data={data ?? []} height={70}></KPI.Chart>
				</KPI.Content>
			</KPI>
		</div>
	);
}
