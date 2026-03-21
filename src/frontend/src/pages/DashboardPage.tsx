import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ExternalLink,
  RefreshCw,
  ShieldCheck,
  Trash2,
  UserX,
} from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import type { Page } from "../App";
import { BrokerCategory, PlatformCategory, ProgressStatus } from "../backend";
import { PrivacyScoreGauge } from "../components/PrivacyScoreGauge";
import {
  useBrokersWithStatus,
  usePlatformsWithStatus,
  useUpdateBrokerStatus,
  useUpdatePlatformStatus,
} from "../hooks/useQueries";

interface DashboardPageProps {
  onNavigate: (page: Page) => void;
}

const STATUS_LABELS: Record<ProgressStatus, string> = {
  [ProgressStatus.notStarted]: "Not Started",
  [ProgressStatus.inProgress]: "In Progress",
  [ProgressStatus.completed]: "Cloaked",
};

const STATUS_COLORS: Record<ProgressStatus, string> = {
  [ProgressStatus.notStarted]:
    "bg-secondary text-muted-foreground border-border",
  [ProgressStatus.inProgress]:
    "bg-amber-brand/15 text-amber-brand border-amber-brand/30",
  [ProgressStatus.completed]: "bg-forest/15 text-forest border-forest/30",
};

const BROKER_CATEGORY_LABELS: Record<string, string> = {
  [BrokerCategory.backgroundCheck]: "Background Check",
  [BrokerCategory.marketing]: "Marketing",
  [BrokerCategory.peopleSearch]: "People Search",
  [BrokerCategory.publicRecords]: "Public Records",
  [BrokerCategory.financial]: "Financial",
  [BrokerCategory.other]: "Other",
};

const PLATFORM_CATEGORY_LABELS: Record<string, string> = {
  [PlatformCategory.socialMedia]: "Social Media",
  [PlatformCategory.searchEngine]: "Search Engine",
  [PlatformCategory.eCommerce]: "E-Commerce",
  [PlatformCategory.dataAggregator]: "Data Aggregator",
  [PlatformCategory.media]: "Media",
  [PlatformCategory.other]: "Other",
};

function calcScore(
  brokers: { status: ProgressStatus }[],
  platforms: { status: ProgressStatus }[],
): number {
  const all = [...brokers, ...platforms];
  if (all.length === 0) return 0;
  const completed = all.filter(
    (x) => x.status === ProgressStatus.completed,
  ).length;
  const inProgress = all.filter(
    (x) => x.status === ProgressStatus.inProgress,
  ).length;
  return Math.round(((completed + inProgress * 0.5) / all.length) * 100);
}

function calcCategoryProgress(
  items: { status: ProgressStatus; category: string }[],
  categoryLabels: Record<string, string>,
) {
  const byCategory: Record<string, { total: number; done: number }> = {};
  for (const item of items) {
    const label = categoryLabels[item.category] ?? "Other";
    if (!byCategory[label]) byCategory[label] = { total: 0, done: 0 };
    byCategory[label].total++;
    if (item.status === ProgressStatus.completed) byCategory[label].done++;
    else if (item.status === ProgressStatus.inProgress)
      byCategory[label].done += 0.5;
  }
  return Object.entries(byCategory).map(([label, v]) => ({
    label,
    pct: Math.round((v.done / v.total) * 100),
    done: Math.floor(v.done),
    total: v.total,
  }));
}

const GUIDES = [
  {
    id: "delete-facebook" as Page,
    icon: Trash2,
    title: "Delete My Facebook",
    description:
      "A step-by-step guide to permanently delete your Facebook account and reclaim your data.",
    tag: "Social",
  },
  {
    id: "image-likeness" as Page,
    icon: UserX,
    title: "Image & Likeness Rights",
    description:
      "Understand your legal rights and learn how to remove photos of yourself from the internet.",
    tag: "Legal",
  },
];

export default function DashboardPage({ onNavigate }: DashboardPageProps) {
  const { data: brokers, isLoading: brokersLoading } = useBrokersWithStatus();
  const { data: platforms, isLoading: platformsLoading } =
    usePlatformsWithStatus();
  const updateBroker = useUpdateBrokerStatus();
  const updatePlatform = useUpdatePlatformStatus();

  const [brokerFilter, setBrokerFilter] = useState<string>("all");
  const [platformFilter, setPlatformFilter] = useState<string>("all");

  const score = useMemo(
    () => calcScore(brokers ?? [], platforms ?? []),
    [brokers, platforms],
  );

  const completedBrokers = (brokers ?? []).filter(
    (b) => b.status === ProgressStatus.completed,
  ).length;
  const completedPlatforms = (platforms ?? []).filter(
    (p) => p.status === ProgressStatus.completed,
  ).length;

  const brokerCategories = useMemo(
    () =>
      calcCategoryProgress(
        (brokers ?? []).map((b) => ({
          status: b.status,
          category: b.broker.category,
        })),
        BROKER_CATEGORY_LABELS,
      ),
    [brokers],
  );

  const platformCategories = useMemo(
    () =>
      calcCategoryProgress(
        (platforms ?? []).map((p) => ({
          status: p.status,
          category: p.platform.category,
        })),
        PLATFORM_CATEGORY_LABELS,
      ),
    [platforms],
  );

  const filteredBrokers = useMemo(
    () =>
      (brokers ?? []).filter(
        (b) => brokerFilter === "all" || b.broker.category === brokerFilter,
      ),
    [brokers, brokerFilter],
  );

  const filteredPlatforms = useMemo(
    () =>
      (platforms ?? []).filter(
        (p) =>
          platformFilter === "all" || p.platform.category === platformFilter,
      ),
    [platforms, platformFilter],
  );

  const handleBrokerStatus = async (name: string, status: ProgressStatus) => {
    await updateBroker.mutateAsync({ name, status });
    toast.success(`${name} updated to ${STATUS_LABELS[status]}`);
  };

  const handlePlatformStatus = async (name: string, status: ProgressStatus) => {
    await updatePlatform.mutateAsync({ name, status });
    toast.success(`${name} updated to ${STATUS_LABELS[status]}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => onNavigate("landing")}
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-ocid="dashboard.back.link"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-md bg-forest/15 border border-forest/30 flex items-center justify-center">
                <ShieldCheck className="w-3.5 h-3.5 text-forest" />
              </div>
              <span className="font-fraunces font-bold text-foreground">
                Cloaked
              </span>
            </div>
            <Badge
              variant="outline"
              className="text-forest border-forest/30 font-figtree text-xs"
            >
              Dashboard
            </Badge>
          </div>
        </div>
      </header>

      <main
        className="max-w-7xl mx-auto px-6 py-8"
        data-ocid="dashboard.section"
      >
        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Cloak Score",
              value: `${score}`,
              unit: "/ 100",
              highlight: true,
            },
            {
              label: "Brokers Cloaked",
              value: `${completedBrokers}`,
              unit: `/ ${(brokers ?? []).length}`,
              highlight: false,
            },
            {
              label: "Platforms Removed",
              value: `${completedPlatforms}`,
              unit: `/ ${(platforms ?? []).length}`,
              highlight: false,
            },
            {
              label: "Total Sources",
              value: `${(brokers ?? []).length + (platforms ?? []).length}`,
              unit: "tracked",
              highlight: false,
            },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className={`bg-card border rounded-xl p-5 shadow-card ${
                stat.highlight
                  ? "border-forest/30 glow-forest-sm"
                  : "border-border"
              }`}
              data-ocid={`dashboard.stat.${i + 1}.card`}
            >
              <p className="text-xs text-muted-foreground font-figtree uppercase tracking-widest mb-2">
                {stat.label}
              </p>
              <div className="flex items-baseline gap-1.5">
                <span
                  className={`text-3xl font-fraunces font-black ${
                    stat.highlight ? "text-forest" : "text-foreground"
                  }`}
                >
                  {stat.value}
                </span>
                <span className="text-xs text-muted-foreground font-figtree">
                  {stat.unit}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Score gauge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card border border-border rounded-2xl p-8 flex flex-col items-center justify-center shadow-card"
            data-ocid="dashboard.score.card"
          >
            <p className="text-xs text-muted-foreground font-figtree uppercase tracking-widest mb-6">
              Overall Cloak Score
            </p>
            <PrivacyScoreGauge score={score} size={180} />
            <p className="text-xs text-muted-foreground font-figtree mt-4 text-center max-w-[160px]">
              Complete more removals to strengthen your cloak
            </p>
          </motion.div>

          {/* Category progress */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-2 bg-card border border-border rounded-2xl p-6 shadow-card"
            data-ocid="dashboard.categories.card"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-fraunces font-semibold text-foreground">
                Progress by Category
              </h3>
              <RefreshCw className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
              {[...brokerCategories, ...platformCategories].map((cat) => (
                <div key={cat.label}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-xs font-figtree text-muted-foreground">
                      {cat.label}
                    </span>
                    <span
                      className="text-xs font-figtree"
                      style={{
                        color:
                          cat.pct >= 70
                            ? "oklch(0.46 0.14 145)"
                            : cat.pct >= 40
                              ? "oklch(0.62 0.14 62)"
                              : "oklch(0.76 0.17 210)",
                      }}
                    >
                      {cat.done}/{cat.total}
                    </span>
                  </div>
                  <Progress value={cat.pct} className="h-1.5 bg-secondary" />
                </div>
              ))}
              {[...brokerCategories, ...platformCategories].length === 0 && (
                <div className="col-span-2 space-y-3">
                  {["a", "b", "c", "d"].map((k) => (
                    <Skeleton key={k} className="h-6 w-full bg-secondary" />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Main tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Tabs defaultValue="brokers">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <TabsList
                className="bg-card border border-border p-1 rounded-xl"
                data-ocid="dashboard.tab"
              >
                <TabsTrigger
                  value="brokers"
                  className="font-figtree text-sm rounded-lg data-[state=active]:bg-forest data-[state=active]:text-forest-on"
                  data-ocid="dashboard.brokers.tab"
                >
                  Data Brokers ({(brokers ?? []).length})
                </TabsTrigger>
                <TabsTrigger
                  value="platforms"
                  className="font-figtree text-sm rounded-lg data-[state=active]:bg-forest data-[state=active]:text-forest-on"
                  data-ocid="dashboard.platforms.tab"
                >
                  Social Platforms ({(platforms ?? []).length})
                </TabsTrigger>
                <TabsTrigger
                  value="guides"
                  className="font-figtree text-sm rounded-lg data-[state=active]:bg-forest data-[state=active]:text-forest-on"
                  data-ocid="dashboard.guides.tab"
                >
                  <BookOpen className="w-3.5 h-3.5 mr-1.5" />
                  Guides
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Brokers tab */}
            <TabsContent value="brokers" className="mt-0">
              <div className="flex items-center gap-3 mb-4">
                <Select value={brokerFilter} onValueChange={setBrokerFilter}>
                  <SelectTrigger
                    className="w-44 bg-card border-border font-figtree text-sm"
                    data-ocid="dashboard.broker_filter.select"
                  >
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="all" className="font-figtree text-sm">
                      All Categories
                    </SelectItem>
                    {Object.entries(BROKER_CATEGORY_LABELS).map(
                      ([val, label]) => (
                        <SelectItem
                          key={val}
                          value={val}
                          className="font-figtree text-sm"
                        >
                          {label}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
                <span className="text-xs text-muted-foreground font-figtree">
                  {filteredBrokers.length} sources
                </span>
              </div>

              {brokersLoading ? (
                <div
                  className="space-y-3"
                  data-ocid="dashboard.brokers.loading_state"
                >
                  {["a", "b", "c", "d", "e"].map((k) => (
                    <Skeleton
                      key={k}
                      className="h-20 w-full bg-card rounded-xl"
                    />
                  ))}
                </div>
              ) : filteredBrokers.length === 0 ? (
                <div
                  className="text-center py-16 text-muted-foreground font-figtree"
                  data-ocid="dashboard.brokers.empty_state"
                >
                  No data brokers found.
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredBrokers.map((item, i) => (
                    <motion.div
                      key={item.broker.name}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.3 }}
                      className="bg-card border border-border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-forest/25 transition-colors shadow-card"
                      data-ocid={`dashboard.broker.item.${i + 1}`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="font-fraunces font-semibold text-foreground text-sm">
                            {item.broker.name}
                          </span>
                          <Badge
                            variant="outline"
                            className="text-[10px] font-figtree border-border text-muted-foreground"
                          >
                            {BROKER_CATEGORY_LABELS[item.broker.category] ??
                              "Other"}
                          </Badge>
                          <span
                            className={`text-[10px] font-figtree px-2 py-0.5 rounded-full border ${
                              STATUS_COLORS[item.status]
                            }`}
                          >
                            {STATUS_LABELS[item.status]}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground font-figtree leading-relaxed line-clamp-2">
                          {item.broker.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <a
                          href={item.broker.optOutUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs text-forest hover:text-forest-bright font-figtree transition-colors"
                          data-ocid={`dashboard.broker.opt_out.link.${i + 1}`}
                        >
                          Opt Out <ExternalLink className="w-3 h-3" />
                        </a>
                        <Select
                          value={item.status}
                          onValueChange={(val) =>
                            handleBrokerStatus(
                              item.broker.name,
                              val as ProgressStatus,
                            )
                          }
                        >
                          <SelectTrigger
                            className="w-36 h-8 bg-secondary border-border font-figtree text-xs"
                            data-ocid={`dashboard.broker.status.select.${i + 1}`}
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-border">
                            <SelectItem
                              value={ProgressStatus.notStarted}
                              className="font-figtree text-xs"
                            >
                              Not Started
                            </SelectItem>
                            <SelectItem
                              value={ProgressStatus.inProgress}
                              className="font-figtree text-xs"
                            >
                              In Progress
                            </SelectItem>
                            <SelectItem
                              value={ProgressStatus.completed}
                              className="font-figtree text-xs"
                            >
                              Cloaked ✓
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Platforms tab */}
            <TabsContent value="platforms" className="mt-0">
              <div className="flex items-center gap-3 mb-4">
                <Select
                  value={platformFilter}
                  onValueChange={setPlatformFilter}
                >
                  <SelectTrigger
                    className="w-44 bg-card border-border font-figtree text-sm"
                    data-ocid="dashboard.platform_filter.select"
                  >
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="all" className="font-figtree text-sm">
                      All Categories
                    </SelectItem>
                    {Object.entries(PLATFORM_CATEGORY_LABELS).map(
                      ([val, label]) => (
                        <SelectItem
                          key={val}
                          value={val}
                          className="font-figtree text-sm"
                        >
                          {label}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
                <span className="text-xs text-muted-foreground font-figtree">
                  {filteredPlatforms.length} platforms
                </span>
              </div>

              {platformsLoading ? (
                <div
                  className="space-y-3"
                  data-ocid="dashboard.platforms.loading_state"
                >
                  {["a", "b", "c", "d", "e"].map((k) => (
                    <Skeleton
                      key={k}
                      className="h-20 w-full bg-card rounded-xl"
                    />
                  ))}
                </div>
              ) : filteredPlatforms.length === 0 ? (
                <div
                  className="text-center py-16 text-muted-foreground font-figtree"
                  data-ocid="dashboard.platforms.empty_state"
                >
                  No platforms found.
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredPlatforms.map((item, i) => (
                    <motion.div
                      key={item.platform.name}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.3 }}
                      className="bg-card border border-border rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-forest/25 transition-colors shadow-card"
                      data-ocid={`dashboard.platform.item.${i + 1}`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="font-fraunces font-semibold text-foreground text-sm">
                            {item.platform.name}
                          </span>
                          <Badge
                            variant="outline"
                            className="text-[10px] font-figtree border-border text-muted-foreground"
                          >
                            {PLATFORM_CATEGORY_LABELS[item.platform.category] ??
                              "Other"}
                          </Badge>
                          <span
                            className={`text-[10px] font-figtree px-2 py-0.5 rounded-full border ${
                              STATUS_COLORS[item.status]
                            }`}
                          >
                            {STATUS_LABELS[item.status]}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground font-figtree leading-relaxed line-clamp-2">
                          {item.platform.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <a
                          href={item.platform.removalGuideUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs text-forest hover:text-forest-bright font-figtree transition-colors"
                          data-ocid={`dashboard.platform.removal_guide.link.${i + 1}`}
                        >
                          Guide <ExternalLink className="w-3 h-3" />
                        </a>
                        <Select
                          value={item.status}
                          onValueChange={(val) =>
                            handlePlatformStatus(
                              item.platform.name,
                              val as ProgressStatus,
                            )
                          }
                        >
                          <SelectTrigger
                            className="w-36 h-8 bg-secondary border-border font-figtree text-xs"
                            data-ocid={`dashboard.platform.status.select.${i + 1}`}
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-border">
                            <SelectItem
                              value={ProgressStatus.notStarted}
                              className="font-figtree text-xs"
                            >
                              Not Started
                            </SelectItem>
                            <SelectItem
                              value={ProgressStatus.inProgress}
                              className="font-figtree text-xs"
                            >
                              In Progress
                            </SelectItem>
                            <SelectItem
                              value={ProgressStatus.completed}
                              className="font-figtree text-xs"
                            >
                              Cloaked ✓
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Guides tab */}
            <TabsContent value="guides" className="mt-0">
              <div className="grid sm:grid-cols-2 gap-5">
                {GUIDES.map((guide, i) => {
                  const Icon = guide.icon;
                  return (
                    <motion.button
                      key={guide.id}
                      type="button"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                      onClick={() => onNavigate(guide.id)}
                      className="bg-card border border-border rounded-xl p-6 text-left hover:border-forest/40 hover:shadow-lg transition-all group"
                      data-ocid={`dashboard.guide.item.${i + 1}`}
                    >
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="w-11 h-11 rounded-xl bg-forest/10 border border-forest/20 flex items-center justify-center flex-shrink-0 group-hover:bg-forest/20 transition-colors">
                          <Icon className="w-5 h-5 text-forest" />
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="text-[10px] font-figtree border-border text-muted-foreground"
                          >
                            {guide.tag}
                          </Badge>
                          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-forest group-hover:translate-x-0.5 transition-all" />
                        </div>
                      </div>
                      <h3 className="font-fraunces font-semibold text-foreground mb-2 group-hover:text-forest transition-colors">
                        {guide.title}
                      </h3>
                      <p className="text-sm text-muted-foreground font-figtree leading-relaxed">
                        {guide.description}
                      </p>
                    </motion.button>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-3">
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
