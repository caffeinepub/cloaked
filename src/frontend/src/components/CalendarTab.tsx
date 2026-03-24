import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  COLD_WEATHER_CROPS,
  HOT_WEATHER_CROPS,
  MONTHS,
  YEAR_ROUND_CROPS,
} from "@/data/calendarData";
import {
  ChevronLeft,
  ChevronRight,
  CloudRain,
  Sprout,
  Sun,
  Wrench,
} from "lucide-react";
import { useState } from "react";

export default function CalendarTab() {
  const currentMonth = new Date().getMonth();
  const [monthIndex, setMonthIndex] = useState(currentMonth);

  const data = MONTHS[monthIndex];

  const prev = () => setMonthIndex((i) => (i - 1 + 12) % 12);
  const next = () => setMonthIndex((i) => (i + 1) % 12);

  return (
    <div className="space-y-6">
      {/* Month selector */}
      <div className="card-texture rounded-xl p-6 text-center shadow-sm">
        <div className="flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={prev}
            className="month-nav-btn"
            aria-label="Previous month"
            data-ocid="calendar.pagination_prev"
          >
            <ChevronLeft className="w-4 h-4 text-primary" />
          </button>

          <div>
            <h2 className="font-display text-5xl sm:text-6xl font-bold text-primary leading-none">
              {data.month}
            </h2>
            <div className="flex justify-center gap-2 mt-2 flex-wrap">
              {MONTHS.map((m, i) => (
                <button
                  type="button"
                  key={m.shortMonth}
                  onClick={() => setMonthIndex(i)}
                  className={`text-xs font-sans px-1 py-0.5 rounded transition-colors ${
                    i === monthIndex
                      ? "text-primary font-semibold border-b-2 border-accent"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  data-ocid="calendar.tab"
                >
                  {m.shortMonth}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={next}
            className="month-nav-btn"
            aria-label="Next month"
            data-ocid="calendar.pagination_next"
          >
            <ChevronRight className="w-4 h-4 text-primary" />
          </button>
        </div>

        <p className="mt-4 text-sm text-muted-foreground font-sans italic max-w-xl mx-auto">
          {data.season}
        </p>
      </div>

      {/* 4 sections grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* In Season */}
        <Card className="card-texture border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base font-display">
              <Sun className="w-5 h-5 icon-season" />
              <span className="text-foreground">What&apos;s in Season</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1.5">
              {data.inSeason.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm font-sans text-foreground/90"
                >
                  <span className="icon-season mt-0.5 text-base leading-none">
                    ●
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Plant Now */}
        <Card className="card-texture border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base font-display">
              <Sprout className="w-5 h-5 icon-plant" />
              <span className="text-foreground">Plant Now</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1.5">
              {data.plantNow.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm font-sans text-foreground/90"
                >
                  <span className="icon-plant mt-0.5 text-base leading-none">
                    ●
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Weather & Pests */}
        <Card className="card-texture border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base font-display">
              <CloudRain className="w-5 h-5 icon-weather" />
              <span className="text-foreground">Weather &amp; Pests</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-sans text-foreground/90 leading-relaxed">
              {data.weatherPests}
            </p>
          </CardContent>
        </Card>

        {/* Maintenance */}
        <Card className="card-texture border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base font-display">
              <Wrench className="w-5 h-5 icon-maintenance" />
              <span className="text-foreground">Maintenance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1.5">
              {data.maintenance.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm font-sans text-foreground/90"
                >
                  <span className="icon-maintenance mt-0.5 text-base leading-none">
                    ●
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Crop reference */}
      <div className="space-y-3">
        <h3 className="font-display text-xl font-semibold text-foreground">
          Crop Reference Guide
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="card-texture border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-display text-destructive">
                Hot Weather Crops
              </CardTitle>
              <p className="text-xs text-muted-foreground font-sans">
                Plant April – August
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1">
                {HOT_WEATHER_CROPS.map((c) => (
                  <Badge
                    key={c}
                    variant="outline"
                    className="text-xs font-sans border-destructive/40 text-destructive/80"
                  >
                    {c}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="card-texture border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-display text-primary">
                Cool Weather Crops
              </CardTitle>
              <p className="text-xs text-muted-foreground font-sans">
                Plant October – February
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1">
                {COLD_WEATHER_CROPS.map((c) => (
                  <Badge
                    key={c}
                    variant="outline"
                    className="text-xs font-sans border-primary/40 text-primary/80"
                  >
                    {c}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="card-texture border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle
                className="text-sm font-display"
                style={{ color: "oklch(0.68 0.128 68)" }}
              >
                Year Round
              </CardTitle>
              <p className="text-xs text-muted-foreground font-sans">
                Florida perennials &amp; reliables
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1">
                {YEAR_ROUND_CROPS.map((c) => (
                  <Badge
                    key={c}
                    variant="outline"
                    className="text-xs font-sans"
                    style={{
                      borderColor: "oklch(0.68 0.128 68 / 0.4)",
                      color: "oklch(0.55 0.1 68)",
                    }}
                  >
                    {c}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
