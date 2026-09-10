import type { ProxmoxRrdRawDataPoint, ProxmoxRrdResponse, ProxmoxTimeframe } from "@homie/types";
import dotenv from "dotenv";
import express, { type Express, type Request, type Response } from "express";

dotenv.config();

const HOSTNAME = "0.0.0.0";
const PORT = 10000;
const BASE_URL = `https://proxmox.stybo.nl`;
const app: Express = express();

function parseTimeframe(queryParam: Request["query"][string]): ProxmoxTimeframe {
	if (queryParam === "day" || queryParam === "week" || queryParam === "month" || queryParam === "year") {
		return queryParam;
	}
	return "hour";
}

async function fetchNodeData(timeframe: ProxmoxTimeframe = "hour"): Promise<ProxmoxRrdRawDataPoint[]> {
	const url = new URL(`/api2/json/nodes/homelab/rrddata`, BASE_URL);
	url.searchParams.set("timeframe", timeframe);

	const response = await fetch(url, {
		headers: { Authorization: `${process.env.PROXMOX_TOKEN}` },
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch node data for ${url}`);
	}

	const { data }: ProxmoxRrdResponse = await response.json();
	return data;
}

app.get("/api/health", (_req: Request, res: Response) => {
	res.status(200).json({
		status: "ok",
		timestamp: new Date().toISOString(),
		uptime: process.uptime(),
	});
});

app.get("/api/pve1", async (req: Request, res: Response) => {
	const timeframe = parseTimeframe(req.query.timeframe);
	try {
		res.status(200).json(await fetchNodeData(timeframe));
	} catch (error) {
		console.error(`[PVE] Failed to fetch stats for timeframe "${timeframe}":`, error);
		res.status(502).json({
			error: error instanceof Error ? error.message : "Failed to fetch server stats",
		});
	}
});

app.listen(PORT, HOSTNAME, () => {
	console.log(`Example app listening on port ${PORT}`);
});
