"use client";

import { useState, useMemo } from "react";
import { Info } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/utils";
import {
  calculateRentBreakdown,
  calculateBuyBreakdown,
} from "@/lib/calculations";
import type { PropertyListing, SearchIntent } from "@/types";

interface CalculatorPanelProps {
  listing: PropertyListing;
  intent: SearchIntent;
}

function Tooltip({ text }: { text: string }) {
  return (
    <span
      title={text}
      className="inline-flex cursor-help text-stone-400 hover:text-stone-600"
    >
      <Info className="h-4 w-4" />
    </span>
  );
}

export function CalculatorPanel({ listing, intent }: CalculatorPanelProps) {
  const price = Number(listing?.priceValue) || 0;

  const [rentState, setRentState] = useState({
    monthlyRent: price,
    depositWeeks: 5,
    councilTaxBand: listing.councilTaxBand ?? "D",
    councilTaxOverride: false,
    councilTaxMonthly: 0,
  });

  const [buyState, setBuyState] = useState<{
    purchasePrice: number;
    depositPercent: number;
    mortgageTermYears: number;
    interestRatePercent: number;
    mortgageType: "repayment" | "interest_only";
    buyerStatus: "first_time_buyer" | "mover" | "investor";
  }>({
    purchasePrice: price,
    depositPercent: 10,
    mortgageTermYears: 25,
    interestRatePercent: 4.5,
    mortgageType: "repayment",
    buyerStatus: "mover",
  });

  const rentBreakdown = useMemo(
    () =>
      intent === "rent"
        ? calculateRentBreakdown({
            monthlyRent: rentState.monthlyRent,
            depositWeeks: rentState.depositWeeks,
            serviceCharge: listing.serviceCharge,
            groundRent: listing.groundRent,
            councilTaxBand: rentState.councilTaxBand,
            councilTaxOverride: rentState.councilTaxOverride,
            councilTaxMonthly: rentState.councilTaxMonthly || undefined,
            bedrooms: listing.bedrooms,
          })
        : null,
    [intent, rentState, listing]
  );

  const buyBreakdown = useMemo(
    () =>
      intent === "buy"
        ? calculateBuyBreakdown({
            purchasePrice: buyState.purchasePrice,
            depositPercent: buyState.depositPercent,
            mortgageTermYears: buyState.mortgageTermYears,
            interestRatePercent: buyState.interestRatePercent,
            mortgageType: buyState.mortgageType,
            buyerStatus: buyState.buyerStatus,
            serviceCharge: listing.serviceCharge,
            groundRent: listing.groundRent,
            councilTaxBand: listing.councilTaxBand,
            bedrooms: listing.bedrooms,
          })
        : null,
    [intent, buyState, listing]
  );

  return (
    <div className="space-y-6">
      <Card className="sticky top-24">
        <h2 className="text-lg font-semibold">Monthly cost breakdown</h2>
        <p className="mt-1 text-xs text-stone-500">
          Estimates only. Adjust assumptions below.
        </p>

        {price <= 0 && (
          <p className="mt-4 text-sm text-stone-500">Enter a valid price in assumptions to see breakdown.</p>
        )}

        {price > 0 && intent === "rent" && rentBreakdown && (
          <div className="mt-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-1">
                Rent <Tooltip text="Base monthly rent" />
              </span>
              <span>{formatCurrency(rentBreakdown.monthlyRent)}</span>
            </div>
            {rentBreakdown.serviceCharge > 0 && (
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-1">
                  Service charge <Tooltip text="If applicable" />
                </span>
                <span>{formatCurrency(rentBreakdown.serviceCharge)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-1">
                Council tax <Tooltip text="Estimated from band" />
              </span>
              <span>{formatCurrency(rentBreakdown.councilTax)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-1">
                Utilities <Tooltip text="Elec, gas, water, broadband" />
              </span>
              <span>
                {formatCurrency(
                  rentBreakdown.utilities.electricity +
                    rentBreakdown.utilities.gas +
                    rentBreakdown.utilities.water +
                    rentBreakdown.utilities.broadband
                )}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-1">
                Insurance <Tooltip text="Contents insurance estimate" />
              </span>
              <span>{formatCurrency(rentBreakdown.contentsInsurance)}</span>
            </div>
            <div className="border-t border-stone-200 pt-3">
              <div className="flex justify-between font-semibold">
                <span>Total monthly</span>
                <span>{formatCurrency(rentBreakdown.totalMonthly)}</span>
              </div>
            </div>
            <p className="text-xs text-stone-500">
              Deposit: {formatCurrency(rentBreakdown.deposit)} (
              {rentBreakdown.depositWeeks} weeks)
            </p>
          </div>
        )}

        {price > 0 && intent === "buy" && buyBreakdown && (
          <div className="mt-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="flex items-center gap-1">
                Mortgage <Tooltip text="Repayment or interest-only" />
              </span>
              <span>{formatCurrency(buyBreakdown.monthlyMortgage)}</span>
            </div>
            {buyBreakdown.serviceCharge > 0 && (
              <div className="flex justify-between text-sm">
                <span>Service charge</span>
                <span>{formatCurrency(buyBreakdown.serviceCharge)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span>Council tax</span>
              <span>{formatCurrency(buyBreakdown.councilTax)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Utilities</span>
              <span>
                {formatCurrency(
                  buyBreakdown.utilities.electricity +
                    buyBreakdown.utilities.gas +
                    buyBreakdown.utilities.water +
                    buyBreakdown.utilities.broadband
                )}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Insurance</span>
              <span>{formatCurrency(buyBreakdown.insurance)}</span>
            </div>
            <div className="border-t border-stone-200 pt-3">
              <div className="flex justify-between font-semibold">
                <span>Total monthly</span>
                <span>{formatCurrency(buyBreakdown.totalMonthly)}</span>
              </div>
            </div>
            <div className="mt-4 rounded-lg bg-stone-50 p-3 text-sm">
              <p className="font-medium text-stone-700">Upfront costs</p>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between">
                  <span>Deposit</span>
                  <span>{formatCurrency(buyBreakdown.deposit)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Stamp duty</span>
                  <span>{formatCurrency(buyBreakdown.upfront.stampDuty)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Legal fees</span>
                  <span>{formatCurrency(buyBreakdown.upfront.legalFees)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Survey</span>
                  <span>{formatCurrency(buyBreakdown.upfront.survey)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Mortgage fees</span>
                  <span>{formatCurrency(buyBreakdown.upfront.mortgageFees)}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Total upfront</span>
                  <span>{formatCurrency(buyBreakdown.upfront.total + buyBreakdown.deposit)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Editable assumptions */}
      <Card>
        <h3 className="text-base font-semibold">Adjust assumptions</h3>
        {intent === "rent" && (
          <div className="mt-4 space-y-4">
            <label className="block">
              <span className="text-sm font-medium">Monthly rent</span>
              <input
                type="number"
                value={rentState.monthlyRent}
                onChange={(e) =>
                  setRentState((s) => ({ ...s, monthlyRent: Number(e.target.value) || 0 }))
                }
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Deposit (weeks)</span>
              <input
                type="number"
                min={1}
                max={12}
                value={rentState.depositWeeks}
                onChange={(e) =>
                  setRentState((s) => ({ ...s, depositWeeks: Number(e.target.value) || 5 }))
                }
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Council tax band</span>
              <select
                value={rentState.councilTaxBand}
                onChange={(e) =>
                  setRentState((s) => ({ ...s, councilTaxBand: e.target.value }))
                }
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
              >
                {["A", "B", "C", "D", "E", "F", "G", "H"].map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}
        {intent === "buy" && (
          <div className="mt-4 space-y-4">
            <label className="block">
              <span className="text-sm font-medium">Purchase price</span>
              <input
                type="number"
                value={buyState.purchasePrice}
                onChange={(e) =>
                  setBuyState((s) => ({ ...s, purchasePrice: Number(e.target.value) || 0 }))
                }
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Deposit %</span>
              <input
                type="number"
                min={5}
                max={95}
                value={buyState.depositPercent}
                onChange={(e) =>
                  setBuyState((s) => ({ ...s, depositPercent: Number(e.target.value) || 10 }))
                }
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Mortgage term (years)</span>
              <input
                type="number"
                min={1}
                max={40}
                value={buyState.mortgageTermYears}
                onChange={(e) =>
                  setBuyState((s) => ({
                    ...s,
                    mortgageTermYears: Number(e.target.value) || 25,
                  }))
                }
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Interest rate %</span>
              <input
                type="number"
                step={0.1}
                min={0}
                max={20}
                value={buyState.interestRatePercent}
                onChange={(e) =>
                  setBuyState((s) => ({
                    ...s,
                    interestRatePercent: Number(e.target.value) || 4.5,
                  }))
                }
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Buyer status</span>
              <select
                value={buyState.buyerStatus}
                onChange={(e) => {
                  const v = e.target.value;
                  const buyerStatus =
                    v === "first_time_buyer" || v === "mover" || v === "investor"
                      ? v
                      : "mover";
                  setBuyState((s) => ({ ...s, buyerStatus }));
                }}
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
              >
                <option value="first_time_buyer">First-time buyer</option>
                <option value="mover">Mover</option>
                <option value="investor">Investor</option>
              </select>
            </label>
          </div>
        )}
      </Card>
    </div>
  );
}
