import {
  AlertTriangle,
  ArrowLeft,
  Clock,
  Download,
  ExternalLink,
  Info,
  Layers,
  ShieldCheck,
  Trash2,
  Unplug,
} from "lucide-react";
import { motion } from "motion/react";
import type { Page } from "../App";

interface DeleteFacebookPageProps {
  onNavigate: (page: Page) => void;
}

const steps = [
  {
    number: 1,
    icon: Download,
    title: "Download Your Data",
    body: 'Go to Settings → Your Facebook Information → Download Your Information. Select "All" and choose High quality for photos. Click "Create File". Facebook will send you an email when it\'s ready — this can take hours or even a couple of days.',
    tip: "Don't skip this. Your photos, messages, and posts are yours. Take them before they're gone.",
    link: null,
  },
  {
    number: 2,
    icon: Unplug,
    title: "Disconnect Third-Party Apps",
    body: "Go to Settings → Security and Login → Apps and Websites. Remove every app that uses Facebook Login. If you don't, you'll lose access to those accounts when your Facebook disappears.",
    tip: "Common ones: Spotify, Tinder, Airbnb, Pinterest. Check them all.",
    link: null,
  },
  {
    number: 3,
    icon: Layers,
    title: "Deactivate vs. Delete — Know the Difference",
    body: "Deactivation hides your profile and pauses your account, but Facebook keeps all your data. Deletion permanently removes your account and everything in it — after a 30-day grace period. For real privacy, deletion is the only option.",
    tip: null,
    link: null,
  },
  {
    number: 4,
    icon: Trash2,
    title: "Delete Your Account",
    body: 'Go to Settings → Your Facebook Information → Deactivation and Deletion. Choose "Delete Account" → Continue → Delete Account. Enter your password and click "Continue." That\'s it. The clock starts now.',
    tip: null,
    link: {
      label: "Open Facebook deletion page",
      href: "https://www.facebook.com/help/delete_account",
    },
  },
  {
    number: 5,
    icon: Clock,
    title: "Confirm and Wait",
    body: "You have 30 days to change your mind. If you log back in during that window, the deletion is cancelled and you start over. After 30 days, your account and data are permanently gone.",
    tip: "Log out of every device. Remove the app from your phone. Don't accidentally undo it.",
    link: null,
  },
];

export default function DeleteFacebookPage({
  onNavigate,
}: DeleteFacebookPageProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center gap-4">
          <button
            type="button"
            onClick={() => onNavigate("dashboard")}
            className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 font-figtree text-sm"
            data-ocid="delete-facebook.back.link"
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
              <Trash2 className="w-5 h-5 text-forest" />
            </div>
            <span className="text-xs font-figtree text-muted-foreground uppercase tracking-widest">
              Step-by-step guide
            </span>
          </div>
          <h1 className="font-fraunces font-black text-4xl text-foreground mb-4 leading-tight">
            Delete My Facebook
          </h1>
          <p className="text-muted-foreground font-figtree text-lg leading-relaxed">
            This is a one-way door. Done right, your data is gone for good.
            Here's how to do it properly — without losing anything you actually
            want to keep.
          </p>
        </motion.div>

        {/* Before You Delete warning */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-8 bg-amber-brand/8 border border-amber-brand/25 rounded-xl p-5"
          data-ocid="delete-facebook.warning.card"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle
              className="w-5 h-5 flex-shrink-0 mt-0.5"
              style={{ color: "oklch(0.62 0.14 62)" }}
            />
            <div>
              <h2 className="font-fraunces font-semibold text-foreground mb-2">
                Before You Delete
              </h2>
              <ul className="space-y-1.5 font-figtree text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-amber-brand mt-0.5">•</span>
                  Back up your photos, videos, and messages first. There's no
                  recovery after 30 days.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-brand mt-0.5">•</span>
                  Note which apps you log into with Facebook — you'll need to
                  update those logins.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-brand mt-0.5">•</span>
                  Facebook gives you 30 days to cancel. Don't log back in during
                  that window.
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Steps */}
        <div className="space-y-5 mb-10">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
                className="bg-card border border-border rounded-xl p-6 hover:border-forest/30 transition-colors"
                data-ocid={`delete-facebook.step.item.${i + 1}`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center gap-2 flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-forest/15 border border-forest/25 flex items-center justify-center">
                      <span className="text-xs font-fraunces font-black text-forest">
                        {step.number}
                      </span>
                    </div>
                    <div className="w-7 h-7 rounded-lg bg-secondary border border-border flex items-center justify-center">
                      <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-fraunces font-semibold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm font-figtree text-muted-foreground leading-relaxed mb-3">
                      {step.body}
                    </p>
                    {step.tip && (
                      <div className="flex items-start gap-2 bg-forest/8 border border-forest/20 rounded-lg px-3 py-2 mb-3">
                        <Info className="w-3.5 h-3.5 text-forest flex-shrink-0 mt-0.5" />
                        <p className="text-xs font-figtree text-forest/90 leading-relaxed">
                          {step.tip}
                        </p>
                      </div>
                    )}
                    {step.link && (
                      <a
                        href={step.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-figtree text-forest hover:text-forest-bright transition-colors"
                        data-ocid={`delete-facebook.step.link.${i + 1}`}
                      >
                        {step.link.label} <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* After Deletion note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="bg-forest/8 border border-forest/25 rounded-xl p-5"
          data-ocid="delete-facebook.aftermath.card"
        >
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-forest flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-fraunces font-semibold text-foreground mb-2">
                After Deletion — What Remains
              </h3>
              <ul className="space-y-1.5 font-figtree text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-forest mt-0.5">•</span>
                  Some info may linger in Facebook's backup systems for up to 90
                  days. It won't be visible to anyone.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-forest mt-0.5">•</span>
                  Messages you sent to others will remain in their inboxes —
                  Facebook can't delete what others received.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-forest mt-0.5">•</span>
                  Your name may still appear in others' tagged posts as plain
                  text, but your profile link will be broken.
                </li>
              </ul>
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
