import { afterEach, beforeEach, describe, expect, it, vi } from "vite-plus/test";
import { getTimeBasedTimeframe } from "@/api/pve.ts";
import { fetchNodeData } from "@/server/pve.ts";

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

	describe("fetchNodeData", () => {
		it("fetches and parses data successfully with full endpoint url", async () => {
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

		it("automatically appends node endpoint when only base host is configured", async () => {
			process.env.PROXMOX_BASE_URL = "https://proxmox.stybo.nl";
			const mockData = [{ cpu: 0.2, time: 1700000000 }];
			const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
				new Response(JSON.stringify({ data: mockData }), {
					headers: { "Content-Type": "application/json" },
					status: 200,
				}),
			);

			const result = await fetchNodeData("hour");
			expect(result).toEqual(mockData);
			expect(fetchSpy).toHaveBeenCalledWith("https://proxmox.stybo.nl/api2/json/nodes/homelab/rrddata?timeframe=hour", {
				headers: {
					Authorization: "PVEAPIToken=test",
				},
			});
		});

		it("defaults to hour timeframe when omitted", async () => {
			const mockData = [{ cpu: 0.1, time: 1700000000 }];
			const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
				new Response(JSON.stringify({ data: mockData }), {
					headers: { "Content-Type": "application/json" },
					status: 200,
				}),
			);

			await fetchNodeData();
			expect(fetchSpy).toHaveBeenCalledWith("https://example.com/api2/json/nodes/homelab/rrddata?timeframe=hour", {
				headers: {
					Authorization: "PVEAPIToken=test",
				},
			});
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
