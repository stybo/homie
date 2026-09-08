import { KPI } from "@heroui-pro/react/kpi";
import { Skeleton } from "@heroui/react";
import type { ReactNode } from "react";
import { METRIC_KEYS } from "./types.ts";

export interface ServerStatKpiGridProps {
	children: ReactNode;
}

export function ServerStatKpiGrid({ children }: ServerStatKpiGridProps) {
	return (
		<div className="min-h-dvh overflow-hidden bg-default">
			<div className="grid min-h-dvh grid-cols-1 place-content-center gap-x-3 gap-y-7 p-3 sm:grid-cols-2 lg:grid-cols-4">{children}</div>
		</div>
	);
}

export function ServerStatKpiGridSkeleton() {
	return (
		<ServerStatKpiGrid>
			{METRIC_KEYS.map((metric) => (
				<KPI key={metric}>
					<KPI.Header>
						<Skeleton className="size-8 rounded-lg" />
						<Skeleton className="h-4 w-24 rounded-md" />
					</KPI.Header>
					<KPI.Content className="flex w-full min-w-0 flex-col gap-1">
						<div className="flex w-full items-baseline justify-between pt-3">
							<Skeleton className="h-8 w-20 rounded-md" />
							<Skeleton className="h-3 w-16 rounded-md" />
						</div>
						<Skeleton className="h-17.5 w-full rounded-xl" />
					</KPI.Content>
				</KPI>
			))}
		</ServerStatKpiGrid>
	);
}
