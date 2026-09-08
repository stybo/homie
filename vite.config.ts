import { defineConfig } from "vite-plus";

export default defineConfig({
	run: {
		tasks: { dev: "vp run -r --parallel dev" },
	},
	fmt: {
		ignorePatterns: ["pnpm-lock.yaml", "routeTree.gen.ts", ".tanstack", "dist", ".idea"],
		printWidth: 140,
		sortDescending: true,
		sortImports: { newlinesBetween: false },
		sortPackageJson: true,
		sortTailwindcss: { stylesheet: "./apps/frontend/src/globals.css" },
		useTabs: true,
	},
	lint: {
		categories: { correctness: "error", perf: "error", suspicious: "warn" },
		ignorePatterns: ["dist", "tools/oxlint/anti-slop/**"],
		jsPlugins: [
			{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" },
			{ name: "react-js", specifier: "eslint-plugin-react" },
			{ name: "eslint-tanstack-router", specifier: "@tanstack/eslint-plugin-router" },
			{ name: "eslint-tanstack-query", specifier: "@tanstack/eslint-plugin-query" },
			{ name: "perfectionist", specifier: "eslint-plugin-perfectionist" },
			{ name: "anti-slop", specifier: "./tools/oxlint/anti-slop/index.ts" },
			{ name: "tailwindcss", specifier: "oxlint-tailwindcss" },
		],
		settings: {
			tailwindcss: {
				entryPoint: "./apps/frontend/src/globals.css",
			},
		},
		options: { typeAware: true, typeCheck: true },
		rules: {
			// --- Anti-Slop ---
			"anti-slop/no-chained-type-assertions": "error",
			"anti-slop/no-conditional-empty-object-spread": "error",
			"anti-slop/no-known-value-widening": "error",
			"anti-slop/no-module-mocking": "error",
			"anti-slop/no-object-parameters": "error",
			"anti-slop/no-reflect-apply": "error",
			"anti-slop/no-reflect-get": "error",
			"anti-slop/no-runtime-typeof": "error",
			"anti-slop/no-shape-in-symbol-names": "error",
			"anti-slop/no-unknown-parameters": "error",
			"anti-slop/no-unknown-returns": "error",
			"anti-slop/no-unknown-type-aliases": "error",
			"anti-slop/no-unsafe-dictionary-type": "error",
			"anti-slop/no-widen-then-assert": "error",
			"anti-slop/require-safety-comment-for-type-assertion": "error",

			// --- TanStack Query & Router ---
			"eslint-tanstack-query/exhaustive-deps": "error",
			"eslint-tanstack-query/infinite-query-property-order": "error",
			"eslint-tanstack-query/mutation-property-order": "error",
			"eslint-tanstack-query/no-rest-destructuring": "error",
			"eslint-tanstack-query/no-unstable-deps": "error",
			"eslint-tanstack-query/no-void-query-fn": "error",
			"eslint-tanstack-query/stable-query-client": "error",
			"eslint-tanstack-router/create-route-property-order": "error",

			// --- OXC ---
			"oxc/no-async-endpoint-handlers": "off",

			// --- Perfectionist JSX Props Sorting ---
			"perfectionist/sort-jsx-props": [
				"error",
				{
					type: "natural",
					customGroups: [
						{
							elementNamePattern: "^(title|name|label)$",
							groupName: "titles",
						},
						{
							elementNamePattern: "^(key|id|dataKey|type|variant|path|icon)$",
							groupName: "identifiers",
						},
						{
							elementNamePattern: "^(on[A-Z].*|tooltipFormatter|formatValue|transformValue|subvalue)$",
							groupName: "callbacks",
						},
					],
					groups: ["shorthand-prop", "titles", "identifiers", "unknown", "callbacks", "multiline-prop"],
					ignoreCase: true,
					order: "asc",
				},
			],

			// --- Perfectionist Object Sorting ---
			"perfectionist/sort-objects": [
				"error",
				{
					type: "natural",
					customGroups: [
						{ elementNamePattern: "^run$", groupName: "vp-run" },
						{ elementNamePattern: "^fmt$", groupName: "vp-fmt" },
						{ elementNamePattern: "^lint$", groupName: "vp-lint" },
						{ elementNamePattern: "^test$", groupName: "vp-test" },
						{ elementNamePattern: "^(server|build)$", groupName: "vp-build" },
						{ elementNamePattern: "^staged$", groupName: "vp-staged" },
						{ elementNamePattern: "^categories$", groupName: "lint-categories" },
						{ elementNamePattern: "^ignorePatterns$", groupName: "lint-ignore" },
						{ elementNamePattern: "^jsPlugins$", groupName: "lint-plugins" },
						{ elementNamePattern: "^settings$", groupName: "lint-settings" },
						{ elementNamePattern: "^options$", groupName: "lint-options" },
						{ elementNamePattern: "^rules$", groupName: "lint-rules" },
						{
							elementNamePattern: "^(id|key|queryKey|mutationKey|name|title|label|icon|dataKey|type|variant|path)$",
							groupName: "identifiers",
						},
						{ elementNamePattern: "^(loader|beforeLoad|queryFn|mutationFn)$", groupName: "loaders" },
						{ elementNamePattern: "^(component|errorComponent|pendingComponent|notFoundComponent)$", groupName: "components" },
						{ elementNamePattern: "^handler$", groupName: "handlers" },
						{
							elementNamePattern: "^(formatValue|transformValue|subvalue|tooltipFormatter|on[A-Z].*|get[A-Z].*)$",
							groupName: "callbacks",
						},
					],
					groups: [
						"vp-run",
						"vp-fmt",
						"vp-lint",
						"vp-test",
						"vp-build",
						"vp-staged",
						"lint-categories",
						"lint-ignore",
						"lint-plugins",
						"lint-settings",
						"lint-options",
						"lint-rules",
						"identifiers",
						"loaders",
						"components",
						"handlers",
						"unknown",
						"callbacks",
					],
					ignoreCase: true,
					order: "asc",
				},
			],

			// --- Tailwind CSS ---
			"tailwindcss/consistent-variant-order": "warn",
			"tailwindcss/enforce-canonical": "warn",
			"tailwindcss/enforce-consistent-important-position": "warn",
			"tailwindcss/enforce-consistent-variable-syntax": "warn",
			"tailwindcss/enforce-negative-arbitrary-values": "warn",
			"tailwindcss/enforce-shorthand": "warn",
			"tailwindcss/no-conflicting-classes": "error",
			"tailwindcss/no-deprecated-classes": "error",
			"tailwindcss/no-duplicate-classes": "error",
			"tailwindcss/no-unknown-classes": "error",
			"tailwindcss/no-unnecessary-arbitrary-value": "warn",
			"tailwindcss/no-unnecessary-whitespace": "error",

			// --- Vite Plus ---
			"vite-plus/prefer-vite-plus-imports": "error",
		},
	},
	staged: {
		"*": "vp check --fix",
	},
});
