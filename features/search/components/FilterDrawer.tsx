"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { ListingFilters } from "@/types";

interface FilterDrawerProps {
  filters: ListingFilters;
  onChange: (filters: ListingFilters) => void;
  intent: "rent" | "buy";
}

export function FilterDrawer({ filters, onChange, intent }: FilterDrawerProps) {
  const [open, setOpen] = useState(false);

  const update = (key: keyof ListingFilters, value: unknown) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(!open)}
      >
        <SlidersHorizontal className="mr-2 h-4 w-4" />
        Filters
      </Button>
      {open && (
        <div className="mt-4 rounded-2xl border border-stone-200 bg-white p-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <label className="block">
              <span className="text-sm font-medium text-stone-700">Min budget</span>
              <input
                type="number"
                placeholder={intent === "rent" ? "£/m" : "£"}
                value={filters.minBudget ?? ""}
                onChange={(e) =>
                  update("minBudget", e.target.value ? Number(e.target.value) : undefined)
                }
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-stone-700">Max budget</span>
              <input
                type="number"
                placeholder={intent === "rent" ? "£/m" : "£"}
                value={filters.maxBudget ?? ""}
                onChange={(e) =>
                  update("maxBudget", e.target.value ? Number(e.target.value) : undefined)
                }
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-stone-700">Bedrooms</span>
              <select
                value={filters.bedrooms ?? ""}
                onChange={(e) =>
                  update("bedrooms", e.target.value ? Number(e.target.value) : undefined)
                }
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"
              >
                <option value="">Any</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4+</option>
              </select>
            </label>
            <label className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                checked={filters.parkingRequired ?? false}
                onChange={(e) => update("parkingRequired", e.target.checked)}
                className="rounded border-stone-300"
              />
              <span className="text-sm font-medium text-stone-700">Parking required</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
