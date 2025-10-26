"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface Language {
  name: string;
  value: number;
}

interface LanguageBarChartProps {
  languages: Language[];
}

const chartConfig = {
  value: {
    label: "Bytes",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function LanguageBarChart({ languages }: LanguageBarChartProps) {
  const chartData = languages.map((lang) => ({
    name: lang.name,
    value: lang.value,
  }));

  return (
    <Card className="w-full max-w-5xl mx-auto font-tomorrow">
      <CardHeader className="px-4">
        <CardTitle className="text-lg sm:text-xl">Language Distribution</CardTitle>
        <CardDescription className="text-sm sm:text-base">
          Bytes of code per language
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4 md:px-12">
        <ChartContainer
          config={chartConfig}
          className="h-[300px] sm:h-[400px] lg:h-[500px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 20,
              right: 10,
              top: 10,
              bottom: 10,
            }}
          >
            <XAxis
              type="number"
              dataKey="value"
              hide={false}
              stroke="hsl(var(--foreground))"
              tick={{
                fill: "hsl(var(--foreground))",
                fontFamily: "var(--font-tomorrow), monospace",
                fontSize: "12px",
              }}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
            />
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              tickMargin={8}
              axisLine={false}
              tickFormatter={(value) => (value.length > 12 ? `${value.slice(0, 12)}...` : value)}
              tick={{
                fill: "hsl(var(--foreground))",
                fontFamily: "var(--font-tomorrow), monospace",
                fontSize: "12px",
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel formatter={(value) => `${value} bytes`} />}
            />
            <Bar dataKey="value" fill="hsl(var(--color-value))" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}