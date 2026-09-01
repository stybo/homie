import { defineConfig } from "vite-plus";

export default defineConfig({
	run: {
		tasks: {
			dev: "node --watch src/app.ts",
			serve: "node src/app.ts",
		},
	},
});
