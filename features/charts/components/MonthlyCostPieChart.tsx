"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

export interface CostSlice {
  name: string;
  value: number;
  color: string;
}

interface MonthlyCostPieChartProps {
  data: CostSlice[];
  totalLabel?: string;
}

const DEFAULT_COLORS = [
  "#57534e", // stone-600
  "#78716c", // stone-500
  "#a8a29e", // stone-400
  "#d6d3d1", // stone-300
  "#44403c", // stone-700
];

export function MonthlyCostPieChart({
  data,
  totalLabel = "Total",
}: MonthlyCostPieChartProps) {
  const chartData = data.map((d, i) => ({
    ...d,
    color: d.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length],
  }));

  const total = chartData.reduce((s, d) => s + d.value, 0);

  return (
    <div className="w-full" style={{ height: 240 }}>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
          >
            {chartData.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: unknown) => [`£${Number(value || 0).toFixed(0)}`, ""]}
            contentStyle={{
              border: "1px solid #e7e5e4",
              borderRadius: "8px",
              fontSize: "12px",
            }}
          />
          <Legend
            formatter={(value, entry) => (
              <span className="text-sm text-stone-600">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
      {total > 0 && (
        <p className="mt-2 text-center text-sm text-stone-500">
          {totalLabel}: £{total.toFixed(0)}/month
        </p>
      )}
    </div>
  );
}
