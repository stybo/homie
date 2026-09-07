/** Format byte values into human-readable strings (e.g. "6.25 GB") */
export function formatBytes(bytes: number, decimals = 2): string {
	if (bytes === 0 || !Number.isFinite(bytes)) return "0 B";
	const k = 1024;
	const dm = Math.max(0, decimals);
	const sizes = ["B", "KB", "MB", "GB", "TB", "PB"];
	const i = Math.floor(Math.log(Math.abs(bytes)) / Math.log(k));
	const idx = Math.min(i, sizes.length - 1);
	return `${parseFloat((bytes / Math.pow(k, idx)).toFixed(dm))} ${sizes[idx]}`;
}

/** Format byte throughput rates (e.g. "124 KB/s", "1.2 MB/s") */
export function formatByteRate(bytesPerSec: number, decimals = 2): string {
	if (bytesPerSec === 0 || !Number.isFinite(bytesPerSec)) return "0 B/s";
	const k = 1024;
	const dm = Math.max(0, decimals);
	const sizes = ["B/s", "KB/s", "MB/s", "GB/s", "TB/s"];
	const i = Math.floor(Math.log(Math.abs(bytesPerSec)) / Math.log(k));
	const idx = Math.min(i, sizes.length - 1);
	return `${parseFloat((bytesPerSec / Math.pow(k, idx)).toFixed(dm))} ${sizes[idx]}`;
}

/** Format a 0-1 ratio or percentage to formatted percentage string */
export function formatPercentValue(ratio: number, decimals = 2): string {
	if (!Number.isFinite(ratio)) return "0%";
	return `${(ratio * 100).toFixed(decimals)}%`;
}
