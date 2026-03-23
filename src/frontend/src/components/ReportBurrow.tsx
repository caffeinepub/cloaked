import { Button } from "@/components/ui/button";
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
import { FileImage, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  onReport: (burrow: Burrow) => void;
  nextId: string;
}

const emptyForm = () => ({
  locationDescription: "",
  latitude: "",
  longitude: "",
  landUse: "Other" as LandUse,
  threatLevel: "Moderate" as ThreatLevel,
  status: "Active" as BurrowStatus,
  notes: "",
  reportedBy: "",
  photo: null as File | null,
});

export function ReportBurrow({ onReport, nextId }: Props) {
  const [form, setForm] = useState(emptyForm());
  const [submitting, setSubmitting] = useState(false);

  const set = <K extends keyof typeof form>(
    field: K,
    value: (typeof form)[K],
  ) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.locationDescription.trim()) {
      toast.error("Location description is required.");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 400));

    const burrow: Burrow = {
      id: nextId,
      locationDescription: form.locationDescription.trim(),
      latitude: form.latitude !== "" ? Number(form.latitude) : 0,
      longitude: form.longitude !== "" ? Number(form.longitude) : 0,
      status: form.status,
      threatLevel: form.threatLevel,
      landUse: form.landUse,
      dateDocumented: new Date().toISOString().slice(0, 10),
      lastVerified: new Date().toISOString().slice(0, 10),
      notes: form.notes.trim(),
      documentedBy: form.reportedBy.trim() || "Anonymous",
      photoFilename: form.photo ? form.photo.name : undefined,
    };

    onReport(burrow);
    toast.success(`Burrow ${nextId} reported — thank you for contributing!`);
    setForm(emptyForm());
    setSubmitting(false);
  };

  return (
    <div className="max-w-2xl space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-[oklch(var(--primary))] uppercase tracking-wide">
          Report a Burrow
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Community sightings · Melbourne &amp; Space Coast, FL
        </p>
      </div>

      {/* Info banner */}
      <div className="rounded-lg bg-[oklch(0.93_0.06_65)] border border-[oklch(0.82_0.08_65)] p-4">
        <div className="flex gap-3">
          <MapPin className="w-5 h-5 shrink-0 mt-0.5 text-[oklch(0.40_0.10_65)]" />
          <p className="text-sm text-[oklch(0.30_0.06_65)] leading-relaxed">
            <strong>See something? Say something.</strong> Document burrow
            sightings near development areas — especially on land held by large
            corporations. All data helps advocates and regulators ensure
            development is done responsibly.
          </p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
        data-ocid="report.panel"
      >
        {/* Location Description */}
        <div className="space-y-1.5">
          <Label htmlFor="r-loc">
            Location Description <span className="text-destructive">*</span>
          </Label>
          <Input
            id="r-loc"
            value={form.locationDescription}
            onChange={(e) => set("locationDescription", e.target.value)}
            placeholder="e.g. Scrub adjacent to Northrop Grumman north fence, Melbourne"
            required
            data-ocid="report.input"
          />
        </div>

        {/* Lat / Lon */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="r-lat">Latitude (optional)</Label>
            <Input
              id="r-lat"
              type="number"
              step="0.0001"
              value={form.latitude}
              onChange={(e) => set("latitude", e.target.value)}
              placeholder="28.0934"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="r-lon">Longitude (optional)</Label>
            <Input
              id="r-lon"
              type="number"
              step="0.0001"
              value={form.longitude}
              onChange={(e) => set("longitude", e.target.value)}
              placeholder="-80.6123"
            />
          </div>
        </div>

        {/* Land Use */}
        <div className="space-y-1.5">
          <Label>Land Use / Jurisdiction</Label>
          <Select
            value={form.landUse}
            onValueChange={(v) => set("landUse", v as LandUse)}
          >
            <SelectTrigger data-ocid="report.select">
              <SelectValue placeholder="Select land use" />
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
              <SelectItem value="Northrop Grumman">Northrop Grumman</SelectItem>
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

        {/* Threat + Status */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
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
          <div className="space-y-1.5">
            <Label>Burrow Status</Label>
            <Select
              value={form.status}
              onValueChange={(v) => set("status", v as BurrowStatus)}
            >
              <SelectTrigger>
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
        </div>

        {/* Notes */}
        <div className="space-y-1.5">
          <Label htmlFor="r-notes">Notes / Observations</Label>
          <Textarea
            id="r-notes"
            value={form.notes}
            onChange={(e) => set("notes", e.target.value)}
            rows={4}
            placeholder="Describe what you observed: burrow size, tortoise activity, nearby construction, vegetation, any immediate threats..."
            data-ocid="report.textarea"
          />
        </div>

        {/* Reported By */}
        <div className="space-y-1.5">
          <Label htmlFor="r-by">Reported By</Label>
          <Input
            id="r-by"
            value={form.reportedBy}
            onChange={(e) => set("reportedBy", e.target.value)}
            placeholder="Your name or initials (optional)"
          />
          <p className="text-xs text-muted-foreground">
            Leave blank to report anonymously.
          </p>
        </div>

        {/* Photo */}
        <div className="space-y-1.5">
          <Label htmlFor="r-photo">Photo (optional)</Label>
          <div className="flex items-center gap-3">
            <label
              htmlFor="r-photo"
              className="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-md border border-border bg-card text-sm hover:bg-muted transition-colors"
              data-ocid="report.upload_button"
            >
              <FileImage className="w-4 h-4 text-[oklch(0.40_0.10_65)]" />
              {form.photo ? form.photo.name : "Choose image..."}
            </label>
            <input
              id="r-photo"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => set("photo", e.target.files?.[0] ?? null)}
            />
            {form.photo && (
              <button
                type="button"
                onClick={() => set("photo", null)}
                className="text-xs text-muted-foreground hover:text-destructive"
              >
                Remove
              </button>
            )}
          </div>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={submitting}
          className="w-full bg-[oklch(var(--primary))] text-[oklch(var(--primary-foreground))] gap-2"
          data-ocid="report.submit_button"
        >
          <Send className="w-4 h-4" />
          {submitting ? "Submitting..." : "Submit Burrow Report"}
        </Button>
      </form>
    </div>
  );
}
