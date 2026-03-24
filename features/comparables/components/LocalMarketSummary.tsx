"use client";

import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/utils";
import { PriceTrendLineChart, ComparableBarChart } from "@/features/charts";
import type { ComparableSummary } from "@/types";

interface LocalMarketSummaryProps {
  summary: ComparableSummary;
  intent: "rent" | "buy";
  trendData?: { month: string; price: number }[];
  distributionData?: { band: string; count: number }[];
}

export function LocalMarketSummary({
  summary,
  intent,
  trendData,
  distributionData,
}: LocalMarketSummaryProps) {
  const priceLabel = intent === "rent" ? "Avg rent (pcm)" : "Avg asking price";

  return (
    <Card>
      <h2 className="text-lg font-semibold">Local market (6 months)</h2>
      <p className="mt-1 text-xs text-stone-500">Similar nearby properties</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <p className="text-sm text-stone-600">{priceLabel}</p>
          <p className="text-lg font-semibold">
            {formatCurrency(intent === "rent" ? (summary.averageRent ?? summary.averagePrice) : summary.averagePrice)}
          </p>
        </div>
        <div>
          <p className="text-sm text-stone-600">Trend</p>
          <p className="capitalize text-stone-900">{summary.priceTrend}</p>
        </div>
        {summary.avgDaysOnMarket != null && (
          <div>
            <p className="text-sm text-stone-600">Avg days on market</p>
            <p className="text-stone-900">{summary.avgDaysOnMarket}</p>
          </div>
        )}
        {summary.reducedPriceFrequency != null && (
          <div>
            <p className="text-sm text-stone-600">Reduced price frequency</p>
            <p className="text-stone-900">{summary.reducedPriceFrequency}%</p>
          </div>
        )}
      </div>
      {trendData && trendData.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-stone-600">Price trend</p>
          <PriceTrendLineChart data={trendData} height={160} />
        </div>
      )}
      {distributionData && distributionData.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-stone-600">Comparable distribution</p>
          <ComparableBarChart data={distributionData} height={160} />
        </div>
      )}
      <p className="mt-3 text-xs text-stone-500">
        Estimate from comparable data. Subject to availability.
      </p>
    </Card>
  );
}
