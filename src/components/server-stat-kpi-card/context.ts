import { createContext, use } from "react";
import type { ServerStatKpiCardContextValue } from "./types.ts";

export const ServerStatKpiCardContext = createContext<ServerStatKpiCardContextValue | null>(null);

export function useServerStatKpiCardContext(): ServerStatKpiCardContextValue {
	const context = use(ServerStatKpiCardContext);
	if (!context) {
		throw new Error("ServerStatKpiCard compound components must be rendered inside a <ServerStatKpiCard> provider.");
	}
	return context;
}
