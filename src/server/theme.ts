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

export const fetchThemeConfigServerFn = createServerFn({ method: "GET" }).handler(async (): Promise<ThemeConfig | null> => {
	const parsed = themeEnvSchema.safeParse(process.env);
	if (!parsed.success) {
		return null;
	}

	return {
		latitude: parsed.data.LATITUDE,
		longitude: parsed.data.LONGITUDE,
		morningStartHour: parsed.data.MORNING_START_HOUR,
	};
});
