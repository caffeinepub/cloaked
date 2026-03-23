import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type {
  Burrow,
  BurrowStatus,
  LandUse,
  ThreatLevel,
} from "@/data/burrows";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (burrow: Burrow) => void;
  existing?: Burrow | null;
  nextId: string;
}

const emptyForm = (): Omit<Burrow, "id"> => ({
  locationDescription: "",
  latitude: 28.5,
  longitude: -80.7,
  status: "Active",
  threatLevel: "Low",
  landUse: "Other",
  dateDocumented: new Date().toISOString().slice(0, 10),
  lastVerified: new Date().toISOString().slice(0, 10),
  notes: "",
  documentedBy: "",
  photoFilename: "",
});

export function BurrowModal({
  open,
  onClose,
  onSave,
  existing,
  nextId,
}: Props) {
  const [form, setForm] = useState<Omit<Burrow, "id">>(
    existing ? { ...existing } : emptyForm(),
  );

  const handleOpen = (isOpen: boolean) => {
    if (isOpen) {
      setForm(existing ? { ...existing } : emptyForm());
    } else {
      onClose();
    }
  };

  const handleSave = () => {
    if (!form.locationDescription.trim()) return;
    onSave({ id: existing?.id ?? nextId, ...form });
    onClose();
  };

  const set = (field: keyof typeof form, value: string | number) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogContent
        className="max-w-2xl max-h-[90vh] overflow-y-auto"
        data-ocid="burrow.dialog"
      >
        <DialogHeader>
          <DialogTitle className="text-[oklch(var(--primary))]">
            {existing ? "Edit Burrow Record" : "Add New Burrow"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
          {/* Location Description */}
          <div className="md:col-span-2 space-y-1">
            <Label htmlFor="locDesc">Location Description *</Label>
            <Input
              id="locDesc"
              value={form.locationDescription}
              onChange={(e) => set("locationDescription", e.target.value)}
              placeholder="e.g. North Merritt Island scrub, near SR-406"
              data-ocid="burrow.input"
            />
          </div>

          {/* Lat / Lon */}
          <div className="space-y-1">
            <Label htmlFor="lat">Latitude</Label>
            <Input
              id="lat"
              type="number"
              step="0.0001"
              value={form.latitude}
              onChange={(e) =>
                set("latitude", Number.parseFloat(e.target.value))
              }
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="lon">Longitude</Label>
            <Input
              id="lon"
              type="number"
              step="0.0001"
              value={form.longitude}
              onChange={(e) =>
                set("longitude", Number.parseFloat(e.target.value))
              }
            />
          </div>

          {/* Status */}
          <div className="space-y-1">
            <Label>Status</Label>
            <Select
              value={form.status}
              onValueChange={(v) => set("status", v as BurrowStatus)}
            >
              <SelectTrigger data-ocid="burrow.select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Potentially Active">
                  Potentially Active
                </SelectItem>
                <SelectItem value="Abandoned">Abandoned</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Threat Level */}
          <div className="space-y-1">
            <Label>Threat Level</Label>
            <Select
              value={form.threatLevel}
              onValueChange={(v) => set("threatLevel", v as ThreatLevel)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Moderate">Moderate</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Land Use */}
          <div className="md:col-span-2 space-y-1">
            <Label>Land Use / Jurisdiction</Label>
            <Select
              value={form.landUse}
              onValueChange={(v) => set("landUse", v as LandUse)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NASA-KSC">NASA-KSC</SelectItem>
                <SelectItem value="SpaceX">SpaceX</SelectItem>
                <SelectItem value="Patrick SFB">Patrick SFB</SelectItem>
                <SelectItem value="Private Development">
                  Private Development
                </SelectItem>
                <SelectItem value="Harris/L3T">
                  Harris / L3T (Melbourne)
                </SelectItem>
                <SelectItem value="Northrop Grumman">
                  Northrop Grumman
                </SelectItem>
                <SelectItem value="Collins Aerospace">
                  Collins Aerospace
                </SelectItem>
                <SelectItem value="Melbourne Airport Area">
                  Melbourne Airport Area
                </SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Dates */}
          <div className="space-y-1">
            <Label htmlFor="dateDoc">Date Documented</Label>
            <Input
              id="dateDoc"
              type="date"
              value={form.dateDocumented}
              onChange={(e) => set("dateDocumented", e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="lastVer">Last Verified</Label>
            <Input
              id="lastVer"
              type="date"
              value={form.lastVerified}
              onChange={(e) => set("lastVerified", e.target.value)}
            />
          </div>

          {/* Documented By */}
          <div className="md:col-span-2 space-y-1">
            <Label htmlFor="docBy">Documented By</Label>
            <Input
              id="docBy"
              value={form.documentedBy}
              onChange={(e) => set("documentedBy", e.target.value)}
              placeholder="Name or initials"
            />
          </div>

          {/* Notes */}
          <div className="md:col-span-2 space-y-1">
            <Label htmlFor="notes">Notes / Observations</Label>
            <Textarea
              id="notes"
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              rows={4}
              placeholder="Describe burrow activity, surroundings, threats..."
              data-ocid="burrow.textarea"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            data-ocid="burrow.cancel_button"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-[oklch(var(--primary))] text-[oklch(var(--primary-foreground))]"
            data-ocid="burrow.save_button"
          >
            {existing ? "Save Changes" : "Add Burrow"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
