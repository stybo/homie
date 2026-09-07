import { defineConfig } from "vite-plus";

export default defineConfig({
	build: {
		ssr: "src/app.ts",
		outDir: "dist",
		minify: "oxc",
	},
	ssr: {
		noExternal: true,
	},
	run: {
		tasks: {
			dev: "node --watch src/app.ts",
			serve: { command: "node src/app.ts", cache: false },
		},
	},
});
