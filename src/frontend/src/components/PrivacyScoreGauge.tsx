import { useEffect, useRef } from "react";

interface PrivacyScoreGaugeProps {
  score: number;
  size?: number;
}

export function PrivacyScoreGauge({
  score,
  size = 200,
}: PrivacyScoreGaugeProps) {
  const circleRef = useRef<SVGCircleElement>(null);
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeWidth = 12;
  const center = size / 2;

  const clampedScore = Math.min(100, Math.max(0, score));
  const offset = circumference - (clampedScore / 100) * circumference;

  // Forest green for good, amber for mid, neon cyan/red for danger
  const getColor = (s: number) => {
    if (s >= 70) return "oklch(0.46 0.14 145)"; // forest green — protected
    if (s >= 40) return "oklch(0.62 0.14 62)"; // amber — some exposure
    return "oklch(0.60 0.24 25)"; // red-danger — high exposure
  };

  const getPersona = (s: number) => {
    if (s >= 80) return "Fully Cloaked";
    if (s >= 60) return "Well Protected";
    if (s >= 40) return "Some Exposure";
    if (s >= 20) return "Cloak Thinning";
    return "Exposed";
  };

  const accentColor = getColor(clampedScore);

  useEffect(() => {
    const circle = circleRef.current;
    if (!circle) return;
    circle.style.strokeDashoffset = String(offset);
  }, [offset]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          role="img"
          aria-label="Privacy score gauge"
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          style={{ transform: "rotate(-90deg)" }}
        >
          {/* Background track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="oklch(0.24 0.03 58)"
            strokeWidth={strokeWidth}
          />
          {/* Score arc */}
          <circle
            ref={circleRef}
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={accentColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            style={{
              transition:
                "stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1), stroke 0.6s ease",
            }}
          />
        </svg>
        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-fraunces font-bold leading-none"
            style={{ fontSize: size * 0.22, color: accentColor }}
          >
            {clampedScore}
          </span>
          <span className="text-xs text-muted-foreground mt-1 font-figtree">
            / 100
          </span>
        </div>
      </div>
      <span
        className="text-sm font-medium font-figtree"
        style={{ color: accentColor }}
      >
        {getPersona(clampedScore)}
      </span>
    </div>
  );
}
