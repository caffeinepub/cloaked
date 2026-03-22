import type { ThreatLevel } from "@/data/burrows";

interface Props {
  level: ThreatLevel;
}

const config: Record<ThreatLevel, { label: string; className: string }> = {
  Low: {
    label: "Low",
    className:
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[oklch(0.90_0.06_130)] text-[oklch(0.35_0.09_130)] border border-[oklch(0.70_0.08_130)]",
  },
  Moderate: {
    label: "Moderate",
    className:
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[oklch(0.92_0.08_85)] text-[oklch(0.40_0.10_70)] border border-[oklch(0.72_0.10_82)]",
  },
  High: {
    label: "High",
    className:
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[oklch(0.92_0.06_30)] text-[oklch(0.40_0.17_30)] border border-[oklch(0.70_0.12_30)]",
  },
};

export function ThreatBadge({ level }: Props) {
  const { label, className } = config[level];
  return <span className={className}>{label}</span>;
}
