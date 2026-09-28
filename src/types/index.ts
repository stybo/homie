/** Raw data point structure returned by Proxmox `/api2/json/nodes/{node}/rrddata` */
export interface ProxmoxRrdRawDataPoint {
	/** Timestamp in seconds (Unix epoch) */
	time: number;
	/** CPU usage as a ratio (e.g. 0.0319 for ~3.2%) */
	cpu: number;
	/** Maximum number of CPU cores allocated */
	maxcpu: number;
	/** CPU wait I/O ratio */
	iowait: number;
	/** System load average (1 minute) */
	loadavg: number;
	/** Used memory in bytes */
	memused: number;
	/** Total memory in bytes */
	memtotal: number;
	/** Available memory in bytes */
	memavailable: number;
	/** Used swap space in bytes */
	swapused: number;
	/** Total swap space in bytes */
	swaptotal: number;
	/** Root filesystem used storage in bytes */
	rootused: number;
	/** Root filesystem total storage in bytes */
	roottotal: number;
	/** Network inbound throughput in bytes/sec */
	netin: number;
	/** Network outbound throughput in bytes/sec */
	netout: number;
	/** ZFS ARC cache size in bytes */
	arcsize: number;
	/** Pressure Stall Information: CPU some */
	pressurecpusome: number;
	/** Pressure Stall Information: I/O some */
	pressureiosome: number;
	/** Pressure Stall Information: I/O full */
	pressureiofull: number;
	/** Pressure Stall Information: Memory some */
	pressurememorysome: number;
	/** Pressure Stall Information: Memory full */
	pressurememoryfull: number;
	[key: string]: number;
}

/** Standard Proxmox JSON API response envelope for RRD data */
export interface ProxmoxRrdResponse {
	data: ProxmoxRrdRawDataPoint[];
}

export type ProxmoxTimeframe = "hour" | "day" | "week" | "month" | "year";

export type ProxmoxDataKey =
	| "time"
	| "cpu"
	| "maxcpu"
	| "iowait"
	| "loadavg"
	| "memused"
	| "memtotal"
	| "memavailable"
	| "swapused"
	| "swaptotal"
	| "rootused"
	| "roottotal"
	| "netin"
	| "netout"
	| "arcsize"
	| "pressurecpusome"
	| "pressureiosome"
	| "pressureiofull"
	| "pressurememorysome"
	| "pressurememoryfull";
