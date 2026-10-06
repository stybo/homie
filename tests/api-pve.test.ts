import { afterEach, beforeEach, describe, expect, it, vi } from "vite-plus/test";
import { getTimeBasedTimeframe } from "@/api/pve.ts";
import { fetchNodeData, parseTimeframe } from "@/server/pve.ts";

describe("api/pve", () => {
	const originalToken = process.env.PROXMOX_TOKEN;
	const originalBaseUrl = process.env.PROXMOX_BASE_URL;

	beforeEach(() => {
		process.env.PROXMOX_TOKEN = "PVEAPIToken=test";
		process.env.PROXMOX_BASE_URL = "https://example.com/api2/json/nodes/homelab/rrddata";
	});

	afterEach(() => {
		if (originalToken !== undefined) {
			process.env.PROXMOX_TOKEN = originalToken;
		} else {
			delete process.env.PROXMOX_TOKEN;
		}

		if (originalBaseUrl !== undefined) {
			process.env.PROXMOX_BASE_URL = originalBaseUrl;
		} else {
			delete process.env.PROXMOX_BASE_URL;
		}

		vi.restoreAllMocks();
	});

	describe("getTimeBasedTimeframe", () => {
		it("returns 'hour' or 'day'", () => {
			const timeframe = getTimeBasedTimeframe();
			expect(["day", "hour"]).toContain(timeframe);
		});
	});

	describe("parseTimeframe", () => {
		it("validates allowed timeframes", () => {
			expect(parseTimeframe("day")).toBe("day");
			expect(parseTimeframe("week")).toBe("week");
			expect(parseTimeframe("month")).toBe("month");
			expect(parseTimeframe("year")).toBe("year");
			expect(parseTimeframe("invalid")).toBe("hour");
			expect(parseTimeframe(null)).toBe("hour");
		});
	});

	describe("fetchNodeData", () => {
		it("fetches and parses data successfully", async () => {
			const mockData = [{ cpu: 0.1, time: 1700000000 }];
			const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
				new Response(JSON.stringify({ data: mockData }), {
					headers: { "Content-Type": "application/json" },
					status: 200,
				}),
			);

			const result = await fetchNodeData("week");
			expect(result).toEqual(mockData);
			expect(fetchSpy).toHaveBeenCalledWith("https://example.com/api2/json/nodes/homelab/rrddata?timeframe=week", {
				headers: {
					Authorization: "PVEAPIToken=test",
				},
			});
		});

		it("throws an error when PROXMOX_TOKEN is missing", async () => {
			delete process.env.PROXMOX_TOKEN;
			await expect(fetchNodeData("hour")).rejects.toThrow("PROXMOX_TOKEN is not configured");
		});

		it("throws an error when PROXMOX_BASE_URL is missing", async () => {
			delete process.env.PROXMOX_BASE_URL;
			await expect(fetchNodeData("hour")).rejects.toThrow("PROXMOX_BASE_URL is not configured");
		});

		it("throws an error when HTTP status is not ok", async () => {
			vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
				new Response("Not Found", {
					status: 404,
					statusText: "Not Found",
				}),
			);

			await expect(fetchNodeData("hour")).rejects.toThrow("Failed to fetch node data: Not Found");
		});
	});
});
