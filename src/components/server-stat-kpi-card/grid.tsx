import { Card, Skeleton } from "@heroui/react";
import type { ReactNode } from "react";
import { kpiGridStyles } from "./styles.ts";
import { METRIC_KEYS } from "./types.ts";

export interface ServerStatKpiGridProps {
	children: ReactNode;
}

const gridSlots = kpiGridStyles();

export function ServerStatKpiGrid({ children }: ServerStatKpiGridProps) {
	return (
		<div className={gridSlots.root()}>
			<div className={gridSlots.grid()}>{children}</div>
		</div>
	);
}

export function ServerStatKpiGridSkeleton() {
	return (
		<ServerStatKpiGrid>
			{METRIC_KEYS.map((metric) => (
				<Card key={metric} className={gridSlots.skeletonCard()}>
					<Card.Header className={gridSlots.skeletonHeader()}>
						<Skeleton className="size-8 rounded-lg" />
						<Skeleton className="h-4 w-24 rounded-md" />
					</Card.Header>
					<Card.Content className={gridSlots.skeletonContent()}>
						<div className={gridSlots.skeletonValueRow()}>
							<Skeleton className="h-8 w-20 rounded-md" />
							<Skeleton className="h-3 w-16 rounded-md" />
						</div>
						<Skeleton className="h-15 w-full rounded-xl" />
					</Card.Content>
				</Card>
			))}
		</ServerStatKpiGrid>
	);
}
