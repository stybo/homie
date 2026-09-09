import { afterEach, describe, expect, it, vi } from "vite-plus/test";
import { fetchPveStats, getTimeBasedTimeframe } from "../src/api/pve.ts";

describe("api/pve", () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	describe("getTimeBasedTimeframe", () => {
		it("returns 'hour' or 'day'", () => {
			const timeframe = getTimeBasedTimeframe();
			expect(["day", "hour"]).toContain(timeframe);
		});
	});

	describe("fetchPveStats", () => {
		it("fetches and parses data successfully", async () => {
			const mockData = [{ cpu: 0.1, time: 1700000000 }];
			const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
				new Response(JSON.stringify(mockData), {
					headers: { "Content-Type": "application/json" },
					status: 200,
				}),
			);

			const result = await fetchPveStats({ timeframe: "week" });
			expect(result).toEqual(mockData);
			expect(fetchSpy).toHaveBeenCalledWith("/api/pve1?timeframe=week", { signal: undefined });
		});

		it("throws an error when HTTP status is not ok", async () => {
			vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
				new Response("Not Found", {
					status: 404,
					statusText: "Not Found",
				}),
			);

			await expect(fetchPveStats()).rejects.toThrow("Failed to load server stats: 404 Not Found");
		});
	});
});
