import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const themeEnvSchema = z.object({
	LATITUDE: z.coerce.number().min(-90).max(90),
	LONGITUDE: z.coerce.number().min(-180).max(180),
	MORNING_START_HOUR: z.coerce.number().int().min(0).max(23).optional(),
});

export interface ThemeConfig {
	latitude: number;
	longitude: number;
	morningStartHour?: number;
}

export const fetchThemeConfigServerFn = createServerFn({ method: "GET" }).handler(async (): Promise<ThemeConfig> => {
	const env = themeEnvSchema.parse(process.env);

	return {
		latitude: env.LATITUDE,
		longitude: env.LONGITUDE,
		morningStartHour: env.MORNING_START_HOUR,
	};
});
