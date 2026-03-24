"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export interface TrendPoint {
  month: string;
  price: number;
  label?: string;
}

interface PriceTrendLineChartProps {
  data: TrendPoint[];
  height?: number;
}

export function PriceTrendLineChart({
  data,
  height = 200,
}: PriceTrendLineChartProps) {
  return (
    <div className="w-full" style={{ height: `${height}px` }}>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: "#78716c" }}
            stroke="#a8a29e"
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#78716c" }}
            stroke="#a8a29e"
            tickFormatter={(v) => `£${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip
            formatter={(value: unknown) => [`£${Number(value || 0).toLocaleString()}`, "Price"]}
            contentStyle={{
              border: "1px solid #e7e5e4",
              borderRadius: "8px",
              fontSize: "12px",
            }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#57534e"
            strokeWidth={2}
            dot={{ fill: "#57534e", r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
