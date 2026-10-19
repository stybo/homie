import type { ProxmoxRrdRawDataPoint, ProxmoxTimeframe } from "@/types/index.ts";

const TIMEFRAME_SECONDS: Record<ProxmoxTimeframe, number> = {
	day: 86_400,
	hour: 3_600,
	month: 2_592_000,
	week: 604_800,
	year: 31_536_000,
};

const POINTS_COUNT = 60;

/**
 * Generates realistic fallback telemetry data points matching the Proxmox RRD schema.
 * Allows charts and KPI cards to render cleanly when environment variables are not configured.
 */
export function getFallbackNodeData(timeframe: ProxmoxTimeframe = "hour"): ProxmoxRrdRawDataPoint[] {
	const totalSeconds = TIMEFRAME_SECONDS[timeframe] ?? 3_600;
	const step = Math.max(1, Math.floor(totalSeconds / POINTS_COUNT));
	const nowSeconds = Math.floor(Date.now() / 1000);

	const memtotal = 64 * 1024 * 1024 * 1024;
	const swaptotal = 16 * 1024 * 1024 * 1024;
	const roottotal = 512 * 1024 * 1024 * 1024;
	const maxcpu = 16;

	const points: ProxmoxRrdRawDataPoint[] = [];

	for (let i = 0; i < POINTS_COUNT; i++) {
		const time = nowSeconds - (POINTS_COUNT - 1 - i) * step;
		const progress = i / (POINTS_COUNT - 1);
		const wave = Math.sin(progress * Math.PI * 3);
		const secondaryWave = Math.cos(progress * Math.PI * 2);

		const cpu = Math.max(0.02, Math.min(0.95, 0.18 + wave * 0.08 + secondaryWave * 0.04));
		const iowait = Math.max(0.001, Math.min(0.1, 0.008 + wave * 0.004));
		const loadavg = Math.max(0.2, 1.8 + wave * 0.7 + secondaryWave * 0.3);

		const memused = Math.round(memtotal * (0.38 + wave * 0.06));
		const memavailable = memtotal - memused;

		const swapused = Math.round(swaptotal * (0.08 + wave * 0.02));
		const rootused = Math.round(roottotal * 0.32 + i * 50 * 1024 * 1024);

		const netin = Math.round(Math.max(50_000, 3_500_000 + wave * 1_800_000 + secondaryWave * 600_000));
		const netout = Math.round(Math.max(30_000, 2_200_000 + secondaryWave * 1_200_000));

		const pressureiosome = Math.max(0, 0.003 + wave * 0.0015);
		const pressureiofull = Math.max(0, 0.0008 + wave * 0.0004);
		const pressurecpusome = Math.max(0, 0.004 + wave * 0.002);
		const pressurememorysome = Math.max(0, 0.001 + wave * 0.0005);
		const pressurememoryfull = 0.0002;
		const arcsize = Math.round(memtotal * 0.12);

		points.push({
			arcsize,
			cpu,
			iowait,
			loadavg,
			maxcpu,
			memavailable,
			memtotal,
			memused,
			netin,
			netout,
			pressurecpusome,
			pressureiofull,
			pressureiosome,
			pressurememoryfull,
			pressurememorysome,
			roottotal,
			rootused,
			swaptotal,
			swapused,
			time,
		});
	}

	return points;
}
