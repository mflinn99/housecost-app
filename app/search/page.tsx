"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SearchResultsClient } from "@/features/search/components/SearchResultsClient";

function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const intent = searchParams.get("intent") === "rent" ? "rent" : "buy";
  const mode = searchParams.get("mode") === "nearby" ? "nearby" : "search";
  const maxBudgetParam = searchParams.get("maxBudget");
  const maxBudget = maxBudgetParam ? Number(maxBudgetParam) : undefined;
  const initialMaxBudget =
    maxBudget != null && Number.isFinite(maxBudget) && maxBudget > 0 ? Math.round(maxBudget) : undefined;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <SearchResultsClient
        initialQuery={query}
        initialIntent={intent}
        initialMode={mode}
        initialMaxBudget={initialMaxBudget}
      />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-sm text-stone-500">Loading search...</p>
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  );
}
