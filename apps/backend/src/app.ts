import dotenv from "dotenv";
import express, { type Express, type Request, type Response } from "express";

const app: Express = express();
const port = 3000;
dotenv.config();

const BASE_URL = `https://proxmox.stybo.nl`;

async function fetchNodeData() {
	const url = new URL(`/api2/json/nodes/homelab/rrddata`, BASE_URL);
	url.searchParams.set("timeframe", "hour");

	const response = await fetch(url, {
		headers: { Authorization: `${process.env.PROXMOX_TOKEN}` },
	});
	if (!response.ok) {
		throw new Error(`Failed to fetch node data for ${url}`);
	}

	const { data } = await response.json();
	return data.map((node: { cpu: number }) => ({ value: node.cpu }));
}

app.get("/api/cpu", async (req: Request, res: Response) => {
	try {
		res.status(200).json(await fetchNodeData());
	} catch (error) {
		res.status(404).json(error);
	}
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
