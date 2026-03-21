import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  EyeOff,
  Flag,
  Gavel,
  Globe,
  Info,
  Scale,
  Search,
  ShieldCheck,
} from "lucide-react";
import { motion } from "motion/react";
import type { Page } from "../App";

interface ImageLikenessPageProps {
  onNavigate: (page: Page) => void;
}

export default function ImageLikenessPage({
  onNavigate,
}: ImageLikenessPageProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center gap-4">
          <button
            type="button"
            onClick={() => onNavigate("dashboard")}
            className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 font-figtree text-sm"
            data-ocid="image-likeness.back.link"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-forest/15 border border-forest/30 flex items-center justify-center">
              <ShieldCheck className="w-3.5 h-3.5 text-forest" />
            </div>
            <span className="font-fraunces font-bold text-foreground">
              Cloaked
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-forest/10 border border-forest/20 flex items-center justify-center">
              <EyeOff className="w-5 h-5 text-forest" />
            </div>
            <span className="text-xs font-figtree text-muted-foreground uppercase tracking-widest">
              Your rights explained
            </span>
          </div>
          <h1 className="font-fraunces font-black text-4xl text-foreground mb-4 leading-tight">
            Image &amp; Likeness Rights
          </h1>
          <p className="text-muted-foreground font-figtree text-lg leading-relaxed">
            You have more rights over your image than platforms want you to
            know. Here's what they are and how to use them.
          </p>
        </motion.div>

        {/* Rights at a Glance */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-8"
          data-ocid="image-likeness.rights.section"
        >
          <h2 className="font-fraunces font-semibold text-foreground text-xl mb-4">
            Your Rights at a Glance
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                icon: Scale,
                region: "United States",
                right: "Right of Publicity",
                detail:
                  "Your image, name, and likeness cannot be used commercially without your consent.",
              },
              {
                icon: ShieldCheck,
                region: "European Union",
                right: "GDPR Article 9",
                detail:
                  "Facial images are biometric data with the highest level of legal protection.",
              },
              {
                icon: Globe,
                region: "Globally",
                right: "Removal Rights",
                detail:
                  "You can formally request removal of your photos from search engines and major platforms.",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.region}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.35 }}
                  className="bg-card border border-border rounded-xl p-5"
                  data-ocid={`image-likeness.right.item.${i + 1}`}
                >
                  <div className="w-9 h-9 rounded-lg bg-forest/10 border border-forest/20 flex items-center justify-center mb-3">
                    <Icon className="w-4 h-4 text-forest" />
                  </div>
                  <p className="text-[10px] font-figtree text-muted-foreground uppercase tracking-wider mb-1">
                    {item.region}
                  </p>
                  <h3 className="font-fraunces font-semibold text-foreground text-sm mb-2">
                    {item.right}
                  </h3>
                  <p className="text-xs font-figtree text-muted-foreground leading-relaxed">
                    {item.detail}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* What Big Tech ToS Actually Say */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-8"
          data-ocid="image-likeness.tos.section"
        >
          <div className="bg-amber-brand/8 border border-amber-brand/25 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle
                className="w-5 h-5 flex-shrink-0 mt-0.5"
                style={{ color: "oklch(0.62 0.14 62)" }}
              />
              <div>
                <h2 className="font-fraunces font-semibold text-foreground mb-3">
                  What Big Tech's Terms Actually Say
                </h2>
                <ul className="space-y-2 font-figtree text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-brand flex-shrink-0 mt-0.5">
                      •
                    </span>
                    When you post content, you grant Meta and Google a broad
                    license to use it across their platforms.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-brand flex-shrink-0 mt-0.5">
                      •
                    </span>
                    <span>
                      <strong className="text-foreground">BUT:</strong> You
                      never consented to others using your image commercially —
                      that's a separate legal issue from the ToS.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-brand flex-shrink-0 mt-0.5">
                      •
                    </span>
                    Photos taken and posted by someone else do not fall under
                    any terms you agreed to.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-brand flex-shrink-0 mt-0.5">
                      •
                    </span>
                    Meta has been fined billions — in both the US and EU — for
                    facial recognition violations. The law takes this seriously.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Remove a Tagged Photo */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="mb-8"
          data-ocid="image-likeness.tag-removal.section"
        >
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-forest/10 border border-forest/20 flex items-center justify-center flex-shrink-0">
                <Flag className="w-4 h-4 text-forest" />
              </div>
              <div>
                <h2 className="font-fraunces font-semibold text-foreground">
                  How to Remove a Tagged Photo on Facebook/Instagram
                </h2>
                <p className="text-xs text-muted-foreground font-figtree mt-0.5">
                  Works even if you didn't post it
                </p>
              </div>
            </div>
            <ol className="space-y-3">
              {[
                "Find the photo and tap the three-dot menu (⋯) in the corner.",
                'Select "Report" from the options.',
                'Choose "It\'s a photo of me and I want it removed."',
                "Follow the prompts. Facebook will review it, usually within a few days.",
                "If rejected, you have the right to appeal or send a direct removal request to Facebook's support team.",
              ].map((step, i) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-forest/15 border border-forest/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[10px] font-fraunces font-black text-forest">
                      {i + 1}
                    </span>
                  </span>
                  <p className="text-sm font-figtree text-muted-foreground leading-relaxed">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </motion.section>

        {/* Face Recognition Opt-Out */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mb-8"
          data-ocid="image-likeness.face-recognition.section"
        >
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-forest/10 border border-forest/20 flex items-center justify-center flex-shrink-0">
                <EyeOff className="w-4 h-4 text-forest" />
              </div>
              <div>
                <h2 className="font-fraunces font-semibold text-foreground">
                  Opt Out of Face Recognition
                </h2>
              </div>
            </div>
            <p className="text-sm font-figtree text-muted-foreground leading-relaxed mb-4">
              Facebook officially disabled face recognition by default in 2021
              after pressure from regulators. But Instagram and other Meta
              products may still use facial data in limited ways.
            </p>
            <div className="flex items-start gap-2 bg-forest/8 border border-forest/20 rounded-lg px-3 py-2 mb-4">
              <Info className="w-3.5 h-3.5 text-forest flex-shrink-0 mt-0.5" />
              <p className="text-xs font-figtree text-forest/90 leading-relaxed">
                Go to Settings → Face Recognition. If the option exists, toggle
                it off. You can also submit a formal request to delete your face
                recognition template from Meta's systems.
              </p>
            </div>
            <p className="text-xs font-figtree text-muted-foreground">
              Path may vary by region and app version. If you don't see it, the
              feature may already be off for your account.
            </p>
          </div>
        </motion.section>

        {/* Google Search Removal */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="mb-8"
          data-ocid="image-likeness.google.section"
        >
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-forest/10 border border-forest/20 flex items-center justify-center flex-shrink-0">
                <Search className="w-4 h-4 text-forest" />
              </div>
              <div>
                <h2 className="font-fraunces font-semibold text-foreground">
                  Get Your Photo Removed from Google Search
                </h2>
              </div>
            </div>
            <p className="text-sm font-figtree text-muted-foreground leading-relaxed mb-4">
              Google has an official tool that lets you request removal of
              personal information — including photos — from search results. It
              doesn't delete the page, but it removes the result from showing up
              when someone searches your name.
            </p>
            <a
              href="https://myaccount.google.com/data-and-privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-forest/10 border border-forest/25 text-forest hover:bg-forest/20 transition-colors rounded-lg px-4 py-2.5 text-sm font-figtree font-medium"
              data-ocid="image-likeness.google-tool.link"
            >
              Open Google Data &amp; Privacy Tool{" "}
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <p className="text-xs font-figtree text-muted-foreground mt-3">
              Look for "Results about you" inside your Google Account. You can
              monitor what appears and submit removal requests from there.
            </p>
          </div>
        </motion.section>

        {/* Legal Action */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mb-8"
          data-ocid="image-likeness.legal.section"
        >
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-forest/10 border border-forest/20 flex items-center justify-center flex-shrink-0">
                <Gavel className="w-4 h-4 text-forest" />
              </div>
              <div>
                <h2 className="font-fraunces font-semibold text-foreground">
                  Legal Action &amp; Formal Requests
                </h2>
                <p className="text-xs text-muted-foreground font-figtree mt-0.5">
                  When platform tools aren't enough
                </p>
              </div>
            </div>
            <ul className="space-y-3">
              {[
                {
                  region: "EU",
                  text: "File a GDPR Subject Access Request (SAR) with the platform. They are legally required to respond within 30 days and must delete your data upon request.",
                },
                {
                  region: "US",
                  text: "Consult a privacy attorney about right of publicity claims, especially for commercial misuse of your image. Many offer free initial consultations.",
                },
                {
                  region: "All",
                  text: "Document everything before taking action. Screenshots, URLs, dates, and names all strengthen your case if it escalates.",
                },
              ].map((item) => (
                <li key={item.region} className="flex items-start gap-3">
                  <span className="text-[10px] font-figtree font-semibold text-forest bg-forest/10 border border-forest/20 rounded px-1.5 py-0.5 flex-shrink-0 mt-0.5">
                    {item.region}
                  </span>
                  <p className="text-sm font-figtree text-muted-foreground leading-relaxed">
                    {item.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* Bottom Line */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.45 }}
          className="bg-forest/8 border border-forest/25 rounded-xl p-5"
          data-ocid="image-likeness.summary.card"
        >
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-forest flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-fraunces font-semibold text-foreground mb-2">
                The Bottom Line
              </h3>
              <p className="text-sm font-figtree text-muted-foreground leading-relaxed">
                You have more rights over your image than platforms want you to
                think. They don't advertise these tools. The burden of
                enforcement is on you — but these steps work. Start with the
                easiest ones (reporting the photo, using Google's removal tool)
                and escalate only if needed. You're not powerless here.
              </p>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12">
        <div className="max-w-3xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-forest" />
            <span className="font-fraunces font-bold text-sm text-foreground">
              Cloaked
            </span>
          </div>
          <p className="text-xs text-muted-foreground font-figtree">
            © {new Date().getFullYear()}. Built with ♥ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-forest hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
