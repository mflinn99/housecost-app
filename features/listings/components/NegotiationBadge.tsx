"use client";

import type { DiscountLikelihood } from "@/types";

interface NegotiationBadgeProps {
  likelihood: DiscountLikelihood;
  potentialMin?: number;
  potentialMax?: number;
  compact?: boolean;
}

const styles: Record<DiscountLikelihood, string> = {
  low: "bg-stone-100 text-stone-700",
  medium: "bg-amber-50 text-amber-800",
  high: "bg-emerald-50 text-emerald-800",
};

export function NegotiationBadge({
  likelihood,
  potentialMin,
  potentialMax,
  compact = false,
}: NegotiationBadgeProps) {
  const safe = (likelihood && styles[likelihood] ? likelihood : "low") as DiscountLikelihood;
  const label = safe.charAt(0).toUpperCase() + safe.slice(1);
  const range =
    potentialMin != null && potentialMax != null
      ? `${potentialMin}–${potentialMax}%`
      : null;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-lg px-2 py-0.5 text-xs font-medium ${styles[safe]}`}
      title={range ? `Potential discount range: ${range}` : undefined}
    >
      {compact ? label : `Discount likelihood: ${label}`}
      {range && !compact && ` (${range})`}
    </span>
  );
}
