import { useTheme } from "@heroui/react";
import { getLocalTimeZone, now } from "@internationalized/date";
import { getTimes } from "suncalc";

const LATITUDE = 53.219;
const LONGITUDE = 6.566;

export function isDaylight(): boolean {
	const currentZoned = now(getLocalTimeZone());
	const currentDate = currentZoned.toDate();
	const { sunrise, sunset } = getTimes(currentDate, LATITUDE, LONGITUDE);

	const isAfterSunriseOrNine = (sunrise && currentDate >= sunrise) || currentZoned.hour >= 9;
	const isBeforeSunset = Boolean(sunset && currentDate < sunset);

	return isAfterSunriseOrNine && isBeforeSunset;
}

export function getTimeBasedTheme(): "light" | "dark" {
	return isDaylight() ? "light" : "dark";
}

export function useAutoTheme() {
	const { resolvedTheme, setTheme } = useTheme();
	const expected = getTimeBasedTheme();

	if (resolvedTheme !== expected) {
		setTheme(expected);
	}
}
