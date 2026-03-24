"use client";

import type { DiscountLikelihood } from "@/types";

interface NegotiationGaugeProps {
  likelihood: DiscountLikelihood;
  potentialMin?: number;
  potentialMax?: number;
}

const LIKELIHOOD_SCORE: Record<DiscountLikelihood, number> = {
  low: 1,
  medium: 2,
  high: 3,
};

const LIKELIHOOD_COLOR: Record<DiscountLikelihood, string> = {
  low: "#a8a29e",
  medium: "#d97706",
  high: "#059669",
};

export function NegotiationGauge({
  likelihood,
  potentialMin,
  potentialMax,
}: NegotiationGaugeProps) {
  const score = LIKELIHOOD_SCORE[likelihood];
  const percent = (score / 3) * 100;
  const color = LIKELIHOOD_COLOR[likelihood];

  return (
    <div className="space-y-2">
      <div className="flex h-2 w-full overflow-hidden rounded-full bg-stone-200">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${percent}%`, backgroundColor: color }}
        />
      </div>
      <div className="flex justify-between text-xs text-stone-600">
        <span>Low</span>
        <span className="font-medium capitalize">{likelihood}</span>
        <span>High</span>
      </div>
      {potentialMin != null && potentialMax != null && (
        <p className="text-xs text-stone-500">
          Est. range: {potentialMin}–{potentialMax}% discount
        </p>
      )}
    </div>
  );
}
