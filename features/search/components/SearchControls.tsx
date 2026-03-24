"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import type { SearchIntent } from "@/types";

export interface SearchControlsProps {
  initialQuery?: string;
  initialIntent?: SearchIntent;
  initialMaxBudget?: number;
  compact?: boolean;
  onCloseByClick?: () => void;
  showCloseBy?: boolean;
}

export function SearchControls(props: SearchControlsProps) {
  const {
    initialQuery = "",
    initialIntent = "rent",
    initialMaxBudget,
    compact = false,
    onCloseByClick,
    showCloseBy = true,
  } = props;

  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [intent, setIntent] = useState<SearchIntent>(initialIntent);
  const [maxBudget, setMaxBudget] = useState(initialMaxBudget != null ? String(initialMaxBudget) : "");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setQuery(initialQuery);
    setIntent(initialIntent);
    setMaxBudget(initialMaxBudget != null ? String(initialMaxBudget) : "");
  }, [initialQuery, initialIntent, initialMaxBudget]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    const budgetValue = Number(maxBudget);
    if (!trimmed) {
      setError("Enter a location to search.");
      return;
    }
    if (!maxBudget.trim() || Number.isNaN(budgetValue) || budgetValue <= 0) {
      setError(intent === "buy" ? "Enter a valid property budget." : "Enter a valid monthly budget.");
      return;
    }
    setError(null);
    const params = new URLSearchParams({ intent });
    params.set("q", trimmed);
    params.set("maxBudget", String(Math.round(budgetValue)));
    router.push(`/search?${params.toString()}`);
  }

  function handleCloseBy() {
    if (typeof onCloseByClick === "function") {
      onCloseByClick();
      return;
    }
    const params = new URLSearchParams({ intent, mode: "nearby" });
    const trimmed = query.trim();
    if (trimmed) params.set("q", trimmed);
    if (maxBudget.trim()) params.set("maxBudget", maxBudget.trim());
    router.push(`/search?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSearch} className="space-y-3">
      <div className={compact ? "grid gap-2 sm:grid-cols-2" : "grid gap-2 sm:grid-cols-3"}>
        <div className="rounded-sm border border-stone-200/90 bg-white/70 px-2.5 py-2">
          <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-stone-500">Step 1 · Mode</p>
          <div className="flex rounded border border-stone-200/90 bg-stone-50/50 p-0.5">
            <button
              type="button"
              onClick={() => setIntent("buy")}
              className={`flex-1 rounded px-2.5 py-1 text-[11px] font-medium transition-colors ${
                intent === "buy"
                  ? "bg-white text-stone-800 shadow-sm"
                  : "text-stone-500 hover:text-stone-700"
              }`}
            >
              Buy
            </button>
            <button
              type="button"
              onClick={() => setIntent("rent")}
              className={`flex-1 rounded px-2.5 py-1 text-[11px] font-medium transition-colors ${
                intent === "rent"
                  ? "bg-white text-stone-800 shadow-sm"
                  : "text-stone-500 hover:text-stone-700"
              }`}
            >
              Rent
            </button>
          </div>
        </div>

        <div className="rounded-sm border border-stone-200/90 bg-white/70 px-2.5 py-2">
          <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-stone-500">Step 2 · Location</p>
          <Input
            type="text"
            placeholder="Manchester, Salford, postcode"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-9 rounded border-stone-300/90 text-sm"
            autoFocus={!compact}
          />
        </div>

        <div className="rounded-sm border border-stone-200/90 bg-white/70 px-2.5 py-2">
          <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-stone-500">
            Step 3 · {intent === "buy" ? "Budget" : "Monthly budget"}
          </p>
          <Input
            type="number"
            inputMode="numeric"
            min={0}
            placeholder={intent === "buy" ? "e.g. 300000" : "e.g. 1600"}
            value={maxBudget}
            onChange={(e) => setMaxBudget(e.target.value)}
            className="h-9 rounded border-stone-300/90 text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="submit"
          className="h-9 rounded-sm border border-stone-300/90 bg-stone-800 px-4 text-xs font-semibold tracking-wide text-stone-50 hover:bg-stone-700"
        >
          Step 4 · Search
        </button>
        {showCloseBy && (
          <button
            type="button"
            onClick={handleCloseBy}
            className="h-9 rounded-sm border border-stone-200/90 bg-transparent px-3 text-[11px] font-medium text-stone-600 hover:bg-stone-50 hover:text-stone-800"
          >
            Compare nearby
          </button>
        )}
      </div>
      {error && <p className="text-xs text-rose-600">{error}</p>}
    </form>
  );
}
