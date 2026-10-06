import { getLocalTimeZone, now } from "@internationalized/date";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { getTimes } from "suncalc";

export const LATITUDE = Number(process.env.LATITUDE) || 53.219;
export const LONGITUDE = Number(process.env.LONGITUDE) || 6.566;
export const MORNING_START_HOUR = Number(process.env.MORNING_START_HOUR) || 9;

export function getTimeBasedTheme(): "dark" | "light" {
	const current = now(getLocalTimeZone());
	const date = current.toDate();
	const { sunrise, sunset } = getTimes(date, LATITUDE, LONGITUDE);

	const isAfterSunrise = Boolean(sunrise && date >= sunrise);
	const isAfterMorningHour = current.hour >= MORNING_START_HOUR;
	const isBeforeSunset = Boolean(sunset && date < sunset);

	const isDaytime = isAfterSunrise && isAfterMorningHour && isBeforeSunset;

	return isDaytime ? "light" : "dark";
}

export function useAutoTheme() {
	const { resolvedTheme, setTheme } = useTheme();
	const expected = getTimeBasedTheme();

	useEffect(() => {
		if (resolvedTheme !== expected) {
			setTheme(expected);
		}
	}, [resolvedTheme, expected, setTheme]);
}
