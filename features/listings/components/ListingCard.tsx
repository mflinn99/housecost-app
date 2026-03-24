"use client";

import Link from "next/link";
import { ExternalLink, Car, Bus, TramFront, Train } from "lucide-react";
import { BookmarkButton } from "./BookmarkButton";
import { CompareButton } from "./CompareButton";
import type { PropertyListing } from "@/types";
import { getMarketInterpretation } from "@/lib/market/interpretation";
import { getDecisionSignal } from "@/lib/market/decision";

interface ListingCardProps {
  listing: PropertyListing;
  searchQuery: string;
  searchIntent: "rent" | "buy";
}

function ParkingIcon({ type }: { type?: string }) {
  if (!type || type === "unknown" || type === "none") return null;
  return (
    <span className="inline-flex items-center gap-1 text-xs text-stone-500">
      <Car className="h-3.5 w-3.5" />
      {type.replace("_", " ")}
    </span>
  );
}

export function ListingCard({ listing, searchQuery, searchIntent }: ListingCardProps) {
  const href = `/property/${listing.id}?q=${encodeURIComponent(searchQuery)}&intent=${searchIntent}`;
  const valueDiff =
    listing.marketValueDiffPercent != null
      ? `${listing.marketValueDiffPercent > 0 ? "+" : ""}${listing.marketValueDiffPercent.toFixed(1)}%`
      : null;
  const marketInterpretation = getMarketInterpretation({
    marketValueDiffPercent: listing.marketValueDiffPercent,
    marketValueLabel: listing.marketValueLabel,
    daysOnMarket: listing.daysOnMarket,
    postcodeDistrict: listing.postcodeArea,
  });
  const decisionSignal = getDecisionSignal({
    postcodeDistrict: listing.postcodeArea,
    marketValueDiffPercent: listing.marketValueDiffPercent,
    daysOnMarket: listing.daysOnMarket,
  });
  const decisionToneClass =
    decisionSignal.actionLabel === "Act"
      ? "bg-emerald-50 text-emerald-700"
      : decisionSignal.actionLabel === "Negotiate"
        ? "bg-rose-50 text-rose-700"
        : decisionSignal.actionLabel === "Wait"
          ? "bg-stone-100 text-stone-600"
          : "bg-amber-50 text-amber-700";

  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded border border-stone-200/80 bg-white/80 transition-colors hover:border-stone-300/80"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
        <div
          className="absolute right-2 top-2 z-10 flex gap-1"
          onClick={(e) => e.stopPropagation()}
        >
          <BookmarkButton listing={listing} />
          <CompareButton listing={listing} />
        </div>
        {listing.mainImageUrl ? (
          <img
            src={listing.mainImageUrl}
            alt=""
            className="h-full w-full object-cover transition duration-200 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-stone-400 text-sm">
            No image
          </div>
        )}
      </div>
      <div className="p-2.5">
        <div className="flex items-center justify-between gap-2">
          <p className={`rounded px-1.5 py-0.5 text-[11px] font-semibold ${decisionToneClass}`}>
            {decisionSignal.actionLabel}
          </p>
          <ExternalLink className="h-3 w-3 shrink-0 text-stone-400 group-hover:text-stone-600" />
        </div>
        <p className="mt-1 text-[11px] text-stone-700 line-clamp-1">{marketInterpretation.sentence}</p>
        <p className="mt-0.5 text-[10px] text-stone-500">{decisionSignal.reasoning}</p>
        <p className="mt-1.5 text-sm font-medium text-stone-800">{listing.displayPrice}</p>
        {listing.postcodeArea && (
          <p className="mt-0.5 text-[11px] font-medium text-stone-500">{listing.postcodeArea}</p>
        )}
        <p className="mt-1 text-xs text-stone-500">
          {listing.daysOnMarket != null ? `${listing.daysOnMarket} days` : ""}
          {valueDiff ? ` · ${valueDiff} vs market` : ""}
        </p>
        <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[11px] text-stone-500">
          {listing.bedrooms != null && <span>{listing.bedrooms} bed</span>}
          {listing.propertyType && (
            <span className="capitalize">{listing.propertyType.replace("-", " ")}</span>
          )}
        </div>
        <p className="mt-0.5 text-[10px] text-stone-400">{listing.address}</p>
        <div className="mt-1.5 flex flex-wrap items-center gap-2">
          {listing.parking && listing.parking !== "unknown" && listing.parking !== "none" && (
            <ParkingIcon type={listing.parking} />
          )}
          {listing.transport?.nearestBus && (
            <span className="inline-flex items-center gap-1 text-xs text-stone-500">
              <Bus className="h-3.5 w-3.5" />
              {listing.transport.nearestBus.walkMinutes} min
            </span>
          )}
          {listing.transport?.nearestTrain && !listing.transport?.nearestBus && (
            <span className="inline-flex items-center gap-1 text-xs text-stone-500">
              <Train className="h-3.5 w-3.5" />
              {listing.transport.nearestTrain.walkMinutes} min
            </span>
          )}
          {listing.transport?.nearestTram && (
            <span className="inline-flex items-center gap-1 text-xs text-stone-500">
              <TramFront className="h-3.5 w-3.5" />
              {listing.transport.nearestTram.walkMinutes} min
            </span>
          )}
        </div>
        <p className="mt-1.5 text-[10px] text-stone-400">
          {listing.source}
        </p>
      </div>
    </Link>
  );
}
