"use client";

import { Card } from "@/components/ui/Card";
import { getMockAreaIntelligence } from "@/services/providers/mock-area";
import { ComparableBarChart, type DistributionBar } from "@/features/charts";
import type { GeoLocation, TransportInfo } from "@/types";
import { getAreaBenchmark } from "@/data/localBenchmarks";

interface AreaIntelligenceProps {
  location?: GeoLocation;
  transport?: TransportInfo;
  postcodeDistrict?: string;
  amenitiesChartData?: DistributionBar[];
}

export function AreaIntelligence({
  location,
  transport,
  postcodeDistrict,
  amenitiesChartData,
}: AreaIntelligenceProps) {
  const area = getMockAreaIntelligence(location, transport);
  const benchmark = getAreaBenchmark(postcodeDistrict);
  const { amenities, scores, areaSummary } = area;

  const amenitiesBars: DistributionBar[] =
    amenitiesChartData ??
    [
      { band: "Bars", count: amenities.bars },
      { band: "Restaurants", count: amenities.restaurants },
      { band: "Cafes", count: amenities.cafes },
      { band: "Supermarkets", count: amenities.supermarkets },
      { band: "Gyms", count: amenities.gyms },
      ...(amenities.takeaways ? [{ band: "Takeaways" as const, count: amenities.takeaways }] : []),
      ...(amenities.parks ? [{ band: "Parks" as const, count: amenities.parks }] : []),
    ];

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-lg font-semibold">{benchmark.area} intelligence note</h2>
        <div className="mt-3 space-y-1 text-sm text-stone-700">
          <p>Pricing snapshot: avg asking {`£${benchmark.averagePrice.toLocaleString()}`}.</p>
          <p>Market direction: {benchmark.marketTrendDirection}.</p>
          <p>
            Leverage: {benchmark.buyerLeverage === "buyer" ? "buyer leverage" : benchmark.buyerLeverage === "seller" ? "seller leverage" : "balanced leverage"}.
          </p>
          <p className="text-stone-600">
            What this means: prioritize local sold comparables before committing on price.
          </p>
        </div>
      </Card>

      {areaSummary && (
        <Card>
          <h2 className="text-lg font-semibold">Area snapshot</h2>
          <p className="mt-3 text-stone-700">{areaSummary}</p>
        </Card>
      )}

      <Card>
        <h2 className="text-lg font-semibold">Area scores</h2>
        <p className="mt-1 text-xs text-stone-500">Within 1–2km. Estimate based on local data.</p>
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-stone-600">Lifestyle</p>
            <p className="text-2xl font-semibold">{scores.lifestyle}/10</p>
            <p className="text-xs text-stone-500">Bars, restaurants, cafes</p>
          </div>
          <div>
            <p className="text-sm text-stone-600">Convenience</p>
            <p className="text-2xl font-semibold">{scores.convenience}/10</p>
            <p className="text-xs text-stone-500">Transport, shops</p>
          </div>
          <div>
            <p className="text-sm text-stone-600">Quietness</p>
            <p className="text-2xl font-semibold">{scores.quietness}/10</p>
            <p className="text-xs text-stone-500">Lower density</p>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-lg font-semibold">Amenities context</h2>
        <ComparableBarChart data={amenitiesBars} height={160} />
      </Card>
    </div>
  );
}
