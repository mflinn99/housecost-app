"use client";

import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import type { PropertyListing, SearchIntent } from "@/types";
import { Card } from "@/components/ui/Card";
import { CalculatorPanel } from "@/features/calculator/components/CalculatorPanel";
import { NegotiationBadge } from "./NegotiationBadge";
import { BookmarkButton } from "./BookmarkButton";
import { CompareButton } from "./CompareButton";
import { AreaIntelligence } from "@/features/area/components/AreaIntelligence";
import { calculateNegotiationScore } from "@/lib/calculations/negotiation-score";
import { getDecisionRecommendation } from "@/lib/market/decisionEngine";
import { formatCurrency } from "@/lib/utils";

interface PropertyDetailClientProps {
  listing: PropertyListing;
  searchQuery: string;
  searchIntent: SearchIntent;
}

export function PropertyDetailClient({
  listing,
  searchQuery,
  searchIntent,
}: PropertyDetailClientProps) {
  const negotiation = calculateNegotiationScore({
    listing,
    averageComparablePrice: listing.priceValue * 0.95,
    avgDaysOnMarket: 35,
  });
  const backHref = searchQuery
    ? `/search?q=${encodeURIComponent(searchQuery)}&intent=${searchIntent}`
    : "/";
  const decision = getDecisionRecommendation(listing);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href={backHref}
        className="mb-6 inline-flex items-center gap-2 text-sm text-stone-600 hover:text-stone-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to results
      </Link>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-stone-100">
            {listing.mainImageUrl ? (
              <img
                src={listing.mainImageUrl}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-stone-400">
                No image
              </div>
            )}
          </div>

          <Card>
            <h1 className="text-2xl font-semibold text-stone-900">
              {listing.title}
            </h1>
            <p className="mt-2 text-stone-600">{listing.address}</p>
            <p className="mt-2 text-xs text-stone-500">
              What is happening: local pricing signal and time-on-market.
            </p>
            <p className="mt-4 text-xl font-semibold">{listing.displayPrice}</p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-stone-600">
              {listing.bedrooms != null && <span>{listing.bedrooms} bed</span>}
              {listing.bathrooms != null && (
                <span>{listing.bathrooms} bath</span>
              )}
              {listing.propertyType && (
                <span className="capitalize">{listing.propertyType}</span>
              )}
              {listing.daysOnMarket != null && (
                <span>{listing.daysOnMarket} days on market</span>
              )}
              {listing.priceReduced && (
                <span className="text-amber-600">Price reduced</span>
              )}
            </div>
            <div className="mt-3">
              <NegotiationBadge
                likelihood={negotiation.likelihood}
                potentialMin={negotiation.potentialRangePercent?.min}
                potentialMax={negotiation.potentialRangePercent?.max}
              />
              <p className="mt-1 text-xs text-stone-500">
                Why it matters: similar local stock can trade differently by demand.
              </p>
            </div>
            <div className="mt-4 rounded-sm border border-stone-200/90 bg-stone-50/60 p-3">
              <p className="text-xs font-medium uppercase tracking-wider text-stone-500">Assessment output</p>
              <div className="mt-2 grid gap-2 text-sm text-stone-700 sm:grid-cols-2">
                <p>Estimated monthly ownership: {formatCurrency(decision.estimatedMonthlyOwnershipCost)}</p>
                <p>Affordability pressure: {decision.affordabilityPressure}</p>
                <p>Local price position: {decision.localPricePosition}</p>
                <p>Negotiation stance: {decision.negotiationStance}</p>
              </div>
              <p className="mt-2 text-sm font-medium text-stone-800">
                Recommendation: {decision.action} ({decision.confidence} confidence)
              </p>
              <p className="mt-1 text-xs text-stone-600">Why: {decision.rationale}</p>
              <p className="mt-1 text-xs text-stone-600">Next step: {decision.nextStep}</p>
              <p className="mt-1 text-[10px] text-stone-500">
                How this works: rule-based local benchmark model, not a valuation guarantee.
              </p>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <BookmarkButton listing={listing} />
              <CompareButton listing={listing} />
              <Link
                href={`/search?mode=nearby&q=${encodeURIComponent(listing.address.split(",")[1]?.trim() || listing.address)}&intent=${searchIntent}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-stone-700 hover:text-stone-900"
              >
                <MapPin className="h-4 w-4" />
                Compare nearby options
              </Link>
              <a
                href={listing.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-stone-700 underline hover:text-stone-900"
              >
                Source listing
              </a>
            </div>
            <p className="mt-3 text-xs text-stone-600">
              What to do: use negotiation range, then compare nearby alternatives before offering.
            </p>
          </Card>
        </div>

        <div className="space-y-6">
          <CalculatorPanel listing={listing} intent={searchIntent} />
          {listing.transport && (
            <Card>
              <h2 className="text-lg font-semibold">Transport</h2>
              <ul className="mt-3 space-y-2 text-sm text-stone-600">
                {listing.transport.nearestBus && (
                  <li>
                    Bus: {listing.transport.nearestBus.name} —
                    {listing.transport.nearestBus.walkMinutes} min walk
                  </li>
                )}
                {listing.transport.nearestTram && (
                  <li>
                    Tram: {listing.transport.nearestTram.name} —
                    {listing.transport.nearestTram.walkMinutes} min walk
                  </li>
                )}
                {listing.transport.nearestTrain && (
                  <li>
                    Train: {listing.transport.nearestTrain.name} —
                    {listing.transport.nearestTrain.walkMinutes} min walk
                  </li>
                )}
              </ul>
            </Card>
          )}
          {listing.parking && (
            <Card>
              <h2 className="text-lg font-semibold">Parking</h2>
              <p className="mt-2 text-sm text-stone-600 capitalize">
                {listing.parking.replace("_", " ")}
              </p>
            </Card>
          )}
        </div>
      </div>

      <section className="mt-12">
        <h2 className="mb-6 text-xl font-semibold">Area intelligence</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <AreaIntelligence
            location={listing.location}
            transport={listing.transport}
            postcodeDistrict={listing.postcodeArea}
          />
        </div>
      </section>
    </div>
  );
}
