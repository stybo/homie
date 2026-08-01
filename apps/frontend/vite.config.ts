import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import tanstackRouter from "@tanstack/router-plugin/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "vite-plus";

export default defineConfig({
	root: import.meta.dirname,
	plugins: [
		tanstackRouter({
			target: "react",
			autoCodeSplitting: true,
			routesDirectory: "./src/routes",
		}),
		react(),
		babel({
			presets: [reactCompilerPreset()],
		}),
		tailwindcss(),
		devtools(),
	],
	server: {
		proxy: {
			"/api": "http://localhost:3000/",
		},
	},
});
