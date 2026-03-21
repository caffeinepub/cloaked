import { ArrowLeft, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import type { Page } from "../App";

interface PrivacyPolicyPageProps {
  onNavigate: (page: Page) => void;
}

const sections = [
  {
    title: "What Cloaked actually is",
    content: [
      "Cloaked is a privacy guidance tool. It helps you find where your personal information is being shared online and walks you through the steps to get it removed. Think of it as a map and a guide — we show you the terrain, and you do the walking.",
      "The app is built and hosted on the Internet Computer blockchain — a decentralized network that isn't owned or controlled by any single company. That means your data isn't sitting on Amazon Web Services or Google Cloud. There's no central server for anyone to hack, subpoena, or sell from.",
    ],
  },
  {
    title: "What we collect: nothing",
    content: [
      "We don't collect your name. We don't collect your email address. We don't collect your location, your IP address, or your browsing behavior. We don't ask you to create a traditional account with any personal information.",
      "Your progress — which data brokers you've opted out of, which tasks you've completed — is stored locally in your browser. It never leaves your device. There's no account, no username, no password, and no way for us to see it.",
    ],
  },
  {
    title: "Cookies, analytics, and tracking",
    content: [
      "Zero. None. We don't use cookies. We don't run Google Analytics, Mixpanel, Hotjar, or any other tracking tool. We don't serve ads. We don't have a pixel on the page reporting back to Facebook.",
      "If that sounds too good to be true for a free app — that's because we built it on a decentralized platform specifically so we could make this promise honestly.",
    ],
  },
  {
    title: "We don't sell your data. Ever.",
    content: [
      "We don't sell user data. We don't share it with third parties. We don't monetize it in any form. A privacy app that monetizes user data would be embarrassing — we'd rather charge for features someday than compromise this.",
    ],
  },
  {
    title: "What we can't guarantee",
    content: [
      "Cloaked provides guidance and instructions. We can tell you how to request removal from Spokeo, WhitePages, Intelius, and dozens of other sites — but we can't force those sites to comply. The internet is decentralized and messy. Some sites are slow. Some require follow-up. A small number may refuse or ignore removal requests.",
      "We do our best to keep our guides accurate and up to date as sites change their opt-out processes. But we can't guarantee that following every step will result in complete removal from every third-party site on the internet. We're a guide, not a guarantee.",
    ],
  },
  {
    title: "Third-party links",
    content: [
      "Cloaked links to external websites — data broker opt-out pages, social platform settings pages, and similar resources. Once you click through to those sites, you're subject to their own privacy policies. We don't control what they do with your data, and we're not responsible for their practices.",
    ],
  },
  {
    title: "Changes to this policy",
    content: [
      "If we ever make a meaningful change to this privacy policy, we'll update the date below and make it easy to find. We don't plan to collect any data in the future, but if that ever changed, we'd tell you clearly before it happened.",
    ],
  },
  {
    title: "Questions?",
    content: [
      "We don't have a support email (because we don't collect email addresses — see above). If you have questions or feedback, find us in the DFINITY / ICP community forums. We're building this in the open.",
    ],
  },
];

export default function PrivacyPolicyPage({
  onNavigate,
}: PrivacyPolicyPageProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            type="button"
            onClick={() => onNavigate("landing")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-figtree"
            data-ocid="privacy.back.link"
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
            <div className="inline-flex items-center gap-2 bg-forest/10 border border-forest/20 text-forest text-xs font-figtree font-semibold px-3 py-1.5 rounded-full mb-5">
              <ShieldCheck className="w-3.5 h-3.5" />
              Privacy First
            </div>
            <h1 className="font-fraunces font-black text-4xl lg:text-5xl text-foreground mb-4 leading-tight">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground font-figtree text-base leading-relaxed">
              Written in plain English. No legal jargon. If you have a question
              after reading this, it means we didn't write it clearly enough.
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
                    style={{ color: "oklch(0.46 0.14 145 / 0.5)" }}
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
              We collect nothing. We track nothing. We sell nothing. Your
              progress lives in your own browser — not on our servers, not tied
              to any account. That's how a privacy app should work.
            </p>
          </motion.div>

          {/* Back button */}
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => onNavigate("landing")}
              className="inline-flex items-center gap-2 text-sm text-forest hover:text-forest-bright transition-colors font-figtree"
              data-ocid="privacy.back_bottom.link"
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
              className="text-xs text-forest font-figtree font-semibold"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => onNavigate("terms")}
              className="text-xs text-muted-foreground font-figtree hover:text-foreground transition-colors"
              data-ocid="privacy.terms.link"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
