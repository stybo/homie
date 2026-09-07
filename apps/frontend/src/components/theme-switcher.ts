import { useTheme } from "@heroui/react";
import { getLocalTimeZone, now } from "@internationalized/date";
import { useQuery } from "@tanstack/react-query";

const DAY_START_HOUR = 9;
const NIGHT_START_HOUR = 21;

export function getTimeBasedTheme(): "light" | "dark" {
	const { hour } = now(getLocalTimeZone());
	return hour >= DAY_START_HOUR && hour < NIGHT_START_HOUR ? "light" : "dark";
}

export function useAutoTheme() {
	const { resolvedTheme, setTheme } = useTheme();

	return useQuery({
		queryKey: ["auto-theme", resolvedTheme],
		queryFn: () => {
			const expected = getTimeBasedTheme();
			if (resolvedTheme !== expected) {
				setTheme(expected);
			}
			return expected;
		},
		refetchInterval: 60_000,
	});
}
