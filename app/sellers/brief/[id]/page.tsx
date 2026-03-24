"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { PrivateSaleBrief } from "@/types";

// Mock agent intelligence for the area
const MOCK_INTELLIGENCE = {
  commissionRange: "1.1% – 1.8%",
  avgTimeToSell: "42 days",
  activeAgents: 23,
  typicalPricingAccuracy: "Within 3% of achieved price",
  observedPriceReductions: "12% of listings",
};

// Mock proposals
const MOCK_PROPOSALS = [
  {
    id: "a1",
    name: "Agent A",
    fee: "1.2%",
    fixedOption: "£4,200",
    askingPrice: "£425,000",
    timeline: "4–6 weeks",
    serviceLevel: "Full",
    confidence: "high",
    commentary: null as string | null,
  },
  {
    id: "a2",
    name: "Agent B",
    fee: "1.5%",
    fixedOption: "£5,400",
    askingPrice: "£432,000",
    timeline: "6–8 weeks",
    serviceLevel: "Full",
    confidence: "medium",
    commentary: "Pricing above local average",
  },
  {
    id: "a3",
    name: "Agent C",
    fee: "1.0%",
    fixedOption: "£3,800",
    askingPrice: "£418,000",
    timeline: "3–5 weeks",
    serviceLevel: "Standard",
    confidence: "medium",
    commentary: "Fee lower than typical range",
  },
];

export default function BriefPage() {
  const params = useParams();
  const id = params.id as string;
  const [brief, setBrief] = useState<PrivateSaleBrief | null>(null);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(`seller-brief-${id}`);
      if (stored) setBrief(JSON.parse(stored) as PrivateSaleBrief);
    } catch {
      // ignore
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
        <Link href="/sellers" className="text-xs text-stone-500 hover:text-stone-700">
          ← For Sellers
        </Link>

        <header className="mt-6">
          <h1 className="text-lg font-medium text-stone-800">Your private brief</h1>
          {brief && (
            <p className="mt-1 text-sm text-stone-600">
              {brief.postcode} • {brief.propertyType} • {brief.bedrooms} bed • £{brief.valueRangeMin?.toLocaleString()}–£{brief.valueRangeMax?.toLocaleString()}
            </p>
          )}
        </header>

        {/* Agent Intelligence Panel */}
        <section className="mt-8 rounded-sm border border-stone-200/90 bg-white/70 p-5">
          <h2 className="text-sm font-medium text-stone-800">Agent intelligence in your area</h2>
          <p className="mt-1 text-xs text-stone-500">System-generated insights. Not submitted by agents.</p>
          <ul className="mt-4 space-y-2 text-sm text-stone-700">
            <li>• Typical commission range: {MOCK_INTELLIGENCE.commissionRange}</li>
            <li>• Average time to sell: {MOCK_INTELLIGENCE.avgTimeToSell}</li>
            <li>• Active agents in area: {MOCK_INTELLIGENCE.activeAgents}</li>
            <li>• Typical pricing accuracy: {MOCK_INTELLIGENCE.typicalPricingAccuracy}</li>
            <li>• Observed price reductions: {MOCK_INTELLIGENCE.observedPriceReductions}</li>
          </ul>
        </section>

        {/* Proposal Comparison */}
        <section className="mt-8">
          <h2 className="text-sm font-medium text-stone-800">Review proposals</h2>
          <p className="mt-1 text-xs text-stone-600">Compare agent offers side by side</p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-stone-200">
                  <th className="py-2 pr-4 text-left text-xs font-medium text-stone-600">Agent</th>
                  <th className="py-2 px-2 text-left text-xs font-medium text-stone-600">Fee</th>
                  <th className="py-2 px-2 text-left text-xs font-medium text-stone-600">Fixed</th>
                  <th className="py-2 px-2 text-left text-xs font-medium text-stone-600">Valuation</th>
                  <th className="py-2 px-2 text-left text-xs font-medium text-stone-600">Timeline</th>
                  <th className="py-2 px-2 text-left text-xs font-medium text-stone-600">Service</th>
                  <th className="py-2 pl-2 text-left text-xs font-medium text-stone-600">Confidence</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_PROPOSALS.map((p) => (
                  <tr key={p.id} className="border-b border-stone-100">
                    <td className="py-3 pr-4">
                      <span className="font-medium text-stone-800">{p.name}</span>
                      {p.commentary && (
                        <p className="mt-0.5 text-xs text-stone-500 italic">{p.commentary}</p>
                      )}
                    </td>
                    <td className="py-3 px-2 text-stone-700">{p.fee}</td>
                    <td className="py-3 px-2 text-stone-700">{p.fixedOption}</td>
                    <td className="py-3 px-2 text-stone-700">{p.askingPrice}</td>
                    <td className="py-3 px-2 text-stone-700">{p.timeline}</td>
                    <td className="py-3 px-2 text-stone-700">{p.serviceLevel}</td>
                    <td className="py-3 pl-2">
                      <span className={`inline-block rounded-full px-2 py-0.5 text-xs capitalize ${
                        p.confidence === "high"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}>
                        {p.confidence}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <p className="mt-6 text-xs text-stone-500">
          You remain anonymous. Select agents to reveal your identity when you&apos;re ready to proceed.
        </p>
      </main>
    </div>
  );
}
