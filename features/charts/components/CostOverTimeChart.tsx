"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export interface CostOverTimePoint {
  year: number;
  mortgage?: number;
  rent?: number;
}

interface CostOverTimeChartProps {
  data: CostOverTimePoint[];
  height?: number;
}

export function CostOverTimeChart({
  data,
  height = 220,
}: CostOverTimeChartProps) {
  return (
    <div className="w-full" style={{ height: `${height}px` }}>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 11, fill: "#78716c" }}
            stroke="#a8a29e"
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#78716c" }}
            stroke="#a8a29e"
            tickFormatter={(v) => `£${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip
            formatter={(value: unknown) => [`£${Number(value || 0).toLocaleString()}`, ""]}
            contentStyle={{
              border: "1px solid #e7e5e4",
              borderRadius: "8px",
              fontSize: "12px",
            }}
          />
          <Legend />
          {data.some((d) => d.mortgage != null) && (
            <Line
              type="monotone"
              dataKey="mortgage"
              name="Mortgage (annual)"
              stroke="#57534e"
              strokeWidth={2}
              dot={{ fill: "#57534e", r: 3 }}
            />
          )}
          {data.some((d) => d.rent != null) && (
            <Line
              type="monotone"
              dataKey="rent"
              name="Rent (annual)"
              stroke="#78716c"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={{ fill: "#78716c", r: 3 }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
