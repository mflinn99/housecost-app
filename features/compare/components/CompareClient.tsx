"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronUp, ChevronDown, Download } from "lucide-react";
import { getCompareList, removeFromCompare, reorderCompare } from "@/lib/storage";
import { getCompareListings } from "./actions";
import { Button } from "@/components/ui/Button";
import { getMockAreaIntelligence } from "@/services/providers/mock-area";
import { calculateVibeScore } from "@/features/vibe-score/vibe-engine";
import { useReportDownload } from "@/features/reports/useReportDownload";

export function CompareClient() {
  const [listingIds, setListingIds] = useState<string[]>([]);
  const [listings, setListings] = useState<Awaited<ReturnType<typeof getCompareListings>>>([]);

  const refresh = () => {
    setListingIds(getCompareList());
  };

  const handleRemove = (id: string) => {
    removeFromCompare(id);
    refresh();
  };

  const handleMoveUp = (index: number) => {
    if (index <= 0) return;
    const newOrder = [...listingIds];
    [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
    reorderCompare(newOrder);
    refresh();
  };

  const handleMoveDown = (index: number) => {
    if (index >= listingIds.length - 1) return;
    const newOrder = [...listingIds];
    [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    reorderCompare(newOrder);
    refresh();
  };

  const { downloadReport, isGenerating, error } = useReportDownload();
  const intent = listings.some((l) => l.priceType === "pcm") ? "rent" : "buy";

  const handleCompareUpdate = () => refresh();
  useEffect(() => {
    refresh();
    window.addEventListener("housecost-compare-update", handleCompareUpdate);
    return () => window.removeEventListener("housecost-compare-update", handleCompareUpdate);
  }, []);

  useEffect(() => {
    if (listingIds.length === 0) {
      setListings([]);
      return;
    }
    getCompareListings(listingIds).then(setListings);
  }, [listingIds.join(",")]);

  if (listings.length === 0) {
    return (
      <div className="mt-6 rounded-2xl border border-stone-200 bg-white p-12 text-center">
        <p className="text-stone-600">
          Add properties from search results to compare them side by side.
        </p>
        <Link href="/search">
          <Button className="mt-4">Start searching</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-lg font-medium">Comparing {listings.length} properties</h2>
        <Button
          onClick={() => downloadReport(listings, "Selected area", intent)}
          disabled={isGenerating}
        >
          <Download className="mr-2 h-4 w-4" />
          {isGenerating ? "Generating…" : "Download comparison report"}
        </Button>
      </div>
      {error && (
        <p className="text-sm text-rose-600">{error}</p>
      )}
    <div className="overflow-x-auto">
      <table className="w-full min-w-[600px] border-collapse">
        <thead>
          <tr className="border-b border-stone-200">
            <th className="p-4 text-left text-sm font-medium text-stone-600">Property</th>
            <th className="p-4 text-left text-sm font-medium text-stone-600">Price</th>
            <th className="p-4 text-left text-sm font-medium text-stone-600">Bedrooms</th>
            <th className="p-4 text-left text-sm font-medium text-stone-600">Transport</th>
            <th className="p-4 text-left text-sm font-medium text-stone-600">Parking</th>
            <th className="p-4 text-left text-sm font-medium text-stone-600">Vibe Score</th>
            <th className="p-4 text-left text-sm font-medium text-stone-600">Days</th>
            <th className="p-4"></th>
          </tr>
        </thead>
        <tbody>
          {listings.map((l, index) => {
            const area = getMockAreaIntelligence(l.location, l.transport);
            const vibe = calculateVibeScore(area, l.parking);
            return (
            <tr key={l.id} className="border-b border-stone-100">
              <td className="p-4">
                <Link
                  href={`/property/${l.id}?intent=${l.priceType === "pcm" ? "rent" : "buy"}`}
                  className="font-medium text-stone-900 hover:underline"
                >
                  {l.address}
                </Link>
              </td>
              <td className="p-4">{l.displayPrice}</td>
              <td className="p-4">{l.bedrooms ?? "—"}</td>
              <td className="p-4 text-sm text-stone-600">
                {l.transport?.nearestBus
                  ? `${l.transport.nearestBus.walkMinutes} min bus`
                  : l.transport?.nearestTrain
                    ? `${l.transport.nearestTrain.walkMinutes} min train`
                    : "—"}
              </td>
              <td className="p-4 capitalize text-stone-600">
                {l.parking?.replace("_", " ") ?? "—"}
              </td>
              <td className="p-4">
                <span className="font-medium">{vibe.score}</span>
                <span className="text-stone-500"> ({vibe.label})</span>
              </td>
              <td className="p-4">{l.daysOnMarket ?? "—"}</td>
              <td className="p-4">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleMoveUp(index)}
                    disabled={index === 0}
                    className="rounded p-1 text-stone-400 hover:bg-stone-100 hover:text-stone-700 disabled:opacity-30"
                    title="Move up"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMoveDown(index)}
                    disabled={index === listings.length - 1}
                    className="rounded p-1 text-stone-400 hover:bg-stone-100 hover:text-stone-700 disabled:opacity-30"
                    title="Move down"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemove(l.id)}
                    className="rounded p-1 text-sm text-stone-500 hover:text-rose-600"
                  >
                    Remove
                  </button>
                </div>
              </td>
            </tr>
          );
          })}
        </tbody>
      </table>
    </div>
    </div>
  );
}
