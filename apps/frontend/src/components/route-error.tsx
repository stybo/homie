import type { ErrorComponentProps } from "@tanstack/react-router";

export function RouteError({ error }: ErrorComponentProps) {
	return (
		<div className="flex h-full flex-col items-center justify-center p-8 text-rose-400">
			<h2 className="text-lg font-semibold">Failed to load server statistics</h2>
			<p className="mt-1">{error?.message ?? "Unknown error"}</p>
		</div>
	);
}
