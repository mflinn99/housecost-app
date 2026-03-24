"use client";

import { Card } from "@/components/ui/Card";
import { calculateVibeScore } from "./vibe-engine";
import type { AreaData } from "@/types";

interface VibeScoreCardProps {
  area: AreaData;
  parking?: "driveway" | "on_street" | "permit" | "garage" | "none" | "allocated" | "unknown";
}

export function VibeScoreCard({ area, parking }: VibeScoreCardProps) {
  const vibe = calculateVibeScore(area, parking);

  return (
    <Card>
      <h2 className="text-lg font-semibold">Vibe Score</h2>
      <p className="mt-1 text-xs text-stone-500">Directional lifestyle interpretation</p>
      <div className="mt-4 flex items-baseline gap-3">
        <span className="text-4xl font-bold text-stone-900">{vibe.score}</span>
        <span className="text-lg font-medium text-stone-600">/ 100</span>
        <span className="rounded-lg bg-stone-100 px-2 py-0.5 text-sm font-medium text-stone-700">
          {vibe.label}
        </span>
      </div>
      <p className="mt-3 text-sm text-stone-700">{vibe.explanation}</p>
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-3">
          <span className="w-24 text-xs text-stone-600">Lifestyle</span>
          <div className="flex-1 h-2 rounded-full bg-stone-200 overflow-hidden">
            <div
              className="h-full rounded-full bg-stone-700"
              style={{ width: `${vibe.subScores.lifestyle}%` }}
            />
          </div>
          <span className="text-xs text-stone-600 w-8">{vibe.subScores.lifestyle}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-24 text-xs text-stone-600">Convenience</span>
          <div className="flex-1 h-2 rounded-full bg-stone-200 overflow-hidden">
            <div
              className="h-full rounded-full bg-stone-600"
              style={{ width: `${vibe.subScores.convenience}%` }}
            />
          </div>
          <span className="text-xs text-stone-600 w-8">{vibe.subScores.convenience}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-24 text-xs text-stone-600">Quietness</span>
          <div className="flex-1 h-2 rounded-full bg-stone-200 overflow-hidden">
            <div
              className="h-full rounded-full bg-stone-500"
              style={{ width: `${vibe.subScores.quietness}%` }}
            />
          </div>
          <span className="text-xs text-stone-600 w-8">{vibe.subScores.quietness}</span>
        </div>
      </div>
    </Card>
  );
}
