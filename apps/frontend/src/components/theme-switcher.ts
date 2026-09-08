import { useTheme } from "@heroui/react";
import { getLocalTimeZone, now } from "@internationalized/date";
import { getTimes } from "suncalc";

const LATITUDE = 53.219;
const LONGITUDE = 6.566;

export function isDaylight(): boolean {
	const currentDate = now(getLocalTimeZone()).toDate();
	const { sunrise, sunset } = getTimes(currentDate, LATITUDE, LONGITUDE);
	return Boolean(sunrise && sunset && currentDate >= sunrise && currentDate < sunset);
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
