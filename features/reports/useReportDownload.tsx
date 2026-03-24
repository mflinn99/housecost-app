"use client";

import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { ComparisonReportPdf } from "./ComparisonReportPdf";
import { buildReportData } from "./buildReportData";
import type { PropertyListing } from "@/types";

export function useReportDownload() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const downloadReport = async (
    listings: PropertyListing[],
    location: string,
    intent: "rent" | "buy"
  ) => {
    setIsGenerating(true);
    setError(null);
    try {
      const reportData = await buildReportData(listings, location, intent);
      const blob = await pdf(<ComparisonReportPdf data={reportData} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `housecost-comparison-${new Date().toISOString().slice(0, 10)}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to generate report");
    } finally {
      setIsGenerating(false);
    }
  };

  return { downloadReport, isGenerating, error };
}
