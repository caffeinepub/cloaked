import type { BurrowStatus } from "@/data/burrows";

interface Props {
  status: BurrowStatus;
}

const config: Record<BurrowStatus, { label: string; className: string }> = {
  Active: {
    label: "Active",
    className:
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[oklch(0.90_0.040_155)] text-[oklch(0.30_0.070_155)] border border-[oklch(0.75_0.060_155)]",
  },
  "Potentially Active": {
    label: "Potentially Active",
    className:
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[oklch(0.92_0.06_65)] text-[oklch(0.40_0.12_65)] border border-[oklch(0.75_0.10_65)]",
  },
  Abandoned: {
    label: "Abandoned",
    className:
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[oklch(0.90_0_0)] text-[oklch(0.40_0_0)] border border-[oklch(0.70_0_0)]",
  },
};

export function StatusBadge({ status }: Props) {
  const { label, className } = config[status];
  return <span className={className}>{label}</span>;
}
