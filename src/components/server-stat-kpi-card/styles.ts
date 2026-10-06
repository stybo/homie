import { tv } from "tailwind-variants";

export const kpiCardStyles = tv({
	slots: {
		icon: "flex size-8 shrink-0 items-center justify-center rounded-lg bg-zinc-200/80 text-zinc-700 dark:bg-emerald-500/15 dark:text-emerald-400",
		title: "text-sm font-medium text-muted",
		base: "relative flex flex-col gap-0 rounded-2xl p-4",
		content: "flex flex-col gap-2 p-0 pt-3",
		footer: "text-xs text-zinc-500 dark:text-zinc-400",
		header: "mb-1 flex flex-row items-center gap-2 p-0",
		value: "text-2xl font-bold tracking-tight text-foreground",
		valueRow: "flex w-full items-baseline justify-between",
	},
});

export const kpiChartStyles = tv({
	slots: {
		label: "flex-1 text-xs text-muted",
		container:
			"h-[60px] w-full touch-pan-y select-none [&_svg]:mask-[linear-gradient(to_right,transparent_0%,black_5%,black_95%,transparent_100%)]",
		item: "flex items-center gap-2",
		swatch: "size-2 shrink-0 rounded-full",
		time: "text-[10px] text-zinc-500 dark:text-zinc-400",
		tooltip:
			"pointer-events-none flex min-w-35 flex-col gap-1.5 rounded-lg border border-separator bg-overlay px-3 py-2 tabular-nums shadow-overlay select-none",
		tooltipHost:
			"pointer-events-none z-50! border-none! bg-transparent! p-0! shadow-none! select-none backdrop:hidden [&:popover-open]:border-none! [&:popover-open]:bg-transparent! [&[popover]]:border-none! [&[popover]]:bg-transparent!",
		value: "text-xs font-semibold text-foreground",
	},
});

export const kpiGridStyles = tv({
	slots: {
		grid: "grid min-h-dvh grid-cols-1 place-content-center gap-3 p-3 pb-[max(1rem,env(safe-area-inset-bottom))] sm:grid-cols-2 lg:grid-cols-4",
		root: "min-h-dvh overflow-x-hidden overflow-y-auto bg-default",
		skeletonCard: "relative flex flex-col gap-0 rounded-2xl p-4",
		skeletonContent: "flex w-full min-w-0 flex-col gap-2 p-0",
		skeletonHeader: "mb-1 flex flex-row items-center gap-2 p-0",
		skeletonValueRow: "flex w-full items-baseline justify-between pt-3",
	},
});
