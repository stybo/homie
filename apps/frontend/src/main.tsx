import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { DevtoolsProvider } from "./providers/DevtoolsProvider.tsx";
import { QueryClientProvider } from "./providers/QueryClientProvider.tsx";
import { RouterProvider } from "./providers/RouterProvider.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider>
			<RouterProvider />
			<DevtoolsProvider />
		</QueryClientProvider>
	</StrictMode>,
);
