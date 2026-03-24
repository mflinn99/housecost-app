"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import type { SearchIntent } from "@/types";

export interface SearchControlsProps {
  initialQuery?: string;
  initialIntent?: SearchIntent;
  compact?: boolean;
  onCloseByClick?: () => void;
  showCloseBy?: boolean;
}

export function SearchControls(props: SearchControlsProps) {
  const {
    initialQuery = "",
    initialIntent = "rent",
    compact = false,
    onCloseByClick,
    showCloseBy = true,
  } = props;

  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [intent, setIntent] = useState<SearchIntent>(initialIntent);

  useEffect(() => {
    setQuery(initialQuery);
    setIntent(initialIntent);
  }, [initialQuery, initialIntent]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    const params = new URLSearchParams({ intent });
    if (trimmed) params.set("q", trimmed);
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
    router.push(`/search?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSearch} className="space-y-3">
      <Input
        type="text"
        placeholder="Manchester, Salford or M postcode"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="h-9 rounded border-stone-300/90 text-sm"
        autoFocus={!compact}
      />
      <div className="flex items-center gap-3">
        <div className="flex rounded border border-stone-200/90 bg-stone-50/50 p-0.5">
          <button
            type="button"
            onClick={() => setIntent("rent")}
            className={`rounded px-2.5 py-1 text-[11px] font-medium transition-colors ${
              intent === "rent"
                ? "bg-white text-stone-800 shadow-sm"
                : "text-stone-500 hover:text-stone-700"
            }`}
          >
            Rent
          </button>
          <button
            type="button"
            onClick={() => setIntent("buy")}
            className={`rounded px-2.5 py-1 text-[11px] font-medium transition-colors ${
              intent === "buy"
                ? "bg-white text-stone-800 shadow-sm"
                : "text-stone-500 hover:text-stone-700"
            }`}
          >
            Buy
          </button>
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="h-8 rounded border border-stone-300/90 bg-stone-800 px-3 text-[11px] font-medium text-stone-50 hover:bg-stone-700"
          >
            Assess
          </button>
          {showCloseBy && (
            <button
              type="button"
              onClick={handleCloseBy}
              className="h-8 rounded border border-stone-200/90 bg-transparent px-3 text-[11px] font-medium text-stone-600 hover:bg-stone-50 hover:text-stone-800"
            >
              Compare nearby
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
