export type BurrowStatus = "Active" | "Potentially Active" | "Abandoned";
export type ThreatLevel = "Low" | "Moderate" | "High";
export type LandUse =
  | "NASA-KSC"
  | "SpaceX"
  | "Patrick SFB"
  | "Private Development"
  | "Other";

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
}

export const INITIAL_BURROWS: Burrow[] = [
  {
    id: "SCB-001",
    locationDescription:
      "North Merritt Island scrub, near SR-406 corridor, open sandy upland",
    latitude: 28.6284,
    longitude: -80.7209,
    status: "Active",
    threatLevel: "High",
    landUse: "NASA-KSC",
    dateDocumented: "2024-03-12",
    lastVerified: "2025-01-08",
    notes:
      "Active burrow with fresh sand apron. Located 40m from proposed access road expansion. Tortoise observed at entrance at 07:45.",
    documentedBy: "R. Alvarez",
  },
  {
    id: "SCB-002",
    locationDescription:
      "Cape Canaveral AFS south scrub, fence line buffer zone",
    latitude: 28.4594,
    longitude: -80.5623,
    status: "Active",
    threatLevel: "Moderate",
    landUse: "Patrick SFB",
    dateDocumented: "2024-04-05",
    lastVerified: "2024-12-15",
    notes:
      "Two burrows within 10m of each other. Apron clear, sand fresh. Scrub vegetation intact around site.",
    documentedBy: "T. Washington",
  },
  {
    id: "SCB-003",
    locationDescription:
      "Boca Chica scrubland, east of SpaceX Starbase staging area",
    latitude: 28.5326,
    longitude: -80.6812,
    status: "Active",
    threatLevel: "High",
    landUse: "SpaceX",
    dateDocumented: "2024-06-20",
    lastVerified: "2025-02-10",
    notes:
      "Burrow cluster of 3 burrows within 200m radius. Heavy equipment staging nearby. Site flagged for immediate monitoring.",
    documentedBy: "M. Chen",
  },
  {
    id: "SCB-004",
    locationDescription:
      "Titusville scrub preserve adjacent, residential development boundary",
    latitude: 28.5929,
    longitude: -80.8287,
    status: "Potentially Active",
    threatLevel: "High",
    landUse: "Private Development",
    dateDocumented: "2024-07-14",
    lastVerified: "2024-11-22",
    notes:
      "Burrow entrance partially obstructed with debris. Possible tortoise activity sign but no direct observation. Developer ground-clearing scheduled Q1 2026.",
    documentedBy: "R. Alvarez",
  },
  {
    id: "SCB-005",
    locationDescription:
      "Merritt Island NWR southern unit, palmetto flatwoods opening",
    latitude: 28.5147,
    longitude: -80.7034,
    status: "Active",
    threatLevel: "Low",
    landUse: "Other",
    dateDocumented: "2024-02-28",
    lastVerified: "2025-01-30",
    notes:
      "Healthy burrow in protected NWR land. No immediate development threat. Tortoise seen basking. Part of long-term monitoring transect.",
    documentedBy: "S. Patel",
  },
  {
    id: "SCB-006",
    locationDescription:
      "Palm Bay scrub corridor, utility easement sandy ridge",
    latitude: 28.0345,
    longitude: -80.6712,
    status: "Abandoned",
    threatLevel: "Low",
    landUse: "Private Development",
    dateDocumented: "2023-09-10",
    lastVerified: "2024-10-05",
    notes:
      "Burrow collapsed at entrance, no fresh sand, vegetation encroachment. Likely abandoned 12-18 months. Area historically had scrub jay nesting as well.",
    documentedBy: "T. Washington",
  },
  {
    id: "SCB-007",
    locationDescription:
      "Cocoa Beach north barrier island scrub remnant, behind coastal dune",
    latitude: 28.3621,
    longitude: -80.6089,
    status: "Potentially Active",
    threatLevel: "Moderate",
    landUse: "Private Development",
    dateDocumented: "2024-08-03",
    lastVerified: "2025-01-17",
    notes:
      "Small scrub patch between resort and A1A. Burrow entrance clear but no direct tortoise observation in last 3 visits. Condominium construction nearby.",
    documentedBy: "M. Chen",
  },
  {
    id: "SCB-008",
    locationDescription:
      "Kennedy Space Center LC-39 area scrub buffer, open sand flats",
    latitude: 28.6082,
    longitude: -80.6042,
    status: "Active",
    threatLevel: "Moderate",
    landUse: "NASA-KSC",
    dateDocumented: "2024-05-18",
    lastVerified: "2025-02-28",
    notes:
      "Multiple burrows in scrub buffer zone between launch complex and vehicle assembly building road. Tortoise observed at 2 of 4 burrows. KSC wildlife staff notified.",
    documentedBy: "S. Patel",
  },
  {
    id: "SCB-009",
    locationDescription:
      "Canaveral Groves scrubland, agricultural edge transitioning to development",
    latitude: 28.4833,
    longitude: -80.7958,
    status: "Active",
    threatLevel: "High",
    landUse: "Private Development",
    dateDocumented: "2024-09-25",
    lastVerified: "2025-01-05",
    notes:
      "Burrow on parcel approved for warehousing development. FWC relocation permit pending. Burrow well-formed with large apron, estimated adult tortoise.",
    documentedBy: "R. Alvarez",
  },
  {
    id: "SCB-010",
    locationDescription:
      "Malabar Scrub Sanctuary east parcel, sandhill transition zone",
    latitude: 28.0089,
    longitude: -80.6234,
    status: "Active",
    threatLevel: "Low",
    landUse: "Other",
    dateDocumented: "2024-01-15",
    lastVerified: "2025-03-01",
    notes:
      "Protected sanctuary parcel. Multiple healthy burrows, gopher frog observed near burrow 3. No development threat. Ideal reference site for comparison monitoring.",
    documentedBy: "S. Patel",
  },
];
