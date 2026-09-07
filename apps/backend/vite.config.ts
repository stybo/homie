import { defineConfig } from "vite-plus";

export default defineConfig({
	run: {
		tasks: {
			dev: "node --watch src/app.ts",
			serve: { cache: false, command: "node src/app.ts" },
		},
	},
	build: {
		minify: "oxc",
		outDir: "dist",
		ssr: "src/app.ts",
	},
	ssr: {
		noExternal: true,
	},
});
