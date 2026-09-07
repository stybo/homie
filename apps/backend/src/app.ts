import type { ProxmoxRrdRawDataPoint, ProxmoxRrdResponse } from "@homie/types";
import dotenv from "dotenv";
import express, { type Express, type Request, type Response } from "express";

dotenv.config();

const HOSTNAME = "0.0.0.0";
const PORT = 10000;
const BASE_URL = `https://proxmox.stybo.nl`;
const app: Express = express();

async function fetchNodeData(): Promise<ProxmoxRrdRawDataPoint[]> {
	const url = new URL(`/api2/json/nodes/homelab/rrddata`, BASE_URL);
	url.searchParams.set("timeframe", "hour");

	const response = await fetch(url, {
		headers: { Authorization: `${process.env.PROXMOX_TOKEN}` },
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch node data for ${url}`);
	}

	const { data }: ProxmoxRrdResponse = await response.json();
	return data;
}

app.get("/api/pve1", async (req: Request, res: Response) => {
	try {
		res.status(200).json(await fetchNodeData());
	} catch (error) {
		res.status(404).json(error);
	}
});

app.listen(PORT, HOSTNAME, () => {
	console.log(`Example app listening on port ${PORT}`);
});
