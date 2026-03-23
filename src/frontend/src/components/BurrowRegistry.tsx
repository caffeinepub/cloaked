import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type {
  Burrow,
  BurrowStatus,
  LandUse,
  ThreatLevel,
} from "@/data/burrows";
import {
  ExternalLink,
  Eye,
  Pencil,
  Plus,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { useMemo, useState } from "react";
import { BurrowModal } from "./BurrowModal";
import { StatusBadge } from "./StatusBadge";
import { ThreatBadge } from "./ThreatBadge";

interface Props {
  burrows: Burrow[];
  onAdd: (b: Burrow) => void;
  onEdit: (b: Burrow) => void;
  adminEnabled: boolean;
  nextId: string;
}

type StatusFilter = "All" | BurrowStatus;
type ThreatFilter = "All" | ThreatLevel;
type LandFilter = "All" | LandUse;
type SourceFilter = "All" | "iNaturalist" | "community";

export function BurrowRegistry({
  burrows,
  onAdd,
  onEdit,
  adminEnabled,
  nextId,
}: Props) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [threatFilter, setThreatFilter] = useState<ThreatFilter>("All");
  const [landFilter, _setLandFilter] = useState<LandFilter>("All");
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Burrow | null>(null);
  const [viewTarget, setViewTarget] = useState<Burrow | null>(null);

  const filtered = useMemo(() => {
    return burrows.filter((b) => {
      if (statusFilter !== "All" && b.status !== statusFilter) return false;
      if (threatFilter !== "All" && b.threatLevel !== threatFilter)
        return false;
      if (landFilter !== "All" && b.landUse !== landFilter) return false;
      if (sourceFilter !== "All") {
        const src = b.source ?? "community";
        if (src !== sourceFilter) return false;
      }
      if (search) {
        const q = search.toLowerCase();
        return (
          b.id.toLowerCase().includes(q) ||
          b.locationDescription.toLowerCase().includes(q) ||
          b.notes.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [burrows, statusFilter, threatFilter, landFilter, sourceFilter, search]);

  const handleEdit = (b: Burrow) => {
    setEditTarget(b);
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[oklch(var(--primary))] uppercase tracking-wide">
            Burrow Registry
          </h2>
          <p className="text-sm text-muted-foreground">
            {filtered.length} of {burrows.length} records
          </p>
        </div>
        {adminEnabled && (
          <Button
            className="bg-[oklch(var(--accent))] text-[oklch(var(--accent-foreground))] hover:bg-[oklch(0.72_0.065_85)] border border-[oklch(0.65_0.060_85)] font-semibold shrink-0"
            onClick={() => {
              setEditTarget(null);
              setModalOpen(true);
            }}
            data-ocid="registry.primary_button"
          >
            <Plus className="w-4 h-4 mr-1" /> Add New Burrow
          </Button>
        )}
      </div>

      {/* Filters */}
      <Card className="shadow-card border-border">
        <CardContent className="pt-4 pb-4">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <SlidersHorizontal className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Filter
              </span>
            </div>

            <Select
              value={sourceFilter}
              onValueChange={(v) => setSourceFilter(v as SourceFilter)}
            >
              <SelectTrigger
                className="w-40"
                data-ocid="registry.source_filter"
              >
                <SelectValue placeholder="Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Sources</SelectItem>
                <SelectItem value="iNaturalist">iNaturalist</SelectItem>
                <SelectItem value="community">Community</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={statusFilter}
              onValueChange={(v) => setStatusFilter(v as StatusFilter)}
            >
              <SelectTrigger className="w-44" data-ocid="registry.select">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Potentially Active">
                  Potentially Active
                </SelectItem>
                <SelectItem value="Abandoned">Abandoned</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={threatFilter}
              onValueChange={(v) => setThreatFilter(v as ThreatFilter)}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Threat Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Threats</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Moderate">Moderate</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative flex-1 min-w-48">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search ID, location, notes..."
                className="pl-8 text-sm"
                data-ocid="registry.search_input"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="shadow-card border-border">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table data-ocid="registry.table">
              <TableHeader>
                <TableRow className="bg-[oklch(0.93_0.025_155)] hover:bg-[oklch(0.91_0.025_155)]">
                  <TableHead className="text-xs font-semibold uppercase tracking-wider w-24">
                    ID
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider">
                    Location
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider hidden sm:table-cell">
                    Source
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider">
                    Status
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider">
                    Threat
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider hidden md:table-cell">
                    Land Use
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider hidden lg:table-cell">
                    Documented
                  </TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="py-12 text-center text-muted-foreground"
                      data-ocid="registry.empty_state"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Search className="w-8 h-8 opacity-30" />
                        <p className="text-sm">
                          No burrow records match your current filters.
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((b, i) => (
                    <TableRow
                      key={b.id}
                      className="hover:bg-[oklch(0.95_0.015_85)] cursor-pointer"
                      data-ocid={`registry.row.item.${i + 1}`}
                    >
                      <TableCell className="font-mono text-xs font-bold text-[oklch(var(--primary))]">
                        {b.id}
                      </TableCell>
                      <TableCell className="text-sm max-w-[220px]">
                        <span className="line-clamp-2">
                          {b.locationDescription}
                        </span>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
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
                      <TableCell className="text-xs text-muted-foreground hidden md:table-cell">
                        {b.landUse}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground hidden lg:table-cell">
                        {b.dateDocumented}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <button
                            type="button"
                            onClick={() => setViewTarget(b)}
                            className="p-1.5 rounded hover:bg-[oklch(0.90_0.030_155)] text-[oklch(var(--secondary))]"
                            title="View details"
                            data-ocid={`registry.edit_button.${i + 1}`}
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          {adminEnabled && b.source !== "iNaturalist" && (
                            <button
                              type="button"
                              onClick={() => handleEdit(b)}
                              className="p-1.5 rounded hover:bg-[oklch(0.90_0.030_155)] text-[oklch(var(--secondary))]"
                              title="Edit record"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* View Detail Dialog */}
      <Dialog
        open={!!viewTarget}
        onOpenChange={(open) => {
          if (!open) setViewTarget(null);
        }}
      >
        <DialogContent className="max-w-lg" data-ocid="registry.dialog">
          {viewTarget && (
            <>
              <DialogHeader>
                <DialogTitle className="text-[oklch(var(--primary))]">
                  {viewTarget.id}
                </DialogTitle>
                <p className="text-xs text-muted-foreground">
                  Documented by {viewTarget.documentedBy} on{" "}
                  {viewTarget.dateDocumented}
                </p>
              </DialogHeader>
              <div className="space-y-3">
                <p className="text-sm">{viewTarget.locationDescription}</p>
                <div className="flex flex-wrap gap-2">
                  <StatusBadge status={viewTarget.status} />
                  <ThreatBadge level={viewTarget.threatLevel} />
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[oklch(0.92_0.020_155)] text-[oklch(0.35_0.040_155)] border border-[oklch(0.78_0.030_155)]">
                    {viewTarget.landUse}
                  </span>
                  {viewTarget.source === "iNaturalist" &&
                    viewTarget.inatUrl && (
                      <a
                        href={viewTarget.inatUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[oklch(0.90_0.08_250)] text-[oklch(0.35_0.10_250)] border border-[oklch(0.75_0.08_250)] hover:opacity-80"
                      >
                        View on iNaturalist <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                </div>
                <div className="text-xs text-muted-foreground font-mono">
                  {viewTarget.latitude.toFixed(5)},{" "}
                  {viewTarget.longitude.toFixed(5)}
                </div>
                {viewTarget.photoFilename && (
                  <img
                    src={viewTarget.photoFilename}
                    alt="Burrow observation"
                    className="rounded-md max-h-48 object-cover border border-border w-full"
                  />
                )}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {viewTarget.notes}
                </p>
                <p className="text-xs text-muted-foreground">
                  Last verified: {viewTarget.lastVerified}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

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
