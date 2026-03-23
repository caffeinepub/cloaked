import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Burrow } from "@/data/burrows";
import {
  CheckCircle2,
  ExternalLink,
  ListTree,
  MapPin,
  Pencil,
  Plus,
  ShieldAlert,
  Turtle,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { BurrowModal } from "./BurrowModal";
import { StatusBadge } from "./StatusBadge";
import { ThreatBadge } from "./ThreatBadge";

interface Props {
  burrows: Burrow[];
  onAdd: (b: Burrow) => void;
  onEdit: (b: Burrow) => void;
  adminEnabled: boolean;
  nextId: string;
  inatLoading?: boolean;
}

export function Dashboard({
  burrows,
  onAdd,
  onEdit,
  adminEnabled,
  nextId,
  inatLoading,
}: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Burrow | null>(null);

  const total = burrows.length;
  const active = burrows.filter((b) => b.status === "Active").length;
  const highThreat = burrows.filter((b) => b.threatLevel === "High").length;
  const communityCount = burrows.filter(
    (b) => b.source === "community" || !b.source,
  ).length;

  const recentFive = [...burrows]
    .sort((a, b) => b.dateDocumented.localeCompare(a.dateDocumented))
    .slice(0, 5);

  const handleEdit = (burrow: Burrow) => {
    setEditTarget(burrow);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditTarget(null);
  };

  const handleSave = (b: Burrow) => {
    if (editTarget) onEdit(b);
    else onAdd(b);
  };

  const kpis = [
    {
      label: "Total Records",
      value: inatLoading ? "..." : total,
      icon: <ListTree className="w-5 h-5" />,
      color: "text-[oklch(var(--primary))]",
    },
    {
      label: "Active Burrows",
      value: inatLoading ? "..." : active,
      icon: <Turtle className="w-5 h-5" />,
      color: "text-[oklch(0.44_0.070_155)]",
    },
    {
      label: "High Threat",
      value: inatLoading ? "..." : highThreat,
      icon: <ShieldAlert className="w-5 h-5" />,
      color: "text-[oklch(0.50_0.17_30)]",
    },
    {
      label: "Community Reports",
      value: communityCount,
      icon: <CheckCircle2 className="w-5 h-5" />,
      color: "text-[oklch(0.44_0.040_155)]",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Intro + KPI strip */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-4">
          <div>
            <h2 className="text-xl font-bold text-[oklch(var(--primary))] uppercase tracking-wide">
              Gopher Tortoise Burrow Registry
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Space Coast Region · Brevard County, FL
            </p>
            <p className="text-sm text-foreground mt-2 max-w-xl">
              Community-driven field documentation of{" "}
              <em className="font-semibold">Gopherus polyphemus</em> burrows
              across the Space Coast and Melbourne area. Live data from{" "}
              <a
                href="https://www.inaturalist.org"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-[oklch(0.44_0.070_155)] hover:opacity-80"
              >
                iNaturalist
              </a>{" "}
              combined with community field reports.
            </p>
          </div>

          {/* KPI cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {kpis.map((kpi, i) => (
              <motion.div
                key={kpi.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <Card className="shadow-card border-border">
                  <CardContent className="pt-4 pb-3 px-4">
                    <div className={`mb-1 ${kpi.color}`}>{kpi.icon}</div>
                    <div className={`text-3xl font-bold ${kpi.color}`}>
                      {kpi.value}
                    </div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground mt-0.5">
                      {kpi.label}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {adminEnabled && (
          <Card className="shadow-card border-border w-full lg:w-56 shrink-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-[oklch(var(--primary))]">
                Field Entry
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                className="w-full bg-[oklch(var(--accent))] text-[oklch(var(--accent-foreground))] hover:bg-[oklch(0.72_0.065_85)] border border-[oklch(0.65_0.060_85)] font-semibold"
                onClick={() => {
                  setEditTarget(null);
                  setModalOpen(true);
                }}
                data-ocid="dashboard.primary_button"
              >
                <Plus className="w-4 h-4 mr-1" /> Add New Burrow
              </Button>
              <Button
                variant="outline"
                className="w-full border-[oklch(var(--primary))] text-[oklch(var(--primary))] hover:bg-[oklch(0.93_0.030_155)]"
                data-ocid="dashboard.secondary_button"
              >
                <MapPin className="w-4 h-4 mr-1" /> Start Survey Session
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Recent Burrows Table */}
      <Card className="shadow-card border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold text-[oklch(var(--primary))]">
              Recent Burrow Records
            </CardTitle>
            <span className="text-xs text-muted-foreground">
              {inatLoading ? "Loading..." : `${total} total records`}
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table data-ocid="dashboard.table">
              <TableHeader>
                <TableRow className="bg-[oklch(0.93_0.025_155)] hover:bg-[oklch(0.91_0.025_155)]">
                  <TableHead className="text-xs font-semibold uppercase tracking-wider">
                    ID
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider">
                    Location
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider">
                    Source
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider">
                    Status
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider">
                    Threat
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider hidden sm:table-cell">
                    Documented
                  </TableHead>
                  {adminEnabled && (
                    <TableHead className="text-xs">Actions</TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentFive.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="py-10 text-center text-muted-foreground text-sm"
                    >
                      {inatLoading
                        ? "Loading field data from iNaturalist..."
                        : "No records yet. Be the first to report a burrow."}
                    </TableCell>
                  </TableRow>
                ) : (
                  recentFive.map((b, i) => (
                    <TableRow
                      key={b.id}
                      className="hover:bg-[oklch(0.95_0.015_85)]"
                      data-ocid={`dashboard.row.item.${i + 1}`}
                    >
                      <TableCell className="font-mono text-xs font-semibold text-[oklch(var(--primary))]">
                        {b.id}
                      </TableCell>
                      <TableCell className="text-sm max-w-[200px] truncate">
                        {b.locationDescription}
                      </TableCell>
                      <TableCell>
                        {b.source === "iNaturalist" ? (
                          <a
                            href={b.inatUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[oklch(0.90_0.08_250)] text-[oklch(0.35_0.10_250)] border border-[oklch(0.75_0.08_250)] hover:opacity-80"
                          >
                            iNaturalist <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        ) : (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[oklch(0.90_0.08_155)] text-[oklch(0.35_0.08_155)] border border-[oklch(0.75_0.08_155)]">
                            Community
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={b.status} />
                      </TableCell>
                      <TableCell>
                        <ThreatBadge level={b.threatLevel} />
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground hidden sm:table-cell">
                        {b.dateDocumented}
                      </TableCell>
                      {adminEnabled && (
                        <TableCell>
                          {b.source !== "iNaturalist" && (
                            <button
                              type="button"
                              onClick={() => handleEdit(b)}
                              className="p-1 rounded hover:bg-[oklch(0.90_0.030_155)] text-[oklch(var(--secondary))]"
                              data-ocid={`dashboard.edit_button.${i + 1}`}
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </TableCell>
                      )}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <BurrowModal
        open={modalOpen}
        onClose={handleModalClose}
        onSave={handleSave}
        existing={editTarget}
        nextId={nextId}
      />
    </div>
  );
}
