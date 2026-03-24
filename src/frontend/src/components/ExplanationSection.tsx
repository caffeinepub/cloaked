import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const ICP_ADDRESS =
  "416c602ad9431e5c54158097c181a8268c72de7704f8276d6d13e7e4f4207150";

export function ExplanationSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(ICP_ADDRESS);
      setCopied(true);
      toast.success("ICP address copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy address");
    }
  };

  return (
    <section
      className="py-14 px-4 sm:px-6 lg:px-8"
      style={{ background: "oklch(0.21 0.012 243)" }}
    >
      <div className="max-w-3xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2
            className="font-display text-xl sm:text-2xl font-bold uppercase tracking-wider mb-4"
            style={{ color: "oklch(0.87 0.10 83)" }}
          >
            How This Is Calculated
          </h2>
          <div
            className="space-y-4 text-sm sm:text-base leading-relaxed"
            style={{ color: "oklch(0.72 0.012 243)" }}
          >
            <p>
              The baseline figure is sourced from the{" "}
              <a
                href="https://fiscaldata.treasury.gov/datasets/debt-to-the-penny/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
                style={{ color: "oklch(0.76 0.10 75)" }}
              >
                U.S. Treasury Department's Debt to the Penny
              </a>{" "}
              dataset and the{" "}
              <a
                href="https://www.cbo.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
                style={{ color: "oklch(0.76 0.10 75)" }}
              >
                Congressional Budget Office (CBO)
              </a>
              . The debt grows at a rate derived from annualized deficit
              projections — roughly $1.8–2.0 trillion per year as of 2024–2025,
              equating to approximately $1,000–1,200 per second.
            </p>
            <p>The counter calculates current debt in real time using:</p>
            <div
              className="rounded-lg p-4 font-mono text-sm"
              style={{
                background: "oklch(0.17 0.015 243)",
                color: "oklch(0.87 0.10 83)",
                border: "1px solid oklch(0.32 0.030 243)",
              }}
            >
              <div>currentDebt =</div>
              <div className="pl-4">baselineDebt</div>
              <div className="pl-4">
                + (ratePerSecond &times; secondsElapsed)
              </div>
            </div>
            <p>
              Population figures are from the U.S. Census Bureau. The "debt per
              taxpayer" figure uses the count of Americans who filed federal
              income tax returns (~150 million). The Debt-to-GDP ratio compares
              total federal debt to estimated annual U.S. Gross Domestic
              Product.
            </p>
          </div>
        </motion.div>

        {/* ICP Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="rounded-lg p-5 space-y-4"
          style={{
            background: "oklch(0.24 0.040 243)",
            border: "1px solid oklch(0.35 0.030 243)",
          }}
        >
          <h3
            className="font-display font-bold uppercase tracking-wider text-sm mb-2"
            style={{ color: "oklch(0.76 0.10 75)" }}
          >
            Why the Internet Computer?
          </h3>
          <div
            className="text-sm leading-relaxed space-y-3"
            style={{ color: "oklch(0.65 0.012 243)" }}
          >
            <p>
              Most websites you visit — news sites, apps, social media — run on
              servers owned by Amazon (AWS), Google, or Microsoft. That means
              those companies can slow down, modify, or remove any website
              hosted on their infrastructure. They have done it before.
            </p>
            <p>
              The{" "}
              <a
                href="https://internetcomputer.org"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
                style={{ color: "oklch(0.76 0.10 75)" }}
              >
                Internet Computer Protocol (ICP)
              </a>{" "}
              takes a different approach. Instead of renting space on a
              corporation's server, apps run on a decentralized network of
              independent data centers spread across the world. No single
              company owns the infrastructure. No single entity can pull the
              plug.
            </p>
            <p>
              That makes ICP-hosted apps more resilient and censorship-resistant
              than anything running on AWS or Google Cloud. For a counter
              tracking a number the government would rather people ignore, that
              independence matters.
            </p>
            <div
              className="rounded-md p-3 text-xs space-y-1"
              style={{
                background: "oklch(0.19 0.025 243)",
                border: "1px solid oklch(0.30 0.025 243)",
                color: "oklch(0.58 0.012 243)",
              }}
            >
              <p
                className="font-semibold"
                style={{ color: "oklch(0.72 0.012 243)" }}
              >
                In plain terms:
              </p>
              <p>
                Traditional web: Your browser &rarr; Amazon/Google server &rarr;
                Website
              </p>
              <p>
                Internet Computer: Your browser &rarr; Decentralized network
                &rarr; Website
              </p>
            </div>
          </div>
        </motion.div>

        {/* Donation Section */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="rounded-lg p-5"
          style={{
            background: "oklch(0.22 0.035 243)",
            border: "1px solid oklch(0.38 0.08 83 / 0.4)",
          }}
          id="support"
        >
          <h3
            className="font-display font-bold uppercase tracking-wider text-sm mb-1"
            style={{ color: "oklch(0.87 0.10 83)" }}
          >
            Support This Project
          </h3>
          <p
            className="text-sm leading-relaxed mb-4"
            style={{ color: "oklch(0.62 0.012 243)" }}
          >
            This app is free, ad-free, and independent. If you find it useful,
            you can send a donation directly in ICP — no middleman, no fees, no
            account required. Donations go directly to the creator's wallet on
            the Internet Computer.
          </p>
          <div
            className="rounded-md p-3 flex flex-col sm:flex-row items-start sm:items-center gap-3"
            style={{
              background: "oklch(0.17 0.015 243)",
              border: "1px solid oklch(0.32 0.030 243)",
            }}
          >
            <code
              className="font-mono text-xs break-all flex-1"
              style={{ color: "oklch(0.80 0.10 83)" }}
            >
              {ICP_ADDRESS}
            </code>
            <button
              type="button"
              onClick={handleCopy}
              className="shrink-0 px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider transition-all"
              style={{
                background: copied
                  ? "oklch(0.45 0.14 140)"
                  : "oklch(0.47 0.145 20)",
                color: "oklch(0.97 0.005 243)",
                border: `1px solid ${
                  copied ? "oklch(0.55 0.16 140)" : "oklch(0.55 0.15 20)"
                }`,
              }}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <p
            className="text-xs mt-2"
            style={{ color: "oklch(0.45 0.012 243)" }}
          >
            Need an ICP wallet?{" "}
            <a
              href="https://plugwallet.ooo"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              style={{ color: "oklch(0.58 0.012 243)" }}
            >
              Plug Wallet
            </a>{" "}
            is a good starting point.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
