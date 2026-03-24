"use client";

import { cn } from "@/lib/utils";

const RADIUS_OPTIONS = [0.25, 0.5, 1, 2, 3, 5] as const;

interface RadiusSliderProps {
  value: number;
  onChange: (km: number) => void;
  className?: string;
}

export function RadiusSlider({ value, onChange, className }: RadiusSliderProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-stone-700">Within</span>
        <span className="text-sm font-semibold text-stone-900">
          {value} km
        </span>
      </div>
      <div className="flex gap-2">
        {RADIUS_OPTIONS.map((km) => (
          <button
            key={km}
            type="button"
            onClick={() => onChange(km)}
            className={cn(
              "rounded-lg px-3 py-2 text-sm font-medium transition",
              value === km
                ? "bg-stone-900 text-white"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
            )}
          >
            {km}km
          </button>
        ))}
      </div>
    </div>
  );
}
