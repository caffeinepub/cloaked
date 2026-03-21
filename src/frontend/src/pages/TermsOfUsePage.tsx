import { ArrowLeft, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import type { Page } from "../App";

interface TermsOfUsePageProps {
  onNavigate: (page: Page) => void;
}

const sections = [
  {
    title: "What Cloaked is (and isn't)",
    content: [
      "Cloaked is a privacy guidance tool. It gives you information, step-by-step instructions, and a way to track your progress as you remove your personal information from data brokers and other online sources.",
      "Cloaked is not a law firm. It doesn't provide legal advice. The guides we provide are based on publicly available opt-out processes, and using them doesn't create any kind of legal relationship between you and us. If you need legal advice about your privacy rights, please consult an actual lawyer.",
    ],
  },
  {
    title: "We can't guarantee results",
    content: [
      "We wish we could promise that following our guides will result in your information being scrubbed from every corner of the internet. We can't. The web is vast, decentralized, and not always cooperative.",
      "What we can promise is that the guides we provide are accurate to the best of our knowledge, that we keep them updated as sites change, and that we genuinely want them to work for you. But the final outcome depends on third-party sites that we don't control.",
      "Use your own judgment. If something doesn't seem right, don't proceed.",
    ],
  },
  {
    title: "Use it responsibly",
    content: [
      "Cloaked is built to help people protect their own personal information. A few things you agree not to do when using the app:",
      "Don't use Cloaked to attempt to remove or alter someone else's information without their knowledge and consent. That's not what this is for.",
      "Don't use Cloaked for anything illegal. This includes using the information or guidance here to harass, stalk, or harm others.",
      "Don't try to break the app, exploit its code, or access parts of the system you're not supposed to access.",
      "Basically: act in good faith. This app exists to help ordinary people protect themselves — not to enable bad actors.",
    ],
  },
  {
    title: "The app is provided as-is",
    content: [
      "Cloaked is provided free of charge, without warranties of any kind. We've put real care into building it and keeping it accurate, but we can't guarantee it will be error-free, always available, or perfect for every situation.",
      "We're not liable for any outcome that results from following the guidance in this app. You're an adult making your own choices — we're just here to help inform them.",
    ],
  },
  {
    title: "We reserve the right to update things",
    content: [
      "The app will evolve. We'll add new features, update guides as data broker opt-out processes change, and occasionally improve how things work. We reserve the right to make those changes without notice.",
      "These Terms of Use may also be updated from time to time. If we make a significant change, we'll update the date at the bottom. By continuing to use Cloaked after an update, you're agreeing to the revised terms.",
    ],
  },
  {
    title: "By using Cloaked, you agree to these terms",
    content: [
      "That's the whole thing. No buried clauses. No gotchas. If you use Cloaked, you're agreeing to these terms. If you don't agree, please don't use the app — though honestly, we hope you'll find them fair.",
    ],
  },
];

export default function TermsOfUsePage({ onNavigate }: TermsOfUsePageProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            type="button"
            onClick={() => onNavigate("landing")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-figtree"
            data-ocid="terms.back.link"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-forest/15 border border-forest/30 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-forest" />
            </div>
            <span className="font-fraunces font-bold text-lg text-foreground tracking-tight">
              Cloaked
            </span>
          </div>
          <div className="w-16" />
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Page header */}
          <div className="mb-12">
            <div
              className="inline-flex items-center gap-2 border text-xs font-figtree font-semibold px-3 py-1.5 rounded-full mb-5"
              style={{
                backgroundColor: "oklch(0.62 0.14 62 / 0.1)",
                borderColor: "oklch(0.62 0.14 62 / 0.25)",
                color: "oklch(0.62 0.14 62)",
              }}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Fair Terms
            </div>
            <h1 className="font-fraunces font-black text-4xl lg:text-5xl text-foreground mb-4 leading-tight">
              Terms of Use
            </h1>
            <p className="text-muted-foreground font-figtree text-base leading-relaxed">
              Short, honest, and written for actual humans. If you've ever
              scrolled past a 40-page terms agreement — this is the opposite of
              that.
            </p>
            <p className="text-xs text-muted-foreground font-figtree mt-4">
              Last updated: March 2026
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-10">
            {sections.map((section, i) => (
              <motion.section
                key={section.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.5 }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <span
                    className="font-fraunces font-black text-sm mt-0.5 flex-shrink-0"
                    style={{ color: "oklch(0.62 0.14 62 / 0.5)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-fraunces font-semibold text-xl text-foreground">
                    {section.title}
                  </h2>
                </div>
                <div className="pl-7 space-y-3">
                  {section.content.map((para) => (
                    <p
                      key={para.slice(0, 40)}
                      className="text-muted-foreground font-figtree text-base leading-relaxed"
                    >
                      {para}
                    </p>
                  ))}
                </div>
                {i < sections.length - 1 && (
                  <div className="mt-10 border-t border-border/50" />
                )}
              </motion.section>
            ))}
          </div>

          {/* Footer callout */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-14 bg-card border border-border rounded-2xl p-6"
          >
            <p className="font-figtree text-sm text-muted-foreground leading-relaxed">
              <span className="text-foreground font-semibold">
                The short version:
              </span>{" "}
              Use Cloaked for what it's designed for — protecting your own
              privacy. Act in good faith. We'll do the same. That's the deal.
            </p>
          </motion.div>

          {/* Back button */}
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => onNavigate("landing")}
              className="inline-flex items-center gap-2 text-sm text-forest hover:text-forest-bright transition-colors font-figtree"
              data-ocid="terms.back_bottom.link"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Cloaked
            </button>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="max-w-2xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-3">
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
              data-ocid="terms.privacy.link"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => onNavigate("terms")}
              className="text-xs text-forest font-figtree font-semibold"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
