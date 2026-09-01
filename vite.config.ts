import { defineConfig } from "vite-plus";

export default defineConfig({
	run: {
		tasks: { dev: "vp run -r --parallel dev" },
	},
	fmt: {
		ignorePatterns: ["pnpm-lock.yaml", "routeTree.gen.ts", ".tanstack", "dist", ".idea"],
		printWidth: 120,
		sortDescending: true,
		sortImports: { newlinesBetween: false },
		sortPackageJson: true,
		sortTailwindcss: true,
		useTabs: true,
	},
	staged: {
		"*": "vp check --fix",
	},
	lint: {
		categories: { correctness: "error", perf: "error" },
		ignorePatterns: ["dist"],
		options: { typeAware: true, typeCheck: true },
		jsPlugins: [
			{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" },
			{
				name: "react-js",
				specifier: "eslint-plugin-react",
			},
			{
				name: "eslint-tanstack-router",
				specifier: "@tanstack/eslint-plugin-router",
			},
			{
				name: "eslint-tanstack-query",
				specifier: "@tanstack/eslint-plugin-query",
			},
		],
		rules: {
			"eslint-tanstack-query/exhaustive-deps": "error",
			"eslint-tanstack-query/infinite-query-property-order": "error",
			"eslint-tanstack-query/mutation-property-order": "error",
			"eslint-tanstack-query/no-rest-destructuring": "error",
			"eslint-tanstack-query/no-unstable-deps": "error",
			"eslint-tanstack-query/no-void-query-fn": "error",
			"eslint-tanstack-query/stable-query-client": "error",
			"eslint-tanstack-router/create-route-property-order": "error",
			"react-js/jsx-sort-props": [
				"error",
				{
					callbacksLast: true,
					ignoreCase: true,
					multiline: "last",
					noSortAlphabetically: false,
					reservedFirst: true,
					shorthandFirst: true,
				},
			],
			"vite-plus/prefer-vite-plus-imports": "error",
		},
	},
});
