import { About } from "@/components/About";
import { BurrowRegistry } from "@/components/BurrowRegistry";
import { Dashboard } from "@/components/Dashboard";
import { Education } from "@/components/Education";
import { ReportBurrow } from "@/components/ReportBurrow";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { INITIAL_BURROWS } from "@/data/burrows";
import type { Burrow } from "@/data/burrows";
import { useINaturalistBurrows } from "@/hooks/useINaturalist";
import { Heart, Loader2, Search, Turtle } from "lucide-react";
import { useMemo, useState } from "react";

function getNextId(burrows: Burrow[]): string {
  const nums = burrows
    .filter((b) => b.id.startsWith("SCB-"))
    .map((b) => Number.parseInt(b.id.replace("SCB-", ""), 10))
    .filter((n) => !Number.isNaN(n));
  const max = nums.length > 0 ? Math.max(...nums) : 0;
  return `SCB-${String(max + 1).padStart(3, "0")}`;
}

export default function App() {
  const [communityBurrows, setCommunityBurrows] =
    useState<Burrow[]>(INITIAL_BURROWS);
  const [adminEnabled, setAdminEnabled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");

  const { data: inatBurrows, loading: inatLoading } = useINaturalistBurrows();

  // Merge: community-submitted records first, then iNaturalist
  const allBurrows = useMemo(() => {
    return [...communityBurrows, ...inatBurrows];
  }, [communityBurrows, inatBurrows]);

  const handleAdd = (b: Burrow) =>
    setCommunityBurrows((prev) => [
      { ...b, source: "community" as const },
      ...prev,
    ]);
  const handleEdit = (b: Burrow) =>
    setCommunityBurrows((prev) => prev.map((x) => (x.id === b.id ? b : x)));

  const nextId = getNextId(communityBurrows);
  const currentYear = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "burrowwatch";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Toaster />

      {/* Header */}
      <header className="bg-[oklch(var(--secondary))] shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-4">
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="bg-[oklch(var(--primary))] rounded-lg p-1.5">
              <Turtle className="w-5 h-5 text-[oklch(var(--primary-foreground))]" />
            </div>
            <div>
              <span className="font-bold text-[oklch(var(--primary-foreground))] text-lg tracking-tight leading-none">
                Burrow Watch
              </span>
              <p className="text-[oklch(var(--primary-foreground)/0.7)] text-xs leading-none mt-0.5 hidden sm:block">
                Space Coast &amp; Melbourne, FL
              </p>
            </div>
          </div>

          <div className="flex-1" />

          {/* iNaturalist loading indicator */}
          {inatLoading && (
            <div className="flex items-center gap-1.5 text-[oklch(var(--primary-foreground)/0.7)] text-xs">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span className="hidden sm:inline">Loading field data...</span>
            </div>
          )}

          <div className="relative hidden md:block w-52">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[oklch(var(--primary-foreground)/0.6)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search burrows..."
              className="w-full pl-8 pr-3 py-1.5 text-sm bg-[oklch(0.38_0.038_155)] text-[oklch(var(--primary-foreground))] placeholder:text-[oklch(var(--primary-foreground)/0.5)] rounded-md border border-[oklch(0.35_0.035_155)] focus:outline-none focus:ring-1 focus:ring-[oklch(var(--primary-foreground)/0.4)]"
              data-ocid="header.search_input"
            />
          </div>
        </div>
      </header>

      {/* Title Band */}
      <div className="bg-[oklch(var(--primary))] px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-[oklch(var(--primary-foreground))] tracking-tight">
            Burrow Registry Dashboard
          </h1>
          <p className="text-[oklch(var(--primary-foreground)/0.75)] text-sm mt-1">
            Gopher Tortoise Documentation · Space Coast &amp; Melbourne ·
            Brevard County
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList
            className="bg-[oklch(0.91_0.025_155)] border border-border p-1 rounded-lg flex-wrap h-auto gap-1"
            data-ocid="nav.tab"
          >
            <TabsTrigger
              value="dashboard"
              className="data-[state=active]:bg-[oklch(var(--primary))] data-[state=active]:text-[oklch(var(--primary-foreground))] text-sm font-medium"
              data-ocid="nav.dashboard.tab"
            >
              Dashboard
            </TabsTrigger>
            <TabsTrigger
              value="registry"
              className="data-[state=active]:bg-[oklch(var(--primary))] data-[state=active]:text-[oklch(var(--primary-foreground))] text-sm font-medium"
              data-ocid="nav.registry.tab"
            >
              Burrow Registry
            </TabsTrigger>
            <TabsTrigger
              value="report"
              className="data-[state=active]:bg-[oklch(var(--primary))] data-[state=active]:text-[oklch(var(--primary-foreground))] text-sm font-medium"
              data-ocid="nav.report.tab"
            >
              Report a Burrow
            </TabsTrigger>
            <TabsTrigger
              value="education"
              className="data-[state=active]:bg-[oklch(var(--primary))] data-[state=active]:text-[oklch(var(--primary-foreground))] text-sm font-medium"
              data-ocid="nav.education.tab"
            >
              Education
            </TabsTrigger>
            <TabsTrigger
              value="about"
              className="data-[state=active]:bg-[oklch(var(--primary))] data-[state=active]:text-[oklch(var(--primary-foreground))] text-sm font-medium"
              data-ocid="nav.about.tab"
            >
              About
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <Dashboard
              burrows={allBurrows}
              onAdd={handleAdd}
              onEdit={handleEdit}
              adminEnabled={adminEnabled}
              nextId={nextId}
              inatLoading={inatLoading}
            />
          </TabsContent>

          <TabsContent value="registry">
            <BurrowRegistry
              burrows={allBurrows}
              onAdd={handleAdd}
              onEdit={handleEdit}
              adminEnabled={adminEnabled}
              nextId={nextId}
            />
          </TabsContent>

          <TabsContent value="report">
            <ReportBurrow onReport={handleAdd} nextId={nextId} />
          </TabsContent>

          <TabsContent value="education">
            <Education />
          </TabsContent>

          <TabsContent value="about">
            <About />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-[oklch(var(--footer))] text-[oklch(0.75_0_0)] mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-[oklch(0.88_0_0)]">
                Burrow Watch · Space Coast &amp; Melbourne Gopher Tortoise
                Registry
              </p>
              <p className="text-xs">
                Field data supports FWC Brevard County gopher tortoise
                monitoring.{" "}
                <span className="text-[oklch(0.65_0_0)]">
                  Report violations: 1-888-404-3922
                </span>
              </p>
              <p className="text-xs text-[oklch(0.55_0_0)]">
                Records stored permanently on the Internet Computer (ICP).
              </p>
            </div>
            <div className="text-xs text-[oklch(0.55_0_0)] text-right flex flex-col items-end gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("about");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="flex items-center gap-1 text-[oklch(0.75_0_0)] hover:text-[oklch(0.88_0_0)] transition-colors text-xs"
                data-ocid="footer.support_button"
              >
                <Heart className="w-3 h-3" />
                Support with ICP
              </button>
              <p>
                © {currentYear}.{" "}
                <a
                  href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[oklch(0.75_0_0)] transition-colors"
                >
                  Built with love using caffeine.ai
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Admin / Field Mode toggle */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-[oklch(0.22_0_0/0.9)] backdrop-blur-sm rounded-full px-3 py-2 flex items-center gap-2 shadow-lg border border-[oklch(0.35_0_0)]">
          <Switch
            id="admin-toggle"
            checked={adminEnabled}
            onCheckedChange={setAdminEnabled}
            className="scale-75"
            data-ocid="admin.switch"
          />
          <Label
            htmlFor="admin-toggle"
            className="text-xs text-[oklch(0.70_0_0)] cursor-pointer select-none"
          >
            Field Mode
          </Label>
        </div>
      </div>
    </div>
  );
}
export type Page = string;
