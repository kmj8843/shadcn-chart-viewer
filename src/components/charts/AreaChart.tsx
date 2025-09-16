"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CurveType } from "recharts/types/shape/Curve";
import { useState } from "react";
import { Input } from "../ui/input";

export const description = "A simple area chart";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function ChartAreaDefault({
  type = "natural",
  grid = false,
  axis = false,
  axis_key = null,
  legend = false,
  tooltip = false,
}: {
  type?: string;
  grid?: boolean;
  axis?: boolean;
  axis_key?: string | null;
  legend?: boolean;
  tooltip?: boolean;
}) {
  const [editTitle, setEditTitle] = useState(false);
  const [title, setTitle] = useState("Chart");

  const [editDescription, setEditDescription] = useState(false);
  const [description, setDescription] = useState("Double click to edit");

  const [editFooter1, setEditFooter1] = useState(false);
  const [footer1, setFooter1] = useState("Double click to edit");

  const [editFooter2, setEditFooter2] = useState(false);
  const [footer2, setFooter2] = useState("Double click to edit");

  return (
    <Card className="w-full">
      <CardHeader>
        {editTitle ? (
          <Input
            type="text"
            value={title}
            className="leading-none font-semibold"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => setEditTitle(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setEditTitle(false);
              }
            }}
          />
        ) : (
          <CardTitle
            onDoubleClick={() => {
              setEditTitle(true);
            }}
          >
            {title}
          </CardTitle>
        )}
        {editDescription ? (
          <Input
            type="text"
            value={description}
            className="text-muted-foreground text-sm"
            autoFocus
            onChange={(e) => setDescription(e.target.value)}
            onBlur={() => setEditDescription(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setEditDescription(false);
              }
            }}
          />
        ) : (
          <CardDescription
            onDoubleClick={() => {
              setEditDescription(true);
            }}
          >
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
            className="max-w-[600px] max-h-[600px]"
          >
            {grid && <CartesianGrid vertical={false} />}
            {axis && axis_key && (
              <XAxis
                dataKey={axis_key}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
            )}
            {tooltip && (
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
            )}
            {legend && <ChartLegend content={<ChartLegendContent />} />}
            <Area
              dataKey="desktop"
              type={
                !type || type === "default" ? "natural" : (type as CurveType)
              }
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            {editFooter1 ? (
              <Input
                type="text"
                value={footer1}
                className="flex items-center gap-2 leading-none font-medium"
                autoFocus
                onChange={(e) => setFooter1(e.target.value)}
                onBlur={() => setEditFooter1(false)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setEditFooter1(false);
                  }
                }}
              />
            ) : (
              <div
                className="flex items-center gap-2 leading-none font-medium"
                onDoubleClick={() => setEditFooter1(true)}
              >
                {footer1}
              </div>
            )}

            {editFooter2 ? (
              <Input
                type="text"
                value={footer2}
                className="text-muted-foreground flex items-center gap-2 leading-none"
                autoFocus
                onChange={(e) => setFooter2(e.target.value)}
                onBlur={() => setEditFooter2(false)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setEditFooter2(false);
                  }
                }}
              />
            ) : (
              <div
                className="text-muted-foreground flex items-center gap-2 leading-none"
                onDoubleClick={() => setEditFooter2(true)}
              >
                {footer2}
              </div>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
