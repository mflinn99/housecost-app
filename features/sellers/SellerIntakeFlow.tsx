"use client";

import { useState } from "react";
import Link from "next/link";
import type { PrivateSaleBrief } from "@/types";
import { getAverageListingPrice, getAverageSoldPrice, getDistrictMarketStats } from "@/lib/market/marketCalculations";

type Step = 1 | 2 | 3 | 4 | 5;

interface FormData {
  postcode: string;
  propertyType: string;
  bedrooms: string;
  valueRangeMin: string;
  valueRangeMax: string;
  timeline: "asap" | "3_months" | "exploring";
  alreadyListed: boolean;
  preferredModel: string;
  importanceOrder: ("price" | "speed" | "service")[];
  fullyAnonymous: boolean;
  exactAddressHidden: boolean;
  identityHidden: boolean;
}

const defaultForm: FormData = {
  postcode: "",
  propertyType: "",
  bedrooms: "",
  valueRangeMin: "",
  valueRangeMax: "",
  timeline: "exploring",
  alreadyListed: false,
  preferredModel: "",
  importanceOrder: ["price", "speed", "service"],
  fullyAnonymous: true,
  exactAddressHidden: true,
  identityHidden: true,
};

export function SellerIntakeFlow() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormData>(defaultForm);
  const [brief, setBrief] = useState<PrivateSaleBrief | null>(null);

  const update = (updates: Partial<FormData>) => setForm((f) => ({ ...f, ...updates }));

  const districtFromPostcode = (postcode: string): string => {
    const match = postcode.trim().toUpperCase().match(/^M\d{1,2}/);
    return match?.[0] ?? "M6";
  };

  const handleSubmit = () => {
    const b: PrivateSaleBrief = {
      id: `brief-${Date.now()}`,
      postcode: form.postcode,
      propertyType: form.propertyType,
      bedrooms: Number(form.bedrooms) || 0,
      valueRangeMin: Number(form.valueRangeMin) || 0,
      valueRangeMax: Number(form.valueRangeMax) || 0,
      timeline: form.timeline,
      alreadyListed: form.alreadyListed,
      preferredModel: form.preferredModel || undefined,
      importanceOrder: form.importanceOrder,
      fullyAnonymous: form.fullyAnonymous,
      exactAddressHidden: form.exactAddressHidden,
      identityHidden: form.identityHidden,
      createdAt: new Date().toISOString(),
    };
    try {
      sessionStorage.setItem(`seller-brief-${b.id}`, JSON.stringify(b));
    } catch {
      // ignore
    }
    setBrief(b);
    setStep(5);
  };

  if (brief && step === 5) {
    const district = districtFromPostcode(form.postcode);
    const localSoldAverage = getAverageSoldPrice(district);
    const localListingAverage = getAverageListingPrice(district);
    const inputMin = Number(form.valueRangeMin) || localSoldAverage * 0.95;
    const inputMax = Number(form.valueRangeMax) || localSoldAverage * 1.05;
    const userMid = (inputMin + inputMax) / 2;
    const expectedValuation = Math.round((userMid * 0.55 + localSoldAverage * 0.45) / 1000) * 1000;
    const feeMin = expectedValuation >= localListingAverage ? 0.9 : 1.0;
    const feeMax = expectedValuation >= localListingAverage ? 1.3 : 1.5;
    const districtStats = getDistrictMarketStats(district);
    const likelyTimeline =
      expectedValuation <= localSoldAverage
        ? "6-10 weeks to secure an agreed offer"
        : expectedValuation <= localListingAverage
          ? "8-12 weeks to secure an agreed offer"
          : "10-16 weeks unless pricing is reviewed";
    const expectedPricingBehaviour =
      expectedValuation > localListingAverage
        ? "Agents are likely to suggest testing above recent sales, then reviewing quickly if interest is light."
        : expectedValuation < localSoldAverage
          ? "Agents are likely to position near recent sales to drive early competition from similar-property buyers."
          : "Agents are likely to anchor close to the local average and adjust only if viewings underperform.";
    const negotiationLikelihood =
      expectedValuation > localListingAverage
        ? "High"
        : expectedValuation > localSoldAverage
          ? "Moderate"
          : "Low";
    const confidence =
      districtStats.comparableCount >= 10 && districtStats.soldVariancePercent <= 9
        ? "High"
        : districtStats.comparableCount >= 7 && districtStats.soldVariancePercent <= 14
          ? "Moderate"
          : "Low";
    const recommendedTiming =
      expectedValuation > localListingAverage
        ? "Launch after a pricing alignment pass; early overpricing risks a slower first month."
        : expectedValuation < localSoldAverage
          ? "Launch promptly; similar properties near recent sales tend to convert faster."
          : "Launch within current window; monitor first 2-3 weeks and adjust only if demand underperforms.";
    const recommendedNegotiation =
      negotiationLikelihood === "High"
        ? "Plan for buyer negotiation and pre-define your minimum acceptable close."
        : negotiationLikelihood === "Moderate"
          ? "Expect selective negotiation; anchor on recent sales and local average evidence."
          : "Hold firmer on price if early enquiry quality is strong.";
    const recommendedPricing =
      expectedValuation > localListingAverage
        ? "Start closer to the local average, then step up only if viewing velocity is strong."
        : expectedValuation < localSoldAverage
          ? "Price close to recent sales to maximise early competition."
          : "Position near local average and avoid frequent micro-reductions.";
    const pricingBand =
      expectedValuation > localListingAverage
        ? "Weak"
        : expectedValuation < localSoldAverage
          ? "Strong"
          : "Balanced";
    const demandSignal =
      likelyTimeline.includes("6-10")
        ? "demand is active"
        : likelyTimeline.includes("10-16")
          ? "demand is selective"
          : "demand is steady";
    const positionSummary =
      pricingBand === "Balanced"
        ? "Balanced - expect standard negotiation."
        : pricingBand === "Weak"
          ? "Weak - buyers likely to push on price."
          : "Strong - buyers likely to move quickly.";

    return (
      <div className="space-y-6">
        <div className="rounded-sm border border-stone-200/90 bg-white/70 p-4">
          <p className="text-xs font-medium text-stone-600">Your private sale brief</p>
          <p className="mt-2 text-sm text-stone-800">
            {form.postcode} • {form.propertyType} • {form.bedrooms} bed
          </p>
          <p className="mt-1 text-xs text-stone-600">
            £{form.valueRangeMin}–£{form.valueRangeMax} • {form.timeline.replace("_", " ")}
          </p>
          <p className="mt-2 text-xs text-stone-700">What to expect from agents</p>
          <ul className="mt-1 space-y-1 text-xs text-stone-600">
            <li>Typical fee range: {feeMin.toFixed(1)}% to {feeMax.toFixed(1)}%</li>
            <li>Expected valuation: £{expectedValuation.toLocaleString()} based on recent sales and local average in {district}</li>
            <li>Likely timeline: {likelyTimeline}</li>
            <li>Expected pricing behaviour: {expectedPricingBehaviour}</li>
            <li>Negotiation likelihood: {negotiationLikelihood} (confidence: {confidence})</li>
          </ul>
          <p className="mt-2 text-xs text-stone-700">Recommended approach</p>
          <ul className="mt-1 space-y-1 text-xs text-stone-600">
            <li>Timing suggestion: {recommendedTiming}</li>
            <li>Negotiation expectation: {recommendedNegotiation}</li>
            <li>Pricing behaviour: {recommendedPricing}</li>
          </ul>
          <p className="mt-2 text-xs text-stone-700">Your position in the market</p>
          <p className="mt-1 text-xs text-stone-600">
            {positionSummary} Pricing band: {pricingBand}. Demand signal: {demandSignal}.
          </p>
          <p className="mt-2 text-xs text-stone-500">Fully anonymous. Identity hidden.</p>
        </div>
        <Link
          href={`/sellers/brief/${brief.id}`}
          className="block w-full rounded-sm border border-stone-800 bg-stone-800 px-4 py-3 text-center text-sm font-medium text-stone-50 hover:bg-stone-700"
        >
          View agent intelligence & proposals
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (step < 4) setStep((s) => (s + 1) as Step);
        else handleSubmit();
      }}
      className="space-y-6"
    >
      {/* Progress */}
      <div className="flex gap-1">
        {([1, 2, 3, 4] as const).map((s) => (
          <div
            key={s}
            className={`h-0.5 flex-1 rounded-full ${s <= step ? "bg-stone-800" : "bg-stone-200"}`}
          />
        ))}
      </div>

      {/* Step 1 — Property basics */}
      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-sm font-medium text-stone-800">Property basics</h2>
          <label className="block">
            <span className="text-xs text-stone-600">Postcode (partial ok)</span>
            <input
              type="text"
              value={form.postcode}
              onChange={(e) => update({ postcode: e.target.value.toUpperCase() })}
              placeholder="e.g. M6"
              className="mt-1 w-full rounded-sm border border-stone-200/90 px-3 py-2 text-sm text-stone-800 placeholder:text-stone-400"
            />
          </label>
          <label className="block">
            <span className="text-xs text-stone-600">Property type</span>
            <select
              value={form.propertyType}
              onChange={(e) => update({ propertyType: e.target.value })}
              className="mt-1 w-full rounded-sm border border-stone-200/90 px-3 py-2 text-sm text-stone-800"
            >
              <option value="">Select</option>
              <option value="flat">Flat</option>
              <option value="house">House</option>
              <option value="bungalow">Bungalow</option>
              <option value="other">Other</option>
            </select>
          </label>
          <label className="block">
            <span className="text-xs text-stone-600">Bedrooms</span>
            <input
              type="number"
              min={1}
              max={10}
              value={form.bedrooms}
              onChange={(e) => update({ bedrooms: e.target.value })}
              placeholder="e.g. 3"
              className="mt-1 w-full rounded-sm border border-stone-200/90 px-3 py-2 text-sm text-stone-800"
            />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="text-xs text-stone-600">Value min (£)</span>
              <input
                type="number"
                value={form.valueRangeMin}
                onChange={(e) => update({ valueRangeMin: e.target.value })}
                placeholder="e.g. 350000"
                className="mt-1 w-full rounded-sm border border-stone-200/90 px-3 py-2 text-sm text-stone-800"
              />
            </label>
            <label className="block">
              <span className="text-xs text-stone-600">Value max (£)</span>
              <input
                type="number"
                value={form.valueRangeMax}
                onChange={(e) => update({ valueRangeMax: e.target.value })}
                placeholder="e.g. 450000"
                className="mt-1 w-full rounded-sm border border-stone-200/90 px-3 py-2 text-sm text-stone-800"
              />
            </label>
          </div>
        </div>
      )}

      {/* Step 2 — Sale intent */}
      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-sm font-medium text-stone-800">Sale intent</h2>
          <label className="block">
            <span className="text-xs text-stone-600">Timeline</span>
            <select
              value={form.timeline}
              onChange={(e) => update({ timeline: e.target.value as FormData["timeline"] })}
              className="mt-1 w-full rounded-sm border border-stone-200/90 px-3 py-2 text-sm text-stone-800"
            >
              <option value="asap">ASAP</option>
              <option value="3_months">Within 3 months</option>
              <option value="exploring">Just exploring</option>
            </select>
          </label>
          <div>
            <span className="text-xs text-stone-600">Already listed?</span>
            <div className="mt-2 flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={!form.alreadyListed}
                  onChange={() => update({ alreadyListed: false })}
                />
                <span className="text-sm text-stone-700">No</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={form.alreadyListed}
                  onChange={() => update({ alreadyListed: true })}
                />
                <span className="text-sm text-stone-700">Yes</span>
              </label>
            </div>
          </div>
          <label className="block">
            <span className="text-xs text-stone-600">Preferred model (optional)</span>
            <select
              value={form.preferredModel}
              onChange={(e) => update({ preferredModel: e.target.value })}
              className="mt-1 w-full rounded-sm border border-stone-200/90 px-3 py-2 text-sm text-stone-800"
            >
              <option value="">No preference</option>
              <option value="traditional">Traditional %</option>
              <option value="fixed">Fixed fee</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </label>
        </div>
      )}

      {/* Step 3 — Preferences */}
      {step === 3 && (
        <div className="space-y-4">
          <h2 className="text-sm font-medium text-stone-800">What matters most</h2>
          <p className="text-xs text-stone-600">Reorder by importance (most important first)</p>
          <div className="space-y-2">
            {form.importanceOrder.map((key, i) => (
              <div
                key={key}
                className="flex items-center justify-between rounded-sm border border-stone-200/90 px-3 py-2"
              >
                <span className="text-sm text-stone-700 capitalize">{key}</span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={i === 0}
                    onClick={() => {
                      const next = [...form.importanceOrder];
                      [next[i - 1], next[i]] = [next[i], next[i - 1]];
                      update({ importanceOrder: next });
                    }}
                    className="rounded p-1 text-stone-500 hover:bg-stone-100 disabled:opacity-40 disabled:hover:bg-transparent"
                    aria-label="Move up"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    disabled={i === form.importanceOrder.length - 1}
                    onClick={() => {
                      const next = [...form.importanceOrder];
                      [next[i], next[i + 1]] = [next[i + 1], next[i]];
                      update({ importanceOrder: next });
                    }}
                    className="rounded p-1 text-stone-500 hover:bg-stone-100 disabled:opacity-40 disabled:hover:bg-transparent"
                    aria-label="Move down"
                  >
                    ↓
                  </button>
                  <span className="ml-2 text-xs text-stone-500">#{i + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 4 — Privacy */}
      {step === 4 && (
        <div className="space-y-4">
          <h2 className="text-sm font-medium text-stone-800">Privacy</h2>
          <p className="text-xs text-stone-600">Defaults keep you fully anonymous</p>
          <label className="flex items-center gap-3 rounded-sm border border-stone-200/90 p-3">
            <input
              type="checkbox"
              checked={form.fullyAnonymous}
              onChange={(e) => update({ fullyAnonymous: e.target.checked })}
            />
            <span className="text-sm text-stone-700">Fully anonymous</span>
          </label>
          <label className="flex items-center gap-3 rounded-sm border border-stone-200/90 p-3">
            <input
              type="checkbox"
              checked={form.exactAddressHidden}
              onChange={(e) => update({ exactAddressHidden: e.target.checked })}
            />
            <span className="text-sm text-stone-700">Exact address hidden</span>
          </label>
          <label className="flex items-center gap-3 rounded-sm border border-stone-200/90 p-3">
            <input
              type="checkbox"
              checked={form.identityHidden}
              onChange={(e) => update({ identityHidden: e.target.checked })}
            />
            <span className="text-sm text-stone-700">Identity hidden</span>
          </label>
        </div>
      )}

      <div className="flex gap-3">
        {step > 1 && (
          <button
            type="button"
            onClick={() => setStep((s) => (s - 1) as Step)}
            className="rounded-sm border border-stone-200/90 px-4 py-2 text-sm text-stone-700 hover:bg-stone-50"
          >
            Back
          </button>
        )}
        <button
          type="submit"
          className="flex-1 rounded-sm border border-stone-800 bg-stone-800 px-4 py-2 text-sm font-medium text-stone-50 hover:bg-stone-700"
        >
          {step < 4 ? "Continue" : "Create private brief"}
        </button>
      </div>
    </form>
  );
}
