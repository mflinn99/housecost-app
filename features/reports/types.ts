/**
 * Report data model - single source of truth for comparison report
 */

import type { PropertyListing } from "@/types";
import type { AreaData } from "@/types";
import type { VibeScoreResult } from "@/features/vibe-score/vibe-engine";

export interface ReportPropertyData {
  listing: PropertyListing;
  area: AreaData;
  vibe: VibeScoreResult;
  monthlyCost?: number;
  upfrontCost?: number;
  transportSummary?: string;
  amenitiesCount?: number;
}

export interface ReportData {
  generatedAt: string;
  location: string;
  intent: "rent" | "buy";
  assumptionsSummary?: string;
  properties: ReportPropertyData[];
  recommendations?: {
    bestOverall?: string;
    bestValue?: string;
    bestLifestyle?: string;
    bestQuiet?: string;
    bestNegotiation?: string;
  };
}
