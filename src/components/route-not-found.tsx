import { Link } from "@tanstack/react-router";

export function RouteNotFound() {
	return (
		<div className="flex h-dvh flex-col items-center justify-center p-8 text-center text-zinc-400">
			<h2 className="text-xl font-semibold text-zinc-100">404 — Page Not Found</h2>
			<p className="mt-2 text-sm text-zinc-400">The page you are looking for does not exist.</p>
			<Link className="mt-4 rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-100 transition-opacity hover:opacity-80" to="/">
				Go Home
			</Link>
		</div>
	);
}
