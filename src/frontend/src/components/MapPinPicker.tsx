import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Props {
  onPin: (lat: number, lng: number) => void;
  pinned: { lat: number; lng: number } | null;
}

const LEAFLET_CSS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
const LEAFLET_JS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";

function loadLeaflet(): Promise<void> {
  return new Promise((resolve, reject) => {
    if ((window as any).L) {
      resolve();
      return;
    }
    if (!document.querySelector(`link[href="${LEAFLET_CSS}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = LEAFLET_CSS;
      document.head.appendChild(link);
    }
    const existing = document.querySelector(`script[src="${LEAFLET_JS}"]`);
    if (!existing) {
      const script = document.createElement("script");
      script.src = LEAFLET_JS;
      script.onload = () => resolve();
      script.onerror = reject;
      document.head.appendChild(script);
    } else {
      const interval = setInterval(() => {
        if ((window as any).L) {
          clearInterval(interval);
          resolve();
        }
      }, 50);
    }
  });
}

export function MapPinPicker({ onPin, pinned }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const roRef = useRef<ResizeObserver | null>(null);
  const [ready, setReady] = useState(false);
  const [pinDropped, setPinDropped] = useState(false);

  const onPinRef = useRef(onPin);
  onPinRef.current = onPin;

  useEffect(() => {
    let cancelled = false;
    loadLeaflet().then(() => {
      if (cancelled || !containerRef.current || mapRef.current) return;

      const L = (window as any).L;
      (L.Icon.Default.prototype as any)._getIconUrl = undefined;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(containerRef.current, {
        center: [28.2, -80.7],
        zoom: 9,
        zoomControl: true,
        // Disable animations that can cause blank tile flashes on mobile
        fadeAnimation: false,
        markerZoomAnimation: false,
      });
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      const ro = new ResizeObserver(() => {
        if (mapRef.current) mapRef.current.invalidateSize({ animate: false });
      });
      ro.observe(containerRef.current);
      roRef.current = ro;

      setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Update marker when pinned changes -- NO panTo to avoid tile flash
  useEffect(() => {
    if (!mapRef.current) return;
    const L = (window as any).L;
    if (!L) return;
    if (markerRef.current) {
      markerRef.current.remove();
      markerRef.current = null;
    }
    if (pinned) {
      markerRef.current = L.marker([pinned.lat, pinned.lng]).addTo(
        mapRef.current,
      );
      // Do NOT call panTo -- it triggers tile reload and causes the beige flash
    }
  }, [pinned]);

  useEffect(() => {
    return () => {
      roRef.current?.disconnect();
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  const handleDropPin = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!mapRef.current || !ready) return;
    const center = mapRef.current.getCenter();
    onPinRef.current(center.lat, center.lng);
    setPinDropped(true);
  };

  return (
    <div className="space-y-2">
      {/* Instruction */}
      <p className="text-sm text-muted-foreground">
        Pan and zoom the map to the burrow location, then tap{" "}
        <strong>Drop Pin Here</strong>.
      </p>

      {/* Map container with crosshair overlay */}
      <div className="relative" style={{ WebkitTouchCallout: "none" }}>
        <div
          ref={containerRef}
          className="h-[300px] md:h-[360px] rounded-lg overflow-hidden border border-border"
          style={{ touchAction: "pan-x pan-y", userSelect: "none" }}
          data-ocid="report.canvas_target"
        />
        {/* Crosshair centered on map */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ zIndex: 1000 }}
        >
          <div className="relative">
            {/* Horizontal line */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-px w-8 h-0.5 bg-red-500 opacity-80" />
            {/* Vertical line */}
            <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-px w-0.5 h-8 bg-red-500 opacity-80" />
            {/* Center dot */}
            <div className="w-2 h-2 rounded-full bg-red-500 opacity-90" />
          </div>
        </div>
      </div>

      {/* Drop Pin button */}
      <button
        type="button"
        disabled={!ready}
        onClick={handleDropPin}
        onTouchEnd={handleDropPin}
        className="w-full gap-2 inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-[oklch(0.40_0.10_65)] hover:bg-[oklch(0.35_0.10_65)] text-white disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          touchAction: "manipulation",
          WebkitTouchCallout: "none",
          userSelect: "none",
        }}
      >
        <MapPin className="w-4 h-4 mr-1" />
        {pinDropped ? "Pin Dropped! Tap to Move" : "Drop Pin Here"}
      </button>

      {/* Pinned coords */}
      {pinned ? (
        <p className="text-xs font-mono text-[oklch(0.40_0.10_65)]">
          Pinned: {pinned.lat.toFixed(5)}, {pinned.lng.toFixed(5)}
        </p>
      ) : (
        <p className="text-xs text-muted-foreground">No pin placed yet.</p>
      )}
    </div>
  );
}
