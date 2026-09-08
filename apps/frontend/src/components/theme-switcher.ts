import { useTheme } from "@heroui/react";
import { getLocalTimeZone, now } from "@internationalized/date";

const DAY_START_HOUR = 9;
const NIGHT_START_HOUR = 21;

export function getTimeBasedTheme(): "light" | "dark" {
	const { hour } = now(getLocalTimeZone());
	return hour >= DAY_START_HOUR && hour < NIGHT_START_HOUR ? "light" : "dark";
}

export function useAutoTheme() {
	const { resolvedTheme, setTheme } = useTheme();
	const expected = getTimeBasedTheme();

	if (resolvedTheme !== expected) {
		setTheme(expected);
	}
}
