import { motion } from "motion/react";
import type { NationalDebtConfig } from "../backend.d";

function StatCard({
  label,
  value,
  sub,
  delay,
}: { label: string; value: string; sub: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="card-glow rounded-lg p-6 flex flex-col gap-2"
      style={{ background: "oklch(0.26 0.047 243)" }}
    >
      <span
        className="text-xs uppercase tracking-widest font-semibold"
        style={{ color: "oklch(0.62 0.015 243)" }}
      >
        {label}
      </span>
      <span
        className="font-mono font-bold text-2xl sm:text-3xl counter-glow"
        style={{ color: "oklch(0.87 0.10 83)" }}
      >
        {value}
      </span>
      <span className="text-sm" style={{ color: "oklch(0.55 0.015 243)" }}>
        {sub}
      </span>
    </motion.div>
  );
}

export function StatsCards({ config }: { config: NationalDebtConfig }) {
  const ratePerSec = Number(config.ratePerSecondCents) / 100;
  const daily = ratePerSec * 86400;
  const yearly = daily * 365;
  const perSecFormatted = `$${ratePerSec.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

  return (
    <section
      className="py-10 px-4 sm:px-6 lg:px-8"
      style={{ background: "oklch(0.19 0.020 243)" }}
      aria-label="Debt statistics"
    >
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs uppercase tracking-widest font-semibold mb-6 text-center"
          style={{ color: "oklch(0.50 0.015 243)" }}
        >
          Live Statistics
        </motion.h2>
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          data-ocid="stats.panel"
        >
          <StatCard
            label="Daily Debt Increase"
            value={`$${(daily / 1e9).toFixed(1)}B`}
            sub={`$${(yearly / 1e12).toFixed(2)} trillion per year`}
            delay={0.1}
          />
          <StatCard
            label="Debt Per Second"
            value={perSecFormatted}
            sub="Every second, every day"
            delay={0.2}
          />
          <StatCard
            label="Debt-to-GDP Ratio"
            value="~124%"
            sub="US GDP ≈ $27.4 trillion (2024)"
            delay={0.3}
          />
        </div>
      </div>
    </section>
  );
}
