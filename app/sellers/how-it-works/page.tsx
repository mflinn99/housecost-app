"use client";

import Link from "next/link";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
        <Link href="/sellers" className="text-xs text-stone-500 hover:text-stone-700">
          ← Back to For Sellers
        </Link>
        <h1 className="mt-6 text-lg font-medium text-stone-800">How it works</h1>
        <div className="mt-6 space-y-4 text-sm text-stone-600 leading-relaxed">
          <p>
            Create a private brief with your property basics — postcode, type, bedrooms, value range. You don’t give your name or exact address.
          </p>
          <p>
            We show you agent intelligence for your area: typical commission ranges, average time to sell, local pricing trends. This is based on market data, not agent marketing.
          </p>
          <p>
            Agents can see a masked version of your brief. They pay or use credits to submit a structured proposal — fee, valuation, timeline, approach. No spam, no free-text pitches.
          </p>
          <p>
            You compare proposals side by side. We add neutral commentary where fees or valuations differ from local norms. When you’re ready, you decide which agents (if any) see your identity and full details.
          </p>
        </div>
        <Link
          href="/sellers/start"
          className="mt-8 block w-full rounded-sm border border-stone-800 bg-stone-800 px-4 py-3 text-center text-sm font-medium text-stone-50 hover:bg-stone-700"
        >
          Start anonymously
        </Link>
      </main>
    </div>
  );
}
