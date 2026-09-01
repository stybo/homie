import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import tanstackRouter from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite-plus";

export default defineConfig({
	root: import.meta.dirname,
	run: {
		tasks: {
			build: "vp build",
			dev: "vp dev",
			preview: "vp preview --host",
		},
	},
	plugins: [
		devtools(),
		tanstackRouter({ autoCodeSplitting: true, target: "react" }),
		tailwindcss(),
		react({ compiler: true }),
	],
	server: {
		proxy: {
			"/api": "http://localhost:3000/",
		},
	},
});
