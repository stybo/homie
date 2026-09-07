import { KPI } from "@heroui-pro/react/kpi";
import type { MetricConfig } from "./types.ts";

export interface CardValueProps {
	formattedCustomValue?: string;
	displayValue: number;
	maximumFractionDigits?: number;
	style?: MetricConfig["style"];
	unit?: string;
}

export function CardValue({ formattedCustomValue, displayValue, maximumFractionDigits, style, unit }: CardValueProps) {
	if (formattedCustomValue) {
		return (
			<KPI.Value className="pr-2 text-2xl font-bold" value={0}>
				{() => formattedCustomValue}
			</KPI.Value>
		);
	}

	return (
		<KPI.Value
			className="pr-3 text-2xl font-bold"
			maximumFractionDigits={maximumFractionDigits}
			style={style}
			unit={unit}
			value={displayValue}
		/>
	);
}
