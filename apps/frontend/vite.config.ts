import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import tanstackRouter from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite-plus";

export default defineConfig({
	run: {
		tasks: {
			build: "vp build",
			dev: "vp dev",
			preview: "vp preview --host",
		},
	},
	server: {
		proxy: {
			"/api": "http://localhost:10000/",
		},
	},
	plugins: [devtools(), tanstackRouter({ autoCodeSplitting: true, target: "react" }), tailwindcss(), react({ compiler: true })],
	root: import.meta.dirname,
});
