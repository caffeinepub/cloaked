import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Check,
  Copy,
  Database,
  Globe,
  Heart,
  Turtle,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const ICP_ADDRESS =
  "416c602ad9431e5c54158097c181a8268c72de7704f8276d6d13e7e4f4207150";

export function About() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(ICP_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-xl font-bold text-[oklch(var(--primary))] uppercase tracking-wide">
          About Burrow Watch
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Community field documentation for Space Coast &amp; Melbourne gopher
          tortoise conservation
        </p>
      </motion.div>

      {/* Mission */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <Card className="shadow-card border-border bg-[oklch(var(--primary))] text-[oklch(var(--primary-foreground))]">
          <CardContent className="pt-6 pb-6">
            <div className="flex gap-4">
              <Turtle className="w-10 h-10 shrink-0 opacity-80" />
              <div>
                <h3 className="text-lg font-bold mb-2">Our Mission</h3>
                <p className="text-sm opacity-90 leading-relaxed">
                  Burrow Watch exists to document, track, and advocate for{" "}
                  <em>Gopherus polyphemus</em> — the gopher tortoise — across
                  the Space Coast of Florida. As the region faces unprecedented
                  industrial and residential development pressure from
                  aerospace, defense, and private sectors, systematic community
                  documentation of burrow locations has never been more
                  critical.
                </p>
                <p className="text-sm opacity-90 leading-relaxed mt-3">
                  Our goal is to create an accurate, accessible public registry
                  of known burrow sites — particularly on or adjacent to lands
                  controlled by NASA, SpaceX, Patrick Space Force Base, and
                  private developers — so that conservation advocates,
                  researchers, and regulatory agencies have the data they need
                  to protect these animals before ground-disturbing activities
                  begin. The registry now covers the Melbourne aerospace
                  corridor, including land adjacent to Harris/L3T, Northrop
                  Grumman, Collins Aerospace, and Melbourne Orlando
                  International Airport — areas with vast undeveloped scrub
                  under development pressure from billion-dollar defense
                  corporations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            icon: <Users className="w-6 h-6" />,
            title: "Community-Driven",
            body: "Any field researcher, conservation volunteer, or concerned citizen can contribute observations. Collective documentation creates a more complete and resilient dataset than any single organization can produce alone.",
            color: "text-[oklch(0.44_0.070_155)]",
            bg: "bg-[oklch(0.90_0.040_155)]",
          },
          {
            icon: <Database className="w-6 h-6" />,
            title: "Open Data",
            body: "Burrow Watch is built on an open data philosophy. Burrow location data should be freely accessible to researchers, journalists, FWC personnel, and legal advocates. Transparency is a conservation tool.",
            color: "text-[oklch(0.40_0.10_65)]",
            bg: "bg-[oklch(0.93_0.06_65)]",
          },
          {
            icon: <Globe className="w-6 h-6" />,
            title: "Decentralized",
            body: "Built on the Internet Computer, Burrow Watch is owned by no corporation and beholden to no developer or government agency. Our data cannot be taken down, altered by interested parties, or placed behind a paywall.",
            color: "text-[oklch(0.30_0.055_155)]",
            bg: "bg-[oklch(0.90_0.030_155)]",
          },
        ].map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
          >
            <Card className="shadow-card border-border h-full">
              <CardHeader className="pb-2">
                <div
                  className={`p-2 rounded-lg ${item.bg} ${item.color} w-fit`}
                >
                  {item.icon}
                </div>
                <CardTitle className={`text-sm font-bold mt-2 ${item.color}`}>
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.body}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Support / Donation */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.32 }}
      >
        <Card className="shadow-card border-[oklch(0.82_0.08_65)] bg-[oklch(0.97_0.03_65)]">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-[oklch(0.93_0.06_65)] text-[oklch(0.40_0.10_65)]">
                <Heart className="w-6 h-6" />
              </div>
              <CardTitle className="text-base font-bold text-[oklch(0.40_0.10_65)]">
                Support Burrow Watch
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-[oklch(0.30_0.06_65)] leading-relaxed">
              Burrow Watch runs on the Internet Computer (ICP) — a decentralized
              network with no corporate ownership. If this project has helped
              you or you want to support the conservation mission, donations in
              ICP are welcome and appreciated.
            </p>

            <div className="rounded-md bg-[oklch(0.91_0.05_65)] border border-[oklch(0.80_0.07_65)] p-3">
              <p className="text-xs font-semibold text-[oklch(0.40_0.10_65)] mb-1.5 uppercase tracking-wide">
                ICP Wallet Address
              </p>
              <div className="flex items-center gap-2">
                <code className="text-xs text-[oklch(0.28_0.06_65)] break-all flex-1 leading-relaxed">
                  {ICP_ADDRESS}
                </code>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  className="shrink-0 border-[oklch(0.75_0.08_65)] text-[oklch(0.40_0.10_65)] hover:bg-[oklch(0.88_0.06_65)] gap-1.5"
                  data-ocid="about.copy_button"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy
                    </>
                  )}
                </Button>
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              ICP is the Internet Computer's native currency. You can send ICP
              using{" "}
              <a
                href="https://plugwallet.ooo"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[oklch(0.40_0.10_65)]"
              >
                Plug Wallet (plugwallet.ooo)
              </a>{" "}
              or any ICP-compatible wallet.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Contact / Credits */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.38 }}
      >
        <Card className="shadow-card border-border">
          <CardContent className="pt-5 pb-5">
            <h4 className="text-sm font-semibold text-[oklch(var(--primary))] mb-2">
              Version &amp; Credits
            </h4>
            <p className="text-sm text-muted-foreground">
              Burrow Watch v1.1 · Space Coast &amp; Melbourne, FL · Brevard
              County
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Field data contributes to FWC gopher tortoise monitoring efforts.
              Sighting reports may be cross-referenced with FWC Wildlife Alert
              data.
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              For questions or to report an issue with the registry, contact the
              FWC Wildlife Alert Hotline: <strong>1-888-404-3922</strong>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
