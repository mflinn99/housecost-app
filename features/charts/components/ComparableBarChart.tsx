"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export interface DistributionBar {
  band: string;
  count: number;
}

interface ComparableBarChartProps {
  data: DistributionBar[];
  height?: number;
}

export function ComparableBarChart({
  data,
  height = 180,
}: ComparableBarChartProps) {
  return (
    <div className="w-full" style={{ height: `${height}px` }}>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
          <XAxis
            dataKey="band"
            tick={{ fontSize: 10, fill: "#78716c" }}
            stroke="#a8a29e"
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#78716c" }}
            stroke="#a8a29e"
          />
          <Tooltip
            contentStyle={{
              border: "1px solid #e7e5e4",
              borderRadius: "8px",
              fontSize: "12px",
            }}
          />
          <Bar dataKey="count" fill="#57534e" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
