import { describe, expect, it } from "vite-plus/test";
import { getTimeBasedTheme } from "../src/components/theme-switcher.ts";

describe("theme-switcher", () => {
	describe("getTimeBasedTheme", () => {
		it("returns 'light' or 'dark'", () => {
			const theme = getTimeBasedTheme();
			expect(["dark", "light"]).toContain(theme);
		});
	});
});
