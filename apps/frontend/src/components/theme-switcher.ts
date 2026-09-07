import { useTheme } from "@heroui/react";
import { getLocalTimeZone, now } from "@internationalized/date";
import { useQuery } from "@tanstack/react-query";

export function getTimeBasedTheme(): "light" | "dark" {
	const { hour } = now(getLocalTimeZone());
	return hour >= 6 && hour < 18 ? "light" : "dark";
}

export function useAutoTheme() {
	const { resolvedTheme, setTheme } = useTheme();

	const { data: theme } = useQuery({
		queryKey: ["auto-theme", resolvedTheme],
		queryFn: () => {
			const expected = getTimeBasedTheme();
			if (resolvedTheme !== expected) {
				setTheme(expected);
			}
			return expected;
		},
		refetchInterval: 10_000,
	});

	return theme;
}
