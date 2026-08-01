import { QueryClient, QueryClientProvider as TanstackQueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

export const queryClient = new QueryClient({});

export function QueryClientProvider({ children }: { children: ReactNode }) {
	return <TanstackQueryClientProvider client={queryClient}>{children}</TanstackQueryClientProvider>;
}
