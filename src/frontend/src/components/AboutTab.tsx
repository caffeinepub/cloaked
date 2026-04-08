import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Copy, Globe, Leaf } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ICP_ADDRESS =
  "416c602ad9431e5c54158097c181a8268c72de7704f8276d6d13e7e4f4207150";

export default function AboutTab() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(ICP_ADDRESS);
      setCopied(true);
      toast.success("ICP address copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Could not copy — please copy manually.");
    }
  };

  return (
    <div className="space-y-5 max-w-2xl mx-auto">
      {/* Brand story */}
      <Card className="card-texture border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 font-display text-xl">
            <Leaf
              className="w-5 h-5"
              style={{ color: "oklch(0.33 0.072 145)" }}
            />
            About Space Coast Garden Guide
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm font-sans text-foreground/90 leading-relaxed">
          <p>
            Space Coast Garden Guide is a small boutique garden and edible fruit
            operation in East Central Florida. We grow subtropical and tropical
            fruits, edible trees, and seasonal vegetables in Zone 9b/10a.
          </p>
          <p>
            This calendar is a free resource for anyone growing food in our
            corner of Florida. Everything here is grown with care, not
            chemistry.
          </p>
          <p className="italic text-muted-foreground">
            Twelve months of subtropical abundance — mangoes to strawberries,
            lemongrass to loquats. This land gives everything if you pay
            attention to its rhythms.
          </p>
        </CardContent>
      </Card>

      {/* Donation */}
      <Card className="card-texture border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 font-display text-xl">
            <Globe
              className="w-5 h-5"
              style={{ color: "oklch(0.68 0.128 68)" }}
            />
            Support This Tool
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm font-sans text-foreground/90 leading-relaxed">
            This calendar is free. If it&apos;s been useful, you can support it
            with ICP on the Internet Computer.
          </p>

          <div
            className="rounded-lg p-3 space-y-2"
            style={{
              background: "oklch(0.33 0.072 145 / 0.08)",
              border: "1px solid oklch(0.33 0.072 145 / 0.25)",
            }}
          >
            <p className="text-xs font-sans text-muted-foreground uppercase tracking-wide">
              ICP Wallet Address
            </p>
            <p
              className="text-xs font-mono break-all text-foreground/80 leading-relaxed"
              data-ocid="about.input"
            >
              {ICP_ADDRESS}
            </p>
            <Button
              size="sm"
              variant="outline"
              className="font-sans text-xs border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground"
              onClick={handleCopy}
              data-ocid="about.primary_button"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 mr-1" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 mr-1" />
                  Copy Address
                </>
              )}
            </Button>
          </div>

          <p className="text-sm font-sans text-muted-foreground leading-relaxed">
            ICP runs on a decentralized network — no AWS, no Google. Your
            support goes directly to the grower.
          </p>

          <div
            className="rounded-lg p-3 text-xs font-sans text-muted-foreground leading-relaxed"
            style={{
              background: "oklch(0.68 0.128 68 / 0.07)",
              border: "1px solid oklch(0.68 0.128 68 / 0.2)",
            }}
          >
            <strong className="text-foreground">What is ICP?</strong> The
            Internet Computer Protocol is a decentralized blockchain network
            that hosts software and data permanently — without relying on
            centralized cloud providers. Records stored on ICP exist
            independently of any single company or server, giving communities
            true ownership of their digital tools.
          </div>
        </CardContent>
      </Card>

      {/* Zone info */}
      <Card className="card-texture border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="font-display text-lg">
            Zone 9b / 10a — Brevard County, FL
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm font-sans text-foreground/90 leading-relaxed space-y-2">
          <p>
            East Central Florida's climate is one of the most productive in
            North America for year-round growing. Two tomato seasons, mangoes in
            summer, citrus in winter — the rhythm never truly stops.
          </p>
          <p>
            Average frost dates: December–February (occasional only). Average
            first tropical storm rain: late May. Rainy season: June–September.
            Dry season: October–May.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
