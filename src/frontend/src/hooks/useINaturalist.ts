import type { Burrow, LandUse } from "@/data/burrows";
import { useEffect, useState } from "react";

interface INatPhoto {
  url: string;
}

interface INatObservation {
  id: number;
  observed_on: string;
  place_guess: string | null;
  description: string | null;
  location: string | null; // "lat,lng"
  quality_grade: string;
  user: { login: string; name: string | null };
  photos: INatPhoto[];
  uri: string;
}

function guessLandUse(place: string): LandUse {
  const p = place.toLowerCase();
  if (p.includes("kennedy") || p.includes("ksc") || p.includes("nasa"))
    return "NASA-KSC";
  if (p.includes("spacex") || p.includes("canaveral")) return "SpaceX";
  if (p.includes("patrick")) return "Patrick SFB";
  if (p.includes("harris") || p.includes("l3t") || p.includes("palm bay"))
    return "Harris/L3T";
  if (p.includes("northrop")) return "Northrop Grumman";
  if (p.includes("collins")) return "Collins Aerospace";
  if (p.includes("melbourne airport") || p.includes("mlb"))
    return "Melbourne Airport Area";
  return "Other";
}

export function useINaturalistBurrows() {
  const [data, setData] = useState<Burrow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchObservations() {
      try {
        // Space Coast + Melbourne bounding box
        const params = new URLSearchParams({
          taxon_name: "Gopherus polyphemus",
          swlat: "27.8",
          swlng: "-81.2",
          nelat: "28.8",
          nelng: "-80.3",
          per_page: "100",
          quality_grade: "research",
          order_by: "observed_on",
          order: "desc",
        });

        const res = await fetch(
          `https://api.inaturalist.org/v1/observations?${params}`,
        );
        if (!res.ok) throw new Error(`iNaturalist API returned ${res.status}`);

        const json = await res.json();
        if (cancelled) return;

        const burrows: Burrow[] = (json.results as INatObservation[])
          .filter((obs) => obs.location)
          .map((obs) => {
            const [lat, lng] = (obs.location as string).split(",").map(Number);
            const place = obs.place_guess ?? `Observation ${obs.id}`;
            // iNaturalist photo URLs: replace "square" with "medium" for better quality
            const photoUrl = obs.photos?.[0]?.url?.replace("square", "medium");
            return {
              id: `iNat-${obs.id}`,
              locationDescription: place,
              latitude: lat,
              longitude: lng,
              status: "Active" as const,
              threatLevel: "Moderate" as const,
              landUse: guessLandUse(place),
              dateDocumented: obs.observed_on ?? "",
              lastVerified: obs.observed_on ?? "",
              notes:
                obs.description ??
                "Research-grade gopher tortoise observation from iNaturalist.",
              documentedBy: obs.user.name ?? obs.user.login,
              photoFilename: photoUrl,
              source: "iNaturalist" as const,
              inatUrl: obs.uri,
            };
          });

        setData(burrows);
      } catch (err) {
        if (!cancelled) {
          setError(String(err));
          console.warn("iNaturalist fetch failed:", err);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchObservations();
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}
