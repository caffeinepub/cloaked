import { Toaster } from "@/components/ui/sonner";
import { Check, Copy, ExternalLink } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// ─── Constants ────────────────────────────────────────────────────────────────
const BASE_DEBT = 36_200_000_000_000;
const DEBT_PER_MS = 1_000_000 / 30_000; // ~$33,333/s
const BASE_TIME = Date.now();
const US_POP = 335_000_000;
const US_TAXPAYERS = 150_000_000;
const ICP_WALLET =
  "416c602ad9431e5c54158097c181a8268c72de7704f8276d6d13e7e4f4207150";

function getDebt(): number {
  return BASE_DEBT + (Date.now() - BASE_TIME) * DEBT_PER_MS;
}

function formatDebtRaw(n: number): string {
  return Math.floor(n).toLocaleString("en-US");
}

function formatShare(n: number): string {
  return `$${Math.floor(n).toLocaleString("en-US")}`;
}

// ─── Animated section wrapper ─────────────────────────────────────────────────
function FadeSection({
  children,
  delay = 0,
  className = "",
}: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, delay, ease: [0.25, 0.1, 0.25, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ─── LED Debt Counter ─────────────────────────────────────────────────────────
function DebtCounter() {
  const [debt, setDebt] = useState(getDebt());

  useEffect(() => {
    const id = setInterval(() => setDebt(getDebt()), 100);
    return () => clearInterval(id);
  }, []);

  const raw = formatDebtRaw(debt);

  return (
    <div
      className="scanlines rounded-xl overflow-hidden"
      style={{
        background: "oklch(0.06 0.004 75 / 0.9)",
        border: "1px solid oklch(0.72 0.13 75 / 0.4)",
        boxShadow:
          "0 0 0 1px oklch(0.72 0.13 75 / 0.2), 0 0 60px oklch(0.68 0.13 75 / 0.2), inset 0 0 40px oklch(0 0 0 / 0.6)",
      }}
      data-ocid="debt.panel"
    >
      <div className="px-6 py-8 sm:px-10 sm:py-10 text-center">
        <p
          className="text-xs uppercase tracking-[0.35em] font-semibold mb-4"
          style={{ color: "oklch(0.62 0.09 75)" }}
        >
          U.S. National Debt — Live Update
        </p>
        <div
          className="font-mono text-5xl sm:text-7xl lg:text-8xl xl:text-9xl leading-none tracking-tight tabular-nums glow-gold"
          style={{ color: "oklch(0.78 0.155 75)" }}
          aria-label={`$${raw}`}
          data-ocid="debt.counter"
        >
          <span style={{ color: "oklch(0.68 0.13 75)" }}>$</span>
          {raw}
        </div>
        <p
          className="mt-5 text-sm tracking-widest uppercase"
          style={{ color: "oklch(0.45 0.06 75)" }}
        >
          +$33,333 every second
        </p>
      </div>
    </div>
  );
}

// ─── Per-Citizen Stats ────────────────────────────────────────────────────────
function YourShareSection() {
  const [debt, setDebt] = useState(getDebt());

  useEffect(() => {
    const id = setInterval(() => setDebt(getDebt()), 500);
    return () => clearInterval(id);
  }, []);

  const perCitizen = debt / US_POP;
  const perTaxpayer = debt / US_TAXPAYERS;
  const perSecondPerCitizen = (DEBT_PER_MS * 1000) / US_POP;

  const stats = [
    {
      label: "Your Share",
      sublabel: "per U.S. citizen",
      value: formatShare(perCitizen),
      note: "Every man, woman, and child — including you.",
      ocid: "share.citizen_card",
    },
    {
      label: "Taxpayer Share",
      sublabel: "per federal taxpayer",
      value: formatShare(perTaxpayer),
      note: "If only the people who pay taxes split the bill.",
      ocid: "share.taxpayer_card",
    },
    {
      label: "Your Cut Per Second",
      sublabel: "added to your share",
      value: `+$${perSecondPerCitizen.toFixed(4)}`,
      note: "While you read this sentence, your share grew.",
      ocid: "share.persecond_card",
    },
  ];

  return (
    <section
      id="your-share"
      className="py-20 sm:py-28"
      data-ocid="share.section"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        <FadeSection>
          <p
            className="text-xs uppercase tracking-[0.3em] text-center mb-3"
            style={{ color: "oklch(0.62 0.09 75)" }}
          >
            The Math
          </p>
          <h2 className="font-heading text-5xl sm:text-6xl lg:text-7xl text-center uppercase tracking-wider text-foreground mb-3">
            YOUR SHARE OF THE DEBT
          </h2>
          <p
            className="text-center max-w-xl mx-auto mb-12"
            style={{ color: "oklch(0.65 0.008 280)" }}
          >
            This isn't abstract. These numbers have your name on them.
          </p>
        </FadeSection>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {stats.map((s, i) => (
            <FadeSection key={s.ocid} delay={i * 0.12}>
              <div
                className="rounded-xl p-7 text-center box-glow-gold h-full flex flex-col"
                style={{ background: "oklch(0.10 0.006 75 / 0.8)" }}
                data-ocid={s.ocid}
              >
                <p
                  className="text-xs uppercase tracking-[0.25em] font-semibold mb-1"
                  style={{ color: "oklch(0.58 0.09 75)" }}
                >
                  {s.label}
                </p>
                <p
                  className="font-mono text-3xl sm:text-4xl font-bold my-3 glow-gold-subtle tabular-nums"
                  style={{ color: "oklch(0.76 0.14 75)" }}
                >
                  {s.value}
                </p>
                <p
                  className="text-xs uppercase tracking-widest mb-2"
                  style={{ color: "oklch(0.48 0.06 75)" }}
                >
                  {s.sublabel}
                </p>
                <p
                  className="text-sm mt-auto"
                  style={{ color: "oklch(0.62 0.006 280)" }}
                >
                  {s.note}
                </p>
              </div>
            </FadeSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How Money Is Created ─────────────────────────────────────────────────────
const fedCards = [
  {
    icon: "🏦",
    title: "The Federal Reserve Act, 1913",
    body: "On December 23, 1913 — three days before Christmas, when most congressmen had already left Washington — the Federal Reserve Act was signed into law. A private central bank was handed control of the U.S. money supply.",
  },
  {
    icon: "🖨️",
    title: "Money Creation",
    body: "The Fed creates money by purchasing government bonds with money that didn't exist before the purchase. This is called \"open market operations.\" More money chasing the same goods = prices rise. That's inflation.",
  },
  {
    icon: "🏛️",
    title: "Fractional Reserve Banking",
    body: "Every $1 you deposit, your bank can loan out $9 or more — money they create with a keystroke. This expands the money supply far beyond what was ever printed. When loans go bad, banks collapse and the Fed steps in.",
  },
  {
    icon: "🔍",
    title: "Who Owns the Fed?",
    body: "The Federal Reserve is technically a hybrid — its board is government-appointed, but the regional Federal Reserve Banks are owned by private member banks. The complete ownership structure is not publicly disclosed.",
  },
  {
    icon: "💸",
    title: "Debt as Money",
    body: "Every dollar in your wallet is a Federal Reserve Note — a debt instrument. The U.S. dollar is literally born as debt. When the government borrows money, new dollars are created. When debt is repaid, those dollars vanish.",
  },
  {
    icon: "🌊",
    title: "Quantitative Easing",
    body: "Since 2008, the Fed has purchased trillions in assets to inject money into the financial system. The Fed's balance sheet went from $900B in 2008 to over $9 trillion in 2022. That money went somewhere — mostly upward.",
  },
];

function FedSection() {
  return (
    <section
      id="how-it-works"
      className="py-20 sm:py-28"
      style={{ background: "oklch(0.09 0.003 280)" }}
      data-ocid="fed.section"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        <FadeSection>
          <p
            className="text-xs uppercase tracking-[0.3em] text-center mb-3"
            style={{ color: "oklch(0.62 0.09 75)" }}
          >
            Chapter 1
          </p>
          <h2 className="font-heading text-5xl sm:text-6xl lg:text-7xl text-center uppercase tracking-wider text-foreground mb-3">
            THE FEDERAL RESERVE
          </h2>
          <p
            className="text-center max-w-2xl mx-auto mb-14"
            style={{ color: "oklch(0.65 0.008 280)" }}
          >
            Here's what actually happened. Not the textbook version — the real
            one.
          </p>
        </FadeSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {fedCards.map((card, i) => (
            <FadeSection key={card.title} delay={i * 0.08}>
              <div
                className="rounded-xl p-6 h-full flex flex-col gap-3"
                style={{
                  background: "oklch(0.11 0.004 75 / 0.7)",
                  border: "1px solid oklch(0.72 0.13 75 / 0.12)",
                }}
              >
                <span className="text-3xl">{card.icon}</span>
                <h3
                  className="font-heading text-xl uppercase tracking-wide"
                  style={{ color: "oklch(0.74 0.14 75)" }}
                >
                  {card.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.65 0.007 280)" }}
                >
                  {card.body}
                </p>
              </div>
            </FadeSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Inflation Visualizer ─────────────────────────────────────────────────────
const inflationData = [
  {
    year: 1913,
    value: 100,
    label: "$100 in 1913",
    buying: "Full week of groceries for a family, rent included",
    note: "Year the Fed was created",
  },
  {
    year: 1933,
    value: 89,
    label: "$100 in 1933",
    buying: "Slightly less — FDR's 1933 gold confiscation shook confidence",
    note: "Gold confiscated",
  },
  {
    year: 1944,
    value: 74,
    label: "$100 in 1944",
    buying: "Bretton Woods made the dollar the world's reserve currency",
    note: "Bretton Woods",
  },
  {
    year: 1971,
    value: 38,
    label: "$100 in 1971",
    buying: "Nixon ends gold standard. Dollar becomes fiat.",
    note: "Nixon Shock",
  },
  {
    year: 2001,
    value: 15,
    label: "$100 in 2001",
    buying: "Tech boom, but purchasing power continued its slow erosion",
    note: "Dot-com crash",
  },
  {
    year: 2013,
    value: 11,
    label: "$100 in 2013",
    buying: "Post-QE world. Fed's balance sheet tripled.",
    note: "Post-QE",
  },
  {
    year: 2024,
    value: 8,
    label: "$100 in 2024",
    buying: "What $100 buys today compared to a century ago.",
    note: "Today",
  },
];

function InflationSection() {
  return (
    <section
      id="inflation"
      className="py-20 sm:py-28 page-bg"
      data-ocid="inflation.section"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        <FadeSection>
          <p
            className="text-xs uppercase tracking-[0.3em] text-center mb-3"
            style={{ color: "oklch(0.62 0.09 75)" }}
          >
            Chapter 2
          </p>
          <h2 className="font-heading text-5xl sm:text-6xl lg:text-7xl text-center uppercase tracking-wider text-foreground mb-3">
            INFLATION VISUALIZER
          </h2>
          <p
            className="text-center max-w-xl mx-auto mb-14"
            style={{ color: "oklch(0.65 0.008 280)" }}
          >
            What could $100 actually buy? Watch your dollar disappear across
            time.
          </p>
        </FadeSection>

        <div className="space-y-4">
          {inflationData.map((item, i) => (
            <FadeSection key={item.year} delay={i * 0.07}>
              <div
                className="rounded-xl p-5 sm:p-6"
                style={{
                  background: "oklch(0.10 0.005 75 / 0.7)",
                  border: "1px solid oklch(0.72 0.13 75 / 0.10)",
                }}
                data-ocid={`inflation.item.${i + 1}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="shrink-0 w-20 text-center">
                    <p
                      className="font-heading text-3xl"
                      style={{ color: "oklch(0.74 0.14 75)" }}
                    >
                      {item.year}
                    </p>
                    <p
                      className="text-xs uppercase tracking-widest"
                      style={{ color: "oklch(0.50 0.07 75)" }}
                    >
                      {item.note}
                    </p>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-semibold text-foreground">
                        {item.label}
                      </p>
                      <p
                        className="font-mono text-lg font-bold glow-gold-subtle"
                        style={{ color: "oklch(0.76 0.14 75)" }}
                      >
                        ${item.value}
                      </p>
                    </div>
                    <div
                      className="h-2 rounded-full overflow-hidden"
                      style={{ background: "oklch(0.15 0.005 280)" }}
                    >
                      <motion.div
                        className="h-full rounded-full inflation-bar-fill"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.value}%` }}
                        transition={{
                          duration: 1,
                          delay: i * 0.05,
                          ease: "easeOut",
                        }}
                        viewport={{ once: true }}
                      />
                    </div>
                    <p
                      className="text-xs mt-2"
                      style={{ color: "oklch(0.55 0.006 280)" }}
                    >
                      {item.buying}
                    </p>
                  </div>
                </div>
              </div>
            </FadeSection>
          ))}
        </div>

        <FadeSection delay={0.3}>
          <div
            className="mt-8 rounded-xl p-6 text-center"
            style={{
              background: "oklch(0.11 0.007 75 / 0.8)",
              border: "1px solid oklch(0.72 0.13 75 / 0.3)",
            }}
          >
            <p className="font-heading text-2xl sm:text-3xl uppercase tracking-wider text-foreground mb-2">
              $100 in 1913 = $8 today.
            </p>
            <p className="text-sm" style={{ color: "oklch(0.62 0.007 280)" }}>
              92% of the dollar's purchasing power — erased in 111 years. Not by
              accident.
            </p>
          </div>
        </FadeSection>
      </div>
    </section>
  );
}

// ─── Historical Timeline ──────────────────────────────────────────────────────
const timelineEvents = [
  {
    year: "1913",
    title: "Federal Reserve Act",
    body: "Three days before Christmas, while most of Congress had gone home, the Federal Reserve Act passed. A private central bank was handed control of the American money supply. The era of fiat monetary policy begins.",
  },
  {
    year: "1933",
    title: "FDR Confiscates Gold",
    body: "Executive Order 6102 made it illegal for ordinary Americans to own gold. Citizens were forced to surrender their gold to the government at $20.67 per ounce. The following year, the government revalued gold to $35/oz — a 69% profit for the Fed.",
  },
  {
    year: "1944",
    title: "Bretton Woods Agreement",
    body: "World leaders gathered in New Hampshire to design the post-war financial order. The U.S. dollar became the world's reserve currency, pegged to gold at $35/oz. Every other currency pegged to the dollar. America gained enormous financial leverage.",
  },
  {
    year: "1971",
    title: "Nixon Closes the Gold Window",
    body: '"Temporarily" suspending the dollar\'s convertibility to gold, Nixon unilaterally ended the Bretton Woods system. Foreign governments could no longer exchange dollars for gold. The dollar became pure fiat. That "temporary" suspension never ended.',
  },
  {
    year: "1987",
    title: "Black Monday",
    body: "The Dow Jones fell 22.6% in a single day — the largest one-day percentage crash in history. The Fed's response: flood the system with liquidity. The pattern of using money creation to paper over market crashes was established.",
  },
  {
    year: "2008",
    title: "Quantitative Easing Begins",
    body: "Following the housing market collapse, the Fed launched QE — buying trillions in mortgage-backed securities and Treasuries to inject cash into a failing system. The Fed's balance sheet exploded from $900B to $2.3T. It never fully unwound.",
  },
  {
    year: "2020",
    title: "$6 Trillion Printed",
    body: "In response to COVID-19, the U.S. government injected roughly $6 trillion into the economy — more money created in months than in the previous century combined. The Fed's balance sheet hit $9 trillion. Inflation followed within 18 months.",
  },
];

function TimelineSection() {
  return (
    <section
      id="timeline"
      className="py-20 sm:py-28"
      style={{ background: "oklch(0.09 0.003 280)" }}
      data-ocid="timeline.section"
    >
      <div className="max-w-4xl mx-auto px-6 sm:px-10">
        <FadeSection>
          <p
            className="text-xs uppercase tracking-[0.3em] text-center mb-3"
            style={{ color: "oklch(0.62 0.09 75)" }}
          >
            Chapter 3
          </p>
          <h2 className="font-heading text-5xl sm:text-6xl lg:text-7xl text-center uppercase tracking-wider text-foreground mb-3">
            HISTORICAL TIMELINE
          </h2>
          <p
            className="text-center max-w-xl mx-auto mb-16"
            style={{ color: "oklch(0.65 0.008 280)" }}
          >
            The story of how we got here. Every chapter was a decision made for
            you, without you.
          </p>
        </FadeSection>

        <div className="relative">
          {/* Timeline vertical line */}
          <div
            className="absolute left-[28px] sm:left-1/2 top-0 bottom-0 w-px timeline-line"
            style={{ transform: "translateX(-50%)" }}
          />

          <div className="space-y-10">
            {timelineEvents.map((event, i) => {
              const isRight = i % 2 === 0;
              return (
                <FadeSection key={event.year} delay={i * 0.1}>
                  <div
                    className={`relative flex items-start gap-6 sm:gap-0 ${isRight ? "sm:flex-row" : "sm:flex-row-reverse"}`}
                    data-ocid={`timeline.item.${i + 1}`}
                  >
                    {/* Content */}
                    <div
                      className={`flex-1 sm:w-[45%] ml-14 sm:ml-0 ${isRight ? "sm:pr-12" : "sm:pl-12"}`}
                    >
                      <div
                        className="rounded-xl p-5 sm:p-6"
                        style={{
                          background: "oklch(0.11 0.005 75 / 0.8)",
                          border: "1px solid oklch(0.72 0.13 75 / 0.15)",
                        }}
                      >
                        <p
                          className="font-heading text-3xl sm:text-4xl glow-gold-subtle mb-1"
                          style={{ color: "oklch(0.74 0.14 75)" }}
                        >
                          {event.year}
                        </p>
                        <h3 className="font-heading text-xl sm:text-2xl uppercase tracking-wide text-foreground mb-3">
                          {event.title}
                        </h3>
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: "oklch(0.65 0.007 280)" }}
                        >
                          {event.body}
                        </p>
                      </div>
                    </div>

                    {/* Center dot */}
                    <div
                      className="absolute left-[28px] sm:left-1/2 top-5 w-3.5 h-3.5 rounded-full shrink-0"
                      style={{
                        transform: "translate(-50%, 0)",
                        background: "oklch(0.76 0.155 75)",
                        boxShadow:
                          "0 0 10px oklch(0.72 0.13 75 / 0.8), 0 0 24px oklch(0.62 0.11 75 / 0.4)",
                        zIndex: 10,
                      }}
                    />

                    {/* Spacer for opposite side */}
                    <div className="hidden sm:block flex-1 sm:w-[45%]" />
                  </div>
                </FadeSection>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── ICP Donation Section ─────────────────────────────────────────────────────
function SupportSection() {
  const [copied, setCopied] = useState(false);

  const copyWallet = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(ICP_WALLET);
      setCopied(true);
      toast.success("Wallet address copied.");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Copy failed — try selecting the address manually.");
    }
  }, []);

  return (
    <section
      id="support"
      className="py-20 sm:py-28 page-bg"
      data-ocid="support.section"
    >
      <div className="max-w-3xl mx-auto px-6 sm:px-10">
        <FadeSection>
          <p
            className="text-xs uppercase tracking-[0.3em] text-center mb-3"
            style={{ color: "oklch(0.62 0.09 75)" }}
          >
            Support the Project
          </p>
          <h2 className="font-heading text-5xl sm:text-6xl lg:text-7xl text-center uppercase tracking-wider text-foreground mb-3">
            KEEP THE RECORD ALIVE
          </h2>
          <p
            className="text-center max-w-xl mx-auto mb-12"
            style={{ color: "oklch(0.65 0.008 280)" }}
          >
            No ads. No big tech. No central bank. This app runs on the Internet
            Computer — a decentralized network that no corporation, no
            government, and no central bank controls.
          </p>
        </FadeSection>

        <FadeSection delay={0.15}>
          <div
            className="rounded-2xl p-8 sm:p-10 box-glow-gold"
            style={{ background: "oklch(0.10 0.007 75 / 0.9)" }}
            data-ocid="support.card"
          >
            <div className="flex items-start gap-4 mb-6">
              <div
                className="w-12 h-12 rounded-xl shrink-0 flex items-center justify-center text-2xl"
                style={{
                  background: "oklch(0.72 0.13 75 / 0.15)",
                  border: "1px solid oklch(0.72 0.13 75 / 0.3)",
                }}
              >
                ∞
              </div>
              <div>
                <h3 className="font-heading text-2xl uppercase tracking-wide text-foreground">
                  Why ICP?
                </h3>
                <p
                  className="text-sm mt-1"
                  style={{ color: "oklch(0.62 0.007 280)" }}
                >
                  The Internet Computer is a blockchain network run by
                  independent node providers across the world. Unlike apps on
                  AWS or Google Cloud, no single company can take this down. The
                  record is permanent. That's the point.
                </p>
              </div>
            </div>

            <div
              className="rounded-xl p-4 mb-4"
              style={{
                background: "oklch(0.07 0.004 75 / 0.8)",
                border: "1px solid oklch(0.72 0.13 75 / 0.25)",
              }}
            >
              <p
                className="text-xs uppercase tracking-[0.25em] font-semibold mb-2"
                style={{ color: "oklch(0.52 0.07 75)" }}
              >
                ICP Wallet Address
              </p>
              <p
                className="font-mono text-xs sm:text-sm break-all leading-relaxed"
                style={{ color: "oklch(0.72 0.13 75)" }}
              >
                {ICP_WALLET}
              </p>
            </div>

            <button
              type="button"
              onClick={copyWallet}
              className="w-full flex items-center justify-center gap-2.5 rounded-xl py-3.5 font-semibold uppercase tracking-wider text-sm transition-all active:scale-[0.98]"
              style={{
                background: copied
                  ? "oklch(0.76 0.155 75)"
                  : "oklch(0.13 0.008 75)",
                color: copied ? "oklch(0.08 0.002 280)" : "oklch(0.76 0.14 75)",
                border: "1px solid oklch(0.72 0.13 75 / 0.5)",
                boxShadow: copied
                  ? "0 0 20px oklch(0.72 0.13 75 / 0.5)"
                  : "none",
              }}
              data-ocid="support.copy_wallet_button"
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              {copied ? "Address Copied" : "Copy Wallet Address"}
            </button>

            <p
              className="text-xs text-center mt-4"
              style={{ color: "oklch(0.42 0.005 280)" }}
            >
              Need a wallet?{" "}
              <a
                href="https://plugwallet.ooo"
                target="_blank"
                rel="noopener noreferrer"
                className="underline transition-colors"
                style={{ color: "oklch(0.65 0.10 75)" }}
              >
                Plug Wallet
              </a>{" "}
              or{" "}
              <a
                href="https://nfid.one"
                target="_blank"
                rel="noopener noreferrer"
                className="underline transition-colors"
                style={{ color: "oklch(0.65 0.10 75)" }}
              >
                NFID
              </a>{" "}
              — both work with ICP.
            </p>
          </div>
        </FadeSection>
      </div>
    </section>
  );
}

// ─── Navigation ───────────────────────────────────────────────────────────────
const navLinks = [
  { label: "Debt Clock", href: "#debt-clock" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Inflation", href: "#inflation" },
  { label: "Timeline", href: "#timeline" },
  { label: "Support", href: "#support" },
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "oklch(0.07 0.003 280 / 0.96)"
          : "oklch(0.07 0.003 280 / 0.85)",
        borderBottom: scrolled
          ? "1px solid oklch(0.72 0.13 75 / 0.18)"
          : "1px solid transparent",
        backdropFilter: "blur(16px)",
      }}
    >
      {/* Gold top bar */}
      <div className="gold-topbar" />

      <nav
        className="max-w-6xl mx-auto px-6 sm:px-10 h-14 flex items-center justify-between gap-4"
        data-ocid="nav.bar"
      >
        {/* Brand */}
        <div className="flex items-center gap-2.5 shrink-0">
          <span
            className="text-lg leading-none"
            style={{ color: "oklch(0.72 0.13 75)" }}
          >
            ◈
          </span>
          <span
            className="font-heading text-xl sm:text-2xl uppercase tracking-widest leading-none"
            style={{ color: "oklch(0.90 0.005 280)" }}
          >
            MONEY MASTERS
          </span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => handleNavClick(link.href)}
              className="text-xs uppercase tracking-[0.18em] font-semibold transition-colors"
              style={{ color: "oklch(0.58 0.006 280)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color =
                  "oklch(0.72 0.13 75)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color =
                  "oklch(0.58 0.006 280)";
              }}
              data-ocid={`nav.${link.label.toLowerCase().replace(/ /g, "_")}_link`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Live indicator + mobile menu */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full live-pulse"
              style={{
                background: "oklch(0.72 0.13 75)",
                boxShadow: "0 0 6px oklch(0.72 0.13 75)",
              }}
            />
            <span
              className="text-xs uppercase tracking-widest font-semibold"
              style={{ color: "oklch(0.58 0.09 75)" }}
            >
              LIVE
            </span>
          </div>
          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-1"
            aria-label="Toggle menu"
            data-ocid="nav.mobile_menu_button"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block h-px w-5 transition-all"
                style={{ background: "oklch(0.58 0.006 280)" }}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 pb-4 pt-2 flex flex-col gap-3"
          style={{ borderTop: "1px solid oklch(0.72 0.13 75 / 0.12)" }}
          data-ocid="nav.mobile_menu"
        >
          {navLinks.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => handleNavClick(link.href)}
              className="text-left text-xs uppercase tracking-[0.18em] font-semibold py-2 transition-colors"
              style={{ color: "oklch(0.62 0.007 280)" }}
              data-ocid={`nav.mobile_${link.label.toLowerCase().replace(/ /g, "_")}_link`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      id="debt-clock"
      className="relative hero-bg min-h-screen flex flex-col items-center justify-center pt-24 pb-20 px-6 sm:px-10"
      data-ocid="hero.section"
    >
      <div className="relative z-10 max-w-4xl mx-auto w-full">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center mb-10"
        >
          <h1 className="font-heading text-6xl sm:text-8xl lg:text-[105px] xl:text-[120px] uppercase leading-[0.92] tracking-wide text-foreground">
            UNDERSTAND
          </h1>
          <h1 className="font-heading text-6xl sm:text-8xl lg:text-[105px] xl:text-[120px] uppercase leading-[0.92] tracking-wide">
            <span
              className="glow-gold-subtle"
              style={{ color: "oklch(0.74 0.14 75)" }}
            >
              THE SYSTEM.
            </span>
          </h1>
          <h1 className="font-heading text-6xl sm:text-8xl lg:text-[105px] xl:text-[120px] uppercase leading-[0.92] tracking-wide text-foreground">
            MASTER YOUR
          </h1>
          <h1 className="font-heading text-6xl sm:text-8xl lg:text-[105px] xl:text-[120px] uppercase leading-[0.92] tracking-wide">
            <span
              className="glow-gold-subtle"
              style={{ color: "oklch(0.74 0.14 75)" }}
            >
              FUTURE.
            </span>
          </h1>
        </motion.div>

        {/* Debt Counter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-8"
        >
          <DebtCounter />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex justify-center"
        >
          <button
            type="button"
            onClick={() =>
              document
                .querySelector("#how-it-works")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex items-center gap-2.5 px-8 py-3.5 rounded-full font-semibold uppercase tracking-[0.18em] text-sm transition-all active:scale-[0.97]"
            style={{
              background: "oklch(0.72 0.13 75 / 0.15)",
              border: "1px solid oklch(0.72 0.13 75 / 0.5)",
              color: "oklch(0.78 0.14 75)",
              boxShadow: "0 0 20px oklch(0.72 0.13 75 / 0.15)",
            }}
            data-ocid="hero.cta_button"
          >
            Find Out How It Works
            <ExternalLink className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to bottom, transparent, oklch(0.08 0.002 280))",
        }}
      />
    </section>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const currentYear = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined"
      ? window.location.hostname
      : "moneymastersdebt";

  return (
    <div className="min-h-screen page-bg">
      <Toaster />
      <Nav />

      <main>
        <Hero />
        <div className="section-divider" />
        <FedSection />
        <div className="section-divider" />
        <InflationSection />
        <div className="section-divider" />
        <TimelineSection />
        <div className="section-divider" />
        <YourShareSection />
        <div className="section-divider" />
        <SupportSection />
      </main>

      <footer
        className="py-10 px-6"
        style={{
          background: "oklch(0.07 0.003 280)",
          borderTop: "1px solid oklch(0.72 0.13 75 / 0.15)",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 mb-8">
            <div className="sm:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="text-base"
                  style={{ color: "oklch(0.62 0.09 75)" }}
                >
                  ◈
                </span>
                <span
                  className="font-heading text-lg uppercase tracking-widest"
                  style={{ color: "oklch(0.80 0.005 280)" }}
                >
                  MONEY MASTERS
                </span>
              </div>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "oklch(0.42 0.005 280)" }}
              >
                An educational documentary-style resource designed to help young
                people understand monetary policy, inflation, and the history of
                the U.S. financial system.
              </p>
            </div>
            <div>
              <p
                className="text-xs uppercase tracking-[0.2em] font-semibold mb-3"
                style={{ color: "oklch(0.52 0.07 75)" }}
              >
                Explore
              </p>
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  type="button"
                  onClick={() =>
                    document
                      .querySelector(link.href)
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="block text-xs mb-2 transition-colors text-left"
                  style={{ color: "oklch(0.42 0.005 280)" }}
                  data-ocid={`footer.${link.label.toLowerCase().replace(/ /g, "_")}_link`}
                >
                  {link.label}
                </button>
              ))}
            </div>
            <div>
              <p
                className="text-xs uppercase tracking-[0.2em] font-semibold mb-3"
                style={{ color: "oklch(0.52 0.07 75)" }}
              >
                Platform
              </p>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "oklch(0.42 0.005 280)" }}
              >
                Built on the Internet Computer. Permanent. Decentralized. No
                central authority controls this record.
              </p>
            </div>
          </div>

          <div className="section-divider mb-6" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs" style={{ color: "oklch(0.35 0.004 280)" }}>
              Real-time estimate. Source: U.S. Treasury / CBO. Not financial
              advice.
            </p>
            <p className="text-xs" style={{ color: "oklch(0.35 0.004 280)" }}>
              © {currentYear}.{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors"
                style={{ color: "oklch(0.48 0.07 75)" }}
              >
                Built with ♥ using caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
export type Page = string;
