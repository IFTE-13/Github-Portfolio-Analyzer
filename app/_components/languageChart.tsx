"use client";

import { Cell, Pie, PieChart, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Language } from "@/lib/types";

interface LanguageChartProps {
  languages: Language[];
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function LanguageChart({ languages }: LanguageChartProps) {
  // Take top 10 languages for the chart, group rest into "Other"
  const topLangs = languages.slice(0, 10);
  const otherLangs = languages.slice(10);

  const chartData = [...topLangs];
  if (otherLangs.length > 0) {
    const otherValue = otherLangs.reduce((sum, l) => sum + l.value, 0);
    const otherPercentage = otherLangs.reduce((sum, l) => sum + l.percentage, 0);
    chartData.push({
      name: "Other",
      value: otherValue,
      percentage: Math.round(otherPercentage * 10) / 10,
      color: "#6b7280",
    });
  }

  return (
    <Card className="border-border/40 bg-card/40 backdrop-blur-xs cyber-glow animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold tracking-tight text-foreground font-display">Language Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Donut Chart */}
          <div className="shrink-0">
            <PieChart width={220} height={220}>
              <Pie
                data={chartData}
                cx={110}
                cy={110}
                innerRadius={60}
                outerRadius={95}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const data = payload[0].payload as Language;
                  return (
                    <div className="rounded-lg border border-border/40 bg-popover/90 backdrop-blur-sm px-3 py-2 text-xs shadow-xl">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: data.color }}
                        />
                        <span className="font-bold text-foreground font-display">
                          {data.name}
                        </span>
                      </div>
                      <div className="text-muted-foreground font-sans">
                        {formatBytes(data.value)} · {data.percentage}%
                      </div>
                    </div>
                  );
                }}
              />
            </PieChart>
          </div>

          {/* Legend List */}
          <div className="flex-1 w-full font-sans">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {chartData.map((lang) => (
                <div
                  key={lang.name}
                  className="flex items-center justify-between gap-3 rounded-lg px-3 py-2 hover:bg-secondary/40 transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className="h-3 w-3 rounded-full shrink-0"
                      style={{ backgroundColor: lang.color }}
                    />
                    <span className="text-sm font-semibold text-foreground truncate font-display">
                      {lang.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-muted-foreground tabular-nums font-mono">
                      {formatBytes(lang.value)}
                    </span>
                    <span className="text-xs font-bold text-foreground tabular-nums w-12 text-right">
                      {lang.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}