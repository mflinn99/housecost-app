"use client";

import { Card } from "@/components/ui/Card";
import { getMockAreaIntelligence } from "@/services/providers/mock-area";
import { ComparableBarChart, type DistributionBar } from "@/features/charts";
import { VibeScoreCard } from "@/features/vibe-score/VibeScoreCard";
import type { GeoLocation, TransportInfo } from "@/types";
import { getAreaBenchmark } from "@/data/localBenchmarks";

interface AreaIntelligenceProps {
  location?: GeoLocation;
  transport?: TransportInfo;
  parking?: string;
  postcodeDistrict?: string;
  amenitiesChartData?: DistributionBar[];
}

export function AreaIntelligence({
  location,
  transport,
  parking,
  postcodeDistrict,
  amenitiesChartData,
}: AreaIntelligenceProps) {
  const area = getMockAreaIntelligence(location, transport);
  const benchmark = getAreaBenchmark(postcodeDistrict);
  const { demographics, amenities, scores, sportsVenues, eventVenues, eventActivityLevel, localHighlights, areaSummary } =
    area;

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

      <VibeScoreCard area={area} parking={parking as "driveway" | "on_street" | "permit" | "garage" | "none" | undefined} />

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

      {localHighlights && (
        <Card>
          <h2 className="text-lg font-semibold">What&apos;s nearby</h2>
          <p className="mt-1 text-xs text-stone-500">Local highlights by category</p>
          <div className="mt-4 space-y-4">
            {localHighlights.foodAndDrink && (
              <div>
                <p className="text-sm font-medium text-stone-700">{localHighlights.foodAndDrink.name}</p>
                <p className="text-sm text-stone-600">{localHighlights.foodAndDrink.summary}</p>
                {localHighlights.foodAndDrink.examples && (
                  <p className="mt-1 text-xs text-stone-500">
                    {localHighlights.foodAndDrink.examples.join(" · ")}
                  </p>
                )}
              </div>
            )}
            {localHighlights.thingsToDo && (
              <div>
                <p className="text-sm font-medium text-stone-700">{localHighlights.thingsToDo.name}</p>
                <p className="text-sm text-stone-600">{localHighlights.thingsToDo.summary}</p>
              </div>
            )}
            {localHighlights.entertainment && (
              <div>
                <p className="text-sm font-medium text-stone-700">{localHighlights.entertainment.name}</p>
                <p className="text-sm text-stone-600">{localHighlights.entertainment.summary}</p>
              </div>
            )}
            {localHighlights.outdoorSpaces && (
              <div>
                <p className="text-sm font-medium text-stone-700">{localHighlights.outdoorSpaces.name}</p>
                <p className="text-sm text-stone-600">{localHighlights.outdoorSpaces.summary}</p>
              </div>
            )}
          </div>
        </Card>
      )}

      {(sportsVenues || eventVenues || eventActivityLevel) && (
        <Card>
          <h2 className="text-lg font-semibold">Lifestyle & events</h2>
          <p className="mt-1 text-xs text-stone-500">Sports, venues, event activity</p>
          <div className="mt-4 space-y-3">
            {eventActivityLevel && (
              <div>
                <p className="text-sm text-stone-600">Event activity level</p>
                <p className="font-medium capitalize">{eventActivityLevel}</p>
              </div>
            )}
            {sportsVenues && (
              <div>
                <p className="text-sm text-stone-600">Sports venues nearby</p>
                <p className="text-stone-900">{sportsVenues.count} within radius</p>
                {sportsVenues.nearest && (
                  <p className="text-xs text-stone-500">
                    Nearest: {sportsVenues.nearest.name} ({sportsVenues.nearest.walkMinutes} min walk)
                  </p>
                )}
              </div>
            )}
            {eventVenues && (
              <div>
                <p className="text-sm text-stone-600">Event venues nearby</p>
                <p className="text-stone-900">{eventVenues.count} within radius</p>
                {eventVenues.nearest && (
                  <p className="text-xs text-stone-500">
                    Nearest: {eventVenues.nearest.name} ({eventVenues.nearest.walkMinutes} min walk)
                  </p>
                )}
              </div>
            )}
          </div>
        </Card>
      )}

      <Card>
        <h2 className="text-lg font-semibold">Amenities nearby</h2>
        <ComparableBarChart data={amenitiesBars} height={160} />
      </Card>

      <Card>
        <h2 className="text-lg font-semibold">Demographics</h2>
        <p className="mt-1 text-xs text-stone-500">Estimated for area</p>
        <div className="mt-4 space-y-4">
          <div>
            <p className="text-sm text-stone-600">Average age</p>
            <p className="font-medium">{demographics.averageAge}</p>
          </div>
          <div>
            <p className="text-sm text-stone-600">Renters</p>
            <p className="font-medium">{Math.round(demographics.renterVsOwnerRatio * 100)}%</p>
          </div>
          <div>
            <p className="text-sm text-stone-600">Household types</p>
            <ul className="mt-1 space-y-1 text-sm">
              {demographics.householdTypes.map((h) => (
                <li key={h.type} className="flex justify-between">
                  <span>{h.type}</span>
                  <span>{h.percent}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
