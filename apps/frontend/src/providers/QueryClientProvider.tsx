import { QueryClientProvider as TanstackQueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { queryClient } from "./QueryClient.ts";

export function QueryClientProvider({ children }: { children: ReactNode }) {
	return <TanstackQueryClientProvider client={queryClient}>{children}</TanstackQueryClientProvider>;
}
