import { useEffect, useState } from "react";

const POSITIONS = [0, 1, 2, 3, 4, 5] as const;

function getVisitorCount(): number {
  const stored = localStorage.getItem("scgg_visitor_count");
  const count = stored ? Number.parseInt(stored, 10) : 0;
  return Number.isNaN(count) ? 0 : count;
}

export default function VisitorCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current = getVisitorCount();
    const alreadyCounted = sessionStorage.getItem("scgg_visited");
    if (!alreadyCounted) {
      current += 1;
      localStorage.setItem("scgg_visitor_count", String(current));
      sessionStorage.setItem("scgg_visited", "1");
    }
    setCount(current);
  }, []);

  const display = String(count).padStart(6, "0");

  return (
    <div
      className="flex flex-col items-center gap-1 py-4"
      data-ocid="visitor.counter"
    >
      <p
        className="text-xs uppercase"
        style={{
          color: "#8a7a5a",
          fontFamily: "monospace",
          letterSpacing: "0.15em",
        }}
      >
        you are visitor
      </p>
      <div
        style={{
          background: "#0a0a0a",
          border: "2px inset #333",
          boxShadow: "inset 0 2px 8px #000, 0 0 12px rgba(255, 80, 0, 0.15)",
          borderRadius: "4px",
          padding: "6px 14px",
          display: "flex",
          gap: "3px",
        }}
      >
        {POSITIONS.map((pos) => (
          <span
            key={pos}
            style={{
              fontFamily: '"Courier New", Courier, monospace',
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#ff4500",
              textShadow: "0 0 8px #ff4500, 0 0 2px #ff8c00",
              lineHeight: 1,
              width: "1.1ch",
              textAlign: "center",
              display: "inline-block",
            }}
          >
            {display[pos]}
          </span>
        ))}
      </div>
      <p
        className="text-xs"
        style={{ color: "#6b5c3e", fontFamily: "monospace" }}
      >
        ★ since 2026 ★
      </p>
    </div>
  );
}
