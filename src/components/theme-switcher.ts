import { getLocalTimeZone, now } from "@internationalized/date";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { getTimes } from "suncalc";
import type { ThemeConfig } from "@/server/theme.ts";

export function getTimeBasedTheme(config: ThemeConfig, targetDate?: Date): "dark" | "light" {
	const { latitude, longitude, morningStartHour } = config;
	const current = now(getLocalTimeZone());
	const date = targetDate ?? current.toDate();
	const { sunrise, sunset } = getTimes(date, latitude, longitude);

	const isAfterSunrise = Boolean(sunrise && date >= sunrise);
	const isAfterMorningHour = morningStartHour === undefined || current.hour >= morningStartHour;
	const isBeforeSunset = Boolean(sunset && date < sunset);

	const isDaytime = isAfterSunrise && isAfterMorningHour && isBeforeSunset;

	return isDaytime ? "light" : "dark";
}

export function useAutoTheme(config: ThemeConfig) {
	const { resolvedTheme, setTheme } = useTheme();

	useEffect(() => {
		function updateTheme() {
			const expected = getTimeBasedTheme(config);
			if (resolvedTheme !== expected) {
				setTheme(expected);
			}
		}

		updateTheme();
		const intervalId = setInterval(updateTheme, 60_000);
		return () => clearInterval(intervalId);
	}, [resolvedTheme, config, setTheme]);
}
