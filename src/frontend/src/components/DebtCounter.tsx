import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { NationalDebtConfig } from "../backend.d";
import { calcCurrentDebtExact } from "../hooks/useDebtClock";

function formatDebt(dollars: number): string {
  return Math.floor(dollars).toLocaleString("en-US");
}

function DigitTile({ digit }: { digit: string }) {
  const [key, setKey] = useState(0);
  const prevRef = useRef(digit);

  useEffect(() => {
    if (digit !== prevRef.current) {
      setKey((k) => k + 1);
      prevRef.current = digit;
    }
  }, [digit]);

  if (digit === "," || digit === "$") {
    return (
      <span
        className="font-mono font-bold"
        style={{ color: "oklch(0.87 0.10 83)", margin: "0 1px" }}
      >
        {digit}
      </span>
    );
  }

  return (
    <span
      className="inline-block relative overflow-hidden"
      style={{
        minWidth: "0.62em",
        background: "oklch(0.25 0.012 243)",
        borderRadius: "4px",
        padding: "0 2px",
        margin: "0 1px",
        boxShadow: "inset 0 2px 4px oklch(0.10 0.01 243 / 0.8)",
        border: "1px solid oklch(0.35 0.02 243 / 0.5)",
      }}
    >
      <span
        key={key}
        className="digit-tick counter-glow block text-center"
        style={{ color: "oklch(0.97 0.005 243)" }}
      >
        {digit}
      </span>
    </span>
  );
}

function SubCounter({
  label,
  value,
  note,
}: { label: string; value: number; note?: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span
        className="text-xs uppercase tracking-widest font-semibold"
        style={{ color: "oklch(0.62 0.015 243)" }}
      >
        {label}
      </span>
      <span
        className="font-mono font-bold counter-glow text-xl sm:text-2xl md:text-3xl"
        style={{ color: "oklch(0.87 0.10 83)" }}
      >
        ${formatDebt(value)}
      </span>
      {note && (
        <span className="text-xs" style={{ color: "oklch(0.52 0.015 243)" }}>
          {note}
        </span>
      )}
    </div>
  );
}

export function DebtCounter({ config }: { config: NationalDebtConfig }) {
  const [debt, setDebt] = useState(() =>
    calcCurrentDebtExact(config, Date.now()),
  );
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef(0);

  useEffect(() => {
    const tick = (ts: number) => {
      if (ts - lastRef.current >= 100) {
        setDebt(calcCurrentDebtExact(config, Date.now()));
        lastRef.current = ts;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [config]);

  const formatted = `$${formatDebt(debt)}`;
  const population = Number(config.usPopulation);
  const taxpayers = Number(config.usTaxpayers);
  const perCitizen = population > 0 ? debt / population : 0;
  const perTaxpayer = taxpayers > 0 ? debt / taxpayers : 0;

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <output
          className="font-mono font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight flex flex-wrap justify-center items-center leading-none"
          aria-label={`US National Debt: ${formatted}`}
          aria-live="polite"
          aria-atomic="true"
          data-ocid="debt.counter"
        >
          {formatted.split("").map((ch, i) => (
            <DigitTile key={`pos-${String(i)}`} digit={ch} />
          ))}
        </output>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-8 sm:gap-16 items-center"
      >
        <SubCounter
          label="Debt Per Citizen"
          value={perCitizen}
          note={`${(population / 1e6).toFixed(0)}M population`}
        />
        <div
          className="hidden sm:block w-px h-10"
          style={{ background: "oklch(0.35 0.02 243)" }}
        />
        <SubCounter
          label="Debt Per Taxpayer"
          value={perTaxpayer}
          note={`${(taxpayers / 1e6).toFixed(0)}M taxpayers`}
        />
      </motion.div>
    </div>
  );
}
