import { describe, expect, it } from "vite-plus/test";
import {
	formatByteRate,
	formatBytes,
	formatCapacitySubvalue,
	formatPercentValue,
	formatTime,
} from "../src/components/server-stat-kpi-card/formatters.ts";

describe("formatters", () => {
	describe("formatBytes", () => {
		it("formats zero and non-finite values as 0 B", () => {
			expect(formatBytes(0)).toBe("0 B");
			expect(formatBytes(Number.NaN)).toBe("0 B");
			expect(formatBytes(Number.POSITIVE_INFINITY)).toBe("0 B");
		});

		it("formats small byte values", () => {
			expect(formatBytes(500)).toBe("500 B");
			expect(formatBytes(1023)).toBe("1023 B");
		});

		it("formats kilobytes, megabytes, gigabytes, and terabytes", () => {
			expect(formatBytes(1024)).toBe("1 KB");
			expect(formatBytes(1024 * 1024)).toBe("1 MB");
			expect(formatBytes(1024 * 1024 * 1024)).toBe("1 GB");
			expect(formatBytes(1024 * 1024 * 1024 * 1024)).toBe("1 TB");
			expect(formatBytes(1024 * 1024 * 1024 * 1024 * 1024)).toBe("1 PB");
		});

		it("respects decimal places and trims trailing zeroes", () => {
			expect(formatBytes(1536, 1)).toBe("1.5 KB");
			expect(formatBytes(1536, 2)).toBe("1.5 KB");
			expect(formatBytes(1024 * 1.25, 2)).toBe("1.25 KB");
		});
	});

	describe("formatByteRate", () => {
		it("formats zero rates", () => {
			expect(formatByteRate(0)).toBe("0 B/s");
			expect(formatByteRate(Number.NaN)).toBe("0 B/s");
		});

		it("formats byte throughput rates", () => {
			expect(formatByteRate(512)).toBe("512 B/s");
			expect(formatByteRate(2048)).toBe("2 KB/s");
			expect(formatByteRate(1024 * 1024 * 5.5, 1)).toBe("5.5 MB/s");
			expect(formatByteRate(1024 * 1024 * 1024 * 1.2, 1)).toBe("1.2 GB/s");
		});
	});

	describe("formatPercentValue", () => {
		it("formats zero and non-finite ratios", () => {
			expect(formatPercentValue(0)).toBe("0.00%");
			expect(formatPercentValue(Number.NaN)).toBe("0.00%");
		});

		it("formats decimal ratios to percentages", () => {
			expect(formatPercentValue(0.05)).toBe("5.00%");
			expect(formatPercentValue(0.5)).toBe("50.00%");
			expect(formatPercentValue(1)).toBe("100.00%");
			expect(formatPercentValue(0.12345, 1)).toBe("12.3%");
		});
	});

	describe("formatTime", () => {
		it("returns empty string for non-finite timestamps", () => {
			expect(formatTime(Number.NaN)).toBe("");
			expect(formatTime(Number.POSITIVE_INFINITY)).toBe("");
		});

		it("formats unix timestamp in seconds to HH:mm string", () => {
			// 1700000000 seconds = 2023-11-14T22:13:20.000Z
			const formatted = formatTime(1700000000);
			expect(formatted).toMatch(/^\d{2}:\d{2}$/);
		});
	});

	describe("formatCapacitySubvalue", () => {
		it("returns null for missing, zero, or negative total", () => {
			expect(formatCapacitySubvalue(100, undefined)).toBeNull();
			expect(formatCapacitySubvalue(100, 0)).toBeNull();
			expect(formatCapacitySubvalue(100, -10)).toBeNull();
			expect(formatCapacitySubvalue(100, Number.NaN)).toBeNull();
		});

		it("formats capacity ratio and total into readable subvalue string", () => {
			const totalBytes = 32 * 1024 * 1024 * 1024; // 32 GB
			const usedBytes = 16 * 1024 * 1024 * 1024; // 16 GB
			expect(formatCapacitySubvalue(usedBytes, totalBytes)).toBe("50.0% of 32 GB");
		});
	});
});
