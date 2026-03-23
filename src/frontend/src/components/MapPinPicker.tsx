import { useEffect, useRef } from "react";

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
    if (!document.querySelector(`script[src="${LEAFLET_JS}"]`)) {
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

  const onPinRef = useRef(onPin);
  onPinRef.current = onPin;

  useEffect(() => {
    let cancelled = false;

    loadLeaflet().then(() => {
      if (cancelled || !containerRef.current) return;
      if (mapRef.current) return;

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
        // Disable Leaflet's built-in tap handler — we handle touch manually
        tap: false,
        zoomControl: true,
      });

      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      // Handle desktop click
      map.on("click", (e: any) => {
        if (!e.latlng) return;
        onPinRef.current(e.latlng.lat, e.latlng.lng);
      });

      // Handle mobile touch — use touchend to avoid long-press triggering browser menus
      const container = containerRef.current;

      let touchStartTime = 0;
      let moved = false;

      const onTouchStart = (e: TouchEvent) => {
        if (e.touches.length !== 1) return;
        touchStartTime = Date.now();
        moved = false;
      };

      const onTouchMove = () => {
        moved = true;
      };

      const onTouchEnd = (e: TouchEvent) => {
        if (moved) return; // user was panning the map
        const elapsed = Date.now() - touchStartTime;
        if (elapsed > 600) return; // long-press — ignore, let browser handle it

        e.preventDefault();
        e.stopPropagation();

        const touch = e.changedTouches[0];
        const rect = container!.getBoundingClientRect();
        const point = map.containerPointToLatLng(
          L.point(touch.clientX - rect.left, touch.clientY - rect.top),
        );
        onPinRef.current(point.lat, point.lng);
      };

      const onContextMenu = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
      };

      container.addEventListener("touchstart", onTouchStart, { passive: true });
      container.addEventListener("touchmove", onTouchMove, { passive: true });
      container.addEventListener("touchend", onTouchEnd, { passive: false });
      container.addEventListener("contextmenu", onContextMenu);

      const ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          if (width > 0 && height > 0 && mapRef.current) {
            mapRef.current.invalidateSize({ animate: false });
          }
        }
      });
      ro.observe(container);
      roRef.current = ro;
    });

    return () => {
      cancelled = true;
    };
  }, []);

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

  return (
    <div className="space-y-1.5">
      <div
        ref={containerRef}
        className="h-[300px] md:h-[360px] rounded-lg overflow-hidden border border-border"
        style={{
          cursor: "crosshair",
          // Prevent browser from stealing touch events (prevents blank page on long-press)
          touchAction: "pan-x pan-y",
          WebkitTouchCallout: "none" as any,
          WebkitUserSelect: "none" as any,
          userSelect: "none",
        }}
        data-ocid="report.canvas_target"
      />
      <p className="text-xs text-muted-foreground">
        Tap once on the map to drop a pin. Pinch or use + / − to zoom.
        {pinned ? (
          <span className="ml-2 font-mono text-[oklch(0.40_0.10_65)]">
            Pinned: {pinned.lat.toFixed(5)}, {pinned.lng.toFixed(5)}
          </span>
        ) : (
          <span className="ml-2 text-[oklch(0.50_0.10_65)] font-semibold">
            No pin placed yet — tap anywhere on the map.
          </span>
        )}
      </p>
    </div>
  );
}
