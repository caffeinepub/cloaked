import { Button } from "@/components/ui/button";
import {
  BarChart3,
  CheckCircle2,
  ChevronRight,
  EyeOff,
  Github,
  Globe,
  Lock,
  Search,
  Shield,
  ShieldCheck,
  Trash2,
  Twitter,
} from "lucide-react";
import { motion } from "motion/react";
import type { Page } from "../App";

interface LandingPageProps {
  onNavigate: (page: Page) => void;
}

const features = [
  {
    icon: Search,
    title: "Find Out What's Out There",
    description:
      "Hundreds of websites you've never heard of are selling your name, address, and phone number right now. We show you exactly where.",
  },
  {
    icon: Trash2,
    title: "We Walk You Through It",
    description:
      "No technical skills needed. Just follow the plain-English steps to get your info removed, one site at a time.",
  },
  {
    icon: BarChart3,
    title: "Watch Your Cloak Score Rise",
    description:
      "See your privacy score climb in real time as you complete removals. Every step makes you harder to find.",
  },
  {
    icon: Lock,
    title: "No Big Tech. No Exceptions.",
    description:
      "Built on the Internet Computer. Your data never touches Google, Meta, or Amazon servers. This is yours.",
  },
];

const steps = [
  {
    num: "01",
    title: "See Where You're Exposed",
    description:
      "We map where your personal information lives — data brokers, people-search sites, old social accounts. Most people are shocked by what they find.",
  },
  {
    num: "02",
    title: "Remove It, One Step at a Time",
    description:
      "Follow clear, jargon-free guides to opt out and delete your info. No legal knowledge required. If you can fill out a form, you can do this.",
  },
  {
    num: "03",
    title: "Stay Protected Going Forward",
    description:
      "Your Cloak Score tracks your progress. Know where you stand, and get alerts when new exposure shows up.",
  },
];

const navLinks = ["Features", "How It Works", "Dashboard", "About"];

export default function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-forest/15 border border-forest/30 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-forest" />
            </div>
            <span className="font-fraunces font-bold text-lg text-foreground tracking-tight">
              Cloaked
            </span>
          </div>
          <nav
            className="hidden md:flex items-center gap-8"
            data-ocid="nav.section"
          >
            {navLinks.map((link) => (
              <button
                type="button"
                key={link}
                onClick={() => link === "Dashboard" && onNavigate("dashboard")}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors font-figtree"
                data-ocid={`nav.${link.toLowerCase().replace(" ", "_")}.link`}
              >
                {link}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => onNavigate("dashboard")}
              className="bg-forest text-forest-on font-semibold rounded-full px-5 hover:bg-forest-bright transition-all glow-forest-sm font-figtree text-sm"
              data-ocid="nav.start_free.primary_button"
            >
              Put on your Cloak
            </Button>
          </div>
        </div>
      </header>

      {/* Hero — full cinematic background */}
      <section className="relative min-h-[88vh] flex items-end overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('/assets/generated/cloaked-hero.dim_1200x600.jpg')",
          }}
          role="img"
          aria-label="Hooded figure in an earthy cloak walking through a rain-soaked cyberpunk city"
        />
        {/* Overlay — warm at bottom, transparent at top */}
        <div className="absolute inset-0 hero-overlay" />
        {/* Subtle cyan neon edge — evokes the outside world */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 85% 20%, oklch(0.76 0.17 210 / 0.06) 0%, transparent 70%)",
          }}
        />

        {/* Hero content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-20 pt-40">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <motion.span
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 text-amber-brand text-xs font-figtree font-semibold tracking-widest uppercase mb-5"
            >
              <span className="w-8 h-px bg-amber-brand inline-block" />
              Your protection. Your rules.
            </motion.span>

            <h1 className="font-fraunces font-black text-[clamp(3.5rem,9vw,7rem)] leading-[0.92] tracking-tight text-foreground mb-6">
              Cloaked.
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-xl text-muted-foreground font-figtree mb-3 leading-relaxed"
              style={{ color: "oklch(0.80 0.04 70)" }}
            >
              The storm is digital.{" "}
              <span className="text-foreground font-medium">
                The cloak is real.
              </span>
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="text-base text-muted-foreground font-figtree leading-relaxed mb-10 max-w-xl"
            >
              You don't have anything to hide. You just don't want strangers
              knowing where you live, what you look like, or how to find you.
              The internet got sketchy. Cloaked helps you walk through it
              without getting soaked.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <Button
                onClick={() => onNavigate("dashboard")}
                className="bg-forest text-forest-on font-bold rounded-full px-9 py-6 text-base hover:bg-forest-bright glow-forest transition-all font-fraunces tracking-wide"
                data-ocid="hero.cta.primary_button"
              >
                Put on your Cloak
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
              <span className="text-sm text-muted-foreground font-figtree">
                Free to start. No card needed.
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex flex-wrap items-center gap-5 mt-8"
            >
              {[
                "No big tech involved",
                "100+ data sources tracked",
                "Blockchain-secured",
              ].map((stat) => (
                <div key={stat} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-forest flex-shrink-0" />
                  <span className="text-xs text-muted-foreground font-figtree">
                    {stat}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features strip */}
      <section className="section-warm border-y border-border py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="space-y-3"
              >
                <div className="w-10 h-10 rounded-lg bg-forest/12 border border-forest/20 flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-forest" />
                </div>
                <h3 className="font-fraunces font-semibold text-foreground text-sm leading-snug">
                  {feature.title}
                </h3>
                <p className="text-xs text-muted-foreground font-figtree leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The storm outside / cloak inside — two-tone section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: dashboard preview */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-card border border-border rounded-2xl p-6 shadow-card relative overflow-hidden"
          >
            {/* Subtle neon edge — the outside world leaking in */}
            <div
              className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at top right, oklch(0.76 0.17 210 / 0.07) 0%, transparent 70%)",
              }}
            />
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-fraunces font-semibold text-foreground">
                Your Cloak Score
              </h3>
              <span className="text-xs font-figtree text-forest bg-forest/10 border border-forest/20 px-2.5 py-1 rounded-full">
                Protected
              </span>
            </div>

            {/* Score ring mock */}
            <div className="flex items-center gap-8 mb-6">
              <div className="relative w-28 h-28 flex-shrink-0">
                <svg
                  role="img"
                  aria-label="Privacy score preview"
                  width="112"
                  height="112"
                  viewBox="0 0 112 112"
                  style={{ transform: "rotate(-90deg)" }}
                >
                  <circle
                    cx="56"
                    cy="56"
                    r="44"
                    fill="none"
                    stroke="oklch(0.24 0.03 58)"
                    strokeWidth="8"
                  />
                  <motion.circle
                    cx="56"
                    cy="56"
                    r="44"
                    fill="none"
                    stroke="oklch(0.46 0.14 145)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={276.46}
                    initial={{ strokeDashoffset: 276.46 }}
                    whileInView={{ strokeDashoffset: 276.46 * 0.27 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, delay: 0.3, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-fraunces font-black text-2xl text-forest">
                    73
                  </span>
                  <span className="text-[10px] text-muted-foreground font-figtree">
                    / 100
                  </span>
                </div>
              </div>
              <div className="space-y-2.5 flex-1">
                {[
                  { label: "Data Brokers", pct: 65 },
                  { label: "Social Platforms", pct: 80 },
                  { label: "Search Engines", pct: 50 },
                ].map((bar) => (
                  <div key={bar.label}>
                    <div className="flex justify-between mb-1">
                      <span className="text-[11px] font-figtree text-muted-foreground">
                        {bar.label}
                      </span>
                      <span
                        className="text-[11px] font-figtree"
                        style={{
                          color:
                            bar.pct >= 70
                              ? "oklch(0.46 0.14 145)"
                              : bar.pct >= 40
                                ? "oklch(0.62 0.14 62)"
                                : "oklch(0.76 0.17 210)",
                        }}
                      >
                        {bar.pct}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          backgroundColor:
                            bar.pct >= 70
                              ? "oklch(0.46 0.14 145)"
                              : bar.pct >= 40
                                ? "oklch(0.62 0.14 62)"
                                : "oklch(0.76 0.17 210)",
                        }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${bar.pct}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1,
                          delay: 0.5,
                          ease: "easeOut",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-border pt-4 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-forest animate-pulse" />
              <p className="text-xs text-muted-foreground font-figtree">
                Monitoring active · last checked just now
              </p>
            </div>

            {/* Floating badges */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.0, duration: 0.5 }}
              className="absolute -top-3 -right-3 bg-forest text-forest-on px-3 py-1.5 rounded-full text-xs font-bold font-fraunces shadow-forest-sm"
            >
              ✓ Spokeo removed
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.3, duration: 0.5 }}
              className="absolute -bottom-3 -left-3 bg-card border border-border px-3 py-1.5 rounded-full text-xs font-figtree text-foreground shadow-card"
            >
              🔒 WhitePages pending
            </motion.div>
          </motion.div>

          {/* Right: copy */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div>
              <span
                className="text-xs font-figtree tracking-widest uppercase font-semibold"
                style={{ color: "oklch(0.62 0.14 62)" }}
              >
                The world outside is a storm
              </span>
              <h2 className="font-fraunces font-black text-4xl lg:text-5xl mt-3 text-foreground leading-tight">
                You're still walking
                <br />
                <span style={{ color: "oklch(0.46 0.14 145)" }}>
                  through it.
                </span>
              </h2>
            </div>
            <p className="text-muted-foreground font-figtree leading-relaxed text-base">
              You still use Google. You still shop online. You haven't gone
              off-grid — and you shouldn't have to. Cloaked doesn't ask you to
              stop using the internet. It just puts a cloak around you while you
              do.
            </p>
            <div className="space-y-4">
              {[
                {
                  icon: EyeOff,
                  title: "Zero Tracking",
                  desc: "Cloaked never tracks your behavior, sells your data, or shows you ads.",
                },
                {
                  icon: Shield,
                  title: "On-Chain Storage",
                  desc: "Your progress is stored on the Internet Computer blockchain — not on our servers.",
                },
                {
                  icon: Lock,
                  title: "Sovereign Login",
                  desc: "No email. No password. Log in with Internet Identity — nothing to breach.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="w-9 h-9 rounded-lg bg-forest/10 border border-forest/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <item.icon className="w-4 h-4 text-forest" />
                  </div>
                  <div>
                    <h4 className="font-fraunces font-semibold text-foreground text-sm">
                      {item.title}
                    </h4>
                    <p className="text-xs text-muted-foreground font-figtree leading-relaxed mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-warm border-y border-border py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="font-fraunces font-black text-3xl lg:text-4xl text-foreground">
              How Cloaked works
            </h2>
            <p className="text-muted-foreground font-figtree mt-3 max-w-lg mx-auto">
              Three steps to walking through the internet without leaving a
              trail.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="bg-card border border-border rounded-2xl p-8 relative overflow-hidden group hover:border-forest/40 transition-colors shadow-card"
              >
                <span
                  className="font-fraunces font-black text-6xl absolute top-4 right-6 leading-none group-hover:opacity-30 transition-opacity"
                  style={{ color: "oklch(0.46 0.14 145 / 0.12)" }}
                >
                  {step.num}
                </span>
                <span
                  className="font-fraunces font-black text-4xl leading-none block mb-4"
                  style={{ color: "oklch(0.46 0.14 145)" }}
                >
                  {step.num}
                </span>
                <h3 className="font-fraunces font-semibold text-xl text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground font-figtree leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button
              onClick={() => onNavigate("dashboard")}
              className="bg-forest text-forest-on font-bold rounded-full px-10 py-6 text-base hover:bg-forest-bright glow-forest transition-all font-fraunces tracking-wide"
              data-ocid="how_it_works.start.primary_button"
            >
              Start Your Cloak
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-warm border-y border-border py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-forest/12 border border-forest/25 flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="w-8 h-8 text-forest" />
            </div>
            <h2 className="font-fraunces font-black text-4xl lg:text-5xl text-foreground mb-5">
              The internet's a storm.
              <br />
              <span style={{ color: "oklch(0.46 0.14 145)" }}>Stay dry.</span>
            </h2>
            <p className="text-muted-foreground font-figtree text-base mb-10 max-w-xl mx-auto leading-relaxed">
              Cloaked is free to start. No credit card. No email. No account
              with a company that will sell your information — because that
              would kind of defeat the point.
            </p>
            <Button
              onClick={() => onNavigate("dashboard")}
              className="bg-forest text-forest-on font-bold rounded-full px-12 py-7 text-lg hover:bg-forest-bright glow-forest transition-all font-fraunces tracking-wide"
              data-ocid="final_cta.start.primary_button"
            >
              Put on your Cloak — it's free
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-6 h-6 rounded-md bg-forest/15 border border-forest/30 flex items-center justify-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-forest" />
                </div>
                <span className="font-fraunces font-bold text-foreground">
                  Cloaked
                </span>
              </div>
              <p className="text-sm text-muted-foreground font-figtree leading-relaxed">
                Your digital identity belongs to you. Keep it that way.
              </p>
              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-forest/15 transition-colors"
                >
                  <Twitter className="w-4 h-4 text-muted-foreground" />
                </button>
                <button
                  type="button"
                  className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-forest/15 transition-colors"
                >
                  <Github className="w-4 h-4 text-muted-foreground" />
                </button>
                <button
                  type="button"
                  className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-forest/15 transition-colors"
                >
                  <Globe className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>
            {[
              {
                label: "Company",
                links: ["About", "Blog", "Press", "Contact"],
              },
              {
                label: "Product",
                links: ["Features", "Dashboard", "How It Works", "Changelog"],
              },
              {
                label: "Legal",
                links: ["Privacy Policy", "Terms of Service", "Help Center"],
              },
            ].map((col) => (
              <div key={col.label}>
                <h4 className="font-fraunces font-semibold text-foreground text-sm mb-4">
                  {col.label}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      {link === "Privacy Policy" ? (
                        <button
                          type="button"
                          onClick={() => onNavigate("privacy")}
                          className="text-sm text-muted-foreground font-figtree hover:text-foreground transition-colors text-left"
                          data-ocid="footer.privacy_policy.link"
                        >
                          {link}
                        </button>
                      ) : link === "Terms of Service" ? (
                        <button
                          type="button"
                          onClick={() => onNavigate("terms")}
                          className="text-sm text-muted-foreground font-figtree hover:text-foreground transition-colors text-left"
                          data-ocid="footer.terms.link"
                        >
                          {link}
                        </button>
                      ) : (
                        <span className="text-sm text-muted-foreground font-figtree cursor-default hover:text-foreground transition-colors">
                          {link}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-xs text-muted-foreground font-figtree">
              © {new Date().getFullYear()} Cloaked. Built with ♥ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-forest hover:underline"
              >
                caffeine.ai
              </a>
            </p>
            <div className="flex gap-6">
              <button
                type="button"
                onClick={() => onNavigate("privacy")}
                className="text-xs text-muted-foreground font-figtree hover:text-foreground transition-colors"
                data-ocid="footer.privacy_policy.link"
              >
                Privacy Policy
              </button>
              <button
                type="button"
                onClick={() => onNavigate("terms")}
                className="text-xs text-muted-foreground font-figtree hover:text-foreground transition-colors"
                data-ocid="footer.terms.link"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
