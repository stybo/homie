import { describe, expect, it } from "vite-plus/test";
import { METRIC_CONFIGS } from "@/components/server-stat-kpi-card/configs.tsx";
import type { ServerMetricKey } from "@/components/server-stat-kpi-card/types.ts";
import type { ProxmoxRrdRawDataPoint } from "@/types/index.ts";

const samplePoint: ProxmoxRrdRawDataPoint = {
	arcsize: 1000,
	cpu: 0.125,
	iowait: 0.02,
	loadavg: 2.0,
	maxcpu: 8,
	memavailable: 8 * 1024 * 1024 * 1024,
	memtotal: 16 * 1024 * 1024 * 1024,
	memused: 8 * 1024 * 1024 * 1024,
	netin: 1024 * 500,
	netout: 1024 * 250,
	pressurecpusome: 0.01,
	pressureiofull: 0.005,
	pressureiosome: 0.015,
	pressurememoryfull: 0,
	pressurememorysome: 0,
	roottotal: 100 * 1024 * 1024 * 1024,
	rootused: 40 * 1024 * 1024 * 1024,
	swaptotal: 4 * 1024 * 1024 * 1024,
	swapused: 1 * 1024 * 1024 * 1024,
	time: 1700000000,
};

describe("METRIC_CONFIGS", () => {
	const metricKeys: ServerMetricKey[] = ["cpu", "loadavg", "memused", "netin", "netout", "pressureiosome", "rootused", "swapused"];

	it("defines valid configurations for all 8 server metrics", () => {
		for (const key of metricKeys) {
			const config = METRIC_CONFIGS[key];
			expect(config).toBeDefined();
			expect(config.dataKey).toBe(key);
			expect(config.title.length).toBeGreaterThan(0);
			expect(config.series.length).toBeGreaterThan(0);
			expect(config.icon).toBeDefined();
		}
	});

	it("formats CPU percentage properly", () => {
		const formatted = METRIC_CONFIGS.cpu.formatValue(samplePoint.cpu, samplePoint);
		expect(formatted).toBe("12.50%");
	});

	it("formats load average scaled by maxcpu", () => {
		const formatted = METRIC_CONFIGS.loadavg.formatValue(samplePoint.loadavg, samplePoint);
		// 2.0 / 8 = 0.25 -> 25.00%
		expect(formatted).toBe("25.00%");
	});

	it("formats memory usage as bytes", () => {
		const formatted = METRIC_CONFIGS.memused.formatValue(samplePoint.memused, samplePoint);
		expect(formatted).toBe("8 GB");
		expect(METRIC_CONFIGS.memused.totalKey).toBe("memtotal");
	});

	it("formats network throughput as byte rates", () => {
		const formattedIn = METRIC_CONFIGS.netin.formatValue(samplePoint.netin, samplePoint);
		const formattedOut = METRIC_CONFIGS.netout.formatValue(samplePoint.netout, samplePoint);
		expect(formattedIn).toBe("500 KB/s");
		expect(formattedOut).toBe("250 KB/s");
	});

	it("formats root storage as bytes with totalKey", () => {
		const formatted = METRIC_CONFIGS.rootused.formatValue(samplePoint.rootused, samplePoint);
		expect(formatted).toBe("40 GB");
		expect(METRIC_CONFIGS.rootused.totalKey).toBe("roottotal");
	});

	it("formats swap storage as bytes with totalKey", () => {
		const formatted = METRIC_CONFIGS.swapused.formatValue(samplePoint.swapused, samplePoint);
		expect(formatted).toBe("1 GB");
		expect(METRIC_CONFIGS.swapused.totalKey).toBe("swaptotal");
	});

	it("formats IO pressure as percentage", () => {
		const formatted = METRIC_CONFIGS.pressureiosome.formatValue(samplePoint.pressureiosome, samplePoint);
		expect(formatted).toBe("1.50%");
	});
});
