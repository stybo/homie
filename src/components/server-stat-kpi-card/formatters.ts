const BYTE_UNITS = ["B", "KB", "MB", "GB", "TB", "PB"] as const;
const RATE_UNITS = ["B/s", "KB/s", "MB/s", "GB/s", "TB/s"] as const;
const KILO_BASE = 1024;

function formatUnits(value: number, units: readonly string[], decimals: number): string {
	if (!Number.isFinite(value) || value === 0) return `0 ${units[0]}`;
	const dm = Math.max(0, decimals);
	const i = Math.floor(Math.log2(Math.abs(value)) / 10);
	const idx = Math.max(0, Math.min(i, units.length - 1));
	const scaled = value / KILO_BASE ** idx;
	return `${parseFloat(scaled.toFixed(dm))} ${units[idx]}`;
}

/** Format byte values into human-readable strings (e.g. "6.25 GB") */
export function formatBytes(bytes: number, decimals = 2): string {
	return formatUnits(bytes, BYTE_UNITS, decimals);
}

/** Format byte throughput rates (e.g. "124 KB/s", "1.2 MB/s") */
export function formatByteRate(bytesPerSec: number, decimals = 2): string {
	return formatUnits(bytesPerSec, RATE_UNITS, decimals);
}

/** Format a 0-1 ratio or percentage to formatted percentage string */
export function formatPercentValue(ratio: number, decimals = 2): string {
	if (!Number.isFinite(ratio)) return "0.00%";
	return `${(ratio * 100).toFixed(decimals)}%`;
}

/** Module-scoped cached Intl formatter (prevents re-instantiation on every chart hover) */
const TIME_FORMATTER = new Intl.DateTimeFormat("nl-NL", {
	hour: "2-digit",
	minute: "2-digit",
});

/** Format unix timestamp (in seconds) to HH:mm string */
export function formatTime(timestampInSeconds: number): string {
	if (!Number.isFinite(timestampInSeconds)) return "";
	return TIME_FORMATTER.format(timestampInSeconds * 1000);
}

/** Format capacity usage ratio and total into a subvalue string (e.g. "65.4% of 32 GB") */
export function formatCapacitySubvalue(used: number, total?: number): string | null {
	if (!total || !Number.isFinite(total) || total <= 0) return null;
	return `${formatPercentValue(used / total, 1)} of ${formatBytes(total)}`;
}
