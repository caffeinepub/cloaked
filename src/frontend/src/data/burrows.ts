export type BurrowStatus = "Active" | "Potentially Active" | "Abandoned";
export type ThreatLevel = "Low" | "Moderate" | "High";
export type LandUse =
  | "NASA-KSC"
  | "SpaceX"
  | "Patrick SFB"
  | "Private Development"
  | "Harris/L3T"
  | "Northrop Grumman"
  | "Collins Aerospace"
  | "Melbourne Airport Area"
  | "Other";

export type BurrowSource = "iNaturalist" | "community";

export interface Burrow {
  id: string;
  locationDescription: string;
  latitude: number;
  longitude: number;
  status: BurrowStatus;
  threatLevel: ThreatLevel;
  landUse: LandUse;
  dateDocumented: string;
  lastVerified: string;
  notes: string;
  photoFilename?: string;
  documentedBy: string;
  source?: BurrowSource;
  inatUrl?: string;
}

// Start with no seed data -- real records come from iNaturalist API + community reports
export const INITIAL_BURROWS: Burrow[] = [];
