import Link from "next/link";
import { SearchControls } from "@/features/search/components/SearchControls";
import { MANCHESTER_PROPERTIES } from "@/data/manchester-properties";
import { getOverallMarketSnapshot, getPriceDelta } from "@/lib/market/marketCalculations";
import { getTopLevelMarketInsight } from "@/lib/market/interpretation";

const snapshot = getOverallMarketSnapshot();
const topInsight = getTopLevelMarketInsight(snapshot);
const marketStance =
  snapshot.differencePercent > 4
    ? "Current market stance: stretched and softening; negotiate firmly on over-ask stock."
    : snapshot.differencePercent < -2
      ? "Current market stance: value-led and firming; act quickly on strong-fit properties."
      : "Current market stance: balanced and steady; decide on quality, then negotiate precisely.";
const listings = MANCHESTER_PROPERTIES.slice(0, 3).map((property) => {
  const delta = getPriceDelta(property);
  return {
    id: property.id,
    displayPrice: `£${property.price.toLocaleString()}`,
    daysOnMarket: property.daysOnMarket,
    marketValueLabel: delta.label,
    marketValueDiffPercent: delta.differencePercent,
  };
});

function formatMoney(value: number): string {
  return `£${value.toLocaleString()}`;
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <main className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-5">
        <header className="mb-6">
          <h1 className="text-base font-medium tracking-tight text-stone-800">Mattsnoop</h1>
          <p className="mt-0.5 text-sm text-stone-600">Property cost and local market intelligence</p>
        </header>

        <section className="mb-5 rounded-sm border border-stone-200/90 bg-white/70 px-3.5 py-3">
          <p className="text-sm font-semibold text-stone-800">{marketStance}</p>
          <p className="mt-1 text-xs text-stone-600">{topInsight}</p>
        </section>

        <section className="mb-5">
          <h2 className="mb-2.5 text-xs font-medium uppercase tracking-wider text-stone-500">Assess</h2>
          <div className="rounded-sm border border-stone-200/90 bg-white/70 p-3">
            <SearchControls initialQuery="" initialIntent="buy" />
          </div>
        </section>

        <section className="mt-5">
          <h2 className="mb-2.5 text-xs font-medium uppercase tracking-wider text-stone-500">
            Manchester & Salford Market Snapshot
          </h2>
          <div className="grid gap-2 sm:grid-cols-3">
            <div className="rounded-sm border border-stone-200/90 bg-white/70 px-3 py-2.5">
              <p className="text-xs text-stone-500">Average sold price</p>
              <p className="mt-0.5 text-sm font-medium text-stone-800">
                {formatMoney(snapshot.averageSoldPrice)}
              </p>
            </div>
            <div className="rounded-sm border border-stone-200/90 bg-white/70 px-3 py-2.5">
              <p className="text-xs text-stone-500">Average asking price</p>
              <p className="mt-0.5 text-sm font-medium text-stone-800">
                {formatMoney(snapshot.averageListingPrice)}
              </p>
            </div>
            <div className="rounded-sm border border-stone-200/90 bg-white/70 px-3 py-2.5">
              <p className="text-xs text-stone-500">Difference</p>
              <p className="mt-0.5 text-sm font-medium text-stone-800">
                {snapshot.differencePercent > 0 ? "+" : ""}
                {snapshot.differencePercent.toFixed(1)}%
              </p>
            </div>
          </div>
        </section>

        <section className="mt-5">
          <h2 className="mb-2.5 text-xs font-medium uppercase tracking-wider text-stone-500">Sample listings</h2>
          <div className="space-y-2">
            {listings.map((listing) => (
              <Link
                key={listing.id}
                href={`/property/${listing.id}?intent=buy`}
                className="block rounded-sm border border-stone-200/90 bg-white/70 px-3 py-2 text-xs transition-colors hover:border-stone-300/80"
              >
                <span className="font-medium text-stone-800">{listing.displayPrice}</span>
                <span className="text-stone-500"> · </span>
                <span className="text-stone-600">{listing.daysOnMarket ?? 0} days</span>
                <span className="text-stone-500"> · </span>
                <span className="text-stone-600">
                  {listing.marketValueLabel ?? "In line"}{" "}
                  {listing.marketValueDiffPercent != null
                    ? `(${listing.marketValueDiffPercent > 0 ? "+" : ""}${listing.marketValueDiffPercent.toFixed(1)}%)`
                    : ""}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <p className="mt-5 text-left text-[11px] text-stone-400">Based on local data</p>
      </main>
    </div>
  );
}
