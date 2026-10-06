import { describe, expect, it } from "vite-plus/test";
import { getTimeBasedTheme, LATITUDE, LONGITUDE, MORNING_START_HOUR } from "@/components/theme-switcher.ts";

describe("theme-switcher", () => {
	it("has valid default numerical values", () => {
		expect(Number.isFinite(LATITUDE)).toBe(true);
		expect(Number.isFinite(LONGITUDE)).toBe(true);
		expect(Number.isFinite(MORNING_START_HOUR)).toBe(true);
	});

	describe("getTimeBasedTheme", () => {
		it("returns 'light' or 'dark'", () => {
			const theme = getTimeBasedTheme();
			expect(["dark", "light"]).toContain(theme);
		});
	});
});
